"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

// Hidden while a single locale is configured; appears automatically
// once a second locale is added to src/i18n/config.ts.
export function LanguageToggle({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";

  if (locales.length < 2) return null;

  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 ? <span className="text-muted/40">|</span> : null}
          <Link
            href={`/${loc}${rest === "/" ? "" : rest}`}
            aria-current={loc === current ? "true" : undefined}
            className={cn(
              "uppercase",
              loc === current
                ? "font-medium text-petrol"
                : "text-muted hover:text-petrol"
            )}
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
