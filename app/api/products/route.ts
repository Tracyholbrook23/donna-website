import { wixClient } from "@/lib/wixClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collectionSlug = req.nextUrl.searchParams.get("collection");

  try {
    // If no collection filter (or "all"), return everything
    if (!collectionSlug || collectionSlug === "all") {
      const { items } = await wixClient.products
        .queryProducts()
        .limit(100)
        .find();
      return NextResponse.json(items);
    }

    // Look up the Wix collection by slug, then filter products
    const { collection } = await wixClient.collections.getCollectionBySlug(collectionSlug);

    if (!collection?._id) {
      // Slug doesn't match any Wix collection — return empty
      return NextResponse.json([]);
    }

    const { items } = await wixClient.products
      .queryProducts()
      .hasSome("collectionIds", [collection._id])
      .limit(100)
      .find();

    return NextResponse.json(items);
  } catch (err) {
    console.error("[/api/products] Error:", err);
    return NextResponse.json([]);
  }
}
