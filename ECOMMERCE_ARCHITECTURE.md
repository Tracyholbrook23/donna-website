# Out of Jersey — Ecommerce Architecture Reference
_Last updated: 2026-05-25 | Foundation-first strategy_

---

## Overview & Philosophy

**The pivot:** We are NOT bulk-importing all 600+ products. Instead we are building a solid, scalable ecommerce foundation that:

- Feels complete and premium from day one with a curated selection
- Makes every category discoverable and browsable
- Lets Donna gradually upload the rest of her inventory herself, at her own pace
- Is structured so the site never feels "empty" even with partial inventory

**The guiding principle: Curated > Complete.** A shop with 3 great products per category feels intentional. A shop with 200 half-finished listings feels broken.

---

## The 15 Categories (Exactly Matching the Wholesale Catalog)

These are the only categories on the website and in Wix. No more, no less.

| # | Category | Nav Group | Wix Collection ID | Launch Products |
|---|---|---|---|---|
| 1 | Powder Coated Tumblers | Drinkware | `8e30eb08-07c8-4828-bf7d-024e27b05773` | 4 |
| 2 | Stainless Steel Tumblers | Drinkware | `d266a14f-d114-4811-9a2d-10e1512ee0b6` | 4 |
| 3 | Sublimation Tumblers & Blanks | Drinkware | `cf51cdf0-bce9-43ce-931c-9483b0f0801f` | 3 |
| 4 | Cutting Boards | Kitchen & Bar | `5bd92e78-f534-4c55-939f-8b5ff36d61a4` | 3 |
| 5 | Marble & Wood | Kitchen & Bar | `84f4fa7a-2766-4e07-94e7-bc05dd6393fe` | 3 |
| 6 | Gourmet Knife Set | Kitchen & Bar | `0f86c184-e302-4f2a-a5b9-7fb65141d9e7` | 1 |
| 7 | Grill & BBQ | Kitchen & Bar | `f86d875b-a491-4f4d-b47b-e1bcfd88bffb` | 2 |
| 8 | Decanters & Sets | Kitchen & Bar | `332f3f58-6bd5-4cf2-a6a3-ba3c680bd776` | 2 |
| 9 | Wood Boxes | Gifts & Accessories | `28716efe-8ff6-46c5-9ff9-759a91d1674a` | 3 |
| 10 | Wood Pendant Jewelry | Gifts & Accessories | `b5043d32-becc-465b-a1f1-f00e1e4f80c2` | 3 |
| 11 | Laserette™ | Gifts & Accessories | `aa1ab6f6-d508-4467-b2b6-f2ee9ae89d1c` | 4 |
| 12 | Pocket Knives | Gifts & Accessories | `4bfd4a69-8df9-42ba-9f08-b9e340a6841d` | 2 |
| 13 | Pens & Pencils | Gifts & Accessories | `7515d62a-2ed4-4fec-a8fe-6a9180a441d5` | 2 |
| 14 | Hammer Set | Specialty & Blanks | `faaa201b-f309-4e15-8a7f-f8fdd727217f` | 1 |
| 15 | Acrylics | Specialty & Blanks | `9d3eab66-cad4-48be-a7d9-6b57471a38b9` | 3 |

**Total launch products needed: ~40 products** — roughly 2–4 per category. Enough to make every category feel alive.

---

## Navigation Structure

### Desktop Mega-Menu (grouped)

The mega-menu organizes all 15 categories into 4 labeled groups:

```
DRINKWARE
  Powder Coated Tumblers
  Stainless Steel Tumblers
  Sublimation Tumblers & Blanks

KITCHEN & BAR
  Cutting Boards
  Marble & Wood
  Gourmet Knife Set
  Grill & BBQ
  Decanters & Sets

GIFTS & ACCESSORIES
  Wood Boxes
  Wood Pendant Jewelry
  Laserette™
  Pocket Knives
  Pens & Pencils

SPECIALTY & BLANKS
  Hammer Set
  Acrylics
```

Right-hand card in mega-menu promotes **Custom Orders** — drives Donna's highest-margin work.

### Shop Page Filter Pills
All 15 categories appear as horizontal scrolling filter pills, sorted in catalog order. Counts derive live from Wix product data. An "Everything" pill shows the full catalog.

### Footer
Two columns for the shop links:
- Column 1: Categories 1–8 (Drinkware + Kitchen & Bar)
- Column 2: Categories 9–15 (Gifts & Accessories + Specialty)

### Mobile
Hamburger drawer — top-level nav links only. No grouped mega-menu on mobile (too complex). User taps "Shop" and lands on /shop page with filter pills.

---

## Featured Products Strategy (Launch-Readiness)

### The goal: ~40 products total at launch

Each category needs enough products to feel browsable and real. Here is the recommended upload priority:

#### Tier 1 — Upload These First (highest visibility / best sellers)

**Powder Coated Tumblers** (4 products)
- 30oz Tumbler — Black (most searched, most gifted)
- 30oz Tumbler with Handle — any color
- 20oz Skinny — a popular color (Pink, Teal, or Navy)
- 40oz Tumbler — Black or White

**Laserette™** (4 products)
- Black Bifold Wallet
- Black Passport Wallet
- Black Motel Keychain
- Black Journal Notebook

**Cutting Boards** (3 products)
- Walnut Wood Cutting Board
- Bamboo Cutting Board
- Rubberwood Cutting Board

**Decanters & Sets** (2 products)
- 2-Glass Decanter Set (in Natural wood box)
- 750mL Square Decanter

#### Tier 2 — Upload Second (rounds out the catalog feel)

**Stainless Steel Tumblers** (4 products)
- 30oz Tumbler
- 20oz Skinny
- 12oz Camper Mug
- 6oz Flask

**Wood Boxes** (3 products)
- Medium Valet Box — Black
- Large Memory Box — Natural
- Cigar Box — Dark Walnut

**Wood Pendant Jewelry** (3 products)
- Heart Natural
- Circle Rosewood
- Military Dog Tag Black

**Marble & Wood** (3 products)
- 11pc Charcuterie Set
- 5pc Handle Serving Board Set
- 5pc Coaster Set

#### Tier 3 — Fill In Over Time

**Sublimation Tumblers & Blanks** (3 products)
**Gourmet Knife Set** (1 product — the full set)
**Grill & BBQ** (2 products — 11pc set + spatula)
**Pocket Knives** (2 products — Natural + Rosewood)
**Pens & Pencils** (2 products — gel pen + mechanical pencil)
**Hammer Set** (1 product)
**Acrylics** (3 products — circle, heart, star)

---

## Wix Backend Setup Checklist

### One-time infrastructure (do once, never touch again)
- [ ] Confirm all 15 Wix collection IDs match the table above
- [ ] Delete any collections not in the 15 (old "Utility", "Gourmet Kitchen", etc.)
- [ ] Rename any collections that don't match exactly (e.g. "Laserette Products" → "Laserette™")
- [ ] Set up Wix shipping rules (flat rate + free over $125)
- [ ] Configure Wix tax rules (NJ sales tax)
- [ ] Set up Wix payment providers (Stripe recommended)

### Per-product upload checklist (Donna can do this herself)
For each product Donna uploads, she should:
1. Set the product name (match catalog name exactly)
2. Write a short description (2–3 sentences)
3. Set the price
4. Upload at least 1 product photo
5. Set product options (Color, Size, Finish — whatever applies)
6. Assign to the correct Wix collection (this is what makes it appear in the right category on the website)
7. Mark as "Visible" when ready to publish

### Personalization field
Every engravable product should have a **Text** product option named exactly:
`Engraving Text`

This makes the engraving text field appear on the product page automatically. See `wix_personalization_guide.md` for the full checklist.

---

## Product Page Architecture

The product detail page (`/product/[slug]`) is already fully built. It handles:
- All product option types (color swatches, size pills, text inputs)
- Wix media images with fallback to local photos then SVG glyph
- Add to Cart + Buy it Now buttons
- Cart badge updates live
- Checkout redirect to Wix

No changes needed here — just make sure products are set up correctly in Wix.

---

## Cart & Checkout Flow

Fully built and Wix-connected:
- Cart lives at `/cart` — line items, qty controls, remove, order summary
- Checkout button → Wix checkout URL (hosted by Wix, handles payment/shipping)
- Cart state persists via `localStorage` (visitor token)
- Cart icon in nav shows live count badge

**Note:** Checkout can't be fully tested until at least one product has a real price > $0.00 in Wix.

---

## Filtering Architecture

### Current filter system (ShopClient.tsx)
- Category tabs: one pill per collection, live count from Wix data
- Price slider: 0–$200 range (adjustable)
- Sort: Featured / Price low-high / Price high-low
- All filtering is client-side using `product.collectionIds`

### How category filtering works
When a user clicks a category pill, the shop filters by matching `product.collectionIds` against the Wix collection `_id`. This means a product MUST be assigned to the correct Wix collection to appear under that category filter.

### Adding a product to a category in Wix
In Wix dashboard: Product → Collections → add to the appropriate collection. One product can belong to multiple collections (e.g. a 30oz tumbler can be in both "Powder Coated Tumblers" AND "Featured").

---

## Scalability Plan

### When Donna is ready to add more products
1. She logs in to Wix dashboard
2. Creates or updates a product
3. Assigns it to the right collection
4. The website updates automatically — no code changes needed

### "Featured" products
Wix has a built-in "Featured" collection. Add the best-seller products to this collection and the homepage `HomeBestsellers` component will show them automatically (currently it shows first 8 by default sort — a Featured collection will make this intentional).

### New categories in the future
If Donna ever adds a product type not in the current 15:
1. Tracy adds a new entry to the `collections` array in `lib/data/index.ts`
2. Assigns it to the right nav group in `navGroups`
3. Creates the matching collection in Wix dashboard
4. Done — it appears in nav, shop filters, and footer automatically

### Price range filter
The current slider caps at $200. When higher-priced products are added (e.g. full decanter sets, knife sets), update the `useState(200)` default in `ShopClient.tsx` to `500` and adjust the slider range.

---

## Things NOT in Scope Right Now

These are post-launch, not blocking anything:

- User account / login system (Wix member auth)
- Real-time engraving preview
- Live order tracking
- Blog / "Behind the Studio" content
- Testimonials section (needs real reviews from Donna first)
- Newsletter wiring (needs Donna to pick a provider: Klaviyo, Mailchimp, or Wix Contacts)
- Email wiring for custom inquiry form (waiting on Donna's email address)

---

## Summary: What's Left Before Launch

| Task | Owner | Status |
|---|---|---|
| Upload ~40 launch products in Wix | Donna | ⬜ Not started |
| Add real pricing to all products | Donna | ⬜ Not started |
| Upload product photos to Wix | Donna / Tracy | ⬜ Not started |
| Provide her email for inquiry form | Donna | ⬜ Waiting |
| Confirm hero stats are accurate | Donna | ⬜ Waiting |
| Confirm social platforms (Instagram only?) | Donna | ⬜ Waiting |
| Fix desktop hero animations | Tracy | ⬜ Code fix |
| Fix footer /account link (remove or stub) | Tracy | ⬜ Code fix |
| Wire custom inquiry email | Tracy | ⬜ Blocked on Donna's email |
| Test cart/checkout end-to-end | Tracy + Donna | ⬜ Needs real product price |

---

_This document lives alongside `STARTUP_SESSION.md`. Update both when the architecture changes._
