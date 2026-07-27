# AGENTS.md — bertilwosk.se

Guidance for any AI agent or developer working in this repo. Read this first.

---

## 1. Project at a glance

Personal website for **Bertil Wosk** — health expert, nutrition/supplements specialist
(former founder & owner of Holistic), public speaker and writer. The site is a calm,
credible home for his talks, articles, meditations and videos.

- **Domain:** www.bertilwosk.se
- **Audience:** Swedish-speaking, health-interested general public.
- **Tone:** Professional and trustworthy with a warm, wellness undertone. Fact-forward,
  not mystical. (Reference the client liked: clean, "clinical/credible" direction.)
- **No e-commerce.** No sales, no cart, no payments.

### Current status
Scaffold / foundation. Content is wired through Sanity; most pages are component-ready
stubs awaiting real copy and media from the client.

---

## 2. Tech stack & rationale

| Concern        | Choice                          | Why |
|----------------|---------------------------------|-----|
| Framework      | Next.js 16 (App Router, RSC)    | SEO, speed, simple hosting |
| Language       | TypeScript                      | Safety on a long-lived project |
| Styling        | Tailwind CSS + CSS variables    | Tokens in one place, fast, consistent |
| Animation      | GSAP                            | Height/motion transitions CSS can't do (e.g. FAQ accordion) |
| CMS            | Sanity v6 + next-sanity 13      | Free tier, friendly editor, native file (PDF/PPT/MP3) handling, embedded Studio at `/studio` |

> Versions are kept at the current latest, verified to resolve together:
> Next 16, React 19.2, Sanity 6, @sanity/vision 6, next-sanity 13.
> If you ever hit a transitive error like `coreBehaviors is not exported`,
> it means a stale `node_modules`/lockfile — delete both and reinstall clean.
| Hosting        | Vercel (recommended)            | Free hobby tier, auto-deploy, easy domain wiring |
| Contact form   | Resend (planned)                | Sends submissions to Bertil's inbox |
| Fonts          | Serif display + sans body       | Editorial credibility (see tokens) |

Estimated running cost to start: ~€0/month (Sanity free + Vercel hobby + owned domain).

---

## 3. Decisions log (what the client asked for)

- Chosen design direction: **"Klar & saklig" (clean / credible)** — white surfaces,
  deep petrol-blue primary, warm gold accent, serif headlines. See mockup
  `design_B_v2_final.png` in the repo root.
- **Homepage hero:** large nature photo with the slogan overlaid.
- **Slogan (H1):** _"Att leva ett liv i hälsa är att leva ett liv i balans."_
- **Navigation:** `Hem · Om · Resurser ▾ · Kontakt`
  - **Resurser** is a dropdown grouping the content types:
    `Föredrag · Meditationer · Videos · Blogg`
  - Adding a new item of any type in Sanity surfaces it automatically — no menu editing.
  - Articles (artiklar) were removed; Blogg lives inside Resurser (not top-level).
- **Meditationer:** new section. Audio (MP3) played inline on the page. Source files
  currently live on Holistic.se; client is seeking permission to reuse, otherwise will
  re-record. Host the MP3s as Sanity file assets once available.
- **Videos:** eventually pulled from Bertil's YouTube channel. For now, manual entries
  (paste a YouTube URL → it embeds). Channel auto-sync is a later enhancement.
- **PDF / PPT:** föredrag can carry downloadable PDF/PPT attachments
  (e.g. the immunization-graphs PDF). Stored as Sanity file assets.
- **Languages:** **Swedish only at launch**, but the codebase must make adding English
  a small, low-risk change. See §6.
- Note: Bertil is openly vaccine-skeptical; some materials reflect that. This is the
  client's editorial choice — present his content as given.

---

## 4. Design tokens (single source of truth)

Defined in `src/app/globals.css` (CSS variables) and mirrored in `tailwind.config.ts`.
**Never hard-code hex values in components — use the token.**

```
Primary  petrol        #1F4E5F   buttons, header accents, footer
         petrol-700    #2C5F70   hover / raised surfaces on dark
Ink      ink           #16242B   headings, primary text
Muted    muted         #5A6A70   secondary text
Accent   gold          #B8862F   kickers, tags, small highlights
         gold-light    #E7C879   illustrative (sun, etc.)
Surface  surface       #F7FAFB   page background — faint cool blue, not white
         soft          #E9F1F3   section / card fills (one step deeper)
         sky           #DCE7E5   hero sky tone
Border   border        rgba(31,78,95,.15)
```

Typography
- **Display / headings:** serif — `var(--font-serif)` (Newsreader, fallback Georgia).
- **Body / UI:** sans — `var(--font-sans)` (Inter, fallback system-ui).
- Two weights only: 400 and 500/600 for emphasis. Sentence case, never ALL CAPS in
  prose (small uppercase kickers/tags are OK with letter-spacing).
- Scale: H1 ~40px, H2 ~28px, H3 ~19px, body 16px, small 13–14px. Line-height 1.6–1.7.

Shape & spacing
- Radius: cards/inputs `--radius` (6px), pills only where intended.
- Section vertical rhythm: multiples of 8px; sections pad ~64–80px top/bottom.

---

## 5. Information architecture

**Almost every page is CMS-authored.** Only item detail pages are hard-coded.

```
/sv                         Start page  → the page doc with placement "home"
/sv/[slug]                  Standalone page → placement "top"  (Om, Kontakt, …)
/sv/resurser                Index of everything under Resurser
/sv/resurser/[slug]         Page → placement "resources"  (Meditationer, Videos, …)
/sv/blogg/[slug]            Blog post detail        (hard-coded)
/sv/foredrag/[slug]         Talk detail + PDF/PPT   (hard-coded)
/studio                     Sanity Studio
```

`/` redirects to `/sv` (default locale). The `[lang]` segment is already in place so
`/en/...` works the moment English is enabled.

There are no fixed listing routes: Bertil builds "Meditationer", "Videos", "Blogg"
etc. as pages containing a **collection block**. Static route segments
(`blogg`, `foredrag`, `resurser`, `studio`, `api`) outrank `[slug]`, so those are
reserved — see `src/lib/reservedSlugs.ts`, mirrored by validation in the page schema.

---

## 6. Internationalisation (Swedish now, English later)

Design goal: **launch Swedish-only, flip a switch for English.**

- `src/i18n/config.ts` holds `locales` and `defaultLocale`.
  - **Now:** `locales = ['sv']`.
  - **To add English:** add `'en'`, create `src/i18n/dictionaries/en.json`, and (in Sanity)
    fill the English fields. Nothing else structural changes.
- UI strings (nav, buttons, labels) come from `src/i18n/dictionaries/*.json` via the
  `getDictionary(lang)` loader — **no hard-coded UI text in components.**
- Routing already uses `app/[lang]/...` with `generateStaticParams()` from `locales`,
  so URLs are locale-prefixed from day one.
- `LanguageToggle` renders only when `locales.length > 1`, so it is invisible now and
  appears automatically once English is added.
- **Content localisation (Sanity):** launch keeps content fields as plain Swedish
  strings (simplest). When English is needed, migrate the relevant fields to
  `internationalizedArray` (plugin: `@sanity/internationalized-array`) or use
  `@sanity/document-internationalization` for whole-document translations. Either way,
  the front end reads `field[lang] ?? field['sv']` so **untranslated content falls back
  to Swedish** rather than showing blank. Keep this fallback rule.

---

## 7. Component architecture

**Rule: if it appears more than once, it is a component.** Compose pages from these;
do not re-style ad hoc. All live under `src/components/`.

Primitives (`ui/`)
- `Container` — max-width + horizontal padding wrapper.
- `Section` — vertical rhythm + optional `tone` (white | soft | petrol).
- `Button` — variants `primary | outline | ghost`, sizes; renders `<a>` or `<button>`.
- `Badge` / `Kicker` — small uppercase gold label.
- `SectionHeading` — serif title + optional intro line.

Layout (`layout/`)
- `Header` — brand, `Nav`, `LanguageToggle`. Sticky, accessible.
- `Nav` — top links + `Resurser` dropdown (keyboard + screen-reader friendly).
- `LanguageToggle` — SV/EN (hidden while single-locale).
- `Footer` — brand, contact, locale line.

Blocks (`blocks/`)
- `Hero` — nature image + overlaid kicker/slogan/CTA.
- `ResourceCard` — one card for any resource type (tag, title, desc, link).
- `ResourceGrid` — responsive grid of `ResourceCard`.
- `AudioPlayer` — accessible inline player for meditations (native `<audio>` + custom UI).
- `PostCard` — blog/article teaser (image, title, excerpt).
- `VideoEmbed` — lazy, privacy-friendly YouTube embed.

Each component: typed props, no internal data fetching (pages fetch, pass data down),
token-based styling only.

---

## 8. Accessibility (non-negotiable)

- Semantic HTML: one `<h1>` per page, logical heading order, `<nav>`, `<main>`,
  `<footer>`, lists for lists.
- All interactive elements keyboard-operable; visible focus rings (never `outline:none`
  without a replacement).
- **Resurser dropdown:** `aria-expanded`, `aria-controls`, opens on click/Enter/Space,
  closes on Escape, focus moves into the menu; works without JS as a plain link to a
  `/resurser` overview (progressive enhancement).
- Images require meaningful `alt` (decorative → `alt=""`). Hero photo gets descriptive alt.
- **Audio players:** labelled controls, `aria-label`, captions/transcript link where a
  meditation has spoken content.
- Color contrast ≥ WCAG AA: check gold-on-white for small text (use `ink`/`petrol` for
  body, reserve gold for large or bold labels).
- Respect `prefers-reduced-motion`.
- Language set on `<html lang>` per locale.

---

## 9. Sanity content model

Document types (in `studio/schemas/`):

> The Sanity folder is named `studio/` (not `sanity/`) on purpose: with
> `baseUrl: "."` in tsconfig, a local folder named `sanity/` shadows the
> `sanity` npm package and breaks imports like `sanity/structure`.
- `siteSettings` (singleton) — site title, default SEO, contact email, social links.
- `page` ("Sidor") — the page builder; nearly the whole site. Fields:
  - `placement` — `home` (the start page, one only) · `top` (`/sv/<slug>`) ·
    `resources` (`/sv/resurser/<slug>`)
  - `slug` — hidden for the start page; validated against reserved slugs
  - `showInMenu` + `menuOrder` — drives the **entire** nav. Resource pages go in
    the Resurser dropdown, everything else sits in the main bar.
  - `showTitle` / `intro` — auto-suppressed when the page opens with a hero block
  - `sections[]` — the blocks below
  - `seo`
- `post` — blog: title, slug, excerpt, coverImage, body, publishedAt.
- `foredrag` (talk) — title, slug, description, body, `attachments[]` (PDF/PPT files),
  optional video.
- `meditation` — title, slug, description, optional transcript, a numeric
  `sortOrder` ("Ordning" — lower first; empty sorts last by date), and a
  `sourceType` of either:
  - `file` → uploaded `audioFile` (MP3), played by the custom `AudioPlayer`,
    with `durationMinutes` shown alongside
  - `spotify` → `spotifyUrl`, rendered via `SpotifyEmbed` (accepts share links
    with `/intl-xx/` and `?si=` params, or `spotify:` URIs; tracks/episodes get
    the compact player, playlists/albums/shows the tall one)

  Validation requires whichever field matches the chosen source, and the
  irrelevant field is hidden in the Studio.
- `video` — title, slug, youtubeUrl, description, publishedAt.

Shared objects: `seo`, `attachment` (file + label), portable-text `blockContent`.
Keep field names stable — front-end GROQ queries in `src/lib/queries.ts` depend on them.

### Page-builder blocks

| Block | Schema | Renders as |
|-------|--------|-----------|
| `heroBlock` | Toppbild — kicker, heading, background image, CTA (page ref or link) | `HeroSection` |
| `textImageBlock` | Text & bild — heading, text, image, `imageFirst`, `tone`, CTA (page ref or link) | `TextImageSection` |
| `resourcesBlock` | Resurser kortgrid — optional hand-picked `pages[]` (else all Resurser pages), `columns` (2 default → 2×2, or 3), `tone` | `ResourcesSection` |
| `collectionBlock` | Lista — `source` (meditation/foredrag/video/post), `limit`, `tone` | `CollectionSection` |
| `richTextBlock` | Textavsnitt — portable text, `tone` | `RichTextSection` |
| `faqBlock` | Vanliga frågor — `items[]` (question + rich answer), `openFirst`, `tone` | `FaqSection` → `FaqAccordion` |
| `contactFormBlock` | Kontaktformulär | `ContactFormSection` |

**Adding a block:** create the schema object → register in `studio/schemas/index.ts`
→ add to the page schema's `sections` array → add its type to `PageSection` in
`src/lib/types.ts` → add a `case` in `src/components/sections/PageSections.tsx`.

**Two GROQ gotchas** (both cost us bugs — see `src/lib/queries.ts`):
1. GROQ slices require **constant** bounds. `[0...^.limit]` fails to parse and,
   because `sanityFetch` catches errors, it fails *silently* — every page 404s.
   The `limit` is therefore applied in `CollectionSection`, not the query.
2. Any query feeding `pageHref()` must project `placement`, or links to resource
   pages lose their `/resurser/` prefix and 404.

`TextImageSection` keeps text before image in the DOM always; `imageFirst` only
flips the desktop order via `md:flex-row-reverse`, so mobile always reads text first.

`FaqAccordion` is the one animated component. It keeps native
`<details>`/`<summary>` for keyboard support and no-JS fallback, but intercepts
the click so GSAP can tween the panel height (CSS can't transition to
`height: auto`). Only one question stays open at a time, and the whole thing
respects `prefers-reduced-motion` by setting the duration to zero.

---

## 10. Conventions

- Path alias `@/*` → `src/*`.
- Server Components by default; add `'use client'` only for interactivity
  (`Nav` dropdown, `LanguageToggle`, `AudioPlayer`).
- Fetch data in `page.tsx` (server), pass plain props to components.
- Keep UI copy in dictionaries; keep editorial copy in Sanity.
- Commit small; keep this file updated when decisions change.

---

## 11. Local setup

```bash
npm install
cp .env.local.example .env.local   # fill Sanity project id / dataset
npm run dev                        # http://localhost:3000  → /sv
# Studio: http://localhost:3000/studio
```

Create a free Sanity project at sanity.io to get `projectId` + `dataset` (use `production`).

---

## 12. Roadmap / TODO

- [ ] Real homepage hero photo (client to supply) + descriptive alt.
- [ ] Populate Sanity with first föredrag (immunization-graphs PDF), an article, a post.
- [ ] Meditation MP3s once rights/recordings are sorted → upload + transcripts.
- [ ] Contact form wiring (Resend) + spam protection.
- [ ] YouTube channel auto-sync for Videos (later).
- [ ] Enable English: add locale + dictionary + Sanity translations (see §6).
- [ ] SEO: per-page metadata, sitemap, Open Graph images.
- [ ] Deploy to Vercel and connect bertilwosk.se.
```
