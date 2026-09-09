# Portfolio v2 design: AI engineering repositioning

**Owner:** Rehaan Shaw
**Date:** 2026-09-08
**Status:** Approved, ready for implementation plan
**Repo:** `~/portfolio`
**Supersedes in part:** `PRD.md` (2026-09-03). Sections it reverses are listed
in section 4, with reasoning, so they are not re-litigated later.

---

## 1. Why v2 exists

v1 shipped and is live at `rehaanshaw.vercel.app`. It targets one buyer: a SWE
internship recruiter. Two things have changed since it was written.

**Rehaan is now looking at AI engineering roles as well as SWE internships.**
The site names neither AI work nor AI roles anywhere.

**The strongest available evidence was never on the site.** It was sitting in
`~/life-brain` and `~/spotterai/docs` the whole time:

- He is **paid** to author Terminal-Bench 2 tasks and their graders, built to
  break AI coding agents (Handshake AI, Project Dynamo, since 2026-08).
- SpotterAI's evaluator has a **real measured benchmark**, not the illustrative
  run the site currently shows: 14 checks, 23 red-team cases, 18 of 18 risky
  plans caught, 0 safe plans falsely flagged.
- Two **finished public essays** exist, one of which documents his own evaluator
  failing.
- `docs/rubric-sources.md` grades the evidence behind every threshold and marks
  one of his own checks **Contradicted**, citing a systematic review against his
  own stated rationale.
- **79 units at Pasadena City College, 3.78 GPA**, spring 2025 to spring 2026,
  starting months after moving back from Thailand.

v2 is still a packaging problem, not a building problem. The work exists. More of
it exists than the site admits.

## 2. Positioning

The sentence v2 has to earn:

> Most candidates applying to AI roles have called an API. Rehaan builds the
> graders.

The same idea appears three times at three levels of stakes, which is what makes
it a position rather than a claim:

| Level | Artifact | What it proves |
|---|---|---|
| Paid | Terminal-Bench 2 tasks and graders that break coding agents | Someone pays him to do this |
| Solo product | SpotterAI's deterministic evaluator, 14 checks, public red-team page | He does it unsupervised, end to end |
| Public writing | An essay about his own evaluator missing a bug he caught in ten seconds | He is honest about it when it fails |

This serves both target audiences without splitting the page. AI engineering
reviewers read it as verification and evals, which is the discipline they hire
for. SWE reviewers read it as engineering judgment, which is what they screen
for. Nothing has to be said twice.

## 3. Audience

**Primary A:** AI engineering recruiters and engineers, Summer 2027 internships.
Reading for evidence the candidate can make a nondeterministic system
trustworthy, and can measure whether it worked.

**Primary B:** SWE internship recruiters, Summer 2027. Reading for graduation
year, target term, work authorization, and one piece of evidence the candidate
is not exaggerating.

**Secondary:** an engineer who gets the link forwarded and reads one project
page closely, looking for judgment.

Both primaries are served by the same home page. The screening facts line
carries both role types so neither filter rejects him.

## 4. Decisions reversed from PRD v1

Recorded with reasoning, per operating principle 3.

**4.1 One combined `/work` page becomes per-project pages.**
v1 chose a single `/work` page on the grounds that five thin pages read worse
than one edited document. Reversed at Rehaan's request. It now also has an
independent justification: v2 adds substantially more depth per project, and a
per-project URL is separately linkable in an application, a cold email, or a
referral, which the anchor approach only half achieved.

**4.2 The writing section moves from Phase 2 into v1.**
v1 listed a writing section as a non-goal with the explicit unlock condition
"once there are two finished pieces to launch it with." Two finished pieces now
exist. This is the condition firing, not scope creep.

**4.3 Contract availability stays off, but the paid AI work goes on.**
v1 cut contract availability because selling to two buyers convinces neither.
That still holds for GMA Creative House, which stays framed as evidence rather
than as an offer. The Handshake AI work is different: it is not an availability
pitch, it is the strongest credential on the page.

**4.4 Tailwind Play CDN is removed.**
Not a v1 decision so much as a v1 shortcut. See section 6.

**4.5 GPA is stated.**
v1 did not address it. 3.78 from PCC across 79 units is stated. The grade
breakdown behind it is not, because a breakdown invites subtraction while the
GPA and unit count do the work.

## 5. Information architecture

```
/                             home, the pitch
/work/dynamo                  Terminal-Bench task authoring (Handshake AI)
/work/spotterai               AI fitness copilot + deterministic evaluator
/work/hearth                  room planner, constraint solver
/work/transfer-navigator      ASSIST articulation planner
/work/woven-hymns             Kashmiri pashmina exhibition
/work/gma-creative            paid contract work
/writing                      index, two essays
/writing/evaluator-bug        "An evaluator that couldn't catch its own bug"
/writing/grading-the-model    "Grading the model"
/resume.pdf                   static file
```

`/work` itself redirects to `/#work`. There is no separate work index page; the
home page's selected-work section is the index. One less page to keep true.

## 6. Technical direction

**6.1 The Tailwind CDN has to go.** `site/index.html` loads
`https://cdn.tailwindcss.com`, which is Tailwind's in-browser JIT compiler. It
ships roughly 400KB of JavaScript, blocks first paint until it compiles, prints
a "should not be used in production" warning into the console of anyone who opens
devtools, and means the page renders completely unstyled with JavaScript
disabled. That breaks three of v1's own success criteria: Lighthouse 95 or
higher, LCP under 1.5s, and no-JS readability. On a portfolio being read by
engineers, the console warning is its own small negative signal.

**6.2 Stack: Next.js 15 App Router, TypeScript, Tailwind v4, static export.**
This is what the v1 PRD specified before the build diverged to a single hand
written file. Reasons it is now clearly correct rather than merely planned:
eleven pages need a shared shell, per-project pages need to render from one data
file, and Tailwind needs a real build step regardless. It also matches Hearth,
Transfer Navigator and Woven Hymns, so there is no new toolchain, and the public
repo of a candidate targeting engineering roles should not be one 148KB HTML
file with a CDN compiler in it.

**6.3 The Lumina visual language is preserved exactly.** The migration is a port,
not a redesign. Existing markup, keyframes, easing curve (`--ease-lumina`), type
scale and the Geist / Geist Mono / Inter stack all carry over. Fonts move to
`next/font` so they are self-hosted rather than round-tripping to Google.

**6.4 Data model.** `src/content/projects.ts` holds every project as one typed
record. Home cards, project pages, and metadata all render from it. Adding a
project means editing one file, which was v1 criterion 7 and is now actually
achievable. `src/content/essays.ts` does the same for writing.

**6.5 Essays.** The two markdown files in `~/spotterai/docs` are copied into the
portfolio repo and rendered as real pages in the site's design language. They are
not linked out to GitHub. A recruiter should never have to look at raw markdown
in a repo browser to read the best thing you have written. The copies are
snapshots; the SpotterAI repo keeps its originals.

**6.6 Local development.** Production build plus `next start`, never `next dev`,
which hangs on this machine. The existing `portfolio` entry in
`~/.claude/launch.json` is repointed at the built output.

**6.7 The unicornStudio WebGL background** currently loaded from jsDelivr is
reviewed during the port. It stays only if it costs nothing on the Lighthouse
run and degrades cleanly. It is decoration, and it does not get to hurt LCP.

## 7. Home page spec

Sections in order. Changes from v1 are marked.

**7.1 Header.** Unchanged, except the resume link resolves.

**7.2 Hero.** [CHANGED]
Keep the existing headline, "I build software that has to be trusted, not just
demoed." It was written before this repositioning and it is already the thesis.

The sub-paragraph gains the paid work. Screening facts line becomes:

`UCI CS '28 · Summer 2027 SWE or AI engineering internship · Irvine, CA · US citizen`

Numbers strip keeps 5 products, 479 commits since June, $0 infrastructure.

**7.3 What I'm paid to do.** [NEW]
Placed above SpotterAI, because it is the only item on the page someone pays for.

Content: he authors Terminal-Bench 2 tasks, which are exams for AI coding agents.
A task is a Dockerfile that builds a broken world, an instruction file, a test
suite, and a reference solution that proves the task is solvable. He also writes
the grader.

The visual is the red/green validity loop, which is real, and photogenic, and is
the actual proof of correctness for a task: tests must fail on the untouched
container, and pass after the reference solution runs. Red first proves the task
is not accidentally already solved. Green after proves it is solvable and the
grader recognises a correct answer.

Two disciplines named, because they are the transferable judgment:

- **The coherent contract.** Every numbered line in the instruction exists
  because a test checks it. A grader asserting something the instruction never
  stated fails the model for a reason it could not have anticipated.
- **The generalisation test.** Without one, an agent passes a parsing task by
  printing the expected answer. The test swaps the input underneath and demands
  the right result on data the agent never saw.

**Scope limit, deliberate.** The section describes the discipline and the
process. It publishes no task he authored for the client, no instruction text, no
Dockerfile, and no grader source. Those are client work product. Rehaan has
confirmed nothing contractual restricts him working elsewhere; that is a
different question from publishing deliverables, and the conservative line costs
nothing here because the discipline is the impressive part, not the assets.

**7.4 SpotterAI hero.** [CHANGED]
Replace the illustrative evaluator run with the measured benchmark from
`docs/grading-the-model.md`:

| Metric | Value |
|---|---|
| Deterministic checks | 14 |
| Red-team cases | 23 |
| Risky plans caught | 18 / 18 |
| Safe plans incorrectly flagged | 0 |
| LLM calls in the audit | 0 |

Plus the fact that the benchmark fails the build when it regresses. An
illustration shows what a thing looks like. A benchmark shows that it works.

**7.5 The hard part.** Kept close to as-is. It is the best-written section on the
current site. One addition: the `Contradicted` grade. He wrote a document
grading the evidence behind his own thresholds, and it caught one of his own
checks making an injury claim a systematic review does not support. He removed
the claim and kept the check. Very few engineers at any level publish the thing
that proves them wrong.

**7.6 Selected work.** [CHANGED] Five cards, one per solo or client project.
Each links to its own page rather than to an anchor. Dynamo is deliberately not
a sixth card: it already has the dedicated section at 7.3, and that section
carries the link to `/work/dynamo`. Listing it twice on one page would read as
padding and would dilute the one item that is genuinely different from the rest.

**7.7 How I work.** [NEW]
Artifacts, not tool talk. The claim is not "I am fast with AI." The claim is
"I put gates around it, and here are the gates, committed."

Shown as a pipeline with a real file behind each stage:

```
spec  →  plan  →  build  →  review  →  evals in CI
```

- Specs and implementation plans committed before code, in
  `docs/superpowers/specs/` and `docs/superpowers/plans/`
- Thresholds cited and evidence-graded in `docs/rubric-sources.md`
- 78 test files and 2 eval suites, run on every change
- A public red-team page so strangers can attack the system
- A benchmark that fails the build on regression

Claude Code is named once, as the tool. The section is about the verification
around it. This is the framing decision from the design conversation: an
AI-engineering reviewer sees someone who instruments his own work, and a
traditional SWE reviewer sees process discipline, and neither reads it as "the
AI wrote it."

**7.8 Writing.** [NEW]
Two essay cards, each with a title, one line on what it argues, and a pull quote.

- *An evaluator that couldn't catch its own bug.* He built a system to audit AI
  output, ran a plan through it that he could see was bad within ten seconds,
  and it passed. Pull quote: **"It said the plan was fine."**
- *Grading the model.* How the audit works, what the benchmark measures, and why
  the grader is code rather than a second model. Pull quote: **"A vibe cannot go
  in CI."**

**7.9 The path.** [NEW, replaces part of About]
The PCC depth. A horizontal timeline:

`Thailand → Dec 2024, moved to the US → Spring 2025, started PCC → Spring 2026,
79 units at 3.78 → Fall 2026, UCI CS junior → June 2028, BS Computer Science`

79 units across four terms is the fact that lands, and it is currently nowhere on
the site. Fall 2026 courses are named to show current standing: CS 122A Data
Management, STATS 67 Probability and Statistics for CS, SWE 43 Software
Engineering.

**7.10 About.** [TRIMMED] Keeps the 50 lb sentence and why SpotterAI exists. The
biography moves to 7.9 so About is only the motivation.

**7.11 Contact and footer.** [CHANGED] Availability line names both role types.

## 8. Project page template

One template, six pages, identical field order. The identical template is what
makes them read as an edited body of work rather than six one-offs.

1. **Title, status, dates**
2. **What it is.** One sentence.
3. **The hero artifact.** One visual per project, specified in section 9.
4. **The constraint.** What made it non-trivial.
5. **The hard part.** The technical center.
6. **What I decided and why.** The judgment call. The field an engineer reads.
7. **What it cost me.** [NEW] The tradeoff accepted, stated plainly. v1 buried
   this inside field 6. Separating it is the difference between a decision and a
   defence of a decision.
8. **Stack.** Mono.
9. **Numbers.** Commits, active days, test files, all traceable.
10. **Links.** Live, source, and related essays where they exist.

Existing v1 copy for the five original projects is already written to fields 2
and 4 through 6 and carries over. v2 adds field 3, field 7, and the Dynamo page.

## 9. What makes each page impressive

Per-project pages fail when they are prose with a screenshot. Each page gets one
visual artifact built from real data, matching the standard the current home page
already sets.

| Page | Hero artifact |
|---|---|
| Dynamo | The red/green validation loop. Tests failing on the untouched container, passing after the reference solution |
| SpotterAI | The 14-check rubric table with real thresholds, and the benchmark scoreboard |
| Hearth | The solver's own explanation next to the layout it produced, showing the sentence is derived from the rule that caused it |
| Transfer Navigator | The ASSIST hostile-dependency diagram: XSRF handshake, 50 calls per 5 minutes, no CORS, server hop, PDF fallback |
| Woven Hymns | The eight-stage narrative structure as a sequence |
| GMA Creative | The billed hours log, which is the proof, since there is no public link |

## 10. Success criteria

Carried from v1 and extended. Checked before deploy.

1. **The 30-second test**, now with two readers. A recruiter can state
   graduation year, target term, and both role types. An AI engineer can state
   what he builds and name one piece of evidence.
2. **One-click resume from any scroll position on any page**, and `/resume.pdf`
   returns 200. It currently returns 404, which is the most damaging live defect
   on the site.
3. **Lighthouse 95 or higher**, all four categories, mobile, on the home page and
   at least two project pages.
4. **LCP under 1.5s** on simulated 4G.
5. **No-JS readable.** Every word renders with JavaScript disabled. This
   currently fails outright because of the Tailwind CDN.
6. **Zero dead links**, checked across every internal and outbound URL.
7. **Adding a project means editing `projects.ts` and nothing else.**
8. **Every number on the site traces to section 11.** No claim ships that cannot
   be pointed at a file or a note.

## 11. Facts and their sources

Every factual claim on the site, with where it comes from. Operating principle 2:
nothing ships that cannot be traced.

| Claim | Source |
|---|---|
| 334 commits, SpotterAI | `git -C ~/spotterai log`, verified 2026-09-08 |
| 78 test files, SpotterAI | `find ~/spotterai/test ~/spotterai/integration`, verified 2026-09-08 |
| 2 eval suites | `eval.mjs` + `eval-suite.js`, `eval-nutrition.mjs` + `nutrition-eval-suite.js` |
| 14 checks, 23 red-team cases, 18/18 caught, 0 false flags | `~/spotterai/docs/grading-the-model.md` |
| One threshold graded Contradicted | `~/spotterai/docs/rubric-sources.md` |
| 46 commits, Hearth | `git -C ~/hearth log`, verified 2026-09-08 |
| 63 commits, Transfer Navigator | `git -C ~/transfer-navigator log`, verified 2026-09-08 |
| 36 commits, Woven Hymns | `git -C ~/woven-hymns log`, verified 2026-09-08 |
| 479 commits since June | Sum of the four project repos: SpotterAI 334, Transfer Navigator 63, Hearth 46, Woven Hymns 36. Hearth and Woven Hymns are private repos, so this number is stated but not independently verifiable by a reader |
| 79 units, 3.78 GPA at PCC | Rehaan_Shaw_CS_Resume, Google Doc, modified 2026-09-02; GPA confirmed by Rehaan 2026-09-08 |
| Dean's Honors, Spring 2025 and Fall 2025 | Rehaan_Shaw_CS_Resume, verified 2026-09-08 |
| Honors Program, A.A.S. Computer Science, Jan 2025 to Jun 2026 | Rehaan_Shaw_CS_Resume, verified 2026-09-08 |
| Secretary, AI and Machine Learning Club at PCC, Mar 2025 to Jun 2026 | Rehaan_Shaw_CS_Resume, verified 2026-09-08 |
| SpotterAI custom domain spotterai.xyz | Live, 200 verified 2026-09-08; also cited on the resume |
| Moved from Thailand Dec 2024 | `~/life-brain/context/me.md` |
| UCI CS, 12 units fall 2026, expected June 2028 | `~/life-brain/school/courses/fall-2026-schedule.md` |
| Terminal-Bench 2 task authoring, Handshake AI | `~/life-brain/brain/notes/2026-08-05_terminal-bench-task-authoring.md` |
| ASSIST: XSRF, ~50 calls / 5 min / IP, no CORS | Transfer Navigator implementation, memory `assist-org-api` |
| 50 lbs in 6 months | `~/life-brain/context/me.md` |
| $0 infrastructure | Free tiers across all deployments, by design |

## 12. Non-goals

- A blog beyond the two finished essays. Two real pieces is a writing section.
  Three headings and a "coming soon" is not.
- CMS, admin, contact form, analytics, light/dark toggle, custom domain, i18n.
- hasta-agosto. Private, noindexed, personal.
- Publishing any Handshake client deliverable. See 7.3.
- Grade breakdown beyond the GPA.
- Motion beyond the existing Lumina fades. No scroll-jacking, no parallax.
- Rewriting v1 copy that already works. The hard-part section and the five
  project write-ups are good and stay close to as-is.

## 13. Open items

- **B1. Resume PDF.** Required at `public/resume.pdf`. Blocks criterion 2 and is
  the only item currently broken in production. Rehaan supplies the file.
- **B2. Project screenshots.** One per project page. Existing SpotterAI captures
  are already in `~/spotterai/docs` (7 screenshots). Hearth, Transfer Navigator
  and Woven Hymns need one each.
- **B3. Dynamo page copy review.** Rehaan reads section 7.3 as written before
  deploy, since it is the only section describing an employer.

None of these block starting the implementation. B1 blocks the deploy.

**Sequencing note.** The `/resume.pdf` 404 is live right now and is the single
most likely recruiter action on the site. It does not wait for the migration. As
soon as B1 lands, the PDF is dropped into the current static site and deployed as
its own change. The rest of v2 proceeds independently.

## 14. What this site still cannot do

Unchanged from v1 and worth restating. FAANG internship outcomes are decided
mostly by online assessment performance, referrals, and application timing. This
site does not affect the online assessment. Where v2 moves the needle further
than v1: AI engineering roles at startups and mid-size companies are evaluated by
an individual reading your work, and this version gives that individual
substantially more to read. The timing point in
`~/life-brain/career/faang-2027-gap.md` still governs. Requisitions opening now
matter more than the site being finished.
