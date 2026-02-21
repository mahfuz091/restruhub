"use client";

import { useState, useEffect, useActionState } from "react";
import { CalendarDays, MessageCircleMore, CircleCheckBig, User } from "lucide-react";
import Image from "next/image";
import { createComment } from "@/app/actions/blog/blog.actions";
import Link from "next/link";

interface BlogContentProps {
    post: {
        id: string;
        title: string;
        shortDesc: string | null;
        bannerImage: string;
        content: { blocks: any[] };
        createdAt: Date;
        author: {
            id: string;
            name: string | null;
            email: string;
            profileImage?: string | null;
        } | null;
        BlogCategory: {
            id: string;
            name: string;
        } | null;
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
}

const BlogContent = ({ post }: BlogContentProps) => {
    const initialState = { success: false, msg: "" };
    const [state, fromAction, isLoading] = useActionState(
        createComment,
        initialState
    );

    const [visibleComments, setVisibleComments] = useState(5);

    const loadMoreComments = () => {
        setVisibleComments((prev) => prev + 5);
    };

    const renderItem = (item: any) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item?.text) return item.text;
        if (typeof item === "object" && item?.content) return item.content;
        return JSON.stringify(item);
    };

    const renderBlock = (block: any, index: number) => {
        if (!block?.type || !block?.data) return null;

        switch (block.type) {
            case "header": {
                const level = block.data.level || 2;
                if (level === 2) return <h2 key={index} id={block?.id} className="text-2xl md:text-4xl font-bold text-primary md:mt-12 mt-8 md:mb-6 mb-4 leading-tight">{block.data.text}</h2>;
                if (level === 3) return <h3 key={index} id={block?.id} className="text-2xl md:text-3xl font-bold text-primary mt-10 mb-5 leading-tight">{block.data.text}</h3>;
                return <h4 key={index} id={block?.id} className="text-xl md:text-2xl font-bold text-primary mt-8 mb-4 leading-tight">{block.data.text}</h4>;
            }

            case "paragraph": {
                const text = block.data.text;
                if (!text || text.replace(/<br\s*\/?>/gi, "").trim() === "")
                    return null;

                return (
                    <p
                        key={index}
                        className="lg:text-lg text-base text-gray-700 leading-relaxed md:mb-6 mb-4"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                );
            }

            case "list": {
                const items = block.data?.items || [];
                if (block.data.style === "ordered") {
                    return (
                        <ol key={index} className="list-decimal list-inside space-y-3 md:mb-8 mb-6 ml-4 md:text-lg text-base text-gray-700">
                            {items.map((item: any, i: number) => (
                                <li key={i} className="pl-2">{renderItem(item)}</li>
                            ))}
                        </ol>
                    );
                } else {
                    return (
                        <ul key={index} className="space-y-4 md:mb-8 mb-6">
                            {items.map((item: any, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                                    <CircleCheckBig size={20} className="text-secondary shrink-0 mt-1" />
                                    <span>{renderItem(item)}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }
            }
            case "image":
                return block.data?.file?.url ? (
                    <div key={index} className="md:my-10 my-5 md:rounded-2xl rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={block.data.file.url}
                            alt={block.data.caption || "Blog Image"}
                            className="w-full object-cover"
                        />
                        {block.data.caption && (
                            <p className="text-center text-sm text-gray-500 mt-3 italic">{block.data.caption}</p>
                        )}
                    </div>
                ) : null;

            case "quote":
                return (
                    <blockquote key={index} className="border-l-4 border-secondary bg-secondary/5 p-8 my-10 rounded-r-2xl italic text-xl text-primary font-medium">
                        <div dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        {block.data.caption && (
                            <cite className="block text-sm text-gray-500 mt-4 not-italic font-bold">— {block.data.caption}</cite>
                        )}
                    </blockquote>
                );

            case "code":
                return (
                    <pre key={index} className="bg-primary text-white p-6 rounded-xl my-8 overflow-x-auto font-mono text-sm leading-relaxed">
                        <code>{block.data.code}</code>
                    </pre>
                );

            case "table":
                return (
                    <div key={index} className="overflow-x-auto my-10 rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-gray-200">
                                {block.data?.content?.map((row: any[], rIdx: number) => (
                                    <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        {row.map((cell: any, cIdx: number) => (
                                            <td
                                                key={cIdx}
                                                className="p-4 text-gray-700 border-x border-gray-200"
                                                dangerouslySetInnerHTML={{ __html: cell }}
                                            />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };

    const getDaysAgo = (date: any) => {
        const diffMs = new Date().getTime() - new Date(date).getTime();
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (days === 0) return "Today";
        if (days === 1) return "1 day ago";
        if (days < 7) return `${days} days ago`;
        const weeks = Math.floor(days / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    };

    return (
        <article className="max-w-4xl mx-auto">

            <header className="md:mb-12 mb-8">
                <div className="flex items-center gap-3 md:mb-6 mb-4">
                    <span className="px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                        {post.BlogCategory?.name || "Uncategorized"}
                    </span>
                    <span className="text-gray-400">•</span>
                    <time className="text-sm text-gray-500 flex items-center gap-2">
                        <CalendarDays size={16} />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>

                <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-primary md:mb-8 mb-4 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                            src={post?.author?.profileImage || "/avatar.png"}
                            fill
                            alt={post.author?.name || "Author"}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Written By</p>
                        <p className="font-bold text-primary">{post.author?.name || "Restuhub Team"}</p>
                    </div>
                </div>
            </header>


            <div className="relative aspect-video rounded-3xl overflow-hidden md:mb-16 mb-8 shadow-2xl">
                <Image
                    src={post.bannerImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            <div className="prose prose-lg max-w-none">
                {post.content?.blocks?.map((block, i) => renderBlock(block, i))}
            </div>


            <section className="bg-primary text-white p-4 md:p-8 rounded-3xl md:my-20 my-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/30 transition-colors duration-700"></div>
                <div className="relative z-10">
                    <h3 className="lg:text-3xl text-xl font-bold mb-4 md:mb-6">Kickstart Your Growth With Restuhub 🚀</h3>
                    <p className="text-gray-300 md:text-lg text-sm md:mb-10 mb-6 max-w-xl">
                        We help businesses dominate their local search and manage reviews automatically. Join the hundreds of brands scaling with Restuhub.
                    </p>
                    <Link
                        href="/#pricing"
                        className="primary-btn w-fit"
                    >
                        Free Consultation
                    </Link>
                </div>
            </section>

            <hr className="border-gray-100 lg:my-16 my-10" />


            <section id="comments" className="md:mt-20 mt-8">
                <div className="bg-white lg:rounded-3xl rounded-xl border border-gray-100 p-4 md:p-8 md:p-8 shadow-sm md:mb-16 mb-4">
                    <h4 className="text-2xl font-bold text-primary md:mb-8 mb-4">Leave a Reply</h4>
                    <form action={fromAction} className="space-y-6">
                        <input type="hidden" name="postId" value={post.id} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary !ml-1 block">Full Name <span className="text-secondary">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Adam Smith"
                                    required
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-primary ml-1 block">Email Address <span className="text-secondary">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-primary ml-1">Your Comment</label>
                            <textarea
                                name="content"
                                placeholder="Tell us more about your thought"
                                required
                                rows={5}
                                className="w-full px-5 py-3   bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="primary-btn"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Comment
                                </>
                            )}
                        </button>
                        {state?.success && state.msg && <p className="text-sm text-green-600 font-medium ml-1">{state.msg}</p>}
                        {!state?.success && state.msg && <p className="text-sm text-red-600 font-medium ml-1">{state.msg}</p>}
                    </form>
                </div>

                {post.Comment && post.Comment.filter((c) => c.approved === true).length > 0 && (
                    <div className="space-y-10">
                        <h4 className="text-2xl font-bold text-primary flex items-center gap-3">
                            <MessageCircleMore className="text-secondary" />
                            {post.Comment.filter((c) => c.approved === true).length} Comments
                        </h4>

                        <div className="md:space-y-8 space-y-6">
                            {[...post.Comment]
                                .filter((c) => c.approved === true)
                                .reverse()
                                .slice(0, visibleComments)
                                .map((comment) => (
                                    <div key={comment.id} className="flex gap-6 pb-8 border-b border-gray-50 last:border-0 group">
                                        <div className="shrink-0 w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl uppercase border border-secondary/20 shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h6 className="font-bold text-primary text-lg">{comment.name}</h6>
                                                <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">{getDaysAgo(comment.createdAt)}</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed text-base">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}

                            {visibleComments < post.Comment.filter((c) => c.approved === true).length && (
                                <div className="text-center md:pt-8 pt-6">
                                    <button
                                        onClick={loadMoreComments}
                                        className="px-8 py-3 rounded-xl border border-gray-200 text-primary font-bold hover:bg-gray-50 hover:border-secondary hover:text-secondary transition-all shadow-sm"
                                    >
                                        Load More Comments
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </article>
    );
};

export default BlogContent;
