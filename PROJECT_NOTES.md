# Out of Jersey Creations Hub — Project Notes

Last updated: 2026-05-27

## Site Info

- **Live URL**: https://www.outofjerseycreationshub.com
- **Platform**: Next.js 15 App Router + Wix Headless (Wix Stores / ecom)
- **Deployed on**: Vercel (DNS points here)
- **Wix site fallback URL**: https://wvpet311.wixsite.com/out-of-jersey-creati
- **Wix Client ID**: `5e7ee3b4-ed1b-41ed-a740-c0d41315a576`
- **Wix Site ID**: `83659408-cb38-4d42-9c73-a41a96d9294f`

## Wix Account Roles

| Email | Role |
|---|---|
| tracyholbrook532@gmail.com | Co-Owner (Tracy) |
| wvpet311@gmail.com | Owner (Donna) |

---

## What's Been Built / Fixed

### Mobile Layouts ✅
- Shop page: filter sidebar hides on mobile, product grid goes full-width
- Cart page: order summary stacks below cart items on mobile (no more crushing layout)
- Classes: `layout-shop-body`, `layout-cart`, `shop-sidebar` in `app/globals.css`

### Product Page ✅
- Removed color swatch circles from BuyBox — color is now selected only via thumbnail rail
- Clicking a thumbnail auto-syncs the color selection into BuyBox for correct "Add to Cart" behavior
- `resolveColorForImage()` in `ProductPageClient.tsx` maps thumbnail URLs → color names via Wix `linkedMediaItems`

### Add to Cart ✅
- Fixed silent bug where cart showed "Added ✓" but count stayed at 0
- Root cause: `refreshCart()` was silently catching the "no cart" error and resetting state
- Fix: use the response from `addToCurrentCart()` directly to update state (no second network call)

---

## Checkout — N/A (business pivot)

> **No longer relevant.** The site pivoted in Session 10 (2026-05-28) from an ecommerce store to a portfolio/lead-gen site. Customers do not purchase directly through the website. The Wix checkout flow is not used.
>
> Cart infrastructure is preserved in the codebase (`cartContext.tsx`, `BuyBox.tsx`, `app/cart/page.tsx`) for potential future use on `/fan-favorites`, but checkout routing is not a concern right now.
>
> Cleanup already done (2026-05-31): Wix proxy rewrites removed from `next.config.ts`, `NEXT_PUBLIC_WIX_PAGES_DOMAIN` removed from `.env.local`. Donna also unassigned the domain from Wix Pages.

---

## Git Workflow

```bash
# Check what changed
git status

# Stage all changes
git add -A

# Commit
git commit -m "your message here"

# Push to main
git push origin main
```

Vercel auto-deploys on every push to main.
