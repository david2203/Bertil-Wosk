export type SocialLink = { platform?: string; url?: string };

function Icon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p.includes("facebook")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
      </svg>
    );
  }
  if (p.includes("instagram")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (p.includes("linkedin")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    );
  }
  if (p.includes("youtube")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3.4-.43-5.02a2.6 2.6 0 0 0-1.83-1.84C19.12 4.7 12 4.7 12 4.7s-7.12 0-8.74.44c-.88.24-1.58.94-1.83 1.84C1 8.6 1 12 1 12s0 3.4.43 5.02c.25.9.95 1.6 1.83 1.84 1.62.44 8.74.44 8.74.44s7.12 0 8.74-.44a2.6 2.6 0 0 0 1.83-1.84C23 15.4 23 12 23 12zM9.75 15.02V8.98L15.5 12z" />
      </svg>
    );
  }
  // Generic link
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19" />
    </svg>
  );
}

function label(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("facebook")) return "Facebook";
  if (p.includes("instagram")) return "Instagram";
  if (p.includes("linkedin")) return "LinkedIn";
  if (p.includes("youtube")) return "YouTube";
  return platform;
}

// Renders only what's configured in Sanity — no hard-coded fallbacks.
export function SocialLinks({ links }: { links?: SocialLink[] }) {
  const items = (links ?? []).filter((l) => l.url);
  if (items.length === 0) return null;

  return (
    <ul className="flex items-center gap-3">
      {items.map((l) => (
        <li key={l.url}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label(l.platform ?? "Länk")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
          >
            <Icon platform={l.platform ?? ""} />
          </a>
        </li>
      ))}
    </ul>
  );
}
