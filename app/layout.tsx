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
  title: "Donna & Co. | Custom Engraving & Personalized Gifts",
  description:
    "Hand-engraved tumblers, boards, wallets, and custom commissions — made by a Black woman-owned studio in Charlotte, NC. Personalized gifts that outlast the holiday.",
  openGraph: {
    title: "Donna & Co. | Custom Engraving & Personalized Gifts",
    description:
      "Hand-engraved tumblers, boards, wallets, and custom commissions. Black-owned, hand-engraved in Charlotte, NC.",
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
