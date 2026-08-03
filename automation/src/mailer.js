import fs from "node:fs";
import nodemailer from "nodemailer";
import { config, nowIST } from "./config.js";

/** Send the report via SMTP with the PDF attached and the HTML inline. */
export async function sendReport({ html, pdfPath, score, summary }) {
  const { email } = config;
  if (!email.enabled) return { sent: false, reason: "SKIP_EMAIL=true" };
  if (!email.host || !email.user || !email.pass || !email.to) {
    return { sent: false, reason: "SMTP credentials or MAIL_TO not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.secure || email.port === 465,
    auth: { user: email.user, pass: email.pass },
  });

  await transporter.verify();

  const flag = summary.counts.fail > 0 ? "🔴" : summary.counts.warn > 0 ? "🟡" : "🟢";
  const info = await transporter.sendMail({
    from: email.from,
    to: email.to.split(",").map((s) => s.trim()),
    subject: `${flag} Daily Website Health Report — ${config.siteName} — Score ${score}/100`,
    text: `Health score: ${score}/100
Passed: ${summary.counts.pass} · Warnings: ${summary.counts.warn} · Failures: ${summary.counts.fail}
Site: ${config.siteUrl}
Generated: ${nowIST()} IST

The full report is attached as a PDF.`,
    html,
    attachments: fs.existsSync(pdfPath)
      ? [{ filename: pdfPath.split("/").pop(), path: pdfPath, contentType: "application/pdf" }]
      : [],
  });

  return { sent: true, messageId: info.messageId };
}
