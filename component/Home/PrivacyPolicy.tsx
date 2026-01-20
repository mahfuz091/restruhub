
"use client"
import { FadeInWhenVisible } from "@/component/shared/FadeInWhenVisible";
import {
  Building2,
  Database,
  HelpCircle,
  ShieldCheck,
  Share2,
  Shield,
  Scale,
  Clock,
  Cookie,
  BadgeDollarSign,
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  const sections: SectionType[] = [
    {
      icon: <Building2 className="w-6 h-6 text-primary" />,
      title: "Who We Are",
      text: `Restruhub is a service offered by Shahinul LLC (United States) 
that helps restaurant owners manage and reply to customer reviews using AI assistance.
We are committed to protecting your privacy and complying with GDPR where applicable.`,
    },
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: "What Information We Collect",
      text: `We collect:
- Your name, email, account details
- Restaurant/business details
- Google Business Profile data (if connected)
- IP address and basic analytics data`,
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      title: "Why We Collect This Data",
      text: `We collect this data to:
- Allow login via Google OAuth
- Fetch & display reviews
- Generate AI-based reply drafts
- Improve platform performance
- Provide support and ensure security`,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Google Account & OAuth Access",
      text: `If you connect Google Business Profile:
- We access minimum required data only
- We never post without your permission (unless auto-reply is enabled)
- We follow Google API Services User Data Policy
You may revoke access anytime from Google Account settings.`,
    },
    {
      icon: <Share2 className="w-6 h-6 text-primary" />,
      title: "Data Sharing",
      text: `We do not sell, rent, or share your data with any third parties. 
Your data is used only to provide our services.`,
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "How We Store & Protect Data",
      text: `We use:
- Secure cloud infrastructure
- SSL encryption
- Strict access controls`,
    },
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      title: "Your Rights (Under GDPR)",
      text: `EU/EEA users may:
- Access their data
- Correct or delete data
- Withdraw consent anytime
Contact: support@restruhub.com`,
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Data Retention",
      text: `We store your data only as long as needed.
If you cancel your account, all data will be deleted within 30 days.`,
    },
    {
      icon: <Cookie className="w-6 h-6 text-primary" />,
      title: "Cookie Policy",
      text: `We use cookies for improving user experience and analytics.
By continuing to use the website, you agree to our Privacy Policy.`,
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6 text-primary" />,
      title: "Refund Policy",
      text: `Restruhub does not offer refunds after purchase.
You may cancel anytime, but unused days are not refunded.`,
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Contact Us",
      text: `If you have any questions:
Email: support@restruhub.com
Response time: 24–48 hours.`,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 pt-120">
      <FadeInWhenVisible>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
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

// TypeScript type for Section props
interface SectionType {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function Section({ icon, title, text }: SectionType) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {text
            .split(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g)
            .map((part, i) =>
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
}
