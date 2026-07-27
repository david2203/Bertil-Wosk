
// Keep field names in sync with studio/schemas/*. See AGENTS.md §9.

export const homePostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3]{
    _id, title, "slug": slug.current, excerpt, coverImage, publishedAt
  }
`;

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc){
    _id, title, "slug": slug.current, excerpt, coverImage, publishedAt
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, excerpt, publishedAt, body,
    coverImage{ ..., alt }
  }
`;

export const foredragListQuery = `
  *[_type == "foredrag"] | order(_createdAt desc){
    _id, title, "slug": slug.current, description, attachments
  }
`;

export const foredragBySlugQuery = `
  *[_type == "foredrag" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, description, body, youtubeUrl,
    attachments[]{ label, "url": file.asset->url }
  }
`;

export const meditationsQuery = `
  *[_type == "meditation"]
    | order(coalesce(sortOrder, 9999) asc, _createdAt desc){
      _id, title, "slug": slug.current, description, durationMinutes,
      sortOrder, sourceType, spotifyUrl,
      "audioUrl": audioFile.asset->url
    }
`;

export const videosQuery = `
  *[_type == "video"] | order(publishedAt desc){
    _id, title, "slug": slug.current, youtubeUrl, description, publishedAt
  }
`;

// Fields fetched for items inside a collectionBlock. Types that lack a given
// field simply return null, so one projection covers all four collections.
const COLLECTION_ITEM_FIELDS = `
  _id, _type, title, "slug": slug.current,
  description, excerpt, coverImage, publishedAt,
  durationMinutes, sortOrder, sourceType, spotifyUrl,
  "audioUrl": audioFile.asset->url,
  youtubeUrl
`;

// Shared projection for page-builder sections.
// - collectionBlock resolves its items inline. Sorting honours an explicit
//   `sortOrder` first (meditations use it), then falls back to newest-first;
//   types without that field all coalesce to 9999 so they keep date order.
//   GROQ slices must use constant bounds, so the editor's "Max antal"
//   (`limit`) is applied in CollectionSection rather than here.
// - heroBlock resolves its optional CTA page reference to slug + placement
const PAGE_SECTIONS = `
  sections[]{
    ...,
    _type == "collectionBlock" => {
      "items": *[_type == ^.source]
        | order(coalesce(sortOrder, 9999) asc, coalesce(publishedAt, _createdAt) desc)[0...100]{
          ${COLLECTION_ITEM_FIELDS}
        }
    },
    _type == "heroBlock" => {
      "ctaTarget": ctaPage->{ "slug": slug.current, placement }
    },
    _type == "textImageBlock" => {
      "ctaTarget": ctaPage->{ "slug": slug.current, placement }
    },
    _type == "resourcesBlock" => {
      "items": select(
        count(pages) > 0 =>
          pages[]->{
            _id, title, "slug": slug.current, intro, placement,
            "sources": sections[_type == "collectionBlock"].source,
            "itemCount": count(*[_type in ^.sections[_type == "collectionBlock"].source])
          },
        *[_type == "page" && placement == "resources" && defined(slug.current)]
          | order(coalesce(menuOrder, 99) asc){
            _id, title, "slug": slug.current, intro, placement,
            "sources": sections[_type == "collectionBlock"].source,
            "itemCount": count(*[_type in ^.sections[_type == "collectionBlock"].source])
          }
      )
    }
  }
`;

const PAGE_FIELDS = `
  _id, title, "slug": slug.current, placement, intro, showTitle,
  ${PAGE_SECTIONS}
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug && placement == $placement][0]{
    ${PAGE_FIELDS}
  }
`;

// The start page (placement "home"). Only one should exist.
export const homePageQuery = `
  *[_type == "page" && placement == "home"][0]{
    ${PAGE_FIELDS}
  }
`;

// All CMS pages (for generateStaticParams), split by placement.
export const pageSlugsQuery = `
  *[_type == "page" && defined(slug.current) && placement == $placement]{
    "slug": slug.current
  }
`;

// Pages shown in the Resurser dropdown.
export const resourceMenuPagesQuery = `
  *[_type == "page" && placement == "resources" && showInMenu == true]
    | order(coalesce(menuOrder, 99) asc){
      _id, title, "slug": slug.current, placement
    }
`;

// Pages the editor flagged for the main menu (start page + standalone pages).
// `placement` is included so the start page can link to "/" instead of a slug.
export const mainMenuPagesQuery = `
  *[_type == "page" && placement != "resources" && showInMenu == true]
    | order(coalesce(menuOrder, 99) asc){
      _id, title, "slug": slug.current, placement
    }
`;

// Everything under Resurser (for the /resurser index page).
// `sources` / `itemCount` let a card say "18 meditationer" by looking at the
// collection blocks the page actually contains.
const RESOURCE_CARD_FIELDS = `
  _id, title, "slug": slug.current, intro, placement,
  "sources": sections[_type == "collectionBlock"].source,
  "itemCount": count(*[_type in ^.sections[_type == "collectionBlock"].source])
`;

export const allResourcePagesQuery = `
  *[_type == "page" && placement == "resources" && defined(slug.current)]
    | order(coalesce(menuOrder, 99) asc){
      ${RESOURCE_CARD_FIELDS}
    }
`;

// Everything that should appear in sitemap.xml, with modification dates.
export const sitemapQuery = `
{
  "pages": *[_type == "page" && (defined(slug.current) || placement == "home")]{
    "slug": slug.current, placement, _updatedAt
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "slug": slug.current, _updatedAt
  },
  "foredrag": *[_type == "foredrag" && defined(slug.current)]{
    "slug": slug.current, _updatedAt
  },
  "hasResources": count(*[_type == "page" && placement == "resources"]) > 0
}
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    title, contactEmail, footerText, social,
    privacyPage->{ _id, title, "slug": slug.current, placement },
    disclaimerPage->{ _id, title, "slug": slug.current, placement }
  }
`;
