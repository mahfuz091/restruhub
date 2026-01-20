"use client";

import React, { useState } from "react";
import Filter from "./Filter";
import NewBlogItem from "./NewBlogItem";
import RecentBlog from "./RecentBlog";
import BlogBanner from "./BlogBanner";
import Link from "next/link";

interface Blog {
    id: string;
    title: string;
    postSlug: string;
    shortDesc: string | null;
    bannerImage: string;
    bannerAltText: string | null;
    createdAt: string | Date;
    Comment?: any[];
    author?: any;
    BlogCategory?: any;
    metaDescription: string | null;
    content?: any;
}

interface BlogCategory {
    id: string;
    name: string;
}

interface BlogPageProps {
    blogs: Blog[];
    blogCategories: BlogCategory[];
}

const BlogPage: React.FC<BlogPageProps> = ({ blogs, blogCategories }) => {
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
    const [activeCategory, setActiveCategory] = useState<string>("");

    const handleSelectCategory = (categoryName: string) => {
        setActiveCategory(categoryName);
        if (!categoryName) {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(
                (blog) => blog.BlogCategory?.name === categoryName
            );
            setFilteredBlogs(filtered);
        }
    };

    return (
        <div className="bg-white min-h-screen">

            <BlogBanner />

            <div className="container mx-auto px-4 md:py-16 py-8">
                <div className="flex flex-col lg:flex-row md:gap-12 gap-6">

                    <div className="w-full lg:w-2/3">


                        <NewBlogItem filterData={filteredBlogs} />
                    </div>


                    <aside className="w-full lg:w-1/3 space-y-8 sticky top-28 h-fit">
                        <RecentBlog recentBlogs={blogs} />


                        <div className="bg-primary/5 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-primary mb-4">Recommended Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleSelectCategory("")}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-all border font-medium ${activeCategory === ""
                                        ? "bg-secondary text-white border-secondary shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:text-secondary hover:border-secondary"
                                        }`}
                                >
                                    All Blogs
                                </button>
                                {blogCategories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleSelectCategory(cat.name)}
                                        className={`px-3 py-1.5 text-sm rounded-lg transition-all border font-medium ${activeCategory === cat.name
                                            ? "bg-secondary text-white border-secondary shadow-sm"
                                            : "bg-white text-gray-600 border-gray-200 hover:text-secondary hover:border-secondary"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
