import Image from "next/image";
import type { SanityImage } from "@/lib/types";
import { urlForImage } from "@/lib/sanity.image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroText } from "./HeroText";

// Static fallback hero photo at /public/hero-bg.webp.
// A Sanity `image` (e.g. siteSettings.heroImage) overrides it when provided.
const FALLBACK_HERO = "/hero-bg.webp";

export function Hero({
  kicker,
  slogan,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
}: {
  kicker?: string;
  slogan: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {image ? (
          <Image
            src={urlForImage(image).width(1920).height(820).fit("crop").url()}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <Image
            src={FALLBACK_HERO}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Left-to-right scrim: darkens the text column, fades clear over the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
          aria-hidden="true"
        />
      </div>

      <Container className="relative flex min-h-[480px] flex-col justify-center py-20">
        <div className="max-w-xl">
          <HeroText kicker={kicker} heading={slogan} />
          {ctaLabel && ctaHref ? (
            <div className="mt-8">
              <Button href={ctaHref}>{ctaLabel}</Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
