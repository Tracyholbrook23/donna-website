/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session and returns the session URL.
 *
 * Required environment variables (set in .env.local and Vercel dashboard):
 *   STRIPE_SECRET_KEY   — your Stripe secret key  (sk_live_… or sk_test_…)
 *   NEXT_PUBLIC_SITE_URL — full origin, e.g. https://outofjerseycreations.com
 *
 * NEVER expose STRIPE_SECRET_KEY in frontend / client code.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ── Stripe client (server-side only) ──────────────────────────────────────────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore — pin to a recent API version
  apiVersion: "2024-06-20",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://outofjerseycreations.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, orderRef, note, amount } = body as {
      type: "deposit" | "balance" | "invoice";
      name?: string;
      email?: string;
      phone?: string;
      orderRef?: string;
      note?: string;
      amount?: number; // in dollars, e.g. 45.00
    };

    // ── Validate ─────────────────────────────────────────────────────────────
    if (!["deposit", "balance", "invoice"].includes(type)) {
      return NextResponse.json({ error: "Invalid payment type." }, { status: 400 });
    }

    let unitAmount: number;
    let productName: string;
    let description: string;
    const metadata: Record<string, string> = { type };

    if (name)     metadata.customer_name  = name;
    if (email)    metadata.customer_email = email;
    if (phone)    metadata.customer_phone = phone;
    if (orderRef) metadata.order_ref      = orderRef;
    if (note)     metadata.note           = note;

    if (type === "deposit") {
      // Fixed $20 design fee
      unitAmount  = 2000; // cents
      productName = "Custom Order Deposit — Out of Jersey Creations";
      description =
        "Non-refundable $20 design fee. Reserves your studio slot and covers initial design work. Applied toward your final order total per Donna's custom order policy.";
    } else {
      // balance or invoice — customer-supplied amount
      if (!amount || isNaN(amount) || amount < 1) {
        return NextResponse.json(
          { error: "Please enter a valid payment amount." },
          { status: 400 }
        );
      }
      unitAmount = Math.round(amount * 100); // dollars → cents

      if (type === "balance") {
        productName = "Remaining Balance Payment — Out of Jersey Creations";
        description =
          orderRef
            ? `Final balance for order: ${orderRef}`
            : "Final balance payment for a confirmed custom order.";
      } else {
        productName = "Custom Invoice Payment — Out of Jersey Creations";
        description = note
          ? `Custom invoice: ${note}`
          : "Custom or bulk order payment.";
      }
    }

    // ── Create session ────────────────────────────────────────────────────────
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: productName,
              description,
              images: [`${SITE_URL}/og-image.jpg`],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email ?? undefined,
      metadata,
      success_url: `${SITE_URL}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE_URL}/pay?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      { error: "Could not create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
