import { client } from "./sanity.client";
import { isSanityConfigured } from "./env";

// Safe fetch: returns `fallback` when Sanity isn't configured yet or a query
// fails, so pages still render during early development.
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  const isDev = process.env.NODE_ENV !== "production";
  try {
    return await client.fetch<T>(
      query,
      params,
      // In development always read through, so a reload shows the latest
      // content immediately. In production cache and revalidate every 60s.
      isDev ? { cache: "no-store" } : { next: { revalidate: 60 } }
    );
  } catch (error) {
    // Never crash a page on a CMS hiccup, but make failures loud in dev —
    // a silently swallowed GROQ error looks identical to "no content yet".
    if (process.env.NODE_ENV !== "production") {
      console.error("[sanityFetch] query failed:", error);
    }
    return fallback;
  }
}
