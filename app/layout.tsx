import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";

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
const GTM_ID = "GTM-5MHMHGVP";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-[#ffffff]`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
