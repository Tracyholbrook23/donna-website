/**
 * /shop-test — Wix Headless integration test
 *
 * READ-ONLY diagnostic page.
 * No cart, no checkout, no auth — just confirming live products load from Wix.
 * Remove this page before going to production.
 */

import { wixClient } from "@/lib/wixClient";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const { items } = await wixClient.products.queryProducts().find();
    return { items, error: null };
  } catch (err) {
    return { items: [], error: String(err) };
  }
}

export default async function ShopTestPage() {
  const { items: productList, error } = await getProducts();

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🔌 Wix Integration Test
          </div>
          <h1
            className="text-3xl font-bold text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Live Products from Wix
          </h1>
          <p className="text-stone-500 mt-2 text-sm">
            Client ID:{" "}
            <code className="bg-stone-200 px-2 py-0.5 rounded text-xs">
              {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ?? "NOT SET"}
            </code>
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <h2 className="text-red-700 font-bold mb-2">⚠️ Connection Error</h2>
            <pre className="text-red-600 text-xs whitespace-pre-wrap break-all">
              {error}
            </pre>
            <p className="text-red-500 text-sm mt-3">
              Check that <code>.env.local</code> has the correct{" "}
              <code>NEXT_PUBLIC_WIX_CLIENT_ID</code> and that your Wix store is
              published.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && productList.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h2 className="text-amber-700 font-bold mb-1">No products found</h2>
            <p className="text-amber-600 text-sm">
              Connected successfully, but your Wix store has no published
              products yet. Add products in your Wix dashboard and they&apos;ll
              appear here.
            </p>
          </div>
        )}

        {/* Success banner */}
        {!error && productList.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-green-800 font-bold">
                Connected! {productList.length} product
                {productList.length !== 1 ? "s" : ""} loaded from Wix.
              </p>
              <p className="text-green-600 text-sm">
                Images, names, prices, and variants are all live.
              </p>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product) => {
            const imageUrl = product.media?.mainMedia?.image?.url ?? null;
            const price = product.priceData?.formatted?.price ?? "—";
            const options = product.productOptions ?? [];

            return (
              <div
                key={product._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100"
              >
                {/* Image */}
                <div className="relative aspect-square bg-stone-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name ?? "Product"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-5xl">
                      🖼
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <h2 className="font-bold text-stone-900 text-lg leading-tight">
                    {product.name ?? "Unnamed Product"}
                  </h2>

                  <p className="text-amber-700 font-bold text-xl">{price}</p>

                  {/* Product ID */}
                  <p className="text-xs text-stone-400 font-mono break-all">
                    ID: {product._id}
                  </p>

                  {/* Options / variants */}
                  {options.length > 0 && (
                    <div className="pt-1 space-y-2">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                        Options ({options.length})
                      </p>
                      {options.map((option) => (
                        <div key={option.name}>
                          <p className="text-xs font-semibold text-stone-700 mb-1">
                            {option.name}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(option.choices ?? []).slice(0, 8).map((choice) =>
                              option.optionType === "color" ? (
                                <span
                                  key={choice.value}
                                  title={choice.value}
                                  className="w-5 h-5 rounded-full border border-stone-200 inline-block"
                                  style={{ backgroundColor: choice.value }}
                                />
                              ) : (
                                <span
                                  key={choice.value}
                                  className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                                >
                                  {choice.value}
                                </span>
                              )
                            )}
                            {(option.choices ?? []).length > 8 && (
                              <span className="text-xs text-stone-400 self-center">
                                +{(option.choices ?? []).length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-stone-400 text-xs mt-12">
          This page is for testing only — remove before launch.
        </p>
      </div>
    </div>
  );
}
