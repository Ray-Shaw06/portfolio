import type { Project } from "./types.ts";

export const projects: Project[] = [
  {
    slug: "dynamo",
    name: "Terminal-Bench task authoring",
    kind: "paid",
    status: "Paid, ongoing since Aug 2026",
    oneLine:
      "I write exams for AI coding agents. A task is a container with something broken in it, an instruction, a test suite, and a reference solution proving it can be done. I write the grader too.",
    constraint:
      "A benchmark task is only worth anything if it is hard enough to break a capable agent and precise enough to grade without a human in the loop. Those two pull against each other. Make it harder and it gets ambiguous, make it clearer and the agent solves it on the first try.",
    hardPart:
      "Proving a task is valid before it counts. The tests have to fail on the untouched container and pass after the reference solution runs, and that pair is the entire proof. Red first means the task is not accidentally already solved. Green after means it is solvable and the grader recognises a correct answer. Anything that fails either half is not a task, it is a bug.",
    decision:
      "Over-specify the instruction rather than leave room for interpretation. Every numbered line exists because a test checks it, and no test asserts anything the instruction never stated. The alternative reads more naturally and is unfair: the model fails for a reason it had no way to anticipate, and review rejects the task. I also write a generalisation test for anything parsing-shaped, because without one an agent passes by printing the expected answer.",
    cost:
      "Instructions that read like a specification rather than like a person asking for something. That is a real loss in naturalism, and I take it, because a task that grades unfairly is worthless and a task that reads a bit mechanically is merely less pretty.",
    stack: ["Docker", "Bash", "Python", "pytest", "Terminal-Bench 2"],
    facts: [
      { label: "What a task is", value: "4 files", source: "Dockerfile, instruction, tests, reference solution" },
      { label: "Validity proof", value: "red then green", source: "Tests fail on the untouched container, pass after the reference solution" },
      { label: "Employer", value: "Handshake AI", source: "Contract, remote, since Nov 2025" },
    ],
    links: [
      {
        label: "No public link",
        note: "Tasks I author are client work product. This page describes the discipline, not the deliverables.",
      },
    ],
    heroCaption:
      "The red/green validity loop. Illustrative test names, not a task I authored.",
    cardBlurb:
      "Paid work authoring benchmark tasks and graders built to break AI coding agents.",
    showAsCard: false,
  },
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
      "My rubric is heuristic and will miss things a doctor would catch. So the evaluator is written to flag and never to certify, and every threshold is cited in a sources file that grades how good the evidence behind it actually is. Three of those are judgement calls and say so. One was contradicted by the literature, and I removed the claim rather than the check.",
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
    heroShot: "/shots/spotterai-hero.png",
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
    heroShot: "/shots/hearth-layouts.png",
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
      "The only authoritative source is ASSIST, and it is a hostile dependency. The JSON API is undocumented, needs an XSRF handshake, rate-limits to roughly 50 calls per five minutes per IP, and sends no CORS headers at all. Some agreements exist only as PDFs.",
    hardPart:
      "Getting the data at all. Every call goes through a server hop because the browser cannot make it. The handshake, the rate limit and the missing-agreement case all had to be handled as normal states rather than errors, because for a real student any of them is a Tuesday.",
    decision:
      "Two paths to the same answer: the JSON API first, and a client-side PDF parse as the fallback when no agreement is exposed through the API. Building only the API path would have been half a product, because the pairs it does not cover are exactly the ones nobody has written a tool for.",
    cost:
      "A second parser to maintain, forever, against a format I do not control. I took it, because the alternative was a tool that works for the students who already had options.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "pdfjs-dist",
      "ASSIST JSON API",
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
      "A real client with no photography budget, and a craft whose value is invisible in a phone photo. An image-led site would have looked like every drop-shipping storefront and would have undersold the object.",
    hardPart:
      "Making a text-led page hold attention for eight stages, and shipping a Next.js app to GitHub Pages, which is a static host with no server. That meant a custom export step and a test that asserts against the rendered HTML rather than against components.",
    decision:
      "Text-led over image-led, and free static hosting over a paid host. The client's constraint became the design: the writing carries the object, and licensed museum references stand in for photography I could not commission.",
    cost:
      "A text-led page asks more of a visitor than a photograph does, and some will not give it. In exchange the hosting bill is zero, which for a family business is the difference between a site that stays up and one that lapses.",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind 4",
      "lucide-react",
      "Custom GitHub Pages exporter",
      "Vitest",
    ],
    facts: [
      { label: "Commits", value: "36", source: "git log, verified 2026-09-08" },
      { label: "Test files", value: "9", source: "Assert against rendered HTML" },
      { label: "Narrative stages", value: "8", source: "One shawl, followed through" },
      { label: "Hosting cost", value: "$0", source: "GitHub Pages" },
    ],
    links: [
      { label: "Live site", href: "https://ray-shaw06.github.io" },
      { label: "Source", note: "Private repo, walkthrough on request" },
    ],
    heroShot: "/shots/woven-hymns-hero.png",
    heroCaption: "The opening of the eight-stage narrative.",
    cardBlurb:
      "A story-first exhibition preview on Kashmiri pashmina, built for my family's shawl business. Text-led, because the client had no photography budget.",
    showAsCard: true,
  },
  {
    slug: "gma-creative",
    name: "GMA Creative House",
    kind: "client",
    status: "Ongoing contract",
    oneLine:
      "Paid contract work for a creative studio. Weekly website tasks, scoped, delivered and billed hourly against a shared log.",
    constraint:
      "Someone else's codebase, someone else's priorities, and a real invoice at the end of it. Nothing here is chosen by me, which is the point.",
    hardPart:
      "Estimating honestly, then hitting the estimate. Small tasks in unfamiliar code are where a week quietly disappears if you do not scope them before you start.",
    decision:
      "I track my own hours and send the log unprompted. Every other project on this page is something I chose to build. This one is something a person who owes me nothing decided to pay for.",
    cost:
      "Sending the log unprompted costs me billable time, every week. It is also the reason the work has kept coming.",
    stack: ["HTML", "CSS", "JavaScript"],
    facts: [
      { label: "Cadence", value: "weekly", source: "Ongoing contract" },
      { label: "Billing", value: "hourly", source: "Self-tracked, shared log" },
    ],
    links: [
      {
        label: "No public link",
        note: "Client sites are the client's to publicise, not mine. References available on request.",
      },
    ],
    cardBlurb:
      "Ongoing paid contract work. Weekly website tasks for a creative studio, scoped and billed hourly. Someone who is not related to the outcome pays for this.",
    showAsCard: true,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
