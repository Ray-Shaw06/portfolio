"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile.ts";
import { EASE } from "@/components/ui/primitives.tsx";

const nav = [
  { label: "Work", href: "/work/" },
  { label: "How I work", href: "/how-i-work/" },
  { label: "Writing", href: "/writing/" },
  { label: "About", href: "/about/" },
];

/**
 * Two mechanisms on purpose, and they do different jobs.
 *
 * The visual highlight comes from a server-rendered rule emitted by each
 * section layout (see ActiveSection), so the current item is already marked in
 * the HTML and never flashes unhighlighted while JavaScript loads.
 *
 * aria-current is set here, because CSS cannot express it and App Router gives
 * a root layout no server-side pathname. Hydration adds the semantics on top of
 * a picture that is already correct.
 */
export default function Header() {
  const pathname = usePathname() ?? "/";

  const isCurrent = (href: string) => {
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return path === href || path.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.06] bg-[#09090b]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="font-geist text-[15px] font-medium tracking-[-0.02em] text-white transition-colors duration-500 hover:text-white/70"
          style={{ transitionTimingFunction: EASE }}
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              data-nav={n.href}
              aria-current={isCurrent(n.href) ? "page" : undefined}
              className="relative rounded-full px-3 py-1.5 text-[13px] text-white/50 transition-colors duration-500 hover:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              {n.label}
              <span
                aria-hidden="true"
                className="nav-rule absolute inset-x-3 -bottom-[13px] h-px bg-white opacity-0"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="hidden text-[13px] text-white/50 transition-colors duration-500 hover:text-white sm:block"
            style={{ transitionTimingFunction: EASE }}
          >
            Email
          </a>
          <a
            href={profile.resume}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] text-white/80 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            style={{ transitionTimingFunction: EASE }}
          >
            Resume
          </a>
        </div>
      </div>

      {/* Mobile: the same destinations, since the desktop row is hidden. */}
      <nav
        className="no-scrollbar flex gap-1 overflow-x-auto border-t border-white/[0.06] px-4 py-2 md:hidden"
        aria-label="Sections"
      >
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            data-nav={n.href}
            aria-current={isCurrent(n.href) ? "page" : undefined}
            className="nav-pill shrink-0 rounded-full px-3 py-1.5 text-[12.5px] text-white/50 transition-colors duration-500"
            style={{ transitionTimingFunction: EASE }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
