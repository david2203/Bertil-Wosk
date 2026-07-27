"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { MenuPage } from "@/lib/types";
import { pageHref } from "@/lib/routes";
import { cn } from "@/lib/cn";

// Every entry comes from Sanity: pages with "Visa i menyn" ticked.
// Pages placed under Resurser are grouped into the dropdown; everything
// else (including the start page) sits directly in the bar, ordered by
// each page's "Ordning i menyn".
export function Nav({
  lang,
  resourcesLabel,
  mainPages = [],
  resourcePages = [],
}: {
  lang: Locale;
  resourcesLabel: string;
  mainPages?: MenuPage[];
  resourcePages?: MenuPage[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);

  // Close on outside click + Escape.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkClass = "text-sm text-muted hover:text-petrol transition-colors";

  if (mainPages.length === 0 && resourcePages.length === 0) return null;

  return (
    <nav aria-label="Huvudmeny">
      <ul className="flex items-center gap-6">
        {mainPages.map((p) => (
          <li key={p._id}>
            <Link href={pageHref(lang, p)} className={linkClass}>
              {p.title}
            </Link>
          </li>
        ))}

        {resourcePages.length > 0 ? (
          <li ref={wrapRef} className="relative">
            <button
              type="button"
              className={cn(linkClass, "inline-flex items-center gap-1")}
              aria-expanded={open}
              aria-controls="resurser-menu"
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
            >
              {resourcesLabel}
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
            <ul
              id="resurser-menu"
              className={cn(
                "absolute right-0 top-full z-30 mt-3 w-56 rounded border border-line bg-surface p-2 shadow-lg",
                open ? "block" : "hidden"
              )}
            >
              {resourcePages.map((p) => (
                <li key={p._id}>
                  <Link
                    href={pageHref(lang, p)}
                    className="block rounded px-3 py-2 text-sm text-ink hover:bg-soft"
                    onClick={() => setOpen(false)}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
