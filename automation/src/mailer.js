import fs from "node:fs";
import nodemailer from "nodemailer";
import { config, dateStamp, nowIST } from "./config.js";

const REQUIRED_EMAIL_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
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
export async function sendReport({ html, pdfPath, score, summary, responseTimeMs, sslDaysRemaining }) {
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
  const ccRecipients = (email.cc || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let fromAddress = email.from || process.env.SMTP_USER;

  console.log("[mailer] SMTP host:", process.env.SMTP_HOST);
  console.log("[mailer] SMTP port:", Number(process.env.SMTP_PORT));
  console.log("[mailer] Sender:", fromAddress);
  console.log("[mailer] Recipient:", recipients.join(", "));
  console.log("[mailer] CC:", ccRecipients.join(", ") || "(none)");
  console.log("[mailer] Attachment path:", pdfPath);

  try {
    await transporter.verify();
    console.log("[mailer] SMTP connection success");
  } catch (error) {
    logNodemailerError(error);
    throw error;
  }

  const generatedDate = dateStamp();
  const generatedAt = nowIST();
  const websiteStatus = summary?.up ? "Online" : "Offline";
  const responseTime = responseTimeMs != null ? `${responseTimeMs} ms` : "—";
  const sslStatus = sslDaysRemaining != null ? `${sslDaysRemaining} days remaining` : "—";
  const emailHtml = `<!doctype html>
<html lang="en">
  <body style="font-family: Arial, Helvetica, sans-serif; color: #0F172A; line-height: 1.5;">
    <p>Hello,</p>
    <p>Please find the attached report.</p>
    <p>The Daily Website Health Report has been generated successfully.</p>
    <p><strong>Summary</strong></p>
    <ul>
      <li>Overall Health Score: ${score}/100</li>
      <li>Website Status: ${websiteStatus}</li>
      <li>Response Time: ${responseTime}</li>
      <li>SSL Status: ${sslStatus}</li>
    </ul>
    <p>The detailed report is attached as a PDF.</p>
    <p>Regards,<br/>Website Monitoring Automation<br/>GitHub Actions</p>
    <p style="color:#475569;font-size:12px;">Generated: ${generatedAt} IST</p>
  </body>
</html>`;

  const sendPayload = {
    from: fromAddress,
    to: recipients,
    cc: ccRecipients.length ? ccRecipients : undefined,
    subject: `Daily Website Health Report - ${generatedDate}`,
    text: `Hello,

Please find the attached report.

The Daily Website Health Report has been generated successfully.

Summary
- Overall Health Score: ${score}/100
- Website Status: ${websiteStatus}
- Response Time: ${responseTime}
- SSL Status: ${sslStatus}

The detailed report is attached as a PDF.

Regards,
Website Monitoring Automation
GitHub Actions`,
    html: emailHtml,
    attachments: [{ filename: "Daily Website Health Report.pdf", path: pdfPath, contentType: "application/pdf" }],
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
