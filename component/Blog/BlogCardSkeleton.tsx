"use client";

import React from "react";

const BlogCardSkeleton = () => {
    return (
        <div className="bg-white p-6 flex flex-col md:flex-row gap-8 lg:gap-12 justify-between items-center rounded-xl border border-[#0000000D] animate-pulse">
            <div className="flex flex-col flex-grow w-full md:w-[65%]">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gray-200" />
                        <div className="w-24 h-3 bg-gray-200 rounded" />
                    </div>
                </div>

                <div className="w-3/4 h-7 bg-gray-200 rounded mb-3" />
                <div className="w-full h-4 bg-gray-200 rounded mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded mb-2" />
                <div className="w-1/2 h-4 bg-gray-200 rounded mb-6" />

                <div className="mt-auto flex flex-wrap items-center gap-4">
                    <div className="w-20 h-3 bg-gray-200 rounded" />
                    <div className="w-16 h-5 bg-gray-200 rounded-full" />
                    <div className="w-12 h-3 bg-gray-200 rounded" />
                </div>
            </div>

            <div className="w-full md:w-[35%] shrink-0">
                <div className="bg-gray-200 aspect-video md:h-[180px] w-full rounded-xl" />
            </div>
        </div>
    );
};

export default BlogCardSkeleton;
