"use client"
import React from "react";
import BlogCard from "./BlogCard";

const blogPosts = [
    {
        image: "/Images/manage-review.png",
        category: "MANAGEMENT",
        title: "How to Respond to Negative Reviews Gracefully",
        description: "Learn the art of turning a negative customer experience into a positive one with these simple response techniques.",
        date: "May 15, 2025",
        author: "Shahinul Islam"
    },
    {
        image: "/Images/review-replies.png",
        category: "AI TECHNOLOGY",
        title: "The Future of AI in the Restaurant Industry",
        description: "Explore how artificial intelligence is revolutionizing how restaurants interact with their customers and manage their reputation.",
        date: "June 02, 2025",
        author: "RestruHub Team"
    },

    {
        image: "/Images/DashboardSingle.png",
        category: "TUTORIAL",
        title: "Setting Up Your RestruHub Dashboard",
        description: "A comprehensive guide to getting started with RestruHub and connecting your first restaurant location.",
        date: "July 05, 2025",
        author: "Support Team"
    },
    {
        image: "/Images/manage-review.png",
        category: "STRATEGY",
        title: "Building Customer Loyalty Through Online Engagement",
        description: "Why responding to every review matters more than you think for your long-term restaurant success.",
        date: "August 12, 2025",
        author: "Shahinul Islam"
    },
    {
        image: "/Images/review-replies.png",
        category: "REPORTS",
        title: "Understanding Your Analytics Performance",
        description: "How to read your weekly performance reports and use the data to make better business decisions.",
        date: "September 01, 2025",
        author: "Data Analyst"
    }
];

const BlogList = () => {
    return (
        <div className="pb-100 pt-60">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="grid  gap-8 col-span-8 border-r border-[#0000000D] pr-12">
                        {blogPosts.map((post, index) => (
                            <BlogCard
                                key={index}
                                index={index}
                                {...post}
                            />
                        ))}
                    </div>
                    <div className="col-span-4  pl-12">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
