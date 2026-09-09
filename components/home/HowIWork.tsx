import { MonoLabel, SectionHeading } from "@/components/ui/primitives.tsx";

const STAGES = [
  {
    stage: "spec",
    artifact: "docs/superpowers/specs/",
    body: "Written and committed before the code. What it is for, what it will not do, and which decisions are already settled so they do not get relitigated.",
  },
  {
    stage: "plan",
    artifact: "docs/superpowers/plans/",
    body: "The spec broken into tasks with the tests named up front. Committed too, so the reasoning survives past the week I had it.",
  },
  {
    stage: "build",
    artifact: "Claude Code",
    body: "This is the only stage where the model does anything. It is one stage of five, and it is the one I trust least without the other four around it.",
  },
  {
    stage: "review",
    artifact: "docs/rubric-sources.md",
    body: "Claims get graded against evidence, including my own. The document that grades my thresholds is the one that caught me making an injury claim the research does not support.",
  },
  {
    stage: "evals in CI",
    artifact: "eval.mjs · 78 test files",
    body: "A benchmark that fails the build on regression, and a public red-team page so a stranger can try to get a bad plan past the evaluator.",
  },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title={
          <>
            I work fast with AI.
            <br />
            <span className="text-white/55">These are the gates</span>
            <br />
            I put around it.
          </>
        }
        lede="Speed on its own is not a claim worth making, because anyone can generate a lot of code now. What is worth showing is what has to be true before I believe any of it. Every stage below has a committed artifact behind it."
      />

      <ol className="animate-on-scroll mt-14 space-y-0">
        {STAGES.map((s, i) => (
          <li
            key={s.stage}
            className="grid gap-3 border-t border-white/[0.08] py-7 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-10"
          >
            <div>
              <div className="font-geist text-lg font-medium tracking-[-0.02em] text-white/85">
                {s.stage}
              </div>
              <MonoLabel plain className="mt-1.5 block text-white/50">
                {s.artifact}
              </MonoLabel>
            </div>
            <p className="max-w-[66ch] text-[14.5px] leading-relaxed text-white/65">{s.body}</p>
            <span className="sr-only">Stage {i + 1}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
