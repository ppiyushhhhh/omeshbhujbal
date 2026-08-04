#!/usr/bin/env python3
"""One-page A4 executive dashboard for the Daily Website Health Report."""
import json
import sys
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

NAVY = colors.HexColor("#0F172A")
SLATE = colors.HexColor("#334155")
TEXT = colors.HexColor("#475569")
MUTED = colors.HexColor("#64748B")
BORDER = colors.HexColor("#E2E8F0")
SOFT = colors.HexColor("#F8FAFC")
WHITE = colors.white
GREEN = colors.HexColor("#16A34A")
AMBER = colors.HexColor("#D97706")
RED = colors.HexColor("#DC2626")

STATUS_MAP = {
    "pass": ("PASS", GREEN),
    "warn": ("WARN", AMBER),
    "fail": ("FAIL", RED),
    "info": ("INFO", MUTED),
}

PAGE_W = 190 * mm          # A4 width minus 10mm margins each side
COL_GAP = 4 * mm
COL3 = (PAGE_W - 2 * COL_GAP) / 3

styles = getSampleStyleSheet()


def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)


TITLE_STYLE = S("title", fontName="Helvetica-Bold", fontSize=15, leading=17, textColor=WHITE)
HEADER_SUB = S("hsub", fontName="Helvetica", fontSize=7.6, leading=9.6, textColor=colors.HexColor("#CBD5E1"))
HEADER_SUB_R = S("hsubr", parent=HEADER_SUB, alignment=TA_RIGHT)
META_LABEL = S("mlabel", fontName="Helvetica", fontSize=6, leading=7.4, textColor=MUTED)
META_VALUE = S("mvalue", fontName="Helvetica-Bold", fontSize=7.6, leading=9, textColor=NAVY)
SECTION_STYLE = S("section", fontName="Helvetica-Bold", fontSize=8.8, leading=10.5, textColor=NAVY)
BODY = S("body", fontName="Helvetica", fontSize=7, leading=8.6, textColor=TEXT)
BODY_B = S("bodyb", parent=BODY, fontName="Helvetica-Bold", textColor=SLATE)
TH = S("th", fontName="Helvetica-Bold", fontSize=6.2, leading=7.6, textColor=MUTED)
KPI_LABEL = S("kpilabel", fontName="Helvetica", fontSize=5.7, leading=7, textColor=MUTED, alignment=TA_CENTER)
KPI_VALUE = S("kpivalue", fontName="Helvetica-Bold", fontSize=12.5, leading=14, textColor=NAVY, alignment=TA_CENTER)
FOOTER = S("footer", fontName="Helvetica", fontSize=6.4, leading=8, textColor=MUTED, alignment=TA_CENTER)


def norm(v):
    if v is None or v == "":
        return "—"
    return str(v)


def wrap(text, limit=46):
    """Escape and hard-truncate overly long values so nothing overflows."""
    t = norm(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    if len(t) > limit * 3:
        t = t[: limit * 3 - 1] + "\u2026"
    return t


def badge(status, width=14 * mm):
    label, color = STATUS_MAP.get(status, ("INFO", MUTED))
    bstyle = S("badge", fontName="Helvetica-Bold", fontSize=5.9, leading=7,
               alignment=TA_CENTER, textColor=color)
    t = Table([[Paragraph(label, bstyle)]], colWidths=[width], rowHeights=[3.8 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.Color(color.red, color.green, color.blue, alpha=0.10)),
        ("BOX", (0, 0), (-1, -1), 0.4, colors.Color(color.red, color.green, color.blue, alpha=0.55)),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def section_by_id(sections, sid):
    for s in sections:
        if s.get("id") == sid:
            return s
    return {"checks": []}


def check_by_name(section, name):
    for c in section.get("checks", []):
        if c.get("name", "").lower() == name.lower():
            return c
    return {}


def cv(section, name, default="—"):
    c = check_by_name(section, name)
    return (norm(c.get("value")) if c.get("value") not in (None, "") else default, c.get("status", "info"))


# ---------------------------------------------------------------- components

def header_block(site_url, generated_at, meta):
    left = [Paragraph("Daily Website Health Report", TITLE_STYLE),
            Paragraph(wrap(site_url, 60), HEADER_SUB)]
    right = [Paragraph(f"Generated {norm(generated_at)}", HEADER_SUB_R),
             Paragraph("Automated monitoring · executive summary", HEADER_SUB_R)]
    t = Table([[left, right]], colWidths=[118 * mm, 72 * mm], rowHeights=[16 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (0, 0), 6), ("RIGHTPADDING", (-1, 0), (-1, 0), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return t


def meta_strip(items):
    cells = []
    for label, value in items:
        cells.append([Paragraph(label.upper(), META_LABEL), Paragraph(wrap(value, 28), META_VALUE)])
    w = PAGE_W / len(items)
    t = Table([cells], colWidths=[w] * len(items), rowHeights=[9.5 * mm])
    style = [
        ("BACKGROUND", (0, 0), (-1, -1), SOFT),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]
    for i in range(1, len(items)):
        style.append(("LINEBEFORE", (i, 0), (i, 0), 0.5, BORDER))
    t.setStyle(TableStyle(style))
    return t


def kpi_row(cards):
    n = len(cards)
    w = PAGE_W / n
    cells = []
    for label, value, status in cards:
        inner = [Paragraph(label.upper(), KPI_LABEL), Spacer(1, 1.1 * mm),
                 Paragraph(norm(value), KPI_VALUE), Spacer(1, 1.1 * mm)]
        c = Table([[inner], [badge(status, width=w - 10 * mm)]],
                  colWidths=[w - 3 * mm], rowHeights=[13 * mm, 5 * mm])
        c.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), WHITE),
            ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
            ("VALIGN", (0, 0), (0, 0), "MIDDLE"),
            ("VALIGN", (0, 1), (0, 1), "TOP"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("LEFTPADDING", (0, 0), (-1, -1), 2), ("RIGHTPADDING", (0, 0), (-1, -1), 2),
            ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ]))
        cells.append(c)
    t = Table([cells], colWidths=[w] * n)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ]))
    return t


def data_table(rows, width, with_status=True, headers=("Metric", "Value", "Status")):
    """rows: (metric, value, status|None)"""
    if with_status:
        widths = [width * 0.35, width * 0.45, width * 0.20]
        data = [[Paragraph(headers[0], TH), Paragraph(headers[1], TH), Paragraph(headers[2], TH)]]
    else:
        widths = [width * 0.38, width * 0.62]
        data = [[Paragraph(headers[0], TH), Paragraph(headers[1], TH)]]

    for row in rows:
        name, value = row[0], row[1]
        cells = [Paragraph(wrap(name, 30), BODY_B), Paragraph(wrap(value, 34), BODY)]
        if with_status:
            cells.append(badge(row[2] or "info", width=widths[2] - 3 * mm))
        data.append(cells)

    t = Table(data, colWidths=widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), SOFT),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.5), ("RIGHTPADDING", (0, 0), (-1, -1), 3.5),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]
    for i in range(2, len(data), 2):
        style.append(("BACKGROUND", (0, i), (-1, i), colors.HexColor("#FCFDFE")))
    t.setStyle(TableStyle(style))
    return t


def pair_grid(rows, columns=3):
    """Label/value pairs laid out in an aligned multi-column grid."""
    per = -(-len(rows) // columns)
    cols = [rows[i * per:(i + 1) * per] for i in range(columns)]
    cols = [c + [("", "—", "info")] * (per - len(c)) for c in cols]

    data = []
    for r in range(per):
        row = []
        for c in cols:
            name, value, status = c[r]
            row.append(Paragraph(wrap(name, 26), BODY_B) if name else Paragraph("", BODY))
            row.append(Paragraph(wrap(value, 34), BODY) if name else Paragraph("", BODY))
        data.append(row)

    unit = PAGE_W / columns
    widths = []
    for _ in range(columns):
        widths += [unit * 0.42, unit * 0.58]
    t = Table(data, colWidths=widths, rowHeights=[5.0 * mm] * per)
    style = [
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.5), ("RIGHTPADDING", (0, 0), (-1, -1), 3.5),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
    ]
    for i in range(0, per, 2):
        style.append(("BACKGROUND", (0, i), (-1, i), colors.HexColor("#FCFDFE")))
    for c in range(columns):
        style.append(("BACKGROUND", (c * 2, 0), (c * 2, -1), SOFT))
        if c:
            style.append(("LINEBEFORE", (c * 2, 0), (c * 2, -1), 0.7, BORDER))
    t.setStyle(TableStyle(style))
    return t


def block(title, table):
    return [Paragraph(title, SECTION_STYLE), Spacer(1, 1.4 * mm), table]


def footer_block():
    line1 = Paragraph("Generated automatically by the Website Monitoring System", FOOTER)
    line2 = Paragraph("Powered by Vercel · GitHub · GitHub Actions · Uptime Monitoring", FOOTER)
    t = Table([[line1], [line2]], colWidths=[PAGE_W], rowHeights=[4.4 * mm, 4.4 * mm])
    t.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, 0), 0.6, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


# ---------------------------------------------------------------------- build

def perf_grade(score):
    try:
        s = int(score)
    except (TypeError, ValueError):
        return "—", "info"
    if s >= 90:
        return "A", "pass"
    if s >= 80:
        return "B", "pass"
    if s >= 70:
        return "C", "warn"
    return "D", "fail"


def build(payload, out_path):
    sections = payload.get("sections", [])
    state = payload.get("state", {})
    summary = payload.get("summary", {})
    score = payload.get("score", 0)
    site_url = payload.get("siteUrl", "—")
    generated_at = payload.get("generatedAt") or datetime.utcnow().isoformat()
    git = payload.get("githubActivity", {}) or {}
    rmeta = payload.get("reportMeta", {}) or {}

    uptime = section_by_id(sections, "uptime")
    ssl = section_by_id(sections, "ssl")
    links = section_by_id(sections, "links")
    crawl = section_by_id(sections, "crawl")
    meta = section_by_id(sections, "meta")
    og = section_by_id(sections, "og")
    perf = section_by_id(sections, "performance")

    up = bool(summary.get("up"))
    ssl_days = state.get("sslDaysRemaining")
    rtime = state.get("responseTimeMs")

    doc = SimpleDocTemplate(out_path, pagesize=A4,
                            leftMargin=10 * mm, rightMargin=10 * mm,
                            topMargin=9 * mm, bottomMargin=8 * mm,
                            title="Daily Website Health Report")

    flow = [header_block(site_url, generated_at, rmeta), Spacer(1, 2.6 * mm)]

    flow.append(meta_strip([
        ("Environment", rmeta.get("environment", "Production")),
        ("Monitoring interval", rmeta.get("monitoringInterval", "—")),
        ("Git branch", rmeta.get("branch", git.get("branch", "—"))),
        ("Latest deployment", rmeta.get("latestDeployment", "—")),
    ]))
    flow.append(Spacer(1, 2.8 * mm))

    score_status = "pass" if int(score or 0) >= 85 else "warn" if int(score or 0) >= 70 else "fail"
    http_v, http_s = cv(uptime, "HTTP status")
    rt_v, rt_s = cv(uptime, "Response time", f"{rtime} ms" if rtime is not None else "—")
    ssl_v, ssl_s = cv(ssl, "Days until expiry", f"{ssl_days} days" if isinstance(ssl_days, int) else "—")
    uptime_pct = "100%" if up else "0%"

    flow.append(kpi_row([
        ("Health Score", f"{score}/100", score_status),
        ("Website Status", "Online" if up else "Offline", "pass" if up else "fail"),
        ("Response Time", f"{rtime} ms" if rtime is not None else "—", rt_s),
        ("SSL Days Left", str(ssl_days) if isinstance(ssl_days, int) else "—", ssl_s),
        ("HTTP Status", http_v, http_s),
        ("Uptime (24h)", uptime_pct, "pass" if up else "fail"),
    ]))
    flow.append(Spacer(1, 3.2 * mm))

    # ---- Website Health Summary
    health_rows = [
        ("Availability", *cv(uptime, "Uptime")),
        ("HTTPS", *cv(uptime, "HTTPS")),
        ("HTTP Status", http_v, http_s),
        ("robots.txt", *cv(crawl, "robots.txt")),
        ("sitemap.xml", *cv(crawl, "sitemap.xml")),
        ("Broken Links", *cv(links, "Broken links")),
        ("SSL Status", *cv(ssl, "Chain trusted")),
        ("Domain Status", "Resolving" if up else "Unreachable", "pass" if up else "fail"),
    ]

    # ---- Performance Summary
    perf_g, perf_gs = perf_grade(score)
    perf_rows = [
        ("Response Time", rt_v, rt_s),
        ("Total Page Size", *cv(perf, "Total page weight")),
        ("Failed Assets", *cv(perf, "Failed asset requests")),
        ("Largest Contentful Paint", norm(state.get("lcp")), "info"),
        ("First Contentful Paint", norm(state.get("fcp")), "info"),
        ("DOM Load Time", norm(state.get("domLoad")), "info"),
        ("TTFB", f"{rtime} ms" if rtime is not None else "—", rt_s),
        ("CLS Score", norm(state.get("cls")), "info"),
        ("Performance Grade", perf_g, perf_gs),
    ]

    # ---- SEO Summary
    title_c = check_by_name(meta, "Title")
    title_val = norm(title_c.get("value"))
    if "(" in title_val and "chars" in title_val:
        title_val = title_val[title_val.rfind("(") + 1:].replace(")", "")
    og_present = sum(1 for c in og.get("checks", []) if c.get("name", "").startswith("og:") and c.get("status") == "pass")
    og_total = sum(1 for c in og.get("checks", []) if c.get("name", "").startswith("og:"))
    robots_block = check_by_name(crawl, "robots.txt").get("status") == "fail"
    seo_rows = [
        ("Title Length", title_val, title_c.get("status", "info")),
        ("Meta Description", *cv(meta, "Meta description")),
        ("Canonical URL", *cv(meta, "Canonical")),
        ("Structured Data", *cv(meta, "Structured data (JSON-LD)")),
        ("Open Graph", f"{og_present}/{og_total} tags", "pass" if og_present == og_total and og_total else "warn"),
        ("Twitter Card", *cv(og, "twitter:card")),
        ("H1 Status", *cv(meta, "H1 count")),
        ("Indexability", "Blocked" if robots_block else "Indexable", "fail" if robots_block else "pass"),
    ]

    # ---- Git & Deployment Summary
    dstatus = norm(git.get("deploymentStatus"))
    dstate = "pass" if dstatus.upper() == "READY" else "info" if dstatus in ("—", "Not connected", "Unknown") else "warn"
    wstatus = norm(git.get("workflowStatus"))
    wstate = "pass" if wstatus.lower() in ("success", "completed") else "info"
    git_rows = [
        ("Commit Message", git.get("commitMessage"), "info"),
        ("Commit ID", git.get("commitSha"), "info"),
        ("Commit Author", git.get("commitAuthor"), "info"),
        ("Commit Time", git.get("commitDateTime"), "info"),
        ("Current Branch", git.get("branch"), "info"),
        ("Repository", git.get("repository"), "info"),
        ("Deployment Platform", git.get("platform", "Vercel"), "info"),
        ("Deployment Status", dstatus, dstate),
        ("Deployment Duration", git.get("deploymentDuration"), "info"),
        ("Build Time", git.get("buildTime"), "info"),
        ("Previous Deployment", git.get("previousDeploymentTime"), "info"),
        ("Commits Today", git.get("commitsToday"), "info"),
        ("Last Successful Build", git.get("lastSuccessfulBuild"), "info"),
        ("Workflow Name", git.get("workflowName"), "info"),
        ("Workflow Status", wstatus, wstate),
        ("Workflow Run", git.get("workflowRunNumber"), "info"),
        ("Workflow Duration", git.get("workflowDuration"), "info"),
    ]
    git_rows = [(n, norm(v), s) for n, v, s in git_rows]

    def col(title, rows):
        return [Paragraph(title, SECTION_STYLE), Spacer(1, 1.4 * mm), data_table(rows, COL3)]

    top = Table([[col("Website Health Summary", health_rows),
                  col("Performance Summary", perf_rows),
                  col("SEO Summary", seo_rows)]],
                colWidths=[COL3 + COL_GAP, COL3 + COL_GAP, COL3], hAlign="LEFT")
    top.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (1, 0), COL_GAP), ("RIGHTPADDING", (2, 0), (2, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    flow.append(top)
    flow.append(Spacer(1, 3.4 * mm))

    flow.append(Paragraph("Git &amp; Deployment Summary", SECTION_STYLE))
    flow.append(Spacer(1, 1.4 * mm))
    flow.append(pair_grid(git_rows))
    flow.append(Spacer(1, 3.4 * mm))
    flow.append(footer_block())

    doc.build(flow)


def main():
    if len(sys.argv) < 2:
        raise SystemExit("Usage: pdf_reportlab.py <output_path>")
    payload = json.loads(sys.stdin.read() or "{}")
    build(payload, sys.argv[1])


if __name__ == "__main__":
    main()
