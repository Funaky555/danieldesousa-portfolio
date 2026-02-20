import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "danieldesousa05@gmail.com";
const FROM_EMAIL = "danieldesousa05@gmail.com";

const serviceLabels: Record<string, string> = {
  "game-analysis": "Game Analysis",
  "scouting": "Scouting Consultancy",
  "leadership": "Leadership Courses",
  "training": "Personalized Training",
  "seminars": "Seminars & Webinars",
  "websites": "Website & CV Creation",
};

const contactMethodLabels: Record<string, string> = {
  email: "Email",
  whatsapp: "WhatsApp",
  either: "Either (Email or WhatsApp)",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, contactMethod } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appPassword = process.env.GMAIL_APP_PASSWORD;
    if (!appPassword) {
      console.error("GMAIL_APP_PASSWORD not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM_EMAIL,
        pass: appPassword,
      },
    });

    const serviceName = serviceLabels[service] ?? service;
    const contactMethodName = contactMethodLabels[contactMethod] ?? contactMethod;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${serviceName} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #00D66C, #0066FF, #8B5CF6); padding: 2px; border-radius: 12px; margin-bottom: 24px;">
            <div style="background: #0a0f1e; border-radius: 10px; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; color: #00D66C;">
                Daniel de Sousa Portfolio
              </h1>
              <p style="margin: 6px 0 0; color: #94a3b8; font-size: 14px;">New Contact Request</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 16px; background: #111827; border-radius: 8px 8px 0 0; border-bottom: 1px solid #1f2937;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</span><br>
                <span style="color: #f1f5f9; font-size: 16px; font-weight: 600;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #111827; border-bottom: 1px solid #1f2937;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</span><br>
                <a href="mailto:${email}" style="color: #0066FF; font-size: 15px;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 16px; background: #111827; border-bottom: 1px solid #1f2937;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</span><br>
                <span style="color: #f1f5f9; font-size: 15px;">${phone}</span>
              </td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px 16px; background: #111827; border-bottom: 1px solid #1f2937;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Service Interest</span><br>
                <span style="display: inline-block; margin-top: 4px; background: #0066FF20; color: #60a5fa; border: 1px solid #0066FF40; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">${serviceName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #111827; border-bottom: 1px solid #1f2937;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Preferred Contact</span><br>
                <span style="color: #f1f5f9; font-size: 15px;">${contactMethodName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px; background: #111827; border-radius: 0 0 8px 8px;">
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</span><br>
                <p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #00D66C15; border: 1px solid #00D66C30; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #94a3b8; font-size: 13px;">
              Reply to this email to respond directly to <strong style="color: #f1f5f9;">${name}</strong> at <a href="mailto:${email}" style="color: #00D66C;">${email}</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
