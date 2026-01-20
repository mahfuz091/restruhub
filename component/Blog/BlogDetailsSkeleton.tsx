"use client";

import React from "react";

const BlogDetailsSkeleton = () => {
    return (
        <div className="bg-white min-h-screen animate-pulse">
            <section className="pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row gap-16">

                        <aside className="w-full lg:w-1/4">
                            <div className="space-y-8">
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                                    <div className="w-1/2 h-5 bg-gray-200 rounded" />
                                    <div className="space-y-4 pt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-full h-4 bg-gray-200 rounded" />
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden lg:block p-8 bg-gray-200 rounded-3xl">
                                    <div className="w-3/4 h-6 bg-gray-300 rounded mb-4" />
                                    <div className="w-full h-10 bg-gray-300 rounded-xl" />
                                </div>
                            </div>
                        </aside>


                        <main className="w-full lg:w-3/4">
                            <div className="space-y-8">
                                <div className="w-24 h-6 bg-gray-200 rounded-full mb-6" />
                                <div className="w-3/4 h-12 bg-gray-200 rounded mb-4" />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                    <div className="space-y-2">
                                        <div className="w-24 h-4 bg-gray-200 rounded" />
                                        <div className="w-32 h-3 bg-gray-200 rounded" />
                                    </div>
                                </div>

                                <div className="aspect-video w-full bg-gray-200 rounded-3xl mb-12" />

                                <div className="space-y-6">
                                    <div className="w-full h-4 bg-gray-200 rounded" />
                                    <div className="w-full h-4 bg-gray-200 rounded" />
                                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                                    <div className="w-full h-4 bg-gray-200 rounded" />
                                    <div className="w-5/6 h-4 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </main>
                    </div>


                    <div className="border-t border-gray-100 mt-32 pt-20">
                        <div className="w-48 h-8 bg-gray-200 rounded mb-12" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="aspect-video w-full bg-gray-200 rounded-xl" />
                                    <div className="w-3/4 h-5 bg-gray-200 rounded" />
                                    <div className="w-1/2 h-3 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetailsSkeleton;
