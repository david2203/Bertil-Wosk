import { defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Webbplatsinställningar",
  type: "document",
  fields: [
    { name: "title", title: "Webbplatsens namn", type: "string" },
    { name: "contactEmail", title: "Kontakt-e-post", type: "string" },
    {
      name: "footerText",
      title: "Text i sidfoten",
      type: "text",
      rows: 3,
      description: "Kort presentation som visas överst till vänster i sidfoten.",
      initialValue:
        "Hälsoexpert och föreläsare. Grundare av Holistic. Här samlar jag föredrag, meditationer, videos och texter om näring, hälsa och balans.",
    },
    {
      name: "social",
      title: "Sociala länkar",
      type: "array",
      description: "Visas i sidfoten. Endast ifyllda länkar visas.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Plattform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (r) => r.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    },
    {
      name: "privacyPage",
      title: "Integritetspolicy",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Länkas längst ned i sidfoten. Skapa den som en fristående sida.",
    },
    {
      name: "disclaimerPage",
      title: "Ansvarsfriskrivning",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Länkas längst ned i sidfoten. Skapa den som en fristående sida.",
    },
    { name: "seo", title: "Standard-SEO", type: "seo" },
  ],
});
