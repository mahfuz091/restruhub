"use server";

import { prisma } from "@/lib/prisma";

type ActionResult =
    | { success: true; msg: string; blogCategory?: any }
    | { success: false; msg: string };

export const blogCategoryList = async (): Promise<ActionResult> => {
    try {
        const blogCategory = await prisma.blogCategory.findMany();
        return {
            success: true,
            msg: "Category fetched successfully",
            blogCategory,
        };
    } catch (err) {
        console.error("blogCategoryList error:", err);
        return { success: false, msg: "Failed to fetch categories" };
    }
};

export const blogCategoryCreate = async (
    _prevState: any,
    formData: FormData
): Promise<ActionResult> => {
    try {
        const name = formData.get("name") as string;

        const existing = await prisma.blogCategory.findFirst({
            where: { name },
        });
        if (existing) {
            return { success: false, msg: "Category already exists" };
        }

        const created = await prisma.blogCategory.create({
            data: {
                name,
            },
        });
        return {
            success: true,
            msg: "Category created successfully",
            blogCategory: created,
        };
    } catch (err) {
        console.error("blogCategoryCreate error:", err);
        return { success: false, msg: "Failed to create category" };
    }
};

export const deleteBlogCategory = async (id: string): Promise<ActionResult> => {
    try {
        const deleted = await prisma.blogCategory.delete({
            where: { id },
        });
        return {
            success: true,
            msg: "Category deleted successfully",
            blogCategory: deleted,
        };
    } catch (err) {
        console.error("deleteBlogCategory error:", err);
        return { success: false, msg: "Failed to delete category" };
    }
};
