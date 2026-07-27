import type { Locale } from "@/i18n/config";

// Build a locale-prefixed path, e.g. localePath("sv", "/blogg") -> "/sv/blogg".
export function localePath(lang: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/^\/+/, "/");
  return `/${lang}${clean}`;
}

// Detail routes that remain hard-coded (listing pages are CMS-built).
export const detailPaths = {
  foredrag: "/foredrag",
  blogg: "/blogg",
  resurser: "/resurser",
} as const;

// Resolve a CMS page (by placement + slug) to its public URL.
export function pageHref(
  lang: Locale,
  page: { slug?: string; placement?: "home" | "top" | "resources" }
): string {
  if (page.placement === "home") return localePath(lang, "/");
  if (!page.slug) return localePath(lang, "/");
  return page.placement === "resources"
    ? localePath(lang, `/resurser/${page.slug}`)
    : localePath(lang, `/${page.slug}`);
}
