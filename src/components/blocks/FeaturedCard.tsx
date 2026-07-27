import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { urlForImage } from "@/lib/sanity.image";
import { formatDate } from "@/lib/date";
import { VideoEmbed } from "./VideoEmbed";

/**
 * Full-width highlight for the newest item: text on the left, media on the
 * right. The media occupies the right column of a 3-column grid — the same
 * width a small card gets — so with the same aspect ratio its height matches
 * the cards below.
 */
export function FeaturedCard({
  item,
  source,
  href,
  lang,
  kicker,
  actionLabel,
  onDark = false,
}: {
  item: CollectionItem;
  source: "video" | "post";
  href: string;
  lang: Locale;
  kicker: string;
  actionLabel: string;
  onDark?: boolean;
}) {
  const published = formatDate(item.publishedAt, lang);
  const summary = item.excerpt ?? item.description;
  const alt = (item.coverImage as { alt?: string } | undefined)?.alt ?? "";
  const isVideo = source === "video";
  // Videos play inline in the embed, so they need no button.
  const showButton = !isVideo;

  const buttonClass =
    "inline-flex h-11 items-center justify-center rounded bg-petrol px-6 text-sm font-medium text-white transition-colors hover:bg-petrol-700";

  return (
    // Rules above and below, with matching padding, so the featured item
    // reads as its own band separated from the heading and the grid.
    <article
      className={`group relative mb-10 grid gap-6 border-y py-10 md:grid-cols-3 md:gap-8 ${
        onDark ? "border-white/20" : "border-line"
      }`}
    >
      {/* Text — two columns, left. The column stretches to the media's
          height, and `mt-auto` on the button pins it to the bottom edge so
          it lines up with the bottom of the image. */}
      <div className="flex flex-col md:col-span-2">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            {kicker}
          </span>
          {published ? (
            <time
              dateTime={item.publishedAt}
              className={`text-sm ${onDark ? "text-white/70" : "text-muted"}`}
            >
              {published}
            </time>
          ) : null}
        </div>

        <h3
          className={`mt-2 text-2xl md:text-3xl ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {item.title}
        </h3>

        {summary ? (
          <p
            className={`mt-3 max-w-xl leading-relaxed ${
              onDark ? "text-white/70" : "text-muted"
            }`}
          >
            {summary}
          </p>
        ) : null}

        {showButton ? (
          <div className="mt-5 md:mt-auto md:pt-5">
            {/* The overlay makes the whole article card clickable.
                Videos skip this so the embed stays interactive. */}
            <Link
              href={href}
              className={`${buttonClass} after:absolute after:inset-0`}
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>

      {/* Media — one column, right. Ordered last in the DOM so mobile
          reads the text first. */}
      <div className="md:col-span-1">
        {isVideo && item.youtubeUrl ? (
          <VideoEmbed url={item.youtubeUrl} title={item.title} />
        ) : item.coverImage ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-soft">
            <Image
              src={urlForImage(item.coverImage)
                .width(800)
                .height(500)
                .fit("crop")
                .url()}
              alt={alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full rounded bg-soft" />
        )}
      </div>
    </article>
  );
}
