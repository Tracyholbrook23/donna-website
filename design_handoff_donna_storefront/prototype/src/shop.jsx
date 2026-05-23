// ─────────────────────────────────────────────
// Donna's — Shop page (grid + filters) + Product Detail (live engraving)
// ─────────────────────────────────────────────

function ShopPage() {
  window.useReveal();
  const [activeCollection, setActiveCollection] = useState('all');
  const [sort, setSort] = useState('featured');
  const [price, setPrice] = useState([0, 200]);
  const [filterPersonalize, setFilterPersonalize] = useState(false);
  const [filterMaterial, setFilterMaterial] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Read collection from hash on mount
  useEffect(() => {
    const m = window.location.hash.match(/^#\/shop#(.+)/);
    if (m) setActiveCollection(m[1]);
  }, []);

  const collections = [{ id: 'all', name: 'Everything', count: window.DONNA.products.length }, ...window.DONNA.collections];

  let items = window.DONNA.products;
  if (activeCollection !== 'all') items = items.filter((p) => p.collection === activeCollection);
  items = items.filter((p) => p.price >= price[0] && p.price <= price[1]);
  if (sort === 'price-low') items = [...items].sort((a,b) => a.price - b.price);
  if (sort === 'price-high') items = [...items].sort((a,b) => b.price - a.price);
  if (sort === 'rating') items = [...items].sort((a,b) => b.rating - a.rating);

  // Duplicate items for a fuller-feeling grid (since data is small)
  while (items.length < 12 && activeCollection === 'all') {
    items = [...items, ...window.DONNA.products.slice(0, 12 - items.length).map((p, i) => ({ ...p, id: p.id + '-d' + i }))];
  }

  return (
    <main className="page-enter">
      {/* Header */}
      <Section padding="80px 0 24px">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <Eyebrow>The shop</Eyebrow>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '12px 0 0', fontWeight: 400 }}>
              {collections.find((c) => c.id === activeCollection)?.name || 'Everything'}
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 16, maxWidth: 560 }}>
              {activeCollection === 'all'
                ? 'Every piece in the studio, ready to engrave. Hover for the quick add — click for the full story.'
                : window.DONNA.collections.find((c) => c.id === activeCollection)?.kicker || ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{items.length} pieces</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="field" style={{ padding: '10px 36px 10px 14px', fontSize: 13, width: 'auto', backgroundColor: 'var(--cream)', border: '1px solid var(--line)' }}>
              <option value="featured">Featured</option>
              <option value="rating">Most loved</option>
              <option value="price-low">Price · low to high</option>
              <option value="price-high">Price · high to low</option>
            </select>
          </div>
        </div>

        {/* Collection tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 36, overflowX: 'auto', paddingBottom: 4 }}>
          {collections.map((c) => (
            <button key={c.id} onClick={() => setActiveCollection(c.id)} className={'chip-hover' + (c.id === activeCollection ? ' is-active' : '')} style={{
              padding: '10px 18px',
              borderRadius: 'var(--r-pill)',
              border: '1px solid ' + (c.id === activeCollection ? 'var(--ink)' : 'var(--line)'),
              background: c.id === activeCollection ? 'var(--ink)' : 'transparent',
              color: c.id === activeCollection ? 'var(--cream)' : 'var(--ink)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              {c.name}
              <span style={{ fontSize: 11, opacity: 0.55 }}>{c.count}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Body: sidebar + grid */}
      <Section padding="40px 0 80px">
        <div style={{ display: 'grid', gridTemplateColumns: filtersOpen ? '260px 1fr' : '1fr', gap: 48, alignItems: 'start' }} className="shop-grid">
          {filtersOpen && (
            <aside style={{ position: 'sticky', top: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 className="serif" style={{ fontSize: 18, margin: 0 }}>Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} aria-label="Close filters">✕</button>
              </div>

              <FilterGroup label="Price">
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>${price[0]} — ${price[1]}+</div>
                <input type="range" min="0" max="200" step="5" value={price[1]} onChange={(e) => setPrice([0, parseInt(e.target.value)])}
                  style={{ width: '100%', accentColor: 'var(--terracotta)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                  <span>$0</span><span>$200+</span>
                </div>
              </FilterGroup>

              <FilterGroup label="Personalization">
                <label style={checkRow}>
                  <input type="checkbox" checked={filterPersonalize} onChange={(e) => setFilterPersonalize(e.target.checked)} />
                  Engraving included
                </label>
                <label style={checkRow}><input type="checkbox" /> Available for monogram</label>
                <label style={checkRow}><input type="checkbox" /> Custom commission only</label>
              </FilterGroup>

              <FilterGroup label="Material">
                {['Walnut', 'Oak', 'Acacia', 'Leather', 'Steel', 'Crystal'].map((m) => (
                  <label key={m} style={checkRow}>
                    <input type="checkbox" checked={filterMaterial.includes(m)} onChange={(e) => {
                      setFilterMaterial((v) => e.target.checked ? [...v, m] : v.filter((x) => x !== m));
                    }} />
                    {m}
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup label="Occasion">
                {['Wedding', 'Anniversary', 'Birthday', 'Graduation', 'Housewarming', 'Father\'s Day', 'Corporate'].map((m) => (
                  <label key={m} style={checkRow}>
                    <input type="checkbox" /> {m}
                  </label>
                ))}
              </FilterGroup>

              <FilterGroup label="Color">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {['#1F1410','#B9533A','#E8E0D2','#3D5848','#C8985A','#7A4524','#3E2517','#A5754B'].map((c) => (
                    <button key={c} style={{
                      width: 26, height: 26, borderRadius: '50%', background: c,
                      border: '1.5px solid var(--cream)',
                      boxShadow: '0 0 0 1.5px var(--line)',
                      cursor: 'pointer',
                    }} aria-label={c} />
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Lead time">
                <label style={checkRow}><input type="radio" name="lead" defaultChecked /> Ready in 3–5 days</label>
                <label style={checkRow}><input type="radio" name="lead" /> Up to 2 weeks</label>
                <label style={checkRow}><input type="radio" name="lead" /> Custom commission</label>
              </FilterGroup>

              <button onClick={() => { setActiveCollection('all'); setPrice([0, 200]); setFilterMaterial([]); setFilterPersonalize(false); }} className="btn btn-ghost" style={{ marginTop: 12, fontSize: 12, padding: '8px 0' }}>
                Reset all filters
              </button>
            </aside>
          )}

          <div>
            {!filtersOpen && (
              <button onClick={() => setFiltersOpen(true)} className="btn btn-secondary" style={{ marginBottom: 24 }}>
                Show filters
              </button>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="shop-product-grid">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
              <button className="btn btn-secondary">Load more pieces</button>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured commission band */}
      <Section padding="40px 0 80px">
        <div style={{
          background: 'var(--cream-2)', borderRadius: 'var(--r-xl)',
          padding: 'clamp(40px, 5vw, 64px)',
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center',
        }} className="reveal commission-band">
          <div>
            <Eyebrow style={{ color: 'var(--terracotta)' }}>Can't find it?</Eyebrow>
            <h3 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '14px 0', fontWeight: 400 }}>
              Commission a one-off, exactly as you imagine it.
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 540, lineHeight: 1.6 }}>
              Family crests, custom logos, hand-drawn sketches, full-bleed family-tree boards — if you can describe it, we can make it. Quotes within 24 hours.
            </p>
            <Link to="/custom" className="btn btn-primary" style={{ marginTop: 28 }}>Start a request <ArrowIcon size={14} /></Link>
          </div>
          <div style={{ position: 'relative' }}>
            <image-slot id="shop-commission" style={{ width: '100%', aspectRatio: '4/3', display: 'block' }} shape="rounded" radius="16" placeholder="Custom commission · family tree board" src="https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=700&q=80"></image-slot>
          </div>
        </div>
      </Section>
    </main>
  );
}

const checkRow = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '8px 0', fontSize: 14, color: 'var(--ink-soft)', cursor: 'pointer',
};

function FilterGroup({ label, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderTop: '1px solid var(--line)', padding: '20px 0' }}>
      <button onClick={() => setOpen((v) => !v)} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
        background: 'none', border: 0, padding: 0, cursor: 'pointer',
        color: 'var(--ink)', marginBottom: open ? 14 : 0,
      }}>
        <span className="eyebrow" style={{ color: 'var(--ink)' }}>{label}</span>
        <span style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .25s var(--ease)', fontSize: 18, lineHeight: 1 }}>+</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// PRODUCT DETAIL
// ─────────────────────────────────────────────
function ProductPage({ productId }) {
  window.useReveal();
  const product = window.DONNA.products.find((p) => p.id === productId) || window.DONNA.products[0];
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('story');
  const { add } = useCart();

  // Engraving state
  const [engraveOn, setEngraveOn] = useState(true);
  const [engText, setEngText] = useState('');
  const [engFont, setEngFont] = useState(window.DONNA.engravingFonts[1]);
  const [engPlacement, setEngPlacement] = useState('front-center');
  const [engStyle, setEngStyle] = useState(window.DONNA.engravingStyles[0]);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({ product, variant: product.swatches[variant], engraving: engraveOn ? { text: engText, font: engFont.id, placement: engPlacement, style: engStyle.id } : null, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const related = window.DONNA.products.filter((p) => p.id !== product.id).slice(0, 4);
  const placements = [
    { id: 'front-center', label: 'Front, centered' },
    { id: 'front-bottom', label: 'Front, bottom' },
    { id: 'side',         label: 'Side wrap' },
    { id: 'underneath',   label: 'Underneath (boards)' },
  ];

  return (
    <main className="page-enter">
      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: 32, fontSize: 12, color: 'var(--muted)' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link to={`/shop#${product.collection}`} style={{ color: 'inherit', textTransform: 'capitalize' }}>{product.collection}</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>

      {/* Hero — gallery + buybox */}
      <Section padding="32px 0 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }} className="pdp-grid">
          {/* Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[0,1,2,3].map((i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{
                  width: 80, height: 80, borderRadius: 'var(--r-sm)',
                  border: '1.5px solid ' + (activeImg === i ? 'var(--ink)' : 'var(--line)'),
                  padding: 6, background: 'var(--cream-2)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <ProductGlyph type={product.type} size={56} color={product.swatches[variant] || product.swatches[0]} engraving={engraveOn && engText ? { text: engText, fontCss: engFont.css, italic: engFont.italic, weight: engFont.weight, caps: engFont.caps, size: 8 } : null} />
                </button>
              ))}
            </div>
            <div style={{
              aspectRatio: '4/5',
              background: 'var(--cream-2)',
              borderRadius: 'var(--r-md)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Behind: real image slot */}
              <image-slot id={`pdp-${product.id}-${activeImg}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rounded" radius="16" placeholder={`${product.name} — ${['front', 'side', 'lifestyle', 'detail'][activeImg]} view`}></image-slot>

              {/* In front: large glyph with live engraving */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <ProductGlyph
                  type={product.type}
                  size={420}
                  color={product.swatches[variant] || product.swatches[0]}
                  engraving={engraveOn && engText ? {
                    text: engText, fontCss: engFont.css, italic: engFont.italic,
                    weight: engFont.weight, caps: engFont.caps,
                    size: engFont.monogram ? 32 : (engText.length > 10 ? 12 : 18),
                  } : null}
                />
              </div>

              {/* Live preview chip */}
              {engraveOn && engText && (
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'rgba(31,20,16,0.8)', color: 'var(--cream)',
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '6px 12px', borderRadius: 'var(--r-pill)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta-soft)', color: 'var(--terracotta-soft)' }} />
                  Live preview
                </div>
              )}

              {/* Zoom button */}
              <button style={{
                position: 'absolute', bottom: 16, right: 16,
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--cream)', border: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }} aria-label="Zoom">
                <SearchIcon size={16} />
              </button>
            </div>
          </div>

          {/* Buybox */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {product.tag && (
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--brass)', color: 'var(--ink)', padding: '4px 10px', borderRadius: 'var(--r-pill)' }}>{product.tag}</span>
              )}
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                <span style={{ color: 'var(--brass)' }}><StarIcon size={12} /></span> {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '20px 0 8px', fontWeight: 400, lineHeight: 1 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', margin: 0 }}>{product.sub}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 24 }}>
              <span className="serif" style={{ fontSize: 32, fontWeight: 500 }}>${product.price}</span>
              {product.msrp && product.msrp > product.price && (
                <span style={{ fontSize: 16, color: 'var(--muted-soft)', textDecoration: 'line-through' }}>${product.msrp}</span>
              )}
              <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 'var(--r-pill)', background: 'rgba(61, 88, 72, 0.12)', color: 'var(--forest)', fontWeight: 600, letterSpacing: '0.04em' }}>
                Free shipping over $125
              </span>
            </div>

            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginTop: 24 }}>
              {product.blurb} Engraving is included — type below and watch the preview update as you go.
            </p>

            {/* Color/Variant */}
            <div style={{ marginTop: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="field-label" style={{ marginBottom: 0 }}>Color · {product.swatchNames[variant]}</span>
                <span style={{ fontSize: 11, color: 'var(--muted-soft)' }}>{product.swatches.length} options</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.swatches.map((c, i) => (
                  <button key={i} onClick={() => setVariant(i)} className={'swatch' + (i === variant ? ' is-active' : '')} style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: c,
                    border: '2px solid ' + (i === variant ? 'var(--ink)' : 'transparent'),
                    boxShadow: '0 0 0 1px var(--line) inset, 0 0 0 2px var(--cream) inset',
                    cursor: 'pointer', padding: 0,
                  }} aria-label={product.swatchNames[i]} title={product.swatchNames[i]} />
                ))}
              </div>
            </div>

            {/* MAKE IT YOURS — engraving */}
            <div style={{
              marginTop: 32,
              background: 'var(--cream-2)',
              borderRadius: 'var(--r-md)',
              padding: 24,
              border: '1px solid var(--line-soft)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <div>
                  <span className="eyebrow" style={{ color: 'var(--brass)' }}>Make it yours</span>
                  <h3 className="serif" style={{ fontSize: 20, margin: '6px 0 4px' }}>Personalize your engraving</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Included. Preview updates live.</p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer' }}>
                  <span style={{ color: 'var(--muted)' }}>Skip</span>
                  <button type="button" onClick={() => setEngraveOn((v) => !v)} style={{
                    width: 38, height: 22, borderRadius: 11,
                    background: engraveOn ? 'var(--ink)' : 'var(--cream-3)',
                    border: 0, cursor: 'pointer', padding: 0,
                    position: 'relative', transition: 'background .2s var(--ease)',
                  }}>
                    <span style={{
                      position: 'absolute', top: 2, left: engraveOn ? 18 : 2,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'var(--cream)', transition: 'left .25s var(--ease)',
                    }} />
                  </button>
                </label>
              </div>

              {engraveOn && (
                <div>
                  <input
                    value={engText}
                    onChange={(e) => setEngText(e.target.value)}
                    placeholder="Type a name, date, or phrase…"
                    maxLength={engFont.monogram ? 3 : 24}
                    className="field"
                    style={{
                      fontFamily: engFont.css,
                      fontStyle: engFont.italic ? 'italic' : 'normal',
                      fontWeight: engFont.weight,
                      fontSize: 20,
                      letterSpacing: engFont.caps ? '0.08em' : '0',
                      background: 'var(--cream)',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-soft)', marginTop: 4 }}>
                    <span>{engFont.monogram ? 'Up to 3 characters' : 'Up to 24 characters'}</span>
                    <span>{engText.length} / {engFont.monogram ? 3 : 24}</span>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <span className="field-label">Font</span>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {window.DONNA.engravingFonts.map((f) => (
                        <button key={f.id} onClick={() => setEngFont(f)} type="button" style={{
                          padding: '8px 14px', borderRadius: 'var(--r-pill)',
                          fontSize: 13, cursor: 'pointer',
                          background: f.id === engFont.id ? 'var(--ink)' : 'var(--cream)',
                          color: f.id === engFont.id ? 'var(--cream)' : 'var(--ink)',
                          border: '1px solid ' + (f.id === engFont.id ? 'var(--ink)' : 'var(--line)'),
                          fontFamily: f.css, fontStyle: f.italic ? 'italic' : 'normal',
                          fontWeight: f.weight,
                          letterSpacing: f.caps ? '0.06em' : '0',
                        }}>
                          {f.caps ? f.label.toUpperCase() : f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <span className="field-label">Placement</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {placements.map((p) => (
                        <button key={p.id} onClick={() => setEngPlacement(p.id)} type="button" style={{
                          padding: '10px 12px', borderRadius: 'var(--r-sm)',
                          fontSize: 12, cursor: 'pointer', textAlign: 'left',
                          background: engPlacement === p.id ? 'var(--ink)' : 'var(--cream)',
                          color: engPlacement === p.id ? 'var(--cream)' : 'var(--ink)',
                          border: '1px solid ' + (engPlacement === p.id ? 'var(--ink)' : 'var(--line)'),
                        }}>{p.label}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <span className="field-label">Engraving style</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {window.DONNA.engravingStyles.map((s) => (
                        <button key={s.id} onClick={() => setEngStyle(s)} type="button" style={{
                          flex: 1,
                          padding: '12px 10px', borderRadius: 'var(--r-sm)',
                          fontSize: 12, cursor: 'pointer', textAlign: 'left',
                          background: engStyle.id === s.id ? 'var(--ink)' : 'var(--cream)',
                          color: engStyle.id === s.id ? 'var(--cream)' : 'var(--ink)',
                          border: '1px solid ' + (engStyle.id === s.id ? 'var(--ink)' : 'var(--line)'),
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                          <div style={{ fontSize: 10, opacity: 0.7 }}>{s.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-display)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    Need something more complex? <Link to="/custom" style={{ color: 'var(--terracotta)', borderBottom: '1px solid currentColor' }}>Send a custom request</Link> with a sketch, logo, or family crest.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity + Add */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'stretch' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--ink)', borderRadius: 'var(--r-pill)',
                overflow: 'hidden',
              }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={qtyBtn}>−</button>
                <span style={{ minWidth: 36, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} style={qtyBtn}>+</button>
              </div>
              <button onClick={handleAdd} className="btn btn-primary" data-magnetic="50" style={{ flex: 1, justifyContent: 'center', padding: '16px 24px', fontSize: 14 }}>
                {added ? '✓ Added to cart' : `Add to cart · $${product.price * qty}`}
              </button>
              <button className="btn btn-ghost heart-btn" style={{ border: '1px solid var(--line)', padding: '14px 16px' }} aria-label="Save">
                <HeartIcon size={18} />
              </button>
            </div>

            {/* Ship/Returns row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              marginTop: 24, padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
            }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 20 }}>↗</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Ships in 3–5 days</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>USPS Priority · tracked</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 20 }}>✦</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Engraved by hand</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>By Donna or one of her two trained engravers</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 20 }}>⊕</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Gift-ready</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Kraft + twine + hand-written card</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 20 }}>♡</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Mistake-free promise</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Wrong spelling? I replace it free.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Story / Details tabs */}
      <Section padding="0 0 100px">
        <div style={{ borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--line)' }}>
            {[
              { id: 'story',   label: 'The story' },
              { id: 'specs',   label: 'Specs & care' },
              { id: 'shipping',label: 'Shipping & returns' },
              { id: 'reviews', label: `Reviews · ${product.reviews}` },
            ].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: '24px 0', marginRight: 40,
                background: 'none', border: 0, cursor: 'pointer',
                color: 'var(--ink)', fontSize: 14, fontWeight: 500,
                borderBottom: '2px solid ' + (activeTab === t.id ? 'var(--ink)' : 'transparent'),
                marginBottom: -1,
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{ padding: '48px 0' }}>
            {activeTab === 'story' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
                <div>
                  <p className="display-italic" style={{ fontSize: 28, lineHeight: 1.3, color: 'var(--terracotta)', margin: 0 }}>
                    “Made the way my grandmother gave gifts — wrapped in something you keep, with your name on it.”
                  </p>
                  <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7, marginTop: 32 }}>
                    The {product.name} started as a single piece for my best friend&rsquo;s birthday. She still uses it every morning. Now it&rsquo;s the studio&rsquo;s most-loved piece — engineered to hold ice for sixteen hours, balanced to drink from one-handed, and engraved deep enough to outlast the powder coat.
                  </p>
                  <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                    Type your name, your child&rsquo;s name, the date you got married, or just a word that means something to you. I engrave it on a Friday and ship it on a Monday.
                  </p>
                  <p className="display-italic" style={{ fontSize: 18, marginTop: 32 }}>— Donna</p>
                </div>
                <image-slot id={`story-${product.id}`} style={{ width: '100%', aspectRatio: '4/5' }} shape="rounded" radius="16" placeholder="Lifestyle photo — product in use" src="https://images.unsplash.com/photo-1500049242364-5f500807f6e0?w=700&q=80"></image-slot>
              </div>
            )}

            {activeTab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
                <div>
                  <h3 className="serif" style={{ fontSize: 22, marginTop: 0 }}>What you get</h3>
                  <dl style={{ margin: 0 }}>
                    {[
                      ['Material', 'Stainless steel, powder-coated'],
                      ['Capacity', '20 fl oz'],
                      ['Dimensions', '8.1" × 2.9" base'],
                      ['Weight', '11.8 oz'],
                      ['Lid', 'Spill-resistant slide top'],
                      ['Insulation', 'Double-wall vacuum'],
                      ['BPA', 'Free, lead-free'],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid var(--line-soft)' }}>
                        <dt style={{ color: 'var(--muted)', fontSize: 13 }}>{k}</dt>
                        <dd style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="serif" style={{ fontSize: 22, marginTop: 0 }}>Care</h3>
                  <ul style={{ paddingLeft: 18, color: 'var(--ink-soft)', lineHeight: 1.8, fontSize: 15 }}>
                    <li>Hand wash with warm soapy water</li>
                    <li>Dishwasher safe (top rack), but hand washing preserves engraving longest</li>
                    <li>Avoid abrasive scrubbers on the engraved area</li>
                    <li>Keeps drinks cold ~16 hrs, hot ~8 hrs</li>
                    <li>Engraving will not fade. Powder coat is wear-resistant but not indestructible — treat it like good leather.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{ maxWidth: 720 }}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  Personalized stock items ship in 3–5 business days via USPS Priority. Free US shipping on orders over $125. Every order is tracked. International shipping calculates at checkout — currently shipping to the US, Canada, UK, EU, and Australia.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  Personalized items can&rsquo;t be returned (they&rsquo;re made for you), but if I made a mistake or it arrives damaged, I make it right — no questions, no returns required.
                </p>
                <Link to="/policies" className="btn btn-secondary" style={{ marginTop: 16 }}>See full policies</Link>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 48 }}>
                  <div>
                    <div className="display" style={{ fontSize: 72, fontWeight: 400, lineHeight: 1 }}>{product.rating}</div>
                    <div style={{ display: 'flex', gap: 2, color: 'var(--brass)', marginTop: 8 }}>
                      {[1,2,3,4,5].map((i) => <StarIcon key={i} size={16} />)}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Based on {product.reviews} reviews</div>
                  </div>
                  <div>
                    {[5,4,3,2,1].map((stars) => (
                      <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
                        <span style={{ fontSize: 12, width: 12 }}>{stars}</span>
                        <StarIcon size={11} />
                        <div style={{ flex: 1, height: 6, background: 'var(--cream-3)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${stars === 5 ? 88 : stars === 4 ? 8 : stars === 3 ? 2 : 1}%`, background: 'var(--terracotta)' }} />
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--muted)', width: 32 }}>{stars === 5 ? 280 : stars === 4 ? 26 : stars === 3 ? 8 : 2}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  {window.DONNA.testimonials.map((t, i) => (
                    <div key={i} style={{ background: 'var(--cream-2)', borderRadius: 'var(--r-md)', padding: 28 }}>
                      <div style={{ display: 'flex', gap: 2, color: 'var(--brass)', marginBottom: 12 }}>
                        {[1,2,3,4,5].map((s) => <StarIcon key={s} size={12} />)}
                      </div>
                      <p className="serif" style={{ margin: 0, fontSize: 17, lineHeight: 1.5 }}>“{t.quote}”</p>
                      <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--ink)' }}>{t.name}</strong> · {t.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section padding="0 0 100px">
        <div className="reveal" style={{ marginBottom: 40 }}>
          <Eyebrow>You might also love</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '12px 0 0', fontWeight: 400 }}>More from the studio</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="related-grid">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} style="minimal" />)}
        </div>
      </Section>

      {/* Sticky add-to-cart for mobile */}
      <div className="mobile-only" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'var(--cream)', borderTop: '1px solid var(--line)',
        padding: '12px 20px',
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{product.name}</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>${product.price * qty}</div>
        </div>
        <button onClick={handleAdd} className="btn btn-primary" style={{ flexShrink: 0 }}>Add to cart</button>
      </div>
    </main>
  );
}

const qtyBtn = {
  background: 'none', border: 0, cursor: 'pointer',
  width: 44, height: 44, fontSize: 18, color: 'var(--ink)',
};

Object.assign(window, { ShopPage, ProductPage });
