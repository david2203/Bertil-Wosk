import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ResourcesBlock } from "@/lib/types";
import { pageHref } from "@/lib/routes";
import { Section } from "@/components/ui/Section";
import { ResourceCard } from "@/components/blocks/ResourceCard";

// Cards linking to the pages filed under Resurser.
// Defaults to a 2-column grid, so four resources form a 2×2 block.
export function ResourcesSection({
  block,
  lang,
  dict,
}: {
  block: ResourcesBlock;
  lang: Locale;
  dict: Dictionary;
}) {
  const items = (block.items ?? []).filter((p) => p.slug);
  if (items.length === 0) return null;

  const cols =
    block.columns === "3"
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2";

  return (
    <Section tone={block.tone ?? "surface"}>
      {block.heading || block.intro ? (
        <div className="mb-8">
          {block.heading ? (
            <h2 className="text-2xl md:text-3xl">{block.heading}</h2>
          ) : null}
          {block.intro ? (
            <p className="mt-2 text-muted">{block.intro}</p>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-5 ${cols}`}>
        {items.map((p) => (
          <ResourceCard
            key={p._id}
            title={p.title}
            description={p.intro}
            href={pageHref(lang, p)}
            sources={p.sources}
            itemCount={p.itemCount}
          />
        ))}
      </div>
    </Section>
  );
}
