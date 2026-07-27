import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PageSection } from "@/lib/types";
import { HeroSection } from "./HeroSection";
import { TextImageSection } from "./TextImageSection";
import { ResourcesSection } from "./ResourcesSection";
import { CollectionSection } from "./CollectionSection";
import { RichTextSection } from "./RichTextSection";
import { FaqSection } from "./FaqSection";
import { ContactFormSection } from "./ContactFormSection";

// Maps each page-builder block from Sanity to its component.
// To add a new block: create the schema object, add it to the page schema's
// `sections` array, add its type to PageSection, and add a case here.
export function PageSections({
  sections,
  lang,
  dict,
}: {
  sections?: PageSection[];
  lang: Locale;
  dict: Dictionary;
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroBlock":
            return (
              <HeroSection key={section._key} block={section} lang={lang} />
            );
          case "textImageBlock":
            return (
              <TextImageSection key={section._key} block={section} lang={lang} />
            );
          case "resourcesBlock":
            return (
              <ResourcesSection
                key={section._key}
                block={section}
                lang={lang}
                dict={dict}
              />
            );
          case "collectionBlock":
            return (
              <CollectionSection
                key={section._key}
                block={section}
                lang={lang}
                dict={dict}
              />
            );
          case "richTextBlock":
            return <RichTextSection key={section._key} block={section} />;
          case "faqBlock":
            return <FaqSection key={section._key} block={section} />;
          case "contactFormBlock":
            return (
              <ContactFormSection key={section._key} block={section} dict={dict} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
