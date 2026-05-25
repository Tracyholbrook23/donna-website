// ─────────────────────────────────────────────
// Out of Jersey — Static catalog and content data
// ─────────────────────────────────────────────

// ── Navigation groups ─────────────────────────────────────────────────────
// Used by mega-menu and shop sidebar to visually cluster the 15 catalog categories.
export const navGroups = [
  {
    id: "drinkware",
    label: "Drinkware",
    description: "Tumblers in every finish, size, and style — all ready for your name.",
    collections: ["powder-coated-tumblers", "stainless-steel-tumblers", "sublimation-tumblers-blanks"],
  },
  {
    id: "kitchen-bar",
    label: "Kitchen & Bar",
    description: "From charcuterie to cocktail hour — pieces built for the table.",
    collections: ["cutting-boards", "marble-wood", "gourmet-knife-set", "grill-bbq", "decanters-sets"],
  },
  {
    id: "gifts-accessories",
    label: "Gifts & Accessories",
    description: "The kind of gifts people keep for years.",
    collections: ["wood-boxes", "wood-pendant-jewelry", "laserette", "pocket-knives", "pens-pencils"],
  },
  {
    id: "specialty",
    label: "Specialty & Blanks",
    description: "Tools, crafts, and custom blanks — for every occasion.",
    collections: ["hammer-set", "acrylics"],
  },
] as const;

export type NavGroupId = typeof navGroups[number]["id"];

// ── The 15 product categories — exactly matching the wholesale catalog ────
// group     = navGroups id (for mega-menu clustering)
// wixId     = Wix collection _id (confirmed in Wix dashboard)
// featured  = recommended number of products to upload first for launch-readiness
// kicker    = short descriptor shown in mega-menu and shop filters
export const collections = [
  // ── DRINKWARE ──────────────────────────────────────────────────────────────
  {
    id: "powder-coated-tumblers",
    name: "Powder Coated Tumblers",
    wixId: "8e30eb08-07c8-4828-bf7d-024e27b05773",
    group: "drinkware",
    featured: 4,
    kicker: "Bold colors, 20oz–40oz, all finishes",
    sortOrder: 1,
  },
  {
    id: "stainless-steel-tumblers",
    name: "Stainless Steel Tumblers",
    wixId: "d266a14f-d114-4811-9a2d-10e1512ee0b6",
    group: "drinkware",
    featured: 4,
    kicker: "Classic steel, every size",
    sortOrder: 2,
  },
  {
    id: "sublimation-tumblers-blanks",
    name: "Sublimation Tumblers & Blanks",
    wixId: "cf51cdf0-bce9-43ce-931c-9483b0f0801f",
    group: "drinkware",
    featured: 3,
    kicker: "Full-color sublimation-ready",
    sortOrder: 3,
  },
  // ── KITCHEN & BAR ─────────────────────────────────────────────────────────
  {
    id: "cutting-boards",
    name: "Cutting Boards",
    wixId: "5bd92e78-f534-4c55-939f-8b5ff36d61a4",
    group: "kitchen-bar",
    featured: 3,
    kicker: "Bamboo, walnut, maple — made to engrave",
    sortOrder: 4,
  },
  {
    id: "marble-wood",
    name: "Marble & Wood",
    wixId: "84f4fa7a-2766-4e07-94e7-bc05dd6393fe",
    group: "kitchen-bar",
    featured: 3,
    kicker: "Charcuterie sets, serving boards, desk pieces",
    sortOrder: 5,
  },
  {
    id: "gourmet-knife-set",
    name: "Gourmet Knife Set",
    wixId: "0f86c184-e302-4f2a-a5b9-7fb65141d9e7",
    group: "kitchen-bar",
    featured: 1,
    kicker: "Full-tang set with engraved stand",
    sortOrder: 6,
  },
  {
    id: "grill-bbq",
    name: "Grill & BBQ",
    wixId: "f86d875b-a491-4f4d-b47b-e1bcfd88bffb",
    group: "kitchen-bar",
    featured: 2,
    kicker: "For the backyard chef",
    sortOrder: 7,
  },
  {
    id: "decanters-sets",
    name: "Decanters & Sets",
    wixId: "332f3f58-6bd5-4cf2-a6a3-ba3c680bd776",
    group: "kitchen-bar",
    featured: 2,
    kicker: "Whiskey glasses, decanters & gift sets",
    sortOrder: 8,
  },
  // ── GIFTS & ACCESSORIES ───────────────────────────────────────────────────
  {
    id: "wood-boxes",
    name: "Wood Boxes",
    wixId: "28716efe-8ff6-46c5-9ff9-759a91d1674a",
    group: "gifts-accessories",
    featured: 3,
    kicker: "Memory boxes, cigar boxes, valet boxes",
    sortOrder: 9,
  },
  {
    id: "wood-pendant-jewelry",
    name: "Wood Pendant Jewelry",
    wixId: "b5043d32-becc-465b-a1f1-f00e1e4f80c2",
    group: "gifts-accessories",
    featured: 3,
    kicker: "Wearable keepsakes — hearts, circles, bars",
    sortOrder: 10,
  },
  {
    id: "laserette",
    name: "Laserette™",
    wixId: "aa1ab6f6-d508-4467-b2b6-f2ee9ae89d1c",
    group: "gifts-accessories",
    featured: 4,
    kicker: "Wallets, journals, keychains & more",
    sortOrder: 11,
  },
  {
    id: "pocket-knives",
    name: "Pocket Knives",
    wixId: "4bfd4a69-8df9-42ba-9f08-b9e340a6841d",
    group: "gifts-accessories",
    featured: 2,
    kicker: "Natural, rosewood & black metal",
    sortOrder: 12,
  },
  {
    id: "pens-pencils",
    name: "Pens & Pencils",
    wixId: "7515d62a-2ed4-4fec-a8fe-6a9180a441d5",
    group: "gifts-accessories",
    featured: 2,
    kicker: "Stylus gel pens & mechanical pencils",
    sortOrder: 13,
  },
  // ── SPECIALTY & BLANKS ────────────────────────────────────────────────────
  {
    id: "hammer-set",
    name: "Hammer Set",
    wixId: "faaa201b-f309-4e15-8a7f-f8fdd727217f",
    group: "specialty",
    featured: 1,
    kicker: "16oz engraved hammer set — unique gift",
    sortOrder: 14,
  },
  {
    id: "acrylics",
    name: "Acrylics",
    wixId: "9d3eab66-cad4-48be-a7d9-6b57471a38b9",
    group: "specialty",
    featured: 3,
    kicker: "Shaped blanks — circles, hearts, stars & more",
    sortOrder: 15,
  },
] as const;

export type CollectionId = typeof collections[number]["id"];

export const testimonials: ReadonlyArray<{
  quote: string;
  name: string;
  role: string;
  rating: number;
}> = [];

export const faqs = [
  {
    q: "How does personalization work?",
    a: "On every product page, you'll see a 'Make it yours' panel. Type your text, choose a font and a placement, and watch a live preview update in real time. Want something more complex — a family crest, a hand-drawn sketch, a logo? Send a custom request and replies within 24 hours.",
  },
  {
    q: "How long does an order take?",
    a: "Stock pieces with personalization ship in 3–5 business days. Fully custom commissions take 2–3 weeks depending on scope. Holiday and wedding rushes — talk to me directly and we'll work it out.",
  },
  {
    q: "Can I see a proof before you engrave?",
    a: "For custom commissions over $100 and any monogrammed bulk order (10+), you'll receive a digital proof within 48 hours. I don't touch the laser until you sign off.",
  },
  {
    q: "Do you ship outside the US?",
    a: "Yes — to Canada, the UK, the EU, and a growing list of countries. Shipping calculates at checkout. Wood and glass items are insured.",
  },
  {
    q: "Returns and exchanges?",
    a: "Stock items can be returned within 30 days, unused, in original packaging. Personalized or custom items can't be returned (they're made for you), but if there's a defect or I made a mistake, I make it right — no questions.",
  },
  {
    q: "Can you do corporate or bulk orders?",
    a: "Yes, and I love them. Branded tumblers for new hires, monogrammed boards for client gifts, wedding party sets of 20+ — fill out the corporate inquiry form or email me directly.",
  },
  {
    q: "What materials do you work with?",
    a: "Black walnut, white oak, acacia, leather (full-grain, vegetable-tanned), powder-coated steel tumblers, lead-free crystal, ceramic, and select metals. I source small and U.S.-first whenever I can.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Every order ships in kraft and twine with a hand-written card at no charge. Add a velvet pouch or wooden gift box for $8 at checkout.",
  },
] as const;

export const engravingFonts = [
  { id: "fraunces",        label: "Editorial Serif", css: "var(--font-display)",                              italic: false, weight: 500 },
  { id: "fraunces-italic", label: "Italic Script",   css: "var(--font-display)",                              italic: true,  weight: 400 },
  { id: "monogram",        label: "Monogram",        css: "'Cormorant Garamond', var(--font-display), serif",  italic: false, weight: 600, monogram: true },
  { id: "block",           label: "Block Caps",      css: "var(--font-body)",                                 italic: false, weight: 800, caps: true },
  { id: "sans",            label: "Modern Sans",     css: "var(--font-body)",                                 italic: false, weight: 500 },
] as const;

export type EngravingFont = typeof engravingFonts[number];

export const engravingStyles = [
  { id: "etch",  label: "Etched",   desc: "Light surface scoring, subtle and soft." },
  { id: "deep",  label: "Deep cut", desc: "Burned-through, high contrast." },
  { id: "fill",  label: "Filled",   desc: "Engraved and color-filled in brass or white." },
] as const;

export const engravingPlacements = [
  { id: "front-center", label: "Front, centered" },
  { id: "front-bottom", label: "Front, bottom" },
  { id: "side",         label: "Side wrap" },
  { id: "underneath",   label: "Underneath (boards)" },
] as const;

export const policies = [
  {
    id: "shipping",
    title: "Shipping",
    intro: "How fast, how it's packed, how to track it.",
    sections: [
      {
        h: "Processing time",
        p: "Stock items with personalization: 3–5 business days. Made-to-order and commissions: 2–3 weeks. You'll see your specific lead time on the product page and confirmed in your order email.",
      },
      {
        h: "Carriers and rates",
        p: "USPS Priority for small parcels, UPS Ground for boards and decanter sets, FedEx for international. Rates calculate live at checkout. Free shipping on US orders over $125.",
      },
      {
        h: "How it's packed",
        p: "Recycled kraft, biodegradable cushion, twine, and a hand-written card. Wood and glass pieces ship in molded paper pulp inside double-walled cartons.",
      },
      {
        h: "Tracking and insurance",
        p: "Every order ships tracked. Fragile pieces (glass, decanters, ceramic) ship insured by default. If something arrives damaged, send photos within 48 hours and we'll replace it.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    intro: "The fair version, not the long version.",
    sections: [
      {
        h: "Stock items",
        p: "Unused, in original packaging — return within 30 days for a full refund minus return shipping. Email hello@outofjersey.com for a return label.",
      },
      {
        h: "Personalized & custom",
        p: "Personalized items can't be returned — they're made for you. If I made a mistake (wrong spelling, wrong placement, defect), I replace it free. No questions, no proof needed.",
      },
      {
        h: "Damaged in transit",
        p: "Photos within 48 hours of delivery — I'll replace it, no return needed. Insured carriers reimburse me, not you.",
      },
      {
        h: "Gift returns",
        p: "Recipient can exchange unpersonalized stock pieces for store credit without involving the gift-giver.",
      },
    ],
  },
  {
    id: "custom",
    title: "Custom Order Policy",
    intro: "How commissions and bulk orders work.",
    sections: [
      {
        h: "How to start",
        p: "Use the custom request form, email a brief, or DM on Instagram. Include: what the gift is for, recipient, deadline, budget, and any imagery or text.",
      },
      {
        h: "Quote and timeline",
        p: "I respond within 24 hours with a quote and timeline. Quotes are valid for 14 days. 50% deposit reserves your slot in the studio queue.",
      },
      {
        h: "Proofs and revisions",
        p: "Two rounds of revisions included. Additional rounds are $25 each. I won't engrave until you sign off — protect both of us.",
      },
      {
        h: "Rush orders",
        p: "Rushes available for an additional 25% depending on studio load. Ask before assuming — sometimes I have capacity, sometimes I genuinely don't.",
      },
      {
        h: "IP and originality",
        p: "You own what you commission. I keep a low-res photo for portfolio unless you ask me not to. I won't reuse your design.",
      },
    ],
  },
] as const;

export const announcementMessages = [
  "Free US shipping on orders over $125",
  "Custom commissions open — 2 slots left in November",
  "Woman owned & operated · Custom laser engraving out of New Jersey",
];

// Lifestyle photos — real Out of Jersey product photography
export const lifestyleScenes = [
  {
    id: "ls-bff",
    caption: "BFF tumblers — because some bonds deserve a permanent mark",
    tag: "TUMBLERS",
    src: "/photos/bff-tumblers.jpg",
  },
  {
    id: "ls-wedding-board",
    caption: "The Wilsons' first board — wedding gift, forever keepsake",
    tag: "WEDDING",
    src: "/photos/wedding-board-couple.jpg",
  },
  {
    id: "ls-family-boards",
    caption: "Engraved family boards — Sunday dinners, made personal",
    tag: "BOARDS",
    src: "/photos/cutting-boards-family.jpg",
  },
  {
    id: "ls-whiskey-bar",
    caption: "Monogrammed whiskey glasses — Father's Day, second pour",
    tag: "HOME",
    src: "/photos/whiskey-glasses-bar.jpg",
  },
  {
    id: "ls-knife",
    caption: "Through Thick & Thin — a knife engraved for the journey",
    tag: "ACCESSORIES",
    src: "/photos/knife-engraved.jpg",
  },
  {
    id: "ls-artwork-tumbler",
    caption: "Custom artwork tumbler — your vision, laser-precise",
    tag: "CUSTOM",
    src: "/photos/custom-artwork-tumbler.jpg",
  },
] as const;

// Gift occasions — for the "Shop by Moment" homepage section
// hrefs point to real collection IDs that exist in the 15-category architecture
export const giftOccasions = [
  {
    id: "wedding",
    label: "Wedding & Bridal",
    kicker: "Boards, boxes & forever pieces",
    src: "/photos/wedding-board-couple.jpg",
    href: "/shop?collection=cutting-boards",
    accent: "var(--blush)",
  },
  {
    id: "fathersday",
    label: "Gifts for Him",
    kicker: "Whiskey sets, knives, wallets",
    src: "/photos/whiskey-glasses-bar.jpg",
    href: "/shop?collection=decanters-sets",
    accent: "var(--cream-3)",
  },
  {
    id: "birthday",
    label: "Birthday & Milestones",
    kicker: "Tumblers, boxes, keepsakes",
    src: "/photos/bff-tumblers.jpg",
    href: "/shop?collection=powder-coated-tumblers",
    accent: "var(--brass-light)",
  },
  {
    id: "corporate",
    label: "Corporate & Bulk",
    kicker: "Branded gifts at scale",
    src: "/photos/keychain-business.jpg",
    href: "/custom",
    accent: "var(--forest)",
  },
  {
    id: "custom-art",
    label: "Custom Artwork",
    kicker: "Your design, laser engraved",
    src: "/photos/custom-artwork-tumbler.jpg",
    href: "/custom",
    accent: "var(--terracotta)",
  },
] as const;

export const customOrderTypes = [
  { id: "corporate", label: "Corporate / Bulk gifting",  desc: "10+ matching pieces, branded or monogrammed." },
  { id: "wedding",   label: "Wedding party set",         desc: "Bridesmaids, groomsmen, parents, favors." },
  { id: "family",    label: "Family heirloom",           desc: "One-off piece. Family tree, crest, custom artwork." },
  { id: "logo",      label: "Logo or brand engraving",   desc: "Your business mark on tumblers, boards, leather." },
  { id: "sketch",    label: "From a sketch",             desc: "You draw it, I engrave it. Kids' art, signatures, handwriting." },
  { id: "other",     label: "Something else",            desc: "Describe it in the brief. replies within 24 hours." },
] as const;
