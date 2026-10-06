import type { Metadata } from "next";
import { profile } from "@/content/profile.ts";
import Carousel from "@/components/home/Carousel.tsx";
import { ActionButton, MonoLabel, Rule } from "@/components/ui/primitives.tsx";

export const metadata: Metadata = {
  title: "About, Rehaan Shaw",
  description:
    "Grew up in Thailand, moved to the US at the end of 2024, started community college weeks later having never taken a class in the American system, and cleared 79 units in four terms.",
};

export default function About() {
  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="max-w-[18ch] font-geist text-[2.75rem] font-medium leading-[1.03] tracking-[-0.04em] sm:text-6xl">
          I learned a new system.
          <br />
          <span className="text-white/40">Then I started building
          <br />
          better ones.</span>
        </h1>
      </div>

      <div className="mt-14">
        <Carousel />
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="reading max-w-[64ch]">
            <p>
              I grew up in Thailand and moved to the United States at the end of 2024. A few weeks
              later I started at Pasadena City College, learning a new academic system while taking
              the courses I needed to transfer into computer science.
            </p>
            <p>
              Four terms later I had <strong>79 units and a 3.78 GPA</strong>, Dean&rsquo;s Honors
              twice, and a transfer to UC Irvine. The experience taught me how to work through a
              complicated system: trace the rules, test my understanding, and make the path visible.
            </p>

            <h2>Build from lived friction</h2>
            <p>
              While learning to train and manage my nutrition, I kept finding confident advice
              without a way to check it. That became SpotterAI: a fitness copilot whose generated
              plans are reviewed by deterministic checks before someone relies on them.
            </p>
            <p>
              Transfer Navigator came from the same instinct. I had sat with an articulation
              agreement trying to work out what I still needed, so I built a planner that turns an
              agreement into a route a student can inspect and update.
            </p>

            <h2>Make the reasoning inspectable</h2>
            <p>
              At Handshake AI, I author Terminal-Bench 2 tasks and graders. The work has to expose
              whether an agent actually solved the problem, not merely produced a plausible answer.
              That same standard shapes my own products: a decision should be testable, and a
              failure should tell me what to change.
            </p>
            <p>
              For Woven Hymns, the constraint was different. My family wanted to explain the craft
              behind Kashmiri shawls without a photography budget. I made the writing and the
              eight-stage journey the center of an exhibition preview, with attributed museum
              references and static hosting.
            </p>
            <p>
              I like small, clear systems that can survive contact with real users. That means
              writing down the constraint, making the mechanism visible, and showing the tradeoff
              alongside the result.
            </p>
            <p>
              I am looking for a Summer 2027 SWE or AI engineering internship where I can work
              alongside people who challenge my assumptions and help me build more reliable systems.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <MonoLabel>The path</MonoLabel>
            <ol className="mt-5 space-y-0">
              {profile.timeline.map((t) => (
                <li key={t.when} className="border-t border-white/[0.08] py-4 first:border-0 first:pt-0">
                  <MonoLabel className="text-white/70">{t.when}</MonoLabel>
                  <div className="mt-1.5 font-geist text-[17px] font-medium leading-snug tracking-[-0.015em] text-white/90">
                    {t.what}
                  </div>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/75">{t.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <MonoLabel>Fall 2026 at UCI</MonoLabel>
              <ul className="mt-3 space-y-1.5">
                {profile.fallCourses.map((c) => (
                  <li key={c} className="font-mono text-[13px] leading-relaxed text-white/75">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <Rule className="mt-20" />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ActionButton href={`mailto:${profile.email}`}>Email me</ActionButton>
          <ActionButton href="/work/" variant="ghost">
            See what I have built
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
