# Signature Pieces & Pricing page — handoff notes

Site: https://www.outofjerseycreationshub.com (Next.js on Vercel)

## What's in this folder
- `index.html` — the finished page (static HTML, matches the site's Fraunces/Inter + forest/cream/terracotta system)
- `style.css` — page styles (uses the same token names as the live site: `--ink`, `--cream`, `--terracotta`, `--brass`, `--forest`)
- `assets/` — photos already used on the live site (`/photos/*.jpg`) plus `logo-transparent.png`

## Adding it to the Next.js app
1. Create a route, e.g. `app/pricing/page.tsx` (or `pages/pricing.tsx`).
2. Port the sections of `index.html` into JSX. Image `src` values in `assets/` map 1:1 to existing `/photos/...` files in `public/`, so use `next/image` with those paths — no new uploads needed except none.
3. Drop `style.css` into the page as a CSS module or merge into the global Tailwind layer; the ticker, nav and footer markup can be replaced with the site's existing shared components.
4. Change every `https://www.outofjerseycreationshub.com/...` link to a relative path (`/custom`, `/contact`, `/shop?collection=...`) and remove `target="_blank"`.
5. Add "Pricing" to the header nav and link the homepage "Popular designs" cards to the new page, swapping "Custom order · contact for pricing" for the starting prices below.

## Starting prices used (owner to confirm)
Boards $55–145 · Decanters: rocks glass $28 / 2 for $50, decanter $75, 2-glass set $95, 4-glass set $130, boxed set $175 · Leather: keychain $18, luggage tag $22, opener coaster $24, passport wallet $42, bifold $45, journal $48 · Boxes $40–95 · Tumblers: can cooler $26, 12oz wine $30, 20oz skinny $36, 30oz $40, shaker $42, 40oz handle $45 · Add-ons: design fee $20, second side from $10, handwriting from $15, rush from $25 · Bulk: 10–24 −10%, 25–49 −15%, 50+ −20%.
