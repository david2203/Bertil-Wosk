"use client";

import dynamic from "next/dynamic";

// Load the Studio in the browser only. `ssr: false` is permitted here because
// this module is a Client Component; it keeps the Sanity runtime (which is not
// server-safe) out of the SSR bundle entirely.
const StudioInner = dynamic(() => import("./StudioInner"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>Laddar studio…</div>
  ),
});

export default function Studio() {
  return <StudioInner />;
}
