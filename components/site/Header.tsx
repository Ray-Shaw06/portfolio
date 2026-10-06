"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile.ts";
import { IconArrow } from "@/components/ui/icons.tsx";

const nav = [
  { label: "Work", href: "/work/" },
  { label: "Process", href: "/how-i-work/" },
  { label: "Writing", href: "/writing/" },
  { label: "About", href: "/about/" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
  const current = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/" aria-label="Rehaan Shaw, home">
          <span className="site-brand-mark" aria-hidden="true">RS</span>
          <span className="site-brand-name">Rehaan Shaw</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} className="site-nav-link" href={item.href} aria-current={current(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="site-resume" href={profile.resume} target="_blank" rel="noreferrer">
          Resume <IconArrow className="icon-diagonal-up" />
        </a>
      </div>
      <nav className="site-mobile-nav" aria-label="Mobile navigation">
        {nav.map((item) => (
          <Link key={item.href} className="site-nav-link" href={item.href} aria-current={current(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
