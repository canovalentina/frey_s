import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

interface LicenseEmailParams {
  to: string;
  buyerName: string;
  trackTitle: string;
  licenseType: string;
  downloadUrl: string;
  downloadExpiry: Date;
}

export async function sendLicenseEmail({
  to,
  buyerName,
  trackTitle,
  licenseType,
  downloadUrl,
  downloadExpiry,
}: LicenseEmailParams) {
  const expiryStr = downloadExpiry.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return resend.emails.send({
    from: "frey_s <licenses@freyes.com>",
    to,
    subject: `Your license for "${trackTitle}" — frey_s`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #0a0a0a; background: #f7f5f2;">
  <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #6b6b6b; margin-bottom: 32px;">
    frey_s · License Delivery
  </p>

  <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">
    Your download is ready
  </h1>
  <p style="color: #6b6b6b; margin: 0 0 32px;">
    Hi ${buyerName}, thank you for licensing <strong>${trackTitle}</strong>.
  </p>

  <div style="border: 1px solid #e2e0dd; padding: 24px; margin-bottom: 32px;">
    <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #b2a2cb;">
      ${licenseType} License
    </p>
    <p style="margin: 0; font-size: 20px; font-weight: 700;">${trackTitle}</p>
    <p style="margin: 8px 0 0; color: #6b6b6b; font-size: 13px;">
      Download link expires ${expiryStr}
    </p>
  </div>

  <a href="${downloadUrl}"
     style="display: inline-block; background: #0a0a0a; color: #f7f5f2; padding: 14px 28px; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 32px;">
    Download Files →
  </a>

  <hr style="border: none; border-top: 1px solid #e2e0dd; margin: 32px 0;" />

  <p style="color: #6b6b6b; font-size: 12px; margin: 0;">
    This link can be used up to 3 times before ${expiryStr}.
    Questions? Reply to this email or contact <a href="mailto:federicoreyes94@gmail.com" style="color: #b2a2cb;">federicoreyes94@gmail.com</a>
  </p>
</body>
</html>
    `.trim(),
  });
}
