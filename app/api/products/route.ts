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

    // Look up the Wix collection _id from our local data
    const match = collections.find((c) => c.id === collectionId);
    const wixId = match?.wixId;

    if (!wixId) {
      return NextResponse.json([]);
    }

    // Fetch all products then filter by collectionId client-side.
    // (.hasSome on collectionIds is unreliable in this SDK version)
    const page1 = await wixClient.products.queryProducts().limit(100).find();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let page2items: any[] = [];
    if (page1.hasNext()) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page2 = await (page1 as any).next();
        page2items = page2.items ?? [];
      } catch {
        // noop
      }
    }

    const all = [...page1.items, ...page2items];
    const filtered = all.filter((p) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ids: string[] = (p as any).collectionIds ?? [];
      return ids.includes(wixId);
    });

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("[/api/products] Error:", err);
    return NextResponse.json([]);
  }
}
