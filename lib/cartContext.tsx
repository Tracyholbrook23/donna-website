"use client";

/**
 * CartContext
 * -----------
 * Manages the Wix Headless cart for the entire site.
 *
 * - Creates a browser-side Wix client with visitor-token persistence
 *   (tokens saved to localStorage so the cart survives page refreshes).
 * - Exposes: cartCount, cartItems, cartSubtotal, addToCart, removeFromCart,
 *   updateQty, refreshCart, goToCheckout, buyNow.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createBrowserWixClient, saveWixTokens } from "@/lib/wixClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartLineItem {
  _id: string;
  productName?: string | null;
  quantity?: number | null;
  price?: string | null;        // formatted price string, e.g. "$24.00"
  imageUrl?: string | null;
  catalogItemId?: string | null;
  options?: string | null;      // e.g. "Color: Black, Size: 30oz"
}

interface CartContextValue {
  cartCount: number;
  cartItems: CartLineItem[];
  cartSubtotal: string;
  loading: boolean;
  addToCart: (params: AddToCartParams) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQty: (lineItemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  goToCheckout: () => Promise<void>;
  buyNow: (params: AddToCartParams) => Promise<void>;
}

export interface AddToCartParams {
  productId: string;
  quantity?: number;
  /** Wix product option selections, e.g. { "Color": "Black", "Size": "30oz" } */
  selectedOptions?: Record<string, string>;
  engravingText?: string;
  engravingPlacement?: string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue>({
  cartCount: 0,
  cartItems: [],
  cartSubtotal: "$0.00",
  loading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQty: async () => {},
  refreshCart: async () => {},
  goToCheckout: async () => {},
  buyNow: async () => {},
});

export function useCart() {
  return useContext(CartContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<ReturnType<typeof createBrowserWixClient> | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartLineItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState("$0.00");
  const [loading, setLoading] = useState(false);

  // Lazy-init the browser client (only runs in browser)
  function getClient() {
    if (!clientRef.current) {
      clientRef.current = createBrowserWixClient();
    }
    return clientRef.current;
  }

  // ── Normalise a raw Wix cart response into our CartLineItem shape ───────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function normaliseCart(cart: any) {
    const items: CartLineItem[] = (cart?.lineItems ?? []).map((li: any) => {
      // Build option string from selected options
      const optionParts: string[] = [];
      for (const [k, v] of Object.entries(li.descriptionLines ?? {})) {
        if (v) optionParts.push(`${k}: ${v}`);
      }
      // Try descriptionLines array (newer Wix API shape)
      const descLines = Array.isArray(li.descriptionLines)
        ? li.descriptionLines
            .map((d: any) => d.name?.translated ?? d.plainText?.translated ?? "")
            .filter(Boolean)
        : optionParts;

      return {
        _id: li._id ?? "",
        productName:
          li.productName?.translated ??
          li.productName?.original ??
          li.name ??
          "Product",
        quantity: li.quantity ?? 1,
        price:
          li.price?.formattedAmount ??
          li.fullPrice?.formattedAmount ??
          li.price?.amount
            ? `$${li.price.amount}`
            : null,
        imageUrl: li.image?.url ?? li.media?.mainMedia?.image?.url ?? null,
        catalogItemId: li.catalogReference?.catalogItemId ?? null,
        options: descLines.length > 0 ? descLines.join(" · ") : null,
      };
    });

    const count = items.reduce((s, i) => s + (i.quantity ?? 0), 0);
    const subtotal =
      cart?.subtotal?.formattedAmount ??
      cart?.priceSummary?.subtotal?.formattedAmount ??
      "$0.00";

    return { items, count, subtotal };
  }

  // ── Fetch / refresh cart ────────────────────────────────────────────────────
  const refreshCart = useCallback(async () => {
    const client = getClient();
    try {
      const cart = await client.currentCart.getCurrentCart();
      saveWixTokens(client);
      const { items, count, subtotal } = normaliseCart(cart);
      setCartItems(items);
      setCartCount(count);
      setCartSubtotal(subtotal);
    } catch {
      // Cart doesn't exist yet (empty) — that's fine
      setCartItems([]);
      setCartCount(0);
      setCartSubtotal("$0.00");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // ── Add to cart ─────────────────────────────────────────────────────────────
  const addToCart = useCallback(async (params: AddToCartParams) => {
    const client = getClient();
    setLoading(true);
    try {
      const customTextFields: Array<{ title: string; value: string }> = [];
      if (params.engravingText) {
        customTextFields.push({ title: "Engraving text", value: params.engravingText });
      }
      if (params.engravingPlacement) {
        customTextFields.push({ title: "Placement", value: params.engravingPlacement });
      }

      // addToCurrentCart returns the full updated cart — use it directly instead
      // of calling getCurrentCart() separately (which can silently fail and reset state).
      const response = await client.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              catalogItemId: params.productId,
              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e", // Wix Stores app ID
              // Pass selected variant options (Color, Size, Finish, etc.) to Wix
              ...(params.selectedOptions && Object.keys(params.selectedOptions).length > 0
                ? { options: { options: params.selectedOptions } }
                : {}),
            },
            quantity: params.quantity ?? 1,
            ...(customTextFields.length > 0 ? { customTextFields } : {}),
          },
        ],
      });

      saveWixTokens(client);

      // Update cart state from the response cart (avoids a second network call
      // and eliminates the silent-catch issue in refreshCart).
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedCart = (response as any)?.cart ?? response;
      const { items, count, subtotal } = normaliseCart(updatedCart);
      setCartItems(items);
      setCartCount(count);
      setCartSubtotal(subtotal);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Remove from cart ────────────────────────────────────────────────────────
  const removeFromCart = useCallback(async (lineItemId: string) => {
    const client = getClient();
    setLoading(true);
    try {
      await client.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
      saveWixTokens(client);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCart]);

  // ── Update qty ──────────────────────────────────────────────────────────────
  const updateQty = useCallback(async (lineItemId: string, quantity: number) => {
    const client = getClient();
    setLoading(true);
    try {
      await client.currentCart.updateCurrentCartLineItemQuantity([
        { _id: lineItemId, quantity },
      ]);
      saveWixTokens(client);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCart]);

  // ── Create checkout & redirect ──────────────────────────────────────────────
  const goToCheckout = useCallback(async () => {
    const client = getClient();
    setLoading(true);
    try {
      // 1. Create checkout from current cart
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkoutResult: any = await (client.currentCart as any).createCheckoutFromCurrentCart({
        channelType: "WEB",
      });

      // Wix SDK returns the id in different shapes depending on SDK version:
      // { checkoutId } or { _id } or { checkout: { _id } }
      const checkoutId =
        checkoutResult?.checkoutId ??
        checkoutResult?._id ??
        checkoutResult?.checkout?._id;

      if (!checkoutId) {
        console.error("createCheckoutFromCurrentCart response:", checkoutResult);
        throw new Error(`No checkout ID in response: ${JSON.stringify(checkoutResult)}`);
      }

      // 2. Create a Wix redirect session → get the full checkout URL.
      // No callbacks passed: Wix falls back to the "Frontend link" configured in
      // Headless Settings (https://outofjerseycreationshub.com) after checkout.
      // Passing explicit callback URLs triggers Wix's redirect-URL allowlist
      // validation which requires a separate dashboard configuration step.
      const { redirectSession } = await client.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
      });

      saveWixTokens(client);

      if (redirectSession?.fullUrl) {
        // Next.js rewrites in next.config.ts proxy /_api/* and /checkout/* to the
        // Wix-hosted site, so every hop in the redirect chain resolves correctly
        // even though our DNS points to Next.js, not Wix.
        window.location.assign(redirectSession.fullUrl);
      } else {
        console.error("createRedirectSession response:", redirectSession);
        throw new Error("No checkout URL returned from Wix");
      }
    } catch (err) {
      // Log the real error so it's visible in browser DevTools → Console
      console.error("Checkout error (full):", err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = (err as any)?.message ?? String(err);
      alert(`Checkout failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Buy Now — add then immediately checkout ─────────────────────────────────
  const buyNow = useCallback(async (params: AddToCartParams) => {
    await addToCart(params);
    await goToCheckout();
  }, [addToCart, goToCheckout]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        cartSubtotal,
        loading,
        addToCart,
        removeFromCart,
        updateQty,
        refreshCart,
        goToCheckout,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
