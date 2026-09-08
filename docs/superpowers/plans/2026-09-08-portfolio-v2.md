# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `~/portfolio` as a statically exported Next.js site that repositions Rehaan for AI engineering roles alongside SWE internships, with per-project pages, two published essays, and the paid Terminal-Bench work surfaced.

**Architecture:** Port the existing hand-written Lumina design from `site/index.html` into a Next.js 15 App Router project with a real Tailwind 4 build, replacing the Tailwind Play CDN. All project and essay content lives in typed data files so pages render from data, never from hardcoded markup. Static export to Vercel.

**Tech Stack:** Next.js 15.5 (App Router, `output: "export"`), React 19.1, TypeScript 5.8, Tailwind 4.1 via `@tailwindcss/postcss`, `next/font` for self-hosted Geist / Geist Mono / Inter, `node:test` for the data and link tests.

**Spec:** `docs/superpowers/specs/2026-09-08-portfolio-v2-design.md`. Section numbers below refer to it.

**UI work runs under the `impeccable` skill.** Tasks 5 through 11 are UI tasks. Invoke `impeccable` before starting Task 5 and keep it active through Task 11.

## Global Constraints

- **Never fabricate.** Every number rendered on the site must appear in spec section 11 with a source. If a number is not in that table, it does not ship.
- **No em dashes in prose copy.** Use a period, comma, or colon. This applies to every sentence written for the site.
- **No Handshake client deliverables.** The Dynamo page and section describe process and discipline only: no task instruction text, no Dockerfile, no grader source, no task he authored for the client. Spec 7.3.
- **No phone number on the public site.** It appears in `resume.pdf` only, which is normal for a resume.
- **GPA is 3.78. No grade breakdown.** Spec 4.5.
- **Node is `~/.local/node22/bin/node` (v22.17.0), npm 10.9.2.**
- **`next dev` is banned on this machine.** It never completes its first compile. Always `npm run build` then `npm start`. Preview through `~/.claude/launch.json`. See memory `nextjs-preview-prod-build-only`.
- **Tailwind must be a real build.** `cdn.tailwindcss.com` must not appear in any shipped file.
- **Lumina is preserved, not redesigned.** Keep the type scale, the `--ease-lumina` cubic-bezier `(0.15, 0.83, 0.66, 1)`, the `animationIn` / `lumina-float` / `lumina-pulse` / `lumina-scan` keyframes, and the Geist / Geist Mono / Inter stack from `site/index.html`.
- **SpotterAI's canonical URL is `https://spotterai.xyz`,** not the Vercel subdomain. It is a live custom domain and it is what the resume cites.

## File Structure

```
portfolio/
  app/
    layout.tsx                 root shell: fonts, metadata, header, footer
    page.tsx                   home, composes section components
    globals.css                Tailwind entry + Lumina tokens, keyframes
    work/[slug]/page.tsx       project page template, generateStaticParams
    writing/page.tsx           essay index
    writing/[slug]/page.tsx    essay page, renders markdown
  components/
    site/Header.tsx            nav + resume link
    site/Footer.tsx            contact repeat + screening line
    home/Hero.tsx              7.2
    home/PaidWork.tsx          7.3 Dynamo, red/green loop visual
    home/SpotterHero.tsx       7.4 benchmark scoreboard
    home/HardPart.tsx          7.5 evaluator + Contradicted grade
    home/SelectedWork.tsx      7.6 five cards
    home/HowIWork.tsx          7.7 pipeline with committed artifacts
    home/Writing.tsx           7.8 two essay cards
    home/ThePath.tsx           7.9 PCC timeline
    home/About.tsx             7.10
    home/Contact.tsx           7.11
    ui/Mono.tsx                mono label primitive
    ui/StatGrid.tsx            numbers strip, used by hero and project pages
    ui/RedGreen.tsx            the validity-loop visual, used by Dynamo
  content/
    projects.ts                six project records, typed
    essays.ts                  two essay records, typed
    profile.ts                 name, screening facts, links, timeline
    types.ts                   Project, Essay, Fact interfaces
  content/essays/
    evaluator-bug.md           copied from ~/spotterai/docs
    grading-the-model.md       copied from ~/spotterai/docs
  test/
    content.test.ts            every fact has a source, every project complete
    links.test.ts              every outbound URL returns 2xx
  public/
    resume.pdf
    shots/*.png                screenshots from assets/screenshots
  next.config.ts
  postcss.config.mjs
  tsconfig.json
  package.json
```

The existing `site/` directory stays untouched until Task 12 so the live site keeps serving while the rebuild happens.

---

### Task 1: Scaffold the Next.js project and kill the CDN

**Files:**
- Create: `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Reference: `site/index.html:37-250` for the Lumina `<style>` block to port

**Interfaces:**
- Produces: a building Next app with Lumina tokens available as CSS custom properties and Tailwind utilities, plus self-hosted fonts via `next/font`.

- [ ] **Step 1: Write package.json**

```json
{
  "name": "portfolio",
  "private": true,
  "scripts": {
    "build": "next build",
    "start": "next start -p 4311",
    "test": "node --no-warnings --experimental-strip-types --test test/*.test.ts"
  },
  "dependencies": {
    "next": "^15.5.23",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.10",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.1.10",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 2: Write next.config.ts for static export**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

`images.unoptimized` is required because `output: "export"` has no image optimization server. `trailingSlash` keeps `/work/spotterai/` resolving as a directory on static hosting.

- [ ] **Step 3: Write postcss.config.mjs**

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

- [ ] **Step 4: Install and verify the build runs**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm install
```

Expected: installs without peer-dependency errors.

- [ ] **Step 5: Port the Lumina tokens into app/globals.css**

Open `site/index.html` and copy the `<style>` blocks at lines 37 through 250 verbatim into `app/globals.css`, below `@import "tailwindcss";`. Preserve every keyframe name exactly: `animationIn`, `lumina-float`, `lumina-pulse`, `lumina-scan`. Preserve `--ease-lumina: cubic-bezier(0.15, 0.83, 0.66, 1)`.

Add the Tailwind 4 theme block so the font families resolve as utilities:

```css
@import "tailwindcss";

@theme {
  --font-geist: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
  --font-inter: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 6: Write app/layout.tsx with self-hosted fonts**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rehaanshaw.vercel.app"),
  title: "Rehaan Shaw, software engineer, UCI CS '28",
  description:
    "Rehaan Shaw. Junior CS at UC Irvine. Writes the benchmarks and graders that break AI coding agents, and ships production software solo. Seeking Summer 2027 SWE or AI engineering internships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${geistMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Note the title uses a comma, not an em dash. Global constraint.

- [ ] **Step 7: Build and confirm no CDN reference survives**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build && grep -r "cdn.tailwindcss.com" out/ || echo "CLEAN: no Tailwind CDN in output"
```

Expected: build succeeds, then `CLEAN: no Tailwind CDN in output`.

- [ ] **Step 8: Commit**

```bash
git add package.json next.config.ts postcss.config.mjs tsconfig.json app/ .gitignore
git commit -m "Scaffold Next.js portfolio with Lumina tokens, drop Tailwind CDN"
```

---

### Task 2: Content types and the project data file

**Files:**
- Create: `content/types.ts`, `content/projects.ts`, `content/profile.ts`
- Test: `test/content.test.ts`

**Interfaces:**
- Produces: `Project`, `Essay`, `Fact` interfaces; `projects: Project[]` with six records ordered `dynamo, spotterai, hearth, transfer-navigator, woven-hymns, gma-creative`; `profile` with screening facts and timeline.
- Consumed by: every page component from Task 4 onward.

- [ ] **Step 1: Write content/types.ts**

```ts
export interface Fact {
  label: string;
  value: string;
  source: string; // must match a row in spec section 11
}

export interface Project {
  slug: string;
  name: string;
  status: string;          // "Live, ongoing since Jun 2026"
  oneLine: string;         // field 2, "What it is"
  constraint: string;      // field 4
  hardPart: string;        // field 5
  decision: string;        // field 6, "What I decided and why"
  cost: string;            // field 7, "What it cost me"
  stack: string[];         // field 8
  facts: Fact[];           // field 9
  links: { label: string; href: string }[];
  heroShot?: string;       // path under /shots
  heroCaption?: string;
  essaySlugs?: string[];
  cardBlurb: string;       // short text for the home page card
  showAsCard: boolean;     // dynamo is false: it has its own section (spec 7.6)
}

export interface Essay {
  slug: string;
  title: string;
  date: string;
  argues: string;
  pullQuote: string;
}
```

- [ ] **Step 2: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../content/projects.ts";

test("every project is complete", () => {
  assert.equal(projects.length, 6);
  for (const p of projects) {
    for (const field of ["slug","name","status","oneLine","constraint","hardPart","decision","cost","cardBlurb"] as const) {
      assert.ok(p[field] && String(p[field]).trim().length > 0, `${p.slug} missing ${field}`);
    }
    assert.ok(p.stack.length > 0, `${p.slug} has no stack`);
    assert.ok(p.links.length > 0, `${p.slug} has no links`);
  }
});

test("every fact cites a source", () => {
  for (const p of projects) {
    for (const f of p.facts) {
      assert.ok(f.source.trim().length > 0, `${p.slug} fact "${f.label}" has no source`);
    }
  }
});

test("no em dashes in prose copy", () => {
  for (const p of projects) {
    for (const field of ["oneLine","constraint","hardPart","decision","cost","cardBlurb"] as const) {
      assert.ok(!String(p[field]).includes("—"), `${p.slug} ${field} contains an em dash`);
    }
  }
});

test("dynamo is not a home page card", () => {
  const d = projects.find(p => p.slug === "dynamo");
  assert.ok(d, "dynamo project missing");
  assert.equal(d!.showAsCard, false);
});
```

- [ ] **Step 3: Run it and watch it fail**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm test
```

Expected: FAIL, `Cannot find module '../content/projects.ts'`.

- [ ] **Step 4: Write content/projects.ts**

Six records. Carry the existing v1 copy for `spotterai`, `hearth`, `transfer-navigator`, `woven-hymns`, `gma-creative` across from the "In depth" section of `site/index.html`: those write-ups are already good and the spec says keep them close to as-is (spec 12). Add the new `cost` field per spec section 8 field 7, and write the `dynamo` record fresh from spec 7.3.

Facts must come from spec section 11: SpotterAI 334 commits / 78 test files / 2 eval suites / 14 checks / 23 red-team cases / 18 of 18 caught / 0 false flags; Hearth 46 commits, 12 test files; Transfer Navigator 63 commits, 22 test files; Woven Hymns 36 commits, 9 test files.

Links: SpotterAI live is `https://spotterai.xyz`, source `https://github.com/Ray-Shaw06/spotterai`. Hearth live `https://hearth-theta-eight.vercel.app`, repo private. Transfer Navigator live `https://transfer-navigator.vercel.app`, source `https://github.com/Ray-Shaw06/transfer-navigator`. Woven Hymns live `https://ray-shaw06.github.io`, repo private. GMA Creative has no public link. Dynamo has no public link, per the constraint.

- [ ] **Step 5: Write content/profile.ts**

```ts
export const profile = {
  name: "Rehaan Shaw",
  screeningFacts: "UCI CS '28 · Summer 2027 SWE or AI engineering internship · Irvine, CA · US citizen",
  email: "rehaanshaw@gmail.com",
  github: "https://github.com/Ray-Shaw06",
  linkedin: "https://www.linkedin.com/in/rehaanshaw/",
  resume: "/resume.pdf",
  timeline: [
    { when: "to Dec 2024", what: "Grew up in Thailand" },
    { when: "Jan 2025", what: "Started at Pasadena City College" },
    { when: "Jun 2026", what: "79 units, 3.78 GPA, Dean's Honors twice, Honors Program" },
    { when: "Fall 2026", what: "Transferred to UC Irvine CS, Donald Bren School" },
    { when: "Jun 2028", what: "B.S. Computer Science" },
  ],
  fallCourses: [
    "CS 122A Intro to Data Management",
    "STATS 67 Probability and Statistics for CS",
    "SWE 43 Intro to Software Engineering",
  ],
};
```

Dean's Honors, the Honors Program, and the Associate of Applied Science all come from the resume PDF, verified 2026-09-08. Add them to spec section 11 as a new source row in Task 12.

- [ ] **Step 6: Run tests and confirm they pass**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm test
```

Expected: 4 tests pass.

- [ ] **Step 7: Commit**

```bash
git add content/ test/content.test.ts
git commit -m "Add typed project and profile content with completeness tests"
```

---

### Task 3: Essay content and markdown rendering

**Files:**
- Create: `content/essays.ts`, `content/essays/evaluator-bug.md`, `content/essays/grading-the-model.md`
- Test: extend `test/content.test.ts`

**Interfaces:**
- Produces: `essays: Essay[]` with `slug`, `title`, `date`, `argues`, `pullQuote`, `bodyPath`.

- [ ] **Step 1: Copy the essays in**

```bash
mkdir -p ~/portfolio/content/essays
cp ~/spotterai/docs/an-evaluator-that-couldnt-catch-its-own-bug.md ~/portfolio/content/essays/evaluator-bug.md
cp ~/spotterai/docs/grading-the-model.md ~/portfolio/content/essays/grading-the-model.md
```

- [ ] **Step 2: Fix the relative links inside the copies**

Both essays link to each other and to `rubric-sources.md` using SpotterAI-repo-relative paths. Rewrite: `an-evaluator-that-couldnt-catch-its-own-bug.md` becomes `/writing/evaluator-bug/`, `grading-the-model.md` becomes `/writing/grading-the-model/`, and `rubric-sources.md` becomes the GitHub URL `https://github.com/Ray-Shaw06/spotterai/blob/main/docs/rubric-sources.md`.

- [ ] **Step 3: Write content/essays.ts**

```ts
import type { Essay } from "./types.ts";

export const essays: Essay[] = [
  {
    slug: "evaluator-bug",
    title: "An evaluator that couldn't catch its own bug",
    date: "August 2026",
    argues:
      "I built a system to audit AI output, then ran a plan through it that I could see was bad in ten seconds. It passed. Here is what was structurally missing and what I changed.",
    pullQuote: "It said the plan was fine.",
  },
  {
    slug: "grading-the-model",
    title: "Grading the model",
    date: "August 2026",
    argues:
      "How the audit works, what the benchmark actually measures, and why the grader is plain code instead of a second model call.",
    pullQuote: "A vibe cannot go in CI.",
  },
];
```

- [ ] **Step 4: Add the markdown renderer**

Use `marked`, which runs at build time only and ships no runtime JavaScript because the pages are statically exported. Hand-rolling a parser here would mean writing GitHub-table support from scratch, and both essays depend on tables heavily.

```bash
cd ~/portfolio && ~/.local/node22/bin/npm install marked@^15
```

```ts
// lib/markdown.ts
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
```

- [ ] **Step 5: Write the test**

```ts
import { renderMarkdown } from "../lib/markdown.ts";

test("renders tables, which both essays depend on", () => {
  const html = renderMarkdown("| a | b |\n|---|---|\n| 1 | 2 |");
  assert.match(html, /<table/);
  assert.match(html, /<td[^>]*>1<\/td>/);
});

test("renders fenced code without executing it", () => {
  const html = renderMarkdown("```js\nconst x = 1;\n```");
  assert.match(html, /<pre/);
  assert.ok(!html.includes("<script"));
});
```

- [ ] **Step 6: Run tests**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm test
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add content/essays.ts content/essays/ lib/markdown.ts test/
git commit -m "Add essay content and a build-time markdown renderer"
```

---

### Task 4: Move assets into public/

**Files:**
- Create: `public/resume.pdf`, `public/shots/*.png`

- [ ] **Step 1: Copy the resume and screenshots**

```bash
cd ~/portfolio
mkdir -p public/shots
cp site/resume.pdf public/resume.pdf
cp assets/screenshots/*.png public/shots/
cp assets/screenshots/spotterai/*.png public/shots/
ls -la public/shots/ && du -sh public/
```

- [ ] **Step 2: Verify the resume is the right document**

```bash
cd ~/portfolio && ~/.local/node22/bin/node -e "console.log(require('fs').statSync('public/resume.pdf').size)"
```

Expected: `123138`. That is the Sep 1 2026 CS resume, verified against the Sep 2 Google Doc.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "Add resume PDF and project screenshots"
```

---

### Task 5: Shared shell, header and footer

**INVOKE THE `impeccable` SKILL BEFORE STARTING THIS TASK. Keep it active through Task 11.**

**Files:**
- Create: `components/site/Header.tsx`, `components/site/Footer.tsx`, `components/ui/Mono.tsx`, `components/ui/StatGrid.tsx`
- Reference: `site/index.html` header and footer markup

**Interfaces:**
- Produces: `<Header />`, `<Footer />`, `<Mono>{children}</Mono>`, `<StatGrid facts={Fact[]} />`.

- [ ] **Step 1: Port the header**

Nav links: Work, The hard part, In depth, About, Resume, Email me. Add Writing. The resume link must be reachable from every scroll position on every page, which is spec criterion 2, so the header is sticky.

- [ ] **Step 2: Port the footer**

Contact links repeated, screening facts line from `profile.screeningFacts`, and a line noting the site's own repo is public.

- [ ] **Step 3: Build and eyeball it**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build && ~/.local/node22/bin/npm start
```

Then preview via the `portfolio` entry in `~/.claude/launch.json` on port 4311 and screenshot with `browse`.

- [ ] **Step 4: Commit**

```bash
git add components/site components/ui
git commit -m "Add shared header, footer and mono primitives"
```

---

### Task 6: Home hero with the widened positioning

**Files:**
- Create: `components/home/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build the hero**

Keep the existing headline verbatim: "I build software that has to be trusted, not just demoed." Spec 7.2 says it was written before this repositioning and is already the thesis.

Rewrite the sub-paragraph to name the paid work. Draft, subject to Rehaan's edit:

> Junior CS at UC Irvine. I get paid to write the benchmark tasks and graders that break AI coding agents, and on my own time I ship products where the model's output is audited by code before anyone sees it.

Screening line renders `profile.screeningFacts` in mono.

Numbers strip: 5 products shipped, 479 commits since June, $0 infrastructure cost.

- [ ] **Step 2: Verify the screening line renders both role types**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build && grep -o "Summer 2027 SWE or AI engineering internship" out/index.html
```

Expected: one match.

- [ ] **Step 3: Commit**

---

### Task 7: The paid work section and the red/green visual

**Files:**
- Create: `components/home/PaidWork.tsx`, `components/ui/RedGreen.tsx`

- [ ] **Step 1: Build the red/green validity loop visual**

Two stacked terminal-style panels on the tinted mono surface. Panel one: tests run against the untouched container, all failing, red. Panel two: the same tests after the reference solution runs, all passing, green. Caption explains why the pair is the proof: red first shows the task is not accidentally already solved, green after shows it is solvable and the grader recognises a correct answer.

The test names in the panels must be generic and invented for illustration, never a real client task. Label the visual as illustrative, the same way the current site labels its evaluator run.

- [ ] **Step 2: Write the section copy**

Four parts per spec 7.3: what a Terminal-Bench task is (Dockerfile, instruction, tests, reference solution), the red/green loop, the coherent contract, the generalisation test.

- [ ] **Step 3: Verify the constraint holds**

```bash
cd ~/portfolio && grep -riE "handshake|dynamo" out/ | grep -iE "dockerfile|solve\.sh|instruction\.md" || echo "CLEAN: no client deliverable content"
```

Expected: `CLEAN: no client deliverable content`.

- [ ] **Step 4: Commit**

---

### Task 8: SpotterAI hero and the hard part

**Files:**
- Create: `components/home/SpotterHero.tsx`, `components/home/HardPart.tsx`

- [ ] **Step 1: Replace the illustrative run with the measured benchmark**

Scoreboard: 14 deterministic checks, 23 red-team cases, 18 of 18 risky plans caught, 0 safe plans falsely flagged, 0 LLM calls in the audit. Add the line that the benchmark fails the build when it regresses.

- [ ] **Step 2: Keep the hard-part prose, add the Contradicted grade**

Keep the existing section, which is the best-written copy on the current site. Add a paragraph on `rubric-sources.md`: it grades the evidence behind every threshold as Supported, Directional, Practical, or Contradicted; three are Practical and say so; one was Contradicted, because writing the document surfaced that the quad/hamstring check was described as a knee-health measure and a systematic review found the hamstring-to-quadriceps ratio has limited value for predicting those injuries. The check stayed, the injury claim went.

- [ ] **Step 3: Verify no stale check count**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build && grep -oE "1[0-9] (automated |deterministic )?(safety |named )?checks" out/index.html
```

Expected: only `14` variants. The live SpotterAI product still says 11; that is tracked as a separate task and must not be copied here.

- [ ] **Step 4: Commit**

---

### Task 9: Selected work, how I work, writing, the path, about, contact

**Files:**
- Create: `components/home/SelectedWork.tsx`, `HowIWork.tsx`, `Writing.tsx`, `ThePath.tsx`, `About.tsx`, `Contact.tsx`

- [ ] **Step 1: Selected work, five cards**

Render from `projects.filter(p => p.showAsCard)`. Each card links to `/work/<slug>/`, not to an anchor and not to the live demo.

- [ ] **Step 2: How I work**

The pipeline `spec → plan → build → review → evals in CI`, each stage naming a real committed artifact per spec 7.7. Claude Code is named exactly once, as the tool. The section is about the gates.

- [ ] **Step 3: Writing, two cards with pull quotes**

- [ ] **Step 4: The path**

Horizontal timeline from `profile.timeline`, plus the fall 2026 courses and the AI & Machine Learning Club secretary role at PCC, March 2025 to June 2026.

- [ ] **Step 5: About, trimmed**

Keeps the 50 lb sentence and why SpotterAI exists. The biography moved to The path.

- [ ] **Step 6: Contact**

Availability line names both role types.

- [ ] **Step 7: Build, preview, screenshot the full home page, commit**

---

### Task 10: Project pages

**Files:**
- Create: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Implement generateStaticParams over all six projects**

```tsx
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
```

- [ ] **Step 2: Render the ten-field template from spec section 8**

Identical field order on every page. Field 3 is the hero artifact: `/shots/hearth-layouts.png` for Hearth, `/shots/transfer-navigator-route.png` for Transfer Navigator, `/shots/spotterai-hero.png` for SpotterAI, `/shots/woven-hymns-hero.png` for Woven Hymns, the `RedGreen` component for Dynamo, and a billed-hours log for GMA Creative.

- [ ] **Step 3: Verify all six pages exist in the export**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build
for s in dynamo spotterai hearth transfer-navigator woven-hymns gma-creative; do
  test -f "out/work/$s/index.html" && echo "OK $s" || echo "MISSING $s"
done
```

Expected: six `OK` lines.

- [ ] **Step 4: Commit**

---

### Task 11: Essay pages and the writing index

**Files:**
- Create: `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`

- [ ] **Step 1: Render both essays through `renderMarkdown`**

Set body copy to roughly 66 characters per line per the v1 visual system. Style tables and code blocks on the tinted mono surface.

- [ ] **Step 2: Verify**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build
test -f out/writing/evaluator-bug/index.html && test -f out/writing/grading-the-model/index.html && echo "OK both essays"
grep -c "It said the plan was fine" out/writing/evaluator-bug/index.html
```

Expected: `OK both essays`, then at least 1.

- [ ] **Step 3: Commit**

---

### Task 12: Quality gates

**Files:**
- Create: `test/links.test.ts`
- Modify: `docs/superpowers/specs/2026-09-08-portfolio-v2-design.md` section 11, adding the resume-sourced rows

- [ ] **Step 1: Write the link check**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../content/projects.ts";
import { profile } from "../content/profile.ts";

const urls = [
  ...projects.flatMap(p => p.links.map(l => l.href)),
  profile.github, profile.linkedin,
].filter(h => h.startsWith("http"));

test("every outbound link resolves", { timeout: 60000 }, async () => {
  for (const url of [...new Set(urls)]) {
    const res = await fetch(url, { redirect: "follow" });
    assert.ok(res.ok, `${url} returned ${res.status}`);
  }
});
```

- [ ] **Step 2: Run it**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm test
```

Expected: pass. If `spotterai.xyz` fails, do not fall back to the Vercel subdomain silently, report it.

- [ ] **Step 3: Verify the resume resolves in the export**

```bash
cd ~/portfolio && test -f out/resume.pdf && echo "OK resume present"
```

This closes the live 404 that is spec criterion 2.

- [ ] **Step 4: No-JS readability check**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm run build
~/.claude/skills/gstack/browse/dist/browse goto file://$PWD/out/index.html
~/.claude/skills/gstack/browse/dist/browse js "document.body.innerText.length"
```

Expected: a large number. Then confirm the styles are real CSS files, not injected by script:

```bash
grep -c "<link rel=\"stylesheet\"" out/index.html
```

Expected: at least 1.

- [ ] **Step 5: Decide the unicornStudio background (spec 6.7)**

The current site loads `unicornStudio.umd.js` from jsDelivr for a WebGL background. Measure it:

```bash
cd ~/portfolio && grep -c "unicornStudio" out/index.html || echo "0 (not ported)"
```

Spec 6.7: it stays only if it costs nothing on the Lighthouse run and degrades cleanly. The default is to leave it out. It is decoration, and it is a third-party script on the critical path of a page whose whole argument is engineering judgment. If it is omitted, say so here so the decision is not silently lost.

- [ ] **Step 6: Add the `/work` redirect (spec section 5)**

There is no `/work` index page: the home page's selected-work section is the index. Create `app/work/page.tsx` that redirects to `/#work` so the URL is never a 404, since v1 shipped `/work` anchors that may already be linked.

```tsx
import { redirect } from "next/navigation";
export default function WorkIndex() { redirect("/#work"); }
```

Under `output: "export"` a runtime redirect is not available, so instead emit a static meta-refresh page:

```tsx
export default function WorkIndex() {
  return (
    <html><head>
      <meta httpEquiv="refresh" content="0; url=/#work" />
      <link rel="canonical" href="/" />
    </head><body><a href="/#work">Selected work</a></body></html>
  );
}
```

Verify: `test -f out/work/index.html && echo "OK /work"`.

- [ ] **Step 7: Lighthouse and LCP (spec criteria 3 and 4)**

```bash
cd ~/portfolio && ~/.local/node22/bin/npx --yes lighthouse http://localhost:4311/ \
  --preset=desktop --quiet --chrome-flags="--headless" \
  --output=json --output-path=/tmp/lh-home.json
~/.local/node22/bin/node -e "const r=require('/tmp/lh-home.json');console.log(Object.entries(r.categories).map(([k,v])=>k+': '+Math.round(v.score*100)).join('\n'));console.log('LCP:', r.audits['largest-contentful-paint'].displayValue)"
```

Run against `/`, `/work/spotterai/`, and `/work/dynamo/`. Spec criterion 3 requires 95 or higher on all four categories, mobile profile. Re-run with `--preset=perf` and mobile emulation for the official number. If any category is below 95, fix it before Task 13 rather than deploying and noting it.

- [ ] **Step 8: Update spec section 11 with the resume-sourced facts**

Add rows for Dean's Honors (Spring 2025, Fall 2025), the Honors Program, the Associate of Applied Science in Computer Science, and the AI & Machine Learning Club secretary role, all sourced to `Rehaan_Shaw_CS_Resume`, Google Doc, modified 2026-09-02.

- [ ] **Step 9: Commit**

---

### Task 13: Cut over and deploy

**Files:**
- Delete: `site/index.html`, `site/.gitignore`
- Modify: `~/.claude/launch.json` portfolio entry, `.vercel` project config

- [ ] **Step 1: Repoint the launch.json portfolio entry**

Replace the `python3 -m http.server` entry pointing at `site/` with a `next start` entry on port 4311, matching the `hearth` and `transfer-navigator` entries.

- [ ] **Step 2: Move the Vercel project config to the repo root**

```bash
cd ~/portfolio && mv site/.vercel .vercel && mv site/.env.local .env.local 2>/dev/null || true
```

Keep `projectId` `prj_eaasqxqYHYKVoGDAye7NTob1JZoa` so the deploy lands on the existing `rehaanshaw` project and the URL does not change.

- [ ] **Step 3: Remove the old static site**

```bash
cd ~/portfolio && git rm site/index.html site/.gitignore
```

- [ ] **Step 4: Full gate run before deploy**

```bash
cd ~/portfolio && ~/.local/node22/bin/npm test && ~/.local/node22/bin/npm run build
```

Expected: tests pass, build succeeds.

- [ ] **Step 5: Deploy**

Do not deploy without Rehaan's confirmation. Publishing is outward-facing. Present the local preview first, get the go-ahead, then deploy.

- [ ] **Step 6: Verify production**

```bash
for p in / /work/spotterai/ /work/dynamo/ /writing/evaluator-bug/ /resume.pdf; do
  printf "%-32s " "$p"; curl -sS -o /dev/null -w "%{http_code}\n" "https://rehaanshaw.vercel.app$p"
done
```

Expected: five `200` lines. The `/resume.pdf` 200 is the fix for the defect that is live today.

- [ ] **Step 7: Commit**

---

## Open items carried from the spec

- **B3 stands.** Rehaan reads the Dynamo section copy (Task 7) before Task 13 deploys. It is the only section describing an employer.
- **Hero and about copy** are drafted in Tasks 6 and 9 for him to edit. Spec 13 B5: the final words are his.
