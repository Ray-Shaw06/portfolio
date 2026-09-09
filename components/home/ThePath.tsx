import { profile } from "@/content/profile.ts";
import { MonoLabel, SectionHeading } from "@/components/ui/primitives.tsx";

export default function ThePath() {
  return (
    <section id="path" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title={
          <>
            Four terms, 79 units,
            <br />
            <span className="text-white/55">starting from scratch.</span>
          </>
        }
        lede="I moved to the US at the end of 2024 and started at Pasadena City College weeks later, having never taken a class in the American system."
      />

      <ol className="animate-on-scroll mt-14 grid gap-0 border-t border-white/[0.08] md:grid-cols-3">
        {profile.timeline.map((t) => (
          <li
            key={t.when}
            className="border-b border-white/[0.08] px-0 py-7 md:border-r md:px-6 md:last:border-r-0"
          >
            <MonoLabel className="text-white/50">{t.when}</MonoLabel>
            <div className="mt-2.5 font-geist text-[17px] font-medium leading-snug tracking-[-0.02em] text-white/90">
              {t.what}
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{t.detail}</p>
          </li>
        ))}
      </ol>

      <div className="animate-on-scroll mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <MonoLabel className="text-white/50">Fall 2026 at UCI</MonoLabel>
        <span className="font-mono text-[11.5px] text-white/55">
          {profile.fallCourses.join(" · ")}
        </span>
      </div>
    </section>
  );
}
