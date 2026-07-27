"use client";

// The actual Studio. Imported only in the browser (see Studio.tsx), so
// neither sanity.config nor the Sanity runtime is ever evaluated on the
// server — that's what produced "require is not defined" during SSR.
import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../../../sanity.config";

export default function StudioInner() {
  return <NextStudio config={config} />;
}
