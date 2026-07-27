import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN serves cached responses, which makes edits appear delayed while
  // developing. Use the live API locally, the CDN in production.
  useCdn: process.env.NODE_ENV === "production",
});
