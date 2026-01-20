"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Share2, Facebook, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface TOCProps {
    blocks: any[];
    postSlug: string;
}

const TableOfContents = ({ blocks, postSlug }: TOCProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const contentRef = useRef<HTMLUListElement>(null);
    const [height, setHeight] = useState("auto");

    const headers = blocks
        .map((block, index) => ({ ...block, index }))
        .filter((block) => block.type === "header" && block.data.level === 2);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen, headers.length]);

    const shareUrl = `https://restuhub.com/blog/${postSlug}`;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
                <button
                    className="w-full flex justify-between items-center p-5 text-primary font-bold bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flex items-center gap-2">
                        Table of Contents
                    </span>
                    <span className="text-secondary">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                </button>

                <ul
                    ref={contentRef}
                    className="px-5 py-2 space-y-1"
                    style={{
                        height: height,
                        overflow: "hidden",
                        transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {headers.map((header) => (
                        <li key={header.index} className="group">
                            <a
                                href={`#${header.id}`}
                                className="flex items-start gap-2 py-3 text-sm text-gray-600 hover:text-secondary group-hover:translate-x-1 transition-all duration-200"
                            >
                                <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5 opacity-40 group-hover:opacity-100" />
                                <span className="font-medium">{header.data.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>


            <div className="bg-primary p-6 rounded-2xl text-white shadow-xl shadow-primary/10">
                <h5 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                    <Share2 size={14} className="text-white" /> Share Story
                </h5>
                <div className="flex gap-4">
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-all duration-300"
                    >
                        <Facebook size={18} />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-all duration-300"
                    >
                        <Twitter size={18} />
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-all duration-300"
                    >
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TableOfContents;
