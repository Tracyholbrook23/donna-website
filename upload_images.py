#!/usr/bin/env python3
"""
Out of Jersey — Wix Product Image Upload Script
Uploads 552 images from named_images/ to Wix products using the V3 REST API.
Uses subprocess+curl since direct Python HTTP is restricted in the shell sandbox.
"""

import subprocess, json, csv, os, sys, time
from collections import defaultdict

# ── Config ────────────────────────────────────────────────────────────────────
API_KEY  = "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjdlYjUyOGQyLWI2NTYtNDVlYS1hYjM1LWI4NmEzODg4MTMwN1wiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLCJpZCI6IjIxNTdmYTNjLTI2NTgtNDczYy05YTZmLTA5N2IzZTM1MWQ3ZiJ9LCJ0ZW5hbnQiOnsidHlwZSI6ImFjY291bnQiLCJpZCI6ImIzNWNjYmJhLWE2NGItNDllNC05ZDJmLWIzODYwMzhmNzMwNSJ9fSIsImlhdCI6MTc3OTY2NjE1N30.bJSbDZEXV5vP4bO9aH3VkvsTTqser9qALkkoYBKjJ-q_2QqN_oh6Jnwg0fdPmycOldpQuQVh8u2cIEqOTJyqQkQAK0p2awF5nTx8RhWGZidM6RaHnJyOzZD_Cpt8qbp4zOoXf2ULOL1U0IilDABEnoacHHNoFPBaMYJUgUF-H3m8Ctk0XLo1QglYpW-PvxWKbJmyyFrxGTclDeCjqMIsZlr5w2j4aejLkc3p98h0qvjEunaR0oiRj9bvwIiRotz9pPZm2RXJeTwhnTB5gXsbUEvv_UGfihPvN3rn3P3X3Ofb3RerYFjKfnXANqe6AlRJ7Y8TBwHSWrHvFBOvY3Kd8g"
SITE_ID  = "83659408-cb38-4d42-9c73-a41a96d9294f"
BASE_DIR = "/sessions/kind-blissful-ptolemy/mnt/donna-website"
IMG_DIR  = os.path.join(BASE_DIR, "named_images")
CSV_PATH = os.path.join(BASE_DIR, "image_mapping.csv")

HEADERS  = ["-H", f"Authorization: {API_KEY}", "-H", f"wix-site-id: {SITE_ID}", "-H", "Content-Type: application/json"]
PRODUCTS_URL = "https://www.wixapis.com/stores/v3/products/query"

# ── Helpers ───────────────────────────────────────────────────────────────────
def curl_post(url, body):
    cmd = ["curl", "-s", "-X", "POST", url] + HEADERS + ["-d", json.dumps(body)]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(result.stdout)
    except:
        print("  ERROR parsing response:", result.stdout[:300])
        return {}

def curl_patch(url, body):
    cmd = ["curl", "-s", "-X", "PATCH", url] + HEADERS + ["-d", json.dumps(body)]
    result = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(result.stdout)
    except:
        print("  ERROR:", result.stdout[:200])
        return {}

def upload_image_curl(filepath, filename):
    """Upload image to Wix Media Manager. Returns wix media URL or None."""
    # Step 1: Get upload URL
    upload_url_body = {"mimeType": "image/jpeg", "fileName": filename}
    cmd = ["curl", "-s", "-X", "POST",
           "https://www.wixapis.com/media/v1/files/generate-file-upload-url",
           "-H", f"Authorization: {API_KEY}",
           "-H", f"wix-site-id: {SITE_ID}",
           "-H", "Content-Type: application/json",
           "-d", json.dumps(upload_url_body)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        resp = json.loads(r.stdout)
    except:
        return None, r.stdout[:200]
    
    if "uploadUrl" not in resp:
        return None, f"No uploadUrl: {r.stdout[:200]}"
    
    upload_url = resp["uploadUrl"]
    
    # Step 2: PUT file to upload URL
    cmd2 = ["curl", "-s", "-X", "PUT", upload_url,
            "-H", "Content-Type: image/jpeg",
            "--data-binary", f"@{filepath}"]
    r2 = subprocess.run(cmd2, capture_output=True, text=True)
    try:
        resp2 = json.loads(r2.stdout)
        file_url = resp2.get("fileUrl") or resp2.get("url") or resp2.get("wixUrl")
        return file_url, None
    except:
        return None, r2.stdout[:200]

# ── Step 1: Fetch ALL Wix products ───────────────────────────────────────────
print("Fetching all Wix products...")
all_products = []
cursor = None

while True:
    if cursor:
        body = {"query": {"cursorPaging": {"limit": 100, "cursor": cursor}}}
    else:
        body = {"query": {"paging": {"limit": 100}}}
    
    data = curl_post(PRODUCTS_URL, body)
    products = data.get("products", [])
    all_products.extend(products)
    meta = data.get("pagingMetadata", {})
    print(f"  Got {len(products)} products (total: {len(all_products)}), hasNext: {meta.get('hasNext')}")
    
    if not meta.get("hasNext") or not products:
        break
    cursor = meta.get("cursors", {}).get("next")
    if not cursor:
        break
    time.sleep(0.2)

print(f"Total Wix products: {len(all_products)}\n")

# Build handle → {id, name, revision} map
wix_by_handle = {p["handle"]: {"id": p["id"], "name": p["name"], "revision": p["revision"]} for p in all_products}

# ── Step 2: Load CSV and group images by wix_product_handle ──────────────────
print("Loading image mapping CSV...")
images_by_handle = defaultdict(list)
handle_map = {}  # csv_handle → wix_handle (some need remapping)

with open(CSV_PATH, newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        csv_handle = row["wix_product_handle"]
        filename   = row["filename"]
        variant    = row["variant_color_or_view"]
        
        # Skip the cover image
        if csv_handle == "cover":
            continue
        
        # Convert CSV handle format (underscores) to Wix handle format (hyphens)
        # Also handle specific renames
        wix_handle = csv_handle.replace("_", "-")
        
        # Known handle remappings (CSV → Wix)
        remaps = {
            "20oz-regular-tumbler":           "20oz-regular",
            "20oz-regular-tumbler-with-handle": "20oz-regular-with-handle",
            "20oz-regular-handle":            "20oz-regular-handle-only",
            "20oz-skinny-tumbler":            "20oz-skinny",
            "20oz-skinny-tumbler-with-handle": "20oz-skinny-with-handle",
            "20oz-skinny-handle":             "20oz-skinny-handle-only",
            "30oz-and-40oz-replacement-handle": "30-40oz-handle",
            "12oz-wine-tumbler":              "12oz-wine-pc",
            "16oz-hammer-set":                "hammer-set",
            "4-glass-decanter-set":           "decanter-set-4",
            "2-glass-decanter-set":           "decanter-set-2",
            "laserette-passport-wallet":      "laserette-passport",
            "laserette-magnetic-bottle-opener-coaster": "laserette-coaster",
            "laserette-luggage-tag":          "laserette-luggage",
            "laserette-journal-notebook":     "laserette-journal",
            "laserette-motel-keychain":       "laserette-keychain",
            "laserette-bifold-wallet":        "laserette-bifold",
            "pocket-knife-rosewood":          "pocket-knife",
            "pocket-knife-natural":           "pocket-knife",
            "pocket-knife-black-metal":       "pocket-knife",
            "stylus-gel-pen":                 "stylus-pen",
            "mechanical-pencil":              "mech-pencil",
            "bbq-grill-set":                  "bbq-11pc",
            "11pc-bbq-grill-set":             "bbq-11pc",
            "8pc-smash-burger-set":           "bbq-smash",
            "gourmet-knife-set":              "knife-set",
        }
        
        wix_handle = remaps.get(wix_handle, wix_handle)
        images_by_handle[wix_handle].append({"filename": filename, "variant": variant})

print(f"Images grouped into {len(images_by_handle)} product handles\n")

# ── Step 3: Match and report before uploading ─────────────────────────────────
matched = []
unmatched_handles = []

for wix_handle, imgs in images_by_handle.items():
    if wix_handle in wix_by_handle:
        matched.append((wix_handle, imgs))
    else:
        unmatched_handles.append((wix_handle, len(imgs)))

print(f"✅ Matched: {len(matched)} products")
print(f"❌ Unmatched CSV handles ({len(unmatched_handles)}):")
for h, n in sorted(unmatched_handles):
    print(f"   {h} ({n} images)")

# Check which Wix products have NO images in CSV
csv_handles = set(images_by_handle.keys())
wix_no_images = [p for p in all_products if p["handle"] not in csv_handles]
print(f"\n⚠️  Wix products with no matching images ({len(wix_no_images)}):")
for p in wix_no_images:
    print(f"   {p['name']} ({p['handle']})")

print("\n" + "="*60)
print("Ready to upload. Run with --upload flag to proceed.")
print("="*60)

# ── Step 4: Upload (only if --upload flag passed) ─────────────────────────────
if "--upload" not in sys.argv:
    sys.exit(0)

print("\n🚀 Starting upload...\n")

# Priority order
PRIORITY_GROUPS = [
    ("Powder Coated Tumblers", ["20oz-regular", "20oz-regular-with-handle", "20oz-regular-handle-only",
                                 "20oz-skinny", "20oz-skinny-with-handle", "20oz-skinny-handle-only",
                                 "30oz-tumbler", "30oz-tumbler-with-handle", "30-40oz-handle",
                                 "30oz-gold-electro", "30oz-rainbow-electro",
                                 "32oz-hydro-bottle", "32oz-hydro-gold-electro", "32oz-hydro-rainbow-electro",
                                 "40oz-tumbler", "40oz-tumbler-with-handle",
                                 "20oz-regular-gold-electro", "20oz-regular-rainbow-electro",
                                 "20oz-skinny-gold-electro", "20oz-skinny-rainbow-electro",
                                 "12oz-wine-pc", "12oz-camper"]),
    ("Laserette",              ["laserette-passport", "laserette-coaster", "laserette-bifold",
                                 "laserette-luggage", "laserette-journal", "laserette-keychain"]),
    ("Wood Boxes",             ["large-valet-box", "medium-valet-box", "xl-memory-box",
                                 "large-memory-box", "medium-box", "cigar-box"]),
    ("Decanters & Sets",       ["decanter-set-4", "decanter-set-2", "whiskey-rocks-glass",
                                 "decanter-tri", "decanter-rect", "decanter-square"]),
    ("Marble & Wood",          ["mw-desk-nameplate", "mw-pen-holder", "mw-photo-frame",
                                 "mw-heart-board", "mw-cutting-board-juice", "mw-coaster-set",
                                 "mw-serving-board", "mw-charcuterie"]),
    ("Cutting Boards",         ["cb-maple-usa", "cb-arizona", "cb-walnut", "cb-rubberwood", "cb-bamboo"]),
    ("Everything else",        None),  # None = all remaining
]

results = []
processed_handles = set()

for group_name, handles in PRIORITY_GROUPS:
    if handles is None:
        # Everything not yet processed
        handles = [h for h in images_by_handle.keys() if h not in processed_handles and h in wix_by_handle]
    else:
        handles = [h for h in handles if h in images_by_handle and h in wix_by_handle]
    
    print(f"\n📦 {group_name} ({len(handles)} products)")
    
    for wix_handle in handles:
        if wix_handle in processed_handles:
            continue
        processed_handles.add(wix_handle)
        
        product = wix_by_handle[wix_handle]
        imgs = images_by_handle[wix_handle]
        print(f"  → {product['name']} ({len(imgs)} images)...")
        
        # Upload each image and collect media items
        media_items = []
        for img_info in imgs:
            filepath = os.path.join(IMG_DIR, img_info["filename"])
            if not os.path.exists(filepath):
                print(f"    ⚠️  File missing: {img_info['filename']}")
                continue
            
            wix_url, err = upload_image_curl(filepath, img_info["filename"])
            if err:
                print(f"    ❌ Upload failed for {img_info['filename']}: {err}")
                continue
            if wix_url:
                media_items.append({"image": {"url": wix_url, "altText": product["name"]}})
                print(f"    ✅ {img_info['filename']} → {wix_url[:60]}...")
            time.sleep(0.1)
        
        if not media_items:
            print(f"    ⚠️  No images uploaded for {product['name']}")
            results.append({"product": product["name"], "handle": wix_handle, "status": "no_images", "count": 0})
            continue
        
        # Update product with media
        patch_url = f"https://www.wixapis.com/stores/v3/products/{product['id']}"
        patch_body = {
            "product": {
                "revision": product["revision"],
                "media": {"items": media_items}
            },
            "fieldMask": "media"
        }
        resp = curl_patch(patch_url, patch_body)
        
        if resp.get("product"):
            print(f"    ✅ Product updated with {len(media_items)} images")
            results.append({"product": product["name"], "handle": wix_handle, "status": "success", "count": len(media_items)})
        else:
            print(f"    ❌ Update failed: {json.dumps(resp)[:200]}")
            results.append({"product": product["name"], "handle": wix_handle, "status": "error", "count": 0, "error": str(resp)})
        
        time.sleep(0.2)

# ── Final Report ──────────────────────────────────────────────────────────────
print("\n" + "="*60)
print("FINAL REPORT")
print("="*60)
success = [r for r in results if r["status"] == "success"]
errors  = [r for r in results if r["status"] == "error"]
no_imgs = [r for r in results if r["status"] == "no_images"]
print(f"✅ Success:    {len(success)} products, {sum(r['count'] for r in success)} total images")
print(f"❌ Errors:     {len(errors)}")
print(f"⚠️  No images: {len(no_imgs)}")
if errors:
    print("\nErrors:")
    for r in errors:
        print(f"  {r['product']}: {r.get('error','')[:100]}")
