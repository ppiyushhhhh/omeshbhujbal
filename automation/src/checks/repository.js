import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { config } from "../config.js";
import { check, PASS, WARN, INFO } from "../lib/status.js";

const sh = (cmd) => {
  try {
    return execSync(cmd, { cwd: config.paths.repoRoot, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};

function dirSize(dir, skip = new Set([".git", "node_modules", "automation/reports"])) {
  let total = 0;
  const walk = (d, rel = "") => {
    let entries = [];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (skip.has(e.name) || skip.has(r)) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full, r);
      else {
        try {
          total += fs.statSync(full).size;
        } catch {
          /* ignore */
        }
      }
    }
  };
  walk(dir);
  return total;
}

const mb = (b) => (b / 1048576).toFixed(2);

/** Repository size, storage usage and latest Git commit metadata. */
export async function repositoryCheck(state) {
  const root = config.paths.repoRoot;
  const sourceBytes = dirSize(root);
  const gitBytes = fs.existsSync(path.join(root, ".git")) ? dirSize(path.join(root, ".git"), new Set()) : 0;
  const distDir = path.join(root, "dist");
  const buildBytes = fs.existsSync(distDir) ? dirSize(distDir, new Set()) : 0;

  const commit = {
    hash: sh("git rev-parse --short HEAD"),
    subject: sh("git log -1 --pretty=%s"),
    author: sh("git log -1 --pretty=%an"),
    date: sh("git log -1 --date=iso --pretty=%ad"),
    branch: sh("git rev-parse --abbrev-ref HEAD"),
  };
  const commits30d = sh('git rev-list --count --since="30 days ago" HEAD') || "0";
  const commitsToday = sh('git rev-list --count --since="midnight" HEAD') || "0";
  const remoteUrl = sh("git config --get remote.origin.url").replace(/\/\/[^@/]*@/, "//");
  const repoName =
    process.env.GITHUB_REPOSITORY ||
    ((remoteUrl.replace(/\.git$/, "").split("/").filter(Boolean).slice(-2).join("/")) || "").slice(0, 60) ||
    "—";
  const trackedFiles = (sh("git ls-files").match(/\n/g) || []).length + 1;

  state.repository = { sourceBytes, gitBytes, buildBytes, commit, commits30d, commitsToday, repoName };

  const totalMb = Number(mb(sourceBytes + gitBytes));

  return {
    id: "repository",
    title: "Repository & Storage",
    checks: [
      check("Source size (excl. node_modules)", sourceBytes < 200 * 1048576 ? PASS : WARN, `${mb(sourceBytes)} MB`),
      check("Git history size", gitBytes < 500 * 1048576 ? PASS : WARN, `${mb(gitBytes)} MB`),
      check("Build output (dist/)", INFO, buildBytes ? `${mb(buildBytes)} MB` : "Not built in this run"),
      check("Total repo footprint", totalMb < 700 ? PASS : WARN, `${totalMb} MB`),
      check("Tracked files", INFO, trackedFiles),
      check("Commits (last 30 days)", Number(commits30d) > 0 ? PASS : WARN, commits30d),
      check("Latest commit", INFO, `${commit.hash} — ${commit.subject}`, `${commit.author} · ${commit.date} · ${commit.branch}`),
    ],
  };
}
