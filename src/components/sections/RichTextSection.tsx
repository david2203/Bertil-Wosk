import type { RichTextBlock } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { RichText } from "@/components/blocks/RichText";

export function RichTextSection({ block }: { block: RichTextBlock }) {
  if (!block.body?.length) return null;
  return (
    <Section tone={block.tone ?? "surface"}>
      <RichText value={block.body} />
    </Section>
  );
}
