import { SectionHeading } from "@/components/ui/primitives.tsx";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
        <div className="animate-on-scroll">
          <div className="font-geist text-7xl font-medium leading-none tracking-[-0.04em] text-white/90 tabular-nums">
            50
          </div>
          <p className="mt-4 max-w-[26ch] text-[14px] leading-relaxed text-white/55">
            Pounds lost in six months, which is the entire reason SpotterAI exists.
          </p>
        </div>

        <div>
          <SectionHeading title="Why I build what I build." />
          <div className="animate-on-scroll mt-8 max-w-[66ch] space-y-5 text-[15px] leading-[1.75] text-white/65">
            <p>
              When I was losing the weight I had to work out programming and nutrition on my own,
              and almost everything I found was either confident and wrong or behind a paywall.
              SpotterAI is the tool I wanted then, with the part I did not trust bolted down in code.
            </p>
            <p>
              That is the pattern for everything on this page. I build the thing I needed and could
              not find, then I keep going until a stranger can use it without me sitting next to
              them. The part I actually enjoy is the second half.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
