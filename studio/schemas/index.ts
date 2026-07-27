import { blockContent } from "./objects/blockContent";
import { attachment } from "./objects/attachment";
import { seo } from "./objects/seo";
import { heroBlock } from "./objects/heroBlock";
import { textImageBlock } from "./objects/textImageBlock";
import { collectionBlock } from "./objects/collectionBlock";
import { resourcesBlock } from "./objects/resourcesBlock";
import { richTextBlock } from "./objects/richTextBlock";
import { faqBlock } from "./objects/faqBlock";
import { contactFormBlock } from "./objects/contactFormBlock";
import { post } from "./documents/post";
import { foredrag } from "./documents/foredrag";
import { meditation } from "./documents/meditation";
import { video } from "./documents/video";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes = [
  // objects
  blockContent,
  attachment,
  seo,
  // page-builder blocks
  heroBlock,
  textImageBlock,
  collectionBlock,
  resourcesBlock,
  richTextBlock,
  faqBlock,
  contactFormBlock,
  // documents
  siteSettings,
  page,
  post,
  foredrag,
  meditation,
  video,
];
