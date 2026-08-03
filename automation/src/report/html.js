import { config, nowIST } from "../config.js";
import { donutChart, statusBars, trendChart, assetChart, escapeXml } from "./charts.js";

const LABEL = { pass: "PASS", warn: "WARN", fail: "FAIL", info: "INFO" };

function badge(status) {
  return `<span class="badge ${status}">${LABEL[status]}</span>`;
}

function sectionHtml(section) {
  const rows = section.checks
    .map(
      (c) => `<tr>
      <td class="name">${escapeXml(c.name)}</td>
      <td class="value">${escapeXml(c.value)}</td>
      <td class="detail">${escapeXml(c.detail || "")}</td>
      <td class="st">${badge(c.status)}</td>
    </tr>`
    )
    .join("");
  return `<section class="card">
    <h2>${escapeXml(section.title)}</h2>
    <table><thead><tr><th>Check</th><th>Value</th><th>Detail</th><th>Status</th></tr></thead>
    <tbody>${rows}</tbody></table>
  </section>`;
}

export function renderHtml({ sections, score, state, history, summary }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Daily Website Health Report — ${escapeXml(config.siteName)}</title>
<style>
  :root { --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; --accent:#4f46e5; }
  * { box-sizing:border-box; }
  body { margin:0; background:#f8fafc; color:var(--ink);
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Helvetica,Arial,sans-serif; font-size:13px; }
  .wrap { max-width:900px; margin:0 auto; padding:28px; }
  header { background:linear-gradient(135deg,#0f172a,#312e81); color:#fff; border-radius:16px; padding:28px; }
  header h1 { margin:0 0 6px; font-size:24px; letter-spacing:-.02em; }
  header p { margin:2px 0; color:#c7d2fe; font-size:12px; }
  .hero { display:flex; gap:24px; align-items:center; justify-content:space-between; flex-wrap:wrap; }
  .hero .donut { background:#fff; border-radius:14px; padding:8px; }
  .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin:18px 0; }
  .kpi { background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px; }
  .kpi span { display:block; color:var(--muted); font-size:10px; letter-spacing:.08em; text-transform:uppercase; }
  .kpi strong { font-size:19px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:12px; padding:18px; margin:14px 0;
          page-break-inside:avoid; }
  .card h2 { margin:0 0 12px; font-size:15px; letter-spacing:-.01em; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; font-size:10px; text-transform:uppercase; letter-spacing:.06em;
       color:var(--muted); border-bottom:1px solid var(--line); padding:6px 8px; }
  td { padding:7px 8px; border-bottom:1px solid #f1f5f9; vertical-align:top; }
  td.name { font-weight:600; word-break:break-all; max-width:230px; }
  td.value { color:#1e293b; word-break:break-all; max-width:220px; }
  td.detail { color:var(--muted); font-size:11px; max-width:230px; }
  td.st { text-align:right; white-space:nowrap; }
  .badge { font-size:10px; font-weight:700; padding:3px 8px; border-radius:999px; letter-spacing:.05em; }
  .badge.pass { background:#dcfce7; color:#166534; }
  .badge.warn { background:#fef3c7; color:#92400e; }
  .badge.fail { background:#fee2e2; color:#991b1b; }
  .badge.info { background:#e2e8f0; color:#475569; }
  footer { color:var(--muted); font-size:11px; text-align:center; padding:18px 0 4px; }
  @page { size:A4; margin:14mm; }
</style></head>
<body><div class="wrap">
  <header><div class="hero">
    <div>
      <h1>Daily Website Health Report</h1>
      <p>${escapeXml(config.siteName)}</p>
      <p>${escapeXml(config.siteUrl)}</p>
      <p>Generated ${escapeXml(nowIST())} IST</p>
    </div>
    <div class="donut">${donutChart(score)}</div>
  </div></header>

  <div class="kpis">
    <div class="kpi"><span>Status</span><strong>${summary.up ? "Online" : "Offline"}</strong></div>
    <div class="kpi"><span>Response</span><strong>${state.responseTimeMs ?? "—"} ms</strong></div>
    <div class="kpi"><span>SSL expires in</span><strong>${state.sslDaysRemaining ?? "—"} d</strong></div>
    <div class="kpi"><span>Broken links</span><strong>${state.links?.broken ?? "—"}</strong></div>
  </div>

  <section class="card"><h2>Checks by section</h2>${statusBars(sections)}</section>
  ${history.length > 1 ? `<section class="card"><h2>Health score trend (last 14 runs)</h2>${trendChart(history)}</section>` : ""}
  ${state.performance ? `<section class="card"><h2>Heaviest assets</h2>${assetChart(state.performance)}</section>` : ""}

  ${sections.map(sectionHtml).join("")}

  <footer>Automated by GitHub Actions · ${escapeXml(summary.counts.pass)} passed ·
    ${escapeXml(summary.counts.warn)} warnings · ${escapeXml(summary.counts.fail)} failures</footer>
</div></body></html>`;
}
