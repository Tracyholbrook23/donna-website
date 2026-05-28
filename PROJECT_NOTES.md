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

## Checkout — BLOCKED (waiting on Donna)

### The Problem

Wix Headless generates checkout redirect URLs using the **Wix Pages Domain**, which is automatically set to the connected custom domain: `outofjerseycreationshub.com`.

Because DNS for `outofjerseycreationshub.com` points to **Vercel** (our Next.js app), not Wix, checkout redirect URLs like:

```
https://www.outofjerseycreationshub.com/_api/redirect-session/...
```

hit Next.js and 404 or fail — they should be hitting Wix's servers.

### What Was Tried (and doesn't fully solve it)

- **Next.js rewrites** in `next.config.ts` to proxy `/_api/*`, `/checkout/*`, `/account/*` to the wixsite.com URL — helps somewhat but Wix embeds the domain in session tokens for every hop in the redirect chain, including the dynamic checkout URL itself. The URL cannot be pre-registered.
- **Removing callback URLs** from `createRedirectSession` — avoids the `INVALID_REDIRECT_URL` error on that call, but the underlying Pages Domain issue remains.

### The Real Fix (requires Donna)

The Wix Pages Domain is locked to `outofjerseycreationshub.com` because that domain is connected to the site. The domain was registered/connected under **Donna's account (wvpet311@gmail.com)**, who is the site Owner.

**Tracy (Co-Owner) cannot unassign it. Only the Owner can.**

### What Donna Needs to Do

1. Go to **manage.wix.com** and log in as wvpet311@gmail.com
2. Click **Domains** in the left menu
3. Find **outofjerseycreationshub.com**
4. Click the **⋯ (three dots)** next to it
5. Click **"Unassign from this site"**
6. Confirm

Once unassigned, the Wix Pages Domain will no longer be outofjerseycreationshub.com and checkout can route correctly.

> ⚠️ People can still visit the site at https://www.outofjerseycreationshub.com — DNS still points to Vercel/Next.js. Only the Wix backend checkout routing changes.

---

## After Donna Unassigns the Domain — Cleanup Steps

1. **Remove rewrites from `next.config.ts`** (the `/_api/*`, `/checkout/*`, `/account/*` blocks — no longer needed)
2. **Remove `NEXT_PUBLIC_WIX_PAGES_DOMAIN`** from `.env.local`
3. **Test**: Click "Buy Now" on a product → should go to Wix-hosted checkout and complete
4. **Test**: Add to cart → go to cart → click "Checkout" → same flow

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
