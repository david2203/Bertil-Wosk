import type { Locale } from "@/i18n/config";
import type { CollectionItem } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { VideoEmbed } from "./VideoEmbed";

// Plain grid of video embeds with title + date. Shared by the simple
// (server-rendered) path and the searchable client component.
export function VideoGrid({
  items,
  lang,
  onDark = false,
}: {
  items: CollectionItem[];
  lang: Locale;
  onDark?: boolean;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((v) =>
        v.youtubeUrl ? (
          <article key={v._id}>
            {/* Wraps rather than squashing at 3 columns */}
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3
                className={`text-lg md:text-xl ${
                  onDark ? "text-white" : "text-ink"
                }`}
              >
                {v.title}
              </h3>
              {formatDate(v.publishedAt, lang) ? (
                <time
                  dateTime={v.publishedAt}
                  className={`shrink-0 text-sm ${
                    onDark ? "text-white/70" : "text-muted"
                  }`}
                >
                  {formatDate(v.publishedAt, lang)}
                </time>
              ) : null}
            </div>
            <VideoEmbed url={v.youtubeUrl} title={v.title} />
            {v.description ? (
              <p
                className={`mt-2 text-sm ${
                  onDark ? "text-white/70" : "text-muted"
                }`}
              >
                {v.description}
              </p>
            ) : null}
          </article>
        ) : null
      )}
    </div>
  );
}
