import { wixClient } from "@/lib/wixClient";
import { collections } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collectionId = req.nextUrl.searchParams.get("collection");

  try {
    // No filter or "all" — return everything
    if (!collectionId || collectionId === "all") {
      const { items } = await wixClient.products
        .queryProducts()
        .limit(100)
        .find();
      return NextResponse.json(items);
    }

    // Look up the Wix collection _id from our local data (no API call needed)
    const match = collections.find((c) => c.id === collectionId);
    const wixId = match?.wixId;

    // Category exists but has no products assigned in Wix yet
    if (!wixId) {
      return NextResponse.json([]);
    }

    const { items } = await wixClient.products
      .queryProducts()
      .hasSome("collectionIds", [wixId])
      .limit(100)
      .find();

    return NextResponse.json(items);
  } catch (err) {
    console.error("[/api/products] Error:", err);
    return NextResponse.json([]);
  }
}
