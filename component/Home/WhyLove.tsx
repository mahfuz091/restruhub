"use client"
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";

const WhyLove = () => {
  const data = [
    {
      icon: "/icon/watch.svg",
      title: "Save 10+ Hours Weekly",
      des: "Advanced Al generates natural, contextual replies that sound authentically human.",
      iconColor: "bg-[#FFA448]",
    },
    {
      icon: "/icon/increase.svg",
      title: "Increase Customer Loyalty",
      des: "Respond to reviews within hours, not days. Keep your customers engaged and happy.",
      iconColor: "bg-[#F2415A]",
    },
    {
      icon: "/icon/s-star.svg",
      title: "Improve Your Ratings",
      des: "Every response maintains your brand voice—friendly, natural, and professional.",
      iconColor: "bg-[#00B67A]",
    },
    {
      icon: "/icon/verify.svg",
      title: "Reduce Stress",
      des: "Timely responses improve ratings and show customers you care about their feedback.",
      iconColor: "bg-[#C548FF]",
    },
  ];
  return (
    <div className="pt-120">
      <div className="container">
        <FadeInWhenVisible>
          <div className="max-w-[709px] mx-auto space-y-3 text-center">
            <h2 className="title max-w-[562px] mx-auto">
              Why Restaurant Owners Love RestruHub
            </h2>
            <p className="desc">
              Powerful features designed specifically for busy restaurant owners
              who want to maintain excellent customer relationships.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="pt-60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div
                className="bg-white group flex-col  rounded-xl py-5 px-3 lg:py-9 lg:px-6  flex border border-[#0000000D] overflow-hidden
             transition-all duration-700 ease-out
             hover:bg-white/90 hover:backdrop-blur-2xl
       
              shadow-[0px 4px 34px 0px #0000000A]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div
                  className={`flex justify-center items-center h-12 w-12 mb-4 rounded-xl ${item.iconColor}`}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </div>

                <h3 className="font-semibold text-lg md:text-xl  mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-[16px] text-[#5a6370]">
                  {item.des}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyLove;
