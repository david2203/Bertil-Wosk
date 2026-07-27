import { defineType } from "sanity";

// Full-width hero with background image and overlaid text.
// Used at the top of the start page, but available on any page.
export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero (toppbild)",
  type: "object",
  fields: [
    {
      name: "kicker",
      title: "Överrubrik",
      type: "string",
      description: "Liten text ovanför rubriken.",
    },
    {
      name: "heading",
      title: "Rubrik",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    },
    {
      name: "image",
      title: "Bakgrundsbild",
      type: "image",
      options: { hotspot: true },
      description:
        "Lämna tom för att använda standardbilden (hero-bg.webp).",
      fields: [{ name: "alt", title: "Alt-text", type: "string" }],
    },
    {
      name: "ctaLabel",
      title: "Knapptext",
      type: "string",
    },
    {
      name: "ctaPage",
      title: "Knappen går till (sida)",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      name: "ctaHref",
      title: "…eller egen länk",
      type: "string",
      description: "Används om ingen sida valts. T.ex. /sv/kontakt",
    },
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Hero", subtitle: "Toppbild", media };
    },
  },
});
