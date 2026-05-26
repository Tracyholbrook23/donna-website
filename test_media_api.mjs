/**
 * Final verification: single unique id, fieldMask "media.itemsInfo.items"
 * Run: node test_media_api.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const API_KEY = process.env.WIX_API_KEY ||
  "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjkwOTAwZWU4LTBhZDItNGE3MS05ODRmLWFmMTYxMmMzNmNmNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImU1Mzg3MzFkLTY3NWQtNDNlNi1hNDU2LTVmMDk3MjY1MzZmOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMzVjY2JiYS1hNjRiLTQ5ZTQtOWQyZi1iMzg2MDM4ZjczMDVcIn19IiwiaWF0IjoxNzc5NzU2NzYzfQ.OPC1jVfc-9SYwB-JklXHMeET46_VTJh1zQJBhmyiOkPabLm6oarqZ_y_pJIhxEYmkdN2lnl-b4VxecRuGeeWGIdcwOlSXhtbuzRe51SUpNY6wws7UfUIuEVHnD2IOyt8-U10v7OvoNyWuQZPodJO48h_0HLZTmLBEPlQtgy79xFbv7p57Y3-ri5GJZR-Rk5s7eMfcTVohrRXtvC-WzCcxArKi34e9rGJlXp075S3uYgwWehkRtR6tFYCw_ocAEOk3qEqFY-YYpNhWngBGQ5VwRbBOFzFIZ48B4x3CHNhqf10bGslSgBjlpIORBUAtiagU_xcL7sJfk8iQWTw2lH0Gw";

const SITE_ID = "83659408-cb38-4d42-9c73-a41a96d9294f";
const HEADERS = { "Authorization": API_KEY, "wix-site-id": SITE_ID, "Content-Type": "application/json" };
const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR  = path.join(BASE_DIR, "named_images");
const PRODUCT_ID = "18861b20-8390-4faf-b123-c0f039d0f6fd";

// Upload TWO different images so we have two unique file IDs
async function uploadImage(filename) {
  const filePath = path.join(IMG_DIR, filename);
  const urlRes = await fetch("https://www.wixapis.com/site-media/v1/files/generate-upload-url", {
    method: "POST", headers: HEADERS,
    body: JSON.stringify({ mimeType: "image/jpeg", displayName: filename }),
  });
  const { uploadUrl } = await urlRes.json();
  const buf = fs.readFileSync(filePath);
  const putRes = await fetch(`${uploadUrl}?filename=${encodeURIComponent(filename)}`, {
    method: "PUT", headers: { "Content-Type": "image/jpeg" }, body: buf,
  });
  const data = await putRes.json();
  return { id: data.file.id, url: data.file.url, filename };
}

// Pick two different images
const files = fs.readdirSync(IMG_DIR).filter(f => f.endsWith(".jpeg")).slice(0, 2);
console.log(`Uploading: ${files.join(", ")}`);
const [img1, img2] = await Promise.all(files.map(uploadImage));
console.log(`img1 id: ${img1.id}`);
console.log(`img2 id: ${img2.id}\n`);

// Get product revision
const qr = await fetch("https://www.wixapis.com/stores/v3/products/query", {
  method: "POST", headers: HEADERS,
  body: JSON.stringify({ query: { filter: { id: PRODUCT_ID } } }),
});
const product = (await qr.json()).products?.[0];
console.log(`Product revision: ${product.revision}`);

// PATCH with two unique ids
const patchRes = await fetch(`https://www.wixapis.com/stores/v3/products/${PRODUCT_ID}`, {
  method: "PATCH", headers: HEADERS,
  body: JSON.stringify({
    product: {
      revision: product.revision,
      media: {
        itemsInfo: {
          items: [
            { id: img1.id, altText: "Image 1" },
            { id: img2.id, altText: "Image 2" },
          ],
        },
      },
    },
    fieldMask: "media.itemsInfo.items",
  }),
});
const patchData = await patchRes.json();
console.log(`\nPATCH status: ${patchRes.status}`);
if (patchData.details) console.log(`Error: ${JSON.stringify(patchData.details).slice(0,200)}`);

// Re-fetch and check
const gr = await fetch(`https://www.wixapis.com/stores/v3/products/${PRODUCT_ID}`, {
  method: "GET", headers: HEADERS,
});
const media = (await gr.json()).product?.media;
const n = media?.itemsInfo?.items?.length ?? 0;
console.log(`\nItems saved: ${n}`);
console.log(`main: ${JSON.stringify(media?.main)}`);
if (n > 0) {
  console.log(`\n✅ IT WORKS! items: ${JSON.stringify(media.itemsInfo.items, null, 2)}`);
} else {
  console.log(`\n❌ Still not saving. Full media: ${JSON.stringify(media)}`);
}
