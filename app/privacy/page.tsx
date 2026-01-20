import PrivacyPolicy from "@/component/Home/PrivacyPolicy";
import React from "react";
import type { Metadata } from "next";

const SITE_URL = "https://restruhub.com";

export const metadata: Metadata = {
    title: "Privacy Policy | Restruhub – Data Protection & User Privacy",
    description:
        "Learn how Restruhub collects, uses, and protects your data. We are committed to privacy, security, and safe handling of your information.",

    alternates: {
        canonical: `${SITE_URL}/privacy`,
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Privacy Policy | RestruHub",
        description:
            "Learn how RestruHub protects your data and respects your privacy.",
        url: `${SITE_URL}/privacy`,
        siteName: "RestruHub",
        type: "article",
    },

    twitter: {
        card: "summary",
        title: "Privacy Policy | RestruHub",
        description:
            "Understand how RestruHub collects and protects your personal information.",
    },
};

const PrivacyPolicyPage = () => {
    return (
        <div>
            <PrivacyPolicy />
        </div>
    );
};

export default PrivacyPolicyPage;
