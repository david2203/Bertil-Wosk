import { defineType } from "sanity";

export const foredrag = defineType({
  name: "foredrag",
  title: "Föredrag",
  type: "document",
  fields: [
    { name: "title", title: "Titel", type: "string", validation: (r) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    },
    { name: "description", title: "Beskrivning", type: "text", rows: 3 },
    { name: "body", title: "Innehåll", type: "blockContent" },
    {
      name: "attachments",
      title: "Bilagor (PDF / PPT)",
      type: "array",
      of: [{ type: "attachment" }],
    },
    { name: "youtubeUrl", title: "YouTube-länk (valfri)", type: "url" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
