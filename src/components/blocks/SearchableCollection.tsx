"use client";

import { useId, useMemo, useState } from "react";
import type { CollectionItem } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { PostGrid } from "./PostGrid";
import { VideoGrid } from "./VideoGrid";
import { FeaturedCard } from "./FeaturedCard";

type SearchLabels = {
  label: string;
  placeholder: string;
  clear: string;
  noResults: string;
  resultsOne: string;
  resultsMany: string;
};

/**
 * Heading row with a search field on the right, plus the filtered grid and
 * an optional featured item.
 *
 * Items are already loaded server-side, so filtering happens in the browser —
 * results are instant and there is no request per keystroke.
 */
export function SearchableCollection({
  source,
  items,
  heading,
  intro,
  lang,
  labels,
  readMore,
  onDark = false,
  hrefBase,
  featuredLabels,
  showSearch = true,
  showFeatured = true,
}: {
  source: "video" | "post";
  items: CollectionItem[];
  heading?: string;
  intro?: string;
  lang: Locale;
  labels: SearchLabels;
  readMore: string;
  onDark?: boolean;
  hrefBase: string;
  featuredLabels: { latest: string; watch: string };
  showSearch?: boolean;
  showFeatured?: boolean;
}) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("sv");
    if (!q) return items;
    return items.filter((i) =>
      [i.title, i.description, i.excerpt]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("sv")
        .includes(q)
    );
  }, [items, query]);

  const searching = query.trim().length > 0;

  // "Featured" always means the newest item specifically — not simply the
  // first result. It keeps its treatment whenever it survives the filter,
  // and the remaining matches render as normal cards beneath it.
  const newest = items[0] ?? null;
  const featured =
    showFeatured && newest && filtered.some((i) => i._id === newest._id)
      ? newest
      : null;
  const rest = featured
    ? filtered.filter((i) => i._id !== featured._id)
    : filtered;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          {heading ? (
            <h2 className={`text-2xl md:text-3xl ${onDark ? "text-white" : ""}`}>
              {heading}
            </h2>
          ) : null}
          {intro ? (
            <p className={`mt-2 ${onDark ? "text-white/70" : "text-muted"}`}>
              {intro}
            </p>
          ) : null}
        </div>

        {showSearch ? (
          <search className="relative w-full sm:w-64">
            <label htmlFor={inputId} className="sr-only">
              {labels.label}
            </label>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                onDark ? "text-white/60" : "text-muted"
              }`}
            >
              <circle
                cx="7"
                cy="7"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.placeholder}
              className={`h-10 w-full rounded border pl-9 pr-8 text-sm outline-none transition-colors placeholder:text-muted/70 focus-visible:border-petrol ${
                onDark
                  ? "border-white/25 bg-white/10 text-white placeholder:text-white/50"
                  : "border-line bg-surface text-ink"
              }`}
            />
            {searching ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={labels.clear}
                className={`absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none ${
                  onDark
                    ? "text-white/70 hover:text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                ×
              </button>
            ) : null}
          </search>
        ) : null}
      </div>

      {/* Announced to screen readers as results change */}
      <p aria-live="polite" className="sr-only">
        {filtered.length}{" "}
        {filtered.length === 1 ? labels.resultsOne : labels.resultsMany}
      </p>

      {filtered.length === 0 ? (
        <p className={onDark ? "text-white/70" : "text-muted"}>
          {labels.noResults} “{query.trim()}”.
        </p>
      ) : null}

      {featured ? (
        <FeaturedCard
          item={featured}
          source={source}
          href={`${hrefBase}/${featured.slug}`}
          lang={lang}
          kicker={featuredLabels.latest}
          actionLabel={source === "video" ? featuredLabels.watch : readMore}
          onDark={onDark}
        />
      ) : null}

      {rest.length === 0 ? null : source === "video" ? (
        <VideoGrid items={rest} lang={lang} onDark={onDark} />
      ) : (
        <PostGrid
          items={rest}
          hrefBase={hrefBase}
          readMore={readMore}
          lang={lang}
        />
      )}
    </>
  );
}
