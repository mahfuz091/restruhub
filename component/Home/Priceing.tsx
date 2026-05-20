import PriceingClient from "./Priceing.client";
import type { Region } from "../../lib/region";
import { headers } from "next/headers";

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

function parseRegionFromAcceptLanguage(value?: string): Region {
  if (!value) return "global";
  const v = value.toLowerCase();
  if (v.includes("bn") || v.includes("bd")) return "bd";
  // basic heuristic for europe languages
  if (
    /(de|fr|es|it|nl|sv|no|fi|da|pt|pl|hu|cs|sk|sl|hr|ro|bg|el|et|lv|lt)/.test(
      v,
    )
  )
    return "eur";
  return "global";
}

function sortPlans(plans: PricingPlan[]) {
  return plans.slice().sort((l, r) => (l.order ?? 9999) - (r.order ?? 9999));
}

export default async function Pricing() {
  // detect region from headers if present (SSR)
  let region: Region = "global";
  try {
    const h = await headers();
    const headerRegion = h.get("x-region-code");
    if (
      headerRegion === "bd" ||
      headerRegion === "eur" ||
      headerRegion === "global"
    ) {
      region = headerRegion as Region;
    } else {
      region = parseRegionFromAcceptLanguage(
        h.get("accept-language") ?? undefined,
      );
    }
  } catch {
    region = "global";
  }

  let plans: PricingPlan[] = sortPlans(fallbackPlans);

  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/pricing-plans?region=${region}`,
      {
        headers: { "x-region-code": region },
        cache: "no-store",
      },
    );
    if (res.ok) {
      const json = (await res.json()) as { data?: PricingPlan[] };
      console.log(json);
      plans = sortPlans(json.data ?? fallbackPlans);
    }
  } catch {
    // keep fallback
  }

  return <PriceingClient initialPlans={plans} initialRegion={region} />;
}
