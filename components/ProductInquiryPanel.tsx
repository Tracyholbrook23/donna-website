"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import type { WixProduct } from "@/components/BuyBox";

interface Props {
  product: WixProduct;
}

export function ProductInquiryPanel({ product }: Props) {
  const productName = product.name ?? "this piece";
  const description = product.description ?? "";
  const options = product.productOptions ?? [];

  // Build a pre-filled custom request URL
  const inquiryHref = `/custom?piece=${encodeURIComponent(productName)}#inquiry-form-anchor`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Name */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: "clamp(28px, 3vw, 42px)", margin: "0 0 12px", lineHeight: 1.15 }}
        >
          {productName}
        </h1>

        {/* Custom-made badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--forest)",
            color: "#fff",
            borderRadius: "var(--r-pill)",
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              flexShrink: 0,
            }}
          />
          Made to order · Custom engraving
        </div>

        {description && (
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              lineHeight: 1.7,
              margin: 0,
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      {/* Available variants (read-only — for reference) */}
      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {options.map((opt) => (
            <div key={opt.name ?? ""}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  margin: "0 0 10px",
                }}
              >
                Available in: {opt.name}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(opt.choices ?? []).map((choice) => {
                  return (
                    <span
                      key={choice.value ?? ""}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--r-pill)",
                        border: "1px solid var(--line)",
                        fontSize: 13,
                        color: "var(--ink)",
                        background: "var(--cream-2)",
                      }}
                    >
                      {choice.value}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How custom orders work */}
      <div
        style={{
          background: "var(--cream-2)",
          borderRadius: "var(--r-md)",
          padding: "20px 24px",
          border: "1px solid var(--line)",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink)",
            margin: "0 0 12px",
          }}
        >
          How this works
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            "Tell Donna what you'd like engraved — names, dates, artwork, or a message",
            "She'll reply within 24 hours with a quote and timeline",
            "A $20 design fee kicks off your custom slot (applied to your total)",
            "You approve a digital proof before anything is engraved",
          ].map((step) => (
            <li
              key={step}
              style={{
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.55,
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "var(--terracotta)", flexShrink: 0, fontWeight: 700 }}>✦</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link
          href={inquiryHref}
          className="btn btn-primary"
          style={{
            justifyContent: "center",
            fontSize: 16,
            padding: "18px 28px",
          }}
        >
          Request This Design <ArrowIcon size={15} />
        </Link>

        <a
          href="https://www.instagram.com/outofjerseycreations"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{
            justifyContent: "center",
            fontSize: 14,
            padding: "14px 28px",
            background: "transparent",
            border: "1px solid var(--line)",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          DM @outofjerseycreations on Instagram
        </a>
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--muted-soft)",
          lineHeight: 1.6,
          margin: 0,
          textAlign: "center",
        }}
      >
        No payment until you&apos;ve approved your design. Every piece is made to order.
      </p>
    </div>
  );
}
