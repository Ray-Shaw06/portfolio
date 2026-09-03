# Portfolio Site PRD

**Owner:** Rehaan Shaw
**Date:** 2026-09-03
**Status:** Approved design, ready for implementation plan
**Repo:** `~/portfolio`

---

## 1. Why this exists

Five shipped projects currently live only as GitHub repos and scattered Vercel
subdomains. A recruiter or hiring engineer who hears the name "Rehaan Shaw" has
no single link that answers, in one screen, who he is and whether he can build.
This site is that link: the URL that goes on a resume, in a cold email, in a
LinkedIn headline, and in a referral message.

It is a packaging problem, not a building problem. The work already exists. The
site's only job is to make the work legible to someone who will give it
30 seconds.

## 2. Audience

**Primary:** SWE internship recruiters and hiring engineers evaluating Rehaan for
Summer 2027 internships.

**Reading pattern to design against:** a recruiter skims for under a minute,
looking for graduation year, target term, work authorization, and one piece of
evidence that the candidate is not exaggerating. An engineer who gets forwarded
the link reads one project closely and looks for judgment.

Two readers, two depths. The home page serves the 30-second skim. `/work` serves
the engineer who clicks.

**Not the audience:** freelance clients, other students, grad school admissions.
Contract availability is deliberately absent from this version.

## 3. Positioning

One sentence the site has to earn:

> A junior CS student who ships production software alone and thinks about
> reliability like an engineer, not a student.

Every section either supports that sentence or gets cut. The strongest available
evidence for it is SpotterAI's deterministic safety evaluator, so that gets the
most prominent placement on the site.

## 4. Success criteria

Measurable, and checked before launch:

1. **The 30-second test.** A reader who has never met Rehaan can state his
   graduation year, his target internship term, and the technical substance of
   one project after 30 seconds on the home page. Verified by asking three
   people who are not involved in building the site.
2. **One-click resume.** The resume PDF is reachable in one click from any
   scroll position on any page.
3. **Lighthouse 95 or higher** on all four categories, mobile profile, on both
   routes.
4. **LCP under 1.5s** on a simulated 4G connection.
5. **No-JS readable.** Every word of text content renders with JavaScript
   disabled. Only the embedded demo and the video loop degrade.
6. **Zero dead links.** A link check passes against every outbound link,
   including all live demos, as a pre-commit or CI step.
7. **Adding a sixth project requires editing one data file** and no layout or
   component work.

## 5. Non-goals

Explicitly out of scope for v1. Listed so they do not creep in:

- Blog or writing section. An empty blog reads worse than no blog.
- CMS or admin interface.
- Contact form. Email link only, no backend, no spam surface.
- Analytics.
- Manual light/dark toggle. System preference only.
- Custom domain.
- hasta-agosto. It is password-gated, noindexed, and personal.
- Motion beyond short fades. No scroll-jacking, no parallax, no cursor effects.
- Internationalization.

## 6. Information architecture

Two routes and one static file. Nothing else.

| Route | Purpose |
|---|---|
| `/` | The pitch. SpotterAI hero, three secondary projects, about, contact. |
| `/work` | All five projects at medium depth on one page, anchor-linked. |
| `/resume.pdf` | Direct download, no interstitial page. |

`/work` uses anchors (`/work#hearth`) so home page cards and outbound links can
deep-link to a specific project.

## 7. Home page spec

Sections in order.

### 7.1 Header

- Name, set in display type.
- One identity line: what he does, in his own words, one sentence.
- A screening-facts line set in mono, small, quiet: `UCI CS '28 · Seeking
  Summer 2027 SWE internship · Irvine, CA · US citizen`. This exists because
  recruiters filter on exactly these four fields, and making them hunt for them
  is a reason to close the tab.
- Links, right-aligned on desktop: Email, GitHub, LinkedIn, Resume.

### 7.2 SpotterAI hero

The most important 600 pixels on the site. Four proof layers, stacked so that no
single failure blanks the section:

1. **Claim line.** One sentence naming what SpotterAI is and the one hard thing
   about it.
2. **Media.** A 10 to 15 second silent screen capture of the real flow, looping,
   `muted` + `playsinline` + `loop`, with a static screenshot as the `poster`.
   The poster is what a reader sees if the video fails, is still loading, or if
   `prefers-reduced-motion` is set, in which case the video does not autoplay
   at all.
3. **Numbers strip**, set in mono: 101 commits in the first 10 active dev days,
   4 serverless functions, ~27 test files plus an eval suite, $0 infrastructure
   cost by design.
4. **Actions.** Primary button to the live app, secondary to the repo, and a
   third control labeled "Load interactive demo."

**The click-to-load embed is a requirement, not an optimization.** The iframe
must not mount on page load. It mounts only when the reader activates that
control. Rationale: a cold serverless start or a transient outage on
spotterai.vercel.app would otherwise greet a recruiter with an empty rectangle
at the top of the page, which is worse than no embed at all. On activation, show
a loading state, and on failure fall back to a message pointing at the live app.

### 7.3 "The hard part"

Four sentences, plain prose, on the deterministic safety evaluator: Gemini
generates the plan, a pure-code evaluator audits it, output is flags-first, and
the red-team Safety Lab page is public so anyone can try to break it.

This is the highest-value paragraph on the site for a hiring engineer, because it
is Rehaan reasoning about how to make a nondeterministic system trustworthy. It
is set apart visually from the marketing copy above it.

### 7.4 Selected work

Three cards: Hearth, Transfer Navigator, and client work. Each card carries a
project name, a one-line description, a stack line in mono, and a link into the
matching `/work` anchor. Cards do not link to live demos directly; the point of
a card is to get the reader onto `/work`.

### 7.5 About

Short, in his own voice, and the only personal content on the site. Includes the
50-lb transformation as a single sentence with no further detail and no photos:
lost 50 lbs in six months, which is why SpotterAI exists. The rest is why he
builds what he builds.

### 7.6 Footer

Contact links repeated, plus a line noting the site's own repo is public.

## 8. `/work` page spec

One page, five entries, anchor-linked, every entry on an identical template. The
identical template is what makes the page read as an edited document rather than
a pile of screenshots, and it is what makes criterion 4.7 achievable.

**Entry template, same seven fields in the same order every time:**

1. **What it is.** One sentence.
2. **The constraint.** What made it non-trivial.
3. **The hard part.** The technical center of the project.
4. **What I decided and why.** The judgment call. This field is the reason an
   engineer keeps reading.
5. **Stack.** Mono, comma-separated.
6. **Links.** Live, repo.
7. **Status.** Shipped, live, in progress, or archived, with a date.

**Entries, in order:**

**SpotterAI.** AI fitness copilot. Gemini-generated training plans audited by a
deterministic, pure-code safety evaluator, flags-first output, public red-team
Safety Lab page. MIT licensed. Stack: Next.js, Firebase Admin, Vercel serverless
functions, Vercel Analytics. The decision to write up: why the evaluator is pure
code rather than a second model call.

**Hearth.** Room planner that arranges a room three ways from two numbers,
explains in plain English why each arrangement works, renders it in draggable 3D,
and prices what is missing. Not a shopping app and not a drawing tool: a
constraint solver with an opinion, and the opinion lives in one file you can
argue with. Stack: Next.js, React, Sentry. Live at
hearth-theta-eight.vercel.app. The decision to write up: pinning the engine
contract in a single file so the solver's opinion is auditable.

**Transfer Navigator.** Reads ASSIST articulation agreements and builds a real
transfer route: which courses, which term, and whether the target term is
reachable. Tick off completed courses and the plan recomputes. Stack: Next.js,
React, pdfjs-dist, ASSIST JSON API. The decision to write up: the ASSIST API is
undocumented, requires an XSRF handshake, rate-limits to 50 calls per 5 minutes
per IP, and sends no CORS headers, so every call goes through a server hop, with
a PDF parse as the fallback when the API has no agreement. This is the entry
that best demonstrates working against a hostile external dependency.

**Woven Hymns.** Story-first exhibition preview on Kashmiri pashmina: an
introduction to Kashmir, a shawl followed through eight text-led stages, four
textile terms explained, and four gallery studies referencing Met Open Access.
Built for the family shawl business, shipped on GitHub Pages. Stack: Next.js,
React, lucide-react. The decision to write up: text-led over image-led, because
the client had no photography budget.

**GMA Creative House.** Ongoing paid contract work, weekly website tasks for a
creative studio, billed hourly. Stack: HTML, CSS, JavaScript. Proof that someone
who is not related to the outcome pays for his work. No live client link, since
client sites are the client's to publicize.

## 9. Visual system

The direction is editorial structure, product screenshots as the primary visual,
and mono type used functionally rather than as a full terminal theme. A literal
three-way blend of showcase, terminal, and editorial reads as muddled, so each
influence is assigned a specific job:

**Type, three roles.**
- Display: a high-contrast face for the name and section headings. Editorial.
- Body: a grotesque, set to roughly 66 characters per line.
- Mono: labels, metrics, stack lines, file paths, and the screening-facts line.
  Mono never appears in headings.

**Color.** Light ground, near-black text, one accent used for links and the
primary action only. Dark mode via `prefers-color-scheme`, no toggle. Mono blocks
sit on a faintly tinted panel so machine content reads as machine content. This
is where the terminal influence lands, and it stays out of the display type where
it would look like every other developer portfolio.

**Layout.** 12-column grid with deliberate asymmetry: media runs wide, text runs
narrow. Generous vertical rhythm. Hairline rules separate sections instead of
cards-on-grey.

**Motion.** Short opacity fades on scroll entry, nothing else. Everything honors
`prefers-reduced-motion`, including the hero loop, which does not autoplay when
reduced motion is requested.

## 10. Technical spec

**Stack:** Next.js 15 App Router, TypeScript, Tailwind. Statically rendered.

**Rationale:** identical to Hearth, Transfer Navigator, and SpotterAI, so there
is no new build configuration to learn, the existing prod-build preview pattern
in `~/.claude/launch.json` applies unchanged, and Hearth's type and spacing
tokens can be lifted directly. Astro would ship marginally less JavaScript, but
the difference on a statically rendered two-route site is milliseconds against a
new toolchain. A single hand-written HTML file would lose the shared project
component that criterion 4.7 depends on.

**Local development:** production build plus `next start`, never `next dev`.
`next dev` hangs on this machine. Preview runs through `~/.claude/launch.json`,
which means a rebuild is required to see a change.

**Hosting:** Vercel free tier, `*.vercel.app` subdomain. A custom domain is a
phase-2 swap that touches no code.

**Data model:** all five projects live in one typed file, `src/content/projects.ts`,
exporting an array shaped to the seven-field template in section 8. Home page
cards and `/work` entries both render from it. Nothing about a project is
hardcoded into a component.

**Assets:** video served as an optimized MP4 with a WebM alternate, lazy-loaded,
under 2 MB. Screenshots go through `next/image`. The resume PDF is a static file
in `public/`.

**Accessibility:** semantic heading order with no skipped levels, real alt text on
every image, full keyboard navigation with a visible focus ring, the video loop
marked decorative, and the click-to-load embed operable by keyboard.

**Quality gates:** typecheck, lint, a link check across every outbound URL, and a
Lighthouse run against both routes. All four pass before any deploy.

## 11. Blockers

Content and asset inputs required before the build can be completed. Everything
else can proceed in parallel.

- **B1. Resume PDF.** The file to place at `public/resume.pdf`.
- **B2. SpotterAI screen capture.** 10 to 15 seconds, silent, showing the real
  plan-generation flow, plus a still frame from it for the poster.
- **B3. Project screenshots.** One each for SpotterAI, Hearth, Transfer
  Navigator, and Woven Hymns. GMA Creative work needs no screenshot since no
  client link is published.
- **B4. Two live URLs.** The deployed URL for Transfer Navigator, and the exact
  GitHub Pages path for Woven Hymns under `ray-shaw06.github.io`. Confirmed
  already: `spotterai.vercel.app` and `hearth-theta-eight.vercel.app`.
- **B5. Identity line and about copy.** Two short pieces in Rehaan's own voice.
  A draft can be written for him to edit, but the final words are his.

Confirmed inputs, no action needed: GitHub `Ray-Shaw06`, LinkedIn
`linkedin.com/in/rehaanshaw`, email `rehaanshaw@gmail.com`, UCI CS expected
June 2028, target term Summer 2027, Irvine CA, US citizen.

## 12. Phase 2

Ordered by expected value, not by effort:

1. Custom domain.
2. A writing section, once there are two finished pieces to launch it with.
3. An OG image per project so shared links preview well.
4. A second hero-quality project, once one exists that beats SpotterAI.

## 13. Decisions log

Choices made during design, recorded so they are not relitigated:

- **Recruiter-first, not dual-audience.** Contract availability is left off
  entirely. A page that sells to two buyers convinces neither.
- **One combined `/work` page, not per-project case studies.** Five projects at
  medium depth on one scroll beats five thin pages, and it is one file to
  maintain.
- **SpotterAI alone above the fold.** Three heroes is no hero.
- **Free subdomain now.** The domain adds polish, not information, and swapping
  it in later costs nothing.
- **Screening facts stated explicitly.** Initially left out, added back because
  graduation year and internship term are the two fields every recruiter filter
  uses first.
- **The click-to-load embed over an always-on iframe.** Impressiveness is not
  worth a blank box in front of a recruiter.
- **50-lb story at headline length only.** One sentence, no numbers beyond the
  headline, no photos.
- **hasta-agosto excluded.** Private, noindexed, and a personal gift.
- **Graduation year is 2028.** Junior transfer entering fall 2026, senior year
  2027-28. This makes Summer 2027 the standard junior-year SWE intern cycle, the
  one that converts to full-time offers, not an exploratory first-year program.

## 14. What this site cannot do

Stated plainly so the site is not mistaken for a strategy. FAANG internship
outcomes are decided mostly by online assessment performance, referrals, and
application timing. A portfolio site is a supporting asset: it converts recruiter
outreach, earns referrals from people who need something to forward, and carries
real weight at startups and mid-size companies. It is not the lever that clears a
FAANG loop. The separate gap analysis at
`~/life-brain/career/faang-2027-gap.md` covers what is.
