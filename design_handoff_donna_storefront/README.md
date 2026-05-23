# Handoff: Donna &amp; Co. Storefront

A complete, premium custom storefront design for **Donna's** — a Black woman-owned engraving and personalized gift business — designed to be implemented on the existing **Next.js + Wix Headless** codebase at `donna-website/`.

---

## 0. About these files

This bundle contains a **high-fidelity HTML/React prototype** of the full storefront experience. The prototype was built in HTML + React (loaded via Babel) for rapid iteration and review.

**These files are design references, not production code.** Your job is to **recreate this design** in the existing Next.js codebase using its established patterns (App Router, Server Components where possible, Tailwind, the Wix Headless SDK that's already wired up).

The prototype shows:
- Exact visual design (colors, typography, spacing, layout)
- Component structure and naming
- Interaction patterns (hover states, transitions, the live engraving customizer)
- Copy and content tone
- Responsive behavior

The prototype does **not** define:
- Server/client component boundaries (you'll decide)
- Real data fetching from Wix (you'll wire this up — patterns in `WIX_INTEGRATION.md`)
- Form submission backends (logged today; needs API routes)
- Auth/cart persistence (Wix Members SDK; out of scope for this handoff)

---

## 1. Fidelity

**High-fidelity.** The design is pixel-final on:
- Color palette
- Typography (Fraunces + Inter)
- Spacing, radii, shadows
- Layout structure
- Copy and tone

Implement the visual design closely. The Tailwind setup in the codebase (Tailwind v4) is fine — translate the CSS tokens in `src/tokens.css` into `@theme inline` custom properties in `app/globals.css`.

---

## 2. What's in this bundle

```
design_handoff_donna_storefront/
├── README.md                  ← you are here
├── DESIGN_TOKENS.md           ← colors, fonts, spacing, motion
├── PAGE_SPECS.md              ← detailed spec for each of 7 pages
├── COMPONENT_MAP.md           ← prototype → Next.js file mapping
├── WIX_INTEGRATION.md         ← wiring real products from Wix
├── PRODUCT_DATA_GUIDE.md      ← how Donna adds her real products
└── prototype/                 ← the working HTML prototype
    ├── Donnas Site.html       ← open in browser to see the design
    ├── image-slot.js
    ├── tweaks-panel.jsx
    └── src/
        ├── tokens.css         ← all design tokens (copy into globals.css)
        ├── data.js            ← placeholder content (collections, FAQs, etc.)
        ├── layout.jsx         ← Nav, Footer, Router, shared components
        ├── home.jsx           ← Homepage sections
        ├── shop.jsx           ← Shop + Product Detail
        ├── extras.jsx         ← Custom Orders, About, Contact, Policies
        └── app.jsx            ← App shell + Tweaks panel
```

---

## 3. What you're building

A 7-page premium ecommerce storefront on top of Wix Headless:

| Page | Route | Wix data dependency |
|---|---|---|
| Homepage | `/` | Featured products (Wix), collections (Wix), reviews (static for now) |
| Shop | `/shop`, `/shop?collection=tumblers` | Products + collections (Wix), filtering (client-side over Wix results) |
| Product Detail | `/product/[slug]` | Product (Wix), variants (Wix), engraving customizer (custom UI, stored in cart line item `customFields`) |
| Custom Orders | `/custom` | Form posts to API route → email/CRM (not Wix) |
| About | `/about` | Static |
| Contact | `/contact` | Form posts to API route |
| Policies | `/policies/[slug]` | Static markdown or CMS |

Plus shared:
- Sticky nav with mega menu, search overlay, cart indicator
- Footer with newsletter, columns, big-italic monogram background
- Announcement marquee
- Image-slot fallbacks for any product image not yet uploaded to Wix

---

## 4. Critical features to preserve

These are the things that make this design feel like **Donna's** and not a Wix template. Don't lose them:

1. **Live engraving preview on the PDP** — typing in the engraving field updates the SVG preview in real time, with 5 font choices, 4 placements, 3 engraving styles. The chosen engraving must persist as `customFields` on the cart line item so Wix's order export carries it through to fulfillment.

2. **Editorial homepage hero** — asymmetric grid with floating "engraving now" status card and animated black-owned circular badge. Three variants exposed (editorial / split / overlay) — implement editorial as default.

3. **Custom orders are everywhere** — persistent in nav, lives on every PDP ("Need something more complex? Send a custom request"), has its own dedicated page with a 3-step wizard.

4. **Lifestyle imagery storytelling** — large "In their hands" grid + studio portrait + family-scene placeholders throughout. Use Next.js `<Image>` with priority loading on the hero.

5. **Trust marquee strip** — animated horizontal scroll under the hero. Pure CSS animation; no JS.

6. **Soft motion** — every interactive element has a 250–350ms ease transition. Hover lifts on cards (`translateY(-4px)` + shadow expand). Don't strip these out.

---

## 5. Implementation order (suggested)

The codebase already has `app/page.tsx` (a basic homepage) and `app/shop-test/page.tsx` (Wix wiring proof). Build in this order:

1. **Design tokens + global styles** — port `src/tokens.css` into `app/globals.css`. Add Google Fonts (Fraunces + Inter) via `next/font/google`.
2. **Layout primitives** — `components/Nav.tsx`, `components/Footer.tsx`, `components/AnnouncementBar.tsx`, `app/layout.tsx`.
3. **Homepage** — port one section at a time (Hero, Marquee, Categories, Studio Story, Bestsellers, Customizer Teaser, In Their Hands, Testimonials, Custom CTA).
4. **Shop page** — `app/shop/page.tsx` reading from Wix; sidebar filter is a client component.
5. **Product Detail page** — `app/product/[slug]/page.tsx`; the engraving customizer is a dedicated client component (`components/EngravingCustomizer.tsx`).
6. **Custom Orders** — `app/custom/page.tsx`; the 3-step wizard is a client component; form posts to `app/api/custom-inquiry/route.ts`.
7. **About / Contact / Policies** — mostly static.
8. **Replace the existing `app/page.tsx`** (the old amber/orange template homepage) with the new one. Delete `/shop-test` before launch.

See `COMPONENT_MAP.md` for exact file-by-file mapping.

---

## 6. Tech notes

- **Next.js 16** (from `package.json`). The `AGENTS.md` warns this version has breaking changes — read `node_modules/next/dist/docs/` before writing routing or data-fetching code.
- **Tailwind v4** is set up via PostCSS. Use `@theme inline` in `globals.css` for custom tokens.
- **Wix SDK** is initialized at `lib/wixClient.ts` with the `products` module. Add `currentCart`, `redirects`, `members` modules as you build.
- **TypeScript** is set up; prefer typed components.
- **The image-slot component** in the prototype lets the designer drop placeholder images. In production, replace with `next/image` pointing at Wix media URLs (`product.media?.mainMedia?.image?.url`).

---

## 7. After implementation: real products

Once the storefront is built, Donna will add her real products to Wix. See `PRODUCT_DATA_GUIDE.md` for:
- Exactly what fields each product needs in Wix (name, price, description, options, custom fields for engraving config)
- Recommended product photo specs (aspect ratio, count per product)
- How to map Wix product options → the engraving customizer UI
- Collection structure (the 6 collections defined in the design)

---

## 8. Open questions for Donna before launch

These should be confirmed before going live:

1. **Lead times** — currently shown as "3–5 business days" for stock. Confirm.
2. **Free shipping threshold** — currently $125. Confirm.
3. **International shipping countries** — currently US/CA/UK/EU/AU. Confirm.
4. **Contact channels** — currently email + IG DM + WhatsApp (phone TBD). Confirm real numbers/handles.
5. **Studio address** — currently Charlotte, NC placeholder. Confirm.
6. **Team members** — Donna + Maya + Renee in About page. Confirm names + photos.
7. **Real testimonials** — replace the 4 placeholder testimonials in `data.js`.
8. **Stockist/press logos** — confirm or remove the press band on About.

---

## 9. Questions during implementation?

If something in the prototype is unclear, **the prototype's `src/*.jsx` files are the canonical reference**. Open `Donnas Site.html` in a browser and inspect.
