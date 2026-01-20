"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const drawer = document.getElementById("mobile-drawer");
      if (drawer && !drawer.contains(e.target as Node) && open) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {

      router.push(`/?scrollTo=${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <button onClick={() => scrollToSection("home")} className="relative h-[50px] w-[190px] cursor-pointer">
            <Image src="/Images/logo.png" alt="Logo" fill priority />
          </button>

          <nav className="hidden md:flex gap-10 text-[18px] font-medium text-primary">
            <button onClick={() => scrollToSection("how-it-works")} className="hover:text-secondary transition cursor-pointer">
              How it works
            </button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-secondary transition cursor-pointer">
              Pricing
            </button>
            <button onClick={() => scrollToSection("why-us")} className="hover:text-secondary transition cursor-pointer">
              Why us
            </button>

            <Link href="/blog" className="text-left hover:text-secondary cursor-pointer transition">
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="secondary-btn">Login</button>
            <button className="primary-btn">Contact Us</button>
          </div>

          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40" onClick={() => setOpen(false)} />}

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#00000033]">
          <button onClick={scrollToTop} className="relative h-[40px] w-[150px]">
            <Image src="/Images/logo.png" alt="Logo" fill />
          </button>
          <button onClick={() => setOpen(false)}>
            <X className="w-8 h-8 text-primary" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-lg font-medium text-primary">
          <button onClick={() => scrollToSection("how-it-works")} className="text-left hover:text-secondary cursor-pointer transition">
            How it works
          </button>
          <button onClick={() => scrollToSection("pricing")} className="text-left hover:text-secondary cursor-pointer transition">
            Pricing
          </button>
          <button onClick={() => scrollToSection("why-us")} className="text-left hover:text-secondary cursor-pointer transition">
            Why us
          </button>
          <Link href="/blog" onClick={() => setOpen(false)} className="text-left hover:text-secondary cursor-pointer transition">
            Blog
          </Link>

          <div className="pt-6 space-y-4">
            <button className="secondary-btn w-full py-3 cursor-pointer" onClick={() => setOpen(false)}>
              Login
            </button>
            <button className="primary-btn w-full py-3" onClick={() => setOpen(false)}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
