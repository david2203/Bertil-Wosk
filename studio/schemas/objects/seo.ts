import { defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    { name: "metaTitle", title: "Meta-titel", type: "string" },
    {
      name: "metaDescription",
      title: "Meta-beskrivning",
      type: "text",
      rows: 2,
    },
    { name: "ogImage", title: "Delningsbild", type: "image" },
  ],
});
