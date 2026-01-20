"use client"
import React from "react";
import { FadeInWhenVisible } from "@/component/shared/FadeInWhenVisible";
import {
  Building2,
  User,
  HelpCircle,
  ShieldCheck,
  Share2,
  Shield,
  Scale,
  Clock,
  Mail,
} from "lucide-react";

export default function TermsConditions() {
  const sections: SectionType[] = [
    {
      icon: <Building2 className="w-6 h-6 text-primary" />,
      title: "Our Service",
      text: `Restruhub is a software tool that helps restaurant owners:
- Manage reviews from Google
- Get AI-generated reply suggestions
- Use manual or automatic approval of review replies

We also offer future tools such as analytics and competitor insights.`,
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "User Account",
      text: `You are responsible for keeping your login secure. Do not share access with others. You must use your real restaurant business to connect with our system.`,
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      title: "Google Integration",
      text: `When you connect your Google Business Profile:
- We only access public data (reviews, business info)
- We never post replies without your permission (unless you enable auto-mode)
- You can revoke access from your Google Account anytime`,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Subscription & Cancellation",
      text: `Restruhub is a paid service with no free plan.
You can cancel your subscription at any time from your dashboard. Your access will remain until the end of the billing cycle.
No refunds are provided once a payment is made.`,
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Prohibited Use",
      text: `You agree not to use our platform for illegal or harmful activities.
We reserve the right to suspend any account that violates our terms.`,
    },
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      title: "Liability",
      text: `We provide our service “as-is” without guarantees.
We are not responsible for any business loss caused by use or misuse of our platform.`,
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Contact",
      text: `For questions or support, contact us:
support@restruhub.com`,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 pt-120">
      <FadeInWhenVisible>
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: 12/11/2025</p>
      </FadeInWhenVisible>

      <div className="space-y-10">
        {sections.map((sec, index) => (
          <FadeInWhenVisible key={index} delay={index * 0.1}>
            <Section {...sec} />
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  );
}

interface SectionType {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Section: React.FC<SectionType> = ({ icon, title, text }) => {
  return (
    <div className="flex items-start gap-4 ">
      <div className="mt-1">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {text.split(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g).map((part, i) =>
            /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/.test(part) ? (
              <a
                key={i}
                href={`mailto:${part.trim()}`}
                className="text-secondary underline hover:text-secondary/80 transition"
              >
                {part.trim()}
              </a>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </div>
    </div>
  );
};
