import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { MenuPage } from "@/lib/types";
import { pageHref } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { SocialLinks, type SocialLink } from "./SocialLinks";

export function Footer({
  lang,
  dict,
  contactEmail,
  mainPages = [],
  resourcePages = [],
  social,
  privacyPage,
  disclaimerPage,
  footerText,
}: {
  lang: Locale;
  dict: Dictionary;
  contactEmail?: string;
  mainPages?: MenuPage[];
  resourcePages?: MenuPage[];
  social?: SocialLink[];
  privacyPage?: MenuPage | null;
  disclaimerPage?: MenuPage | null;
  footerText?: string;
}) {
  const year = new Date().getFullYear();
  const email = contactEmail ?? "hello@bertilwosk.se";

  const linkClass =
    "text-sm text-white/70 transition-colors hover:text-white";
  const headingClass =
    "text-xs font-medium uppercase tracking-[0.16em] text-gold";

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand + blurb + social */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl">{dict.site.name}</p>
            <p className="mt-1 text-sm text-white/50">{dict.site.tagline}</p>
            <p className="mt-5 max-w-sm whitespace-pre-line text-sm leading-relaxed text-white/70">
              {footerText ?? dict.footer.blurb}
            </p>
            <div className="mt-7">
              <p className={headingClass}>{dict.footer.follow}</p>
              <div className="mt-3">
                <SocialLinks links={social} />
              </div>
            </div>
          </div>

          {/* Main navigation */}
          {mainPages.length > 0 ? (
            <nav className="md:col-span-3" aria-label={dict.footer.navigation}>
              <p className={headingClass}>{dict.footer.navigation}</p>
              <ul className="mt-4 space-y-3">
                {mainPages.map((p) => (
                  <li key={p._id}>
                    <Link href={pageHref(lang, p)} className={linkClass}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {/* Resources */}
          {resourcePages.length > 0 ? (
            <nav className="md:col-span-2" aria-label={dict.footer.resources}>
              <p className={headingClass}>{dict.footer.resources}</p>
              <ul className="mt-4 space-y-3">
                {resourcePages.map((p) => (
                  <li key={p._id}>
                    <Link href={pageHref(lang, p)} className={linkClass}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {/* Contact */}
          <div className="md:col-span-2">
            <p className={headingClass}>{dict.footer.contact}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.footer.rights}
          </p>
          {privacyPage?.slug || disclaimerPage?.slug ? (
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {privacyPage?.slug ? (
                <Link
                  href={pageHref(lang, privacyPage)}
                  className="transition-colors hover:text-white"
                >
                  {privacyPage.title}
                </Link>
              ) : null}
              {disclaimerPage?.slug ? (
                <Link
                  href={pageHref(lang, disclaimerPage)}
                  className="transition-colors hover:text-white"
                >
                  {disclaimerPage.title}
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
