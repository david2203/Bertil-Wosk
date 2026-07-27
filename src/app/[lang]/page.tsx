import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { sanityFetch } from "@/lib/sanity.fetch";
import { homePageQuery } from "@/lib/queries";
import type { Page } from "@/lib/types";
import { Hero } from "@/components/blocks/Hero";
import { CmsPageBody } from "@/components/sections/CmsPageBody";

// The start page is a CMS page with placement "home", built from blocks.
// Until one exists in Sanity, a minimal hero is shown so the site is never blank.
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const page = await sanityFetch<Page | null>(homePageQuery, {}, null);

  // Placeholder until a start page exists in Sanity. No CTA, since there
  // is no guaranteed destination before any pages are created.
  if (!page) {
    return (
      <Hero
        kicker={dict.hero.kicker}
        slogan={dict.hero.slogan}
      />
    );
  }

  return <CmsPageBody page={page} lang={lang} dict={dict} />;
}
