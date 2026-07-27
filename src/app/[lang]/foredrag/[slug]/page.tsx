import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sanityFetch } from "@/lib/sanity.fetch";
import { foredragBySlugQuery } from "@/lib/queries";
import type { Foredrag } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { RichText } from "@/components/blocks/RichText";
import { AttachmentList } from "@/components/blocks/AttachmentList";
import { VideoEmbed } from "@/components/blocks/VideoEmbed";

export default async function ForedragDetail({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const item = await sanityFetch<Foredrag | null>(
    foredragBySlugQuery,
    { slug },
    null
  );
  if (!item) notFound();

  return (
    <Section tone="surface">
      {/* Narrow single column, matching blog posts */}
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl">{item.title}</h1>
        {item.description ? (
          <p className="mt-3 text-lg text-muted">{item.description}</p>
        ) : null}

        {item.youtubeUrl ? (
          <div className="mt-8">
            <VideoEmbed url={item.youtubeUrl} title={item.title} />
          </div>
        ) : null}

        <div className="mt-8">
          <RichText value={item.body} />
        </div>

        <AttachmentList
          attachments={item.attachments}
          downloadLabel={dict.common.download}
        />
      </article>
    </Section>
  );
}
