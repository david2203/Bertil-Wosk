import type { Locale } from "@/i18n/config";
import type { HeroBlock } from "@/lib/types";
import { pageHref } from "@/lib/routes";
import { Hero } from "@/components/blocks/Hero";

// Page-builder wrapper around the Hero presentation component.
// The CTA can point at a Sanity page reference or a custom link.
export function HeroSection({
  block,
  lang,
}: {
  block: HeroBlock;
  lang: Locale;
}) {
  const target = block.ctaTarget;
  const href = target
    ? pageHref(lang, target)
    : block.ctaHref && block.ctaHref.length > 0
      ? block.ctaHref
      : undefined;

  return (
    <Hero
      kicker={block.kicker}
      slogan={block.heading}
      ctaLabel={block.ctaLabel}
      ctaHref={href}
      image={block.image}
      imageAlt={(block.image as { alt?: string } | undefined)?.alt}
    />
  );
}
