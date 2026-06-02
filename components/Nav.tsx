"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { collections, navGroups } from "@/lib/data";
import {
  SearchIcon,
  MenuIcon,
  CloseIcon,
  ArrowIcon,
} from "./Icons";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/shop", hasMega: true },
    { label: "Custom Orders", href: "/custom" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pay", href: "/pay" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "#1a3028",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transition: "all .3s var(--ease)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 28px",
          }}
        >
          {/* Wordmark */}
          <Wordmark />

          {/* Desktop nav */}
          <nav
            className="desktop-only"
            style={{ alignItems: "center", gap: 36 }}
          >
            {navLinks.map((l) => (
              <div
                key={l.label}
                style={{ position: "relative" }}
                onMouseEnter={() => l.hasMega && openMega()}
                onMouseLeave={() => l.hasMega && closeMega()}
              >
                <Link
                  href={l.href}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#fff",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    paddingBottom: 4,
                    borderBottom: `1px solid ${pathname === l.href ? "#fff" : "transparent"}`,
                    transition: "border-color .25s var(--ease)",
                  }}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right: CTA + mobile menu */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
            <button
              className="btn btn-ghost desktop-only"
              onClick={() => setSearchOpen(true)}
              style={{ padding: "10px 12px", color: "#fff" }}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <Link
              href="/custom"
              className="btn btn-primary desktop-only"
              style={{ fontSize: 13, padding: "11px 22px", whiteSpace: "nowrap" }}
            >
              Start Custom Order <ArrowIcon size={12} />
            </Link>
            <button
              className="btn btn-ghost mobile-only"
              onClick={() => setMobileOpen((v) => !v)}
              style={{ padding: "10px 12px", color: "#fff" }}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {megaOpen && (
          <div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--cream)",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
              animation: "pageEnter .3s var(--ease-out)",
              zIndex: 50,
            }}
          >
            <div className="container" style={{ padding: "36px 28px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 220px",
                  gap: 48,
                  alignItems: "start",
                }}
              >
                {/* Left: heading */}
                <div style={{ paddingTop: 4 }}>
                  <p className="eyebrow" style={{ marginBottom: 14 }}>
                    The Gallery
                  </p>
                  <h3
                    className="display"
                    style={{ fontSize: 28, margin: "0 0 20px", lineHeight: 1.1 }}
                  >
                    Every piece,<br />made for you.
                  </h3>
                  <Link
                    href="/shop"
                    className="btn btn-secondary"
                    style={{ padding: "9px 16px", fontSize: 12 }}
                  >
                    Browse gallery <ArrowIcon size={11} />
                  </Link>
                </div>

                {/* Centre: categories grouped */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {navGroups.map((group) => {
                    const groupCollections = collections.filter((c) =>
                      (group.collections as readonly string[]).includes(c.id)
                    );
                    return (
                      <div key={group.id}>
                        <p
                          className="eyebrow"
                          style={{
                            marginBottom: 8,
                            color: "var(--terracotta)",
                            fontSize: 10,
                            letterSpacing: "0.12em",
                          }}
                        >
                          {group.label}
                        </p>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: "0 24px",
                          }}
                        >
                          {groupCollections.map((c) => (
                            <Link
                              key={c.id}
                              href={`/shop?collection=${c.id}`}
                              style={{
                                padding: "9px 0",
                                borderBottom: "1px solid var(--line-soft)",
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "space-between",
                                color: "var(--ink)",
                                textDecoration: "none",
                                gap: 8,
                                transition: "color .15s",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terracotta)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
                            >
                              <span style={{ fontSize: 14, fontWeight: 500 }}>
                                {c.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: custom order CTA card */}
                <div
                  style={{
                    background: "var(--terracotta)",
                    borderRadius: "var(--r-md)",
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 200,
                  }}
                >
                  <div>
                    <p
                      className="eyebrow"
                      style={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}
                    >
                      By commission
                    </p>
                    <h4
                      className="serif"
                      style={{ fontSize: 20, margin: "0 0 8px", color: "#fff" }}
                    >
                      Start a Custom Order
                    </h4>
                    <p
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.5 }}
                    >
                      Tell Donna your vision — logos, artwork, handwriting, names. Quotes within 24 hours.
                    </p>
                  </div>
                  <Link
                    href="/custom"
                    className="btn"
                    style={{
                      marginTop: 20,
                      alignSelf: "flex-start",
                      padding: "10px 18px",
                      fontSize: 12,
                      background: "#fff",
                      color: "var(--ink)",
                    }}
                  >
                    Request a design <ArrowIcon size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            style={{
              background: "var(--cream)",
              borderTop: "1px solid var(--line)",
              padding: "24px 28px",
              animation: "pageEnter .3s var(--ease-out)",
            }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  display: "block",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--line-soft)",
                  fontSize: 20,
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/policies"
              style={{
                display: "block",
                padding: "16px 0",
                borderBottom: "1px solid var(--line-soft)",
                fontSize: 14,
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              Policies & FAQ
            </Link>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              <Link
                href="/custom"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
              >
                Start Custom Order <ArrowIcon size={14} />
              </Link>
              <Link
                href="/pay"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
              >
                Pay for My Order <ArrowIcon size={14} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function Wordmark() {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
      }}
      aria-label="Out of Jersey Creations — Home"
    >
      <Image
          src="/logo-transparent.png"
          alt="Out of Jersey Creations Custom Laser Engraving"
          width={90}
          height={36}
          style={{ objectFit: "contain", display: "block" }}
          priority
        />
    </Link>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const suggestions = [
    "Wedding gifts",
    "Under $50",
    "Tumblers",
    "Father's Day",
    "Monogram set",
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(31,20,16,0.55)",
        backdropFilter: "blur(8px)",
        animation: "pageEnter .35s var(--ease-out)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--cream)",
          padding: "28px 0",
          animation: "pageEnter .4s var(--ease-out)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingBottom: 16,
              borderBottom: "1px solid var(--ink)",
            }}
          >
            <SearchIcon size={20} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for tumblers, boards, monograms…"
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 28,
                fontFamily: "var(--font-display)",
                color: "var(--ink)",
              }}
            />
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ fontSize: 13 }}
            >
              Close ✕
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 60,
              padding: "32px 0",
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                Popular searches
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {suggestions.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/shop?q=${encodeURIComponent(s)}`}
                      onClick={onClose}
                      style={{
                        background: "none",
                        color: "var(--ink)",
                        fontSize: 15,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      ↗ {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                Collections
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {collections.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?collection=${c.id}`}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      padding: 12,
                      borderRadius: "var(--r-sm)",
                      color: "var(--ink)",
                      textDecoration: "none",
                      background: "var(--cream-2)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {c.kicker}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
