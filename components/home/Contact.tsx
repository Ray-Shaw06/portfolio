import { profile } from "@/content/profile.ts";
import { ActionButton } from "@/components/ui/primitives.tsx";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="animate-on-scroll mx-auto max-w-3xl text-center">
        <h2 className="font-geist text-4xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">
          If any of this is worth
          <br />
          <span className="text-white/40">twenty minutes, I am easy to reach.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-[58ch] text-[15px] leading-relaxed text-white/50">
          {profile.looking} Happy to walk through the evaluator, a benchmark task, the ASSIST
          integration, or anything else on this page.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ActionButton href={`mailto:${profile.email}`}>{profile.email}</ActionButton>
          <ActionButton href={profile.linkedin} variant="ghost">
            LinkedIn
          </ActionButton>
          <ActionButton href={profile.github} variant="ghost">
            GitHub
          </ActionButton>
        </div>
        <p className="mt-8 font-mono text-[11.5px] text-white/35">{profile.screeningFacts}</p>
      </div>
    </section>
  );
}
