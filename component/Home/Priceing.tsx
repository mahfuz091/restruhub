"use client";
import React, { useEffect, useState } from "react";
import { Check, MoveRight } from "lucide-react";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";
import { getRegion, type Region } from "../../lib/region";

type BillingCycle = "monthly" | "half-yearly" | "yearly";

interface PricingPlan {
  _id: string;
  name: string;
  market: "global" | "bd";
  description: string;
  monthlyPrice?: number | null;
  halfYearlyPrice?: number | null;
  yearlyPrice?: number | null;
  monthlyPriceEur?: number | null;
  halfYearlyPriceEur?: number | null;
  yearlyPriceEur?: number | null;
  currency: "USD" | "EUR" | "BDT";
  pricingType: string;
  billingOptions: BillingCycle[];
  features: string[];
  cta: {
    label: string;
    type: string;
  };
  highlight: boolean;
  customPricingLabel?: string;
  trialDays?: number | null;
  order?: number;
  maxUsers?: number;
  reviewsPerMonth?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_SERVICE_URL ?? "/api";

const fallbackPlans: PricingPlan[] = [
  {
    _id: "fallback-free",
    name: "Free Trial",
    market: "bd",
    description:
      "Try the full review management experience for one restaurant location — free for 14 days.",
    monthlyPrice: null,
    monthlyPriceEur: null,
    halfYearlyPrice: null,
    halfYearlyPriceEur: null,
    yearlyPrice: null,
    yearlyPriceEur: null,
    currency: "BDT",
    pricingType: "free_trial",
    billingOptions: [],
    features: [
      "1 restaurant",
      "See all customer reviews in one place",
      "Reply to every review easily",
      "Auto-reply for good reviews",
      "Control replies for bad reviews",
      "See what customers like and what needs improvement",
      "Simple score to understand performance",
      "View data for last 1 day, 7 days, and 30 days",
      "Instant alerts on WhatsApp and Email",
    ],
    cta: { label: "Start Free Trial", type: "primary" },
    highlight: false,
    trialDays: 14,
    maxUsers: 3,
    reviewsPerMonth: 150,
    order: 0,
  },
  {
    _id: "fallback-single-location",
    name: "Single Location",
    market: "bd",
    description:
      "Perfect for restaurant owners who want to stay on top of reviews without extra work.",
    monthlyPrice: null,
    monthlyPriceEur: null,
    halfYearlyPrice: 4200,
    halfYearlyPriceEur: 4200,
    yearlyPrice: 7200,
    yearlyPriceEur: 7200,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["half-yearly", "yearly"],
    features: [
      "1 business location",
      "Reviews tracked: 150 / month",
      "Central review manager dashboard",
      "Smart suggested replies (edit or send instantly)",
      "Manual & automated responses",
      "Review sentiment insights (food, service, staff, value)",
      "Instant alerts via WhatsApp + Email",
      "Alert controls by star rating (1★–5★)",
      "Up to 3 team members",
      "Email support",
      "Help center access",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: false,
    maxUsers: 3,
    reviewsPerMonth: 150,
    order: 1,
  },
  {
    _id: "fallback-multi-location",
    name: "Multi Location",
    market: "bd",
    description:
      "Built for owners managing multiple restaurants or growing brands from one place.",
    monthlyPrice: null,
    monthlyPriceEur: null,
    halfYearlyPrice: 10800,
    halfYearlyPriceEur: 10800,
    yearlyPrice: 18000,
    yearlyPriceEur: 18000,
    currency: "BDT",
    pricingType: "fixed",
    billingOptions: ["half-yearly", "yearly"],
    features: [
      "Up to 5 restaurants",
      "Manage all locations from one place",
      "Reply to all reviews from one dashboard",
      "Auto-reply for good reviews",
      "Full control for bad reviews",
      "Clear insights: what is working, what is not",
      "Track performance for each branch",
      "View data for last 1 day, 7 days, and 30 days",
      "Instant alerts and activity tracking",
      "Download reports",
    ],
    cta: { label: "Purchase Now", type: "primary" },
    highlight: true,
    maxUsers: 5,
    reviewsPerMonth: 900,
    order: 2,
  },
  {
    _id: "fallback-enterprise",
    name: "Enterprise",
    market: "bd",
    description:
      "For restaurant groups and franchises that need full visibility, reporting, and control.",
    monthlyPrice: null,
    monthlyPriceEur: null,
    halfYearlyPrice: null,
    halfYearlyPriceEur: null,
    yearlyPrice: null,
    yearlyPriceEur: null,
    currency: "BDT",
    customPricingLabel: "Custom Pricing",
    pricingType: "custom",
    billingOptions: [],
    features: [
      "Unlimited restaurants",
      "Manage all locations in one dashboard",
      "Reply to all reviews easily",
      "Auto-reply for good reviews",
      "Full control for bad reviews",
      "Clear insights: what is working, what needs improvement",
      "Detailed performance tracking",
      "View data for last 1 day, 7 days, and 30 days",
      "Instant alerts on WhatsApp and Email",
      "Advanced reports and export options",
      "Dedicated support",
    ],
    cta: { label: "Contact / Demo", type: "secondary" },
    highlight: false,
    maxUsers: 9999,
    reviewsPerMonth: 999999,
    order: 3,
  },
];

const PLAN_BADGES = ["FREE TRIAL", "STARTER", "ADVANCE", "PRO", "ENTERPRISE"];
const PLAN_BADGE_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-[#F16C11]",
  "bg-[#B1060F]",
  "bg-[#525252]",
];

const CURRENCY_SYMBOL: Record<"USD" | "EUR" | "BDT", string> = {
  USD: "$",
  EUR: "€",
  BDT: "৳",
};

const getBillingLabel = (cycle: BillingCycle) => {
  if (cycle === "monthly") return "Monthly";
  if (cycle === "half-yearly") return "Half-Yearly";
  return "Yearly";
};

const getBillingSuffix = (cycle: BillingCycle) => {
  if (cycle === "monthly") return "/month";
  if (cycle === "half-yearly") return "/6 months";
  return "/year";
};

const sortPlans = (plans: PricingPlan[]) =>
  plans
    .slice()
    .sort((left, right) => (left.order ?? 9999) - (right.order ?? 9999));

const getBadgeLabel = (plan: PricingPlan, index: number) => {
  if (plan.pricingType === "free_trial") return PLAN_BADGES[0];
  return PLAN_BADGES[plan.order ?? index] || plan.name.toUpperCase();
};

const getBadgeColor = (plan: PricingPlan, index: number) => {
  if (plan.highlight) return PLAN_BADGE_COLORS[2];
  return PLAN_BADGE_COLORS[plan.order ?? index] || PLAN_BADGE_COLORS[4];
};

const getCurrencyCode = (plan: PricingPlan, region: Region) => {
  if (plan.market === "bd") return "BDT";
  if (region === "eur") return "EUR";
  return "USD";
};

const getPriceValue = (
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
) => {
  if (plan.pricingType === "free_trial" || plan.pricingType === "custom") {
    return null;
  }

  const useEurPrices = plan.market === "global" && region === "eur";

  if (cycle === "monthly") {
    return useEurPrices
      ? (plan.monthlyPriceEur ?? plan.monthlyPrice)
      : plan.monthlyPrice;
  }

  if (cycle === "half-yearly") {
    return useEurPrices
      ? (plan.halfYearlyPriceEur ?? plan.halfYearlyPrice)
      : plan.halfYearlyPrice;
  }

  return useEurPrices
    ? (plan.yearlyPriceEur ?? plan.yearlyPrice)
    : plan.yearlyPrice;
};

const getPriceText = (
  plan: PricingPlan,
  cycle: BillingCycle,
  region: Region,
) => {
  if (plan.pricingType === "free_trial") {
    return plan.customPricingLabel?.trim() || "Free";
  }

  if (plan.pricingType === "custom") {
    return plan.customPricingLabel?.trim() || "Custom Pricing";
  }

  const price = getPriceValue(plan, cycle, region);
  if (price == null) {
    return plan.customPricingLabel?.trim() || "Custom Pricing";
  }

  return `${CURRENCY_SYMBOL[getCurrencyCode(plan, region)]}${price.toLocaleString()}`;
};

const getPriceSuffix = (plan: PricingPlan, cycle: BillingCycle) => {
  if (plan.pricingType === "free_trial" || plan.pricingType === "custom") {
    return null;
  }

  return getBillingSuffix(cycle);
};

const addLimitsToFeatures = (plan: PricingPlan) => {
  const items: string[] = [];

  if (typeof plan.maxUsers === "number") {
    items.push(`Up to ${plan.maxUsers.toLocaleString()} users`);
  }

  if (typeof plan.reviewsPerMonth === "number") {
    items.push(`Up to ${plan.reviewsPerMonth.toLocaleString()} reviews`);
  }

  return [...items, ...(plan.features ?? [])];
};

const resolveApiPlans = (plans: PricingPlan[]) => sortPlans(plans);

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [region, setRegion] = useState<Region>("global");
  const [plans, setPlans] = useState<PricingPlan[]>(sortPlans(fallbackPlans));

  useEffect(() => {
    let alive = true;

    void getRegion().then((detectedRegion) => {
      if (alive) {
        setRegion(detectedRegion);
      }
    });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;

    const loadPlans = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/pricing-plans?region=${region}`,
          {
            method: "GET",
            headers: {
              "x-region-code": region,
            },
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to load pricing plans (${response.status})`);
        }

        const result = (await response.json()) as { data?: PricingPlan[] };
        if (!alive) return;

        setPlans(resolveApiPlans(result.data ?? []));
      } catch {
        if (!alive) return;

        setPlans(sortPlans(fallbackPlans));
      }
    };

    void loadPlans();

    return () => {
      alive = false;
    };
  }, [region]);

  const availableCycles = Array.from(
    new Set(
      plans
        .filter((plan) => plan.pricingType !== "free_trial")
        .flatMap((plan) => plan.billingOptions ?? []),
    ),
  ).filter((cycle): cycle is BillingCycle =>
    ["monthly", "half-yearly", "yearly"].includes(cycle),
  );

  useEffect(() => {
    if (availableCycles.length === 0) return;
    if (!availableCycles.includes(billingCycle)) {
      setBillingCycle(availableCycles[0]);
    }
  }, [availableCycles, billingCycle]);

  const activeCycleIndex = Math.max(availableCycles.indexOf(billingCycle), 0);
  const cycleCount = availableCycles.length || 2;

  return (
    <div className="pt-120">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="text-center title">Simple, Transparent Pricing</h2>
          <div className="pt-7.5">
            <div className="flex justify-center">
              <div className="inline-flex relative items-center bg-white p-1.2 border border-[#00B67A] rounded-xl w-75 h-16.25">
                <div
                  className="top-2 left-2 absolute bg-linear-to-r from-[#00B67A] to-[#006242] shadow-md rounded-xl h-12 transition-all duration-500 ease-out"
                  style={{
                    width: `${100 / cycleCount}%`,
                    transform: `translateX(${activeCycleIndex * 100}%)`,
                  }}
                />

                {(availableCycles.length > 0
                  ? availableCycles
                  : (["monthly", "yearly"] as BillingCycle[])
                ).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className="z-10 relative flex-1 px-6 py-2 rounded-full font-bold text-lg transition-colors duration-300 cursor-pointer"
                  >
                    <span
                      className={
                        billingCycle === cycle ? "text-white" : "text-[#545A64]"
                      }
                    >
                      {getBillingLabel(cycle)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 pt-60">
          {plans.map((plan, index) => {
            const cycleSupported =
              plan.pricingType === "free_trial" ||
              plan.pricingType === "custom" ||
              plan.billingOptions.length === 0 ||
              plan.billingOptions.includes(billingCycle);
            const priceValue = getPriceValue(plan, billingCycle, region);
            const priceText = getPriceText(plan, billingCycle, region);
            const priceSuffix = getPriceSuffix(plan, billingCycle);
            const buttonDisabled =
              plan.pricingType === "fixed" &&
              (!cycleSupported || priceValue == null);
            const badge = getBadgeLabel(plan, index);
            const badgeClass = getBadgeColor(plan, index);
            const features = addLimitsToFeatures(plan);

            return (
              <FadeInWhenVisible key={plan._id} delay={index * 0.1}>
                <div className="relative bg-white shadow-xl hover:shadow-2xl border border-[#E8EDFA] rounded-3xl h-full overflow-hidden transition-all hover:-translate-y-3 duration-300">
                  <div
                    className={`absolute top-6 uppercase left-6 ${badgeClass} text-white px-4 py-1 rounded-full text-sm font-bold`}
                  >
                    {badge}
                  </div>

                  <div className="px-8 pt-16 pb-10">
                    <h3 className="mb-2 font-bold text-gray-900 text-3xl">
                      {plan.pricingType === "free_trial" ? (
                        <>
                          {priceText}
                          {plan.trialDays && (
                            <span className="ml-2 font-normal text-gray-500 text-lg">
                              — {plan.trialDays} days
                            </span>
                          )}
                        </>
                      ) : plan.pricingType === "custom" ? (
                        priceText
                      ) : priceValue == null ? (
                        "—"
                      ) : (
                        <>
                          {priceText}
                          {priceSuffix && (
                            <span className="font-normal text-gray-500 text-lg">
                              {priceSuffix}
                            </span>
                          )}
                        </>
                      )}
                    </h3>

                    <p className="mb-8 text-gray-600">{plan.description}</p>

                    <button
                      onClick={() => {
                        if (buttonDisabled) return;
                        window.open(
                          "https://dashboard.restruhub.com",
                          "_blank",
                        );
                      }}
                      disabled={buttonDisabled}
                      className={`relative w-full overflow-hidden py-2.5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500 ease-out group/btn isolate cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        plan.highlight
                          ? "bg-linear-to-r from-[#00B67A] to-[#006242] text-white shadow-xl"
                          : "bg-white text-[#006242] border-2 border-[#00B67A] shadow-lg"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-linear-to-r from-[#00B67A] to-[#006242] transition-transform duration-500 ease-out origin-left ${
                          plan.highlight
                            ? "translate-x-0"
                            : "-translate-x-full group-hover/btn:translate-x-0"
                        }`}
                      />

                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform -translate-x-full group-hover/btn:translate-x-full duration-1000" />
                      </div>

                      <span className="z-10 relative flex items-center gap-3 group-hover/btn:text-white transition-colors duration-300">
                        {plan.cta.label || "Choose This Plan"}
                        <MoveRight className="w-5 h-5 group-hover/btn:scale-110 transition-all group-hover/btn:translate-x-3 duration-500 ease-out" />
                      </span>
                    </button>

                    <ul className="space-y-4 mt-10 text-left">
                      {features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-4"
                        >
                          <Check className="bg-[#00B67A29] p-1 rounded-full w-6 h-6 text-secondary shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
