"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { collections } from "@/lib/data";
import {
  SearchIcon,
  AccountIcon,
  CartIcon,
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
    { label: "Shop", href: "/shop", hasMega: true },
    { label: "Custom Orders", href: "/custom" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "var(--cream)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: "1px solid var(--line-soft)",
          transition: "all .3s var(--ease)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 28px",
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
                    color: "var(--ink)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    paddingBottom: 4,
                    borderBottom: `1px solid ${pathname === l.href ? "var(--ink)" : "transparent"}`,
                    transition: "border-color .25s var(--ease)",
                  }}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              className="btn btn-ghost"
              onClick={() => setSearchOpen(true)}
              style={{ padding: "10px 12px" }}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <Link
              href="/account"
              className="btn btn-ghost desktop-only"
              style={{ padding: "10px 12px" }}
              aria-label="Account"
            >
              <AccountIcon />
            </Link>
            <Link
              href="/cart"
              className="btn btn-ghost"
              style={{ padding: "10px 12px", position: "relative" }}
              aria-label="Cart"
            >
              <CartIcon />
            </Link>
            <button
              className="btn btn-ghost mobile-only"
              onClick={() => setMobileOpen((v) => !v)}
              style={{ padding: "10px 12px" }}
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
            <div className="container" style={{ padding: "40px 28px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 2fr 1fr",
                  gap: 60,
                }}
              >
                <div>
                  <p className="eyebrow" style={{ marginBottom: 16 }}>
                    Shop by
                  </p>
                  <h3
                    className="display"
                    style={{ fontSize: 36, margin: 0 }}
                  >
                    Every piece, laser-engraved for the moment it&rsquo;s for.
                  </h3>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px 32px",
                  }}
                >
                  {collections.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?collection=${c.id}`}
                      style={{
                        padding: "14px 0",
                        borderBottom: "1px solid var(--line-soft)",
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        color: "var(--ink)",
                        textDecoration: "none",
                        gap: 16,
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 500 }}>
                        {c.name}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--muted-soft)" }}>
                        {c.count}
                      </span>
                    </Link>
                  ))}
                </div>

                <div
                  style={{
                    background: "var(--cream-2)",
                    borderRadius: "var(--r-md)",
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p
                      className="eyebrow"
                      style={{ color: "var(--brass)", marginBottom: 8 }}
                    >
                      Featured
                    </p>
                    <h4
                      className="serif"
                      style={{ fontSize: 22, margin: "0 0 8px" }}
                    >
                      Wedding Season &rsquo;26
                    </h4>
                    <p
                      style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}
                    >
                      Curated bridal party sets, monogrammed flutes, and bespoke
                      favors.
                    </p>
                  </div>
                  <Link
                    href="/shop?collection=wedding"
                    className="btn btn-secondary"
                    style={{
                      marginTop: 16,
                      alignSelf: "flex-start",
                      padding: "10px 18px",
                      fontSize: 12,
                    }}
                  >
                    Explore <ArrowIcon size={12} />
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
                fontSize: 14,
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              Policies & FAQ
            </Link>
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
      aria-label="Out of Jersey — Home"
    >
      <Image
          src="/logo-transparent.png"
          alt="Out of Jersey Custom Laser Engraving"
          width={140}
          height={56}
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
                        {c.count} pieces
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
