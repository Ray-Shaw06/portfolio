import Link from "next/link";
import type { ReactNode } from "react";

export const EASE = "cubic-bezier(0.15,0.83,0.66,1)";

/** Staggered entrance matching the v1 hero rhythm. */
export function fadeIn(delay: number, duration = 1) {
  return `[animation:animationIn_${duration}s_ease-out_${delay}s_both]`;
}

/** Mono is used only for data, measurement and machine output, never as decoration. */
export function MonoLabel({
  children,
  className = "",
  plain = false,
}: {
  children: ReactNode;
  className?: string;
  /** File paths and identifiers keep their real case. Only labels uppercase. */
  plain?: boolean;
}) {
  const shape = plain ? "text-[10.5px]" : "text-[10px] uppercase tracking-wider";
  return <span className={`font-mono ${shape} text-white/55 ${className}`}>{children}</span>;
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  /**
   * The highlight overlay needs a positioned ancestor, but hardcoding
   * `relative` here fights any position utility the caller passes: both land
   * in the class list and the stylesheet order decides, not the caller. So
   * only supply `relative` when the caller has not positioned the card.
   */
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className);
  const pos = positioned ? "" : "relative";
  return (
    <div className={`glass-card ${pos} overflow-hidden rounded-2xl ${className}`}>
      <span className="glass-highlight" aria-hidden="true" />
      {children}
    </div>
  );
}

/**
 * The v1 double-text hover: the label slides out downward while its twin
 * arrives from above. One authored moment, reused as the site's button voice.
 */
export function ActionButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group relative block overflow-hidden rounded-full px-6 py-3 text-sm transition-all duration-1000";
  const skin =
    variant === "primary"
      ? "bg-white font-medium text-black hover:bg-white/90"
      : "border border-white/10 bg-white/[0.03] text-white/80 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.07] hover:text-white";
  const isRoute =
    href.startsWith("/") && !href.includes(".") && !href.startsWith("//");
  const external = !isRoute;
  const inner = (
    <>
      <span
        className="block transition-transform duration-1000 group-hover:translate-y-[150%]"
        style={{ transitionTimingFunction: EASE }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 flex -translate-y-[150%] items-center justify-center transition-transform duration-1000 group-hover:translate-y-0"
        style={{ transitionTimingFunction: EASE }}
        aria-hidden="true"
      >
        {children}
      </span>
    </>
  );
  const style = { transitionTimingFunction: EASE };
  return external ? (
    <a href={href} className={`${base} ${skin} ${className}`} style={style} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={`${base} ${skin} ${className}`} style={style}>
      {inner}
    </Link>
  );
}

/**
 * Section heading. Deliberately no eyebrow or kicker above it: the heading
 * carries its own weight. The mono line below is data, not a label.
 */
export function SectionHeading({
  title,
  lede,
  id,
}: {
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="animate-on-scroll scroll-mt-28">
      <h2 className="font-geist text-4xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-white/60">{lede}</p>
      ) : null}
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-white/10 ${className}`} aria-hidden="true" />;
}

/** Numbers strip. Values must trace to the spec's facts table. */
export function StatRow({
  stats,
  className = "",
}: {
  stats: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-6 ${className}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-8">
          {i > 0 ? <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" /> : null}
          <div>
            <div className="font-geist text-2xl font-medium tracking-tight tabular-nums">{s.value}</div>
            <div className="mt-1 text-xs text-white/55">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
