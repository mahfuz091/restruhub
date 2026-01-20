"use client"
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";

const Works = () => {
  const data = [
    {
      icon: "/icon/home.svg",
      title: "Connect Your Reviews",
      des: "Link your Google account so Restruhubcan import all your customer reviews automatically.",
      iconColor: "bg-[#359ACD]",
    },
    {
      icon: "/icon/paper.svg",
      title: "Import or Sync Reviews",
      des: "Restruhubbrings in your latest Google reviews and keeps them updated in real time.",
      iconColor: "bg-[#099250]",
    },
    {
      icon: "/icon/chat.svg",
      title: "Generate Reply",
      des: "Receive AI-crafted, professional responses within minutes, ready to publish or adjust to your preference.",
      iconColor: "bg-[#FFA448]",
    },
    {
      icon: "/icon/verify.svg",
      title: "Customize & Publish",
      des: "Fine-tune tone and wording, then publish your replies directly from Restruhub.",
      iconColor: "bg-[#7435CD]",
    },
  ];
  return (
    <div className="pt-120">
      <div className="container">
        <FadeInWhenVisible>
          <div className="max-w-[709px] mx-auto space-y-3 text-center">
            <h2 className="title max-w-[562px] mx-auto">Simple 4-Step Process</h2>
            {/* <p className="desc">
              Four simple steps to transform your review management process
            </p> */}
          </div>
        </FadeInWhenVisible>

        <div className="pt-60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div
                className="bg-white group flex-col  rounded-xl py-5 px-3 lg:py-8 lg:px-6  flex border border-[#0000000D] overflow-hidden
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
                <span className="border rounded-full py-0.5 px-4 w-fit mb-4 mt-2">
                  step {index + 1}
                </span>
                <h3 className="font-semibold text-lg md:text-xl  mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5a6370]">{item.des}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
