import type { Essay } from "./types.ts";

export const essays: Essay[] = [
  {
    slug: "evaluator-bug",
    title: "An evaluator that couldn't catch its own bug",
    date: "August 2026",
    argues:
      "I spent six weeks building a system to audit AI output. Then someone showed me a plan I could see was bad within ten seconds, I ran it through my own evaluator, and it passed. Here is what was structurally missing, and what I changed.",
    pullQuote: "It said the plan was fine.",
  },
  {
    slug: "grading-the-model",
    title: "Grading the model",
    date: "August 2026",
    argues:
      "How the audit actually works, what the benchmark measures, and why the grader is plain code instead of a second model asked politely to check the first one's work.",
    pullQuote: "A vibe cannot go in CI.",
  },
];

export const essayBySlug = (slug: string) => essays.find((e) => e.slug === slug);
