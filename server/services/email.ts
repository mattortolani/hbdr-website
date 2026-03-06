// Unified email notification service
// Works via direct Resend API fetch (no npm dependency needed in Workers)

import { sanitizeText } from "../middleware/sanitize";
import { EMAIL_FROM, CONTACT_NOTIFY_EMAIL, SUPPORT_NOTIFY_EMAIL } from "../config";

interface ContactNotificationData {
  name: string;
  email: string;
  company: string;
  impressions: string;
  message: string | null;
  source: string;
  ip: string | null;
}

const impressionLabels: Record<string, string> = {
  "under-10m": "Under 10M",
  "10m-50m": "10M - 50M",
  "50m-100m": "50M - 100M",
  "100m-500m": "100M - 500M",
  "500m-1b": "500M - 1B",
  "over-1b": "Over 1B",
};

function parseSupportCompany(company: string): { subject: string; priority: string } {
  const match = company.match(/^(.+?)\s*\[Priority:\s*(.+?)\]$/);
  if (match) return { subject: match[1].trim(), priority: match[2].trim() };
  return { subject: company, priority: "Medium" };
}

function buildDetailRows(data: ContactNotificationData): string {
  const safeName = sanitizeText(data.name);
  const safeEmail = sanitizeText(data.email);
  const safeIp = data.ip ? sanitizeText(data.ip) : null;

  const row = (label: string, value: string, isEmail = false) =>
    `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333; width: 140px;">${label}</td><td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #555;">${isEmail ? `<a href="mailto:${value}" style="color: #2BDE73;">${value}</a>` : value}</td></tr>`;

  let rows = row("Name", safeName) + row("Email", safeEmail, true);

  if (data.source === "support") {
    const { subject, priority } = parseSupportCompany(data.company);
    rows += row("Subject", sanitizeText(subject));
    rows += row("Priority", sanitizeText(priority));
  } else {
    rows += row("Company", sanitizeText(data.company));
    const impressionDisplay = impressionLabels[data.impressions] || sanitizeText(data.impressions);
    rows += row("Impressions", impressionDisplay);
  }

  if (safeIp) {
    rows += `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333;">IP Address</td><td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #999; font-size: 13px;">${safeIp}</td></tr>`;
  }

  return rows;
}

export async function sendContactNotification(
  apiKey: string,
  data: ContactNotificationData
): Promise<boolean> {
  try {
    const isSupport = data.source === "support";
    const sourceLabel = isSupport ? "Support Request" : "Contact Form";
    const safeMessage = data.message ? sanitizeText(data.message) : null;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0a0a0c 0%, #1a1a2e 100%); border-radius: 12px; padding: 30px; margin-bottom: 20px;">
          <h1 style="color: #2BDE73; margin: 0 0 5px 0; font-size: 24px;">${isSupport ? "New Support Request" : "New Lead from HBDR.com"}</h1>
          <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 14px;">${sourceLabel}</p>
        </div>
        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            ${buildDetailRows(data)}
          </table>
        </div>
        ${safeMessage ? `<div style="background: #f8f9fa; border-radius: 12px; padding: 24px;"><h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">${isSupport ? "Description" : "Message"}</h3><p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p></div>` : ""}
        <div style="text-align: center; margin-top: 20px; padding: 15px;"><p style="color: #999; font-size: 12px; margin: 0;">This notification was sent from HBDR.com</p></div>
      </div>`;

    const safeSubjectName = data.name.replace(/[<>"'&\n\r]/g, "");
    let emailSubject: string;
    if (isSupport) {
      const { subject } = parseSupportCompany(data.company);
      emailSubject = `Support Request: ${subject} — ${safeSubjectName}`;
    } else {
      const safeSubjectCompany = data.company.replace(/[<>"'&\n\r]/g, "");
      emailSubject = `New Lead: ${safeSubjectName} - ${safeSubjectCompany}`;
    }

    const toAddress = isSupport ? SUPPORT_NOTIFY_EMAIL : CONTACT_NOTIFY_EMAIL;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [toAddress],
        reply_to: data.email,
        subject: emailSubject,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend API error (${res.status}): ${body}`);
      console.error(`From: ${EMAIL_FROM}, To: ${toAddress}`);
      return false;
    }

    console.log(`Email sent: ${sourceLabel} from ${safeSubjectName} (${sanitizeText(data.email)}) → ${toAddress}`);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}
