import type { MetadataRoute } from "next";

const BASE_URL = "https://www.bertilwosk.se";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS and API routes have nothing useful for search engines.
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
