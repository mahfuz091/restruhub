"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CoolFeature = () => {
  return (
    <div className="pt-120">
      <div className="bg-[#006543] pt-100 pb-100 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-[900px] text-center mx-auto"
          >
            <h2 className="title text-white">Discover What Makes Restruhub Stand Out</h2>
            <p className="desc text-white! pt-2 lg:pt-4">
              Restruhubgives you the tools to reply to reviews quickly, stay organized, and build customer trust. It’s simple to use and helps you manage everything without needing extra staff or time.
            </p>
          </motion.div>

          <div className="pt-60">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {[0, 1].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -8, transition: { duration: 0.4 } }}
                  className="bg-[#F5F5F5] rounded-xl md:rounded-3xl px-4 py-4 md:py-10 md:px-8"
                >
                  <h4 className="sub-title">
                    {index === 0
                      ? "Manage Every Single Review in One Place"
                      : "Effortless Review Replies"}
                  </h4>
                  <p className="sub-desc text-[#181818CC] pt-2 pb-8">
                    {index === 0
                      ? "Easily view and manage all your Google reviews from one clean dashboard. Filter by rating, photo, or status. Sort by date and stay in full control of every customer interaction."
                      : "AI drafts high-quality replies for each review in your chosen tone: friendly, natural, or professional. Review, edit, or approve before publishing. Everything is in your hands."}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="overflow-hidden h-[200px] md:h-[301px] max-w-[588px] w-full relative rounded-xl"
                  >
                    <Image
                      src={
                        index === 0
                          ? "/Images/manage-review.png"
                          : "/Images/review-replies.png"
                      }
                      alt="feature"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>


            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.5 } }}
              className="pt-5 md:pt-6 lg:pt-8"
            >
              <div className="bg-[#F5F5F5] rounded-xl md:rounded-3xl px-4 pt-4 md:pt-3 md:px-8 flex gap-6 flex-col md:flex-row justify-between items-center">
                <div className="max-w-xl">
                  <h4 className="sub-title">No Random Reply</h4>
                  <p className="sub-desc text-[#181818CC] pt-2 max-w-[517px]">
                    Every reply is thoughtful, relevant, and checked. Nothing gets published unless you approve it. You stay in control.

                  </p>

                  <div className="flex gap-4 items-center md:flex-row flex-col pt-6 lg:pt-8">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      viewport={{ once: true, }}
                      className="primary-btn w-full md:w-fit"
                    >
                      <span>Get Started</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#e5e5e5" }}
                      whileTap={{ scale: 0.98 }}
                      viewport={{ once: true, }}
                      className="bg-white border px-4 py-2.5 rounded-xl w-full md:w-fit border-[#00000033] hover:bg-[#f0f0f0] hover:border-[#000000] transition-all duration-300"
                    >
                      <span>Request A Demo</span>
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.1, delay: 0.7 }}
                  viewport={{ once: true, }}
                  className="overflow-hidden h-[200px] md:h-[301px] max-w-[588px] w-full relative rounded-xl"
                >
                  <Image
                    src="/Images/random-reply.png"
                    alt="no random reply"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoolFeature;