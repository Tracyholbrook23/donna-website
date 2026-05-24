// ─────────────────────────────────────────────
// Out of Jersey — Static catalog and content data
// ─────────────────────────────────────────────

// wixId = Wix collection _id (from Wix dashboard). Empty string = category exists in Wix but has no products yet.
export const collections = [
  // ── Categories with products ──────────────────────────────────────────────
  { id: "stainless-steel-tumblers",       name: "Stainless Steel Tumblers",       wixId: "d266a14f-d114-4811-9a2d-10e1512ee0b6", count: 30, kicker: "Classic steel, personalized" },
  { id: "powder-coated-tumblers",         name: "Powder Coated Tumblers",         wixId: "8e30eb08-07c8-4828-bf7d-024e27b05773", count: 22, kicker: "Bold colors, built to engrave" },
  { id: "acrylic-blanks",                 name: "Acrylic Blanks",                 wixId: "9d3eab66-cad4-48be-a7d9-6b57471a38b9", count: 10, kicker: "Ready to personalize" },
  { id: "wood-pendant-jewelry",           name: "Wood Pendant Jewelry",           wixId: "b5043d32-becc-465b-a1f1-f00e1e4f80c2", count: 7,  kicker: "Wearable keepsakes" },
  { id: "wood-boxes",                     name: "Wood Boxes",                     wixId: "28716efe-8ff6-46c5-9ff9-759a91d1674a", count: 6,  kicker: "Gifts worth keeping" },
  { id: "cutting-boards",                 name: "Cutting Boards",                 wixId: "5bd92e78-f534-4c55-939f-8b5ff36d61a4", count: 5,  kicker: "For the table you set" },
  { id: "pocket-knives",                  name: "Pocket Knives",                  wixId: "4bfd4a69-8df9-42ba-9f08-b9e340a6841d", count: 1,  kicker: "Sharp and personal" },
  // ── Coming soon (wixId = "" until products are assigned in Wix dashboard) ─
  { id: "tumblers",                       name: "Tumblers",                       wixId: "", count: 0, kicker: "Custom drinkware" },
  { id: "glassware",                      name: "Glassware",                      wixId: "", count: 0, kicker: "Etched to impress" },
  { id: "wood-acrylic",                   name: "Wood & Acrylic",                 wixId: "", count: 0, kicker: "Natural meets modern" },
  { id: "marble-wood",                    name: "Marble & Wood",                  wixId: "84f4fa7a-2766-4e07-94e7-bc05dd6393fe", count: 0, kicker: "Timeless materials" },
  { id: "gourmet-knife-sets",             name: "Gourmet Knife Sets",             wixId: "0f86c184-e302-4f2a-a5b9-7fb65141d9e7", count: 0, kicker: "Knives worth engraving" },
  { id: "bbq-grill",                      name: "BBQ & Grill",                    wixId: "f86d875b-a491-4f4d-b47b-e1bcfd88bffb", count: 0, kicker: "For the backyard chef" },
  { id: "decanters-sets",                 name: "Decanters & Sets",               wixId: "332f3f58-6bd5-4cf2-a6a3-ba3c680bd776", count: 0, kicker: "For whiskey lovers" },
  { id: "laserette-products",             name: "Laserette Products",             wixId: "c7401104-3241-408a-afa0-449db6800110", count: 0, kicker: "Compact and creative" },
  { id: "pens-pencils",                   name: "Pens & Pencils",                 wixId: "7515d62a-2ed4-4fec-a8fe-6a9180a441d5", count: 0, kicker: "Writing, personalized" },
  { id: "sublimation-products",           name: "Sublimation Products",           wixId: "", count: 0, kicker: "Vivid and lasting" },
  { id: "gourmet-kitchen",                name: "Gourmet Kitchen",                wixId: "1f2895ed-59c6-4301-89e0-d6139614c269", count: 0, kicker: "Elevate the kitchen" },
  { id: "laserette-tm",                   name: "Laserette™",                     wixId: "aa1ab6f6-d508-4467-b2b6-f2ee9ae89d1c", count: 0, kicker: "Precision in every mark" },
  { id: "sublimation-tumblers-blanks",    name: "Sublimation Tumblers & Blanks",  wixId: "cf51cdf0-bce9-43ce-931c-9483b0f0801f", count: 0, kicker: "Ready for color" },
  { id: "utility",                        name: "Utility",                        wixId: "faaa201b-f309-4e15-8a7f-f8fdd727217f", count: 0, kicker: "Tools with a personal touch" },
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
export const giftOccasions = [
  {
    id: "wedding",
    label: "Wedding & Bridal",
    kicker: "Boards, flutes, and forever pieces",
    src: "/photos/wedding-board-couple.jpg",
    href: "/shop?collection=wedding",
    accent: "var(--blush)",
  },
  {
    id: "fathersday",
    label: "Gifts for Him",
    kicker: "Whiskey sets, knives, wallets",
    src: "/photos/whiskey-glasses-bar.jpg",
    href: "/shop?collection=home",
    accent: "var(--cream-3)",
  },
  {
    id: "birthday",
    label: "Birthday & Milestones",
    kicker: "Tumblers, boards, keepsakes",
    src: "/photos/bff-tumblers.jpg",
    href: "/shop?collection=tumblers",
    accent: "var(--brass-light)",
  },
  {
    id: "corporate",
    label: "Corporate & Bulk",
    kicker: "Branded gifts at scale",
    src: "/photos/keychain-business.jpg",
    href: "/shop?collection=corporate",
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
