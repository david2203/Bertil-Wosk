import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sanityFetch } from "@/lib/sanity.fetch";
import { pageBySlugQuery, pageSlugsQuery } from "@/lib/queries";
import { isReservedSlug } from "@/lib/reservedSlugs";
import type { Page } from "@/lib/types";
import { CmsPageBody } from "@/components/sections/CmsPageBody";

// Standalone CMS pages: /<lang>/<slug>
export async function generateStaticParams() {
  const pages = await sanityFetch<{ slug: string }[]>(
    pageSlugsQuery,
    { placement: "top" },
    []
  );
  return locales.flatMap((lang) =>
    pages
      .filter((p) => p.slug && !isReservedSlug(p.slug))
      .map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await sanityFetch<Page | null>(
    pageBySlugQuery,
    { slug, placement: "top" },
    null
  );
  return { title: page?.title ?? undefined };
}

export default async function StandaloneCmsPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (isReservedSlug(slug)) notFound();

  const dict = await getDictionary(lang);
  const page = await sanityFetch<Page | null>(
    pageBySlugQuery,
    { slug, placement: "top" },
    null
  );
  if (!page) notFound();

  return <CmsPageBody page={page} lang={lang} dict={dict} />;
}
