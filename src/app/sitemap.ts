import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { sanityFetch } from "@/lib/sanity.fetch";
import { sitemapQuery } from "@/lib/queries";
import { isReservedSlug } from "@/lib/reservedSlugs";

export const revalidate = 3600;

const BASE_URL = "https://www.bertilwosk.se";

type SitemapData = {
  pages: { slug: string; placement?: string; _updatedAt?: string }[];
  posts: { slug: string; _updatedAt?: string }[];
  foredrag: { slug: string; _updatedAt?: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityFetch<SitemapData>(
    sitemapQuery,
    {},
    { pages: [], posts: [], foredrag: [] }
  );

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    const root = `${BASE_URL}/${lang}`;

    // Start page
    const home = data.pages.find((p) => p.placement === "home");
    entries.push({
      url: root,
      lastModified: home?._updatedAt ? new Date(home._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    for (const page of data.pages) {
      if (page.placement === "home" || !page.slug) continue;
      // Top-level pages can't use a slug owned by a real route.
      if (page.placement !== "resources" && isReservedSlug(page.slug)) continue;

      entries.push({
        url:
          page.placement === "resources"
            ? `${root}/resurser/${page.slug}`
            : `${root}/${page.slug}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
        changeFrequency: "monthly",
        priority: page.placement === "resources" ? 0.8 : 0.6,
      });
    }

    for (const post of data.posts) {
      entries.push({
        url: `${root}/blogg/${post.slug}`,
        lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }

    for (const talk of data.foredrag) {
      entries.push({
        url: `${root}/foredrag/${talk.slug}`,
        lastModified: talk._updatedAt ? new Date(talk._updatedAt) : undefined,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
