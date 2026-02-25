import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // ✅ Public site: allow indexing
      {
        source: "/((?!admin|dashboard|api).*)",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },

      // 🔒 Private areas: block indexing
      {
        source: "/(admin|dashboard)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;