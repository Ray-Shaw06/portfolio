export const profile = {
  name: "Rehaan Shaw",
  headline: "I build software that has to be trusted, not just demoed.",
  screeningFacts:
    "UCI CS '28 · Summer 2027 SWE or AI engineering internship · Irvine, CA · US citizen",
  email: "rehaanshaw@gmail.com",
  github: "https://github.com/Ray-Shaw06",
  linkedin: "https://www.linkedin.com/in/rehaanshaw/",
  resume: "/resume.pdf",
  looking:
    "A Summer 2027 internship, SWE or AI engineering. Evaluation, reliability, backend, anywhere correctness is the interesting problem.",
  timeline: [
    { when: "to Dec 2024", what: "Grew up in Thailand", detail: "Moved to the US at the end of 2024." },
    { when: "Jan 2025", what: "Started at Pasadena City College", detail: "First semester began weeks after arriving." },
    { when: "Mar 2025", what: "Secretary, AI and Machine Learning Club", detail: "Through June 2026." },
    { when: "Jun 2026", what: "79 units, 3.78 GPA", detail: "Dean's Honors twice, Honors Program, A.A.S. in Computer Science." },
    { when: "Sep 2026", what: "Transferred to UC Irvine", detail: "Donald Bren School of Information and Computer Sciences." },
    { when: "Jun 2028", what: "B.S. Computer Science", detail: "Expected." },
  ],
  /** Photographs shown as a strip beside the timeline. Order is deliberate:
   *  out in the world, at work, training. */
  strip: [
    { src: "/photos/p03", alt: "Outside a chocolate shop in Pasadena", pos: "50% 42%" },
    { src: "/photos/p05", alt: "On a street corner in Whittier", pos: "70% 40%" },
    { src: "/photos/p09", alt: "Working on a laptop", pos: "50% 50%" },
    { src: "/photos/p13", alt: "In the weight room", pos: "45% 24%" },
    { src: "/photos/p25", alt: "Training with a weighted vest", pos: "50% 20%" },
  ],
  fallCourses: [
    "CS 122A Intro to Data Management",
    "STATS 67 Probability and Statistics for CS",
    "SWE 43 Intro to Software Engineering",
  ],
  heroStats: [
    { label: "public projects", value: "4", source: "The four records in content/projects.ts" },
    { label: "published evaluator checks", value: "14", source: "SpotterAI benchmark v1.4.0" },
    { label: "technical essays", value: "2", source: "The two records in content/essays.ts" },
  ],
};
