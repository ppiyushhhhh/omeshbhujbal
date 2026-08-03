import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

/** Render a one-page executive A4 PDF with ReportLab Platypus. */
export async function renderPdf(payload, outPath) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const scriptPath = path.join(dir, "pdf_reportlab.py");
  const run = spawnSync("python3", [scriptPath, outPath], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  if (run.error) {
    throw run.error;
  }
  if (run.status !== 0) {
    throw new Error(run.stderr || `ReportLab PDF generation failed with exit code ${run.status}`);
  }
  return outPath;
}
