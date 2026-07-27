import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Page } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { PageSections } from "./PageSections";

// Shared rendering for any CMS page: optional title + intro, then blocks.
// Pages that open with a hero block turn the title off (showTitle = false).
export function CmsPageBody({
  page,
  lang,
  dict,
}: {
  page: Page;
  lang: Locale;
  dict: Dictionary;
}) {
  const startsWithHero = page.sections?.[0]?._type === "heroBlock";
  const showTitle = page.showTitle !== false && !startsWithHero;

  return (
    <>
      {showTitle ? (
        <Container className="pt-16">
          <h1 className="text-3xl md:text-4xl">{page.title}</h1>
          {page.intro ? (
            <p className="mt-3 max-w-2xl text-lg text-muted">{page.intro}</p>
          ) : null}
        </Container>
      ) : null}
      <PageSections sections={page.sections} lang={lang} dict={dict} />
    </>
  );
}
