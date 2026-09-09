import type { Metadata } from "next";
import HowIWork from "@/components/home/HowIWork.tsx";
import HardPart from "@/components/home/HardPart.tsx";
import { ActionButton, Rule } from "@/components/ui/primitives.tsx";
import { profile } from "@/content/profile.ts";

export const metadata: Metadata = {
  title: "How I work, Rehaan Shaw",
  description:
    "Specs and plans committed before the code, claims graded against evidence including my own, and evals wired into CI. The gates that go around fast work.",
};

export default function HowIWorkPage() {
  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="max-w-[16ch] font-geist text-[2.75rem] font-medium leading-[1.03] tracking-[-0.04em] sm:text-6xl">
          Anyone can generate
          <br />
          <span className="text-white/40">a lot of code now.</span>
        </h1>
        <p className="mt-7 max-w-[62ch] text-[16.5px] leading-relaxed text-white/65">
          So speed on its own is not a claim worth making. What is worth showing is what has to be
          true before I believe any of it, and every gate below has a committed artifact behind it
          rather than a promise.
        </p>
      </div>

      <HowIWork />
      <div className="mx-auto max-w-7xl px-6">
        <Rule />
      </div>
      <HardPart />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton href="/writing/">Read the write-ups</ActionButton>
          <ActionButton href={`mailto:${profile.email}`} variant="ghost">
            Ask me about any of it
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
