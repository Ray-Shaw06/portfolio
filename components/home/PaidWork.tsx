import Link from "next/link";
import RedGreen from "@/components/ui/RedGreen.tsx";
import { MonoLabel, SectionHeading, EASE } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

const DISCIPLINES = [
  {
    name: "The coherent contract",
    body: "Every numbered line in the instruction exists because a test checks it, and no test asserts anything the instruction never stated. Break that and the model fails for a reason it had no way to anticipate, which is not a hard task, it is an unfair one.",
  },
  {
    name: "The generalisation test",
    body: "Without one, an agent solves a parsing task by printing the expected answer. The test swaps the input out underneath and demands the right result on data the agent never saw.",
  },
];

export default function PaidWork() {
  return (
    <section id="paid-work" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title={
          <>
            I get paid to write
            <br />
            the exams that break
            <br />
            <span className="text-white/40">AI coding agents.</span>
          </>
        }
        lede={
          <>
            Handshake AI, contract, since November 2025. I author Terminal-Bench 2 tasks: a
            container with something genuinely broken in it, an instruction, a test suite, and a
            reference solution proving it can be done. I write the grader that marks them too.
          </>
        }
      />

      <div className="animate-on-scroll mt-14">
        <RedGreen />
        <p className="mt-4 font-mono text-[11px] text-white/30">
          Illustrative test names. Tasks I author are client work product and are not published here.
        </p>
      </div>

      <div className="animate-on-scroll mt-16 grid gap-10 md:grid-cols-2">
        {DISCIPLINES.map((d) => (
          <div key={d.name}>
            <h3 className="font-geist text-xl font-medium tracking-[-0.02em]">{d.name}</h3>
            <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-white/50">{d.body}</p>
          </div>
        ))}
      </div>

      <div className="animate-on-scroll mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/work/dynamo/"
          className="group inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors duration-500 hover:text-white"
          style={{ transitionTimingFunction: EASE }}
        >
          Read the detail
          <IconArrow className="text-base transition-transform duration-500 group-hover:translate-x-0.5" />
        </Link>
        <MonoLabel className="text-white/30">
          Dockerfile · instruction · tests · reference solution
        </MonoLabel>
      </div>
    </section>
  );
}
