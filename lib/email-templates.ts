// ── Email templates for custom order inquiries ────────────────────────────────
//
// Two templates:
//  1. donnaInquiryEmailHtml  — sent to Donna with full inquiry details
//  2. customerConfirmationEmailHtml — auto-reply to the customer
//
// Both use inline styles (required for broad email client support).
// Brand colors: terracotta #B9533A, forest #3D5848, ink #1F1410, cream #FBF5EC
// ─────────────────────────────────────────────────────────────────────────────

export interface InquiryData {
  category:    string;
  description: string;
  quantity:    string;
  budget:      string;
  deadline:    string;
  name:        string;
  email:       string;
  phone:       string;
  contactPref: string;
  fileCount:   number;
  submittedAt: string;
}

// ── Shared wrapper ────────────────────────────────────────────────────────────

function emailWrapper(content: string, preview: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Out of Jersey Creations Hub</title>
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body { margin: 0; padding: 0; background: #F4EBDB; font-family: Georgia, 'Times New Roman', serif; }
    * { box-sizing: border-box; }
    a { color: #B9533A; }
  </style>
</head>
<body>
  <!-- Preview text -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preview}&#160;&#8203;&#65279;&#847;</div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4EBDB;padding:40px 16px;">
    <tr><td align="center">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FBF5EC;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(31,20,16,0.10);">

        <!-- Header band -->
        <tr>
          <td style="background:#1F1410;padding:28px 36px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-style:italic;color:#FBF5EC;letter-spacing:-0.01em;">
              Out of Jersey Creations Hub
            </p>
            <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(251,245,236,0.5);font-family:Arial,sans-serif;">
              Custom Laser Engraving
            </p>
          </td>
        </tr>

        <!-- Body -->
        ${content}

        <!-- Footer -->
        <tr>
          <td style="padding:24px 36px;border-top:1px solid rgba(31,20,16,0.08);text-align:center;">
            <p style="margin:0;font-size:11px;color:rgba(31,20,16,0.4);font-family:Arial,sans-serif;line-height:1.6;">
              Out of Jersey Creations Hub &nbsp;·&nbsp; Custom Laser Engraving<br/>
              <a href="https://www.outofjerseycreationshub.com" style="color:rgba(31,20,16,0.4);text-decoration:none;">
                outofjerseycreationshub.com
              </a>
              &nbsp;·&nbsp;
              <a href="https://www.instagram.com/outofjerseycreations" style="color:rgba(31,20,16,0.4);text-decoration:none;">
                @outofjerseycreations
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Row helper ────────────────────────────────────────────────────────────────

function row(label: string, value: string, highlight = false) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(31,20,16,0.07);vertical-align:top;">
      <p style="margin:0;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(31,20,16,0.45);font-family:Arial,sans-serif;margin-bottom:2px;">${label}</p>
      <p style="margin:0;font-size:15px;color:${highlight ? "#B9533A" : "#1F1410"};font-family:${highlight ? "Georgia,serif" : "Arial,sans-serif"};font-weight:${highlight ? "normal" : "400"};line-height:1.5;">${value}</p>
    </td>
  </tr>`;
}

// ── Template 1 — Donna's notification ────────────────────────────────────────

export function donnaInquiryEmailHtml(d: InquiryData): string {
  const content = `
    <!-- Alert bar -->
    <tr>
      <td style="background:#B9533A;padding:14px 36px;text-align:center;">
        <p style="margin:0;font-size:13px;font-weight:bold;color:#fff;font-family:Arial,sans-serif;letter-spacing:0.04em;">
          ✦ &nbsp; NEW CUSTOM ORDER INQUIRY
        </p>
      </td>
    </tr>

    <!-- Main content -->
    <tr>
      <td style="padding:36px 36px 28px;">

        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(31,20,16,0.45);font-family:Arial,sans-serif;">
          Received ${d.submittedAt} (PT)
        </p>
        <h1 style="margin:0 0 28px;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#1F1410;line-height:1.1;">
          ${d.name} wants a custom<br/><em style="color:#B9533A;">${d.category}</em>
        </h1>

        <!-- Contact info block -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="background:#F4EBDB;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(31,20,16,0.45);font-family:Arial,sans-serif;">
                Contact info
              </p>
              <p style="margin:0 0 6px;font-size:18px;font-family:Georgia,serif;color:#1F1410;">${d.name}</p>
              <p style="margin:0 0 4px;font-size:14px;font-family:Arial,sans-serif;color:#1F1410;">
                📧 <a href="mailto:${d.email}" style="color:#B9533A;">${d.email}</a>
              </p>
              ${d.phone !== "Not provided" ? `<p style="margin:0 0 4px;font-size:14px;font-family:Arial,sans-serif;color:#1F1410;">📞 ${d.phone}</p>` : ""}
              <p style="margin:6px 0 0;font-size:12px;color:rgba(31,20,16,0.5);font-family:Arial,sans-serif;">
                Prefers contact by: <strong>${d.contactPref}</strong>
              </p>
            </td>
            <td style="text-align:right;vertical-align:top;">
              <a href="mailto:${d.email}?subject=Re: Your custom ${d.category} inquiry"
                style="display:inline-block;background:#1F1410;color:#FBF5EC;text-decoration:none;
                       font-family:Arial,sans-serif;font-size:13px;font-weight:bold;
                       padding:10px 18px;border-radius:999px;">
                Reply Now →
              </a>
            </td>
          </tr>
        </table>

        <!-- Order details -->
        <p style="margin:0 0 16px;font-size:13px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#1F1410;font-family:Arial,sans-serif;">
          Order Details
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row("Product Category", d.category)}
          ${row("Quantity", d.quantity)}
          ${row("Budget Range", d.budget)}
          ${row("Ideal Completion", d.deadline)}
          ${d.fileCount > 0 ? row("Reference Files", `${d.fileCount} file${d.fileCount !== 1 ? "s" : ""} attached to this email`) : ""}
        </table>

        <!-- Vision / description -->
        <div style="margin-top:24px;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#1F1410;font-family:Arial,sans-serif;">
            Their Vision
          </p>
          <div style="background:#F4EBDB;border-left:3px solid #B9533A;border-radius:0 8px 8px 0;padding:18px 20px;">
            <p style="margin:0;font-size:15px;font-family:Georgia,serif;color:#1F1410;line-height:1.7;white-space:pre-wrap;">${d.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
        </div>

      </td>
    </tr>

    <!-- CTA reminder -->
    <tr>
      <td style="background:#3D5848;padding:20px 36px;text-align:center;">
        <p style="margin:0;font-size:13px;color:rgba(251,245,236,0.9);font-family:Arial,sans-serif;line-height:1.6;">
          <strong style="color:#fff;">Next step:</strong> Reply within 24 hours with a quote and any questions.
          <br/>Remember to collect the <strong style="color:#fff;">$20 design fee</strong> before starting work.
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content, `New inquiry from ${d.name} — ${d.category} · ${d.submittedAt}`);
}

// ── Template 2 — Customer confirmation ───────────────────────────────────────

export function customerConfirmationEmailHtml({ name, category }: { name: string; category: string }): string {
  const firstName = name.split(" ")[0] ?? name;

  const content = `
    <!-- Main content -->
    <tr>
      <td style="padding:48px 36px 36px;text-align:center;">

        <!-- Check icon -->
        <div style="width:64px;height:64px;border-radius:50%;background:#3D5848;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:28px;line-height:1;">✓</span>
        </div>

        <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:32px;font-weight:400;color:#1F1410;line-height:1.1;">
          Your brief is in<br/><em style="color:#B9533A;">good hands, ${firstName}.</em>
        </h1>

        <p style="margin:0 auto 32px;font-size:16px;color:rgba(31,20,16,0.6);max-width:420px;line-height:1.7;font-family:Arial,sans-serif;">
          Donna has received your custom <strong style="color:#1F1410;">${category}</strong> request
          and will reach out within <strong style="color:#1F1410;">24 hours</strong> — usually faster —
          with a personalized quote and next steps.
        </p>

        <!-- What happens next -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="background:#F4EBDB;border-radius:12px;padding:0;margin-bottom:36px;text-align:left;">
          <tr><td style="padding:24px 28px;">
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(31,20,16,0.45);font-family:Arial,sans-serif;">
              What happens next
            </p>

            ${[
              ["📬", "Donna reviews your brief and reaches out within 24 hours"],
              ["💬", "She'll share a personalized quote, timeline, and any questions"],
              ["✦",  "A $20 initiation fee is collected before design work begins — this is credited to your final total"],
              ["✏️",  "You review and approve a digital proof before anything is engraved"],
              ["📦", "Your piece is made, photographed, and shipped gift-ready"],
            ].map(([icon, text]) => `
            <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;">
              <span style="font-size:18px;flex-shrink:0;width:24px;text-align:center;">${icon}</span>
              <p style="margin:0;font-size:14px;color:#1F1410;font-family:Arial,sans-serif;line-height:1.5;">${text}</p>
            </div>
            `).join("")}
          </td></tr>
        </table>

        <a href="https://www.outofjerseycreationshub.com/policies/custom"
          style="display:inline-block;background:#1F1410;color:#FBF5EC;text-decoration:none;
                 font-family:Arial,sans-serif;font-size:14px;font-weight:bold;
                 padding:14px 28px;border-radius:999px;margin-bottom:20px;">
          Read our custom order policy →
        </a>

        <p style="margin:0;font-size:13px;color:rgba(31,20,16,0.45);font-family:Arial,sans-serif;">
          Questions? DM Donna on Instagram at
          <a href="https://www.instagram.com/outofjerseycreations" style="color:#B9533A;">
            @outofjerseycreations
          </a>
        </p>

      </td>
    </tr>
  `;

  return emailWrapper(content, `Brief received — Donna will be in touch within 24 hours about your ${category} request.`);
}
