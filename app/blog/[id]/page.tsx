import { blogCategoryList } from "@/app/actions/blog/blogCategory";
import { getPostBySlug, postList } from "@/app/actions/blog/blog.actions";
import BlogDetailsPage from "@/component/Blog/BlogDetailsPage/BlogDetailsPage";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const result = await getPostBySlug(id);

    if (!result.success || !result.post) {
        return {
            title: "Blog not found",
            description: "The requested blog post could not be found.",
        };
    }

    const post = result.post;
    const ogImage = post.bannerImage || "";
    const SITE_URL = "https://restruhub.com";
    const canonicalUrl = `${SITE_URL}/blog/${post.postSlug}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.shortDesc || "",
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.shortDesc || "",
            url: canonicalUrl,
            siteName: "RestruHub",
            images: post.bannerImage
                ? [{ url: ogImage, alt: post.bannerAltText || post.title }]
                : [],
            type: "article",
            publishedTime: new Date(post.createdAt).toISOString(),
        },
        twitter: {
            card: "summary_large_image",
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.shortDesc || "",
            images: post.bannerImage
                ? [{ url: ogImage, alt: post.bannerAltText || post.title }]
                : [],
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
    const blogsResponse = await postList();
    const blogsArray = blogsResponse.success && blogsResponse.post?.postsWithContentObj
        ? blogsResponse.post.postsWithContentObj
        : [];

    return blogsArray.map((blog: any) => ({
        id: blog.postSlug,
    }));
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const [result, blogCategoriesResponse, allBlogsResult] = await Promise.all([
        getPostBySlug(id),
        blogCategoryList(),
        postList()
    ]);

    if (!result.success || !result.post) {
        return (
            <div className='min-h-screen pt-40 px-4 text-center'>
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-4">Blog not found</h2>
                    <p className="text-gray-500 mb-8">The post you are looking for doesn&apos;t exist or has been moved.</p>
                    <a href="/blog" className="inline-block px-8 py-4 bg-secondary text-white font-bold rounded-xl">Back to Blog</a>
                </div>
            </div>
        );
    }

    const categoriesArray = (blogCategoriesResponse.success && Array.isArray(blogCategoriesResponse.blogCategory))
        ? blogCategoriesResponse.blogCategory
        : [];


    return (
        <BlogDetailsPage
            post={result.post}
            blogCategories={categoriesArray}
            allBlogs={allBlogsResult || []}
        />
    );
}
