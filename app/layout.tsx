import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Navbar from "@/component/shared/Navber";
import Footer from "@/component/shared/Footer";
import ScrollTop from "@/component/shared/ScrollTop";
import NavbarTwo from "@/component/shared/NavbarTwo";

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
      
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-[#ffffff]`}
      >
    

         {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MCVQZY096H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MCVQZY096H');
          `}
        </Script> */}
 <ScrollTop/> 
        <Navbar />
        {children}
        <Footer />

        
      </body>
    </html>
  );
}
