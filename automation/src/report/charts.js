/** Dependency-free inline SVG charts (render identically in email, HTML and PDF). */

const COLORS = { pass: "#16a34a", warn: "#f59e0b", fail: "#dc2626", info: "#64748b", accent: "#4f46e5" };

export function donutChart(score) {
  const r = 68;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const dash = (pct / 100) * c;
  const color = pct >= 90 ? COLORS.pass : pct >= 70 ? COLORS.warn : COLORS.fail;
  return `<svg viewBox="0 0 180 180" width="180" height="180" role="img" aria-label="Health score ${pct}">
  <circle cx="90" cy="90" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="16"/>
  <circle cx="90" cy="90" r="${r}" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"
    stroke-dasharray="${dash.toFixed(1)} ${(c - dash).toFixed(1)}" transform="rotate(-90 90 90)"/>
  <text x="90" y="84" text-anchor="middle" font-size="40" font-weight="700" fill="#0f172a">${pct}</text>
  <text x="90" y="108" text-anchor="middle" font-size="13" fill="#64748b">HEALTH SCORE</text>
</svg>`;
}

export function statusBars(sections) {
  const rows = sections.map((s) => {
    const total = s.checks.length || 1;
    const counts = { pass: 0, warn: 0, fail: 0, info: 0 };
    s.checks.forEach((c) => counts[c.status]++);
    return { title: s.title, counts, total };
  });
  const rowH = 30;
  const width = 620;
  const barX = 210;
  const barW = 360;
  const body = rows
    .map((r, i) => {
      const y = i * rowH + 14;
      let x = barX;
      const segs = ["pass", "warn", "fail", "info"]
        .map((k) => {
          const w = (r.counts[k] / r.total) * barW;
          const rect = w > 0 ? `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="14" fill="${COLORS[k]}" rx="3"/>` : "";
          x += w;
          return rect;
        })
        .join("");
      return `<text x="0" y="${y + 12}" font-size="12" fill="#334155">${escapeXml(r.title)}</text>${segs}
      <text x="${barX + barW + 10}" y="${y + 12}" font-size="11" fill="#64748b">${r.counts.pass}/${r.total}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${width} ${rows.length * rowH + 20}" width="100%" role="img" aria-label="Checks by section">${body}</svg>`;
}

export function trendChart(history) {
  if (!history || history.length < 2) return "";
  const pts = history.slice(-14);
  const w = 620;
  const h = 180;
  const pad = 30;
  const stepX = (w - pad * 2) / (pts.length - 1);
  const toY = (v) => h - pad - (v / 100) * (h - pad * 2);
  const line = pts.map((p, i) => `${pad + i * stepX},${toY(p.score)}`).join(" ");
  const dots = pts
    .map((p, i) => `<circle cx="${pad + i * stepX}" cy="${toY(p.score)}" r="3.5" fill="${COLORS.accent}"/>`)
    .join("");
  const labels = pts
    .map((p, i) =>
      i % Math.ceil(pts.length / 7) === 0
        ? `<text x="${pad + i * stepX}" y="${h - 8}" font-size="10" fill="#94a3b8" text-anchor="middle">${p.date.slice(5)}</text>`
        : ""
    )
    .join("");
  const grid = [0, 50, 100]
    .map((v) => `<line x1="${pad}" y1="${toY(v)}" x2="${w - pad}" y2="${toY(v)}" stroke="#e2e8f0"/>
      <text x="4" y="${toY(v) + 4}" font-size="10" fill="#94a3b8">${v}</text>`)
    .join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Health score trend">
  ${grid}<polyline fill="none" stroke="${COLORS.accent}" stroke-width="2.5" points="${line}"/>${dots}${labels}</svg>`;
}

export function assetChart(performance) {
  const items = performance?.heaviest || [];
  if (!items.length) return "";
  const max = Math.max(...items.map((i) => i.bytes)) || 1;
  const rowH = 28;
  const body = items
    .map((a, i) => {
      const y = i * rowH + 12;
      const w = (a.bytes / max) * 330;
      const name = a.url.split("/").pop().slice(0, 34);
      return `<text x="0" y="${y + 11}" font-size="11" fill="#334155">${escapeXml(name)}</text>
      <rect x="250" y="${y}" width="${w.toFixed(1)}" height="14" fill="${COLORS.accent}" rx="3"/>
      <text x="${250 + w + 8}" y="${y + 12}" font-size="10" fill="#64748b">${Math.round(a.bytes / 1024)} KB</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 640 ${items.length * rowH + 16}" width="100%" role="img" aria-label="Heaviest assets">${body}</svg>`;
}

export function escapeXml(s = "") {
  return String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]);
}
