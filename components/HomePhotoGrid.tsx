"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowIcon } from "@/components/Icons";

const photos = [
  { src: "/photos/prod-tumbler-40oz.jpg",              alt: "Custom engraved 40oz tumbler" },
  { src: "/photos/bff-tumblers.jpg",                   alt: "Custom engraved BFF tumblers" },
  { src: "/photos/prod-decanter-premium.jpg",          alt: "Personalized whiskey decanter set" },
  { src: "/photos/prod-cutting-board-wedding.jpg",     alt: "Personalized wedding cutting board" },
  { src: "/photos/prod-whiskey-glasses-colchester.jpg",alt: "Personalized whiskey glasses" },
  { src: "/photos/prod-leather-wallet.jpg",            alt: "Custom engraved leather wallet" },
  { src: "/photos/prod-knife-cupid.jpg",               alt: "Engraved knife — Cupid style" },
  { src: "/photos/prod-keychain-dad.jpg",              alt: "Engraved dad keychain" },
  { src: "/photos/prod-decanter-glasses-etsy.jpg",     alt: "Custom whiskey decanter and glasses" },
  { src: "/photos/prod-cutting-board-custom.jpg",      alt: "Custom engraved cutting board" },
  { src: "/photos/prod-whiskey-glasses-classic.jpg",   alt: "Classic engraved whiskey glasses" },
  { src: "/photos/prod-passport-wallet.jpg",           alt: "Engraved leather passport wallet" },
  { src: "/photos/prod-knife-elk-ridge.jpg",           alt: "Personalized Elk Ridge trail knife" },
  { src: "/photos/prod-whiskey-gift-set-box.jpg",      alt: "Personalized whiskey gift set with box" },
  { src: "/photos/prod-keychain-family.jpg",           alt: "Custom family keychain" },
  { src: "/photos/prod-decanter-dad.jpg",              alt: "Personalized whiskey decanter for dad" },
  { src: "/photos/prod-hammer.jpg",                    alt: "Custom engraved hammer" },
  { src: "/photos/prod-knife-collection.jpg",          alt: "Personalized engraved knife collection" },
  { src: "/photos/prod-unique-artwork.jpg",            alt: "Unique custom artwork engraving" },
  { src: "/photos/cutting-boards-family.jpg",          alt: "Engraved family cutting boards" },
  { src: "/photos/whiskey-glasses-bar.jpg",            alt: "Monogrammed whiskey glasses" },
  { src: "/photos/knife-engraved.jpg",                 alt: "Custom engraved knife" },
  { src: "/photos/leather-wallet.jpg",                 alt: "Personalized leather wallet" },
  { src: "/photos/decanter-set-gift.jpg",              alt: "Engraved decanter gift set" },
];

export function HomePhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <section style={{ padding: "80px 0 60px" }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p className="eyebrow">@outofjersey.engraving</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}
            >
              The work,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>up close.</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/outofjerseycreations"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              textDecoration: "none",
            }}
          >
            Follow on Instagram <ArrowIcon size={14} />
          </a>
        </div>

        {/* Photo grid */}
        <div className="layout-photo-grid">
          {photos.map((p, i) => {
            const tall = i === 0 || i === 6 || i === 13 || i === 19;
            const wide = i === 3 || i === 10 || i === 17;
            return (
              <div
                key={i}
                className="reveal card-hover photo-grid-item"
                onClick={() => setLightboxIndex(i)}
                style={{
                  borderRadius: "var(--r-sm)",
                  overflow: "hidden",
                  position: "relative",
                  background: "var(--cream-3)",
                  gridRow: tall ? "span 2" : "span 1",
                  gridColumn: wide ? "span 2" : "span 1",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover card-media"
                  sizes="(max-width: 480px) 50vw, (max-width: 900px) 33vw, 16vw"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.8)",
              fontSize: 36,
              lineHeight: 1,
              cursor: "pointer",
              zIndex: 1001,
              padding: 4,
            }}
          >
            ×
          </button>

          {/* Counter */}
          <p
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              letterSpacing: "0.08em",
              userSelect: "none",
            }}
          >
            {lightboxIndex + 1} / {photos.length}
          </p>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "white",
              width: 48,
              height: 48,
              borderRadius: "50%",
              fontSize: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
              backdropFilter: "blur(4px)",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(90vw, 860px)",
              height: "min(85vh, 720px)",
            }}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "white",
              width: 48,
              height: 48,
              borderRadius: "50%",
              fontSize: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
              backdropFilter: "blur(4px)",
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
