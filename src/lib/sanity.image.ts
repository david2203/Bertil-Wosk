import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

// Derive the source type from the builder itself so it stays correct
// across @sanity/image-url versions (no deep type-path import).
export type ImageSource = Parameters<typeof builder.image>[0];

export function urlForImage(source: ImageSource) {
  return builder.image(source);
}

/**
 * Reads intrinsic dimensions out of a Sanity asset ref, which is formatted
 * `image-<id>-<width>x<height>-<ext>`. Lets us render images at the right
 * aspect ratio without an extra query.
 */
export function imageDimensions(
  source: unknown
): { width: number; height: number } | null {
  const ref = (source as { asset?: { _ref?: string } })?.asset?._ref;
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-[a-z]+$/i);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
