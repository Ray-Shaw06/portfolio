import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects.ts";
import { IconArrow } from "@/components/ui/icons.tsx";
import "../project-pages.css";

export const metadata: Metadata = {
  title: "Work, Rehaan Shaw",
  description:
    "Selected product and client work by Rehaan Shaw, with the systems, decisions, and tradeoffs behind each build.",
};

const proofIndices: Record<string, number[]> = {
  spotterai: [0, 2, 4],
  hearth: [3, 2],
  "transfer-navigator": [2, 3],
  "woven-hymns": [3, 4],
};

function webp(src: string, width?: number) {
  const base = src.replace(/\.(png|jpe?g)$/i, "");
  return width ? `${base}@${width}.webp` : `${base}.webp`;
}

function kindLabel(kind: (typeof projects)[number]["kind"]) {
  if (kind === "client") return "Client work";
  if (kind === "paid") return "Paid work";
  return "Independent product";
}

export default function WorkIndex() {
  return (
    <div className="work-index">
      <header className="work-index-intro">
        <div className="work-index-topline">
          <span>Selected work / Rehaan Shaw</span>
          <span>Software + AI engineering</span>
        </div>
        <div className="work-index-intro-grid">
          <h1>
            Built to<br />
            <em>be examined.</em>
          </h1>
          <div className="work-index-intro-aside">
            <span className="work-index-count">0{projects.length}</span>
            <p>
              Real problems, shipped projects, and the reasoning behind them. Each one opens
              into the constraint, the technical center, the decision, and its cost.
            </p>
            <a href="#projects">Explore the work <IconArrow className="project-arrow-down" /></a>
          </div>
        </div>
        <div className="work-index-bottomline">
          <span>Field notes from the build</span>
          <span>Scroll to inspect</span>
        </div>
      </header>

      <div className="work-index-ledger" id="projects">
        <div className="work-index-ledger-head">
          <span>Index / 01—0{projects.length}</span>
          <span>Open a project for the full record</span>
        </div>
        {projects.map((project, index) => {
          const proof = (proofIndices[project.slug] ?? [0, 1])
            .map((i) => project.facts[i])
            .filter(Boolean);

          return (
            <section className={`work-entry work-entry--${project.slug}`} key={project.slug}>
              <div className="work-entry-topline">
                <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <span>{kindLabel(project.kind)}</span>
                <span>{project.status}</span>
              </div>
              <div className="work-entry-grid">
                <div className="work-entry-copy">
                  <h2><Link href={`/work/${project.slug}/`}>{project.name}<IconArrow className="project-arrow-up-right" /></Link></h2>
                  <p className="work-entry-description">{project.cardBlurb}</p>
                  <dl className="work-entry-proof">
                    {proof.map((fact) => (
                      <div key={fact.label}>
                        <dd>{fact.value}</dd>
                        <dt>{fact.label}</dt>
                      </div>
                    ))}
                  </dl>
                  <p className="work-entry-stack">{project.stack.join(" / ")}</p>
                  <Link className="work-entry-link" href={`/work/${project.slug}/`}>
                    Read the field report <IconArrow className="project-arrow-up-right" />
                  </Link>
                </div>
                {project.heroShot ? (
                  <Link className="work-entry-art" href={`/work/${project.slug}/`} aria-label={`Read about ${project.name}`}>
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${webp(project.heroShot, 900)} 900w, ${webp(project.heroShot)} ${project.heroShotSize?.[0] ?? 1800}w`}
                        sizes="(max-width: 860px) 100vw, 50vw"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.heroShot}
                        alt={project.heroCaption ?? `${project.name} in use`}
                        width={project.heroShotSize?.[0]}
                        height={project.heroShotSize?.[1]}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </picture>
                    <span className="work-entry-art-label" aria-hidden="true">Actual product artifact <IconArrow className="project-arrow-up-right" /></span>
                  </Link>
                ) : null}
              </div>
            </section>
          );
        })}
        <div className="work-index-close">
          <p>The build is only half the story.</p>
          <Link href="/how-i-work/">See how I work <IconArrow className="project-arrow-up-right" /></Link>
        </div>
      </div>
    </div>
  );
}
