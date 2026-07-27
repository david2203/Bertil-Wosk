import { defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
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
    {
      name: "youtubeUrl",
      title: "YouTube-länk",
      type: "url",
      validation: (r) => r.required(),
    },
    { name: "description", title: "Beskrivning", type: "text", rows: 3 },
    { name: "publishedAt", title: "Publicerad", type: "datetime" },
  ],
  preview: { select: { title: "title", subtitle: "youtubeUrl" } },
});
