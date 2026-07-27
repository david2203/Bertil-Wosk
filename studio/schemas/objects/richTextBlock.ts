import { defineType } from "sanity";

// Plain formatted content section — headings, paragraphs, lists, images.
export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Textavsnitt",
  type: "object",
  fields: [
    { name: "body", title: "Innehåll", type: "blockContent" },
    {
      name: "tone",
      title: "Bakgrund",
      type: "string",
      options: {
        list: [
          { title: "Vit", value: "surface" },
          { title: "Ljusgrå", value: "soft" },
        ],
        layout: "radio",
      },
      initialValue: "surface",
    },
  ],
  preview: {
    select: { body: "body" },
    prepare({ body }) {
      const first = Array.isArray(body)
        ? body.find((b: { _type?: string }) => b._type === "block")
        : undefined;
      const text = first?.children
        ?.map((c: { text?: string }) => c.text)
        .join(" ");
      return { title: text?.slice(0, 60) || "Textavsnitt", subtitle: "Text" };
    },
  },
});
