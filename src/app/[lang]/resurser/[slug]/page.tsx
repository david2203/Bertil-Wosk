import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sanityFetch } from "@/lib/sanity.fetch";
import { pageBySlugQuery, pageSlugsQuery } from "@/lib/queries";
import type { Page } from "@/lib/types";
import { CmsPageBody } from "@/components/sections/CmsPageBody";

// CMS pages placed under Resurser: /<lang>/resurser/<slug>
export async function generateStaticParams() {
  const pages = await sanityFetch<{ slug: string }[]>(
    pageSlugsQuery,
    { placement: "resources" },
    []
  );
  return locales.flatMap((lang) =>
    pages.filter((p) => p.slug).map((p) => ({ lang, slug: p.slug }))
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
    { slug, placement: "resources" },
    null
  );
  return { title: page?.title ?? undefined };
}

export default async function ResourceCmsPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const page = await sanityFetch<Page | null>(
    pageBySlugQuery,
    { slug, placement: "resources" },
    null
  );
  if (!page) notFound();

  return <CmsPageBody page={page} lang={lang} dict={dict} />;
}
