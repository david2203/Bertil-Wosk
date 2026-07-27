import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { sanityFetch } from "@/lib/sanity.fetch";
import { postBySlugQuery } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/blocks/RichText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null);
  return {
    title: post?.title ?? undefined,
    description: post?.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null);
  if (!post) notFound();

  const alt = (post.coverImage as { alt?: string } | undefined)?.alt ?? "";
  const published = formatDate(post.publishedAt, lang);

  return (
    <Container className="py-16">
      {/* Narrow single column for comfortable reading */}
      <article className="mx-auto max-w-2xl">
        <header>
          {published ? (
            <p className="text-sm text-muted">
              <time dateTime={post.publishedAt}>{published}</time>
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl md:text-4xl">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-3 text-lg text-muted">{post.excerpt}</p>
          ) : null}
        </header>

        {/* Cover image as a card between the title and the body */}
        {post.coverImage ? (
          <figure className="mt-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-soft">
              <Image
                src={urlForImage(post.coverImage)
                  .width(1400)
                  .height(788)
                  .fit("crop")
                  .url()}
                alt={alt}
                fill
                priority
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            {alt ? (
              <figcaption className="mt-2 text-sm text-muted">{alt}</figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="mt-8">
          <RichText value={post.body} />
        </div>
      </article>
    </Container>
  );
}
