import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

const meta = (html, re) => (html.match(re) || [])[1]?.trim();

/** Title, description, canonical, headings, image alts, Open Graph / Twitter. */
export async function metadataCheck(state) {
  const html = state.home?.body || "";
  const checks = [];

  const title = meta(html, /<title[^>]*>([^<]*)<\/title>/i);
  checks.push(
    check(
      "Title",
      !title ? FAIL : title.length > 60 ? WARN : PASS,
      title ? `${title} (${title.length} chars)` : "Missing",
      "Recommended under 60 characters"
    )
  );

  const desc = meta(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  checks.push(
    check(
      "Meta description",
      !desc ? FAIL : desc.length > 160 ? WARN : PASS,
      desc ? `${desc.length} chars` : "Missing",
      desc || ""
    )
  );

  const canonical = meta(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  checks.push(check("Canonical", canonical ? PASS : WARN, canonical || "Missing"));

  const viewport = /name=["']viewport["']/i.test(html);
  checks.push(check("Viewport", viewport ? PASS : FAIL, viewport ? "Present" : "Missing"));

  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  checks.push(check("H1 count", h1 === 1 ? PASS : h1 === 0 ? FAIL : WARN, h1));

  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = imgs.filter((t) => !/\balt=/.test(t)).length;
  checks.push(
    check("Images without alt", missingAlt === 0 ? PASS : WARN, `${missingAlt}/${imgs.length}`)
  );

  const jsonLd = /<script[^>]+application\/ld\+json/i.test(html);
  checks.push(check("Structured data (JSON-LD)", jsonLd ? PASS : WARN, jsonLd ? "Present" : "Missing"));

  const ogChecks = [];
  for (const p of ["og:title", "og:description", "og:type", "og:image", "og:url"]) {
    const v = meta(html, new RegExp(`<meta[^>]+property=["']${p}["'][^>]+content=["']([^"']*)["']`, "i"));
    ogChecks.push(check(p, v ? PASS : p === "og:image" ? WARN : FAIL, v || "Missing"));
  }
  const tw = meta(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i);
  ogChecks.push(check("twitter:card", tw ? PASS : WARN, tw || "Missing"));
  ogChecks.push(check("Document size", INFO, `${(state.home?.bytes || 0) / 1024 | 0} KB`));

  return [
    { id: "meta", title: "SEO Metadata", checks },
    { id: "og", title: "Open Graph & Social", checks: ogChecks },
  ];
}
