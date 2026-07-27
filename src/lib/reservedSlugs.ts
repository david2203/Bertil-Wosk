// Slugs owned by real app routes. A top-level CMS page must never use these,
// because the dedicated route would shadow it.
// Keep in sync with studio/schemas/documents/page.ts.
//
// Note: "om" and "kontakt" are NOT reserved — they are ordinary CMS pages
// served by the /[lang]/[slug] catch-all, so Bertil controls them fully.
// Pages under /resurser/ live in their own namespace and are unaffected.
export const RESERVED_SLUGS = [
  "blogg",
  "foredrag",
  "resurser",
  "studio",
  "api",
] as const;

export function isReservedSlug(slug: string): boolean {
  return (RESERVED_SLUGS as readonly string[]).includes(slug);
}
