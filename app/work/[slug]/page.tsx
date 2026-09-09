import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/content/projects.ts";
import { essayBySlug } from "@/content/essays.ts";
import RedGreen from "@/components/ui/RedGreen.tsx";
import { ActionButton, EASE, MonoLabel, Rule } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return { title: `${p.name}, Rehaan Shaw`, description: p.oneLine };
}

const FIELDS = [
  { key: "constraint", label: "The constraint" },
  { key: "hardPart", label: "The hard part" },
  { key: "decision", label: "What I decided and why" },
  { key: "cost", label: "What it cost me" },
] as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-6 pb-28 pt-36 md:pt-44">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors duration-500 hover:text-white"
        style={{ transitionTimingFunction: EASE }}
      >
        <IconArrow className="rotate-180 text-base transition-transform duration-500 group-hover:-translate-x-0.5" />
        All work
      </Link>

      <header className="mt-8">
        <h1 className="font-geist text-[2.75rem] font-medium leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          {p.name}
        </h1>
        <div className="mt-4 font-mono text-[11.5px] text-white/40">{p.status}</div>
        <p className="mt-7 max-w-[62ch] text-[16.5px] leading-[1.7] text-white/70">{p.oneLine}</p>
      </header>

      {/* Field 3: the hero artifact. Every project gets one piece of real
          evidence rather than a decorative screenshot. */}
      <div className="mt-14">
        {p.slug === "dynamo" ? (
          <RedGreen />
        ) : p.slug === "gma-creative" ? (
          <BilledLog />
        ) : p.heroShot ? (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.heroShot}
              alt={p.heroCaption ?? `${p.name} in use`}
              className="w-full rounded-2xl border border-white/[0.08]"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}
        {p.heroCaption ? (
          <figcaption className="mt-4 font-mono text-[11px] leading-relaxed text-white/30">
            {p.heroCaption}
          </figcaption>
        ) : null}
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div className="space-y-12">
          {FIELDS.map((f) => (
            <section key={f.key}>
              <h2 className="font-geist text-[13px] font-medium uppercase tracking-[0.14em] text-white/35">
                {f.label}
              </h2>
              <p className="mt-4 max-w-[66ch] text-[15.5px] leading-[1.75] text-white/60">
                {p[f.key]}
              </p>
            </section>
          ))}
        </div>

        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div>
            <MonoLabel>Stack</MonoLabel>
            <ul className="mt-3 space-y-1.5">
              {p.stack.map((s) => (
                <li key={s} className="font-mono text-[12px] text-white/55">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MonoLabel>Numbers</MonoLabel>
            <dl className="mt-3 space-y-3">
              {p.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[12.5px] leading-snug text-white/45">{f.label}</dt>
                  <dd className="font-geist text-[15px] font-medium tabular-nums text-white/85">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <MonoLabel>Links</MonoLabel>
            <div className="mt-3 space-y-2.5">
              {p.links.map((l) =>
                l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-[13.5px] text-white/70 transition-colors duration-500 hover:text-white"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    {l.label}
                    <IconArrow className="text-sm transition-transform duration-500 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <p key={l.label} className="text-[12.5px] leading-relaxed text-white/40">
                    {l.note}
                  </p>
                ),
              )}
            </div>
          </div>

          {p.essaySlugs?.length ? (
            <div>
              <MonoLabel>Written up</MonoLabel>
              <div className="mt-3 space-y-2.5">
                {p.essaySlugs.map((s) => {
                  const e = essayBySlug(s);
                  if (!e) return null;
                  return (
                    <Link
                      key={s}
                      href={`/writing/${s}/`}
                      className="block text-[13.5px] leading-snug text-white/70 underline-offset-4 transition-colors duration-500 hover:text-white hover:underline"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {e.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      <Rule className="mt-20" />

      <nav className="mt-8 flex items-center justify-between gap-6" aria-label="More work">
        <Link
          href={`/work/${next.slug}/`}
          className="group inline-flex items-baseline gap-3 transition-colors duration-500"
          style={{ transitionTimingFunction: EASE }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">Next</span>
          <span className="font-geist text-xl font-medium tracking-[-0.02em] text-white/70 group-hover:text-white">
            {next.name}
          </span>
        </Link>
        <ActionButton href="/#contact" variant="ghost">
          Get in touch
        </ActionButton>
      </nav>
    </article>
  );
}

/** GMA Creative has no public link, so the billed log is the evidence. */
function BilledLog() {
  const rows = [
    { task: "landing copy pass", hours: "1.5h" },
    { task: "gallery rebuild", hours: "3.0h" },
    { task: "mobile nav fix", hours: "0.75h" },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <MonoLabel>week log</MonoLabel>
        <MonoLabel className="text-white/30">billed</MonoLabel>
      </div>
      <ul className="mt-5 space-y-0">
        {rows.map((r) => (
          <li
            key={r.task}
            className="flex items-baseline justify-between border-t border-white/[0.07] py-3 first:border-0"
          >
            <span className="text-[14px] text-white/60">{r.task}</span>
            <span className="font-mono text-[12.5px] tabular-nums text-white/75">{r.hours}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12.5px] leading-relaxed text-white/35">
        Representative week. I track my own hours and send the log unprompted.
      </p>
    </div>
  );
}
