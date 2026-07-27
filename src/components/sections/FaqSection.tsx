import type { PortableTextBlock } from "@portabletext/types";
import type { FaqBlock } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";

// Flattens portable text to a plain string for the JSON-LD answer field.
function toPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return "";
  return blocks
    .map((b) => {
      const block = b as { _type?: string; children?: { text?: string }[] };
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((c) => c.text ?? "").join("");
    })
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function FaqSection({ block }: { block: FaqBlock }) {
  const items = (block.items ?? []).filter((i) => i.question);
  if (items.length === 0) return null;

  // Structured data so the questions can surface in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(i.answer) },
    })),
  };

  return (
    <Section tone={block.tone ?? "surface"}>
      {block.heading || block.intro ? (
        <div className="mb-8">
          {block.heading ? (
            <h2 className="text-2xl md:text-3xl">{block.heading}</h2>
          ) : null}
          {block.intro ? (
            <p className="mt-2 max-w-2xl text-muted">{block.intro}</p>
          ) : null}
        </div>
      ) : null}

      <FaqAccordion items={items} openFirst={block.openFirst} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
