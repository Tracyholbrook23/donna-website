import { wixClient } from "@/lib/wixClient";
import type { WixProduct } from "@/components/BuyBox";
import Image from "next/image";
import Link from "next/link";
import { ProductGlyph } from "@/components/ProductGlyph";
import type { ProductType } from "@/components/ProductGlyph";
import { ProductPageClient } from "@/components/ProductPageClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<WixProduct | null> {
  try {
    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();
    return (items[0] as WixProduct) ?? null;
  } catch {
    return null;
  }
}

async function getRelated(currentId: string): Promise<WixProduct[]> {
  try {
    const { items } = await wixClient.products.queryProducts().limit(5).find();
    return (items as WixProduct[]).filter((p) => p._id !== currentId).slice(0, 4);
  } catch {
    return [];
  }
}

function glyphTypeFromName(name: string): ProductType {
  const n = name.toLowerCase();
  if (n.includes("tumbler") || n.includes("cup") || n.includes("drink")) return "tumbler";
  if (n.includes("board") || n.includes("charcuterie") || n.includes("serv")) return "board";
  if (n.includes("wallet") || n.includes("leather")) return "wallet";
  if (n.includes("decanter") || n.includes("carafe")) return "decanter";
  if (n.includes("box") || n.includes("keep")) return "box";
  if (n.includes("glass") || n.includes("flute")) return "glass";
  return "tumbler";
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const related = await getRelated(product._id ?? "");
  const glyphType = glyphTypeFromName(product.name ?? "");

  return (
    <main className="page-enter">
      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: 32, fontSize: 12, color: "var(--muted)" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }}>
          Shop
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      {/* Hero — gallery + buybox */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <ProductPageClient product={product} glyphType={glyphType} />
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: "0 0 100px" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 40,
              }}
            >
              <h2 className="display" style={{ fontSize: 36, margin: 0 }}>
                You may also love
              </h2>
              <Link
                href="/shop"
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                View all →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {related.map((rp, i) => {
                const rImg = rp.media?.mainMedia?.image?.url;
                const rGlyph = glyphTypeFromName(rp.name ?? "");
                return (
                  <Link
                    key={rp._id}
                    href={`/product/${rp.slug ?? rp._id}`}
                    className="reveal"
                    style={{ textDecoration: "none", color: "var(--ink)" }}
                  >
                    <div
                      style={{
                        borderRadius: "var(--r-md)",
                        overflow: "hidden",
                        background: "var(--cream-2)",
                        aspectRatio: "3/4",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 12,
                      }}
                    >
                      {rImg ? (
                        <Image
                          src={rImg}
                          alt={rp.name ?? ""}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="25vw"
                        />
                      ) : (
                        <ProductGlyph
                          type={rGlyph}
                          size={120}
                          color={
                            [
                              "var(--terracotta)",
                              "var(--forest)",
                              "var(--brass)",
                              "var(--ink-soft)",
                            ][i % 4]
                          }
                        />
                      )}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 4px" }}>
                      {rp.name}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
                      {rp.priceData?.formatted?.price}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
