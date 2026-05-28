import { NextResponse } from "next/server";
import { Resend } from "resend";
import { donnaInquiryEmailHtml, customerConfirmationEmailHtml } from "@/lib/email-templates";

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
//
// To wire up email delivery:
//   1. Sign up at resend.com (free — 3,000 emails/month)
//   2. Add to your .env.local:
//        RESEND_API_KEY=re_xxxxxxxxxxxx
//        DONNA_EMAIL=donna@example.com          ← replace with Donna's real email
//        INQUIRY_FROM_EMAIL=noreply@outofjerseycreationshub.com
//
//   3. In Resend dashboard → Domains → Add domain (outofjerseycreationshub.com)
//      Add the DNS records they give you. Until verified, keep FROM_EMAIL as
//      onboarding@resend.dev (works for testing without domain setup).
//
// Until DONNA_EMAIL is set, submissions are logged to console only — no data lost.
// ─────────────────────────────────────────────────────────────────────────────

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const DONNA_EMAIL   = process.env.DONNA_EMAIL ?? "";
const FROM_EMAIL    = process.env.INQUIRY_FROM_EMAIL ?? "Out of Jersey <onboarding@resend.dev>";
const MAX_ATTACH_B  = 30 * 1024 * 1024; // 30 MB total (Resend limit per send)

// ── Category labels ───────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  "tumblers":       "Tumblers & Drinkware",
  "cutting-boards": "Cutting Boards",
  "kitchen":        "Kitchen & Bar",
  "bbq":            "BBQ & Grill",
  "knives":         "Pocket Knives",
  "wood-boxes":     "Wood Boxes",
  "jewelry":        "Wood Jewelry",
  "pens":           "Pens & Pencils",
  "corporate":      "Corporate / Business",
  "wedding":        "Wedding & Events",
  "gifts":          "Gifts & Keepsakes",
  "other":          "Something Else",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-50":  "Under $50",
  "50-100":    "$50 – $100",
  "100-300":   "$100 – $300",
  "300-600":   "$300 – $600",
  "600-1500":  "$600 – $1,500",
  "1500+":     "$1,500+",
  "flexible":  "Flexible / open",
};

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract text fields
    const category    = (formData.get("category")    as string) ?? "";
    const description = (formData.get("description") as string) ?? "";
    const quantity    = (formData.get("quantity")    as string) ?? "1";
    const budget      = (formData.get("budget")      as string) ?? "";
    const deadline    = (formData.get("deadline")    as string) ?? "";
    const name        = (formData.get("name")        as string) ?? "";
    const email       = (formData.get("email")       as string) ?? "";
    const phone       = (formData.get("phone")       as string) ?? "";
    const contactPref = (formData.get("contactPref") as string) ?? "email";

    // Validate required fields
    if (!name || !email || !category || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract uploaded files, respecting size cap
    const rawFiles = formData.getAll("files") as File[];
    const attachments: { filename: string; content: Buffer }[] = [];
    let totalSize = 0;

    for (const file of rawFiles) {
      if (!(file instanceof File) || file.size === 0) continue;
      if (totalSize + file.size > MAX_ATTACH_B) break;
      totalSize += file.size;
      attachments.push({
        filename: file.name,
        content:  Buffer.from(await file.arrayBuffer()),
      });
    }

    // Structured data for templates
    const inquiry = {
      category:     CATEGORY_LABELS[category] ?? category,
      description,
      quantity,
      budget:       BUDGET_LABELS[budget] ?? (budget || "Not specified"),
      deadline:     deadline || "Not specified",
      name,
      email,
      phone:        phone || "Not provided",
      contactPref:  contactPref === "either" ? "Either works" : contactPref.charAt(0).toUpperCase() + contactPref.slice(1),
      fileCount:    attachments.length,
      submittedAt:  new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "long",
        timeStyle: "short",
      }),
    };

    // Always log (useful even when email is active)
    console.log("[Custom Inquiry]", JSON.stringify(
      { ...inquiry, files: attachments.map((a) => a.filename) },
      null, 2
    ));

    // ── Send emails ─────────────────────────────────────────────────────────

    if (resend && DONNA_EMAIL) {

      // 1) Notify Donna with all details + file attachments
      await resend.emails.send({
        from:        FROM_EMAIL,
        to:          DONNA_EMAIL,
        replyTo:     email,
        subject:     `✦ New Custom Order Inquiry — ${inquiry.category} from ${name}`,
        html:        donnaInquiryEmailHtml(inquiry),
        attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
      });

      // 2) Auto-reply to customer
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      email,
        subject: "Your custom order brief was received — Out of Jersey",
        html:    customerConfirmationEmailHtml({ name, category: inquiry.category }),
      });

    } else {
      console.warn(
        "[Custom Inquiry] Email not sent — add RESEND_API_KEY and DONNA_EMAIL to .env.local to enable."
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[Custom Inquiry Error]", err);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
