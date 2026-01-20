"use client";

import React, { useState } from "react";

interface FilterProps {
    categories: string[];
    onSelectCategory: (category: string) => void;
    activeCategory: string;
}

const Filter: React.FC<FilterProps> = ({ categories, onSelectCategory, activeCategory }) => {
    const handleClick = (category: string) => {
        onSelectCategory(category);
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === ""
                    ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary"
                    }`}
                onClick={() => handleClick("")}
            >
                All Blogs
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                        ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/20"
                        : "bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary"
                        }`}
                    onClick={() => handleClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Filter;
