"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import gsap from "gsap";
import type { FaqItem } from "@/lib/types";

const answerComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="whitespace-pre-line">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-3 list-disc pl-6">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-3 list-decimal pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a href={value?.href} className="text-petrol underline">
        {children}
      </a>
    ),
  },
};

/**
 * Accordion where only one question is open at a time.
 *
 * Uses native <details>/<summary> so it stays keyboard-operable and works
 * before hydration; the toggle is intercepted so GSAP can animate the height
 * (browsers can't transition to `height: auto`). Honours reduced-motion.
 */
export function FaqAccordion({
  items,
  openFirst = false,
}: {
  items: FaqItem[];
  openFirst?: boolean;
}) {
  const [openKey, setOpenKey] = useState<string | null>(
    openFirst && items[0] ? items[0]._key : null
  );
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const detailRefs = useRef<Map<string, HTMLDetailsElement>>(new Map());
  const firstRun = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Identical duration AND ease for both directions: the closing panel
    // gives back height on exactly the same curve the opening one takes it,
    // so the page height moves smoothly instead of jolting.
    const duration = reduce ? 0 : 0.42;
    const ease = "power2.inOut";

    if (firstRun.current) {
      items.forEach(({ _key }) => {
        const panel = panelRefs.current.get(_key);
        const details = detailRefs.current.get(_key);
        if (!panel || !details) return;
        const isOpen = openKey === _key;
        details.open = isOpen;
        gsap.set(panel, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
      });
      firstRun.current = false;
      return;
    }

    // `details.open` is the source of truth — React never touches it after
    // mount (see the constant `open` prop below), so a panel closed by
    // opening a different one still animates out.
    const opening: HTMLDivElement[] = [];
    const closing: { panel: HTMLDivElement; details: HTMLDetailsElement }[] = [];

    items.forEach(({ _key }) => {
      const panel = panelRefs.current.get(_key);
      const details = detailRefs.current.get(_key);
      if (!panel || !details) return;
      const shouldBeOpen = openKey === _key;
      if (shouldBeOpen && !details.open) {
        details.open = true; // must be open before it can be measured
        opening.push(panel);
      } else if (!shouldBeOpen && details.open) {
        closing.push({ panel, details });
      }
    });

    if (opening.length === 0 && closing.length === 0) return;

    // One timeline, every tween at position "0", so the closing panel gives
    // back height on exactly the same clock and curve the opening one takes
    // it. The page is never scrolled programmatically.
    const tl = gsap.timeline();
    closing.forEach(({ panel, details }) => {
      tl.to(
        panel,
        {
          height: 0,
          opacity: 0,
          duration,
          ease,
          overwrite: "auto",
          onComplete: () => {
            details.open = false;
          },
        },
        0
      );
    });

    opening.forEach((panel) => {
      tl.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration, ease, overwrite: "auto" },
        0
      );
    });

    return () => {
      tl.kill();
    };
  }, [openKey, items]);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openKey === item._key;
        return (
          <details
            key={item._key}
            ref={(el) => {
              if (el) detailRefs.current.set(item._key, el);
              else detailRefs.current.delete(item._key);
            }}
            // Deliberately NOT bound to `isOpen`: this value never changes
            // between renders, so React leaves the attribute alone after
            // mount and the effect above can animate it imperatively.
            // Binding it here would snap panels shut before GSAP could run.
            open={openFirst && i === 0}
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden"
              onClick={(e) => {
                // Take over the toggle so GSAP controls the transition.
                e.preventDefault();
                setOpenKey(isOpen ? null : item._key);
              }}
            >
              <span>{item.question}</span>
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                aria-hidden="true"
                className={`shrink-0 text-petrol transition-transform duration-300 ${
                  isOpen ? "-rotate-180" : ""
                }`}
              >
                <path
                  d="M1 1l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </summary>

            {/* Wrapper is the animated element; inner div holds the padding so
                height collapses cleanly to 0. */}
            <div
              ref={(el) => {
                if (el) panelRefs.current.set(item._key, el);
                else panelRefs.current.delete(item._key);
              }}
              className="overflow-hidden"
            >
              {item.answer?.length ? (
                <div className="max-w-2xl pb-6 pr-8 text-ink/90 [&>p+p]:mt-3">
                  <PortableText value={item.answer} components={answerComponents} />
                </div>
              ) : null}
            </div>
          </details>
        );
      })}
    </div>
  );
}
