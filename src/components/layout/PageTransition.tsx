"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

// useLayoutEffect warns during SSR; run it only in the browser so the fade is
// set up before paint and the page never flashes at full opacity.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DURATION = 0.35;
const EASE = "power2.inOut";

/**
 * Fired the moment a transition begins. Because the click is intercepted in
 * the capture phase with `stopPropagation`, React `onClick` handlers on the
 * link never run — so UI that needs to react (the Resurser dropdown) listens
 * for this instead.
 */
export const ROUTE_TRANSITION_START = "route-transition-start";

/**
 * Cross-fade between routes.
 *
 * Internal link clicks are intercepted: the current page fades out, and only
 * then does navigation happen — so the exit and enter run at the same length
 * rather than the old page vanishing instantly.
 *
 * Nothing is hidden via CSS, so the site still renders without JavaScript.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);

  const prefersReduced = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Enter: fade the new route in.
  useIsomorphicLayoutEffect(() => {
    navigating.current = false;
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: DURATION, ease: EASE, clearProps: "opacity" }
      );
    }, el);

    return () => ctx.revert();
  }, [pathname, prefersReduced]);

  // Exit: fade out first, then navigate.
  useEffect(() => {
    if (prefersReduced()) return;

    function onClick(e: MouseEvent) {
      // Let the browser handle new tabs, downloads and modified clicks.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") || // in-page anchors are Lenis's job
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition !== undefined
      ) {
        return;
      }

      // Only same-origin navigations; mailto:, tel: and external links pass through.
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Same page — nothing to transition to.
      if (url.pathname === window.location.pathname && !url.search) return;

      // Studio manages its own rendering.
      if (url.pathname.startsWith("/studio")) return;

      // Take over completely: stopping propagation keeps next/link's own
      // handler from navigating instantly, so the fade can finish first.
      e.preventDefault();
      e.stopPropagation();

      if (navigating.current) return;
      navigating.current = true;

      document.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));

      const el = ref.current;
      const go = () => router.push(url.pathname + url.search);

      if (!el) {
        go();
        return;
      }

      gsap.to(el, {
        opacity: 0,
        duration: DURATION,
        ease: EASE,
        overwrite: "auto",
        onComplete: go,
      });
    }

    // Capture phase: React delegates events at the app root, which is *below*
    // document, so a bubble listener would run after next/link has already
    // navigated. Capturing lets us intercept first.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, prefersReduced]);

  // Flex column so the sticky-footer layout still works: this wrapper grows
  // to fill the viewport and <main> inside it absorbs the slack.
  return (
    <div ref={ref} data-page-transition className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
