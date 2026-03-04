import React from "react";
import BlogCardSkeleton from "@/component/Blog/BlogCardSkeleton";
import BlogBannerSkeleton from "@/component/Blog/BlogBannerSkeleton";

export default function Loading() {
    return (
        <div className="bg-white min-h-screen">
            <BlogBannerSkeleton />

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-2/3 space-y-8">
                        {[...Array(5)].map((_, i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    </div>

                    <aside className="w-full lg:w-1/3 space-y-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse space-y-6">
                            <div className="w-1/3 h-6 bg-gray-200 rounded" />
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                                        <div className="w-20 h-3 bg-gray-200 rounded" />
                                    </div>
                                    <div className="w-full h-5 bg-gray-200 rounded" />
                                    <div className="w-24 h-3 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary/5 p-6 rounded-2xl border border-gray-100 animate-pulse">
                            <div className="w-1/2 h-6 bg-gray-200 rounded mb-4" />
                            <div className="flex flex-wrap gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-20 h-8 bg-gray-200 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
