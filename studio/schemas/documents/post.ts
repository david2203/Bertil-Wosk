import { defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blogginlägg",
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
    { name: "excerpt", title: "Ingress", type: "text", rows: 3 },
    {
      name: "coverImage",
      title: "Omslagsbild",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt-text" }],
    },
    { name: "publishedAt", title: "Publicerad", type: "datetime" },
    { name: "body", title: "Innehåll", type: "blockContent" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  orderings: [
    {
      title: "Publicerad, nyast först",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", media: "coverImage", subtitle: "publishedAt" } },
});
