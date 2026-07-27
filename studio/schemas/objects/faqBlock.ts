import { defineType } from "sanity";

// Expandable question/answer list.
export const faqBlock = defineType({
  name: "faqBlock",
  title: "Vanliga frågor (FAQ)",
  type: "object",
  fields: [
    { name: "heading", title: "Rubrik (valfri)", type: "string" },
    { name: "intro", title: "Ingress (valfri)", type: "text", rows: 2 },
    {
      name: "items",
      title: "Frågor",
      type: "array",
      validation: (r) => r.min(1),
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Fråga",
          fields: [
            {
              name: "question",
              title: "Fråga",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "answer",
              title: "Svar",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Brödtext", value: "normal" }],
                  lists: [
                    { title: "Punktlista", value: "bullet" },
                    { title: "Numrerad", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Fet", value: "strong" },
                      { title: "Kursiv", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Länk",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                            description:
                              "Webbadress, e-post (mailto:) eller telefon (tel:).",
                            validation: (r) =>
                              r.uri({
                                scheme: ["http", "https", "mailto", "tel"],
                                allowRelative: true,
                              }),
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    },
    {
      name: "openFirst",
      title: "Öppna första frågan direkt",
      type: "boolean",
      initialValue: false,
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
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Vanliga frågor",
        subtitle: `FAQ · ${n} ${n === 1 ? "fråga" : "frågor"}`,
      };
    },
  },
});
