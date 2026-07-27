import type { Locale } from "@/i18n/config";
import type { CollectionItem } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { PostCard } from "./PostCard";

// Plain grid of article cards. Shared by the simple (server-rendered) path
// and the searchable client component so both look identical.
export function PostGrid({
  items,
  hrefBase,
  readMore,
  lang,
}: {
  items: CollectionItem[];
  hrefBase: string;
  readMore: string;
  lang: Locale;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PostCard
          key={p._id}
          title={p.title}
          excerpt={p.excerpt}
          image={p.coverImage}
          href={`${hrefBase}/${p.slug}`}
          readMore={readMore}
          publishedAt={p.publishedAt}
          date={formatDate(p.publishedAt, lang)}
        />
      ))}
    </div>
  );
}
