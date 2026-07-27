# bertilwosk.se

Personal website for Bertil Wosk — health expert, speaker and writer.
Next.js 15 (App Router) + Sanity CMS + Tailwind. Swedish now, English-ready.

> For full architecture, decisions and conventions, read **AGENTS.md**.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # add your Sanity project id + dataset
npm run dev
```

- Site: http://localhost:3000 → redirects to `/sv`
- CMS (Sanity Studio): http://localhost:3000/studio

Create a free Sanity project at https://sanity.io to get a `projectId` and a
`production` dataset, then fill `.env.local`. Until then the site renders with
empty content (no crashes).

## Scripts

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build & serve
- `npm run typecheck` — TypeScript check
- `npm run lint` — Next.js lint

## Structure

```
src/app          Routes (/[lang]/... + /studio + /api/contact)
src/components    ui/ primitives · layout/ · blocks/
src/i18n          Locale config + dictionaries (Swedish)
src/lib           Sanity client, queries, types, helpers
studio/           Sanity schemas + Studio structure
```

## Adding English later

Add `"en"` to `src/i18n/config.ts`, create `src/i18n/dictionaries/en.json`, and
add English fields in Sanity. The language toggle and `/en` routes activate
automatically. See AGENTS.md §6.
