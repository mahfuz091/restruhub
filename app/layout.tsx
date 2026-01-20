import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/component/shared/Navber";
import Footer from "@/component/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://restruhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Google Business Profile Review Management Software - RestruHub",
    template: "%s | RestruHub",
  },

  description:
    "Top Google Business Profile review management software. Use our management tool to monitor online negative or positive reviews, ratings, and automate responses.",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "Org5r9Jt5ST9xlH0pyLhNXxXsBINQDebx81TK885cpQ",
  },

  openGraph: {
    type: "website",
    siteName: "RestruHub",
    url: SITE_URL,
    title: "Google Business Profile Review Management Software - RestruHub",
    description:
      "Top Google Business Profile review management software to monitor reviews, ratings, and automate responses.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Google Business Profile Review Management Software - RestruHub",
    description:
      "Manage Google reviews, ratings, and customer feedback automatically with RestruHub.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-[#ffffff]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
