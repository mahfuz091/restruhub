

import React from "react";
import {
  Facebook,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ScrollButton from "./ScrollButton";
import ScrollToTop from "./ScrollToTop";

const Footer = () => {
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111827] pt-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-6">

          <div className="w-[90%] md:w-[40%]">
            <ScrollToTop>
  <div className="relative h-[50px] w-[190px]">
    <Image src="/Images/logo.png" alt="Logo" fill />
  </div>
</ScrollToTop>
            <p className="text-white opacity-80 max-w-[277px] pt-5">
              AI-powered review management for busy restaurant owners.
            </p>
          </div>


          <div className="text-white">
            <h6 className="text-lg md:text-xl font-semibold">Company</h6>
            <div className="flex flex-col gap-2 pt-5 text-[16px] opacity-80">
              {/* <button onClick={() => scrollToSection("how-it-works")} className="text-left cursor-pointer hover:text-secondary transition">
                How it works
              </button> */}
              {/* <button onClick={() => scrollToSection("pricing")} className="text-left cursor-pointer hover:text-secondary transition">
                Pricing
              </button> */}
              <ScrollButton sectionId="how-it-works">
   How it works
</ScrollButton>
              <ScrollButton sectionId="pricing">
  Pricing
</ScrollButton>
<ScrollButton sectionId="why-us">
  Why us
</ScrollButton>
             
            </div>
          </div>


          <div className="text-white">
            <h6 className="text-lg md:text-xl font-semibold">Resources</h6>
            <div className="flex flex-col gap-2 pt-5 text-[16px] opacity-80">
              <ScrollButton sectionId="contact">
Contact Us
</ScrollButton>
              <ScrollButton sectionId="faq">
FAQ’s
</ScrollButton>
<Link href='/blog' scroll={true} className="hover:text-secondary">
Blog
</Link>

              
            </div>
          </div>


          <div className="text-white">
            <h6 className="text-lg md:text-xl font-semibold">Policies</h6>
            <div className="flex flex-col gap-2 pt-5 text-[16px] opacity-80">
              <Link href="/terms-conditions" className="hover:text-secondary">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            </div>
          </div>
        </div>


        <div className="mt-12 border-t border-white/10 flex flex-wrap justify-between items-center text-white py-8">
          <span>© 2025, All Rights Reserved</span>

          <div className="flex gap-3 items-center mt-4 md:mt-0">
            <Link href="https://www.facebook.com/profile.php?id=61585172453445&mibextid=wwXIfr&rdid=WZNj8mP9q0PaPtz1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E7XnsZgzJ%2F%3Fmibextid%3DwwXIfr#" target="_blank">
              <Facebook className="h-10 w-10 p-2 rounded-full bg-[#FFFFFF0D] text-gray-400 hover:bg-secondary hover:text-white hover:shadow-xl hover:shadow-secondary hover:-translate-y-1 transition-all duration-400 ease-out" />
            </Link>
            <Link href="https://www.instagram.com/restruhub/" target="_blank">
              <Instagram className="h-10 w-10 p-2 rounded-full bg-[#FFFFFF0D] text-gray-400 hover:bg-secondary hover:text-white hover:shadow-xl hover:shadow-secondary hover:-translate-y-1 transition-all duration-400 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
