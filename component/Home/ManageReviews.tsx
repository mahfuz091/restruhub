"use client"
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";

const ManageReviews = () => {
  const data = [
    {
      icon: "/icon/white-star.svg",
      title: "Smart AI replies",
      des: "AI reads each review and writes a natural, personal response. Nothing gets published without your approval unless you enable auto-reply.",
      iconColor: "bg-[#00B67A]",
    },
    {
      icon: "/icon/watch.svg",
      title: "Fast response time",
      des: "Reply within minutes or hours, even during busy times. You control the timing by setting what works best for your team.",
      iconColor: "bg-[#219BE5]",
    },
    {
      icon: "/icon/emoji.svg",
      title: "Clear guest insights",
      des: "Find out what guests talk about most, like food, service, price, or experience. No need to read everything manually. Key topics are highlighted for you.",
      iconColor: "bg-[#9E57F7]",
    },
    {
      icon: "/icon/boost.svg",
      title: "More 5-star reviews",
      des: "Thoughtful replies show you care. When customers see you respond, they feel valued. New guests are more likely to leave positive reviews too.",
      iconColor: "bg-[#F25237]",
    },
    {
      icon: "/icon/light.svg",
      title: "Easy to use",
      des: "No training needed. Just connect your Google account, choose your settings like tone and timing, and start replying.",
      iconColor: "bg-[#F2416B]",
    },
    {
      icon: "/icon/mike.svg",
      title: "Your tone, your way",
      des: "Select a reply style that fits your brand. Choose from friendly, natural, or professional. Every reply matches your restaurant’s personality.",
      iconColor: "bg-[#EDAE09]",
    },
  ];
  return (
    <div className="">
      <div className="container">
        <FadeInWhenVisible>
          <div className="max-w-[709px] mx-auto space-y-4 text-center">
            <h2 className="title max-w-[662px] mx-auto">
              Instantly Reply to Reviews and Build a Stronger Reputation
            </h2>
            <p className="desc">
              Everything you need to manage reviews faster, smarter, and with zero extra staff. Let AI do the hard work. You just approve and grow.

            </p>
          </div>
        </FadeInWhenVisible>

        <div className="pt-60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-5 lg:p-7 
             border border-[#0000000D] overflow-hidden
             transition-all duration-700 ease-out
             hover:bg-white/90 hover:backdrop-blur-2xl
       
              shadow-[0px 4px 34px 0px #0000000A] h-full"
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

                <h3 className="font-bold text-xl md:text-2xl mb-4">{item.title}</h3>
                <p className="text-gray-700 font-medium">{item.des}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
