import Link from "next/link";
import { profile } from "@/content/profile.ts";
import { projects } from "@/content/projects.ts";
import { essays } from "@/content/essays.ts";
import ProjectStage, { type StageProject } from "@/components/home/ProjectStage.tsx";
import { IconArrow } from "@/components/ui/icons.tsx";
import "./home.css";

const stageCopy: Record<string, { description: string; proof: number[] }> = {
  spotterai: {
    description: "An AI fitness copilot with a deterministic audit that flags risky training plans before someone trusts them.",
    proof: [0, 1, 4],
  },
  hearth: {
    description: "A constraint solver turns room dimensions into three explainable layouts, not just a drawing surface.",
    proof: [3, 2],
  },
  "transfer-navigator": {
    description: "A route planner that turns transfer agreements into decisions a student can use, term by term.",
    proof: [2, 3],
  },
  "woven-hymns": {
    description: "A sourced digital exhibition that gives Kashmiri pashmina the context a product grid cannot.",
    proof: [3, 4],
  },
};

const stageItems: StageProject[] = projects.map((project) => ({
  slug: project.slug,
  name: project.name,
  description: stageCopy[project.slug]?.description ?? project.oneLine,
  image: project.heroShot ?? "",
  imageSize: project.heroShotSize ?? [1800, 1125],
  alt: project.heroCaption ?? project.name + " screenshot",
  status: project.status,
  proof: (stageCopy[project.slug]?.proof ?? [0, 1]).map((index) => ({
    label: project.facts[index].label,
    value: project.facts[index].value,
  })),
  liveHref: project.links.find((link) => link.href && /live/i.test(link.label))?.href,
}));

export default function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="hero-name">
        <div className="hero-topline">
          <span>Software engineering / AI engineering</span>
          <span>UC Irvine CS ’28</span>
        </div>
        <div className="hero-main">
          <h1 id="hero-name">Rehaan<br />Shaw<span className="hero-dot">.</span></h1>
          <div className="hero-aside">
            <p className="hero-thesis">I build software that has to be <em>trusted</em>, not just demoed.</p>
            <p className="hero-description">I make AI output inspectable and build products around problems I know firsthand. Seeking Summer 2027 SWE and AI engineering internships.</p>
            <div className="hero-actions">
              <Link className="button-dark" href="/#work">See the work <IconArrow className="icon-diagonal-down" /></Link>
              <a className="text-link-dark" href={profile.resume} target="_blank" rel="noreferrer">Resume <IconArrow className="icon-diagonal-up" /></a>
            </div>
          </div>
        </div>
        <div className="hero-bottomline">
          <span>UCI CS / BUILDING, TESTING, EXPLAINING</span>
          <span>Scroll to inspect the work</span>
        </div>
      </section>

      <ProjectStage items={stageItems} />

      <section className="paid-work" aria-labelledby="paid-work-heading">
        <div className="paid-work-grid">
          <div className="paid-work-title">
            <h2 id="paid-work-heading">I write the tests that make AI agents prove themselves.</h2>
            <p>At Handshake AI, I author Terminal-Bench 2 tasks and graders. The work is paid, technical, and built to expose what an agent can actually do.</p>
            <Link href="/how-i-work/" className="text-link-dark">How I work <IconArrow className="icon-diagonal-up" /></Link>
          </div>
          <ol className="paid-work-sequence" aria-label="Benchmark task components">
            <li><span>01</span><strong>Environment</strong><p>A reproducible container with a real failure to solve.</p></li>
            <li><span>02</span><strong>Instructions</strong><p>A precise task that does not give away the answer.</p></li>
            <li><span>03</span><strong>Grader</strong><p>Tests that separate a working repair from a plausible one.</p></li>
            <li><span>04</span><strong>Reference solution</strong><p>A passing implementation that proves the task is solvable.</p></li>
          </ol>
        </div>
      </section>

      <section className="origin-section" aria-labelledby="origin-heading">
        <div className="origin-intro">
          <h2 id="origin-heading">I build from friction I have lived.</h2>
          <p>The subjects change. The method stays the same: find the hidden rule, make it visible, then make the result useful to someone else.</p>
        </div>
        <div className="origin-list">
          <div><span>Training</span><p>After changing my own training, I built SpotterAI around the question I could never afford to get wrong: is this plan safe enough to follow?</p></div>
          <div><span>Education</span><p>After transferring from Pasadena City College to UCI, I built a tool to make course requirements and timing easier to reason about.</p></div>
          <div><span>Culture</span><p>Woven Hymns gives Kashmiri pashmina room for history, terminology, and carefully attributed visual references.</p></div>
        </div>
        <Link className="origin-about" href="/about/">Read the story behind the work <IconArrow className="icon-diagonal-up" /></Link>
      </section>

      <section className="writing-section" aria-labelledby="writing-heading">
        <div className="writing-head">
          <h2 id="writing-heading">The failures are part of the record.</h2>
          <p>I write about the decisions and bugs that changed how I build.</p>
        </div>
        <div className="writing-list">
          {essays.map((essay) => (
            <Link key={essay.slug} href={'/writing/' + essay.slug + '/'} className="writing-row">
              <div><span>{essay.date}</span><h3>{essay.title}</h3></div>
              <p>{essay.argues}</p>
              <IconArrow className="writing-arrow icon-diagonal-up" />
            </Link>
          ))}
        </div>
        <Link href="/writing/" className="text-link-light">All writing <IconArrow className="icon-diagonal-up" /></Link>
      </section>

      <section className="contact-stage" id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Want to see how I think through a hard problem?</h2>
        <p>I’m looking for a Summer 2027 SWE or AI engineering internship. I’m happy to walk through the evaluator, a benchmark task, a constraint solver, or any decision on this site.</p>
        <div className="contact-actions">
          <a className="button-dark" href={'mailto:' + profile.email}>Start a conversation <IconArrow className="icon-diagonal-up" /></a>
          <a className="text-link-dark" href={profile.github} target="_blank" rel="noreferrer">GitHub <IconArrow className="icon-diagonal-up" /></a>
          <a className="text-link-dark" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <IconArrow className="icon-diagonal-up" /></a>
        </div>
      </section>
    </>
  );
}
