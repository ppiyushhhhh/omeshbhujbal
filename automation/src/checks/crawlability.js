import { config } from "../config.js";
import { timedFetch } from "../lib/http.js";
import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

/** sitemap.xml + robots.txt presence and sanity. */
export async function crawlabilityCheck(state) {
  const checks = [];

  const robots = await timedFetch(`${config.siteUrl}/robots.txt`);
  if (robots.ok && robots.status === 200) {
    const blocksAll = /^\s*disallow:\s*\/\s*$/im.test(robots.body || "");
    checks.push(check("robots.txt", blocksAll ? FAIL : PASS, blocksAll ? "Blocks all crawlers" : "Present"));
    const sitemapLine = (robots.body.match(/^\s*sitemap:\s*(\S+)/im) || [])[1];
    checks.push(check("Sitemap directive", sitemapLine ? PASS : WARN, sitemapLine || "Not declared"));
  } else {
    checks.push(check("robots.txt", FAIL, robots.status || "ERR", robots.error || "Missing"));
  }

  const sitemap = await timedFetch(`${config.siteUrl}/sitemap.xml`);
  if (sitemap.ok && sitemap.status === 200) {
    const urlCount = (sitemap.body.match(/<loc>/g) || []).length;
    state.sitemapUrls = urlCount;
    checks.push(check("sitemap.xml", PASS, "Present"));
    checks.push(check("Sitemap URLs", urlCount > 0 ? PASS : WARN, urlCount));
    checks.push(
      check(
        "Sitemap well-formed",
        /<urlset|<sitemapindex/.test(sitemap.body) ? PASS : FAIL,
        /<urlset|<sitemapindex/.test(sitemap.body) ? "Yes" : "Invalid XML root"
      )
    );
  } else {
    checks.push(check("sitemap.xml", FAIL, sitemap.status || "ERR", sitemap.error || "Missing"));
  }

  checks.push(check("Checked at", INFO, new Date().toISOString()));
  return { id: "crawl", title: "Sitemap & Robots", checks };
}
