"use client";

import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Author {
    name: string | null;
    profileImage: string | null;
}

interface Blog {
    id: string;
    title: string;
    postSlug: string;
    bannerImage: string;
    bannerAltText: string | null;
    createdAt: string | Date;
    author?: Author | null;
}

interface RecentBlogProps {
    recentBlogs: Blog[];
}

const RecentBlog: React.FC<RecentBlogProps> = ({ recentBlogs }) => {
    const latestBlogs = recentBlogs.slice(0, 4);


    return (
        <div className="bg-white rounded-2xl p-6  border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                Recent Blogs
            </h3>
            <div className="space-y-6">
                {latestBlogs.map((blog) => (
                    <div key={blog.id} className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                                <Image
                                    src={blog.author?.profileImage || "/avatar.png"}
                                    alt={blog.author?.name || "Author"}
                                    fill
                                    sizes="24px"
                                    className="object-cover"
                                />

                            </div>
                            <span className="text-xs font-medium text-gray-500">
                                {blog.author?.name || "Unknown Author"}
                            </span>
                        </div>

                        <Link href={`/blog/${blog.postSlug}`}>
                            <h4 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                                {blog.title}
                            </h4>
                        </Link>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                            <Calendar size={12} />
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBlog;
