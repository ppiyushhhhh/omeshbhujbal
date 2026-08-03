# Daily Website Health Report

Self-contained monitoring automation for the deployed portfolio. **Nothing in this
folder is imported by the portfolio app** — it has its own `package.json`, its own
dependencies, and is never part of the Vite build or the Vercel deployment.

## What it checks

| Area | Checks |
|---|---|
| Uptime & response | Reachability, HTTP status, response time, HTTPS enforcement, HTTP→HTTPS redirect |
| SSL/TLS | Chain trust, days to expiry, issuer, subject |
| SEO metadata | Title, description, canonical, viewport, H1 count, image alts, JSON-LD |
| Open Graph | `og:title/description/type/image/url`, `twitter:card` |
| Crawlability | `robots.txt` rules & sitemap directive, `sitemap.xml` validity and URL count |
| Links | Homepage link crawl (internal + external), broken-link list |
| Security headers | HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, stack disclosure, caching |
| Performance & assets | Total page weight, HTML size, failed assets, uncompressed large assets, heaviest/slowest assets |
| Deployment | Latest Vercel deployment state/URL/commit (optional), edge-cache headers |
| Repository & storage | Source size, Git history size, build output size, tracked files, 30-day commit count, latest commit |

Output: a weighted **health score (0–100)**, an HTML report with SVG charts
(donut score, per-section status bars, 14-run trend line, heaviest-assets bar chart),
a print-quality **A4 PDF**, and a machine-readable JSON snapshot.

## Schedule

`.github/workflows/daily-health-report.yml` runs at **21:00 IST daily** (`30 15 * * *` UTC)
and can be triggered manually via *Actions → Daily Website Health Report → Run workflow*.

## Required GitHub Secrets

| Secret | Required | Purpose |
|---|---|---|
| `SMTP_HOST` | yes | Must be `smtp.gmail.com` |
| `SMTP_PORT` | yes | Must be `587` |
| `SMTP_USER` | yes | SMTP username |
| `SMTP_PASS` | yes | SMTP password / app password |
| `MAIL_FROM` | yes | Sender header value (falls back to `SMTP_USER` if Gmail rejects sender identity) |
| `MAIL_TO` | yes | Recipient(s), comma-separated |
| `VERCEL_TOKEN` | no | Enables latest-deployment details |
| `VERCEL_PROJECT_ID` | no | Scopes the Vercel lookup |
| `VERCEL_TEAM_ID` | no | For team-owned projects |

Optional repository **variables**: `SITE_URL`, `SITE_NAME`.

## Artifacts

Every run uploads `website-health-report-<run_number>` (HTML + PDF + JSON + history,
90-day retention) and refreshes `website-health-report-latest`, which is restored at the
start of the next run so the trend chart keeps its history.

## Run locally

```bash
cd automation
npm install
SITE_URL=https://omeshbhujbal.com REPO_ROOT=.. OUTPUT_DIR=automation/reports npm run report:no-email
open reports/health-report-*.html
```

To test email locally, export the SMTP variables above and run `npm run report`.

## Configuration

All tunables live in `src/config.js` and are env-overridable:
`REQUEST_TIMEOUT_MS`, `MAX_LINKS_CHECKED`, `EXTRA_PATHS`,
`THRESHOLD_RESPONSE_MS`, `THRESHOLD_SSL_DAYS`, `THRESHOLD_PAGE_WEIGHT_KB`, `OUTPUT_DIR`.

## Structure

```
automation/
├── package.json          # isolated deps (nodemailer, puppeteer)
├── src/
│   ├── index.js          # orchestrator
│   ├── config.js         # env-driven configuration
│   ├── mailer.js         # SMTP delivery
│   ├── lib/              # http + status helpers
│   ├── checks/           # one module per health domain
│   └── report/           # charts.js, html.js, pdf.js
└── reports/              # generated output (git-ignored)
```

## Vercel compatibility

`automation/` contains no route, no build step and no app import. Vercel builds only the
Vite project at the repository root, so this folder is inert at deploy time. Generated
reports are git-ignored and only ever exist as workflow artifacts.
