import type { Metadata } from "next";
import Link from "next/link";
import { essays } from "@/content/essays.ts";
import { EASE } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export const metadata: Metadata = {
  title: "Writing, Rehaan Shaw",
  description:
    "Two pieces on making a nondeterministic system checkable, including the time my own evaluator missed a bug I caught in ten seconds.",
};

export default function WritingIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-28 pt-36 md:pt-44">
      <h1 className="font-geist text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">
        Writing
      </h1>
      <p className="mt-7 max-w-[62ch] text-[16px] leading-relaxed text-white/65">
        Two pieces, both about the same system. One is the argument for how it works. The other is
        the time it failed and I had to go and find out why.
      </p>

      <div className="mt-16 border-t border-white/[0.08]">
        {essays.map((e) => (
          <Link
            key={e.slug}
            href={`/writing/${e.slug}/`}
            className="group block border-b border-white/[0.08] py-10 transition-colors duration-700 hover:bg-white/[0.02] md:px-4"
            style={{ transitionTimingFunction: EASE }}
          >
            <div className="font-mono text-[11px] text-white/50">{e.date}</div>
            <h2 className="mt-3 font-geist text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
              {e.title}
            </h2>
            <blockquote className="mt-5 border-l border-white/20 pl-4 font-geist text-lg leading-snug tracking-[-0.02em] text-white/70">
              &ldquo;{e.pullQuote}&rdquo;
            </blockquote>
            <p className="mt-5 max-w-[64ch] text-[14.5px] leading-relaxed text-white/60">{e.argues}</p>
            <span
              className="mt-6 inline-flex items-center gap-2 text-[13.5px] text-white/55 transition-colors duration-500 group-hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              Read it
              <IconArrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
