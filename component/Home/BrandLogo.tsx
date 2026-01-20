"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrandLogo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const logos = [
    "/icon/c-1.svg", "/icon/c-2.svg", "/icon/c-3.svg", "/icon/c-4.svg",
    "/icon/c-1.svg", "/icon/c-2.svg", "/icon/c-3.svg", "/icon/c-4.svg",
    "/icon/c-1.svg", "/icon/c-2.svg", "/icon/c-3.svg", "/icon/c-4.svg",
  ];

  
  return (
    <div ref={ref} className="">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className=""
      >
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover={true}
          direction="left"
          className="overflow-hidden"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 lg:mx-12 flex items-center justify-center"
            >
              <motion.div
                whileHover={{
                  
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
                className="relative"
              >
                <Image
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  width={160}
                  height={80}
                  className="object-contain"
                  style={{ maxHeight: "70px", width: "auto" }}
                />
              </motion.div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default BrandLogo;