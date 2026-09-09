import Link from "next/link";
import { projects } from "@/content/projects.ts";
import { EASE, SectionHeading } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export default function SelectedWork() {
  const cards = projects.filter((p) => p.showAsCard).slice(0, 3);
  return (
    <section id="work" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title={
          <>
            Five things I built,
            <br />
            <span className="text-white/55">shipped, and left running.</span>
          </>
        }
        lede="Every one of these is live right now and deployed by me. Nothing here is coursework and nothing here is a tutorial."
      />

      {/* A list, not a card grid. Each row is a different size of claim and
          reads as an edited page rather than five identical tiles. */}
      <div className="animate-on-scroll mt-14 border-t border-white/[0.08]">
        {cards.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}/`}
            className="group grid gap-4 border-b border-white/[0.08] py-8 transition-colors duration-700 hover:bg-white/[0.02] md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-10 md:px-4"
            style={{ transitionTimingFunction: EASE }}
          >
            <div>
              <h3 className="font-geist text-2xl font-medium tracking-[-0.025em] text-white">
                {p.name}
              </h3>
              <div className="mt-2 font-mono text-[11px] text-white/50">{p.status}</div>
            </div>

            <div>
              <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-white/65">{p.cardBlurb}</p>
              <div className="mt-3 font-mono text-[11px] text-white/50">{p.stack.join(" · ")}</div>
            </div>

            <span
              className="inline-flex items-center gap-2 text-[13.5px] text-white/55 transition-colors duration-500 group-hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              Read the detail
              <IconArrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/work/"
        className="group mt-8 inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors duration-500 hover:text-white"
        style={{ transitionTimingFunction: EASE }}
      >
        All six projects, in depth
        <IconArrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
