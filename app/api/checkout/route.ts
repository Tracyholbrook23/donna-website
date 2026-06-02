/**
 * POST /api/checkout
 *
 * Creates a Square Payment Link and returns the checkout URL.
 *
 * Required environment variables (set in .env.local and Vercel dashboard):
 *   SQUARE_ACCESS_TOKEN  — from Square Developer Dashboard → your app → Access Tokens
 *   SQUARE_LOCATION_ID   — from Square Developer Dashboard → Locations
 *   SQUARE_ENVIRONMENT   — "production" for live, anything else uses sandbox
 *   NEXT_PUBLIC_SITE_URL — full origin, e.g. https://outofjerseycreations.com
 *
 * NEVER expose SQUARE_ACCESS_TOKEN in frontend / client code.
 */

import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://outofjerseycreations.com";

export async function POST(req: NextRequest) {
  // Lazy-init so the module loads fine at build time without env vars present
  const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN!,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const body = await req.json();
    const { type, name, email, phone, orderRef, note, amount } = body as {
      type: "deposit" | "balance" | "invoice";
      name?: string;
      email?: string;
      phone?: string;
      orderRef?: string;
      note?: string;
      amount?: number; // dollars
    };

    if (!["deposit", "balance", "invoice"].includes(type)) {
      return NextResponse.json({ error: "Invalid payment type." }, { status: 400 });
    }

    let amountCents: bigint;
    let itemName: string;
    let itemNote: string;

    if (type === "deposit") {
      amountCents = BigInt(2000); // $20.00
      itemName    = "Custom Order Deposit — Out of Jersey Creations";
      itemNote    =
        "Non-refundable $20 design fee. Reserves your studio slot and covers initial design work. Applied toward your final order total.";
    } else {
      if (!amount || isNaN(amount) || amount < 1) {
        return NextResponse.json(
          { error: "Please enter a valid payment amount." },
          { status: 400 }
        );
      }
      amountCents = BigInt(Math.round(amount * 100));

      if (type === "balance") {
        itemName = "Remaining Balance — Out of Jersey Creations";
        itemNote = orderRef
          ? `Final balance for order: ${orderRef}`
          : "Final balance for a confirmed custom order.";
      } else {
        itemName = "Custom Invoice — Out of Jersey Creations";
        itemNote = note ? `Invoice: ${note}` : "Custom or bulk order payment.";
      }
    }

    // ── Create Square Payment Link (quickPay = simplest single-item flow) ─────
    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      quickPay: {
        name:       itemName,
        priceMoney: { amount: amountCents, currency: "USD" },
        locationId: process.env.SQUARE_LOCATION_ID!,
      },
      checkoutOptions: {
        redirectUrl: `${SITE_URL}/pay/success`,
      },
      prePopulatedData: {
        ...(email ? { buyerEmail: email } : {}),
        ...(name  ? { buyerPhoneNumber: phone } : {}),
      },
      description: [
        itemNote,
        name     && `Customer: ${name}`,
        email    && `Email: ${email}`,
        phone    && `Phone: ${phone}`,
        orderRef && `Ref: ${orderRef}`,
        note     && `Note: ${note}`,
      ].filter(Boolean).join(" | "),
    });

    const url = response.paymentLink?.url;
    if (!url) throw new Error("Square did not return a checkout URL.");

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      { error: "Could not create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
