import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sanityFetch } from "@/lib/sanity.fetch";
import { allResourcePagesQuery } from "@/lib/queries";
import { localePath } from "@/lib/routes";
import type { MenuPage } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { ResourceGrid } from "@/components/blocks/ResourceGrid";
import { ResourceCard } from "@/components/blocks/ResourceCard";

// Overview of everything filed under Resurser. Also the no-JS fallback
// target for the Resurser dropdown in the header.
export default async function ResurserIndex({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const pages = await sanityFetch<MenuPage[]>(allResourcePagesQuery, {}, []);

  return (
    <Section tone="surface">
      <h1 className="text-3xl md:text-4xl">{dict.resources.heading}</h1>
      <p className="mt-2 text-muted">{dict.resources.intro}</p>
      <div className="mt-8">
        <ResourceGrid>
          {pages
            .filter((p) => p.slug)
            .map((p) => (
              <ResourceCard
                key={p._id}
                title={p.title}
                description={p.intro}
                href={localePath(lang, `/resurser/${p.slug}`)}
                sources={p.sources}
                itemCount={p.itemCount}
              />
            ))}
        </ResourceGrid>
      </div>
    </Section>
  );
}
