/** Canonical 1st Call UK transactional email layout. Copied across marketing sites. */

export const EMAIL_BRAND = {
  primary: "#2d459c",
  primaryDark: "#233a86",
  soft: "#eef2fb",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  bg: "#f1f4f9",
  white: "#ffffff",
} as const;

/** Public group logo — used in every staff/customer email so sites match the portal. */
export const EMAIL_LOGO_URL = "https://www.1stcalluk.co.uk/1stCallUK_group_logo02.jpg";

export type EmailSiteConfig = {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneHref: string;
  contactAddress: string;
  logoUrl?: string;
  tagline?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function detailRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:11px 14px;background:${EMAIL_BRAND.bg};font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${EMAIL_BRAND.muted};width:118px;border-bottom:1px solid ${EMAIL_BRAND.border};">${escapeHtml(label)}</td>
    <td style="padding:11px 14px;font-size:14px;color:${EMAIL_BRAND.text};border-bottom:1px solid ${EMAIL_BRAND.border};">${escapeHtml(value)}</td>
  </tr>`;
}

export function detailRowHtml(label: string, html: string): string {
  return `<tr>
    <td style="padding:11px 14px;background:${EMAIL_BRAND.bg};font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${EMAIL_BRAND.muted};width:118px;border-bottom:1px solid ${EMAIL_BRAND.border};">${escapeHtml(label)}</td>
    <td style="padding:11px 14px;font-size:14px;color:${EMAIL_BRAND.text};border-bottom:1px solid ${EMAIL_BRAND.border};">${html}</td>
  </tr>`;
}

type LayoutInput = {
  site: EmailSiteConfig;
  title: string;
  preheader?: string;
  bodyHtml: string;
  extraFooterHtml?: string;
};

export function renderEmailLayout(input: LayoutInput): string {
  const site = input.site;
  const logo = site.logoUrl || EMAIL_LOGO_URL;
  const tagline = site.tagline || "Immigration · Financial · Digital";
  const preheader = input.preheader || input.title;
  const host = site.siteUrl.replace(/^https?:\/\//, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.title)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${EMAIL_BRAND.text};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL_BRAND.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:${EMAIL_BRAND.white};border:1px solid ${EMAIL_BRAND.border};border-radius:4px;overflow:hidden;">
          <tr>
            <td style="padding:28px 36px 20px;border-bottom:3px solid ${EMAIL_BRAND.primary};">
              <img src="${escapeHtml(logo)}" alt="1st Call UK" width="196" style="display:block;max-width:196px;height:auto;border:0;" />
              <p style="margin:14px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;color:${EMAIL_BRAND.primary};">${escapeHtml(tagline)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 36px 12px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">${escapeHtml(site.siteName)}</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:${EMAIL_BRAND.text};">${escapeHtml(input.title)}</h1>
              <div style="margin-top:18px;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.muted};">
                ${input.bodyHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px;border-top:1px solid ${EMAIL_BRAND.border};background:${EMAIL_BRAND.soft};">
              <p style="margin:0;font-size:14px;font-weight:700;color:${EMAIL_BRAND.primaryDark};">1st Call UK</p>
              <p style="margin:10px 0 0;font-size:12px;line-height:1.7;color:${EMAIL_BRAND.muted};">${escapeHtml(site.contactAddress)}</p>
              <p style="margin:12px 0 0;font-size:12px;line-height:1.7;color:${EMAIL_BRAND.muted};">
                Telephone: <a href="tel:${escapeHtml(site.contactPhoneHref)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;font-weight:600;">${escapeHtml(site.contactPhone)}</a><br />
                Email: <a href="mailto:${escapeHtml(site.contactEmail)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;font-weight:600;">${escapeHtml(site.contactEmail)}</a><br />
                <a href="${escapeHtml(site.siteUrl)}" style="color:${EMAIL_BRAND.primary};text-decoration:none;font-weight:600;">${escapeHtml(host)}</a>
              </p>
              ${input.extraFooterHtml || ""}
              <p style="margin:16px 0 0;font-size:11px;line-height:1.5;color:#94a3b8;">This message was sent by 1st Call UK Group Of Companies.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
