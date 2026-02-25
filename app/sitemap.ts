export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { postList } from "./actions/blog/blog.actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://restruhub.com";
  const blogsResponse = await postList();
    const post = blogsResponse?.post?.postsWithContentObj || [];
    const blogUrls = Array.isArray(post)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? post.map((blog: any) => ({
          url: `${baseUrl}/blog/${blog.postSlug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt),
        }))
      : [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
