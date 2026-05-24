import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { currentCart, checkout } from "@wix/ecom";
import { redirects } from "@wix/redirects";

/**
 * Wix Headless client — products, cart, checkout, redirects.
 * Uses anonymous OAuth (client ID only) — safe to expose publicly.
 *
 * Two flavors:
 *  - wixClient        → singleton for server components & API routes (no token persistence)
 *  - createBrowserWixClient() → factory for client components; reads/writes visitor tokens
 *                               from localStorage so the cart survives page refreshes.
 */

// ─── Server / API routes client ───────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _client = createClient({
  modules: { products, currentCart, checkout, redirects },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
  }),
}) as any;

export const wixClient = _client as {
  products: typeof products;
  currentCart: typeof currentCart;
  checkout: typeof checkout;
  redirects: typeof redirects;
  auth: ReturnType<typeof OAuthStrategy>;
};

// ─── Browser client factory (token-persistent) ────────────────────────────────
const WIX_TOKENS_KEY = "wix_visitor_tokens";

function readStoredTokens() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(WIX_TOKENS_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function saveWixTokens(client: typeof wixClient) {
  try {
    const tokens = client.auth.getTokens();
    if (tokens) localStorage.setItem(WIX_TOKENS_KEY, JSON.stringify(tokens));
  } catch {
    // noop — localStorage might be unavailable
  }
}

export function createBrowserWixClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = createClient({
    modules: { products, currentCart, checkout, redirects },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: readStoredTokens(),
    }),
  }) as any;
  return c as typeof wixClient;
}
