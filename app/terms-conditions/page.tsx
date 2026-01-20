import TermsConditions from "@/component/Home/TermsConditions";
import React from "react";
import type { Metadata } from "next";

const SITE_URL = "https://restruhub.com";

export const metadata: Metadata = {
    title: "Terms & Conditions | Restruhub – Service Usage Rules",
    description:
        "Review Restruhub’s terms and conditions to understand user responsibilities, service usage, payments, and platform policies.",

    alternates: {
        canonical: `${SITE_URL}/terms-conditions`,
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Terms & Conditions | RestruHub",
        description:
            "Read RestruHub’s Terms & Conditions for service usage rules, payments, and user responsibilities.",
        url: `${SITE_URL}/terms-conditions`,
        siteName: "RestruHub",
        type: "article",
    },

    twitter: {
        card: "summary",
        title: "Terms & Conditions | RestruHub",
        description:
            "Understand RestruHub’s service usage rules, responsibilities, and platform policies.",
    },
};

const TermsConditionsPage = () => {
    return (
        <div>
            <TermsConditions />
        </div>
    );
};

export default TermsConditionsPage;
