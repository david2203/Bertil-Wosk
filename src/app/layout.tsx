import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { sanityFetch } from "@/lib/sanity.fetch";
import { siteSettingsQuery } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity.image";
import { getSiteUrl } from "@/lib/siteUrl";
import type { SanityImage } from "@/lib/types";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Defaults, used when Webbplatsinställningar → SEO is left empty.
// 51 characters — fits before Google truncates (~60).
const DEFAULT_TITLE = "Bertil Wosk – om näring, hälsa och ett liv i balans";
// 150 characters — within the ~160 Google displays.
const DEFAULT_DESCRIPTION =
  "Att leva ett liv i hälsa är att leva ett liv i balans. Bertil Wosk, grundare av Holistic, delar föredrag, meditationer och texter om näring och hälsa.";

type Settings = {
  title?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<Settings | null>(
    siteSettingsQuery,
    {},
    null
  );

  const title = settings?.seo?.metaTitle || DEFAULT_TITLE;
  const description = settings?.seo?.metaDescription || DEFAULT_DESCRIPTION;
  const siteUrl = getSiteUrl();

  // Facebook/LinkedIn need an absolute URL and explicit dimensions.
  const ogImage = settings?.seo?.ogImage
    ? urlForImage(settings.seo.ogImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      // Sub-pages get "Sidans titel · Bertil Wosk".
      template: `%s · ${settings?.title || "Bertil Wosk"}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "sv_SE",
      siteName: settings?.title || "Bertil Wosk",
      url: siteUrl,
      title,
      description,
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

// NOTE: <html lang> is hardcoded to "sv" while the site is Swedish-only.
// When English is enabled, move <html>/<body> into app/[lang]/layout.tsx so
// `lang` reflects the active locale (see AGENTS.md §6).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
