"use client";
import { ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Do replies get published automatically?",
    answer: "No. Replies are never published without your approval unless you turn on the auto-publish option. You stay in control of every response.",
  },
  {
    question: " Can I change the tone or style of replies?",
    answer:
      "Yes. You can choose a tone that fits your brand — friendly, professional, or casual. AI will write replies in that style every time.",
  },
  {
    question: "Will this work for multiple restaurant locations?",
    answer: "Yes. If you manage more than one restaurant, you can connect each location to your dashboard and manage all reviews in one place.",
  },
  {
    question: "Is it safe to connect my Google account?",
    answer: "Yes. We use secure Google authentication (OAuth), and you can disconnect your account anytime. We never post without permission.",
  },
  {
    question: "Do I need to install anything or hire staff?",
    answer: "No. It’s 100% web-based. Just log in, connect your Google account, set your preferences, and you’re ready to go. No downloads, no extra staff.",
  },
  {
    question: " Can I edit or rewrite the AI reply?",
    answer: "Absolutely. You can edit, rewrite, or customize any reply before posting. It’s designed to save you time, not take away your control.",
  },

  {
    question: "What platforms does this work with?",
    answer: "We currently support Google reviews. Support for Facebook and TripAdvisor is coming soon.",
  },
  {
    question: " Can my staff help manage the reviews too?",
    answer: "Yes. You can invite team members, assign permission levels, and approve replies together using team access.",
  },
  {
    question: " Does the AI improve based on my edits?",
    answer: "Yes. The more you approve or edit replies, the better the AI learns your preferred tone and style.",
  },
  {
    question: " What if I don’t want to use AI at all?",
    answer: "You can turn off AI completely and write every reply manually. The dashboard still helps you stay organized and track review performance.",
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [heights, setHeights] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newHeights = contentRefs.current.map((el) => el?.scrollHeight || 0);
    setHeights(newHeights);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-120">
      <div className="bg-[#E0E0E030] pt">
        <div className="container  rounded-xl">
          <div className="py-10 lg:py-14 ">
            <FadeInWhenVisible>
              <div className="flex  flex-col md:flex-row justify-between items-center gap-4 w-full p-4">
                <h2 className="title max-w-[505px] text-2xl font-bold">
                  Your Questions, Answered
                </h2>
                <div className="w-full md:w-auto">
                  <a href="#pricing" className="hover:text-secondary transition">
                    <button className="primary-btn flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-5 h-5" />
                    </button></a>

                </div>
              </div>
            </FadeInWhenVisible>

            <div className="pt-[20px] lg:pt-[40px] md:px-16">
              {faqData.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <FadeInWhenVisible key={index} delay={index * 0.1}>
                    <div className="my-4 p-4  md:p-6 rounded-xl cursor-pointer bg-white text-[#181818] transition-all duration-300">
                      <div
                        className="flex justify-between items-center"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="text-sm sm:text-lg md:text-2xl font-medium">
                          {item.question}
                        </span>
                        <span
                          className={`border h-7 w-7 rounded-full flex justify-center font-extrabold items-center p-4 transition-transform duration-300 ${isOpen
                            ? "rotate-180 border-none bg-secondary text-white"
                            : "rotate-0 border-secondary"
                            }`}
                        >
                          ↑
                        </span>
                      </div>

                      <div
                        ref={(el: HTMLDivElement | null) => {
                          contentRefs.current[index] = el;
                        }}
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{
                          maxHeight: isOpen ? `${heights[index] || 0}px` : "0px",
                        }}
                      >
                        <p className="text-sm md:text-[18px] text-[#181818CC] mt-3">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Faq;
