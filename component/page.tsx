import BlogBanner from "@/component/Blog/BlogBanner";
import BlogList from "@/component/Blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read the latest insights and tips on restaurant review management and AI automation on the RestruHub blog.",
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white">
            <BlogBanner />
            <BlogList />
        </main>
    );
}
