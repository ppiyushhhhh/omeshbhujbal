#!/usr/bin/env node
/**
 * Daily Website Health Report — entry point.
 * Runs every check, renders HTML + PDF, appends history, emails the result.
 * Fully isolated from the portfolio application code.
 */
import fs from "node:fs";
import path from "node:path";
import { config, dateStamp, nowIST } from "./config.js";
import { score as computeScore } from "./lib/status.js";
import { uptimeCheck } from "./checks/uptime.js";
import { sslCheck } from "./checks/ssl.js";
import { linksCheck } from "./checks/links.js";
import { crawlabilityCheck } from "./checks/crawlability.js";
import { metadataCheck } from "./checks/metadata.js";
import { securityHeadersCheck } from "./checks/securityHeaders.js";
import { performanceCheck } from "./checks/performance.js";
import { repositoryCheck } from "./checks/repository.js";
import { deploymentCheck } from "./checks/deployment.js";
import { renderHtml } from "./report/html.js";
// pdf.js and mailer.js are imported lazily so a missing optional dependency
// (or a headless-Chrome-less environment) degrades gracefully.

async function run() {
  const state = {};
  const sections = [];

  // Sequential where later checks depend on the fetched homepage, then the rest.
  sections.push(await uptimeCheck(state));
  const [ssl, links, crawl, meta, sec, perf, repo, deploy] = [
    await sslCheck(state),
    await linksCheck(state),
    await crawlabilityCheck(state),
    await metadataCheck(state),
    await securityHeadersCheck(state),
    await performanceCheck(state),
    await repositoryCheck(state),
    await deploymentCheck(state),
  ];
  sections.push(ssl, ...[].concat(meta), ...[].concat(crawl), links, sec, perf, deploy, repo);

  const score = computeScore(sections);
  const counts = { pass: 0, warn: 0, fail: 0, info: 0 };
  sections.forEach((s) => s.checks.forEach((c) => counts[c.status]++));
  const summary = { counts, up: (state.home?.status || 0) < 400 && state.home?.ok };

  // History (persisted between runs via the restored artifact).
  const outDir = path.resolve(config.paths.repoRoot, config.paths.outDir);
  fs.mkdirSync(outDir, { recursive: true });
  const historyFile = path.join(outDir, "history.json");
  let history = [];
  try {
    history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
  } catch {
    history = [];
  }
  history.push({ date: dateStamp(), score, counts, responseTimeMs: state.responseTimeMs ?? null });
  history = history.slice(-60);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  const html = renderHtml({ sections, score, state, history, summary });
  const base = `health-report-${dateStamp()}`;
  const htmlPath = path.join(outDir, `${base}.html`);
  const pdfPath = path.join(outDir, `${base}.pdf`);
  const jsonPath = path.join(outDir, `${base}.json`);

  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify({ generatedAt: nowIST(), site: config.siteUrl, score, counts, sections, state: { ...state, home: undefined } }, null, 2)
  );

  let pdfOk = true;
  try {
    const { renderPdf } = await import("./report/pdf.js");
    await renderPdf(html, pdfPath);
  } catch (e) {
    pdfOk = false;
    console.error("PDF generation failed:", e.message);
  }

  let mail = { sent: false, reason: "not attempted" };
  try {
    const { sendReport } = await import("./mailer.js");
    mail = await sendReport({ html, pdfPath: pdfOk ? pdfPath : "", score, summary });
  } catch (e) {
    mail = { sent: false, reason: e.message };
  }

  console.log(`\nHealth score: ${score}/100`);
  console.log(`Pass ${counts.pass} · Warn ${counts.warn} · Fail ${counts.fail}`);
  console.log(`HTML: ${htmlPath}`);
  console.log(`PDF:  ${pdfOk ? pdfPath : "not generated"}`);
  console.log(`Email: ${mail.sent ? "sent" : `not sent (${mail.reason})`}`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## Website Health Report\n\n**Score:** ${score}/100\n\n` +
        `| Passed | Warnings | Failures |\n|---|---|---|\n| ${counts.pass} | ${counts.warn} | ${counts.fail} |\n\n` +
        `Site: ${config.siteUrl} · Generated ${nowIST()} IST\n`
    );
  }

  // Never fail the workflow for site warnings; only a hard crash exits non-zero.
  return 0;
}

run()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error("Health report run failed:", err);
    process.exit(1);
  });
