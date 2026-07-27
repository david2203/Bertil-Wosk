"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hero kicker + heading with a staggered intro.
 *
 * The kicker rises from y:10, then the heading's characters slide in from
 * x:-5, staggered.
 *
 * The heading is split word-by-word (each word an inline-block) so wrapping
 * still happens at spaces, never mid-word. Screen readers get the whole
 * string via aria-label while the character spans are hidden from them.
 *
 * No opacity is set in CSS, so without JavaScript the text renders normally.
 */
export function HeroText({
  kicker,
  heading,
}: {
  kicker?: string;
  heading: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (el.querySelector(".hero-kicker")) {
        tl.fromTo(
          ".hero-kicker",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
      }

      tl.fromTo(
        ".hero-char",
        { opacity: 0, x: -5 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.028,
          clearProps: "all",
        },
        // Overlap slightly so the two feel like one movement.
        kicker ? "-=0.2" : 0
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Preserve any line breaks the editor typed.
  const lines = heading.split("\n");

  return (
    <div ref={root}>
      {kicker ? (
        <p className="hero-kicker text-xs font-medium uppercase tracking-[0.18em] text-gold-light">
          {kicker}
        </p>
      ) : null}

      <h1
        aria-label={heading}
        className="mt-4 text-4xl leading-tight text-white drop-shadow-sm md:text-5xl"
      >
        {lines.map((line, li) => (
          <Fragment key={li}>
            {li > 0 ? <br aria-hidden="true" /> : null}
            {line.split(" ").map((word, wi, words) => (
              <Fragment key={wi}>
                <span className="inline-block" aria-hidden="true">
                  {Array.from(word).map((char, ci) => (
                    <span key={ci} className="hero-char inline-block">
                      {char}
                    </span>
                  ))}
                </span>
                {/* Real space between words so lines still wrap naturally */}
                {wi < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </h1>
    </div>
  );
}
