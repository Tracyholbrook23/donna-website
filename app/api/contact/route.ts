import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmailHtml, contactConfirmationEmailHtml } from "@/lib/email-templates";

// Same env vars as the custom-inquiry route.
// Add to .env.local:
//   RESEND_API_KEY=re_xxxxxxxxxxxx
//   DONNA_EMAIL=donna@example.com
//   INQUIRY_FROM_EMAIL=noreply@outofjerseycreationshub.com  (optional)

const resend     = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const DONNA_EMAIL = process.env.DONNA_EMAIL ?? "";
const FROM_EMAIL  = process.env.INQUIRY_FROM_EMAIL ?? "Out of Jersey <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const { reason, name, email, message } = await req.json() as {
      reason: string; name: string; email: string; message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const data = {
      reason,
      name:        name.trim(),
      email:       email.trim(),
      message:     message.trim(),
      submittedAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "long",
        timeStyle: "short",
      }),
    };

    console.log("[Contact Form]", JSON.stringify(data, null, 2));

    if (resend && DONNA_EMAIL) {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      DONNA_EMAIL,
        replyTo: email,
        subject: `New message from ${name} — ${data.submittedAt}`,
        html:    contactEmailHtml(data),
      });

      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      email,
        subject: "We got your message — Out of Jersey",
        html:    contactConfirmationEmailHtml({ name }),
      });
    } else {
      console.warn("[Contact Form] Email not sent — add RESEND_API_KEY and DONNA_EMAIL to .env.local");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
