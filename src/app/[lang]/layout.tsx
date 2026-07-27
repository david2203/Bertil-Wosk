import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sanityFetch } from "@/lib/sanity.fetch";
import {
  mainMenuPagesQuery,
  resourceMenuPagesQuery,
  siteSettingsQuery,
} from "@/lib/queries";
import type { MenuPage } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [settings, resourcePages, mainPages] = await Promise.all([
    sanityFetch<{
      contactEmail?: string;
      footerText?: string;
      social?: { platform?: string; url?: string }[];
      privacyPage?: MenuPage | null;
      disclaimerPage?: MenuPage | null;
    } | null>(siteSettingsQuery, {}, null),
    sanityFetch<MenuPage[]>(resourceMenuPagesQuery, {}, []),
    sanityFetch<MenuPage[]>(mainMenuPagesQuery, {}, []),
  ]);

  return (
    <>
      <Header
        lang={lang}
        dict={dict}
        resourcePages={resourcePages}
        mainPages={mainPages}
      />
      <main id="main">{children}</main>
      <Footer
        lang={lang}
        dict={dict}
        contactEmail={settings?.contactEmail}
        mainPages={mainPages}
        resourcePages={resourcePages}
        social={settings?.social}
        privacyPage={settings?.privacyPage}
        disclaimerPage={settings?.disclaimerPage}
        footerText={settings?.footerText}
      />
    </>
  );
}
