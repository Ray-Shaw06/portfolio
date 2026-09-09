import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects.ts";
import { EASE, MonoLabel } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export const metadata: Metadata = {
  title: "Work, Rehaan Shaw",
  description:
    "Six projects: paid Terminal-Bench task and grader authoring, an AI fitness copilot audited by deterministic code, a room-planning constraint solver, an ASSIST transfer planner, a pashmina exhibition, and ongoing client work.",
};

const WORDS = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
const word = (n: number) => WORDS[n] ?? String(n);

export default function WorkIndex() {
  const paid = projects.filter((p) => p.kind === "paid");
  const solo = projects.filter((p) => p.kind === "product");
  const client = projects.filter((p) => p.kind === "client");

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-44">
      <h1 className="font-geist text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">
        {word(projects.length)} things,
        <br />
        <span className="text-white/40">all of them running.</span>
      </h1>
      <p className="mt-7 max-w-[64ch] text-[16px] leading-relaxed text-white/60">
        {word(paid.length)} {paid.length === 1 ? "is" : "are"} paid work.{" "}
        {word(solo.length)} are products I designed, built and deployed on my own.{" "}
        {word(client.length)} {client.length === 1 ? "is" : "are"} client work. Nothing
        here is coursework, and nothing here is a tutorial I followed.
      </p>

      <Group label="Paid" items={paid} />
      <Group label="Built and shipped solo" items={solo} />
      <Group label="Client work" items={client} />
    </div>
  );
}

function Group({ label, items }: { label: string; items: typeof projects }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-16">
      <MonoLabel className="text-white/40">{label}</MonoLabel>
      <div className="mt-5 border-t border-white/[0.08]">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}/`}
            className="group grid gap-4 border-b border-white/[0.08] py-8 transition-colors duration-700 hover:bg-white/[0.02] md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-10 md:px-4"
            style={{ transitionTimingFunction: EASE }}
          >
            <div>
              <h2 className="font-geist text-2xl font-medium tracking-[-0.025em] text-white">
                {p.name}
              </h2>
              <div className="mt-2 font-mono text-[11px] text-white/45">{p.status}</div>
            </div>
            <div>
              <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-white/60">
                {p.cardBlurb}
              </p>
              <div className="mt-3 font-mono text-[11px] text-white/45">{p.stack.join(" · ")}</div>
            </div>
            <span
              className="inline-flex items-center gap-2 text-[13.5px] text-white/45 transition-colors duration-500 group-hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              Read the detail
              <IconArrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
