import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // In production, wire up an email service (Resend, SendGrid, etc.)
    // For now, log to server and return success
    console.log("[Custom Inquiry]", JSON.stringify(body, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Custom Inquiry Error]", err);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
