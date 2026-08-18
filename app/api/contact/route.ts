import { NextResponse } from "next/server";
import { Resend } from "resend";
import { forwardPortalEnquiry, mapGroupService } from "../../../lib/forwardPortalEnquiry";
import {
  detailRow,
  detailRowHtml,
  escapeHtml,
  renderEmailLayout,
  type EmailSiteConfig,
} from "../../../lib/email-layout";
import {
  PUBLIC_CONTACT_EMAIL,
  staffBccEmail,
  staffFromEmail,
  staffToEmail,
} from "../../../lib/staff-notify";

export const runtime = "nodejs";

const SITE_NAME = "1st Call UK Group";
const SITE_URL = "https://www.1stcalluk.co.uk";
const CONTACT_PHONE = "0115 845 0000";
const CONTACT_PHONE_HREF = "+441158450000";
const CONTACT_ADDRESS = "The Old Coach House, 25 Noel Street, Nottingham NG7 6AQ";

const site: EmailSiteConfig = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  contactEmail: PUBLIC_CONTACT_EMAIL,
  contactPhone: CONTACT_PHONE,
  contactPhoneHref: CONTACT_PHONE_HREF,
  contactAddress: CONTACT_ADDRESS,
  tagline: "Immigration · Financial · Digital",
};

function companyFooterText(): string {
  return [SITE_NAME, CONTACT_ADDRESS, PUBLIC_CONTACT_EMAIL, CONTACT_PHONE].join("\n");
}

export async function POST(request: Request) {
  try {
    const { name, email, service, message, captchaToken } = await request.json();

    if (!name || !email || !service || !message || !captchaToken) {
      return NextResponse.json(
        { success: false, error: "Missing required fields or captcha" },
        { status: 400 },
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`,
      { method: "POST" },
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error("reCAPTCHA validation failed:", verifyData["error-codes"]);
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Server Configuration Error: RESEND_API_KEY is missing in environment variables.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = staffToEmail();
    const fromEmail = staffFromEmail(SITE_NAME);
    const bccEmail = staffBccEmail(toEmail);
    const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "UTC" });

    const adminSubject = `New Centralized Group Enquiry: [${service}] from ${name}`;

    const adminText = [
      "New Website Enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service Required: ${service}`,
      "",
      message,
      "",
      `Submitted on: ${submittedAt} (UTC)`,
      "",
      companyFooterText(),
    ].join("\n");

    const adminHtml = renderEmailLayout({
      site,
      title: "New website enquiry",
      preheader: `Group enquiry from ${name} — ${service}`,
      bodyHtml: `<p style="margin:0 0 16px;">A new contact form was submitted on 1stcalluk.co.uk.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:16px;">
        ${detailRow("Name", name)}
        ${detailRowHtml("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#2d459c;text-decoration:none;">${escapeHtml(email)}</a>`)}
        ${detailRow("Service required", service)}
      </table>
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6;background:#f8fafc;border-left:4px solid #2d459c;padding:12px 16px;color:#0f172a;">${escapeHtml(message)}</p>
      <p style="font-size:12px;color:#94a3b8;margin:16px 0 0;">Submitted on: ${escapeHtml(submittedAt)} (UTC)</p>`,
    });

    const admin = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      bcc: bccEmail,
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    if (admin.error) {
      throw new Error(admin.error.message || "Unable to notify the 1st Call UK team.");
    }

    const confirmHtml = renderEmailLayout({
      site,
      title: "We received your message",
      preheader: `Thank you for contacting ${SITE_NAME}`,
      bodyHtml: `<p style="margin:0 0 16px;font-size:16px;color:#0f172a;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;line-height:1.6;">Thank you for contacting <strong style="color:#0f172a;">${escapeHtml(SITE_NAME)}</strong>. We have successfully received your enquiry regarding our <strong style="color:#0f172a;">${escapeHtml(service)}</strong> options. A member of our specialist cross-sector administration team will review your details and reply within <strong style="color:#0f172a;">two working days</strong>.</p>
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;">Your message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6;background:#f8fafc;border-left:4px solid #2d459c;padding:12px 16px;color:#0f172a;">${escapeHtml(message)}</p>`,
    });

    const confirmation = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: PUBLIC_CONTACT_EMAIL,
      subject: "Confirmation: We received your message",
      text: [
        `Hi ${name},`,
        "",
        `Thank you for contacting ${SITE_NAME}. We have successfully received your enquiry regarding our ${service} options. A member of our specialist cross-sector administration team will review your details and reply within two working days.`,
        "",
        message,
        "",
        companyFooterText(),
      ].join("\n"),
      html: confirmHtml,
    });

    if (confirmation.error) {
      throw new Error(confirmation.error.message || "Unable to send your confirmation email.");
    }

    await forwardPortalEnquiry({
      service: mapGroupService(service),
      sourceSite: "1stcalluk.co.uk",
      sourceKind: "contact",
      sourceChannel: service,
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("❌ Contact form error:", error);
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
