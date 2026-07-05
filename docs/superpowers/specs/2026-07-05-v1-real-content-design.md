# v1 — Real-content adaptation design

**Date:** 2026-07-05
**Base:** `v1/` (field/sweep canvas hero, terminal compiler, amber `#FCB813`, Sora/Geist)
**Branch:** `feat/real-content` — edit v1 in place; original recoverable via git.

## Goal

Replace v1's invented marketing content with the actual flowx.ai homepage content
(fetched and verified 2026-07-05), while keeping v1's aesthetics, illustration
style, and interactive devices completely intact. Add real-site sections v1 is
missing, rendered in v1's visual language.

**Not goals:** no visual redesign, no framework change, no new pages. Single
`index.html` + existing `src/` modules, as today.

## Why

v1's copy is almost entirely invented: the Proof stats (6.4 wks, 2.7M/day,
97.3% STP), the four "why pilots die" reasons, the platform claims, and the
footer offices don't come from the real site — and v1 never mentions the
220+ agents, the real site's central claim.

## Verified source content (flowx.ai, 2026-07-05)

Quotes marked *(verbatim)* were extracted word-for-word; everything else is
structure/stats confirmed across two fetches.

- **Hero** *(verbatim)*: "Deploy Banking, Insurance, and Logistics AI Agents in
  Weeks, Proven in Production" / "Accelerate mission-critical value streams:
  onboarding, lending, underwriting, claims, retention, quoting, track & trace,
  and more." / "Over 220 enterprise-ready AI agents or build your own. Ready to
  plug into your legacy systems. AI for regulated industries."
- **95% section** *(verbatim)*: "95% of AI initiatives do fail. Be in the 5%
  that succeed" / "The biggest challenge in deploying AI Agents in
  mission-critical value streams is not building agents, but inadequacy in data
  access, integrations, process flows and more."
- **Stats:** 80% of manual handoffs in lending automated · 40% lower operational
  cost for lending · 65% reduction in underwriting processing time · 62%
  reduction in time-to-yes · $1.8M projected annual savings · fund management
  platform built and launched in 8 weeks · 65% decrease in commercial
  onboarding time.
- **Process** *(step names verbatim)*: "Start. Prove ROI. Scale" — We create
  your environment / We connect your systems / We configure and you test /
  Go live and see the impact.
- **Agent categories:** Retail Mortgage Underwriting (9) · Commercial
  Onboarding (7) · Claims Processing (6) · Invoice Reconciliation (4);
  220+ agents, 20 categories.
- **Pillars** *(titles verbatim)*: Easy to Deploy · Plugs Into Your Existing
  Data · Banking-Grade Safety · Impeccable Data Privacy.
- **FAQ questions** (titles only; answers not in static page): Do we have to
  change our core systems? · How fast can we get agents into production? ·
  What level of effort is required? · What's the real cost? · What's the
  timeline?
- **Agent Builder** *(verbatim)*: "Build your own agents with our Agent
  Builder; streamline business flows, reduce human effort and risk" — CTA
  "SEE VIDEO".
- **Testimonials** *(6, verbatim)*:
  1. "FlowX.AI is a business asset, not an IT asset" — COO, Major Custodian Bank
  2. "We now see FlowX.AI as the engine that powers user experiences" — Deputy Director, CEE Bank Group
  3. "I have delivered more functionality in production with FlowX.AI in three months" — Solution Architect, European Bank
  4. "Before FlowX.AI… it would take us a year to launch a new product. Today… 2–4 weeks" — Insurance Executive
  5. "FlowX.AI delivers value, multiple times faster, through its ability to integrate" — CTO, European Insurer
  6. "FlowX.AI is the future of software development" — SVP Technology Architecture & Strategy
- **Final CTA:** "Accelerate mission-critical value streams with our AI agents" —
  "Schedule a customized demo".
- **Footer:** Bucharest — Charles de Gaulle Plaza, Piata Charles de Gaulle 15,
  9th floor, 011857 Bucharest, Romania · Menlo Park — 352 Sharon Park Drive,
  Menlo Park, CA 94025 · Resources: Blog, Documentation, Academy, Support ·
  Legal: Privacy Policy, Cookies, Terms & Conditions · © 2026 FlowX.AI
  Business Systems.

## Section-by-section changes

New order:
`hero → blueprint (Agent Builder) → marquee → why-95% → registry (NEW) → platform → process (NEW) → proof → voices (NEW) → faq (NEW) → cta → footer`

Section numbers (`section__no`) renumber accordingly: 01 hero … 10 cta.

### Kept untouched
Field/sweep canvas + toggle, grain overlay, terminal compiler mechanics,
blueprint compile flow, compliance marquee visual, reveal system (`rv`/`rv-load`),
`prefers-reduced-motion` guards, fonts, tokens.

### 1. Nav
Links become: Agents (`#registry`) · Why FlowX (`#why`) · Platform (`#platform`) ·
Proof (`#proof`) · FAQ (`#faq`). Keep bg toggle, `SOC 2 · ISO 27001` chip,
Book a demo button.

### 2. Hero
- H1 unchanged: "95% of enterprise AI initiatives fail. Be in the 5%."
- Sub becomes real-copy fusion: "Deploy banking, insurance, and logistics AI
  agents in weeks — proven in production. 220+ enterprise-ready agents, or
  build your own, plugged into your legacy systems."
- Eyebrow: "Enterprise AI · AI for regulated industries" (verbatim tagline).
- Terminal hints → real value streams: onboarding · lending · underwriting ·
  claims · retention · quoting · track & trace (pick 3–4 as hint buttons,
  keep hint texts phrased as compiler inputs).

### 3. Blueprint → "Agent Builder"
Retitle `02 / Agent Builder`. Lede echoes verbatim copy: "Build your own agents
with our Agent Builder — streamline business flows, reduce human effort and
risk." Empty-state and compile flow unchanged. Secondary action may link to the
real video page (SEE VIDEO) as a ghost button.

### 4. Why 95% fail
Keep fail→fix row pattern. Lede uses the verbatim "biggest challenge" sentence.
Rows become:
1. data access · inadequate → FLOWX fix line
2. integrations · missing → FLOWX fix line
3. process flows · broken → FLOWX fix line
4. differentiator row: 10+ years shipping AI in regulated production
Fix lines written in v1's voice, grounded in real claims (legacy untouched,
weeks not quarters, audit built in).

### 5. NEW — Registry (`#registry`)
Mono table in the audit-log visual language. Header line: `220+ agents · 20
categories`. Rows: the four real stacks with agent counts and 2–3-word
capability notes. Final row: "your stack — compile it above ↑" linking to
`#term`/`#blueprint`. Reveal-animated like other sections.

### 6. Platform → four real pillars
Keep all four cell visuals; realign headers/copy:
- Audit-log cell → **Banking-Grade Safety** (audit trail copy)
- Guardrails cell → **Easy to Deploy** (list repurposed as go-live checklist:
  env provisioned / systems connected / configured & tested / live)
- Perimeter cell → **Impeccable Data Privacy** (copy stays close to current)
- Router cell → **Plugs Into Your Existing Data** (fan-out targets change from
  model names to `core-banking / mainframe / document-store` — generic, no
  vendor names)

### 7. NEW — Process (`#process`)
"Start. Prove ROI. Scale" — four verbatim steps as numbered mono rows
(same row grammar as why-section), each with a one-line description in v1's
voice grounded in real claims.

### 8. Proof → real numbers
Replace all four invented stats with six real ones (keep count-up animation,
`data-count`/`data-dec` API):
80 % handoffs automated · −40 % lending op cost · −65 % underwriting processing
time · −62 % time-to-yes · $1.8 M projected annual savings · 8 wks to build and
launch a platform. Attribution microcopy in `dd` (e.g. "manual handoffs in
lending flows — in production").

### 9. NEW — Voices (`#voices`)
Six verbatim quotes, mono citations, amber accents, staggered reveals. Layout:
2-column grid on desktop, single column mobile.

### 10. NEW — FAQ (`#faq`)
Five real questions as native `<details>/<summary>` styled to v1 (mono numbers
Q.01–Q.05, amber markers, focus-visible). Answers drafted only from verified
facts, each wrapped in `<!-- DRAFT ANSWER — marketing review required -->`.

### 11. CTA
Keep "Stop piloting. Start deploying." Primary button label → **"Schedule a
customized demo"** (keep mailto). Ghost button → "Compile a blueprint first"
(`#blueprint`). Note line unchanged.

### 12. Footer
- Columns: Platform (Agents/Guardrails/Audit → anchors) · Resources (Blog,
  Documentation, Academy, Support → real flowx.ai URLs) · Legal (Privacy
  Policy, Cookies, Terms & Conditions → real URLs).
- Offices line: "Bucharest · Menlo Park" with the two verbatim addresses in a
  small mono block.
- Base: "© 2026 FlowX.AI Business Systems".

## Implementation notes

- All changes in `v1/index.html` + `v1/src/style.css`; small JS additions in
  `main.js` only if new sections need wiring (reveals are class-driven and
  should just work; count-up already generic).
- New sections reuse existing tokens/classes; new CSS follows the established
  block naming (`.registry`, `.process`, `.voices`, `.faq`).
- Honor `prefers-reduced-motion` for anything animated.
- Marquee compliance badges and the SOC 2/ISO nav chip stay but are flagged
  in-code: `<!-- CLAIMS — verify before publish -->`.
- Illustrative specifics that remain (guardrail policy lines, audit-log demo
  rows, 7-year retention) are dramatization; keep, but avoid presenting as
  customer facts.

## Testing

- `npm run dev` in `v1/`; visual pass on desktop + ~390 px mobile.
- Keyboard: FAQ accordions, terminal, nav anchors; focus-visible everywhere.
- Reduced-motion: reveals and count-ups degrade to static.
- Count-up renders correct final values for all six stats (incl. `$1.8M` and
  `8 wks` formatting).
- `npm run build` passes; do NOT rebuild `docs/v1` until content is approved.

## Open items (flagged, non-blocking)

- FAQ answers and marquee/cert claims need marketing verification.
- "SEE VIDEO" target URL needs the real video link (placeholder `flowx.ai`
  until provided).
