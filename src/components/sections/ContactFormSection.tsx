import type { Dictionary } from "@/i18n/dictionaries";
import type { ContactFormBlock } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/blocks/ContactForm";

export function ContactFormSection({
  block,
  dict,
}: {
  block: ContactFormBlock;
  dict: Dictionary;
}) {
  return (
    <Section tone="surface">
      {block.heading ? (
        <h2 className="text-2xl md:text-3xl">{block.heading}</h2>
      ) : null}
      {block.intro ? <p className="mt-2 text-muted">{block.intro}</p> : null}
      <div className="mt-6">
        <ContactForm labels={dict.contact} />
      </div>
    </Section>
  );
}
