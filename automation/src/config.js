/**
 * Central configuration. Everything is overridable through env vars so the
 * workflow can be reused for any deployment without code changes.
 */

const env = process.env;
const readEnv = (key) => env[key]?.trim();

export const config = {
  siteUrl: (env.SITE_URL || "https://omeshbhujbal.com").replace(/\/$/, ""),
  siteName: env.SITE_NAME || "Omesh Bhujbal — Executive Portfolio",

  // Extra paths crawled in addition to links discovered on the homepage.
  extraPaths: (env.EXTRA_PATHS || "/,/sitemap.xml,/robots.txt")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean),

  timeoutMs: Number(env.REQUEST_TIMEOUT_MS || 20000),
  maxLinksChecked: Number(env.MAX_LINKS_CHECKED || 40),

  thresholds: {
    responseTimeMs: Number(env.THRESHOLD_RESPONSE_MS || 1200),
    sslExpiryDays: Number(env.THRESHOLD_SSL_DAYS || 21),
    pageWeightKb: Number(env.THRESHOLD_PAGE_WEIGHT_KB || 2500),
  },

  paths: {
    repoRoot: env.REPO_ROOT || process.cwd(),
    outDir: env.OUTPUT_DIR || "automation/reports",
  },

  email: {
    enabled: env.SKIP_EMAIL !== "true",
    host: readEnv("SMTP_HOST"),
    port: Number(readEnv("SMTP_PORT") || 587),
    user: readEnv("SMTP_USER"),
    pass: readEnv("SMTP_PASS"),
    from: readEnv("MAIL_FROM"),
    to: readEnv("MAIL_TO"),
    cc: readEnv("MAIL_CC"),
  },

  vercel: {
    token: env.VERCEL_TOKEN,
    projectId: env.VERCEL_PROJECT_ID,
    teamId: env.VERCEL_TEAM_ID,
  },
};

export const TZ = "Asia/Kolkata";

export function nowIST() {
  return new Date().toLocaleString("en-IN", {
    timeZone: TZ,
    dateStyle: "full",
    timeStyle: "short",
  });
}

export function dateStamp() {
  const d = new Date(
    new Date().toLocaleString("en-US", { timeZone: TZ })
  );
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
