// ─────────────────────────────────────────────
// Donna's — App entry: routes + tweaks + mount
// ─────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#B9533A", "#1F1410", "#FBF5EC", "#3D5848", "#B58A4F"],
  "heroVariant": "editorial",
  "cardStyle": "standard",
  "displayFont": "Fraunces",
  "bodyFont": "Inter"
}/*EDITMODE-END*/;

const PALETTES = {
  terracotta: { name: 'Terracotta · Cream · Forest',  swatch: ['#B9533A', '#1F1410', '#FBF5EC', '#3D5848', '#B58A4F'] },
  plum:       { name: 'Plum · Caramel · Ivory',       swatch: ['#7E3B5C', '#2B1A22', '#F8F1E8', '#A37449', '#C49164'] },
  forest:     { name: 'Forest · Bone · Brass',        swatch: ['#3D5848', '#1A2620', '#F4EFE3', '#B58A4F', '#D49179'] },
  mahogany:   { name: 'Mahogany · Honey · Bone',      swatch: ['#7A2E1F', '#2A1410', '#F2E7D5', '#D4A156', '#A05844'] },
};

function applyPalette(p) {
  const root = document.documentElement;
  const [primary, ink, cream, accent, brass] = p;
  root.style.setProperty('--terracotta', primary);
  root.style.setProperty('--ink', ink);
  root.style.setProperty('--ink-soft', adjustColor(ink, 20));
  root.style.setProperty('--cream', cream);
  root.style.setProperty('--cream-2', adjustColor(cream, -5));
  root.style.setProperty('--cream-3', adjustColor(cream, -10));
  root.style.setProperty('--forest', accent);
  root.style.setProperty('--brass', brass);
  root.style.setProperty('--brass-light', adjustColor(brass, 15));
  root.style.setProperty('--terracotta-deep', adjustColor(primary, -15));
  root.style.setProperty('--terracotta-soft', adjustColor(primary, 15));
  root.style.setProperty('--clay', adjustColor(primary, 25));
  root.style.setProperty('--blush', adjustColor(primary, 35));
}

function adjustColor(hex, percent) {
  // Lighten (+) or darken (-) a hex color by a percent (-100..100)
  const c = hex.replace('#', '');
  const num = parseInt(c, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + (percent * 255 / 100)));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + (percent * 255 / 100)));
  const b = Math.max(0, Math.min(255, (num & 0xff) + (percent * 255 / 100)));
  return '#' + [r,g,b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function applyFonts(displayFont, bodyFont) {
  document.documentElement.style.setProperty('--font-display', `'${displayFont}', Georgia, serif`);
  document.documentElement.style.setProperty('--font-body', `'${bodyFont}', system-ui, sans-serif`);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { route } = useRouter();

  useEffect(() => { applyPalette(t.palette); }, [t.palette]);
  useEffect(() => { applyFonts(t.displayFont, t.bodyFont); }, [t.displayFont, t.bodyFont]);

  let page;
  switch (route.name) {
    case 'shop':     page = <ShopPage />; break;
    case 'product':  page = <ProductPage productId={route.id} />; break;
    case 'custom':   page = <CustomPage />; break;
    case 'about':    page = <AboutPage />; break;
    case 'contact':  page = <ContactPage />; break;
    case 'policies': page = <PoliciesPage tab={route.tab} />; break;
    default:         page = <HomePage heroVariant={t.heroVariant} cardStyle={t.cardStyle} />;
  }

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <div key={route.name + (route.id || route.tab || '')} className="page-enter">
        {page}
      </div>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color palette" />
        <TweakColor
          label="Palette"
          value={t.palette}
          options={Object.values(PALETTES).map((p) => p.swatch)}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSection label="Homepage" />
        <TweakRadio
          label="Hero layout"
          value={t.heroVariant}
          options={['editorial', 'split', 'overlay']}
          onChange={(v) => setTweak('heroVariant', v)}
        />
        <TweakSelect
          label="Product card"
          value={t.cardStyle}
          options={['standard', 'editorial', 'minimal']}
          onChange={(v) => setTweak('cardStyle', v)}
        />
        <TweakSection label="Typography" />
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={['Fraunces', 'Cormorant Garamond', 'Playfair Display', 'DM Serif Display', 'Libre Caslon Text']}
          onChange={(v) => setTweak('displayFont', v)}
        />
        <TweakSelect
          label="Body font"
          value={t.bodyFont}
          options={['Inter', 'DM Sans', 'Manrope', 'Public Sans', 'Work Sans']}
          onChange={(v) => setTweak('bodyFont', v)}
        />
      </TweaksPanel>
    </>
  );
}

function Root() {
  return (
    <RouterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RouterProvider>
  );
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<Root />);
