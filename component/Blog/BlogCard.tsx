"use client"
import Image from "next/image";
import React from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";
import { Calendar, MessageCircleCode, MessageCircleIcon, User } from "lucide-react";
import { MessageCircle } from "lucide";

interface BlogCardProps {
    index: number;
    image: string;
    category: string;
    title: string;
    description: string;
    date: string;
    author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ index, image, category, title, description, date, author }) => {
    return (
        <FadeInWhenVisible delay={index * 0.1}>
            <div className="bg-white p-6 group flex gap-12 justify-between items-center rounded-xl overflow-hidden border border-[#0000000D] transition-all duration-700 ease-out hover:bg-white/90 hover:backdrop-blur-2xl shadow-[0px 4px 34px 0px #0000000A] h-full flex">


                <div className=" flex flex-col flex-grow w-[70%]">
                    <div className="flex items-center gap-4 text-xs text-[#5a6370] mb-3">

                        <div className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            <span>{author}</span>
                        </div>
                    </div>

                    <h3 className="sub-title mb-3 group-hover:text-secondary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="sub-desc text-[#5a6370] mb-6 line-clamp-3">
                        {description}
                    </p>

                    <div className="mt-auto flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{date}</span>
                        </div>

                        <div className="w-fit bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                            {category}
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircleIcon className="w-3.5 h-3.5" />
                            <span>0</span>
                        </div>
                    </div>
                </div>


                <div className="bg-muted aspect-video md:h-[170px] h-full w-[30%] overflow-hidden rounded-xl">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover rounded-md"
                    />
                </div>
            </div>
        </FadeInWhenVisible>
    );
};

export default BlogCard;
