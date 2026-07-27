import { defineType } from "sanity";

// Pulls items from one of the content collections and renders them.
// Used to build listing pages (Meditationer, Föredrag, Videos, Blogg)
// through the page builder instead of hard-coded routes.
export const collectionBlock = defineType({
  name: "collectionBlock",
  title: "Lista från samling",
  type: "object",
  fields: [
    { name: "heading", title: "Rubrik (valfri)", type: "string" },
    { name: "intro", title: "Ingress (valfri)", type: "text", rows: 2 },
    {
      name: "source",
      title: "Hämta från",
      type: "string",
      options: {
        list: [
          { title: "Meditationer", value: "meditation" },
          { title: "Föredrag", value: "foredrag" },
          { title: "Videos", value: "video" },
          { title: "Blogginlägg", value: "post" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    },
    {
      name: "limit",
      title: "Max antal",
      type: "number",
      description: "Lämna tomt för att visa alla.",
      validation: (r) => r.min(1).max(50),
    },
    {
      name: "showSearch",
      title: "Visa sökfält",
      type: "boolean",
      description:
        "Passar på en egen sida med hela listan. Stäng av för korta utdrag, t.ex. 'Senaste artiklar' på startsidan.",
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.source !== "post" && parent?.source !== "video",
    },
    {
      name: "showFeatured",
      title: "Lyft fram det senaste",
      type: "boolean",
      description:
        "Visar det nyaste objektet stort överst, resten som kort under.",
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.source !== "post" && parent?.source !== "video",
    },
    {
      name: "tone",
      title: "Bakgrund",
      type: "string",
      options: {
        list: [
          { title: "Vit", value: "surface" },
          { title: "Ljusgrå", value: "soft" },
          { title: "Mörkblå", value: "petrol" },
        ],
        layout: "radio",
      },
      initialValue: "surface",
    },
  ],
  preview: {
    select: { title: "heading", source: "source" },
    prepare({ title, source }) {
      const labels: Record<string, string> = {
        meditation: "Meditationer",
        foredrag: "Föredrag",
        video: "Videos",
        post: "Blogginlägg",
      };
      return {
        title: title || labels[source] || "Lista",
        subtitle: `Lista · ${labels[source] ?? ""}`,
      };
    },
  },
});
