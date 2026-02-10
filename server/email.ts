import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string): string {
  return text.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
    return entities[char] || char;
  });
}

interface ContactNotificationData {
  name: string;
  email: string;
  company: string;
  impressions: string;
  message: string | null;
  source: string;
  ip: string | null;
}

export async function sendContactNotification(data: ContactNotificationData): Promise<boolean> {
  try {
    const impressionLabels: Record<string, string> = {
      "under-10m": "Under 10M",
      "10m-50m": "10M - 50M",
      "50m-100m": "50M - 100M",
      "100m-500m": "100M - 500M",
      "500m-1b": "500M - 1B",
      "over-1b": "Over 1B",
    };

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = escapeHtml(data.company);
    const safeMessage = data.message ? escapeHtml(data.message) : null;
    const safeIp = data.ip ? escapeHtml(data.ip) : null;
    const impressionDisplay = impressionLabels[data.impressions] || escapeHtml(data.impressions);
    const sourceLabel = data.source === "support" ? "Support Form" : "Contact Form";

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0a0a0c 0%, #1a1a2e 100%); border-radius: 12px; padding: 30px; margin-bottom: 20px;">
          <h1 style="color: #2BDE73; margin: 0 0 5px 0; font-size: 24px;">New Lead from HBDR.com</h1>
          <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 14px;">${sourceLabel} Submission</p>
        </div>
        
        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #555;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;"><a href="mailto:${safeEmail}" style="color: #2BDE73;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #555;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333;">Impressions</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #555;">${impressionDisplay}</td>
            </tr>
            ${safeIp ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #333;">IP Address</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #999; font-size: 13px;">${safeIp}</td>
            </tr>` : ''}
          </table>
        </div>

        ${safeMessage ? `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Message</h3>
          <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>` : ''}
        
        <div style="text-align: center; margin-top: 20px; padding: 15px;">
          <p style="color: #999; font-size: 12px; margin: 0;">This notification was sent from HBDR.com</p>
        </div>
      </div>
    `;

    const safeSubjectName = data.name.replace(/[<>"'&\n\r]/g, '');
    const safeSubjectCompany = data.company.replace(/[<>"'&\n\r]/g, '');

    await resend.emails.send({
      from: "HBDR Leads <onboarding@resend.dev>",
      to: ["contact@hbdr.com"],
      subject: `New ${sourceLabel} Lead: ${safeSubjectName} - ${safeSubjectCompany}`,
      html: htmlContent,
    });

    console.log(`Email notification sent for lead: ${safeName} (${safeEmail})`);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}
