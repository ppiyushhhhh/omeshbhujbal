import puppeteer from "puppeteer";

/** Render the HTML report into a print-quality A4 PDF. */
export async function renderPdf(html, outPath) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "14mm", left: "10mm", right: "10mm" },
      displayHeaderFooter: true,
      footerTemplate: `<div style="width:100%;font-size:8px;color:#94a3b8;padding:0 12mm;
        display:flex;justify-content:space-between;">
        <span>Daily Website Health Report</span>
        <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
      headerTemplate: "<div></div>",
    });
    return outPath;
  } finally {
    await browser.close();
  }
}
