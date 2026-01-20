"use client";

import React from "react";

const BlogBannerSkeleton = () => {
    return (
        <div className="pt-[120px] md:pt-[160px] relative overflow-hidden animate-pulse">
            <div className="absolute top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-[500px] bg-secondary/10 blur-3xl opacity-10 z-0"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-secondary/10 blur-3xl opacity-10 z-0"></div>
            <div className="container relative z-20">
                <div className="flex flex-col justify-center items-center">

                    <div className="flex gap-3 justify-center items-center bg-gray-200 rounded-full w-[300px] md:w-[400px] h-10 py-2.5 px-4 pr-5" />

                    <div className="text-center w-full max-w-[787px] mx-auto space-y-4 pt-5 lg:pt-8">

                        <div className="h-[45px] md:h-[60px] lg:h-[70px] bg-gray-200 rounded-xl w-3/4 mx-auto" />


                        <div className="space-y-2 pt-3 lg:pt-5">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
                        </div>
                    </div>
                </div>
                <div className="pt-60"></div>
            </div>
        </div>
    );
};

export default BlogBannerSkeleton;
