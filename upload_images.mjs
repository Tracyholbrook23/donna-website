/**
 * Out of Jersey — Wix Product Image Upload Script
 *
 * Run from the donna-website/ folder:
 *   node upload_images.mjs            ← dry run (shows matches, no uploads)
 *   node upload_images.mjs --upload   ← actually uploads
 *
 * Requires Node 18+ (uses native fetch). Already installed if you can run `next dev`.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ── Config ─────────────────────────────────────────────────────────────────
const API_KEY = process.env.WIX_API_KEY ||
  "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjkwOTAwZWU4LTBhZDItNGE3MS05ODRmLWFmMTYxMmMzNmNmNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImU1Mzg3MzFkLTY3NWQtNDNlNi1hNDU2LTVmMDk3MjY1MzZmOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMzVjY2JiYS1hNjRiLTQ5ZTQtOWQyZi1iMzg2MDM4ZjczMDVcIn19IiwiaWF0IjoxNzc5NzU2NzYzfQ.OPC1jVfc-9SYwB-JklXHMeET46_VTJh1zQJBhmyiOkPabLm6oarqZ_y_pJIhxEYmkdN2lnl-b4VxecRuGeeWGIdcwOlSXhtbuzRe51SUpNY6wws7UfUIuEVHnD2IOyt8-U10v7OvoNyWuQZPodJO48h_0HLZTmLBEPlQtgy79xFbv7p57Y3-ri5GJZR-Rk5s7eMfcTVohrRXtvC-WzCcxArKi34e9rGJlXp075S3uYgwWehkRtR6tFYCw_ocAEOk3qEqFY-YYpNhWngBGQ5VwRbBOFzFIZ48B4x3CHNhqf10bGslSgBjlpIORBUAtiagU_xcL7sJfk8iQWTw2lH0Gw";

const SITE_ID  = "83659408-cb38-4d42-9c73-a41a96d9294f";
const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR  = path.join(BASE_DIR, "named_images");
const CSV_PATH = path.join(BASE_DIR, "image_mapping.csv");
const DO_UPLOAD = process.argv.includes("--upload");

const HEADERS = {
  "Authorization": API_KEY,
  "wix-site-id": SITE_ID,
  "Content-Type": "application/json",
};

// ── CSV product_name → Wix product handle ──────────────────────────────────
// Manually verified against the Wix catalog (138 products, May 2026)
const NAME_TO_HANDLE = {
  // Powder Coated Tumblers
  "20oz Regular Tumbler":                   "20oz-regular",
  "20oz Regular Tumbler with Handle":        "20oz-regular-with-handle",
  "20oz Regular Handle":                     "20oz-regular-handle-only",
  "20oz Regular Gold Electro":               "20oz-regular-gold-electro",
  "20oz Regular Rainbow Electro":            "20oz-regular-rainbow-electro",
  "20oz Skinny Tumbler":                     "20oz-skinny",
  "20oz Skinny Tumbler with Handle":         "20oz-skinny-with-handle",
  "20oz Skinny Handle":                      "20oz-skinny-handle-only",
  "20oz Skinny Gold Electro":                "20oz-skinny-gold-electro",
  "20oz Skinny Rainbow Electro":             "20oz-skinny-rainbow-electro",
  "30oz Tumbler":                            "30oz-tumbler",
  "30oz Tumbler with Handle":                "30oz-tumbler-with-handle",
  "30oz and 40oz Replacement Handle":        "30-40oz-handle",
  "30oz Gold Electro":                       "30oz-gold-electro",
  "30oz Rainbow Electro":                    "30oz-rainbow-electro",
  "32oz Hydro Bottle":                       "32oz-hydro-bottle",
  "32oz Hydro Gold Electro":                 "32oz-hydro-gold-electro",
  "32oz Hydro Rainbow Electro":              "32oz-hydro-rainbow-electro",
  "40oz Tumbler":                            "40oz-tumbler",
  "40oz Tumbler with Handle":                "40oz-tumbler-with-handle",
  "12oz Wine Tumbler":                       "12oz-wine-pc",
  "12oz Camper":                             "12oz-camper",

  // Stainless Steel Tumblers
  "6oz Flask - Stainless Steel":             "ss-6oz-flask",
  "8oz Sippy - Stainless Steel":             "ss-8oz-sippy",
  "12oz Kids - Stainless Steel":             "ss-12oz-kids",
  "12oz Mason Jar - Stainless Steel":        "ss-12oz-mason",
  "12oz Sippy Duo - Stainless Steel":        "ss-12oz-sippy-duo",
  "12oz Slim Duozie - Stainless Steel":      "ss-12oz-slim-duozie",
  "12oz Thick Duozie - Stainless Steel":     "ss-12oz-thick-duozie",
  "12oz Wine - Stainless Steel":             "ss-12oz-wine",
  "12oz Camper - Stainless Steel":           "ss-12oz-camper",
  "14oz Round Mug - Stainless Steel":        "ss-14oz-round",
  "14oz Skinny - Stainless Steel":           "ss-14oz-skinny",
  "14oz Thick - Stainless Steel":            "ss-14oz-thick",
  "16oz Pencil Cup - Stainless Steel":       "ss-16oz-pencil-cup",
  "16oz Wine - Stainless Steel":             "ss-16oz-wine",
  "18oz Hydro - Stainless Steel":            "ss-18oz-hydro",
  "20oz Cooler and Cocktail Shaker - Stainless Steel": "ss-20oz-cooler",
  "20oz Curve - Stainless Steel":            "ss-20oz-curve",
  "20oz Skinny - Stainless Steel":           "ss-20oz-skinny",
  "20oz Thick - Stainless Steel":            "ss-20oz-thick",
  "20oz Tumbler - Stainless Steel":          "ss-20oz-tumbler",
  "22oz Tapered - Stainless Steel":          "ss-22oz-tapered",
  "25oz Barrel Football - Stainless Steel":  "ss-25oz-barrel",
  "30oz Curve - Stainless Steel":            "ss-30oz-curve",
  "30oz Skinny - Stainless Steel":           "ss-30oz-skinny",
  "30oz Thick - Stainless Steel":            "ss-30oz-thick",
  "30oz Tumbler - Stainless Steel":          "ss-30oz-tumbler",
  "32oz Hydro - Stainless Steel":            "ss-32oz-hydro",
  "32oz Tapered - Stainless Steel":          "ss-32oz-tapered",
  "40oz Tumbler - Stainless Steel":          null, // not a separate Wix product
  "Universal Can Cooler - Stainless Steel":  "ss-universal-can",

  // Sublimation
  "40oz Regular-Shimmer - Sublimation":      "sub-40oz-reg",
  "40oz Sub SS - Sublimation":               "sub-40oz-ss",
  "32oz Hydro - Sublimation":                "sub-32oz-hydro",
  "32oz Hydro Sub SS - Sublimation":         "sub-32oz-hydro-ss",
  "32oz Tapered - Sublimation":              "sub-32oz-tapered",
  "30oz Thick - Sublimation":                "sub-30oz-thick",
  "30oz Skinny - Sublimation":               "sub-30oz-skinny",
  "25oz Barrel Football - Sublimation":      "sub-25oz-barrel",
  "22oz Tapered - Sublimation":              "sub-22oz-tapered",
  "20oz Cooler and Cocktail Shaker - Sublimation": "sub-20oz-cooler",
  "20oz Thick - Sublimation":                "sub-20oz-thick",
  "20oz Skinny - Sublimation":               "sub-20oz-skinny",
  "20oz Skinny Regular-Shimmer-Glow - Sublimation": "sub-20oz-skinny",
  "18oz Hydro - Sublimation":                "sub-18oz-hydro",
  "18oz Hydro Sub SS - Sublimation":         "sub-18oz-hydro-ss",
  "16oz Wine - Sublimation":                 "sub-16oz-wine",
  "14oz Round Mug - Sublimation":            "sub-14oz-round",
  "14oz Skinny - Sublimation":               "sub-14oz-skinny",
  "14oz Thick - Sublimation":                "sub-14oz-thick",
  "12oz Camper Mug - Sublimation":           "sub-12oz-camper",
  "12oz Sippy - Sublimation":                "sub-12oz-sippy",
  "12oz Slim Duozie - Sublimation":          "sub-12oz-slim-duozie",
  "12oz Thick Duozie - Sublimation":         "sub-12oz-thick-duozie",
  "12oz Wine - Sublimation":                 "sub-12oz-wine",
  "Bottle Opener - Sublimation":             "sub-bottle-opener",
  "4in Coaster - Sublimation":               "sub-4in-coaster",
  "Luggage Tag - Sublimation":               "sub-luggage-tag",
  "Shimmer Pouch - Sublimation":             "sub-shimmer-pouch",
  "8in Wind Spinner - Sublimation":          "sub-8in-wind",
  "4in Wind Spinner - Sublimation":          "sub-4in-wind",
  "Kitchen Towel - Sublimation":             "sub-kitchen-towel",
  "Universal Can Cooler - Sublimation":      "sub-universal-can",

  // Laserette
  "Laserette Passport Wallet":               "laserette-passport",
  "Laserette Magnetic Bottle Opener Coaster":"laserette-coaster",
  "Laserette Bifold Wallet":                 "laserette-bifold",
  "Laserette Luggage Tag":                   "laserette-luggage",
  "Laserette Journal Notebook":              "laserette-journal",
  "Laserette Motel Keychain":                "laserette-keychain",

  // Wood Pendant Jewelry
  "Vertical Bar Wood Pendant":               "jewelry-vert-bar",
  "Horizontal Bar Wood Pendant":             "jewelry-horiz-bar",
  "Tear Drop Wood Pendant":                  "jewelry-tear-drop",
  "Military Dog Tag Wood Pendant":           "jewelry-dog-tag",
  "Cross Wood Pendant":                      "jewelry-cross",
  "Heart Wood Pendant":                      "jewelry-heart",
  "Circle Wood Pendant":                     "jewelry-circle",

  // Wood Boxes
  "Large Valet Box":                         "large-valet-box",
  "Medium Valet Box":                        "medium-valet-box",
  "XL Memory Box":                           "xl-memory-box",
  "Large Memory Box":                        "large-memory-box",
  "Medium Box":                              "medium-box",
  "Cigar Box":                               "cigar-box",

  // Decanters & Sets
  "4-Glass Decanter Set":                    "decanter-set-4",
  "2-Glass Decanter Set":                    "decanter-set-2",
  "8oz Whiskey Rocks Glass":                 "whiskey-rocks-glass",
  "650mL Triangle Decanter":                 "decanter-tri",
  "750mL Rectangle Decanter":                "decanter-rect",
  "750mL Square Decanter":                   "decanter-square",

  // BBQ & Grill
  "BBQ Grill Spatula":                       "bbq-spatula",
  "8pc Smash Burger Set":                    "bbq-smash",
  "11pc BBQ Grill Set":                      "bbq-11pc",

  // Gourmet Knife Set
  "Gourmet Knife Set with Rubberwood Magnetic Stand": "knife-set",

  // Cutting Boards
  "Maple Cutting Board Made in USA":         "cb-maple-usa",
  "Arizona Rubberwood Cutting Board":        "cb-arizona",
  "Walnut Wood Cutting Board":               "cb-walnut",
  "Rubberwood Cutting Board":                "cb-rubberwood",
  "Bamboo Cutting Board":                    "cb-bamboo",
  "Cutting Board with Juice Groove":         "mw-cutting-board-juice",

  // Marble & Wood
  "Desk Name Plate with Card Slot and Pen Holders": "mw-desk-nameplate",
  "Pen and Pencil Holder":                   "mw-pen-holder",
  "7x5 Photo Frame":                         "mw-photo-frame",
  "3pc Heart Shaped Serving Board Set":      "mw-heart-board",
  "5pc Coaster Set":                         "mw-coaster-set",
  "5pc Handle Serving Board Set":            "mw-serving-board",
  "11pc Charcuterie Set":                    "mw-charcuterie",

  // Hammer Set
  "16oz Hammer Set":                         "hammer-set",

  // Pocket Knives (all variants → same product)
  "Pocket Knife Natural":                    "pocket-knife",
  "Pocket Knife Rosewood":                   "pocket-knife",
  "Pocket Knife Black Metal":                "pocket-knife",

  // Pens & Pencils
  "Mechanical Pencil":                       "mech-pencil",
  "Stylus Gel Pen":                          "stylus-pen",

  // Acrylics
  "Acrylic Apple Blank 2.5in":               "acrylic-apple",
  "Acrylic Bone Blank 2.5in":                "acrylic-bone",
  "Acrylic Circle Blank":                    "acrylic-circle",
  "Acrylic Cross Blank 2.5in":               "acrylic-cross",
  "Acrylic Heart Blank 2.5in":               "acrylic-heart",
  "Acrylic Puzzle Blank 2.5in":              "acrylic-puzzle",
  "Acrylic Ribbon Blank 2.5in":              "acrylic-ribbon",

  // Section headers / catalog-only images — skip
  "Stainless Steel Tumblers":                null,
  "Sublimation Tumblers and Blanks":         null,
  "Decanters and Sets":                      null,
  "Marble and Wood Collection":              null,
};

// ── Helpers ────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wixPost(url, body) {
  const res = await fetch(url, { method: "POST", headers: HEADERS, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) {
    console.error(`\n❌ Wix API error ${res.status} at ${url}`);
    console.error(`   Response: ${text.slice(0, 300)}`);
    console.error(`   If you see 403, the API key may need to be regenerated in your Wix dashboard.`);
    console.error(`   Go to: wix.com → Settings → API Keys → copy a new key → set WIX_API_KEY=<key> before running.\n`);
    process.exit(1);
  }
  return JSON.parse(text);
}

async function getAllProducts() {
  console.log("Fetching all Wix products...");

  // Quick connection test first
  const testRes = await fetch("https://www.wixapis.com/stores/v3/products/query", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query: { paging: { limit: 1 } } }),
  });
  if (!testRes.ok) {
    const body = await testRes.text();
    console.error(`\n❌ API auth failed (HTTP ${testRes.status})`);
    console.error(`   Raw response: ${body.slice(0, 300)}`);
    console.error(`\n   FIX: Your API key may have expired. Regenerate it:`);
    console.error(`   1. Go to manage.wix.com → Settings → API Keys`);
    console.error(`   2. Create a new key with Stores permissions`);
    console.error(`   3. Run: WIX_API_KEY="<new key>" node upload_images.mjs`);
    process.exit(1);
  }

  const all = [];
  let cursor = null;

  while (true) {
    const body = cursor
      ? { query: { cursorPaging: { limit: 100, cursor } } }
      : { query: { paging: { limit: 100 } } };

    const data = await wixPost("https://www.wixapis.com/stores/v3/products/query", body);
    const products = data.products ?? [];
    all.push(...products);
    const meta = data.pagingMetadata ?? {};
    console.log(`  Page: ${products.length} products (total: ${all.length}), hasNext: ${meta.hasNext}`);
    if (!meta.hasNext || !products.length) break;
    cursor = meta.cursors?.next ?? null;
    if (!cursor) break;
    await sleep(200);
  }

  return all;
}

async function getUploadUrl(fileName) {
  const res = await fetch("https://www.wixapis.com/site-media/v1/files/generate-upload-url", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ mimeType: "image/jpeg", displayName: fileName }),
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

async function uploadFile(uploadUrl, filePath) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const url = `${uploadUrl}?filename=${encodeURIComponent(fileName)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "image/jpeg" },
    body: fileBuffer,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

async function updateProductMedia(productId, revision, mediaItems) {
  // Wix Catalog V3: PATCH itemsInfo.items with { id: file.id } for each uploaded file.
  // Wix auto-sets media.main from the first item.
  const res = await fetch(`https://www.wixapis.com/stores/v3/products/${productId}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      product: {
        revision,
        media: { itemsInfo: { items: mediaItems } },
      },
      fieldMask: "media.itemsInfo.items",
    }),
  });
  return res.json();
}

// ── Main ───────────────────────────────────────────────────────────────────
const PRIORITY_ORDER = [
  // Group 1: Powder Coated Tumblers
  "20oz-regular", "20oz-regular-with-handle", "20oz-regular-handle-only",
  "20oz-regular-gold-electro", "20oz-regular-rainbow-electro",
  "20oz-skinny", "20oz-skinny-with-handle", "20oz-skinny-handle-only",
  "20oz-skinny-gold-electro", "20oz-skinny-rainbow-electro",
  "30oz-tumbler", "30oz-tumbler-with-handle", "30-40oz-handle",
  "30oz-gold-electro", "30oz-rainbow-electro",
  "32oz-hydro-bottle", "32oz-hydro-gold-electro", "32oz-hydro-rainbow-electro",
  "40oz-tumbler", "40oz-tumbler-with-handle",
  "12oz-wine-pc", "12oz-camper",
  // Group 2: Laserette
  "laserette-passport", "laserette-coaster", "laserette-bifold",
  "laserette-luggage", "laserette-journal", "laserette-keychain",
  // Group 3: Wood Boxes
  "large-valet-box", "medium-valet-box", "xl-memory-box",
  "large-memory-box", "medium-box", "cigar-box",
  // Group 4: Decanters
  "decanter-set-4", "decanter-set-2", "whiskey-rocks-glass",
  "decanter-tri", "decanter-rect", "decanter-square",
  // Group 5: Marble & Wood
  "mw-desk-nameplate", "mw-pen-holder", "mw-photo-frame",
  "mw-heart-board", "mw-cutting-board-juice", "mw-coaster-set",
  "mw-serving-board", "mw-charcuterie",
  // Group 6: Cutting Boards
  "cb-maple-usa", "cb-arizona", "cb-walnut", "cb-rubberwood", "cb-bamboo",
];

async function main() {
  console.log(`\n${"=".repeat(60)}`);
  console.log("Out of Jersey — Wix Image Upload");
  console.log(`Mode: ${DO_UPLOAD ? "🚀 UPLOAD" : "🔍 DRY RUN"}`);
  console.log("=".repeat(60) + "\n");

  // 1. Fetch all products
  const wixProducts = await getAllProducts();
  const byHandle = Object.fromEntries(wixProducts.map((p) => [p.handle, p]));
  console.log(`\nTotal products: ${wixProducts.length}\n`);

  // 2. Parse CSV and group images by Wix handle
  const csvText = fs.readFileSync(CSV_PATH, "utf8");
  const rows = csvText.trim().split("\n").slice(1).map((line) => {
    const parts = line.split(",");
    return { filename: parts[0], product_name: parts[1], variant: parts[2] };
  });

  const imagesByHandle = {};
  const unknownNames = new Set();

  for (const row of rows) {
    const handle = NAME_TO_HANDLE[row.product_name];
    if (handle === undefined) { unknownNames.add(row.product_name); continue; }
    if (handle === null) continue; // section header — skip
    if (!imagesByHandle[handle]) imagesByHandle[handle] = [];
    const filepath = path.join(IMG_DIR, row.filename);
    if (fs.existsSync(filepath)) imagesByHandle[handle].push({ filename: row.filename, filepath, variant: row.variant });
  }

  // 3. Report matches
  const matched = Object.keys(imagesByHandle).filter((h) => byHandle[h]);
  const noWixMatch = Object.keys(imagesByHandle).filter((h) => !byHandle[h]);
  const wixNoImages = wixProducts.filter((p) => !imagesByHandle[p.handle]);

  console.log(`✅ Products with images ready: ${matched.length}`);
  console.log(`❌ CSV handles with no Wix match: ${noWixMatch.length}`);
  console.log(`⚠️  Wix products with no images: ${wixNoImages.length}`);

  if (unknownNames.size) {
    console.log(`\n⚠️  Unmapped CSV product names (${unknownNames.size}):`);
    for (const n of [...unknownNames].sort()) console.log(`   "${n}"`);
  }

  if (noWixMatch.length) {
    console.log(`\n❌ Handles in CSV not found in Wix:`);
    for (const h of noWixMatch) console.log(`   ${h} (${imagesByHandle[h].length} images)`);
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log("Image counts by product (priority order):");
  const allHandles = [...new Set([...PRIORITY_ORDER, ...matched])];
  for (const h of allHandles) {
    if (!imagesByHandle[h]) continue;
    const p = byHandle[h];
    const label = p ? p.name : `⚠️ ${h} (not in Wix)`;
    console.log(`  ${imagesByHandle[h].length.toString().padStart(3)} images  →  ${label}`);
  }

  if (!DO_UPLOAD) {
    console.log(`\n${"=".repeat(60)}`);
    console.log("Dry run complete. Run with --upload to proceed.");
    console.log("=".repeat(60));
    return;
  }

  // 4. Upload
  console.log(`\n${"=".repeat(60)}`);
  console.log("Starting upload...\n");

  const results = [];
  const orderedHandles = [...new Set([...PRIORITY_ORDER, ...matched])].filter(
    (h) => imagesByHandle[h] && byHandle[h]
  );

  for (const handle of orderedHandles) {
    const product = byHandle[handle];
    const images = imagesByHandle[handle];
    console.log(`\n→ ${product.name} (${images.length} images)`);

    const mediaItems = [];

    for (const img of images) {
      process.stdout.write(`   ${img.filename.slice(0, 50).padEnd(52)} `);
      try {
        // Get upload URL
        const urlResp = await getUploadUrl(img.filename);
        if (!urlResp.uploadUrl) {
          console.log(`❌ no uploadUrl: ${JSON.stringify(urlResp).slice(0, 80)}`);
          continue;
        }

        // Upload file
        const uploadResp = await uploadFile(urlResp.uploadUrl, img.filepath);
        const fileId = uploadResp.file?.id;
        if (!fileId) {
          console.log(`❌ no file.id: ${JSON.stringify(uploadResp).slice(0, 80)}`);
          continue;
        }

        mediaItems.push({ id: fileId, altText: `${product.name} — ${img.variant}` });
        console.log(`✅`);
      } catch (e) {
        console.log(`❌ ${e.message}`);
      }
      await sleep(100);
    }

    if (!mediaItems.length) {
      console.log(`   ⚠️  No images uploaded — skipping product update`);
      results.push({ name: product.name, handle, status: "no_images", count: 0 });
      continue;
    }

    // Update product — all items go into itemsInfo.items; Wix auto-sets media.main from first
    const updateResp = await updateProductMedia(product.id, product.revision, mediaItems);
    if (updateResp.product) {
      console.log(`   ✅ Product updated with ${mediaItems.length} images`);
      results.push({ name: product.name, handle, status: "success", count: mediaItems.length });
    } else {
      console.log(`   ❌ Update failed: ${JSON.stringify(updateResp).slice(0, 150)}`);
      results.push({ name: product.name, handle, status: "error", count: 0, error: JSON.stringify(updateResp) });
    }

    await sleep(300);
  }

  // 5. Final report
  const success = results.filter((r) => r.status === "success");
  const errors  = results.filter((r) => r.status === "error");
  const noImgs  = results.filter((r) => r.status === "no_images");

  console.log(`\n${"=".repeat(60)}`);
  console.log("FINAL REPORT");
  console.log("=".repeat(60));
  console.log(`✅ Success:    ${success.length} products, ${success.reduce((s, r) => s + r.count, 0)} total images`);
  console.log(`❌ Errors:     ${errors.length}`);
  console.log(`⚠️  No images: ${noImgs.length}`);
  if (errors.length) {
    console.log("\nFailed products:");
    for (const r of errors) console.log(`  ${r.name}: ${r.error?.slice(0, 100)}`);
  }
}

main().catch(console.error);
