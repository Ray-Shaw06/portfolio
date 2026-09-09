import Link from "next/link";
import { essays } from "@/content/essays.ts";
import { EASE, SectionHeading } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export default function Writing() {
  return (
    <section id="writing" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title={
          <>
            Two pieces about
            <br />
            <span className="text-white/55">being wrong in public.</span>
          </>
        }
        lede="Both are about the same system. One is the argument for how it works. The other is the time it failed and I had to go and find out why."
      />

      <div className="animate-on-scroll mt-14 grid gap-6 md:grid-cols-2">
        {essays.map((e) => (
          <Link
            key={e.slug}
            href={`/writing/${e.slug}/`}
            className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-700 hover:border-white/[0.16] hover:bg-white/[0.04]"
            style={{ transitionTimingFunction: EASE }}
          >
            <blockquote className="font-geist text-2xl font-medium leading-snug tracking-[-0.03em] text-white/90">
              &ldquo;{e.pullQuote}&rdquo;
            </blockquote>
            <h3 className="mt-6 text-[15px] font-medium text-white/85">{e.title}</h3>
            <p className="mt-3 max-w-[58ch] flex-1 text-[14px] leading-relaxed text-white/60">
              {e.argues}
            </p>
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
    </section>
  );
}
