import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Mobile",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://martinellimateriales.com/sitemap.xml",
  };
}