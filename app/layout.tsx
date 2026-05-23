import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donna's Gifts | Custom Engraving & Personalized Gifts",
  description:
    "Handcrafted custom engraved tumblers, charcuterie boards, personalized gift sets, and more. Black-owned small business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FDF8F3]">{children}</body>
    </html>
  );
}
