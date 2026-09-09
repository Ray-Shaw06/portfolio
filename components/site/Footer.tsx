import { profile } from "@/content/profile.ts";
import { EASE } from "@/components/ui/primitives.tsx";

const links = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Resume", href: profile.resume },
];

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/[0.06] px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-geist text-[15px] font-medium tracking-[-0.02em]">{profile.name}</div>
          <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-white/40">
            {profile.screeningFacts}
          </p>
          <p className="mt-3 text-[13px] text-white/35">
            Built and deployed by me. This site&rsquo;s own source is public.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Contact">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] text-white/50 transition-colors duration-500 hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
