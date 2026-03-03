"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { safeAvatarSrc, safeImageSrc } from "@/lib/safeImage";

interface Author {
    name: string | null;
    profileImage: string | null;
}

interface BlogCategory {
    id: string;
    name: string;
}

interface Blog {
    id: string;
    title: string;
    postSlug: string;
    shortDesc: string | null;
    bannerImage: string;
    bannerAltText: string | null;
    createdAt: string | Date;
    author?: Author | null;
    BlogCategory?: BlogCategory | null;
    metaDescription: string | null;
    content?: any;
    _count?: {
        Comment: number;
    };
}


interface NewBlogItemProps {
    filterData: Blog[];
}

const NewBlogItem: React.FC<NewBlogItemProps> = ({ filterData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

    const totalPages = Math.ceil(filterData.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filterData.slice(indexOfFirstBlog, indexOfLastBlog);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!filterData || filterData.length === 0) {
        return (
            <div className="text-center py-12">
                <h5 className="text-lg font-semibold text-gray-600">No blogs found</h5>
            </div>
        );
    }

    return (
        <div className="md:space-y-8 space-y-6">
            {currentBlogs.map((blog, index) => {
                const firstParagraph =
                    blog?.content?.blocks?.find((b: any) => b.type === "paragraph")
                        ?.data?.text || "";

                const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                });

                const author = blog.author?.name || "Unknown Author";
                const title = blog.title;
                const description = blog?.metaDescription || firstParagraph;
                const category = blog?.BlogCategory?.name || "Uncategorized";
                const image = blog?.bannerImage;
                 const imageSrc = safeImageSrc(blog?.bannerImage);
        const avatarSrc = safeAvatarSrc(blog?.author?.profileImage);

                return (
                    <div
                        key={blog.id || index}
                        className="bg-white md:p-6 p-4 group flex flex-col-reverse md:flex-row gap-6 lg:gap-12 justify-between items-center rounded-xl overflow-hidden border border-[#0000000D] transition-all duration-700 ease-out hover:bg-white/90 hover:backdrop-blur-2xl shadow-[0px 4px 34px 0px #0000000A]"
                    >
                        <div className="flex flex-col flex-grow w-full md:w-[65%]">
                            <div className="flex items-center md:gap-4 gap-2 text-xs text-[#5a6370] mb-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-100">
                                        <Image
                                            src={avatarSrc}
                                            alt={author}
                                            fill
                                            sizes="20px"
                                            className="object-cover"
                                        />

                                    </div>
                                    <span className="font-medium">{author}</span>
                                </div>
                            </div>

                            <Link href={`/blog/${blog.postSlug}`}>
                                <h3 className="text-xl md:text-2xl font-bold text-primary md:mb-3 mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                                    {title}
                                </h3>
                            </Link>
                            <p className="text-[#5a6370] md:mb-6 mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
                                {description}
                            </p>

                            <div className="mt-auto flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs text-[#5a6370]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{date}</span>
                                </div>

                                <div className="w-fit bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {category}
                                </div>
                                <div className="hidden items-center gap-1.5 text-xs text-[#5a6370]">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>{blog._count?.Comment || 0}</span>

                                </div>
                            </div>
                        </div>

                        <Link href={`/blog/${blog.postSlug}`} className="w-full md:w-[35%] shrink-0">
                            <div className="bg-muted aspect-video md:h-[180px] w-full overflow-hidden rounded-xl relative group">
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    fill
                                    priority={index < 2}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 35vw, 300px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                            </div>
                        </Link>
                    </div>
                );
            })}


            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 py-8 border-t border-gray-100">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-primary hover:bg-gray-100"
                            }`}
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageClick(i + 1)}
                                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${currentPage === i + 1
                                    ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                                    : "text-primary hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-primary hover:bg-gray-100"
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewBlogItem;
