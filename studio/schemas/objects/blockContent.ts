import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Innehåll",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Brödtext", value: "normal" },
        { title: "Rubrik", value: "h2" },
        { title: "Underrubrik", value: "h3" },
        { title: "Citat", value: "blockquote" },
      ],
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
                // Sanity only allows http/https by default.
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
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt-text",
          description:
            "Beskriv bilden för skärmläsare. Lämna tom om bilden är dekorativ.",
        },
        {
          name: "caption",
          type: "string",
          title: "Bildtext",
          description: "Visas under bilden.",
        },
      ],
    }),
  ],
});
