// ─────────────────────────────────────────────
//  Donna's Gifts — Homepage
// ─────────────────────────────────────────────

// ---- NAVBAR ----
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span
              className="text-xl font-bold text-stone-900 tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Donna&apos;s Gifts
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["Shop", "Custom Orders", "About", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-stone-600 hover:text-amber-700 transition-colors font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors">
              <span>🛍</span> Cart (0)
            </button>
            <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors shadow-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ---- HERO ----
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-16">
      {/* Soft background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── Text ── */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full">
              ✨ Black-Owned · Handcrafted with Love
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.1]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Gifts That Tell{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-500">
                Your Story
              </span>
            </h1>

            <p className="text-lg text-stone-600 max-w-md leading-relaxed">
              Custom engraved tumblers, personalized charcuterie boards, and
              one-of-a-kind gifts crafted to make every moment unforgettable.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                Shop the Collection
              </button>
              <button className="border-2 border-stone-300 hover:border-amber-500 text-stone-700 hover:text-amber-700 font-semibold px-8 py-4 rounded-full transition-all">
                Custom Orders
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-1">
              {[
                { num: "500+", label: "Happy Customers" },
                { num: "★ 4.9", label: "Average Rating" },
                { num: "100%", label: "Personalized" },
              ].map((stat, i, arr) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-900">
                      {stat.num}
                    </div>
                    <div className="text-xs text-stone-500">{stat.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-10 bg-stone-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Hero Image Placeholder ── */}
          <div className="relative flex justify-center">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-300 to-orange-400 aspect-[4/5] w-full max-w-sm shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                <div className="text-7xl mb-5">🎁</div>
                <div className="text-xl font-semibold">Lifestyle Photography</div>
                <div className="text-sm opacity-75 mt-2 max-w-xs">
                  Beautiful styled shot of custom engraved products
                </div>
              </div>
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[175px]">
              <div className="text-2xl mb-1">🥂</div>
              <div className="text-sm font-bold text-stone-800">Just Engraved</div>
              <div className="text-xs text-stone-500">Custom Tumblers</div>
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 min-w-[155px]">
              <div className="text-xs text-stone-400 mb-0.5">New Order ✓</div>
              <div className="text-sm font-bold text-stone-800">Gift Set for Sarah</div>
              <div className="text-xs text-amber-600 font-medium mt-0.5">Ships in 3–5 days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- CATEGORIES ----
const categories = [
  {
    name: "Custom Tumblers",
    description: "Personalized drinkware for every occasion",
    emoji: "☕",
    gradient: "from-amber-400 to-orange-400",
    count: "24 styles",
  },
  {
    name: "Unique Gifts",
    description: "One-of-a-kind gifts they'll treasure forever",
    emoji: "🎁",
    gradient: "from-rose-400 to-pink-500",
    count: "40+ items",
  },
  {
    name: "Charcuterie Boards",
    description: "Engraved boards for entertaining in style",
    emoji: "🧀",
    gradient: "from-stone-500 to-amber-700",
    count: "12 designs",
  },
  {
    name: "Accessories",
    description: "Keychains, ornaments & personalized keepsakes",
    emoji: "✨",
    gradient: "from-violet-400 to-purple-500",
    count: "30+ items",
  },
];

function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Browse by Category
          </p>
          <h2
            className="text-4xl font-bold text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Something for Everyone
          </h2>
          <p className="text-stone-500 mt-4 max-w-md mx-auto">
            From birthdays to weddings, anniversaries to holidays — we have the
            perfect personalized gift.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-stone-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-br ${cat.gradient} p-10 flex items-center justify-center`}
              >
                <span className="text-6xl">{cat.emoji}</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-stone-400 mb-1">{cat.count}</div>
                <h3 className="font-bold text-stone-900 text-lg mb-1">
                  {cat.name}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 text-amber-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop now <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- WHY US ----
const reasons = [
  {
    icon: "✋",
    title: "Handcrafted Quality",
    description:
      "Every item is carefully crafted and engraved with precision and love.",
  },
  {
    icon: "💛",
    title: "Black-Owned Business",
    description:
      "Your purchase directly supports a small, Black-owned family business.",
  },
  {
    icon: "🎨",
    title: "Fully Customizable",
    description:
      "Add names, dates, quotes, or custom designs to make it truly yours.",
  },
  {
    icon: "📦",
    title: "Fast Turnaround",
    description:
      "Most orders ship within 3–5 business days, gift-ready and beautifully packaged.",
  },
  {
    icon: "⭐",
    title: "5-Star Service",
    description:
      "We don't stop until you love your order. Customer satisfaction is everything.",
  },
  {
    icon: "🌿",
    title: "Thoughtfully Made",
    description:
      "We use quality materials designed to last a lifetime of memories.",
  },
];

function WhyUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-stone-900 to-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Why Donna&apos;s Gifts
          </p>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            More Than Just a Gift Shop
          </h2>
          <p className="text-stone-400 mt-4 max-w-md mx-auto">
            We pour heart and soul into every single order because we know gifts
            carry meaning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-8 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">
                {reason.title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- FEATURED PRODUCTS ----
const products = [
  {
    name: "Engraved Skinny Tumbler",
    price: "$32",
    tag: "Best Seller",
    emoji: "🥤",
    bg: "from-amber-100 to-amber-200",
  },
  {
    name: "Custom Charcuterie Board",
    price: "$58",
    tag: "New",
    emoji: "🧀",
    bg: "from-stone-200 to-amber-100",
  },
  {
    name: "Personalized Wine Glass",
    price: "$28",
    tag: "Popular",
    emoji: "🍷",
    bg: "from-rose-100 to-pink-100",
  },
  {
    name: "Engraved Gift Box Set",
    price: "$75",
    tag: "Gift Set",
    emoji: "🎁",
    bg: "from-violet-100 to-purple-100",
  },
  {
    name: "Custom Keychain",
    price: "$18",
    tag: "",
    emoji: "🔑",
    bg: "from-sky-100 to-blue-100",
  },
  {
    name: "Stanley-Style Tumbler",
    price: "$45",
    tag: "Trending",
    emoji: "☕",
    bg: "from-green-100 to-emerald-100",
  },
];

function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-amber-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Our Products
            </p>
            <h2
              className="text-4xl font-bold text-stone-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Fan Favorites
            </h2>
          </div>
          <button className="text-sm font-bold text-amber-700 border-b-2 border-amber-400 pb-0.5 hover:text-amber-900 transition-colors self-start sm:self-auto">
            View All Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Product image placeholder */}
              <div
                className={`bg-gradient-to-br ${product.bg} aspect-square relative flex items-center justify-center`}
              >
                <span className="text-7xl">{product.emoji}</span>
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.tag}
                  </div>
                )}
                <button className="absolute bottom-4 right-4 bg-white text-stone-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-white">
                  Quick Add
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-stone-900">{product.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-amber-700 font-bold text-lg">
                    {product.price}
                  </span>
                  <div className="text-amber-400 text-sm tracking-tight">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- ABOUT ----
function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-200 via-amber-200 to-orange-300 aspect-[4/5] w-full max-w-sm shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                <div className="text-7xl mb-5">👩🏾‍🎨</div>
                <div className="text-xl font-semibold">Photo of Donna</div>
                <div className="text-sm opacity-75 mt-1">
                  At work in her studio
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -bottom-5 -right-2 lg:-right-6 bg-amber-500 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl">
              <div className="text-2xl font-bold leading-none">5+</div>
              <div className="text-xs font-semibold mt-1 leading-tight px-2">
                Years of Crafting
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-amber-600 font-semibold text-sm tracking-widest uppercase">
              Our Story
            </p>
            <h2
              className="text-4xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Made with Love,
              <br />
              Gifted with Purpose
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Donna&apos;s Gifts was born from a simple belief: the best gifts
              are personal. What started as custom pieces for friends and family
              grew into a full collection of engraved, personalized products that
              celebrate life&apos;s most meaningful moments.
            </p>
            <p className="text-stone-600 leading-relaxed">
              As a Black woman entrepreneur, Donna brings warmth, creativity,
              and precision to every single order. From holiday gifts to wedding
              keepsakes, each piece is crafted to be cherished for years to come.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg">
                Meet Donna
              </button>
              <button className="text-stone-700 font-semibold px-8 py-4 rounded-full border-2 border-stone-200 hover:border-amber-400 hover:text-amber-700 transition-all">
                Custom Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- FOOTER ----
function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span
                className="text-white text-xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Donna&apos;s Gifts
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Custom engraved gifts and personalized keepsakes, handcrafted with
              love by a Black woman entrepreneur.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Instagram", char: "IG" },
                { label: "Facebook", char: "FB" },
                { label: "TikTok", char: "TT" },
                { label: "Pinterest", char: "PT" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center text-xs font-bold text-white transition-colors"
                >
                  {social.char}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Custom Tumblers",
                "Charcuterie Boards",
                "Gift Sets",
                "Accessories",
                "New Arrivals",
                "Best Sellers",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              {[
                "About Donna",
                "Custom Orders",
                "Shipping & Returns",
                "FAQ",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="text-xs mb-1">Email us at</div>
              <a
                href="mailto:hello@donnasgifts.com"
                className="text-amber-400 text-sm hover:text-amber-300 transition-colors"
              >
                hello@donnasgifts.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Donna&apos;s Gifts. All rights reserved. Black-Owned &amp; Proud. 🤎</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- PAGE ----
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <WhyUs />
      <FeaturedProducts />
      <About />
      <Footer />
    </main>
  );
}
