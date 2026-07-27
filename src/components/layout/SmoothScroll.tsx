"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling for the public site.
 *
 * Mounted inside the [lang] layout, so it never touches /studio — Sanity
 * Studio manages its own scroll containers and would break under it.
 *
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // Gentle ease-out; no bounce at the end of a scroll.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch devices to the browser — native momentum feels better
      // and avoids fighting the OS.
      touchMultiplier: 1.5,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // In-page anchors need to go through Lenis, otherwise they jump.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Jump to the top instantly on navigation — Lenis keeps the old scroll
  // position otherwise, so a new page can open half-way down.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
