"use client";
import React, { useState } from "react";
import Item from "../../Item";

export interface BlogType {
    id: string;
    title: string;
    postSlug: string;
    bannerAltText: string | null;
    shortDesc: string | null;
    bannerImage: string;
    blogCategoryId: string | null;
    BlogCategory: { id: string; name: string } | null;
}

interface RelatedBlogProps {
    currentCategory: string | undefined;
    currentId: string;
    allBlogs: any;
}

const RelatedBlog: React.FC<RelatedBlogProps> = ({
    currentCategory,
    currentId,
    allBlogs,
}) => {
    const posts: BlogType[] = allBlogs.post?.postsWithContentObj || [];

    const relatedItems: BlogType[] = posts.filter(
        (blog) =>
            blog.BlogCategory?.name === currentCategory && blog.postSlug !== currentId
    );

    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? relatedItems : relatedItems.slice(0, 3);

    return (
        <section className="">
            <div className="flex items-center justify-between mb-6 md:mb-10">
                <h2 className="md:text-3xl text-xl font-bold text-primary">Related Blogs</h2>
                {!showAll && relatedItems.length > 3 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="text-secondary font-bold hover:underline"
                    >
                        View All
                    </button>
                )}
            </div>

            {relatedItems.length === 0 ? (
                <div className="p-12 bg-gray-50 rounded-3xl text-center border border-gray-100">
                    <p className="text-gray-500 font-medium text-lg">No related blogs found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedItems.map((blog: BlogType) => (
                        <Item
                            key={blog.id}
                            item={{
                                id: blog.id,
                                postSlug: blog.postSlug,
                                bannerAltText: blog.bannerAltText,
                                title: blog.title,
                                category: blog.BlogCategory?.name || "Uncategorized",
                                image: blog.bannerImage,
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default RelatedBlog;
