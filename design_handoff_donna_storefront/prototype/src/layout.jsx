// ─────────────────────────────────────────────
// Donna's — Layout shell: Router, Nav, Footer, shared bits
// ─────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

// ── Router (hash-based, simple) ─────────────────────────
const RouterContext = createContext({ route: { name: 'home' }, navigate: () => {} });

function parseHash() {
  const h = window.location.hash.slice(1) || '/';
  if (h === '/' || h === '') return { name: 'home' };
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'shop' && parts.length === 1) return { name: 'shop' };
  if (parts[0] === 'product' && parts[1]) return { name: 'product', id: parts[1] };
  if (parts[0] === 'custom')   return { name: 'custom' };
  if (parts[0] === 'about')    return { name: 'about' };
  if (parts[0] === 'contact')  return { name: 'contact' };
  if (parts[0] === 'policies') return { name: 'policies', tab: parts[1] || 'shipping' };
  return { name: 'home' };
}

function RouterProvider({ children }) {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = useCallback((path) => {
    window.location.hash = path.startsWith('#') ? path.slice(1) : path;
  }, []);
  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() { return useContext(RouterContext); }

// ── Link ────────────────────────────────────────────────
function Link({ to, children, className, style, onClick, ...rest }) {
  const { navigate } = useRouter();
  const handle = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={'#' + to} className={className} style={style} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

// ── Cart context ────────────────────────────────────────
const CartContext = createContext({ items: [], add: () => {}, remove: () => {}, count: 0 });

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, key: Math.random().toString(36).slice(2) }]);
  }, []);
  const remove = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);
  const count = items.length;
  return (
    <CartContext.Provider value={{ items, add, remove, count }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() { return useContext(CartContext); }

// ── Wordmark ────────────────────────────────────────────
function Wordmark({ size = 28, color = 'currentColor', tagline = false }) {
  return (
    <Link to="/" style={{ textDecoration: 'none', color, display: 'inline-flex', alignItems: 'baseline', gap: 10 }}>
      <span
        className="display-italic"
        style={{ fontSize: size, lineHeight: 0.9, letterSpacing: '-0.02em' }}
      >
        Donna
      </span>
      <span style={{
        fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
        opacity: 0.55, fontWeight: 600, position: 'relative', top: -4,
      }}>
        &amp; co.
      </span>
      {tagline && (
        <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 12 }}>
          Engraved in studio
        </span>
      )}
    </Link>
  );
}

// ── Announcement bar ────────────────────────────────────
function AnnouncementBar() {
  const messages = [
    'Free US shipping on orders over $125',
    'Holiday lead times: order by Dec 12 for Christmas',
    'Custom commissions open — 2 slots left in November',
    'Black-owned, hand-engraved in Charlotte, NC',
  ];
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--cream)',
      fontSize: 12, letterSpacing: '0.04em',
      padding: '10px 0',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div className="marquee-track">
        {[...messages, ...messages, ...messages].map((m, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 64 }}>
            {m}
            <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────
function Nav() {
  const { route } = useRouter();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMegaOpen(false);
  }, [route]);

  const links = [
    { label: 'Shop', to: '/shop', hasMega: true },
    { label: 'Custom Orders', to: '/custom' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: scrolled ? 'rgba(251, 245, 236, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      transition: 'all .3s var(--ease)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 28px',
      }}>
        <Wordmark />

        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-only">
          {links.map((l) => (
            <div
              key={l.label}
              onMouseEnter={() => l.hasMega && setMegaOpen(true)}
              onMouseLeave={() => l.hasMega && setMegaOpen(false)}
              style={{ position: 'relative' }}
            >
              <Link
                to={l.to}
                style={{
                  fontSize: 13, fontWeight: 500, color: 'var(--ink)',
                  textDecoration: 'none', letterSpacing: '0.02em',
                  paddingBottom: 4, borderBottom: '1px solid transparent',
                }}
                onMouseEnter={(e) => { e.target.style.borderBottomColor = 'var(--ink)'; }}
                onMouseLeave={(e) => { e.target.style.borderBottomColor = 'transparent'; }}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button className="btn btn-ghost" onClick={() => setSearchOpen(true)} style={{ padding: '10px 12px' }} aria-label="Search">
            <SearchIcon />
          </button>
          <Link to="/account" className="btn btn-ghost desktop-only" style={{ padding: '10px 12px' }} aria-label="Account">
            <AccountIcon />
          </Link>
          <button className="btn btn-ghost" style={{ padding: '10px 12px', position: 'relative' }} aria-label="Cart">
            <CartIcon />
            {count > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                background: 'var(--terracotta)', color: 'var(--cream)',
                fontSize: 10, fontWeight: 700, width: 16, height: 16,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{count}</span>
            )}
          </button>
          <button
            className="btn btn-ghost mobile-only"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ padding: '10px 12px' }}
            aria-label="Menu"
          >
            {mobileOpen ? '✕' : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {megaOpen && (
        <div
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'var(--cream)',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            animation: 'pageEnter .3s var(--ease-out)',
          }}>
          <div className="container" style={{ padding: '40px 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', gap: 60 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Shop by</p>
                <h3 className="display" style={{ fontSize: 36, margin: 0 }}>Every piece, made for the moment it&rsquo;s for.</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 32px' }}>
                {window.DONNA.collections.map((c) => (
                  <Link key={c.id} to={`/shop#${c.id}`} style={{
                    padding: '14px 0', borderBottom: '1px solid var(--line-soft)',
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    color: 'var(--ink)', textDecoration: 'none', gap: 16,
                  }}>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted-soft)' }}>{c.count}</span>
                  </Link>
                ))}
              </div>
              <div style={{
                background: 'var(--cream-2)', borderRadius: 'var(--r-md)',
                padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <p className="eyebrow" style={{ color: 'var(--brass)', marginBottom: 8 }}>Featured</p>
                  <h4 className="serif" style={{ fontSize: 22, margin: '0 0 8px' }}>Wedding Season &rsquo;26</h4>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
                    Curated bridal party sets, monogrammed flutes, and bespoke favors.
                  </p>
                </div>
                <Link to="/shop#wedding" className="btn btn-secondary" style={{ marginTop: 16, alignSelf: 'flex-start', padding: '10px 18px', fontSize: 12 }}>
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--cream)',
          borderTop: '1px solid var(--line)',
          padding: '24px 28px',
          animation: 'pageEnter .3s var(--ease-out)',
        }}>
          {links.map((l) => (
            <Link key={l.label} to={l.to} style={{
              display: 'block', padding: '16px 0',
              borderBottom: '1px solid var(--line-soft)',
              fontSize: 20, color: 'var(--ink)', textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontWeight: 500,
            }}>{l.label}</Link>
          ))}
          <Link to="/policies" style={{
            display: 'block', padding: '16px 0',
            fontSize: 14, color: 'var(--muted)', textDecoration: 'none',
          }}>Policies & FAQ</Link>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

// ── Search overlay ──────────────────────────────────────
function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef();
  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    if (!q) return window.DONNA.products.slice(0, 4);
    return window.DONNA.products.filter((p) =>
      (p.name + ' ' + p.sub + ' ' + p.collection).toLowerCase().includes(q.toLowerCase())
    ).slice(0, 6);
  }, [q]);

  const suggestions = ['Wedding gifts', 'Under $50', 'Tumblers', 'Father\'s Day', 'Monogram set'];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(31, 20, 16, 0.55)',
      backdropFilter: 'blur(8px)',
      animation: 'pageEnter .35s var(--ease-out)',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--cream)',
        padding: '28px 0',
        animation: 'slideDown .4s var(--ease-out)',
      }} onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--ink)' }}>
            <SearchIcon size={20} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for tumblers, boards, monograms…"
              style={{
                flex: 1, border: 0, outline: 0, background: 'transparent',
                fontSize: 28, fontFamily: 'var(--font-display)',
                color: 'var(--ink)',
              }}
            />
            <button onClick={onClose} className="btn btn-ghost" style={{ fontSize: 13 }}>Close ✕</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, padding: '32px 0' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Popular searches</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {suggestions.map((s) => (
                  <li key={s}>
                    <button onClick={() => setQ(s)} style={{
                      background: 'none', border: 0, color: 'var(--ink)',
                      cursor: 'pointer', padding: 0, fontSize: 15, textAlign: 'left',
                    }}>↗ {s}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                {q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Suggested'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {results.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} style={{
                    display: 'flex', gap: 14, alignItems: 'center',
                    padding: 12, borderRadius: 'var(--r-sm)',
                    color: 'var(--ink)', textDecoration: 'none',
                    background: 'var(--cream-2)',
                  }}>
                    <ProductGlyph type={p.type} size={56} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>${p.price}</div>
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

// ── Footer ──────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Shop', items: window.DONNA.collections.map((c) => ({ label: c.name, to: `/shop#${c.id}` })) },
    { title: 'Studio', items: [
      { label: 'About Donna', to: '/about' },
      { label: 'Custom Orders', to: '/custom' },
      { label: 'Corporate & Bulk', to: '/custom' },
      { label: 'Contact', to: '/contact' },
      { label: 'Press & Stockists', to: '/about' },
    ]},
    { title: 'Help', items: [
      { label: 'Shipping', to: '/policies/shipping' },
      { label: 'Returns', to: '/policies/returns' },
      { label: 'Custom Order Policy', to: '/policies/custom' },
      { label: 'FAQ', to: '/policies/faq' },
      { label: 'Account', to: '/account' },
    ]},
  ];

  return (
    <footer style={{
      background: 'var(--ink)', color: 'var(--cream)',
      padding: '80px 0 40px', marginTop: 80,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Big italic monogram in background */}
      <div aria-hidden style={{
        position: 'absolute', left: '50%', bottom: -80,
        transform: 'translateX(-50%)',
        fontSize: 'clamp(280px, 38vw, 540px)',
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        color: 'rgba(255,255,255,0.04)', lineHeight: 0.85,
        letterSpacing: '-0.03em', pointerEvents: 'none',
        userSelect: 'none', whiteSpace: 'nowrap',
      }}>Donna</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Newsletter */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60,
          paddingBottom: 60, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }} className="footer-top">
          <div>
            <p className="eyebrow" style={{ color: 'var(--brass-light)', marginBottom: 16 }}>From the studio</p>
            <h3 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0, maxWidth: 480 }}>
              Letters from <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>my hands</em> to yours.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 420, marginTop: 16, fontSize: 14 }}>
              New pieces, behind-the-scenes from the studio, holiday lead times, and the occasional early-access drop. No spam, I promise.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ alignSelf: 'end' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--cream)', paddingBottom: 8 }}>
              <input type="email" placeholder="your@email.com" required style={{
                flex: 1, background: 'transparent', border: 0, outline: 0,
                color: 'var(--cream)', fontSize: 18, fontFamily: 'var(--font-body)',
              }} />
              <button type="submit" style={{
                background: 'transparent', border: 0, color: 'var(--cream)',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>Subscribe →</button>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>
              By subscribing you agree to occasional emails. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Columns */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
          padding: '60px 0 40px',
        }} className="footer-cols">
          <div>
            <Wordmark size={36} color="var(--cream)" />
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 320, marginTop: 20, fontSize: 14, lineHeight: 1.7 }}>
              Engraved goods and personalized commissions, made by hand in Charlotte, NC. A small Black-owned studio building heirlooms one piece at a time.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {['IG', 'TT', 'PT', 'FB'].map((s) => (
                <a key={s} href="#" aria-label={s} style={{
                  width: 38, height: 38, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.08)', color: 'var(--cream)',
                  fontSize: 11, fontWeight: 600, textDecoration: 'none',
                }}>{s}</a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>{col.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to} style={{
                      color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                      fontSize: 14,
                    }}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: 12, color: 'rgba(255,255,255,0.45)', gap: 16, flexWrap: 'wrap',
        }}>
          <div>© {new Date().getFullYear()} Donna &amp; Co. · Black-owned, hand-engraved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/policies/shipping" style={{ color: 'inherit' }}>Privacy</Link>
            <Link to="/policies/returns" style={{ color: 'inherit' }}>Terms</Link>
            <Link to="/policies" style={{ color: 'inherit' }}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Icons (hand-drawn, single weight) ────────────────────
function SearchIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  );
}
function AccountIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
function CartIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h2l2.5 12h11L21 9H6" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}
function MenuIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  );
}
function ArrowIcon({ size = 16, dir = 'right' }) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14,6 20,12 14,18" />
    </svg>
  );
}
function StarIcon({ size = 14, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  );
}
function HeartIcon({ size = 18, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 21s-7-4.5-9.5-9C0.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z" />
    </svg>
  );
}

// ── Scroll reveal helper ────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── Product Glyph — stylized SVG of each product type ──
function ProductGlyph({ type, size = 200, color = 'var(--terracotta)', engraving = null, bg = null }) {
  const id = useMemo(() => 'pg-' + Math.random().toString(36).slice(2, 9), []);
  const cream = 'var(--cream)';
  const ink = 'var(--ink)';
  const fill = bg || cream;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block' }}>
      <defs>
        <clipPath id={`${id}-clip`}>
          {type === 'tumbler' && <path d="M 70 30 L 130 30 L 134 60 L 140 170 Q 100 178 60 170 L 66 60 Z" />}
          {type === 'tumbler-tall' && <path d="M 65 18 L 135 18 L 138 35 L 142 180 Q 100 188 58 180 L 62 35 Z" />}
          {type === 'board' && <rect x="20" y="60" width="160" height="80" rx="6" />}
          {type === 'board-round' && <circle cx="100" cy="100" r="78" />}
          {type === 'wallet' && <rect x="30" y="50" width="140" height="100" rx="8" />}
          {type === 'decanter' && <path d="M 85 28 L 115 28 L 112 70 L 145 140 Q 145 180 100 180 Q 55 180 55 140 L 88 70 Z" />}
          {type === 'box' && <path d="M 30 70 L 170 70 L 170 165 L 30 165 Z M 30 70 L 30 50 L 170 50 L 170 70" />}
          {type === 'glass' && <path d="M 75 30 L 125 30 L 130 60 L 140 140 Q 100 152 60 140 L 70 60 Z" />}
        </clipPath>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.92" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Body */}
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="200" height="200" fill={`url(#${id}-grad)`} />
        {/* Highlight */}
        <rect x="0" y="0" width="40" height="200" fill="rgba(255,255,255,0.13)" />
        {/* Engraved area — slightly darker zone */}
        {type !== 'board' && type !== 'board-round' && (
          <rect x="40" y="80" width="120" height="60" fill="rgba(0,0,0,0.06)" />
        )}
      </g>

      {/* Outline */}
      <g fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2">
        {type === 'tumbler' && <path d="M 70 30 L 130 30 L 134 60 L 140 170 Q 100 178 60 170 L 66 60 Z" />}
        {type === 'tumbler-tall' && <path d="M 65 18 L 135 18 L 138 35 L 142 180 Q 100 188 58 180 L 62 35 Z" />}
        {type === 'board' && <rect x="20" y="60" width="160" height="80" rx="6" />}
        {type === 'board-round' && <circle cx="100" cy="100" r="78" />}
        {type === 'wallet' && <rect x="30" y="50" width="140" height="100" rx="8" />}
        {type === 'decanter' && <path d="M 85 28 L 115 28 L 112 70 L 145 140 Q 145 180 100 180 Q 55 180 55 140 L 88 70 Z" />}
        {type === 'box' && <path d="M 30 70 L 170 70 L 170 165 L 30 165 Z" />}
        {type === 'glass' && <path d="M 75 30 L 125 30 L 130 60 L 140 140 Q 100 152 60 140 L 70 60 Z" />}
      </g>

      {/* Engraving text */}
      {engraving && (
        <g style={{ pointerEvents: 'none' }}>
          <text
            x="100"
            y={type === 'board' || type === 'board-round' ? 105 : 115}
            textAnchor="middle"
            fill="rgba(0,0,0,0.45)"
            style={{
              fontFamily: engraving.fontCss,
              fontSize: engraving.size || 16,
              fontStyle: engraving.italic ? 'italic' : 'normal',
              fontWeight: engraving.weight || 500,
              letterSpacing: engraving.caps ? '0.12em' : '0',
            }}
          >
            {engraving.caps ? (engraving.text || '').toUpperCase() : (engraving.text || '')}
          </text>
        </g>
      )}
    </svg>
  );
}

// ── Section helpers ─────────────────────────────────────
function Section({ children, bg, padding = '120px 0', style, ...rest }) {
  return (
    <section style={{ background: bg, padding, ...style }} {...rest}>
      <div className="container">{children}</div>
    </section>
  );
}

function Eyebrow({ children, color, style }) {
  return <p className="eyebrow" style={{ color, margin: 0, ...style }}>{children}</p>;
}

// ── Export to window for cross-script use ───────────────
Object.assign(window, {
  // Router + context
  RouterProvider, RouterContext, useRouter, Link,
  CartProvider, useCart,
  // Layout pieces
  Wordmark, AnnouncementBar, Nav, Footer, SearchOverlay,
  // Icons
  SearchIcon, AccountIcon, CartIcon, MenuIcon, ArrowIcon, StarIcon, HeartIcon,
  // Utilities
  useReveal, ProductGlyph, Section, Eyebrow,
});
