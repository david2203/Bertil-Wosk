import type { PortableTextBlock } from "@portabletext/types";
import type { ImageSource } from "./sanity.image";

export type SanityImage = ImageSource;

export type Attachment = {
  label?: string;
  file?: { asset?: { url?: string } };
  url?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  body?: PortableTextBlock[];
};

export type Foredrag = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  body?: PortableTextBlock[];
  attachments?: Attachment[];
  youtubeUrl?: string;
};

export type Meditation = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  durationMinutes?: number;
  /** Lower shows first; unset sorts after everything, by date. */
  sortOrder?: number;
  /** "file" (uploaded MP3) or "spotify" (embedded). Defaults to file. */
  sourceType?: "file" | "spotify";
  spotifyUrl?: string;
  audioUrl?: string;
};

export type Video = {
  _id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  description?: string;
  publishedAt?: string;
};

export type SectionTone = "surface" | "soft" | "petrol";

// One item inside a collectionBlock — a union of the four collections'
// fields; irrelevant ones come back null.
export type CollectionItem = {
  _id: string;
  _type: "meditation" | "foredrag" | "video" | "post";
  title: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  durationMinutes?: number;
  sortOrder?: number;
  sourceType?: "file" | "spotify";
  spotifyUrl?: string;
  audioUrl?: string;
  youtubeUrl?: string;
};

export type PagePlacement = "home" | "top" | "resources";

export type HeroBlock = {
  _key: string;
  _type: "heroBlock";
  kicker?: string;
  heading: string;
  image?: SanityImage & { alt?: string };
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: { slug?: string; placement?: PagePlacement } | null;
};

export type FaqItem = {
  _key: string;
  question: string;
  answer?: PortableTextBlock[];
};

export type FaqBlock = {
  _key: string;
  _type: "faqBlock";
  heading?: string;
  intro?: string;
  items?: FaqItem[];
  openFirst?: boolean;
  tone?: Exclude<SectionTone, "petrol">;
};

export type ContactFormBlock = {
  _key: string;
  _type: "contactFormBlock";
  heading?: string;
  intro?: string;
};

export type TextImageBlock = {
  _key: string;
  _type: "textImageBlock";
  heading?: string;
  text?: PortableTextBlock[];
  image?: SanityImage & { alt?: string };
  imageFirst?: boolean;
  tone?: Exclude<SectionTone, "petrol">;
  ctaLabel?: string;
  ctaHref?: string;
  /** Resolved from the optional `ctaPage` reference. Takes priority over ctaHref. */
  ctaTarget?: { slug?: string; placement?: PagePlacement } | null;
};

export type CollectionBlock = {
  _key: string;
  _type: "collectionBlock";
  heading?: string;
  intro?: string;
  source: "meditation" | "foredrag" | "video" | "post";
  limit?: number;
  tone?: SectionTone;
  /** Opt-in per block; both default to off so short feeds stay simple. */
  showSearch?: boolean;
  showFeatured?: boolean;
  items?: CollectionItem[];
};

export type ResourcesBlock = {
  _key: string;
  _type: "resourcesBlock";
  heading?: string;
  intro?: string;
  columns?: "2" | "3";
  tone?: Exclude<SectionTone, "petrol">;
  /** Hand-picked pages, or every Resurser page when none were chosen. */
  items?: MenuPage[];
};

export type RichTextBlock = {
  _key: string;
  _type: "richTextBlock";
  body?: PortableTextBlock[];
  tone?: Exclude<SectionTone, "petrol">;
};

export type PageSection =
  | HeroBlock
  | TextImageBlock
  | ResourcesBlock
  | CollectionBlock
  | RichTextBlock
  | FaqBlock
  | ContactFormBlock;

export type Page = {
  _id: string;
  title: string;
  slug?: string;
  placement?: PagePlacement;
  intro?: string;
  showTitle?: boolean;
  sections?: PageSection[];
  showInMenu?: boolean;
  menuOrder?: number;
};

export type CollectionSource = "meditation" | "foredrag" | "video" | "post";

// Slim shape used to render CMS pages in menus and on resource cards.
export type MenuPage = {
  _id: string;
  title: string;
  slug?: string;
  intro?: string;
  placement?: PagePlacement;
  /** Collection types this page lists, derived from its collection blocks. */
  sources?: CollectionSource[];
  /** How many items those collections currently hold. */
  itemCount?: number;
};
