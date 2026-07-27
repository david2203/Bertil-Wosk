import type { Metadata, Viewport } from "next";
import Studio from "./Studio";

export const dynamic = "force-static";

// Declared inline (rather than re-exported from "next-sanity/studio") so that
// module — and the Sanity runtime it pulls in — never enters the server bundle.
// Values mirror next-sanity's own defaults.
export const metadata: Metadata = {
  referrer: "same-origin",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <Studio />;
}
