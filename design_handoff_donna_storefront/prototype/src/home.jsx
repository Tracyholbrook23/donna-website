// ─────────────────────────────────────────────
// Donna's — Homepage
// ─────────────────────────────────────────────

function HomePage({ heroVariant = 'editorial', cardStyle = 'standard' }) {
  window.useReveal();
  return (
    <main className="page-enter">
      <HomeHero variant={heroVariant} />
      <HomeMarqueeStrip />
      <HomeCategories />
      <HomeStudioStory />
      <HomeBestsellers cardStyle={cardStyle} />
      <HomeCustomizerTeaser />
      <HomeInTheirHands />
      <HomeTestimonials />
      <HomeCustomCTA />
    </main>
  );
}

// ── HERO ────────────────────────────────────────────────
function HomeHero({ variant = 'editorial' }) {
  const { navigate } = useRouter();

  if (variant === 'split') return <HomeHeroSplit />;
  if (variant === 'overlay') return <HomeHeroOverlay />;

  // EDITORIAL — default. Asymmetric, magazine-cover energy.
  return (
    <section style={{ position: 'relative', padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 48,
          alignItems: 'end',
          minHeight: '78vh',
        }} className="hero-grid">
          {/* LEFT — Headline + supporting */}
          <div style={{ position: 'relative', padding: '40px 0' }}>
            <p className="eyebrow reveal" style={{ marginBottom: 28 }}>
              Volume 04 · Engraved goods, made by hand
            </p>
            <h1 className="display reveal reveal-delay-1" style={{
              fontSize: 'clamp(64px, 8.5vw, 132px)',
              margin: '0 0 12px',
              fontWeight: 400,
            }}>
              Gifts that
              <br />
              <em style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontWeight: 300, color: 'var(--terracotta)',
              }}>mean&nbsp;</em>
              something.
            </h1>
            <p className="reveal reveal-delay-2" style={{
              fontSize: 18, lineHeight: 1.55, color: 'var(--muted)',
              maxWidth: 460, margin: '24px 0 36px',
            }}>
              A small Black-owned studio engraving tumblers, boards, wallets, and one-off commissions — for the moments that deserve more than a card.
            </p>

            <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/shop')} data-magnetic="60">
                Shop the collection
                <ArrowIcon />
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/custom')}>
                Start a custom piece
              </button>
            </div>

            {/* Inline meta strip */}
            <div className="reveal reveal-delay-4" style={{
              display: 'flex', gap: 32, marginTop: 56,
              paddingTop: 28, borderTop: '1px solid var(--line)',
              flexWrap: 'wrap',
            }}>
              <Stat label="Pieces in the catalog" value="117" counter={117} />
              <Stat label="Five-star reviews" value="1,840+" counter={1840} suffix="+" />
              <Stat label="Engraved this year" value="6,200" counter={6200} />
              <Stat label="Studio" value="Charlotte, NC" />
            </div>
          </div>

          {/* RIGHT — image stack */}
          <div className="reveal reveal-delay-2" style={{ position: 'relative', minHeight: 580 }}>
            {/* Big image */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0,
              width: '90%', borderRadius: 'var(--r-md)',
              overflow: 'hidden',
            }}>
              <image-slot
                id="hero-main"
                style={{ width: '100%', height: '100%', display: 'block' }}
                shape="rounded"
                radius="20"
                placeholder="Drop a hero lifestyle photo · Black woman with a Donna tumbler outdoors"
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80"
              ></image-slot>
            </div>

            {/* Floating card — "live order" */}
            <div data-tilt="5" style={{
              position: 'absolute', left: 0, top: '12%',
              background: 'var(--cream)',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--r-md)',
              padding: 18,
              maxWidth: 220,
              zIndex: 2,
              transition: 'transform .4s var(--ease-out)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="live-dot" style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--forest)', color: 'var(--forest)',
                }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--forest)', letterSpacing: '0.06em' }}>
                  ENGRAVING NOW
                </span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: 'var(--ink)' }}>
                A walnut board for <em style={{ fontStyle: 'italic' }}>Sydney &amp; Marcus</em> — the wedding monogram.
              </p>
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                {[1,2,3,4].map((i) => (
                  <span key={i} style={{
                    height: 3, flex: 1, borderRadius: 4,
                    background: i <= 2 ? 'var(--terracotta)' : 'var(--cream-3)',
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 10, color: 'var(--muted-soft)', margin: '8px 0 0', letterSpacing: '0.04em' }}>
                STEP 2 / 4 · ETCHING
              </p>
            </div>

            {/* Floating card — "signature" */}
            <div data-tilt="6" style={{
              position: 'absolute', right: '6%', bottom: '-30px',
              background: 'var(--ink)', color: 'var(--cream)',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--r-md)',
              padding: '16px 20px',
              maxWidth: 240,
              zIndex: 2,
              transition: 'transform .4s var(--ease-out)',
            }}>
              <p className="display-italic" style={{ fontSize: 24, margin: 0, lineHeight: 1 }}>
                — Donna
              </p>
              <p style={{ fontSize: 11, opacity: 0.7, margin: '4px 0 0', letterSpacing: '0.08em' }}>
                Owner · engraver · she/her
              </p>
            </div>

            {/* Small chip — black-owned */}
            <div className="idle-drift" style={{
              position: 'absolute', left: '-6%', bottom: '20%',
              background: 'var(--brass)', color: 'var(--ink)',
              borderRadius: '50%',
              width: 110, height: 110,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              '--badge-rot': '-6deg',
              transform: 'rotate(-6deg)',
              zIndex: 2,
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', animation: 'spin 30s linear infinite' }}>
                <path id="circ" d="M 40 40 m -32 0 a 32 32 0 1 1 64 0 a 32 32 0 1 1 -64 0" fill="none" />
                <text fill="currentColor" fontSize="8.5" fontFamily="var(--font-body)" fontWeight="700" letterSpacing="3">
                  <textPath href="#circ">BLACK OWNED · HAND ENGRAVED · BLACK OWNED · HAND ENGRAVED ·</textPath>
                </text>
              </svg>
              <span style={{ fontSize: 24 }}>✦</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </section>
  );
}

function Stat({ label, value, counter, prefix, suffix }) {
  return (
    <div>
      <div className="serif counter" style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }}
        data-counter={counter}
        data-prefix={prefix}
        data-suffix={suffix}
      >{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

// Hero variant — split
function HomeHeroSplit() {
  const { navigate } = useRouter();
  return (
    <section style={{ padding: '20px 0 40px' }}>
      <div className="container">
        <div style={{
          background: 'var(--ink)', color: 'var(--cream)',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          minHeight: '82vh',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          position: 'relative',
        }} className="hero-split">
          <div style={{ padding: 'clamp(40px, 5vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="eyebrow" style={{ color: 'var(--brass-light)', marginBottom: 28 }}>
              Black-owned · Hand-engraved · Charlotte, NC
            </p>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 7vw, 108px)', margin: 0, fontWeight: 400 }}>
              Made for the
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>people you love.</em>
            </h1>
            <p style={{ fontSize: 17, opacity: 0.75, maxWidth: 440, margin: '32px 0 40px' }}>
              Tumblers, boards, wallets, decanters — engraved with the names, the dates, and the words that matter.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/shop')} className="btn" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
                Shop now <ArrowIcon />
              </button>
              <button onClick={() => navigate('/custom')} className="btn" style={{ background: 'transparent', color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.3)' }}>
                Commission a piece
              </button>
            </div>
          </div>
          <image-slot id="hero-split" style={{ width: '100%', height: '100%' }} shape="rect" placeholder="Lifestyle hero" src="https://images.unsplash.com/photo-1500049242364-5f500807f6e0?w=900&q=80"></image-slot>
        </div>
      </div>
    </section>
  );
}

// Hero variant — overlay
function HomeHeroOverlay() {
  const { navigate } = useRouter();
  return (
    <section style={{ padding: '20px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden', minHeight: '84vh' }}>
          <image-slot id="hero-overlay" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rect" placeholder="Hero image" src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1400&q=80"></image-slot>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(31,20,16,0.0) 0%, rgba(31,20,16,0.75) 100%)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(40px, 5vw, 80px)', color: 'var(--cream)' }}>
            <p className="eyebrow" style={{ color: 'var(--clay)', marginBottom: 20 }}>Engraved with intention</p>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 7vw, 116px)', margin: 0, fontWeight: 400, maxWidth: 920 }}>
              Gifts that <em style={{ fontStyle: 'italic' }}>mean something.</em>
            </h1>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button onClick={() => navigate('/shop')} className="btn" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>Shop</button>
              <button onClick={() => navigate('/custom')} className="btn" style={{ background: 'transparent', color: 'var(--cream)', border: '1px solid var(--cream)' }}>Custom</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Trust marquee ──────────────────────────────────────
function HomeMarqueeStrip() {
  const items = [
    'Hand-engraved in Charlotte, NC',
    'Free US shipping over $125',
    '1,840+ five-star reviews',
    'Black-owned, woman-owned',
    'Live engraving preview',
    '24-hour custom-order replies',
    'Gift-ready packaging on every order',
  ];
  return (
    <section style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '18px 0', overflow: 'hidden',
    }}>
      <div className="marquee-track" style={{ animationDuration: '46s' }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 64,
            fontSize: 13, color: 'var(--ink-soft)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            {it} <span style={{ color: 'var(--brass)' }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ── Categories ──────────────────────────────────────────
function HomeCategories() {
  return (
    <Section padding="120px 0 60px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }} className="reveal">
        <div>
          <Eyebrow>Browse</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '12px 0 0', fontWeight: 400 }}>
            Find your <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>aisle.</em>
          </h2>
        </div>
        <Link to="/shop" style={{ color: 'var(--ink)', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}>
          See everything <ArrowIcon size={14} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '220px', gap: 16 }} className="category-grid">
        <CategoryCard col={1} row={1} colSpan={2} rowSpan={2} cat={window.DONNA.collections[0]} slotId="cat-tumblers" big bg="var(--blush)" img="https://images.unsplash.com/photo-1592919505780-303950717480?w=700&q=80" />
        <CategoryCard col={3} row={1} colSpan={2} rowSpan={1} cat={window.DONNA.collections[1]} slotId="cat-boards"   bg="var(--cream-3)" img="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" />
        <CategoryCard col={5} row={1} colSpan={2} rowSpan={2} cat={window.DONNA.collections[4]} slotId="cat-wedding"  big bg="var(--forest)" textColor="var(--cream)" img="https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80" />
        <CategoryCard col={3} row={2} colSpan={1} rowSpan={1} cat={window.DONNA.collections[2]} slotId="cat-home"     bg="var(--brass-light)" img="https://images.unsplash.com/photo-1591290619762-c5dac3a8347a?w=400&q=80" />
        <CategoryCard col={4} row={2} colSpan={1} rowSpan={1} cat={window.DONNA.collections[3]} slotId="cat-acc"      bg="var(--ink)" textColor="var(--cream)" img="https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80" />
      </div>
    </Section>
  );
}

function CategoryCard({ col, row, colSpan, rowSpan, cat, slotId, big, bg, textColor = 'var(--ink)', img }) {
  const { navigate } = useRouter();
  return (
    <div
      onClick={() => navigate(`/shop#${cat.id}`)}
      className="reveal"
      style={{
        gridColumn: `${col} / span ${colSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
        background: bg,
        color: textColor,
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: big ? 28 : 20,
        transition: 'transform .5s var(--ease-out), box-shadow .5s var(--ease-out)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      <image-slot
        id={slotId}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: big ? 0.55 : 0.45 }}
        shape="rect"
        src={img}
        placeholder=""
      ></image-slot>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7, margin: 0 }}>
          {String(window.DONNA.collections.findIndex((c) => c.id === cat.id) + 1).padStart(2, '0')} / Collection
        </p>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 className="display" style={{ fontSize: big ? 'clamp(32px, 3.5vw, 48px)' : 22, margin: '0 0 6px', lineHeight: 1, fontWeight: 400 }}>
          {cat.name}
        </h3>
        <p style={{ fontSize: 13, opacity: 0.75, margin: 0, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
          {cat.kicker}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, fontSize: 12 }}>
          <span style={{ opacity: 0.7 }}>{cat.count} pieces</span>
          <span>Shop →</span>
        </div>
      </div>
    </div>
  );
}

// ── Studio story ────────────────────────────────────────
function HomeStudioStory() {
  return (
    <Section bg="var(--cream-2)" padding="140px 0">
      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 80, alignItems: 'center' }} className="studio-grid">
        <div className="reveal" style={{ position: 'relative' }}>
          <image-slot
            id="studio-portrait"
            style={{ width: '100%', aspectRatio: '4/5', display: 'block' }}
            shape="rounded"
            radius="20"
            placeholder="Donna at the laser engraver — studio portrait"
            src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=700&q=80"
          ></image-slot>
          {/* Caption tag */}
          <div style={{
            position: 'absolute', left: -20, bottom: 24,
            background: 'var(--cream)', padding: '12px 18px',
            borderRadius: 'var(--r-pill)', boxShadow: 'var(--shadow-md)',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} />
            Studio · 6:47 AM · first cup, first cut.
          </div>
        </div>

        <div className="reveal reveal-delay-1">
          <Eyebrow>Meet Donna</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px 0 24px', fontWeight: 400 }}>
            I started this <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>at the kitchen table.</em>
          </h2>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 520 }}>
            <p style={{ marginTop: 0 }}>
              For my sister&rsquo;s graduation. A walnut box with her name and the date she walked across that stage. I made one — then everyone in our family wanted one.
            </p>
            <p>
              Six years later it&rsquo;s a studio in Charlotte. Still small. Still mine. Every piece is engraved by my hand or one of two women I&rsquo;ve trained personally. Nothing leaves here unless I&rsquo;d give it to my own mother.
            </p>
          </div>

          {/* Mini values */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 40 }}>
            {[
              { n: '01', t: 'Hand-engraved', d: 'Every piece passes through my hands or my team\'s — no exceptions.' },
              { n: '02', t: 'Small batches', d: 'I cap intake so each order gets the attention I\'d want for my mother.' },
              { n: '03', t: 'Local sourced', d: 'Walnut from Carolina, leather from Tennessee, glass from Pennsylvania.' },
              { n: '04', t: 'Family first', d: 'A Black-owned, woman-owned, mother-run, sister-built studio.' },
            ].map((v) => (
              <div key={v.n} style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                <span style={{ fontSize: 11, color: 'var(--terracotta)', fontWeight: 600, letterSpacing: '0.1em' }}>{v.n}</span>
                <h4 className="serif" style={{ fontSize: 17, margin: '6px 0' }}>{v.t}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.55 }}>{v.d}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn btn-secondary" style={{ marginTop: 36 }}>
            Read the full story <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </Section>
  );
}

// ── Bestsellers grid ────────────────────────────────────
function HomeBestsellers({ cardStyle = 'standard' }) {
  const products = window.DONNA.products.slice(0, 6);
  return (
    <Section padding="140px 0 60px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }} className="reveal">
        <div>
          <Eyebrow>Fan favorites</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '12px 0 0', fontWeight: 400 }}>
            The pieces <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>everyone&nbsp;</em> orders.
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/shop" className="btn btn-ghost" style={{ borderBottom: '1px solid var(--ink)', borderRadius: 0, paddingBottom: 4, padding: '4px 0' }}>
            View all <ArrowIcon size={14} />
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="bestseller-grid">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} style={cardStyle} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ product, style = 'standard', index = 0, dense = false }) {
  const { navigate } = useRouter();
  const [hovered, setHovered] = useState(false);

  if (style === 'minimal') {
    return (
      <div className="reveal" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{
          aspectRatio: '4/5', background: 'var(--cream-2)',
          borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          transition: 'background .3s var(--ease)',
        }}>
          <image-slot
            id={`pcard-${product.id}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            shape="rounded" radius="10"
            placeholder={`${product.name}`}
          ></image-slot>
          <div style={{ position: 'relative', zIndex: 1, opacity: 0.85 }}>
            <ProductGlyph type={product.type} size={180} color={product.swatches[0]} />
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 className="serif" style={{ fontSize: 17, margin: 0, fontWeight: 500 }}>{product.name}</h3>
          <span style={{ fontSize: 15 }}>${product.price}</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '4px 0 0' }}>{product.sub}</p>
      </div>
    );
  }

  if (style === 'editorial') {
    return (
      <div className="reveal" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer', position: 'relative' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <p className="eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>
          {String(index + 1).padStart(2, '0')} · {product.collection}
        </p>
        <div style={{
          aspectRatio: '1/1.15', background: 'var(--cream-2)', borderRadius: 'var(--r-md)',
          overflow: 'hidden', position: 'relative',
          transition: 'transform .5s var(--ease-out)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}>
          <image-slot id={`ed-${product.id}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rounded" radius="14" placeholder=""></image-slot>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProductGlyph type={product.type} size={200} color={product.swatches[0]} />
          </div>
          {product.tag && (
            <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--cream)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
              {product.tag}
            </div>
          )}
        </div>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <h3 className="display" style={{ fontSize: 24, margin: 0, fontWeight: 400 }}>{product.name}</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '4px 0 0', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              {product.blurb}
            </p>
          </div>
          <span className="serif" style={{ fontSize: 22 }}>${product.price}</span>
        </div>
      </div>
    );
  }

  // STANDARD — premium product card
  return (
    <div className="reveal"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--cream)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .5s var(--ease-out), box-shadow .5s var(--ease-out)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        border: '1px solid var(--line-soft)',
      }}>
      <div style={{
        aspectRatio: '1/1', background: 'var(--cream-2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <image-slot id={`pcard-std-${product.id}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rect" placeholder=""></image-slot>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.95 }}>
          <ProductGlyph type={product.type} size={dense ? 140 : 220} color={product.swatches[0]} />
        </div>

        {product.tag && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'var(--ink)', color: 'var(--cream)',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '6px 12px', borderRadius: 'var(--r-pill)',
          }}>
            {product.tag}
          </div>
        )}

        <button onClick={(e) => { e.stopPropagation(); }} className="heart-btn" style={{
          position: 'absolute', top: 14, right: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--cream)', border: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink)', boxShadow: 'var(--shadow-sm)',
        }} aria-label="Save">
          <HeartIcon size={16} />
        </button>

        {/* Quick add */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          transform: hovered ? 'translateY(0)' : 'translateY(60px)',
          opacity: hovered ? 1 : 0,
          transition: 'transform .4s var(--ease-out), opacity .3s var(--ease)',
        }}>
          <button onClick={(e) => { e.stopPropagation(); }} className="btn" style={{
            background: 'var(--ink)', color: 'var(--cream)', width: '100%', justifyContent: 'center',
          }}>
            Quick add · ${product.price}
          </button>
        </div>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <h3 className="serif" style={{ fontSize: 17, margin: 0, fontWeight: 500 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {product.msrp && product.msrp > product.price && (
              <span style={{ fontSize: 13, color: 'var(--muted-soft)', textDecoration: 'line-through' }}>${product.msrp}</span>
            )}
            <span style={{ fontSize: 16, fontWeight: 600 }}>${product.price}</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '4px 0 12px' }}>{product.sub}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Swatches */}
          <div style={{ display: 'flex', gap: 4 }}>
            {product.swatches.slice(0, 5).map((c, i) => (
              <span key={i} className="swatch" style={{
                width: 14, height: 14, borderRadius: '50%',
                background: c,
                border: '1px solid var(--line)',
                boxShadow: 'inset 0 0 0 1.5px var(--cream)',
                display: 'inline-block',
              }} />
            ))}
          </div>
          {/* Rating */}
          <div className="star-row" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brass)', fontSize: 11 }}>
            <StarIcon size={11} />
            <span style={{ color: 'var(--muted)' }}>{product.rating} ({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Customizer teaser ──────────────────────────────────
function HomeCustomizerTeaser() {
  const { navigate } = useRouter();
  const [text, setText] = useState('Imani');
  const [font, setFont] = useState(window.DONNA.engravingFonts[1]);

  return (
    <Section bg="var(--ink)" padding="140px 0" style={{ color: 'var(--cream)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="customizer-grid">
        <div className="reveal">
          <Eyebrow style={{ color: 'var(--brass-light)' }}>The Customizer</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', margin: '20px 0 24px', fontWeight: 400 }}>
            Type a name. <em style={{ fontStyle: 'italic', color: 'var(--clay)' }}>See it engraved</em> in real time.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.7, maxWidth: 460, lineHeight: 1.6 }}>
            Every personalized product on Donna&rsquo;s shows you a live preview the moment you type. Try five fonts, three placements, monograms, full names, dates — see exactly what arrives.
          </p>

          {/* Input + font picker */}
          <div style={{ marginTop: 36, maxWidth: 460 }}>
            <label className="field-label" style={{ color: 'rgba(255,255,255,0.55)' }}>Try it →</label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={20}
              className="field"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--cream)',
                borderColor: 'rgba(255,255,255,0.15)',
                fontSize: 22,
                fontFamily: font.css,
                fontStyle: font.italic ? 'italic' : 'normal',
              }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {window.DONNA.engravingFonts.map((f) => (
                <button key={f.id} onClick={() => setFont(f)} style={{
                  padding: '8px 14px', borderRadius: 'var(--r-pill)',
                  fontSize: 13,
                  background: f.id === font.id ? 'var(--cream)' : 'transparent',
                  color: f.id === font.id ? 'var(--ink)' : 'var(--cream)',
                  border: '1px solid ' + (f.id === font.id ? 'var(--cream)' : 'rgba(255,255,255,0.2)'),
                  cursor: 'pointer',
                  fontFamily: f.css,
                  fontStyle: f.italic ? 'italic' : 'normal',
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/product/p-skinny-tumbler')} className="btn" style={{ marginTop: 36, background: 'var(--cream)', color: 'var(--ink)' }}>
            Try on a product <ArrowIcon size={14} />
          </button>
        </div>

        <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
          {/* Big tumbler with engraving */}
          <div style={{
            aspectRatio: '1/1',
            background: 'radial-gradient(ellipse at center, rgba(212, 145, 121, 0.18) 0%, transparent 70%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 480 }}>
              <defs>
                <linearGradient id="tumbler-shine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3a2a21" />
                  <stop offset="20%" stopColor="#5a3a30" />
                  <stop offset="50%" stopColor="#8b5a48" />
                  <stop offset="80%" stopColor="#5a3a30" />
                  <stop offset="100%" stopColor="#3a2a21" />
                </linearGradient>
              </defs>
              {/* Body */}
              <path d="M 140 60 L 260 60 L 270 100 L 280 360 Q 200 380 120 360 L 130 100 Z" fill="url(#tumbler-shine)" />
              {/* Top rim */}
              <ellipse cx="200" cy="62" rx="60" ry="8" fill="#1f1410" />
              <ellipse cx="200" cy="60" rx="60" ry="8" fill="#3a2a21" />
              {/* Engraving */}
              <text x="200" y="220" textAnchor="middle"
                style={{
                  fontFamily: font.css,
                  fontSize: font.monogram ? 110 : (text.length > 8 ? 36 : 56),
                  fontStyle: font.italic ? 'italic' : 'normal',
                  fontWeight: font.weight,
                  letterSpacing: font.caps ? '0.1em' : '0',
                  fill: 'rgba(255, 220, 180, 0.8)',
                }}
              >
                {font.monogram
                  ? (text.charAt(0) || 'D').toUpperCase()
                  : (font.caps ? text.toUpperCase() : text)}
              </text>
              {/* Subtle engraving date */}
              <text x="200" y="270" textAnchor="middle" style={{
                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.2em', fill: 'rgba(255, 220, 180, 0.5)',
              }}>EST. {new Date().getFullYear()}</text>
            </svg>
          </div>
          {/* Spec tag */}
          <div style={{
            position: 'absolute', top: 30, right: 0,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            padding: '12px 16px', borderRadius: 'var(--r-sm)',
            fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em',
            textAlign: 'right',
          }}>
            <div style={{ color: 'var(--clay)', fontWeight: 600, marginBottom: 4 }}>LIVE PREVIEW</div>
            <div>20OZ · POWDER COAT</div>
            <div>ENGRAVING: {font.label.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── In Their Hands — lifestyle grid ──────────────────────
function HomeInTheirHands() {
  return (
    <Section padding="140px 0 60px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }} className="reveal">
        <div>
          <Eyebrow>@donnaandco</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', margin: '12px 0 0', fontWeight: 400, maxWidth: 720 }}>
            In their <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>hands.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginTop: 14, maxWidth: 540 }}>
            Customers carrying Donna pieces into the world — hiking, gathering, driving, gifting. Tag <strong>@donnaandco</strong> to be featured.
          </p>
        </div>
        <a href="#" style={{ color: 'var(--ink)', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}>
          Follow on Instagram <ArrowIcon size={14} />
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="lifestyle-grid">
        {window.DONNA.lifestyleScenes.map((s, i) => (
          <LifestyleCard key={s.id} scene={s} index={i} />
        ))}
      </div>
    </Section>
  );
}

function LifestyleCard({ scene, index }) {
  const [hovered, setHovered] = useState(false);
  const sources = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80',
    'https://images.unsplash.com/photo-1564506096011-c69d2ecf64bc?w=600&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    'https://images.unsplash.com/photo-1612215047504-a09f7c1d36e8?w=600&q=80',
    'https://images.unsplash.com/photo-1591290619762-c5dac3a8347a?w=600&q=80',
  ];
  return (
    <div className="reveal" style={{ position: 'relative', borderRadius: 'var(--r-sm)', overflow: 'hidden', aspectRatio: '4/5', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <image-slot id={scene.id} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rect" placeholder={scene.caption} src={sources[index % sources.length]}></image-slot>
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'linear-gradient(180deg, transparent 40%, rgba(31,20,16,0.85) 100%)' : 'linear-gradient(180deg, transparent 60%, rgba(31,20,16,0.4) 100%)',
        transition: 'all .4s var(--ease)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 16, color: 'var(--cream)',
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', alignSelf: 'flex-start', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: 4 }}>
          {scene.tag}
        </span>
        <p style={{ margin: 0, fontSize: 13, fontFamily: 'var(--font-display)', fontStyle: 'italic', lineHeight: 1.3, opacity: hovered ? 1 : 0.8, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all .4s var(--ease)' }}>
          {scene.caption}
        </p>
      </div>
    </div>
  );
}

// ── Testimonials ────────────────────────────────────────
function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const total = window.DONNA.testimonials.length;
  const t = window.DONNA.testimonials[active];

  return (
    <Section bg="var(--cream-2)" padding="140px 0">
      <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 60, alignItems: 'center' }} className="testi-grid">
        <div className="reveal">
          <Eyebrow>The reviews</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', margin: '20px 0', fontWeight: 400, lineHeight: 1 }}>
            <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>1,840+&nbsp;</em>
            <br />five-star letters.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brass)' }}>
            {[1,2,3,4,5].map((i) => <StarIcon key={i} size={20} />)}
            <span style={{ color: 'var(--muted)', fontSize: 14, marginLeft: 8 }}>4.96 average</span>
          </div>
        </div>

        <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
          <div style={{
            background: 'var(--cream)',
            padding: '48px 56px',
            borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--line-soft)',
            position: 'relative',
            minHeight: 280,
          }}>
            <div style={{ position: 'absolute', top: 28, left: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 96, color: 'var(--terracotta)', opacity: 0.18, lineHeight: 0.8 }}>“</div>
            <blockquote key={active} className="page-enter" style={{ margin: 0, position: 'relative', zIndex: 1 }}>
              <p className="serif" style={{ fontSize: 'clamp(22px, 2.3vw, 30px)', lineHeight: 1.45, margin: 0, fontWeight: 400 }}>
                {t.quote}
              </p>
              <footer style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.role}</div>
                </div>
                <div style={{ display: 'flex', gap: 2, color: 'var(--brass)' }}>
                  {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} size={14} />)}
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`} style={{
                  width: i === active ? 28 : 8, height: 8,
                  borderRadius: 4,
                  background: i === active ? 'var(--ink)' : 'var(--cream-3)',
                  border: 0, cursor: 'pointer',
                  transition: 'all .3s var(--ease)',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setActive((a) => (a - 1 + total) % total)} className="btn btn-ghost" style={{ padding: '10px 14px', border: '1px solid var(--line)' }} aria-label="Previous">
                <ArrowIcon dir="left" size={14} />
              </button>
              <button onClick={() => setActive((a) => (a + 1) % total)} className="btn btn-ghost" style={{ padding: '10px 14px', border: '1px solid var(--line)' }} aria-label="Next">
                <ArrowIcon dir="right" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Custom CTA ──────────────────────────────────────────
function HomeCustomCTA() {
  const { navigate } = useRouter();
  return (
    <Section padding="120px 0 40px">
      <div className="reveal" style={{
        background: 'var(--terracotta)',
        color: 'var(--cream)',
        borderRadius: 'var(--r-xl)',
        padding: 'clamp(48px, 6vw, 96px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', right: -120, top: -80,
          fontSize: 'clamp(280px, 36vw, 480px)',
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          color: 'rgba(255,255,255,0.08)', lineHeight: 0.8,
          pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        }}>custom</div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <Eyebrow style={{ color: 'var(--blush)' }}>By commission</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 88px)', margin: '20px 0 24px', fontWeight: 400 }}>
            Have something <em style={{ fontStyle: 'italic' }}>specific</em> in mind?
          </h2>
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.6, maxWidth: 540 }}>
            From custom wedding sets to a single one-off piece — send a brief, get a quote within 24 hours, and a digital proof before I touch the laser.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/custom')} className="btn" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
              Start a custom request <ArrowIcon size={14} />
            </button>
            <button onClick={() => navigate('/contact')} className="btn" style={{ background: 'transparent', color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.4)' }}>
              Talk to Donna directly
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  HomePage, ProductCard,
});
