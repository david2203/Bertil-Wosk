import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { MenuPage } from "@/lib/types";
import { localePath } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Nav } from "./Nav";
import { LanguageToggle } from "./LanguageToggle";

export function Header({
  lang,
  dict,
  resourcePages = [],
  mainPages = [],
}: {
  lang: Locale;
  dict: Dictionary;
  resourcePages?: MenuPage[];
  mainPages?: MenuPage[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={localePath(lang, "/")}
          className="font-serif text-2xl text-petrol"
        >
          {dict.site.name}
        </Link>
        <div className="flex items-center gap-6">
          <Nav
            lang={lang}
            resourcesLabel={dict.nav.resources}
            resourcePages={resourcePages}
            mainPages={mainPages}
          />
          <LanguageToggle current={lang} />
        </div>
      </Container>
    </header>
  );
}
