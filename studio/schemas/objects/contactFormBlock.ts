import { defineType } from "sanity";

// Contact form section, so the Kontakt page can be built like any other page.
export const contactFormBlock = defineType({
  name: "contactFormBlock",
  title: "Kontaktformulär",
  type: "object",
  fields: [
    { name: "heading", title: "Rubrik (valfri)", type: "string" },
    { name: "intro", title: "Ingress (valfri)", type: "text", rows: 2 },
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Kontaktformulär", subtitle: "Formulär" };
    },
  },
});
