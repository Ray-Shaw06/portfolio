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
          I got here late and
          <br />
          <span className="text-white/40">I have been making up
          <br />
          for it ever since.</span>
        </h1>
      </div>

      <div className="mt-14">
        <Carousel />
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="reading max-w-[64ch]">
            <p>
              I grew up in Thailand. At the end of 2024 I moved to the United States, and a few
              weeks later I walked into a community college classroom having never taken a class in
              the American system. I did not know how registration worked. I did not know what a
              unit was. I picked the hardest schedule anyone would let me have, because I had
              already lost enough time and I was not going to lose more.
            </p>
            <p>
              Four terms later I had <strong>79 units and a 3.78</strong>, Dean&rsquo;s Honors twice,
              and a transfer to UC Irvine. I am not telling you that because it is impressive on
              paper. I am telling you because it is the same thing I do with everything: find the
              thing I do not understand yet, refuse to be beaten by it, and go until it is mine.
            </p>

            <h2>The 50 pounds</h2>
            <p>
              Somewhere in there I lost fifty pounds in six months. Nobody helped me. I read
              everything I could find and most of it was confident and wrong, or it was correct and
              locked behind ninety dollars a month. I worked out the programming and the nutrition
              myself, badly at first, then less badly, and it changed how I think about almost
              everything.
            </p>
            <p>
              That is where SpotterAI came from. Not from a hackathon prompt or a list of project
              ideas. From standing in a gym on my own with no idea whether what I was doing
              was going to hurt me, and deciding that nobody else should have to guess.
            </p>

            <h2>Why I build the way I build</h2>
            <p>
              Every single thing on this site started the same way: I needed it, I could not find
              it, and nobody was coming to make it for me. Transfer Navigator exists because I sat
              there trying to read an ASSIST agreement at midnight and could not work out whether I
              would make it out in time. Woven Hymns exists because my family sells shawls and
              could not afford a photographer.
            </p>
            <p>
              And I care, genuinely, about the part most people skip. Anyone can get a demo working.
              The interesting problem is what happens when a stranger uses it and you are not there,
              and it is three in the morning, and the model has confidently told them to do
              something stupid. That is why my evaluator is written in plain code instead of asking
              a second model to be careful. It is why I published the document that proves one of my
              own thresholds was wrong. I would rather be corrected in public than be trusted for
              something I had not actually earned.
            </p>
            <p>
              I ship alone right now because that is what I have. What I actually want is to be the
              least experienced person in a room full of engineers who are better than me, and to
              close that gap faster than anyone expects me to.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <MonoLabel>The path</MonoLabel>
            <ol className="mt-5 space-y-0">
              {profile.timeline.map((t) => (
                <li key={t.when} className="border-t border-white/[0.08] py-4 first:border-0 first:pt-0">
                  <MonoLabel className="text-white/40">{t.when}</MonoLabel>
                  <div className="mt-1.5 font-geist text-[15px] font-medium leading-snug tracking-[-0.015em] text-white/90">
                    {t.what}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/50">{t.detail}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <MonoLabel>Fall 2026 at UCI</MonoLabel>
              <ul className="mt-3 space-y-1.5">
                {profile.fallCourses.map((c) => (
                  <li key={c} className="font-mono text-[11.5px] leading-relaxed text-white/55">
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
