"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { IconArrow } from "@/components/ui/icons.tsx";

export interface StageProject {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageSize: [number, number];
  alt: string;
  status: string;
  proof: { label: string; value: string }[];
  liveHref?: string;
}

export default function ProjectStage({ items }: { items: StageProject[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = items[active];

  const move = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section className="project-stage" id="work" aria-labelledby="work-heading">
      <div className="stage-intro">
        <h2 id="work-heading">Work that holds up close.</h2>
        <p>Each project started with a real problem. Open one to see the system, the decision, and the tradeoff.</p>
      </div>

      <div className="stage-tabs" role="tablist" aria-label="Featured projects">
        {items.map((project, index) => (
          <button
            key={project.slug}
            ref={(node) => { refs.current[index] = node; }}
            className="stage-tab"
            id={'project-tab-' + project.slug}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls="project-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); move(index + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); move(index - 1); }
              if (event.key === "Home") { event.preventDefault(); move(0); }
              if (event.key === "End") { event.preventDefault(); move(items.length - 1); }
            }}
          >
            <span className="stage-tab-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.name}</span>
          </button>
        ))}
      </div>

      <div
        key={item.slug}
        className="stage-panel"
        data-project={item.slug}
        id="project-panel"
        role="tabpanel"
        aria-labelledby={'project-tab-' + item.slug}
      >
        <div className="stage-panel-copy">
          <p className="stage-status"><span className="stage-status-dot" aria-hidden="true" />{item.status}</p>
          <h3>{item.name}</h3>
          <p className="stage-description">{item.description}</p>
          <div className="stage-actions">
            <Link className="button-light" href={'/work/' + item.slug + '/'}>Explore the build <IconArrow className="icon-diagonal-up" /></Link>
            {item.liveHref ? <a className="text-link-light" href={item.liveHref} target="_blank" rel="noreferrer">Open live project <IconArrow className="icon-diagonal-up" /></a> : null}
          </div>
          <dl className="stage-proof">
            {item.proof.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="stage-art">
          <span className="stage-art-name" aria-hidden="true">{item.name}</span>
          <div className="stage-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} width={item.imageSize[0]} height={item.imageSize[1]} alt={item.alt} loading={active === 0 ? "eager" : "lazy"} decoding="async" />
          </div>
          <span className="stage-art-caption">A real screen from the product</span>
        </div>
      </div>
      <div className="stage-bottom">
        <span>All {items.length} projects have live demos and detailed case studies.</span>
        <Link href="/work/">Browse the full index <IconArrow className="icon-diagonal-up" /></Link>
      </div>
    </section>
  );
}
