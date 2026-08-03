import fs from "node:fs";
import nodemailer from "nodemailer";
import { config, nowIST } from "./config.js";

const REQUIRED_EMAIL_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "MAIL_TO",
];

function parseAddressParts(address) {
  const value = String(address || "").trim();
  const match = value.match(/^(.*)<([^>]+)>$/);
  if (!match) return { name: "", email: value };
  return { name: match[1].trim().replace(/^"|"$/g, ""), email: match[2].trim() };
}

function buildFallbackFrom(fromValue, fallbackEmail) {
  const { name } = parseAddressParts(fromValue);
  return name ? `"${name}" <${fallbackEmail}>` : fallbackEmail;
}

function shouldFallbackSender(error) {
  const text = [
    error?.code,
    error?.response,
    error?.message,
    error?.responseCode ? `responseCode:${error.responseCode}` : "",
  ]
    .filter(Boolean)
    .join(" | ")
    .toLowerCase();
  return (
    text.includes("sender address rejected") ||
    text.includes("from") && text.includes("not") && text.includes("owned") ||
    text.includes("not allowed to send as") ||
    text.includes("not authorized") ||
    text.includes("unauthenticated")
  );
}

function logNodemailerError(error) {
  console.error("Nodemailer error:", error);
  console.error("SMTP response:", error?.response ?? "N/A");
  console.error("Authentication error:", error?.code ?? "N/A");
  console.error("Stack trace:", error?.stack ?? "N/A");
}

/** Send the report via SMTP with the PDF attached and the HTML inline. */
export async function sendReport({ html, pdfPath, score, summary }) {
  const { email } = config;
  if (!email.enabled) return { sent: false, reason: "SKIP_EMAIL=true" };

  const missingVars = REQUIRED_EMAIL_ENV.filter((key) => !process.env[key]?.trim());
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  if (!pdfPath || !fs.existsSync(pdfPath)) {
    throw new Error(`Generated PDF is missing: ${pdfPath || "(empty path)"}`);
  }

  if (email.host !== "smtp.gmail.com") {
    throw new Error(`Invalid SMTP_HOST "${email.host}". Expected smtp.gmail.com`);
  }
  if (email.port !== 587) {
    throw new Error(`Invalid SMTP_PORT "${email.port}". Expected 587`);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const recipients = email.to.split(",").map((s) => s.trim()).filter(Boolean);
  let fromAddress = email.from;

  console.log("[mailer] SMTP host:", process.env.SMTP_HOST);
  console.log("[mailer] SMTP port:", Number(process.env.SMTP_PORT));
  console.log("[mailer] Sender:", fromAddress);
  console.log("[mailer] Recipient:", recipients.join(", "));
  console.log("[mailer] Attachment path:", pdfPath);

  try {
    await transporter.verify();
    console.log("[mailer] SMTP connection success");
  } catch (error) {
    logNodemailerError(error);
    throw error;
  }

  const sendPayload = {
    from: fromAddress,
    to: recipients,
    subject: "Daily Website Health Report",
    text: `Health score: ${score}/100
Passed: ${summary.counts.pass} · Warnings: ${summary.counts.warn} · Failures: ${summary.counts.fail}
Site: ${config.siteUrl}
Generated: ${nowIST()} IST

The full report is attached as a PDF.`,
    html,
    attachments: [{ filename: pdfPath.split("/").pop(), path: pdfPath, contentType: "application/pdf" }],
  };

  let info;
  try {
    info = await transporter.sendMail(sendPayload);
  } catch (error) {
    logNodemailerError(error);
    if (shouldFallbackSender(error)) {
      fromAddress = buildFallbackFrom(email.from, process.env.SMTP_USER);
      console.warn("[mailer] MAIL_FROM rejected by SMTP. Retrying with SMTP_USER sender:", fromAddress);
      try {
        info = await transporter.sendMail({ ...sendPayload, from: fromAddress });
      } catch (retryError) {
        logNodemailerError(retryError);
        throw retryError;
      }
    } else {
      throw error;
    }
  }

  console.log("[mailer] SMTP send success");

  return { sent: true, messageId: info.messageId };
}
