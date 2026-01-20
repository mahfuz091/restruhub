"use client";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";
import Link from "next/link";

const ReviewManagement = () => {
  return (
    <div className="pt-120 pb-100">
      <div className="container">
        <FadeInWhenVisible>
          <div
            className=" max-h-[490px] bg-cover bg-no-repeat bg-top rounded-xl md:rounded-3xl -mx-4 md:mx-0 overflow-hidden"
            style={{
              backgroundImage: "url('/Images/ReviewManagement-bg.png')",
            }}
          >
            <div className="flex justify-between flex-col gap-4 md:gap-0 md:flex-row pl-4  pt-6  md:pl-16 ">
              <div className="md:pt-[80px]  pr-4 md:pr-0 md:w-[60%]">
                <h2 className="md:text-3xl text-xl font-bold text-white ">
                  Value Customer Opinions, Enhance Your Reputation, And Drive Measurable Sales Growth

                </h2>
                <p className="text-white! desc pt-3 md:pt-5 md:pb-8 pb-4">
                  Join growing restaurants using Restruhubto boost ratings, strengthen customer trust, and save hours on review management. Start your free 7-day trial and turn feedback into real business results
                </p>

                <div className="flex gap-2 items-center flex-wrap">
                  <a href="#pricing" className="w-full md:w-fit">
                    <button className="primary-btn w-full md:w-fit">
                      <span>Start Free Trail</span> <ArrowRight />
                    </button></a>
                  <Link href="https://calendly.com/restruhub" target="_blank" className="w-full md:w-fit">
                    <button className="bg-white justify-center flex gap-2 items-center border px-4 py-2.5 rounded-xl w-full md:w-fit border-[#00000033] cursor-pointer hover:bg-[#f0f0f0] hover:border-[#000000] transition-colors duration-300">
                      <span>Make an Schedule</span> <Calendar height={20} />
                    </button>
                  </Link>
                </div>
              </div>

              <div className=" relative h-[250px] md:h-[545px] w-full ">
                <Image
                  src="/Images/DashboardSingle.png"
                  alt="DashboardSingle.png"
                  fill
                />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
};

export default ReviewManagement;
