import type { Project } from "./types.ts";

export const projects: Project[] = [
  {
    slug: "spotterai",
    name: "SpotterAI",
    kind: "product",
    status: "Live, ongoing since Jun 2026",
    oneLine:
      "An AI fitness copilot that generates a weekly training plan, then audits it. Plans, nutrition targets, a coach chat, and a public red-team page all in one app.",
    constraint:
      "A language model will confidently write a training week that hurts someone. Shipping the raw output was never an option, and I had no budget for a human reviewer or a second paid model.",
    hardPart:
      "A deterministic evaluator in plain code that grades a generated plan against fourteen named checks, returns a per-check pass, warn or fail, and puts the flags above the plan instead of under it. A separate pure screen refuses pain, injury, medical and disordered-eating requests before any API call is made at all.",
    decision:
      "The auditor is code, not a second model call. A model grading a model is nondeterministic, costs money on every plan, and cannot be unit tested. A rubric in code returns the same verdict every run, costs nothing, and has a test suite pointed at it. It also runs in under a millisecond, offline, in the browser, which means it can go in CI. A vibe cannot go in CI.",
    cost:
      "My rubric is heuristic and will miss things a doctor would catch. So the evaluator is written to flag and never to certify, and every threshold is cited in a sources file that grades how good the evidence behind it actually is. Three of those are judgement calls and say so. One was contradicted by the literature, and I removed the claim rather than the check. The other cost is the stack. Building it as 86 hand-rolled ES modules with my own router bought me no dependency churn and a tiny payload, and it also means the routing and state problems I solved are ones a framework had already solved properly. On a codebase other people had to work in I would not make that call again.",
    stack: [
      "Vanilla JS ES modules",
      "Gemini",
      "Firebase Admin",
      "6 Vercel serverless functions",
      "Vercel Analytics",
      "node:test",
    ],
    facts: [
      { label: "Deterministic checks", value: "14", source: "evaluator.js check functions" },
      { label: "Red-team cases", value: "23", source: "docs/grading-the-model.md" },
      { label: "Risky plans caught", value: "18 / 18", source: "docs/grading-the-model.md" },
      { label: "Safe plans falsely flagged", value: "0", source: "docs/grading-the-model.md" },
      { label: "LLM calls in the audit", value: "0", source: "Deterministic by construction" },
      { label: "Commits", value: "334", source: "git log, verified 2026-09-08" },
      { label: "Test files", value: "78", source: "test/ and integration/, verified 2026-09-08" },
      { label: "Eval suites", value: "2", source: "Training and nutrition" },
    ],
    links: [
      { label: "Live app", href: "https://spotterai.xyz" },
      { label: "Source", href: "https://github.com/Ray-Shaw06/spotterai" },
    ],
    heroShot: "/shots/spotterai-hero.jpg",
    heroShotSize: [1800, 1125],
    heroCaption: "The plan safety audit, flags above the plan.",
    essaySlugs: ["evaluator-bug", "grading-the-model"],
    cardBlurb:
      "A model writes the plan, then a deterministic evaluator written in plain code audits it and shows you what is wrong with it before you trust it.",
    showAsCard: true,
  },
  {
    slug: "hearth",
    name: "Hearth",
    kind: "product",
    status: "Live, Aug 2026",
    oneLine:
      "A room planner. Enter two dimensions and it produces three arrangements, explains in plain English why each one works, renders it in draggable 3D, and prices what you are missing.",
    constraint:
      "Every tool in this space is either a shopping catalogue or a drawing surface that makes you do the thinking. I wanted something that has an opinion and will defend it, which means the opinion has to be inspectable rather than buried in a renderer.",
    hardPart:
      "A constraint solver that places furniture against real clearance, circulation and focal-point rules, then generates the sentence explaining the placement from the same rule that caused it. The explanation cannot drift from the layout because it is derived from it.",
    decision:
      "The engine contract lives pinned in a single file, so the solver's opinion is one file you can open and argue with. Scattering the rules across components would have been faster to write and would have made the product unfalsifiable. Tests point at the engine directly rather than at the UI.",
    cost:
      "Pinning the contract means the renderer cannot take shortcuts the engine does not know about, so some visual polish costs an engine change rather than a CSS change. I would rather pay in effort than in a product nobody can check.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Sentry", "Vercel"],
    facts: [
      { label: "Commits", value: "46", source: "git log, verified 2026-09-08" },
      { label: "Active days", value: "8", source: "git log" },
      { label: "Test files", value: "12", source: "Pointed at the engine, not the UI" },
      { label: "Arrangements per room", value: "3", source: "Solver output" },
    ],
    links: [
      { label: "Live app", href: "https://hearth-theta-eight.vercel.app" },
      { label: "Source", note: "Private repo, walkthrough on request" },
    ],
    heroShot: "/shots/hearth-layouts.jpg",
    heroShotSize: [1800, 947],
    heroCaption:
      "Three solved arrangements for the same room, each labelled with the rule that produced it.",
    cardBlurb:
      "Give it two numbers and it arranges your room three ways, explains in plain English why each one works, renders it in draggable 3D, and prices what you are missing.",
    showAsCard: true,
  },
  {
    slug: "transfer-navigator",
    name: "Transfer Navigator",
    kind: "product",
    status: "Live, Sep 2026",
    oneLine:
      "Pick a California community college, a target university and a major. It reads the real ASSIST articulation agreement and shows exactly what you still need, term by term. Tick off what you have done and the route recomputes.",
    constraint:
      "A useful transfer plan has to start with the actual articulation agreement. The upstream data can be unavailable or incomplete, and some agreements are only published as PDFs. The planner has to show those gaps clearly instead of guessing what a student needs.",
    hardPart:
      "Turning different agreement formats into one course model, then recomputing a term-by-term route as a student marks courses complete. Missing agreements and uncertain matches are explicit states, so the interface never treats absent data as a completed requirement.",
    decision:
      "The agreement parser and the planning engine are separate. Structured data and a client-side PDF fallback both feed the same model, while the route computation stays testable without a live upstream response.",
    cost:
      "Two input paths mean more maintenance when agreement formats change. I chose that cost so a student with a PDF-only agreement can still use the planner, and I keep the source agreement visible for verification.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "pdfjs-dist",
      "ASSIST agreements",
      "Vitest",
      "Vercel",
    ],
    facts: [
      { label: "Commits", value: "63", source: "git log, verified 2026-09-08" },
      { label: "Test files", value: "22", source: "Vitest" },
      { label: "Community colleges", value: "116", source: "Live app agreement picker" },
      { label: "Destination campuses", value: "65", source: "9 UC, 23 CSU, 33 private" },
    ],
    links: [
      { label: "Live app", href: "https://transfer-navigator.vercel.app" },
      { label: "Source", href: "https://github.com/Ray-Shaw06/transfer-navigator" },
    ],
    heroShot: "/shots/transfer-navigator-route.png",
    heroShotSize: [1000, 830],
    heroCaption:
      "My own route: Pasadena City College to UCI Computer Science, 22 units across 5 terms, computed from the live agreement.",
    cardBlurb:
      "Reads real ASSIST articulation agreements and turns them into a transfer route: which courses, which term, and whether your target term is even reachable.",
    showAsCard: true,
  },
  {
    slug: "woven-hymns",
    name: "Woven Hymns",
    kind: "client",
    status: "Shipped, Aug 2026",
    oneLine:
      "A story-first exhibition preview on Kashmiri pashmina: an introduction to Kashmir, one shawl followed through eight stages, four textile terms explained, and four gallery studies referencing Met Open Access. Built for my family's shawl business.",
    constraint:
      "My family needed a site that conveyed the craft behind Kashmiri shawls without a photography budget. Texture, labor, and provenance are hard to communicate in a generic product grid, so the story had to carry the experience.",
    hardPart:
      "Making a text-led page hold attention for eight stages, and shipping a Next.js app to GitHub Pages, which is a static host with no server. That meant a custom export step and a test that asserts against the rendered HTML rather than against components.",
    decision:
      "I made the writing the primary visual system and used attributed museum references where they added context. A static export on GitHub Pages kept the exhibition accessible without a hosting bill.",
    cost:
      "A text-led experience asks visitors to spend more time reading, and it is an exhibition preview rather than a storefront. The tradeoff was deliberate: the site explains the craft while keeping hosting cost at zero.",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind 4",
      "lucide-react",
      "Custom GitHub Pages exporter",
      "Vitest",
    ],
    facts: [
      { label: "Commits", value: "36", source: "git log, verified 2026-09-09" },
      { label: "Working days", value: "4", source: "Unique commit dates, 21 Jul to 12 Aug 2026" },
      { label: "Test files", value: "9", source: "Assert against rendered HTML" },
      { label: "Narrative stages", value: "8", source: "One shawl, followed through" },
      { label: "Hosting cost", value: "$0", source: "GitHub Pages" },
    ],
    links: [
      { label: "Live site", href: "https://ray-shaw06.github.io" },
      { label: "Source", note: "Private repo, walkthrough on request" },
    ],
    heroShot: "/shots/woven-hymns-hero.jpg",
    heroShotSize: [1800, 1125],
    heroCaption: "The opening of the eight-stage narrative.",
    cardBlurb:
      "A story-first exhibition preview on Kashmiri pashmina for my family's shawl business. Eight stages of making, attributed visual references, and a static site that costs nothing to host.",
    showAsCard: true,
  },

];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
