import { defineType } from "sanity";

// Text + image side by side. On desktop the order can be flipped;
// on mobile the text is always rendered first (handled in the component).
export const textImageBlock = defineType({
  name: "textImageBlock",
  title: "Text & bild",
  type: "object",
  fields: [
    { name: "heading", title: "Rubrik", type: "string" },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Brödtext", value: "normal" }] }],
      description: "Brödtext under rubriken.",
    },
    {
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt-text",
          type: "string",
          description: "Beskriv bilden för skärmläsare. Lämna tom om dekorativ.",
        },
      ],
    },
    {
      name: "imageFirst",
      title: "Bild till vänster",
      type: "boolean",
      description:
        "Som standard visas texten till vänster. Slå på för att visa bilden först. På mobil visas texten alltid först.",
      initialValue: false,
    },
    {
      name: "ctaLabel",
      title: "Knapptext (valfri)",
      type: "string",
      description: "Lämna tom för att inte visa någon knapp.",
    },
    {
      name: "ctaPage",
      title: "Knappen går till (sida)",
      type: "reference",
      to: [{ type: "page" }],
      description: "Välj en sida på webbplatsen.",
    },
    {
      name: "ctaHref",
      title: "…eller egen länk",
      type: "string",
      description:
        "Används bara om ingen sida valts ovan. T.ex. https://example.com",
    },
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
    select: { title: "heading", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Text & bild", subtitle: "Text & bild", media };
    },
  },
});
