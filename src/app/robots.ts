import type { MetadataRoute } from "next";

const BASE = process.env.NEXTAUTH_URL ?? "https://freyes.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/download/", "/checkout/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
