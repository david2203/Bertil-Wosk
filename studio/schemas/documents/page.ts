import { defineType } from "sanity";

// Slugs owned by real routes in the app — a top-level CMS page must not
// shadow them. Keep in sync with src/lib/reservedSlugs.ts
const RESERVED_TOP_SLUGS = ["blogg", "foredrag", "resurser", "studio", "api"];

export const page = defineType({
  name: "page",
  title: "Sida",
  type: "document",
  groups: [
    { name: "content", title: "Innehåll", default: true },
    { name: "settings", title: "Inställningar" },
  ],
  fields: [
    {
      name: "title",
      title: "Titel",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    },
    {
      name: "placement",
      title: "Var ska sidan ligga?",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Startsida  ( / )", value: "home" },
          { title: "Fristående sida  ( /sv/… )", value: "top" },
          { title: "Under Resurser  ( /sv/resurser/… )", value: "resources" },
        ],
        layout: "radio",
      },
      initialValue: "top",
      validation: (r) => r.required(),
    },
    {
      name: "slug",
      title: "Slug (webbadress)",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      description:
        "Sidans adress. Behövs inte för startsidan.",
      hidden: ({ document }) => document?.placement === "home",
      validation: (r) =>
        r.custom((value: { current?: string } | undefined, context) => {
          const doc = context.document as { placement?: string } | undefined;
          const placement = doc?.placement;
          if (placement === "home") return true;
          const s = value?.current;
          if (!s) return "Slug krävs.";
          if (placement !== "resources" && RESERVED_TOP_SLUGS.includes(s)) {
            return `"${s}" är reserverad av en befintlig sida. Välj en annan adress.`;
          }
          return true;
        }),
    },
    {
      name: "showInMenu",
      title: "Visa i menyn",
      type: "boolean",
      group: "settings",
      description:
        "Sidor under Resurser hamnar i Resurser-menyn. Övriga hamnar i huvudmenyn.",
      initialValue: false,
    },
    {
      name: "menuOrder",
      title: "Ordning i menyn",
      type: "number",
      group: "settings",
      description: "Lägre tal visas först.",
      hidden: ({ document }) => !document?.showInMenu,
    },
    {
      name: "showTitle",
      title: "Visa rubrik högst upp",
      type: "boolean",
      group: "content",
      description:
        "Stäng av om sidan börjar med en hero eller egen rubrik.",
      initialValue: true,
    },
    {
      name: "intro",
      title: "Ingress (valfri)",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ document }) => document?.showTitle === false,
    },
    {
      name: "sections",
      title: "Innehållsblock",
      type: "array",
      group: "content",
      description: "Bygg sidan av block. Dra för att ändra ordning.",
      of: [
        { type: "heroBlock" },
        { type: "textImageBlock" },
        { type: "resourcesBlock" },
        { type: "collectionBlock" },
        { type: "richTextBlock" },
        { type: "faqBlock" },
        { type: "contactFormBlock" },
      ],
    },
    { name: "seo", title: "SEO", type: "seo", group: "settings" },
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      placement: "placement",
      menu: "showInMenu",
    },
    prepare({ title, slug, placement, menu }) {
      const path =
        placement === "home"
          ? "/"
          : placement === "resources"
            ? `/resurser/${slug ?? ""}`
            : `/${slug ?? ""}`;
      return { title, subtitle: `${path}${menu ? "  ·  i menyn" : ""}` };
    },
  },
});
