import { config } from "../config.js";
import { check, PASS, WARN, FAIL, INFO } from "../lib/status.js";

/**
 * Latest Vercel deployment. Optional: only runs when VERCEL_TOKEN is provided.
 * Falls back to deployment fingerprints exposed by the site's response headers.
 */
export async function deploymentCheck(state) {
  const headers = state.home?.headers || {};
  const checks = [];

  if (config.vercel.token) {
    const params = new URLSearchParams({ limit: "1" });
    if (config.vercel.projectId) params.set("projectId", config.vercel.projectId);
    if (config.vercel.teamId) params.set("teamId", config.vercel.teamId);

    try {
      const res = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
        headers: { Authorization: `Bearer ${config.vercel.token}` },
      });
      const data = await res.json();
      const d = data?.deployments?.[0];
      if (d) {
        state.deployment = d;
        const ready = d.state === "READY" || d.readyState === "READY";
        checks.push(check("Latest deployment state", ready ? PASS : FAIL, d.state || d.readyState));
        checks.push(check("Deployment URL", INFO, d.url));
        checks.push(
          check(
            "Deployed at",
            INFO,
            new Date(d.created || d.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          )
        );
        checks.push(check("Target", INFO, d.target || "production"));
        checks.push(check("Commit", INFO, d.meta?.githubCommitSha?.slice(0, 7) || "—", d.meta?.githubCommitMessage || ""));
      } else {
        checks.push(check("Vercel API", WARN, "No deployments returned"));
      }
    } catch (e) {
      checks.push(check("Vercel API", WARN, "Unavailable", e.message));
    }
  } else {
    checks.push(check("Vercel API", INFO, "Skipped", "Set VERCEL_TOKEN to include deployment details"));
  }

  checks.push(check("Edge cache", INFO, headers["x-vercel-cache"] || headers["cf-cache-status"] || "—"));
  checks.push(check("Served by", INFO, headers["server"] || headers["x-vercel-id"] || "—"));
  checks.push(check("Last-Modified / Age", INFO, headers["last-modified"] || headers["age"] || "—"));

  return { id: "deployment", title: "Deployment", checks };
}
