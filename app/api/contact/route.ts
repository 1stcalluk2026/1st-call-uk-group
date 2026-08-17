import { NextResponse } from "next/server";
import { Resend } from "resend";
import { forwardPortalEnquiry, mapGroupService } from "../../../lib/forwardPortalEnquiry";

export async function POST(request: Request) {
  try {
    // 1. Extract all explicit fields from the Group Portal Form
    const { name, email, service, message, captchaToken } = await request.json();

    // 2. Validate input and presence of reCAPTCHA token
    if (!name || !email || !service || !message || !captchaToken) {
      return NextResponse.json(
        { success: false, error: "Missing required fields or captcha" },
        { status: 400 }
      );
    }

    // 3. VERIFY WITH GOOGLE
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`,
      { method: "POST" }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error("reCAPTCHA validation failed:", verifyData["error-codes"]);
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 400 }
      );
    }

    // 4. SAFELY INSTANTIATE RESEND
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Server Configuration Error: RESEND_API_KEY is missing in environment variables." },
        { status: 500 }
      );
    }
    
    const resend = new Resend(apiKey);
    const CONTACT_EMAIL = "info@1stcalluk.com";
    const TEST_NOTIFY_EMAIL = "getu4ever@gmail.com";
    const emailFrom = "1st Call UK <info@1stcalluk.com>";

    // 5. Send Admin Notification (Professional Lead Report)
    const adminSubject = `New Centralized Group Enquiry: [${service}] from ${name}`;
    const adminPayload = {
      from: emailFrom,
      replyTo: email,
      subject: adminSubject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333333;">
          <div style="background-color: #233a86; padding: 10px 20px; color: white; border-radius: 8px 8px 0 0;">
            <h3 style="margin: 0;">New Website Enquiry</h3>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 14px; color: #666666; margin-top: 0;">A new contact form was submitted. Here are the details:</p>
            
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; width: 150px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <a href="mailto:${email}" style="color: #233a86; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Service Required:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <span style="background-color: #eff6ff; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">${service}</span>
                </td>
              </tr>
            </table>

            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #233a86; margin-bottom: 20px;">
              <strong style="display: block; margin-bottom: 5px;">Message:</strong>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${message}</p>
            </div>

            <p style="font-size: 12px; color: #999999;">
              Submitted on: ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
            </p>
          </div>
        </div>
      `.trim(),
    };

    await resend.emails.send({
      ...adminPayload,
      to: CONTACT_EMAIL,
    });
    await resend.emails.send({
      ...adminPayload,
      to: TEST_NOTIFY_EMAIL,
      subject: `[Test copy] ${adminSubject}`,
    });

    // 6. Send Auto-Reply Confirmation back to client
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "Confirmation: We received your message",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
            .header-bar { height: 4px; background-color: #233a86; border-radius: 4px 4px 0 0; margin: -20px -20px 20px -20px; }
            .content { padding: 10px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; }
            .logo-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .details { font-size: 12px; color: #666666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-bar"></div>
            <div class="content">
              <h2 style="color: #233a86; margin-top: 0;">Hi ${name},</h2>
              <p>Thank you for contacting <strong>1st Call UK Group</strong>.</p>
              <p>We have successfully received your enquiry regarding our <strong>${service}</strong> options. A member of our specialist cross-sector administration team will review your details and reply within <strong>two working days</strong>.</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; font-size: 13px; color: #555555;"><strong>Your Message Summary:</strong></p>
                <p style="margin: 5px 0 0 0; font-style: italic; font-size: 14px;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
              </div>
            </div>

            <div class="footer">
              <table class="logo-table">
                <tr>
                  <td align="center" style="width: 100%;">
                    <img src="https://www.1stcalluk.com/1st-calluk-logo02.jpg" alt="1st Call UK Logo" height="45" style="display: block; margin: 0 auto; border-radius: 8px;" >
                  </td>
                </tr>
              </table>
              
              <div class="details">
                <strong>1st Call UK Group Operations Portal</strong><br>
                Office Address: The Old Coach House, 25 Noel Street, Nottingham, NG7 6AQ<br>
                Central Desk: info@1stcalluk.com
              </div>
            </div>
          </div>
        </body>
        </html>
      `.trim(),
    });

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

  } catch (error: any) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}