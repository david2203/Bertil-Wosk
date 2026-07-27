import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/lib/types";
import { urlForImage } from "@/lib/sanity.image";

export function PostCard({
  title,
  excerpt,
  href,
  image,
  imageAlt,
  readMore,
  publishedAt,
  date,
}: {
  title: string;
  excerpt?: string;
  href: string;
  image?: SanityImage;
  imageAlt?: string;
  readMore: string;
  /** Raw ISO value for the <time> element. */
  publishedAt?: string;
  /** Pre-formatted display date, e.g. "27 Juni 2027". */
  date?: string | null;
}) {
  return (
    // h-full + mt-auto on the button keeps the buttons on one line across
    // the grid, even when titles or excerpts differ in length.
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded bg-soft">
        {image ? (
          <Image
            src={urlForImage(image).width(640).height(400).fit("crop").url()}
            alt={imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : null}
      </div>

      {/* Date above the title, matching the featured card and article page */}
      {date ? (
        <time dateTime={publishedAt} className="mt-4 block text-xs text-muted">
          {date}
        </time>
      ) : null}

      <h3 className={`text-lg ${date ? "mt-1" : "mt-4"}`}>{title}</h3>
      {excerpt ? (
        <p className="mt-1 line-clamp-2 text-sm text-muted">{excerpt}</p>
      ) : null}

      <div className="mt-auto pt-4">
        <Link
          href={href}
          className="inline-flex h-11 items-center justify-center rounded bg-petrol px-6 text-sm font-medium text-white transition-colors hover:bg-petrol-700 after:absolute after:inset-0"
        >
          {readMore}
        </Link>
      </div>
    </article>
  );
}
