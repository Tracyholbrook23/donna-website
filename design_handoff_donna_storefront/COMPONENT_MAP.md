# Component Map — Prototype → Next.js

How to translate the prototype into the existing `donna-website/` Next.js codebase.

The codebase already has:
- `app/page.tsx` — old homepage (replace)
- `app/layout.tsx` — root layout (extend)
- `app/globals.css` — global styles (replace contents with new tokens)
- `app/shop-test/page.tsx` — Wix integration proof (keep until shop is live, then delete)
- `lib/wixClient.ts` — Wix SDK client (extend with more modules)

---

## Recommended file structure

```
app/
├── layout.tsx                      ← Root layout: fonts, providers, AnnouncementBar, Nav, Footer
├── page.tsx                        ← Homepage (replaces existing)
├── globals.css                     ← All tokens + base styles
├── interactions.css                ← Micro-interaction styles (port from src/interactions.css)
├── providers.tsx                   ← CartProvider, theme context
│
├── shop/
│   ├── page.tsx                    ← Shop grid (server) + filters (client)
│   └── ShopFilters.tsx             ← Client component for filter sidebar
│
├── product/
│   └── [slug]/
│       ├── page.tsx                ← PDP server component (fetches product)
│       ├── BuyBox.tsx              ← Client component (variants, engraving, qty, add to cart)
│       ├── EngravingCustomizer.tsx ← Client component, live SVG preview
│       └── ProductTabs.tsx         ← Client component for tabs
│
├── custom/
│   ├── page.tsx                    ← Custom orders page
│   └── CustomWizard.tsx            ← 3-step form (client)
│
├── about/
│   └── page.tsx
│
├── contact/
│   ├── page.tsx
│   └── ContactForm.tsx
│
├── policies/
│   ├── layout.tsx                  ← Sidebar nav (server)
│   └── [slug]/
│       └── page.tsx                ← One policy or FAQ
│
└── api/
    ├── custom-inquiry/route.ts     ← POST: custom order brief → email
    ├── contact/route.ts            ← POST: contact form → email
    └── newsletter/route.ts         ← POST: newsletter signup

components/
├── nav/
│   ├── Nav.tsx
│   ├── AnnouncementBar.tsx
│   ├── MegaMenu.tsx
│   └── SearchOverlay.tsx
├── footer/
│   └── Footer.tsx
├── product/
│   ├── ProductCard.tsx             ← Reusable card (3 styles: standard/editorial/minimal)
│   └── ProductGlyph.tsx            ← SVG illustration as fallback when no photo
├── home/
│   ├── Hero.tsx
│   ├── MarqueeStrip.tsx
│   ├── Categories.tsx
│   ├── StudioStory.tsx
│   ├── Bestsellers.tsx
│   ├── CustomizerTeaser.tsx
│   ├── InTheirHands.tsx
│   ├── Testimonials.tsx
│   └── CustomCTA.tsx
├── ui/
│   ├── Button.tsx
│   ├── Eyebrow.tsx
│   ├── Section.tsx
│   ├── Reveal.tsx                  ← IntersectionObserver wrapper
│   ├── Stat.tsx                    ← With counter animation
│   ├── Icon.tsx                    ← All icons (Search, Cart, Account, Arrow, etc.)
│   ├── ImageSlot.tsx               ← next/image with Wix media URL helper + fallback gradient
│   ├── HeartButton.tsx
│   └── StarRow.tsx
└── interactions/
    └── useInteractions.tsx         ← Hook that sets up ripple/magnetic/tilt/counter

lib/
├── wixClient.ts                    ← Extend with: currentCart, redirects, members
├── wixHelpers.ts                   ← URL builder for Wix media, price formatter, etc.
└── cart.ts                         ← Local cart state (Zustand or Context) + Wix cart sync

data/
├── collections.ts                  ← Static collection metadata (slug → title, kicker)
├── faqs.ts                         ← FAQ content
├── policies.ts                     ← Policy content (or move to CMS)
└── engraving.ts                    ← Font definitions, placement options, style options
```

---

## Prototype → Production: file-by-file

| Prototype file | Production target | Notes |
|---|---|---|
| `src/tokens.css` | `app/globals.css` | Port all `:root` CSS variables. Add `@theme inline` for Tailwind v4. |
| `src/interactions.css` | `app/interactions.css` | Import in `globals.css` with `@import`. |
| `src/interactions.js` | `components/interactions/useInteractions.tsx` | Convert to a React hook called in root layout. Use `useEffect`. |
| `src/data.js` → `DONNA.collections` | `data/collections.ts` | Static config. |
| `src/data.js` → `DONNA.products` | (deleted) | Real products fetched from Wix. Use prototype data as seed when populating Wix. |
| `src/data.js` → `DONNA.testimonials` | Move to Wix Reviews or static `data/reviews.ts` | Wix has a Reviews app — consider. |
| `src/data.js` → `DONNA.faqs` | `data/faqs.ts` or CMS | Static fine. |
| `src/data.js` → `DONNA.lifestyleScenes` | `data/lifestyle.ts` | Hard-coded image URLs + captions. Move to a small CMS later. |
| `src/data.js` → `DONNA.engravingFonts/Styles` | `data/engraving.ts` | These define the customizer UI. |
| `src/data.js` → `DONNA.policies` | `data/policies.ts` or markdown files | Markdown in `content/policies/*.md` is clean. |
| `src/layout.jsx` → `RouterProvider` | (deleted) | Next.js App Router replaces this. Use `useRouter`, `usePathname`, `Link` from `next/link`. |
| `src/layout.jsx` → `CartProvider` | `lib/cart.ts` + `app/providers.tsx` | Zustand recommended. Sync writes to Wix `currentCart`. |
| `src/layout.jsx` → `Nav`, `AnnouncementBar`, `Wordmark` | `components/nav/*` | Nav must be a client component (scroll listener, mega menu state). |
| `src/layout.jsx` → `Footer` | `components/footer/Footer.tsx` | Mostly static — server component is fine. |
| `src/layout.jsx` → icons | `components/ui/Icon.tsx` | Or use `lucide-react`. |
| `src/layout.jsx` → `ProductGlyph` | `components/product/ProductGlyph.tsx` | Keep as SVG. Used as fallback when a product has no Wix photo. |
| `src/layout.jsx` → `useReveal` | `components/ui/Reveal.tsx` | Wrap children in a client component that adds `.visible` when in view. |
| `src/home.jsx` → `HomePage` | `app/page.tsx` | Server component shell + client section components. |
| `src/home.jsx` → `HomeHero` (editorial variant) | `components/home/Hero.tsx` | Drop the variant switch; build one. The `split`/`overlay` variants in the prototype are for designer exploration. |
| `src/home.jsx` → `HomeMarqueeStrip` | `components/home/MarqueeStrip.tsx` | Pure CSS, server component. |
| `src/home.jsx` → `HomeCategories`, `CategoryCard` | `components/home/Categories.tsx` | |
| `src/home.jsx` → `HomeStudioStory` | `components/home/StudioStory.tsx` | |
| `src/home.jsx` → `HomeBestsellers` | `components/home/Bestsellers.tsx` | Server component; fetches featured products from Wix. |
| `src/home.jsx` → `ProductCard` | `components/product/ProductCard.tsx` | Accept `product` (Wix shape) + `style` prop. |
| `src/home.jsx` → `HomeCustomizerTeaser` | `components/home/CustomizerTeaser.tsx` | Client (live preview). |
| `src/home.jsx` → `HomeInTheirHands`, `LifestyleCard` | `components/home/InTheirHands.tsx` | |
| `src/home.jsx` → `HomeTestimonials` | `components/home/Testimonials.tsx` | Client (carousel state). |
| `src/home.jsx` → `HomeCustomCTA` | `components/home/CustomCTA.tsx` | |
| `src/shop.jsx` → `ShopPage` | `app/shop/page.tsx` | Server component; fetch products. Client filter component below it. |
| `src/shop.jsx` → `FilterGroup`, sidebar | `app/shop/ShopFilters.tsx` | Client component. Filter Wix results in-memory or server-side via Wix query API. |
| `src/shop.jsx` → `ProductPage` | `app/product/[slug]/page.tsx` | Server component; `params.slug` → Wix `getProductBySlug`. |
| `src/shop.jsx` → buybox section | `app/product/[slug]/BuyBox.tsx` | Client component. Owns variant + engraving state + add-to-cart. |
| `src/shop.jsx` → engraving panel | `app/product/[slug]/EngravingCustomizer.tsx` | Client component. The SVG preview is a separate child. |
| `src/shop.jsx` → tabs | `app/product/[slug]/ProductTabs.tsx` | Client. |
| `src/extras.jsx` → `CustomPage` | `app/custom/page.tsx` | Mostly server; wizard is client. |
| `src/extras.jsx` → 3-step wizard | `app/custom/CustomWizard.tsx` | Client. Submit → `/api/custom-inquiry`. |
| `src/extras.jsx` → `AboutPage` | `app/about/page.tsx` | Server, static. |
| `src/extras.jsx` → `ContactPage` | `app/contact/page.tsx` + `app/contact/ContactForm.tsx` | Form is client. |
| `src/extras.jsx` → `PoliciesPage` | `app/policies/layout.tsx` + `app/policies/[slug]/page.tsx` | |
| `src/extras.jsx` → `FaqRow` | `components/ui/FaqRow.tsx` | Client (open/close state). |
| `src/app.jsx` → `App`, palette/font tweaks | (deleted) | Tweaks are a prototype-only tool. Production picks the terracotta palette + Fraunces/Inter and ships it. |
| `tweaks-panel.jsx` | (deleted) | Not for production. |
| `image-slot.js` | `components/ui/ImageSlot.tsx` | Replace web component with React. Renders `next/image` with Wix media URL → fallback to product glyph + gradient when missing. |

---

## State management

The prototype uses React Context. For production:

- **Cart:** Zustand store (`lib/cart.ts`). Mirrors Wix `currentCart`. Mutations call Wix `currentCart.addToCart` etc., then update local store on success.
- **Search:** Local React state in `SearchOverlay`.
- **Nav scroll state:** Local state in `Nav` component.
- **Engraving customizer state:** Local state in `BuyBox` — flushes into the cart payload on add-to-cart.
- **Form wizards:** Local state. `react-hook-form` recommended for the custom-inquiry form.

---

## Routing

Next.js App Router replaces the prototype's hash-based router. All `<Link to="/foo">` becomes `<Link href="/foo">` from `next/link`.

| Prototype | Next.js |
|---|---|
| `#/` | `/` |
| `#/shop` | `/shop` |
| `#/shop#tumblers` | `/shop?collection=tumblers` (use search param) |
| `#/product/p-skinny-tumbler` | `/product/skinny-tumbler` (use Wix product slug) |
| `#/custom` | `/custom` |
| `#/about` | `/about` |
| `#/contact` | `/contact` |
| `#/policies/shipping` | `/policies/shipping` |

---

## Server vs client components

Default to **server components**. Promote to client only when you need:
- `useState`, `useEffect`, `useRef`
- Event handlers (`onClick`, `onChange`)
- Browser-only APIs (IntersectionObserver, window, document)

**Should be client:**
- `Nav` (scroll listener, mega menu, search overlay state)
- `BuyBox` + `EngravingCustomizer`
- `CustomWizard`
- `ContactForm`
- `Testimonials` carousel
- `FaqRow`
- `Reveal` wrapper

**Can be server:**
- Page shells (`app/*/page.tsx`)
- `Footer`, `AnnouncementBar` (pure CSS animation, no JS)
- `ProductCard` (if `onClick` becomes a `<Link>` instead)
- `Hero`, `Categories`, `Marquee`, `CustomCTA` (all static content)

---

## Image handling

Replace the prototype's `<image-slot>` web component with:

```tsx
// components/ui/ImageSlot.tsx
import Image from 'next/image';
import { wixMediaUrl } from '@/lib/wixHelpers';

type Props = {
  src?: string;          // Wix media URL or raw URL
  alt: string;
  aspectRatio?: string;  // '4/5', '1/1', etc.
  fallbackGlyph?: 'tumbler' | 'board' | ...;
  fallbackColor?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ImageSlot({ src, alt, aspectRatio = '1/1', fallbackGlyph, fallbackColor, className, sizes, priority }: Props) {
  if (src) {
    return (
      <div className={className} style={{ aspectRatio, position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }}>
        <Image src={wixMediaUrl(src)} alt={alt} fill sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'} priority={priority} style={{ objectFit: 'cover' }} />
      </div>
    );
  }
  // Fallback to gradient + glyph
  return (
    <div className={className} style={{ aspectRatio, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {fallbackGlyph && <ProductGlyph type={fallbackGlyph} color={fallbackColor} />}
    </div>
  );
}
```

Add a `next.config.ts` remotePatterns entry for `static.wixstatic.com`.
