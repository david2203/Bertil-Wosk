import { defineType } from "sanity";

export const attachment = defineType({
  name: "attachment",
  title: "Bilaga",
  type: "object",
  fields: [
    { name: "label", title: "Etikett", type: "string" },
    {
      name: "file",
      title: "Fil (PDF / PPT)",
      type: "file",
      options: { accept: ".pdf,.ppt,.pptx" },
    },
  ],
  preview: {
    select: { title: "label", media: "file" },
  },
});
