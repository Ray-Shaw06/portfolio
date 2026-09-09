import { MonoLabel, SectionHeading } from "@/components/ui/primitives.tsx";

const GRADES = [
  { grade: "Supported", meaning: "A specific number in the literature maps onto the constant.", tone: "text-emerald-300/90" },
  { grade: "Directional", meaning: "The literature supports the direction, not the exact cut point.", tone: "text-sky-300/90" },
  { grade: "Practical", meaning: "No literature sets this. It is a recovery judgement, labelled as one.", tone: "text-amber-300/90" },
  { grade: "Contradicted", meaning: "The stated rationale is not supported and had to change.", tone: "text-rose-300/90" },
];

export default function HardPart() {
  return (
    <section id="hard-part" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div>
          <SectionHeading
            title={
              <>
                Making a model&rsquo;s output
                <br />
                <span className="text-white/55">something you can check.</span>
              </>
            }
          />

          <div className="animate-on-scroll mt-8 max-w-[66ch] space-y-5 text-[15px] leading-[1.75] text-white/65">
            <p>
              Gemini writes the training plan. A pure-code evaluator, with no second model call
              anywhere in the path, grades that plan against fourteen named checks whose thresholds
              all live in one readable constants block. The output is flags first and the plan
              second, worded as a concern rather than an approval, because the evaluator is allowed
              to raise doubt and is never allowed to certify.
            </p>
            <p>
              <span className="text-white/80">Why code and not a second model.</span> A model judging
              a model is nondeterministic, costs money on every plan, and cannot be unit tested. A
              rubric in code returns the same verdict every run, costs nothing, runs in under a
              millisecond offline in the browser, and has 78 test files pointed at it. It can go in
              CI. A vibe cannot go in CI.
            </p>
            <p>
              <span className="text-white/80">Then I graded my own evidence.</span> Every threshold
              is cited in a sources document that scores how well the research actually supports it.
              Three came back Practical, meaning no literature sets them and they are judgement
              calls wearing a number. One came back Contradicted: I had described the quad to
              hamstring check as a knee-health measure, and a systematic review found that ratio has
              limited value for predicting those injuries. The check stayed, because lopsided
              programming is still worth flagging. The injury claim went.
            </p>
          </div>
        </div>

        <div className="animate-on-scroll">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <MonoLabel>docs/rubric-sources.md</MonoLabel>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              How each threshold is graded. Three of them are weak or contradicted, and they are at
              the top of the document rather than buried in it.
            </p>
            <ul className="mt-6 space-y-4">
              {GRADES.map((g) => (
                <li key={g.grade} className="border-t border-white/[0.07] pt-4 first:border-0 first:pt-0">
                  <div className={`font-mono text-[11.5px] uppercase tracking-wider ${g.tone}`}>
                    {g.grade}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{g.meaning}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-white/50">
            A threshold you cannot cite is a threshold you picked.
          </p>
        </div>
      </div>
    </section>
  );
}
