import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/content/projects.ts";
import { essayBySlug } from "@/content/essays.ts";
import { IconArrow } from "@/components/ui/icons.tsx";
import "../../project-pages.css";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return { title: `${project.name}, Rehaan Shaw`, description: project.oneLine };
}

function webp(src: string, width?: number) {
  const base = src.replace(/\.(png|jpe?g)$/i, "");
  return width ? `${base}@${width}.webp` : `${base}.webp`;
}

const fields = [
  { key: "constraint", label: "The constraint", prompt: "What had to be solved" },
  { key: "hardPart", label: "The technical center", prompt: "Where the difficulty lived" },
  { key: "decision", label: "The decision", prompt: "Why I built it this way" },
  { key: "cost", label: "The tradeoff", prompt: "What I gave up" },
] as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const number = String(index + 1).padStart(2, "0");
  const liveLink = project.links.find((link) => link.href && /live/i.test(link.label));

  return (
    <div className={`project-report project-report--${project.slug}`}>
      <article>
        <header className="project-report-header">
          <div className="project-report-topline">
            <Link href="/work/"><IconArrow className="project-arrow-up-left" /> All work</Link>
            <span>Field report / {number}—{String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="project-report-heading">
            <div>
              <h1>{project.name}<span aria-hidden="true">.</span></h1>
            </div>
            <p className="project-report-dek">{project.oneLine}</p>
          </div>
          <div className="project-report-header-bottom">
            <div><span>Status</span><strong>{project.status}</strong></div>
            <div><span>Primary stack</span><strong>{project.stack.slice(0, 3).join(" / ")}</strong></div>
            {liveLink?.href ? (
              <a href={liveLink.href} target="_blank" rel="noreferrer">
                Open the live project <IconArrow className="project-arrow-up-right" />
              </a>
            ) : null}
          </div>
        </header>

        {project.heroShot ? (
          <figure className="project-report-artifact">
            <div className="project-report-artifact-bar">
              <span>Real artifact</span>
              <span>{project.name} in use</span>
            </div>
            <picture>
              <source
                type="image/webp"
                srcSet={`${webp(project.heroShot, 900)} 900w, ${webp(project.heroShot)} ${project.heroShotSize?.[0] ?? 1800}w`}
                sizes="100vw"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.heroShot}
                alt={project.heroCaption ?? `${project.name} in use`}
                width={project.heroShotSize?.[0]}
                height={project.heroShotSize?.[1]}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            {project.heroCaption ? (
              <figcaption><span>In use</span>{project.heroCaption}</figcaption>
            ) : null}
          </figure>
        ) : null}

        {slug === "spotterai" ? (
          <section className="project-demo" aria-labelledby="project-demo-heading">
            <div className="project-demo-inner">
              <div className="project-demo-copy">
                <span className="project-demo-kicker">Product demo / 21 seconds</span>
                <h2 id="project-demo-heading">See the audit<br /><em>in action.</em></h2>
                <p>This SpotterAI demo shows the plan audit, safety flags, and the public Safety Lab. The evaluator uses 11 core checks, with extra checks for plans that include cardio or injury context.</p>
              </div>
              <video controls playsInline preload="none" poster="/media/spotterai-demo.jpg" aria-label="SpotterAI product demonstration">
                <source src="/media/spotterai-demo.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </section>
        ) : null}

        <section className="project-report-evidence" aria-labelledby="evidence-heading">
          <div className="project-report-evidence-intro">
            <h2 id="evidence-heading">Proof over<br /><em>promises.</em></h2>
            <p>Counts and outcomes from the work, with their source stated under each number.</p>
          </div>
          <dl className="project-report-facts">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
                <small>{fact.source}</small>
              </div>
            ))}
          </dl>
        </section>

        <div className="project-report-body">
          <div className="project-report-narrative">
            <div className="project-report-narrative-heading">
              <h2>Why it works<br /><em>the way it does.</em></h2>
            </div>
            {fields.map((field, fieldIndex) => (
              <section className="project-report-chapter" key={field.key}>
                <div className="project-report-chapter-meta">
                  <span>{String(fieldIndex + 1).padStart(2, "0")}</span>
                  <span>{field.prompt}</span>
                </div>
                <div>
                  <h3>{field.label}</h3>
                  <p>{project[field.key]}</p>
                </div>
              </section>
            ))}
          </div>

          <aside className="project-report-aside" aria-label="Project details">
            <div className="project-report-aside-block">
              <h2>Technology</h2>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="project-report-aside-block">
              <h2>Explore</h2>
              <ul className="project-report-links">
                {project.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}<IconArrow className="project-arrow-up-right" />
                      </a>
                    ) : <span>{link.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
            {project.essaySlugs?.length ? (
              <div className="project-report-aside-block">
                <h2>Further reading</h2>
                <ul className="project-report-links">
                  {project.essaySlugs.map((essaySlug) => {
                    const essay = essayBySlug(essaySlug);
                    if (!essay) return null;
                    return (
                      <li key={essaySlug}>
                        <Link href={`/writing/${essaySlug}/`}>{essay.title}<IconArrow className="project-arrow-up-right" /></Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <Link className="project-report-contact" href="/#contact">
              Talk through the build <IconArrow className="project-arrow-up-right" />
            </Link>
          </aside>
        </div>

        <nav className="project-report-next" aria-label="More work">
          <div>
            <span className="project-report-section-id">Next field report / {String(((index + 1) % projects.length) + 1).padStart(2, "0")}</span>
            <Link href={`/work/${next.slug}/`}>{next.name}<IconArrow className="project-arrow-up-right" /></Link>
          </div>
          <Link className="project-report-all" href="/work/">View the full index <IconArrow className="project-arrow-up-right" /></Link>
        </nav>
      </article>
    </div>
  );
}
