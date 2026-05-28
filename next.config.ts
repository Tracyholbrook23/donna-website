import type { NextConfig } from "next";

// The Wix "pages domain" is locked to the custom domain, but DNS points to Next.js.
// We proxy all Wix-internal routes to the actual Wix-hosted site so that the
// checkout redirect chain (/_api/redirect-session → /_api/iam/cookie → /checkout)
// resolves on Wix's servers instead of 404-ing on Next.js.
const WIX_SITE_URL = "https://wvpet311.wixsite.com/out-of-jersey-creati";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      // Wix API routes used by the checkout redirect chain
      {
        source: "/_api/:path*",
        destination: `${WIX_SITE_URL}/_api/:path*`,
      },
      // Wix-hosted checkout page
      {
        source: "/checkout/:path*",
        destination: `${WIX_SITE_URL}/checkout/:path*`,
      },
      // Wix account / member pages (login, thank-you, etc.)
      {
        source: "/account/:path*",
        destination: `${WIX_SITE_URL}/account/:path*`,
      },
    ];
  },
};

export default nextConfig;
