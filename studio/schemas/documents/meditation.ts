import { defineType } from "sanity";

export const meditation = defineType({
  name: "meditation",
  title: "Meditation",
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
    {
      name: "sortOrder",
      title: "Ordning",
      type: "number",
      description:
        "Lägre tal visas först. Lämna tomt för att sortera efter datum.",
      validation: (r) => r.min(0),
    },
    {
      name: "sourceType",
      title: "Ljudkälla",
      type: "string",
      options: {
        list: [
          { title: "Uppladdad ljudfil (MP3)", value: "file" },
          { title: "Spotify", value: "spotify" },
        ],
        layout: "radio",
      },
      initialValue: "file",
      validation: (r) => r.required(),
    },
    {
      name: "audioFile",
      title: "Ljudfil (MP3)",
      type: "file",
      options: { accept: "audio/*" },
      hidden: ({ document }) => document?.sourceType === "spotify",
      validation: (r) =>
        r.custom((value, context) => {
          const doc = context.document as { sourceType?: string } | undefined;
          if (doc?.sourceType === "spotify") return true;
          return value ? true : "Ladda upp en ljudfil, eller välj Spotify.";
        }),
    },
    {
      name: "spotifyUrl",
      title: "Spotify-länk",
      type: "url",
      description:
        "Klistra in länken till spåret, avsnittet eller spellistan (Dela → Kopiera länk).",
      hidden: ({ document }) => document?.sourceType !== "spotify",
      validation: (r) =>
        r.custom((value, context) => {
          const doc = context.document as { sourceType?: string } | undefined;
          if (doc?.sourceType !== "spotify") return true;
          if (!value) return "Ange en Spotify-länk.";
          return /open\.spotify\.com\/(intl-[a-z]+\/)?(track|episode|playlist|album|show)\//.test(
            String(value)
          )
            ? true
            : "Länken måste se ut som https://open.spotify.com/track/…";
        }),
    },
    {
      name: "durationMinutes",
      title: "Längd (minuter)",
      type: "number",
      description: "Visas bredvid titeln. Behövs inte för Spotify.",
      hidden: ({ document }) => document?.sourceType === "spotify",
    },
    {
      name: "transcript",
      title: "Transkription (tillgänglighet)",
      type: "blockContent",
    },
  ],
  orderings: [
    {
      title: "Ordning",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    {
      title: "Senast skapad",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      source: "sourceType",
      order: "sortOrder",
    },
    prepare({ title, subtitle, source, order }) {
      const tag = source === "spotify" ? "Spotify" : "MP3";
      const num = typeof order === "number" ? `${order}. ` : "";
      return {
        title: `${num}${title}`,
        subtitle: `${tag}${subtitle ? " · " + subtitle : ""}`,
      };
    },
  },
});
