import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { essays, essayBySlug } from "@/content/essays.ts";
import { renderMarkdown } from "@/lib/markdown.ts";
import { ActionButton, EASE, Rule } from "@/components/ui/primitives.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = essayBySlug(slug);
  if (!e) return {};
  return { title: `${e.title}, Rehaan Shaw`, description: e.argues };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = essayBySlug(slug);
  if (!e) notFound();

  const raw = readFileSync(`content/essays/${slug}.md`, "utf8");
  // The h1 and the date line are rendered from the essay record instead, so
  // they are not duplicated by the markdown body.
  const body = raw.replace(/^#\s.*\n+/, "").replace(/^\*[^*]+\*\n+/, "");
  const html = renderMarkdown(body).replace(
    /<table>/g,
    '<div class="table-wrap"><table>',
  ).replace(/<\/table>/g, "</table></div>");

  const other = essays.find((x) => x.slug !== slug);

  return (
    <article className="relative mx-auto max-w-3xl px-6 pb-28 pt-36 md:pt-44">
      <div className="reading-ground" aria-hidden="true" />

      <Link
        href="/writing/"
        className="group inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors duration-500 hover:text-white"
        style={{ transitionTimingFunction: EASE }}
      >
        <IconArrow className="rotate-180 text-base transition-transform duration-500 group-hover:-translate-x-0.5" />
        Writing
      </Link>

      <header className="mt-8">
        <h1 className="font-geist text-[2.5rem] font-medium leading-[1.06] tracking-[-0.04em] text-balance sm:text-[3.25rem]">
          {e.title}
        </h1>
        <div className="mt-5 font-mono text-[11.5px] text-white/55">{e.date}</div>
      </header>

      <div className="reading mt-14" dangerouslySetInnerHTML={{ __html: html }} />

      <Rule className="mt-20" />

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-6" aria-label="More writing">
        {other ? (
          <Link
            href={`/writing/${other.slug}/`}
            className="group inline-flex items-baseline gap-3"
            style={{ transitionTimingFunction: EASE }}
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">Next</span>
            <span className="font-geist text-lg font-medium tracking-[-0.02em] text-white/80 group-hover:text-white">
              {other.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        <ActionButton href="/work/spotterai/" variant="ghost">
          The project behind it
        </ActionButton>
      </nav>
    </article>
  );
}
