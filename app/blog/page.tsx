/* eslint-disable @typescript-eslint/no-explicit-any */

import BlogPage from "@/component/Blog/BlogPage";
import { postList } from "@/app/actions/blog/blog.actions";
import { blogCategoryList } from "@/app/actions/blog/blogCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog: Google Business Profile & Review Management Guide",
    description:
        "Explore Restuhub's blog for expert tips on Google Business Profile optimization, review management, and customer engagement strategies. Learn how to grow your online presence.",
    openGraph: {
        title: "Blog: Google Business Profile & Review Management Guide",
        description:
            "Explore Restuhub's blog for expert tips on Google Business Profile optimization, review management, and customer engagement strategies. Learn how to grow your online presence.",
    },
};

export const revalidate = 60; // revalidate every hour

const Page = async () => {
    const blogsResponse = await postList();
    console.log("Fetched blogs response:", blogsResponse);
    const blogCategoriesResponse: any = await blogCategoryList();

    if (!blogCategoriesResponse.success) {
        console.error("Failed to fetch categories:", blogCategoriesResponse.msg);
        return <div>Failed to load categories</div>;
    }

    const blogsArray = blogsResponse.success && blogsResponse.post?.postsWithContentObj
        ? blogsResponse.post.postsWithContentObj
        : [];

    const categoriesArray = (blogCategoriesResponse.success && Array.isArray(blogCategoriesResponse.blogCategory))
        ? blogCategoriesResponse.blogCategory
        : [];


    return <BlogPage blogs={blogsArray} blogCategories={categoriesArray} />;
};

export default Page;
