"use client";
import React, { useState } from "react";
import { Check, MoveRight } from "lucide-react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";


interface Plan {
  name: string;
  tag: string;
  tagColor: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic Plan",
    tag: "Starter ",
    tagColor: "bg-blue-500",
    monthlyPrice: "$29",
    yearlyPrice: "$190",
    description: "For individual restaurants",
    features: [
      "Reply to up to 100 Google reviews",
      "Full analytics dashboard",

      "Weekly performance reports",
      "Quick-reply templates",
      "Real-time alerts",
      "Priority support",
    ],
  },
  {
    name: "Advance",
    tag: "ADVANCE",
    tagColor: "bg-[#F16C11]",
    monthlyPrice: "$59",
    yearlyPrice: "$290",
    description: " For small chains (up to 5 restaurants)",
    features: [
      "Reply to up to 400 Google reviews",
      "Multi-location dashboard",
      "Centralized review inbox",
      "Team access (up to 3 members)",

      "Competitor review insights",
      "Monthly optimization suggestions",
    ],
    popular: true,
  },
  {
    name: "Pro",
    tag: "PRO",
    tagColor: "bg-[#B1060F]",
    monthlyPrice: "$99",
    yearlyPrice: "$640",
    description: "For agencies & larger chains (up to 10 restaurants)",
    features: [
      "Unlimited Google review replies",
      "Multi-team workflow",
      "Automated tagging & categorization",
      "Exportable CSV reports",
      "Brand-level sentiment analytics",
      "Custom onboarding + dedicated support",

    ],
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="pt-120">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="title text-center">Simple, Transparent Pricing</h2>
          <div className="pt-[30px]">
            <div className="flex justify-center ">
              <div className="relative h-[65px] w-[300px] inline-flex items-center bg-white rounded-xl p-1.2  border border-[#00B67A]">
                <div
                  className={`
        absolute top-2 left-2 h-[48px] w-[140px] rounded-xl 
        bg-gradient-to-r from-[#00B67A] to-[#006242] 
        shadow-md
        transition-all duration-500 ease-out
        ${billing === "yearly" ? "translate-x-full" : "translate-x-0"}
      `}
                />

                <button
                  onClick={() => setBilling("monthly")}
                  className="relative cursor-pointer z-10 px-10 py-2 rounded-full font-bold text-lg transition-colors duration-300"
                >
                  <span
                    className={
                      billing === "monthly" ? "text-white" : "text-[#545A64]"
                    }
                  >
                    Monthly
                  </span>
                </button>

                <button
                  onClick={() => setBilling("yearly")}
                  className="relative cursor-pointer z-10 px-10 py-2 rounded-full font-bold text-lg flex items-center gap-3 transition-colors duration-300"
                >
                  <span
                    className={
                      billing === "yearly" ? "text-white" : "text-[#545A64]"
                    }
                  >
                    Yearly
                  </span>
                </button>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  pt-60">
          {plans.map((plan, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div

                className={`relative bg-white h-full border-[#E8EDFA] border rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 ${plan.popular ? "" : ""
                  }`}
              >
                <div
                  className={`absolute top-6 uppercase left-6 ${plan.tagColor} text-white px-4 py-1 rounded-full text-sm font-bold`}
                >
                  {plan.tag}
                </div>

                <div className="pt-16 pb-10 px-8 ">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.monthlyPrice === "Free" ? (
                      "Free"
                    ) : (
                      <>
                        {billing === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice}
                        <span className="text-lg text-gray-500 font-normal">
                          {billing === "monthly" ? "/month" : "/year"}
                        </span>
                      </>
                    )}
                  </h3>

                  <p className="text-gray-600 mb-8">{plan.description}</p>

                  <button
                    className={`relative w-full overflow-hidden py-2.5 rounded-2xl font-bold text-lg 
    flex items-center justify-center gap-3 
    transition-all duration-500 ease-out
    group/btn isolate cursor-pointer
    ${plan.popular
                        ? "bg-gradient-to-r from-[#00B67A] to-[#006242] text-white shadow-xl"
                        : "bg-white text-[#006242] border-2 border-[#00B67A] shadow-lg"
                      }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-[#00B67A] to-[#006242] 
      transition-transform duration-500 ease-out origin-left
      ${plan.popular
                          ? "translate-x-0"
                          : "-translate-x-full group-hover/btn:translate-x-0"
                        }`}
                    />

                    <div
                      className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 
      transition-opacity duration-700 pointer-events-none`}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 skew-x-12"
                      />
                    </div>

                    <span
                      className="relative z-10 flex items-center gap-3 transition-colors duration-300 
    group-hover/btn:text-white"
                    >
                      Choose This Plan
                      <MoveRight
                        className="w-5 h-5 transition-all duration-500 ease-out 
      group-hover/btn:translate-x-3 group-hover/btn:scale-110"
                      />
                    </span>
                  </button>


                  <ul className="mt-10 space-y-4 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 ">
                        <Check className="w-6 h-6 p-1 rounded-full text-secondary  flex-shrink-0 bg-[#00B67A29]" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;