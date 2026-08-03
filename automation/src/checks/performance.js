import { config } from "../config.js";
import { timedFetch, absolute } from "../lib/http.js";
import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

const kb = (b) => Math.round(b / 1024);

/** Page weight, asset sizes and compression for the deployed homepage. */
export async function performanceCheck(state) {
  const html = state.home?.body || "";
  const assets = new Set();

  for (const m of html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)) assets.add(m[1]);
  for (const m of html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi))
    assets.add(m[1]);
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) assets.add(m[1]);

  const list = [...assets]
    .map((a) => absolute(config.siteUrl, a))
    .filter(Boolean)
    .slice(0, 30);

  const fetched = await Promise.all(
    list.map(async (url) => {
      const res = await timedFetch(url);
      return {
        url,
        bytes: res.ok ? Number(res.headers?.["content-length"] || res.bytes) : 0,
        encoding: res.headers?.["content-encoding"] || "none",
        ok: res.ok && res.status < 400,
        durationMs: res.durationMs,
      };
    })
  );

  const htmlBytes = state.home?.bytes || 0;
  const totalBytes = fetched.reduce((s, a) => s + a.bytes, 0) + htmlBytes;
  const heaviest = [...fetched].sort((a, b) => b.bytes - a.bytes).slice(0, 5);
  const uncompressed = fetched.filter(
    (a) => a.encoding === "none" && a.bytes > 40 * 1024 && /\.(js|css|svg)(\?|$)/i.test(a.url)
  );

  state.performance = {
    totalKb: kb(totalBytes),
    htmlKb: kb(htmlBytes),
    assetCount: fetched.length,
    heaviest,
    slowest: [...fetched].sort((a, b) => b.durationMs - a.durationMs).slice(0, 5),
  };

  const checks = [
    check("Assets discovered", INFO, fetched.length),
    check(
      "Total page weight",
      totalBytes / 1024 <= config.thresholds.pageWeightKb
        ? PASS
        : totalBytes / 1024 <= config.thresholds.pageWeightKb * 1.5
          ? WARN
          : FAIL,
      `${kb(totalBytes)} KB`,
      `Threshold ${config.thresholds.pageWeightKb} KB`
    ),
    check("HTML document", htmlBytes < 150 * 1024 ? PASS : WARN, `${kb(htmlBytes)} KB`),
    check(
      "Failed asset requests",
      fetched.filter((a) => !a.ok).length === 0 ? PASS : FAIL,
      fetched.filter((a) => !a.ok).length
    ),
    check(
      "Uncompressed large assets",
      uncompressed.length === 0 ? PASS : WARN,
      uncompressed.length
    ),
  ];

  for (const a of heaviest) {
    checks.push(
      check(
        a.url.replace(config.siteUrl, ""),
        a.bytes > 500 * 1024 ? WARN : INFO,
        `${kb(a.bytes)} KB`,
        `${a.encoding} · ${a.durationMs} ms`
      )
    );
  }

  return { id: "performance", title: "Performance & Asset Sizes", checks };
}
