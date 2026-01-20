"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type PostWithRelations = {
    id: string;
    title: string;
    shortDesc: string | null;
    authorId: string | null;
    createdAt: Date;
    updatedAt: Date;
    blogCategoryId: string | null;
    bannerImage: string;
    content: any;
    postSlug: string;
    bannerAltText: string | null;
    canonicalUrl: string | null;
    metaDescription: string | null;
    metaTitle: string | null;
    author: { id: string; name: string | null; email: string; profileImage: string | null } | null;
    BlogCategory: { id: string; name: string } | null;
    Comment?: {
        id: string;
        name: string;
        email: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        approved: boolean | null;
    }[];
    _count?: {
        Comment: number;
    };
};


type ActionResult<T> = { success: boolean; msg: string; post?: T; data?: T };

export const postList = async (): Promise<
    ActionResult<{
        postsWithContentObj: PostWithRelations[];
    }>
> => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                shortDesc: true,
                bannerImage: true,
                bannerAltText: true,
                createdAt: true,
                updatedAt: true,
                postSlug: true,
                metaDescription: true,
                content: true,
                author: {
                    select: { id: true, name: true, profileImage: true },
                },
                BlogCategory: { select: { id: true, name: true } },
                _count: {
                    select: {
                        Comment: {
                            where: { approved: true },
                        },
                    },
                },
            },
        });



        const postsWithContentObj = posts.map((post) => ({
            ...post,
            content:
                typeof post.content === "string"
                    ? JSON.parse(post.content)
                    : post.content ?? null,
        })) as unknown as PostWithRelations[];

        return {
            success: true,
            msg: "Posts fetched successfully",
            post: { postsWithContentObj },
        };
    } catch (err) {
        console.error("postList error:", err);
        return { success: false, msg: "Failed to fetch posts" };
    }
};

export const getPostBySlug = async (
    postSlug: string
): Promise<ActionResult<PostWithRelations>> => {
    try {
        const post = await prisma.post.findUnique({
            where: { postSlug },
            include: {
                author: {
                    select: { id: true, name: true, email: true, profileImage: true },
                },
                BlogCategory: { select: { id: true, name: true } },
                Comment: {
                    orderBy: { createdAt: "asc" },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        approved: true,
                    },
                },
            },
        });

        if (!post) return { success: false, msg: "Post not found" };


        let parsedContent: any = {};
        if (post.content) {
            parsedContent =
                typeof post.content === "string"
                    ? JSON.parse(post.content)
                    : post.content;
        }

        return {
            success: true,
            msg: "Post fetched successfully",
            post: {
                ...(post as any),
                content: parsedContent,
            } as PostWithRelations,
        };
    } catch (err) {
        console.error("getPostBySlug error:", err);
        return { success: false, msg: "Failed to fetch post" };
    }
};


export const createComment = async (
    _prevState: any,
    formData: FormData
): Promise<ActionResult<any>> => {
    try {

        const postId = formData.get("postId")?.toString() || "";
        const name = formData.get("name")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const content = formData.get("content")?.toString() || "";

        if (!postId || !name || !email || !content) {
            return { success: false, msg: "All fields are required" };
        }

        const postExists = await prisma.post.findUnique({ where: { id: postId } });
        if (!postExists) return { success: false, msg: "Post does not exist" };

        const comment = await prisma.comment.create({
            data: { postId, name, email, content },
            include: { post: { select: { id: true, title: true } } },
        });

        revalidatePath("/blog");

        return {
            success: true,
            msg: "Your comment is submitted. It will be visible after admin approval.",
            data: comment,
        };
    } catch (err) {
        console.error("createComment error:", err);
        return { success: false, msg: "Failed to create comment" };
    }
};
