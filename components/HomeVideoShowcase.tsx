"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const videos = [
  { src: "/videos/laser-engraving-02.mp4", label: "Custom tumbler" },
  { src: "/videos/laser-engraving-03.mp4", label: "Engraving process" },
  { src: "/videos/laser-engraving-04.mp4", label: "Mother's Day drop" },
  { src: "/videos/laser-engraving-05.mp4", label: "Brand collab" },
  { src: "/videos/laser-engraving-06.mp4", label: "Laser in action" },
  { src: "/videos/laser-engraving-07.mp4", label: "Mother's Day set" },
  { src: "/videos/laser-engraving-08.mp4", label: "Custom engraving" },
  { src: "/videos/laser-engraving-09.mp4", label: "49ers collab" },
  { src: "/videos/laser-engraving-10.mp4", label: "APA international" },
  { src: "/videos/laser-engraving-11.mp4", label: "Studio process" },
  { src: "/videos/laser-engraving-13.mp4", label: "Detail shot" },
  { src: "/videos/laser-engraving-14.mp4", label: "HK custom piece" },
  { src: "/videos/laser-engraving-15.mp4", label: "Custom artwork" },
  { src: "/videos/laser-engraving-16.mp4", label: "Team design" },
  { src: "/videos/laser-engraving-17.mp4", label: "Championship piece" },
];

export function HomeVideoShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Arrow visibility
  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  // Intersection Observer — plays videos when ≥50% visible (fixes mobile autoplay)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((video) => {
      if (!video) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(video);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i !== null ? (i - 1 + videos.length) % videos.length : null));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i !== null ? (i + 1) % videos.length : null));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  const btnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(26,48,40,0.85)",
    backdropFilter: "blur(6px)",
    color: "white",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    transition: "background .2s",
  };

  return (
    <section style={{ padding: "80px 0 60px", overflow: "hidden" }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p className="eyebrow">Watch us work</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}
            >
              The craft,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>up close.</em>
            </h2>
          </div>
          <p
            style={{ fontSize: 15, color: "var(--muted)", maxWidth: 340, lineHeight: 1.6, margin: 0 }}
          >
            Every mark is intentional. Laser precision, personal care — on every single piece.
          </p>
        </div>
      </div>

      {/* Scroll strip with arrow buttons */}
      <div style={{ position: "relative" }}>
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            style={{ ...btnStyle, left: 12 }}
          >
            ‹
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            style={{ ...btnStyle, right: 12 }}
          >
            ›
          </button>
        )}

        {/* Fade edges */}
        {canScrollLeft && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 8,
              width: 64,
              zIndex: 5,
              background: "linear-gradient(to right, var(--cream) 20%, transparent)",
              pointerEvents: "none",
            }}
          />
        )}
        {canScrollRight && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 8,
              width: 64,
              zIndex: 5,
              background: "linear-gradient(to left, var(--cream) 20%, transparent)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingLeft: "max(24px, calc((100vw - 1280px) / 2))",
            paddingRight: "max(24px, calc((100vw - 1280px) / 2))",
            paddingBottom: 8,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {videos.map((v, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              title="Click to enlarge"
              style={{
                position: "relative",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                aspectRatio: "9/16",
                height: 440,
                flexShrink: 0,
                background: "var(--ink)",
                cursor: "zoom-in",
              }}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                src={v.src}
              />
              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                  padding: "24px 14px 14px",
                  color: "var(--cream)",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {v.label}
                </p>
              </div>

              {/* Expand icon hint */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 13,
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              >
                ⤢
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip — below the video scroll, tied to the tumbler showcase */}
      <div className="container" style={{ marginTop: 36 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            background: "var(--forest)",
            borderRadius: "var(--r-lg)",
            padding: "28px 36px",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              Custom 40oz Tumblers with Handle
            </p>
            <p
              className="display"
              style={{
                color: "var(--cream)",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Every design made just for you.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/shop"
              style={{
                padding: "14px 26px",
                borderRadius: "var(--r-pill)",
                background: "var(--cream)",
                color: "var(--forest)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Shop tumblers
            </a>
            <a
              href="/custom"
              style={{
                padding: "14px 26px",
                borderRadius: "var(--r-pill)",
                background: "transparent",
                color: "var(--cream)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.35)",
                whiteSpace: "nowrap",
                transition: "border-color .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}
            >
              Request a custom design
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.94)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
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
              top: 26,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              letterSpacing: "0.08em",
              userSelect: "none",
              margin: 0,
            }}
          >
            {lightboxIndex + 1} / {videos.length}
          </p>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) =>
                i !== null ? (i - 1 + videos.length) % videos.length : null
              );
            }}
            aria-label="Previous video"
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
              fontSize: 26,
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

          {/* Video */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              height: "min(85vh, 700px)",
              aspectRatio: "9/16",
            }}
          >
            <video
              key={lightboxIndex}
              src={videos[lightboxIndex].src}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "var(--r-md)",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: -28,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {videos[lightboxIndex].label}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) =>
                i !== null ? (i + 1) % videos.length : null
              );
            }}
            aria-label="Next video"
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
              fontSize: 26,
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
