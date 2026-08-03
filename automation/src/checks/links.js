import { config } from "../config.js";
import { timedFetch, absolute } from "../lib/http.js";
import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

/** Crawl homepage links (internal + external) and report broken targets. */
export async function linksCheck(state) {
  const html = state.home?.body || "";
  const hrefs = [...html.matchAll(/href=["']([^"'#]+)["']/gi)].map((m) => m[1]);

  const urls = new Set();
  for (const p of config.extraPaths) urls.add(config.siteUrl + p);
  for (const href of hrefs) {
    if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const abs = absolute(config.siteUrl, href);
    if (abs) urls.add(abs);
  }

  const list = [...urls].slice(0, config.maxLinksChecked);
  const results = await Promise.all(
    list.map(async (url) => {
      let res = await timedFetch(url, { method: "HEAD" });
      if (!res.ok || res.status === 405 || res.status === 403) {
        res = await timedFetch(url);
      }
      return { url, status: res.status, ok: res.ok && res.status < 400, error: res.error };
    })
  );

  const broken = results.filter((r) => !r.ok);
  state.links = { total: results.length, broken: broken.length, results };

  const checks = [
    check("Links scanned", INFO, results.length),
    check(
      "Broken links",
      broken.length === 0 ? PASS : broken.length <= 2 ? WARN : FAIL,
      broken.length
    ),
  ];
  for (const b of broken.slice(0, 10)) {
    checks.push(check(b.url, FAIL, b.status || "ERR", b.error || "Unreachable"));
  }

  return { id: "links", title: "Link Integrity", checks };
}
