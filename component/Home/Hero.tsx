"use client"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import BrandLogo from "./BrandLogo";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="pt-[120px] md:pt-[160px] relative overflow-hidden ">
      <div className="absolute top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-[500px] bg-secondary blur-3xl opacity-10 z-0"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-secondary blur-3xl opacity-10 z-0"></div>
      <div className="container relative z-20">
        <div className="flex flex-col justify-center items-center">
          <FadeInWhenVisible delay={0}>
            <div className="flex md:gap-3 gap-2 justify-center items-center bg-secondary/20 rounded-full w-fit py-2.5 px-4 pr-5">
              <div className=" relative h-4 w-4 md:h-6 md:w-6">
                <Image src={"/icon/star.svg"} alt=" star" fill priority />
              </div>
              <span className="text-[10px] md:text-[16px] font-medium text-secondary">
                No more missed replies. No more generic answer
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="text-center max-w-[787px] mx-auto ">
              <h1 className=" font-bold text-[25px] sm:text-[35px] md:text-[45px] lg:text-[60px] leading-tight lg:leading-[70px] pt-5 lg:pt-8 ">
                Let AI Handle Your Reviews. <br />

                <span className="text-secondary"> You Stay Focused on Food</span>
              </h1>
              <p className="desc pt-3 lg:pt-5">
                Restruhub automatically responds to your customer reviews just like a real human would. Keep your customers happy, protect your reputation, and win back your time.


              </p>

              <div className="flex gap-4 justify-center items-center md:flex-row flex-col pt-6 lg:pt-10">
                <a href="#pricing" className="w-full md:w-fit" >
                  <button className="primary-btn w-full md:w-fit">
                    <span>Start Free Trail</span> <ArrowRight />
                  </button></a>

                <button className="bg-white border px-4 py-2.5 rounded-xl w-full md:w-fit border-[#00000033] cursor-pointer hover:bg-[#f0f0f0] hover:border-[#000000] transition-colors duration-300">
                  <span>Sign Up Now</span>
                </button>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* <FadeInWhenVisible delay={0.6}>
          <div className="pt-60 text-center text-[#535862] pb-5  md:pb-[30px]">
            <span className=" ">Trusted by 4,000+ companies</span>
          </div>
        </FadeInWhenVisible> */}
      </div>

      {/* <BrandLogo /> */}

      <div className="pt-120"></div>

    </div>
  );
};

export default Hero;
