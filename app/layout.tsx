import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InteractionInit } from "@/components/InteractionInit";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Out of Jersey | Custom Laser Engraving — Woman Owned & Operated",
  description:
    "Custom laser engraving on tumblers, boards, knives, wallets, and one-of-a-kind commissions. Woman-owned & operated. Personalized gifts done with precision and care.",
  openGraph: {
    title: "Out of Jersey | Custom Laser Engraving",
    description:
      "Custom laser engraving on tumblers, boards, knives, wallets, and commissions. Woman-owned & operated.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      style={
        {
          "--font-display": "var(--font-fraunces), Georgia, serif",
          "--font-body": "var(--font-inter), system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col bg-[var(--cream)]">
        <AnnouncementBar />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <InteractionInit />
      </body>
    </html>
  );
}
