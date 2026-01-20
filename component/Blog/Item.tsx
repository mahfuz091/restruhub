"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ItemProps {
    item: {
        id: string;
        postSlug: string;
        bannerAltText: string | null;
        title: string;
        category: string;
        image: string;
    };
}

const Item: React.FC<ItemProps> = ({ item }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-secondary transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5 h-full flex flex-col p-6 overflow-hidden">
            <Link href={`/blog/${item.postSlug}`} className="block overflow-hidden relative aspect-[16/10]">
                <Image
                    src={item.image}
                    alt={item.bannerAltText || item.title}
                    fill
                    className="object-cover rounded-xl "
                />

                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {item.category}
                    </span>
                </div>
            </Link>

            <div className=" flex flex-col flex-grow  pt-4">
                <Link href={`/blog/${item.postSlug}`}>
                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300 leading-tight line-clamp-2">
                        {item.title}
                    </h3>
                </Link>
                <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link
                        href={`/blog/${item.postSlug}`}
                        className="text-secondary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        View Details <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Item;
