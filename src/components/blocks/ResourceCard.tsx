import Link from "next/link";
import type { CollectionSource } from "@/lib/types";

// One icon per collection type, so each card is identifiable at a glance.
function SourceIcon({ source }: { source?: CollectionSource }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (source) {
    case "meditation": // headphones
      return (
        <svg {...common}>
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="2.5" y="13.5" width="4.5" height="7" rx="2" />
          <rect x="17" y="13.5" width="4.5" height="7" rx="2" />
        </svg>
      );
    case "video": // play
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
          <path d="M10 9.5l5 2.5-5 2.5z" />
        </svg>
      );
    case "foredrag": // document
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
      );
    case "post": // pen
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
        </svg>
      );
    default: // generic page
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
  }
}

// Swedish plurals for the item count line.
const COUNT_LABEL: Record<CollectionSource, [string, string]> = {
  meditation: ["meditation", "meditationer"],
  foredrag: ["föredrag", "föredrag"],
  video: ["video", "videos"],
  post: ["inlägg", "inlägg"],
};

function countLabel(sources?: CollectionSource[], count?: number) {
  if (!count || !sources?.length) return null;
  // Mixed sources get a neutral word rather than a wrong one.
  if (sources.length > 1) return `${count} objekt`;
  const [one, many] = COUNT_LABEL[sources[0]] ?? ["objekt", "objekt"];
  return `${count} ${count === 1 ? one : many}`;
}

export function ResourceCard({
  title,
  description,
  href,
  sources,
  itemCount,
}: {
  title: string;
  description?: string;
  href: string;
  sources?: CollectionSource[];
  itemCount?: number;
}) {
  const meta = countLabel(sources, itemCount);

  return (
    <article className="group relative flex h-full flex-col rounded border border-line bg-surface p-6 transition-colors duration-200 hover:border-petrol/40 hover:bg-soft/60">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-soft text-petrol transition-colors duration-200 group-hover:bg-petrol group-hover:text-white">
        <SourceIcon source={sources?.[0]} />
      </div>

      <h3 className="text-xl">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>

      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-5">
        {meta ? (
          <span className="text-xs uppercase tracking-[0.12em] text-muted">
            {meta}
          </span>
        ) : (
          <span />
        )}
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          aria-hidden="true"
          className="shrink-0 text-petrol transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M1 6h15M11.5 1L16.5 6l-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}
