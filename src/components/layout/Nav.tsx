"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { MenuPage } from "@/lib/types";
import { pageHref } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { ROUTE_TRANSITION_START } from "./PageTransition";

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
  const pathname = usePathname();

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

  // Close as soon as a page transition begins. Doing this on the link's own
  // pointerdown would hide it before the click landed, making it unclickable.
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener(ROUTE_TRANSITION_START, close);
    return () => document.removeEventListener(ROUTE_TRANSITION_START, close);
  }, []);

  // Safety net: also close once the route has actually changed.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = "text-sm text-muted hover:text-petrol transition-colors";
  // Current page keeps the hover colour permanently.
  const activeClass = "text-petrol";

  // Compares against the pathname so the active item survives a page reload.
  const isCurrent = (href: string) => pathname === href;
  const resourcesActive = resourcePages.some((p) =>
    isCurrent(pageHref(lang, p))
  );

  if (mainPages.length === 0 && resourcePages.length === 0) return null;

  return (
    <nav aria-label="Huvudmeny">
      <ul className="flex items-center gap-6">
        {mainPages.map((p) => {
          const href = pageHref(lang, p);
          const current = isCurrent(href);
          return (
            <li key={p._id}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={cn(linkClass, current && activeClass)}
              >
                {p.title}
              </Link>
            </li>
          );
        })}

        {resourcePages.length > 0 ? (
          <li ref={wrapRef} className="relative">
            <button
              type="button"
              className={cn(
                linkClass,
                "inline-flex items-center gap-1",
                resourcesActive && activeClass
              )}
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
              {resourcePages.map((p) => {
                const href = pageHref(lang, p);
                const current = isCurrent(href);
                return (
                  <li key={p._id}>
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "block rounded px-3 py-2 text-sm hover:bg-soft",
                        current ? "bg-soft font-medium text-petrol" : "text-ink"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
