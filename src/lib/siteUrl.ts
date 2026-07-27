/**
 * Canonical base URL for metadata.
 *
 * On Vercel preview deployments this resolves to the preview host, so
 * Open Graph images actually load when testing a share link. Production
 * always uses the real domain.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") return "https://www.bertilwosk.se";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.bertilwosk.se";
}
