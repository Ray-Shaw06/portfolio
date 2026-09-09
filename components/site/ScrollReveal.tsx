"use client";

import { useEffect } from "react";

/**
 * Scroll entrance as progressive enhancement.
 *
 * Fail-safe by construction: a safety timer reveals everything after 2s
 * whatever the observer does, and anything already on screen at mount is
 * revealed immediately. Environments where IntersectionObserver never fires
 * (some embedded preview panes) therefore show the full page rather than a
 * blank one.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".animate-on-scroll"));
    if (nodes.length === 0) return;

    const reveal = (el: Element) => el.classList.add("is-visible");
    const revealAll = () => nodes.forEach(reveal);

    if (typeof IntersectionObserver !== "function") {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    nodes.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      else io.observe(el);
    });

    const safety = window.setTimeout(revealAll, 2000);
    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  return null;
}
