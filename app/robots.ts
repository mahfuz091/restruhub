import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
   
      {
        userAgent: ["MJ12bot", "DotBot"],
        disallow: "/",
      },

      {
        userAgent: ["AhrefsBot", "SemrushBot"],
        crawlDelay: 10,
      },

     
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/config/",
          "/.env",
          "/package.json",
          "/login",
          "/register",
          "/dashboard",
          "/*?utm_*",
          "/*?ref=*",
          "/*?fbclid=*",
        ],
      },
    ],
    sitemap: "https://restruhub.com/sitemap.xml",
  };
}
