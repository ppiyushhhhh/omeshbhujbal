import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

const REQUIRED = [
  ["strict-transport-security", FAIL, "HSTS not set"],
  ["content-security-policy", WARN, "No CSP"],
  ["x-content-type-options", WARN, "MIME sniffing not blocked"],
  ["x-frame-options", WARN, "Clickjacking protection missing"],
  ["referrer-policy", WARN, "Referrer policy missing"],
  ["permissions-policy", WARN, "Permissions policy missing"],
];

/** Security response headers + information disclosure. */
export async function securityHeadersCheck(state) {
  const headers = state.home?.headers || {};
  const checks = REQUIRED.map(([name, severity, missingNote]) =>
    headers[name]
      ? check(name, PASS, String(headers[name]).slice(0, 90))
      : check(name, severity, "Missing", missingNote)
  );

  if (headers["x-powered-by"]) {
    checks.push(check("x-powered-by", WARN, headers["x-powered-by"], "Discloses stack"));
  }
  checks.push(check("Server", INFO, headers["server"] || "Not disclosed"));
  checks.push(check("Cache-Control", headers["cache-control"] ? PASS : WARN, headers["cache-control"] || "Missing"));

  return { id: "security", title: "Security Headers", checks };
}
