import { wixClient } from "@/lib/wixClient";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "40oz-tumbler-with-handle";

  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();

  const p = items[0] as Record<string, unknown>;
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });

  // Return just the fields we care about
  return NextResponse.json({
    mediaKeys: Object.keys((p.media as Record<string, unknown>) ?? {}),
    media: p.media,
    productOptionsCount: (p.productOptions as unknown[])?.length,
    firstOption: (p.productOptions as unknown[])?.[0],
  });
}
