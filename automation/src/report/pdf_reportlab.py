#!/usr/bin/env python3
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
TEXT = colors.HexColor("#475569")
MUTED = colors.HexColor("#64748B")
BORDER = colors.HexColor("#E2E8F0")
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


styles = getSampleStyleSheet()
TITLE_STYLE = ParagraphStyle(
    "title", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=16, leading=18, textColor=NAVY, spaceAfter=2
)
SUB_STYLE = ParagraphStyle(
    "sub", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=10, textColor=MUTED
)
SECTION_STYLE = ParagraphStyle(
    "section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=9.5, leading=11, textColor=NAVY, spaceAfter=3
)
BODY_STYLE = ParagraphStyle(
    "body", parent=styles["Normal"], fontName="Helvetica", fontSize=7.6, leading=9.2, textColor=TEXT
)
VALUE_STYLE = ParagraphStyle(
    "value", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=12, leading=13, textColor=NAVY, alignment=TA_LEFT
)
LABEL_STYLE = ParagraphStyle(
    "label", parent=styles["Normal"], fontName="Helvetica", fontSize=7, leading=8.5, textColor=MUTED
)


def normalize(v):
    return str(v or "—")


def badge(status):
    label, color = STATUS_MAP.get(status, ("INFO", MUTED))
    bstyle = ParagraphStyle(
        "badge", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=6.7, leading=8, alignment=TA_CENTER, textColor=color
    )
    t = Table([[Paragraph(label, bstyle)]], colWidths=[16 * mm], rowHeights=[4.5 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.Color(color.red, color.green, color.blue, alpha=0.12)),
                ("TEXTCOLOR", (0, 0), (-1, -1), color),
                ("BOX", (0, 0), (-1, -1), 0.4, color),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return t


def section_by_id(sections, section_id):
    for s in sections:
        if s.get("id") == section_id:
            return s
    return {"checks": []}


def check_by_name(section, name):
    for c in section.get("checks", []):
        if c.get("name", "").lower() == name.lower():
            return c
    return None


def metric_card(title, value, status=None):
    body = [Paragraph(title.upper(), LABEL_STYLE), Paragraph(normalize(value), VALUE_STYLE)]
    if status:
        body.append(badge(status))
    card = Table([[body]], colWidths=[43 * mm], rowHeights=[17 * mm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.8, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return card


def summary_table(rows):
    data = [[Paragraph("Metric", LABEL_STYLE), Paragraph("Value", LABEL_STYLE), Paragraph("Status", LABEL_STYLE)]]
    for name, value, status in rows:
        data.append([Paragraph(name, BODY_STYLE), Paragraph(normalize(value), BODY_STYLE), badge(status)])

    t = Table(data, colWidths=[47 * mm, 38 * mm, 22 * mm], rowHeights=[5.4 * mm] + [4.8 * mm] * (len(data) - 1))
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F8FAFC")),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )
    return t


def priority_badge(priority):
    color = RED if priority == "High" else AMBER if priority == "Medium" else GREEN
    bstyle = ParagraphStyle(
        "priority-badge", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=6.7, leading=8, alignment=TA_CENTER, textColor=color
    )
    t = Table([[Paragraph(priority.upper(), bstyle)]], colWidths=[16 * mm], rowHeights=[4.5 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.Color(color.red, color.green, color.blue, alpha=0.12)),
                ("TEXTCOLOR", (0, 0), (-1, -1), color),
                ("BOX", (0, 0), (-1, -1), 0.4, color),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return t


def recommendation_box(priority, text):
    row = [priority_badge(priority), Paragraph(text, BODY_STYLE)]
    t = Table([row], colWidths=[20 * mm, 56 * mm], rowHeights=[6 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return t


def build_action_items(sections):
    known = {
        "content-security-policy": ("Missing Content Security Policy", "High"),
        "x-frame-options": ("Missing X-Frame-Options", "High"),
        "referrer-policy": ("Missing Referrer Policy", "High"),
        "h1 count": ("Missing H1", "High"),
    }

    items = []
    for s in sections:
        sid = s.get("id", "")
        for c in s.get("checks", []):
            status = c.get("status")
            if status not in ("fail", "warn"):
                continue
            name = c.get("name", "")
            lname = name.lower()
            if lname.startswith("http") and "//" in lname:
                continue
            if lname in known:
                text, priority = known[lname]
            elif sid == "security":
                text = f"{name} requires attention"
                priority = "High" if status == "fail" else "Medium"
            elif sid in ("uptime", "ssl", "crawl"):
                text = f"{name}: {normalize(c.get('value'))}"
                priority = "High" if status == "fail" else "Medium"
            elif sid in ("meta", "performance", "links"):
                text = f"{name}: {normalize(c.get('value'))}"
                priority = "Medium" if status == "fail" else "Low"
            else:
                continue
            items.append((priority, text, 0 if status == "fail" else 1))

    items.sort(key=lambda x: (0 if x[0] == "High" else 1 if x[0] == "Medium" else 2, x[2], x[1]))
    unique = []
    seen = set()
    for p, t, _ in items:
        if t in seen:
            continue
        seen.add(t)
        unique.append((p, t))
    return unique[:4]


def build(payload, out_path):
    sections = payload.get("sections", [])
    state = payload.get("state", {})
    summary = payload.get("summary", {})
    score = payload.get("score", "—")
    site_url = payload.get("siteUrl", "—")
    generated_at = payload.get("generatedAt") or datetime.utcnow().isoformat()

    uptime = section_by_id(sections, "uptime")
    ssl = section_by_id(sections, "ssl")
    links = section_by_id(sections, "links")
    crawl = section_by_id(sections, "crawl")
    sec = section_by_id(sections, "security")
    meta = section_by_id(sections, "meta")
    perf = section_by_id(sections, "performance")

    summary_rows = [
        ("Availability", (check_by_name(uptime, "Uptime") or {}).get("value", "—"), (check_by_name(uptime, "Uptime") or {}).get("status", "info")),
        ("HTTP Status", (check_by_name(uptime, "HTTP status") or {}).get("value", "—"), (check_by_name(uptime, "HTTP status") or {}).get("status", "info")),
        ("HTTPS", (check_by_name(uptime, "HTTPS") or {}).get("value", "—"), (check_by_name(uptime, "HTTPS") or {}).get("status", "info")),
        ("SSL", (check_by_name(ssl, "Days until expiry") or {}).get("value", "—"), (check_by_name(ssl, "Days until expiry") or {}).get("status", "info")),
        ("Broken Links", (check_by_name(links, "Broken links") or {}).get("value", "—"), (check_by_name(links, "Broken links") or {}).get("status", "info")),
        ("robots.txt", (check_by_name(crawl, "robots.txt") or {}).get("value", "—"), (check_by_name(crawl, "robots.txt") or {}).get("status", "info")),
        ("sitemap.xml", (check_by_name(crawl, "sitemap.xml") or {}).get("value", "—"), (check_by_name(crawl, "sitemap.xml") or {}).get("status", "info")),
    ]

    security_items = [c for c in sec.get("checks", []) if c.get("status") in ("fail", "warn")][:4]
    seo_rows = [
        ("Title", (check_by_name(meta, "Title") or {}).get("value", "—"), (check_by_name(meta, "Title") or {}).get("status", "info")),
        ("Meta Description", (check_by_name(meta, "Meta description") or {}).get("value", "—"), (check_by_name(meta, "Meta description") or {}).get("status", "info")),
        ("Canonical", (check_by_name(meta, "Canonical") or {}).get("value", "—"), (check_by_name(meta, "Canonical") or {}).get("status", "info")),
        ("Structured Data", (check_by_name(meta, "Structured data (JSON-LD)") or {}).get("value", "—"), (check_by_name(meta, "Structured data (JSON-LD)") or {}).get("status", "info")),
        ("H1 Status", (check_by_name(meta, "H1 count") or {}).get("value", "—"), (check_by_name(meta, "H1 count") or {}).get("status", "info")),
    ]
    perf_rows = [
        ("Response Time", (check_by_name(uptime, "Response time") or {}).get("value", normalize(state.get("responseTimeMs", "—"))), (check_by_name(uptime, "Response time") or {}).get("status", "info")),
        ("Total Page Size", (check_by_name(perf, "Total page weight") or {}).get("value", "—"), (check_by_name(perf, "Total page weight") or {}).get("status", "info")),
        ("Failed Assets", (check_by_name(perf, "Failed asset requests") or {}).get("value", "—"), (check_by_name(perf, "Failed asset requests") or {}).get("status", "info")),
    ]

    action_items = build_action_items(sections)

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=8 * mm,
        rightMargin=8 * mm,
        topMargin=7 * mm,
        bottomMargin=7 * mm,
    )

    flow = []

    header_left = [
        Paragraph("Daily Website Health Report", TITLE_STYLE),
        Paragraph(f"Website URL: {site_url}", SUB_STYLE),
    ]
    header_right_style = ParagraphStyle(
        "header-right", parent=SUB_STYLE, alignment=TA_RIGHT, textColor=TEXT
    )
    header_right = [Paragraph(f"Generated: {generated_at}", header_right_style)]
    header = Table([[header_left, header_right]], colWidths=[120 * mm, 72 * mm], rowHeights=[13 * mm])
    header.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 1.1, NAVY),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    flow.extend([header, Spacer(1, 3 * mm)])

    website_status = "Online" if summary.get("up") else "Offline"
    website_status_state = "pass" if summary.get("up") else "fail"
    ssl_days = state.get("sslDaysRemaining")
    ssl_value = f"{ssl_days} days" if isinstance(ssl_days, int) else "—"
    ssl_state = (check_by_name(ssl, "Days until expiry") or {}).get("status", "info")

    cards = Table(
        [[
            metric_card("Overall Health Score", f"{score}/100", "pass" if int(score or 0) >= 85 else "warn" if int(score or 0) >= 70 else "fail"),
            metric_card("Website Status", website_status, website_status_state),
            metric_card("Response Time", f"{state.get('responseTimeMs', '—')} ms" if state.get("responseTimeMs") is not None else "—", (check_by_name(uptime, "Response time") or {}).get("status", "info")),
            metric_card("SSL Expiry", ssl_value, ssl_state),
        ]],
        colWidths=[46 * mm, 46 * mm, 46 * mm, 46 * mm],
        rowHeights=[17 * mm],
    )
    cards.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    flow.extend([Paragraph("Executive KPI Cards", SECTION_STYLE), cards, Spacer(1, 2.6 * mm)])

    left_col = [Paragraph("Website Health Summary", SECTION_STYLE), summary_table(summary_rows)]

    security_block = [Paragraph("Security Summary", SECTION_STYLE)]
    if security_items:
        sec_rows = []
        for item in security_items:
            sec_rows.append([
                badge(item.get("status", "warn")),
                Paragraph(f"{item.get('name')}: {normalize(item.get('value'))}", BODY_STYLE),
            ])
        security_table = Table(sec_rows, colWidths=[20 * mm, 54 * mm], rowHeights=[5.4 * mm] * len(sec_rows))
        security_table.setStyle(
            TableStyle(
                [
                    ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.3, BORDER),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 3),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 3),
                    ("TOPPADDING", (0, 0), (-1, -1), 1),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ]
            )
        )
        security_block.append(security_table)
    else:
        security_block.append(Paragraph("No failed or warning security checks.", BODY_STYLE))

    seo_block = [Paragraph("SEO Summary", SECTION_STYLE)]
    seo_block.append(summary_table(seo_rows))

    perf_block = [Paragraph("Performance Summary", SECTION_STYLE)]
    perf_block.append(summary_table(perf_rows))

    actions_block = [Paragraph("Action Items", SECTION_STYLE)]
    if action_items:
        for priority, text in action_items:
            actions_block.append(recommendation_box(priority, text))
            actions_block.append(Spacer(1, 1.2 * mm))
    else:
        actions_block.append(Paragraph("No urgent action items identified.", BODY_STYLE))

    right_stack = []
    right_stack.extend(security_block)
    right_stack.append(Spacer(1, 2.2 * mm))
    right_stack.extend(seo_block)
    right_stack.append(Spacer(1, 2.2 * mm))
    right_stack.extend(perf_block)
    right_stack.append(Spacer(1, 2.2 * mm))
    right_stack.extend(actions_block)

    body = Table([[left_col, right_stack]], colWidths=[108 * mm, 84 * mm])
    body.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    flow.append(body)
    doc.build(flow)


def main():
    if len(sys.argv) < 2:
        raise SystemExit("Usage: pdf_reportlab.py <output_path>")
    out_path = sys.argv[1]
    payload = json.loads(sys.stdin.read() or "{}")
    build(payload, out_path)


if __name__ == "__main__":
    main()
