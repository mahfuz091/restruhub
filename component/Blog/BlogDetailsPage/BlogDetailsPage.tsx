"use client";

import BlogContent from "./BlogContent/BlogContent";
import TableOfContents from "./TableOfContents/TableOfContents";
import RelatedBlog from "./RelatedBlog/RelatedBlog";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BlogDetailsPageProps {
    post: {
        id: string;
        title: string;
        postSlug: string;
        shortDesc: string | null;
        bannerImage: string;
        content: any;
        createdAt: Date;
        author: { id: string; name: string | null; email: string; profileImage: string | null } | null;
        BlogCategory: { id: string; name: string } | null;
        Comment?: {
            id: string;
            name: string;
            email: string;
            content: string;
            createdAt: Date;
            profileImage?: string | null;
            approved?: boolean | null;
        }[];

        metaDescription?: string | null;
    };
    blogCategories: {
        id: string;
        name: string;
    }[];
    allBlogs: any;
}

const BlogDetailsPage = ({
    post,
    blogCategories,
    allBlogs,
}: BlogDetailsPageProps) => {
    return (
        <div className="bg-white min-h-screen">

            <section className=" md:pt-20 pt-10 ">



                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row md:gap-16 gap-6 relative">

                        <aside className="w-full lg:w-1/4">
                            <div className="lg:sticky lg:top-32 space-y-8">
                                <TableOfContents
                                    blocks={post.content?.blocks || []}
                                    postSlug={post.postSlug}
                                />

                                <div className="hidden lg:block p-8 bg-secondary rounded-3xl text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-bold mb-4">Want to Grow Your Reviews?</h4>
                                        <p className="text-white/80 text-sm mb-6">Learn how Restuhub helps 500+ businesses automate their Google reviews.</p>
                                        <Link
                                            href="/#pricing"
                                            className="block w-full py-3 bg-white text-secondary text-center font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Free Consultation
                                        </Link>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                </div>
                            </div>
                        </aside>


                        <main className="w-full lg:w-3/4">
                            <BlogContent post={post} />
                        </main>
                    </div>


                    <div className="border-t border-gray-100 md:mt-32 mt-10 md:pt-20 pt-10">
                        <RelatedBlog
                            currentCategory={post.BlogCategory?.name}
                            currentId={post.postSlug}
                            allBlogs={allBlogs}
                        />
                    </div>
                </div>

            </section>
        </div>
    );
};

export default BlogDetailsPage;
