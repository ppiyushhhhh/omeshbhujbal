import { config } from "../config.js";
import { timedFetch } from "../lib/http.js";
import { check, PASS, WARN, FAIL } from "../lib/status.js";

/** Uptime, HTTP status, response time, redirects, HTTPS enforcement. */
export async function uptimeCheck(state) {
  const res = await timedFetch(config.siteUrl);
  state.home = res;

  const checks = [];
  if (!res.ok) {
    checks.push(check("Uptime", FAIL, "DOWN", res.error));
    return { id: "uptime", title: "Uptime & Response", checks };
  }

  checks.push(
    check("Uptime", res.status < 400 ? PASS : FAIL, res.status < 400 ? "UP" : "DOWN")
  );
  checks.push(
    check(
      "HTTP status",
      res.status === 200 ? PASS : res.status < 400 ? WARN : FAIL,
      res.status
    )
  );

  const t = res.durationMs;
  checks.push(
    check(
      "Response time",
      t <= config.thresholds.responseTimeMs
        ? PASS
        : t <= config.thresholds.responseTimeMs * 2
          ? WARN
          : FAIL,
      `${t} ms`,
      `Threshold ${config.thresholds.responseTimeMs} ms`
    )
  );

  checks.push(
    check(
      "HTTPS",
      res.finalUrl.startsWith("https://") ? PASS : FAIL,
      res.finalUrl.startsWith("https://") ? "Enforced" : "Not enforced"
    )
  );

  const httpUrl = config.siteUrl.replace(/^https:/, "http:");
  const redirect = await timedFetch(httpUrl, { method: "HEAD" });
  checks.push(
    check(
      "HTTP → HTTPS redirect",
      redirect.ok && redirect.finalUrl?.startsWith("https://") ? PASS : WARN,
      redirect.ok ? (redirect.finalUrl?.startsWith("https://") ? "OK" : "Missing") : "Unreachable"
    )
  );

  state.responseTimeMs = t;
  return { id: "uptime", title: "Uptime & Response", checks };
}
