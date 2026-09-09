import Link from "next/link";
import { projectBySlug } from "@/content/projects.ts";
import { ActionButton, MonoLabel, SectionHeading } from "@/components/ui/primitives.tsx";

const BENCH = [
  { label: "deterministic checks", value: "14" },
  { label: "red-team cases", value: "23" },
  { label: "risky plans caught", value: "18 / 18" },
  { label: "safe plans falsely flagged", value: "0" },
  { label: "LLM calls in the audit", value: "0" },
];

export default function SpotterHero() {
  const p = projectBySlug("spotterai")!;
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        title={
          <>
            A model writes the plan.
            <br />
            <span className="text-white/55">Code decides</span> whether
            <br />
            you get to see it.
          </>
        }
        lede={p.oneLine}
      />

      {/* The measured benchmark, not an illustration. Every number is in
          docs/grading-the-model.md. */}
      <div className="animate-on-scroll mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <MonoLabel>benchmark, evaluator v1.4.0</MonoLabel>
          <MonoLabel className="text-white/50">fails the build on regression</MonoLabel>
        </div>

        <dl className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {BENCH.map((b) => (
            <div key={b.label}>
              <dd className="font-geist text-3xl font-medium tracking-tight tabular-nums">{b.value}</dd>
              <dt className="mt-1.5 text-xs leading-snug text-white/55">{b.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="animate-on-scroll mt-10 flex flex-wrap items-center gap-3">
        <ActionButton href="https://spotterai.xyz">Open the live app</ActionButton>
        <ActionButton href="https://github.com/Ray-Shaw06/spotterai" variant="ghost">
          Read the source
        </ActionButton>
        <Link
          href="/work/spotterai/"
          className="ml-1 text-[14px] text-white/60 underline-offset-4 transition-colors duration-500 hover:text-white hover:underline"
        >
          Full write-up
        </Link>
      </div>
    </section>
  );
}
