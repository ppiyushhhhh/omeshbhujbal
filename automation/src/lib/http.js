import { config } from "../config.js";

/** Fetch with timeout + timing, never throws. */
export async function timedFetch(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  const start = performance.now();
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "WebsiteHealthBot/1.0 (+github-actions)" },
      ...options,
    });
    const body = options.method === "HEAD" ? "" : await res.text();
    return {
      ok: true,
      status: res.status,
      finalUrl: res.url,
      headers: Object.fromEntries(res.headers.entries()),
      body,
      bytes: Buffer.byteLength(body || ""),
      durationMs: Math.round(performance.now() - start),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error.name === "AbortError" ? "Timeout" : error.message,
      durationMs: Math.round(performance.now() - start),
    };
  } finally {
    clearTimeout(timer);
  }
}

export function absolute(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}
