"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile.ts";
import { EASE } from "@/components/ui/primitives.tsx";

const INTERVAL = 4200;

/**
 * Built on native scroll-snap rather than transform maths: swipe, trackpad,
 * and keyboard scrolling all work without being reimplemented, and the track
 * degrades to a plain scrollable row if the script never runs.
 */
export default function Carousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const delta = (first.offsetWidth + gap) * dir;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    // Wait for the main thread to go quiet before starting. Scheduling the
    // timer during hydration competes with first paint for no benefit: nobody
    // is looking at slide two in the first second.
    let id = 0;
    const start = () => {
      id = window.setInterval(() => step(1), INTERVAL);
    };
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    const handle = ric ? ric(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    return () => {
      if (id) window.clearInterval(id);
      const cic = (window as unknown as {
        cancelIdleCallback?: (h: number) => void;
      }).cancelIdleCallback;
      if (ric && cic) cic(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, [paused, reduced, step]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Photographs"
      className="relative mx-auto max-w-7xl px-6 pb-4 pt-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-live="off"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth rounded-2xl focus-visible:outline-2"
      >
        {profile.strip.map((ph, i) => (
          <li
            key={ph.src}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <picture>
              {/* Displayed around 380px wide, so the 520px variant covers 1x
                  and the 900px one covers retina. Loading all five eagerly
                  cost 1.6s of LCP; only the first slide is eager now. */}
              <source
                type="image/webp"
                srcSet={`${ph.src}@520.webp 520w, ${ph.src}.webp?v=3 760w`}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${ph.src}.jpg?v=3`}
                alt={ph.alt}
                style={{ objectPosition: ph.pos }}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                className="aspect-[4/3] w-full rounded-2xl border border-white/[0.08] object-cover grayscale-[0.12]"
              />
            </picture>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2">
        <Arrow dir={-1} onClick={() => step(-1)} label="Previous photograph" />
        <Arrow dir={1} onClick={() => step(1)} label="Next photograph" />
        <span className="ml-2 font-mono text-[10.5px] uppercase tracking-wider text-white/45">
          {reduced ? "manual" : paused ? "paused" : "auto"}
        </span>
      </div>
    </section>
  );
}

function Arrow({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
      style={{ transitionTimingFunction: EASE }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className={dir === -1 ? "rotate-180" : undefined}>
        <path d="M5 12h13" />
        <path d="M12.5 6.5 19 12l-6.5 5.5" />
      </svg>
    </button>
  );
}
