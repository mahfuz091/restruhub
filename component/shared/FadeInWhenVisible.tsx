
"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean; 
  className?: string;
}

export const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  y = 40,
  duration = 0.8,
  once = true,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      viewport={{ once, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};