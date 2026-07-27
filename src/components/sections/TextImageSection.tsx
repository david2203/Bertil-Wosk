import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Locale } from "@/i18n/config";
import type { TextImageBlock } from "@/lib/types";
import { urlForImage } from "@/lib/sanity.image";
import { pageHref } from "@/lib/routes";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

// Text and image side by side.
// DOM order is always text-then-image so mobile (single column) shows text
// first regardless of the editor's choice; on desktop `imageFirst` flips the
// visual order via flex-row-reverse without changing reading order.
export function TextImageSection({
  block,
  lang,
}: {
  block: TextImageBlock;
  lang: Locale;
}) {
  const { heading, text, image, imageFirst, ctaLabel, ctaHref, ctaTarget } =
    block;
  const alt = (image as { alt?: string } | undefined)?.alt ?? "";

  // A chosen page wins over the free-text link.
  const href = ctaTarget
    ? pageHref(lang, ctaTarget)
    : ctaHref && ctaHref.length > 0
      ? ctaHref
      : undefined;

  return (
    <Section tone={block.tone ?? "surface"}>
      <div
        className={`flex flex-col gap-8 md:items-center md:gap-12 ${
          imageFirst ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="md:flex-1">
          {heading ? <h2 className="text-2xl md:text-3xl">{heading}</h2> : null}
          {text?.length ? (
            <div className="mt-4 space-y-4 text-ink/90">
              <PortableText
                value={text}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="whitespace-pre-line">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          ) : null}
          {ctaLabel && href ? (
            <div className="mt-6">
              <Button href={href}>{ctaLabel}</Button>
            </div>
          ) : null}
        </div>

        {image ? (
          <div className="md:flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-soft">
              <Image
                src={urlForImage(image).width(900).height(675).fit("crop").url()}
                alt={alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
