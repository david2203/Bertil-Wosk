import { defineType } from "sanity";

// Shows the pages filed under Resurser as a grid of cards.
// Leave "pages" empty to list them all automatically.
export const resourcesBlock = defineType({
  name: "resourcesBlock",
  title: "Resurser (kortgrid)",
  type: "object",
  fields: [
    { name: "heading", title: "Rubrik (valfri)", type: "string" },
    { name: "intro", title: "Ingress (valfri)", type: "text", rows: 2 },
    {
      name: "pages",
      title: "Välj sidor",
      type: "array",
      description:
        "Lämna tomt för att automatiskt visa alla sidor under Resurser.",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }],
          options: {
            filter: 'placement == "resources"',
          },
        },
      ],
    },
    {
      name: "columns",
      title: "Antal kolumner",
      type: "string",
      options: {
        list: [
          { title: "2 kolumner (2×2)", value: "2" },
          { title: "3 kolumner", value: "3" },
        ],
        layout: "radio",
      },
      initialValue: "2",
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
    select: { title: "heading", pages: "pages" },
    prepare({ title, pages }) {
      const n = Array.isArray(pages) ? pages.length : 0;
      return {
        title: title || "Resurser",
        subtitle: n > 0 ? `Kortgrid · ${n} valda` : "Kortgrid · alla resurser",
      };
    },
  },
});
