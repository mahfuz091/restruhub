
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem("cookie-consent");
    if (!consented) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed bottom-4 max-w-[520px] left-4 right-4 md:left-8 md:right-8 z-[9999]"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/30 shadow-2xl">

        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10" />

        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] animate-[shimmer_2s_infinite]" />
        </div>

        <div className="relative p-6 md:p-8 flex flex-col gap-6 justify-between">
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-lg md:text-xl text-primary">
              We value your privacy
            </h3>
            <p className="text-sm md:text-base text-[#5a6370] mt-2 leading-relaxed">
              We use cookies to improve your experience and track basic analytics.
              By continuing, you agree to our{" "}
              <Link href="/privacy" className="text-secondary underline underline-offset-4 hover:text-secondary/80 transition">
                Privacy Policy
              </Link>.
            </p>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <button
              onClick={acceptCookies}
              className="primary-btn whitespace-nowrap text-sm md:text-base"
            >
              Accept All
            </button>

            <Link href="/privacy">
              <button className="secondary-btn whitespace-nowrap text-sm md:text-base bg-transparent border border-[#00000033] hover:border-[#00000066] hover:bg-black/5">
                Privacy Policy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}