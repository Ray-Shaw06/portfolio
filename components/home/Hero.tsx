import { profile } from "@/content/profile.ts";
import { ActionButton, GlassCard, MonoLabel, StatRow, fadeIn } from "@/components/ui/primitives.tsx";
import { IconWarning, IconCheck } from "@/components/ui/icons.tsx";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-32 md:pt-36">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="relative z-20">
          <h1
            className="font-geist text-[3.25rem] font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.25rem]"
          >
            I build software
            <br />
            that has to be
            <br />
            <span className="text-white/55">trusted,</span>
            <br />
            not just demoed.
          </h1>

          <p className={`mt-7 max-w-[46ch] text-[15px] leading-relaxed text-white/65 ${fadeIn(0.3)}`}>
            Junior CS at UC Irvine. I get paid to write the benchmark tasks and graders that
            break AI coding agents. On my own time I ship products where the model&rsquo;s output
            is audited by plain code before anyone is allowed to see it.
          </p>

          <p className={`mt-6 max-w-[52ch] text-pretty font-mono text-[12.5px] leading-relaxed text-white/55 ${fadeIn(0.38)}`}>
            {profile.screeningFacts}
          </p>

          <div className={`mt-10 flex flex-wrap items-center gap-3 ${fadeIn(0.45)}`}>
            <ActionButton href="/work/">See the work</ActionButton>
            <ActionButton href={profile.resume} variant="ghost">
              Resume
            </ActionButton>
          </div>

          <StatRow
            className={`mt-14 ${fadeIn(0.6)}`}
            stats={profile.heroStats.map((s) => ({ label: s.label, value: s.value }))}
          />
        </div>

        {/* The proof cluster. Two claims, one paid and one solo, both about
            checking a model rather than calling one. */}
        <div className="hero-cluster relative h-[500px] sm:h-[560px]" aria-label="At a glance">
          <GlassCard className={`absolute left-0 top-0 z-50 w-56 rotate-[-4deg] p-4 sm:w-64 ${fadeIn(0.2, 1.1)}`}>
            <div className="mb-3 flex items-center justify-between">
              <MonoLabel>evaluator</MonoLabel>
              <span className="rounded-full bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                2 flags
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { t: "weekly_volume_jump", ok: false },
                { t: "no_rest_day", ok: false },
                { t: "progression_ok", ok: true },
              ].map((r) => (
                <div key={r.t} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-1.5">
                  {r.ok ? (
                    <IconCheck className="text-[13px] text-emerald-300" />
                  ) : (
                    <IconWarning className="text-[13px] text-amber-300" />
                  )}
                  <span className="font-mono text-[10.5px] text-white/80">{r.t}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/50">
              Flags first, then the plan. The auditor never certifies.
            </p>
          </GlassCard>

          <GlassCard className={`absolute right-0 top-[12rem] z-40 w-60 rotate-[3deg] p-4 sm:w-72 ${fadeIn(0.32, 1.1)}`}>
            <MonoLabel>terminal-bench task</MonoLabel>
            <div className="mt-3 space-y-1.5 font-mono text-[10.5px]">
              <div className="flex items-center gap-2 rounded-lg bg-rose-400/[0.07] px-2.5 py-1.5">
                <IconWarning className="text-[13px] text-rose-300" />
                <span className="text-rose-200/90">before: 0 / 4 passing</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-emerald-400/[0.07] px-2.5 py-1.5">
                <IconCheck className="text-[13px] text-emerald-300" />
                <span className="text-emerald-200/90">after: 4 / 4 passing</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/50">
              Red then green is the proof a task is neither already solved nor impossible.
            </p>
          </GlassCard>

          <GlassCard className={`absolute bottom-0 left-8 z-30 w-52 rotate-[-2deg] p-4 sm:w-60 ${fadeIn(0.44, 1.1)}`}>
            <MonoLabel>audit path</MonoLabel>
            <div className="mt-3 space-y-2">
              {["model generates plan", "pure-code evaluator", "flags first, then plan"].map((s, i) => (
                <div key={s} className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-white/50 tabular-nums">{i + 1}</span>
                  <span className="text-[11.5px] text-white/70">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-white/[0.07] pt-2.5">
              <span className="font-mono text-[10.5px] text-white/55">0 LLM calls in the audit</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
