"use client"
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";

const BlogBanner = () => {
    return (
        <div className="pt-[120px] md:pt-[160px] relative overflow-hidden ">
            <div className="absolute top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-[500px] bg-secondary blur-3xl opacity-10 z-0"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-secondary blur-3xl opacity-10 z-0"></div>
            <div className="container relative z-20">
                <div className="flex flex-col justify-center items-center">
                    <FadeInWhenVisible delay={0}>
                        <div className="flex sm:gap-3 gap-2 justify-center items-center bg-secondary/20 rounded-full w-fit py-2.5 px-4 pr-5">
                            <div className=" relative h-5 w-5 md:h-6 md:w-6">
                                <Image src={"/icon/star.svg"} alt=" star" fill priority />
                            </div>
                            <span className="text-[12px] md:text-[16px] font-medium text-secondary">
                                Insights, Trends & Tips for Restaurant Success
                            </span>
                        </div>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.2}>
                        <div className="text-center max-w-[787px] mx-auto ">
                            <h1 className=" font-bold  text-[25px] sm:text-[35px] md:text-[45px] lg:text-[60px] leading-tight lg:leading-[70px] pt-5 lg:pt-8 ">
                                Our Blog
                                <span className="text-secondary"> & Resources</span>
                            </h1>
                            <p className="desc pt-3 lg:pt-5">
                                Stay updated with the latest trends in restaurant management, Google Business Profile optimization, and customer engagement strategies.
                            </p>
                        </div>
                    </FadeInWhenVisible>
                </div>
                <div className="pt-60"></div>
            </div>
        </div>
    );
};

export default BlogBanner;
