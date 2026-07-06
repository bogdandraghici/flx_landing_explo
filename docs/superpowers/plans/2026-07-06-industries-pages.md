# Industries Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the AI Agents page with three industry pages (Banking, Insurance, Logistics) reached from a CSS-only nav hover dropdown, each expanding its industry's section from `agents.html` into a full page.

**Architecture:** Three new top-level Vite HTML entries sharing one JS entry (`src/industry.js`, generalized from `src/agents.js`) and the existing single stylesheet. The nav is copy-pasted markup per page (repo convention); the dropdown is pure CSS (`:hover` / `:focus-within`). `agents.html` becomes a meta-refresh redirect. Spec: `docs/superpowers/specs/2026-07-06-industries-pages-design.md`.

**Tech Stack:** Vite multi-page build, vanilla ES modules, single CSS file with `:root` tokens. No frameworks, no new dependencies.

## Global Constraints

- Work in `flx_landing_explo/v1/` — run all npm commands from there.
- Brand amber `#FCB813` (`var(--amber)`) is the **only** accent color; use sparingly.
- Use `:root` design tokens from `src/style.css` — no new hardcoded colors.
- All motion honors `prefers-reduced-motion` (`reduceMotion` in JS; the `@media (prefers-reduced-motion: reduce)` block at `src/style.css:1688`).
- Invented copy (not verbatim from flowx.ai) is preceded by `<!-- DRAFT — marketing review -->`.
- Nav/footer are duplicated per page with a `<!-- copied from … — delta: … -->` comment (repo convention).
- Dev server: `npm run dev` → http://localhost:4321 (strict port). Build: `npm run build` must pass.
- Commit after every task on the current branch (`feat/real-content`).
- **Ordering constraint:** Tasks 2–4 copy sections out of `agents.html`; Task 5 guts that file. Do not run Task 5 before Tasks 2–4 are committed.

---

### Task 1: Nav dropdown (CSS + existing pages)

**Files:**
- Modify: `src/style.css` (append after the `.nav__cert` rule, ~line 134; plus one line in the reduced-motion block at ~line 1688)
- Modify: `index.html:26-32`, `about.html:27-31`, `resources.html:27-31`, `blog-flowx-6.html:26-30` (the `<nav class="nav__links">` block on each)

**Interfaces:**
- Produces: the **canonical dropdown nav block** (HTML below) that Tasks 2–4 copy into the new pages, and CSS classes `.nav__drop`, `.nav__droptrigger`, `.nav__menu`, `.nav__menu-panel`.
- Consumes: existing `.nav__links a` styles (13.5px, `--text-dim`), tokens `--bg-raised`, `--line`, `--text`.

- [ ] **Step 1: Add dropdown CSS**

Append to `src/style.css` directly after the `.nav__cert` rule block:

```css
/* Industries dropdown — CSS-only: opens on hover and on keyboard focus-within */
.nav__drop { position: relative; }
.nav__droptrigger {
  font-size: 13.5px;
  color: var(--text-dim);
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
}
.nav__drop:hover .nav__droptrigger,
.nav__drop:focus-within .nav__droptrigger,
.nav__drop:has(a[aria-current="page"]) .nav__droptrigger { color: var(--text); }
.nav__menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 18px; /* invisible bridge so the pointer can travel to the panel */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}
.nav__drop:hover .nav__menu,
.nav__drop:focus-within .nav__menu { opacity: 1; visibility: visible; }
.nav__menu-panel {
  display: grid;
  min-width: 168px;
  padding: 8px;
  background: var(--bg-raised);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}
.nav__menu a {
  font-size: 13.5px;
  color: var(--text-dim);
  padding: 8px 12px;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}
.nav__menu a:hover { color: var(--text); background: rgba(255, 255, 255, 0.05); }
.nav__menu a[aria-current="page"] { color: var(--text); }
```

Inside the existing `@media (prefers-reduced-motion: reduce)` block (`src/style.css:1688`), add:

```css
  .nav__menu { transition: none; }
```

- [ ] **Step 2: Replace the nav links block on the 4 existing pages**

This is the **canonical nav block** (used verbatim on every page from now on; only `aria-current` placement varies per page). On `index.html`, `about.html`, `resources.html`, `blog-flowx-6.html`, replace the current `<nav class="nav__links" …>…</nav>` (which holds the "AI Agents" link and the disabled Industries link) with:

```html
      <nav class="nav__links" aria-label="Primary">
        <!-- Industries dropdown is CSS-only (hover / focus-within); no aria-expanded — no JS to sync it -->
        <div class="nav__drop">
          <button class="nav__droptrigger" type="button" aria-haspopup="true">Industries</button>
          <div class="nav__menu">
            <div class="nav__menu-panel">
              <a href="./banking.html">Banking</a>
              <a href="./insurance.html">Insurance</a>
              <a href="./logistics.html">Logistics</a>
            </div>
          </div>
        </div>
        <a href="./resources.html">Resources</a>
        <a href="./about.html">Company</a>
      </nav>
```

Per-page deltas: on `resources.html` keep `aria-current="page"` on the Resources link; on `about.html` keep it on Company. On `index.html` drop the now-stale comment `<!-- labels match flowx.ai; … -->`.

- [ ] **Step 3: Verify in dev server**

Run: `npm run dev` (from `v1/`), open http://localhost:4321/

Expected: "AI Agents" gone from the nav; hovering **Industries** opens a dark panel with Banking / Insurance / Logistics; Tab-ing to the trigger and then into the links also holds it open (`:focus-within`); the panel stays open while moving the pointer from trigger to panel (bridge). The three links 404 until Tasks 2–4 — expected at this stage. Check `about.html`, `resources.html`, `blog-flowx-6.html` navs too.

- [ ] **Step 4: Commit**

```bash
git add v1/src/style.css v1/index.html v1/about.html v1/resources.html v1/blog-flowx-6.html
git commit -m "feat: replace AI Agents nav item with Industries dropdown (CSS-only)"
```

---

### Task 2: Banking page + shared industry entry

**Files:**
- Create: `banking.html` (start from a copy of `agents.html`)
- Create: `src/industry.js` (start from a copy of `src/agents.js`)
- Modify: `vite.config.js` (add `banking` input)
- Modify: `src/style.css` (append one small rule: `.seg__no`)

**Interfaces:**
- Consumes: canonical nav block from Task 1; `agents.html` sections (hero classes `.ahero*`, `.vs*`, `.segs`/`.seg*`, `.feat`/`.fcard*`/`.fviz*`, CTA, footer); `initChrome()` from `src/shared.js`.
- Produces: `src/industry.js` — shared entry for all three industry pages (segment-hover highlighting now **document-scoped**, works with `.vs` and `.segs` in different sections; `#fpsFeed` and `#rateVal` hooks stay null-guarded). `banking.html` — the structural template Tasks 3–4 copy. CSS class `.seg__no` (mono card number, used by Workflows cards).

- [ ] **Step 1: Create `src/industry.js`**

```bash
cp v1/src/agents.js v1/src/industry.js
```

Then in `industry.js`, replace the segment-hover block (the `document.querySelectorAll('.seg[data-stages]')` loop) with the document-scoped version — industry pages have exactly one `.vs` schematic, and the segments now live in a separate section from it:

```js
/* ================= segment hover → highlight pipeline stages =================
   Hovering a segment card lights up the stages its agents work on and dims the
   rest of the page's schematic (each industry page has exactly one). Progressive
   enhancement — pure CSS classes, nothing breaks without hover. */
const vs = document.querySelector('.vs');
document.querySelectorAll('.seg[data-stages]').forEach((seg) => {
  const ids = seg.dataset.stages.split(' ');
  const stages = ids.flatMap((id) => [...document.querySelectorAll(`.vs-stage[data-stage="${id}"]`)]);
  if (!vs || !stages.length) return;
  seg.addEventListener('mouseenter', () => {
    vs.classList.add('vs--dimmed');
    stages.forEach((g) => g.classList.add('hot'));
  });
  seg.addEventListener('mouseleave', () => {
    vs.classList.remove('vs--dimmed');
    stages.forEach((g) => g.classList.remove('hot'));
  });
});
```

Everything else in the file stays as-is (CTA canvas, `#fpsFeed` screener feed, `.vs__scroll` edge fades, `#rateVal` random walk — all null-guarded, so pages without those hooks are fine). Leave `src/agents.js` untouched for now (deleted in Task 5).

- [ ] **Step 2: Add `.seg__no` CSS**

In `src/style.css`, directly after the `.seg__name` rule (~line 1198), add:

```css
.seg__no { display: block; font-size: 11px; color: var(--text-faint); letter-spacing: 0.08em; margin-bottom: 10px; }
```

- [ ] **Step 3: Create `banking.html` from `agents.html`**

```bash
cp v1/agents.html v1/banking.html
```

Apply the following edits to `banking.html`:

**(a) Head** — replace `<title>` and description:

```html
  <title>FlowX — Banking</title>
  <meta name="description" content="FlowX.AI banking agents on the lending journey — onboarding & KYC, underwriting, and financial insights, for retail, commercial, and risk & compliance teams." />
```

(keep the inline-SVG favicon line unchanged.)

**(b) Nav** — replace the `<nav class="nav__links" …>…</nav>` block with the canonical dropdown block from Task 1, with `aria-current="page"` on the Banking menu link:

```html
              <a href="./banking.html" aria-current="page">Banking</a>
```

Replace the stale comment above the header with: `<!-- copied from index.html — delta: aria-current on Banking in the dropdown, Book a demo → #cta -->`

**(c) Hero** — replace the whole `<section class="ahero" id="ahero">…</section>` with:

```html
    <!-- ================= HERO ================= -->
    <section class="ahero" id="ihero">
      <div class="shell ahero__grid">
        <div class="ahero__text">
          <p class="hero__eyebrow mono rv-load" style="--d:0">
            <span class="tick" aria-hidden="true"></span>
            Industries &middot; Banking
          </p>
          <h1 class="hero__title">
            <span class="hero__line hero__line--big rv-load" style="--d:1">Banking agents, on the lending journey<span class="amber">.</span></span>
          </h1>
          <!-- DRAFT — marketing review -->
          <p class="hero__sub rv-load" style="--d:2">
            From first application to funded account — agents attach to every
            stage of origination, onboarding, and risk. Built for banks where
            failure is not an option.
          </p>
          <p class="astats mono rv-load" style="--d:3">
            <span><b>220+</b> agents</span>
            <span><b>3</b> industries</span>
            <span><b class="amber">●</b> in production</span>
          </p>
        </div>

        <!-- single industry ring: banking agents orbiting the FlowX core -->
        <div class="ahero__viz" aria-hidden="true">
          <svg viewBox="0 0 460 460" role="img" aria-label="Banking agents orbiting the FlowX core that powers them">
            <path id="bkRing" class="hero-ring" d="M78 230 a152 152 0 1 0 304 0 a152 152 0 1 0 -304 0"/>
            <g>
              <circle class="abx-port" r="2.6"><animateMotion dur="18s" begin="0s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
              <circle class="hero-agent" r="3.2"><animateMotion dur="18s" begin="-3s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
              <circle class="abx-port" r="2.6"><animateMotion dur="18s" begin="-6s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
              <circle class="abx-port" r="2.6"><animateMotion dur="18s" begin="-9s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
              <circle class="hero-agent" r="3.2"><animateMotion dur="18s" begin="-12s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
              <circle class="abx-port" r="2.6"><animateMotion dur="18s" begin="-15s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
            </g>
            <g>
              <rect class="hero-tag" x="204" y="71" width="52" height="14"/>
              <text class="abx-cat" x="230" y="81" text-anchor="middle">banking</text>
            </g>
            <circle class="abx-pulse" r="4"><animateMotion dur="18s" repeatCount="indefinite"><mpath href="#bkRing"/></animateMotion></circle>
            <defs>
              <linearGradient id="chipFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="rgba(255,255,255,0.05)"/>
                <stop offset="0.55" stop-color="rgba(255,255,255,0)"/>
              </linearGradient>
            </defs>
            <path class="hero-core" d="M200 188 L253 188 L272 207 L272 260 A12 12 0 0 1 260 272 L200 272 A12 12 0 0 1 188 260 L188 200 A12 12 0 0 1 200 188 Z"/>
            <path class="hero-chip-face" d="M200 188 L253 188 L272 207 L272 260 A12 12 0 0 1 260 272 L200 272 A12 12 0 0 1 188 260 L188 200 A12 12 0 0 1 200 188 Z"/>
            <path class="hero-core-inner" d="M203 194 L252 194 L266 208 L266 257 A9 9 0 0 1 257 266 L203 266 A9 9 0 0 1 194 257 L194 203 A9 9 0 0 1 203 194 Z"/>
            <g transform="translate(230 230) scale(0.15) translate(-148 -148)">
              <path class="hero-logo-bar" d="M255.769 231.28H40.4308V287.8H255.769V231.28Z"/>
              <path class="hero-logo-x" d="M181.031 89.0438L255.769 174.759H186.87L146.232 127.113L105.593 174.759H40.6643L115.169 89.9781L42.5329 8H111.665L150.202 53.0762L188.739 8H253.901L181.031 89.0438Z"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
```

**(d) Delete the Insurance and Logistics sections** — remove `<section class="section" id="insurance">…</section>` and `<section class="section" id="logistics">…</section>` entirely.

**(e) Problem section** — insert before the banking section:

```html
    <!-- ================= THE PROBLEM ================= -->
    <!-- DRAFT — marketing review: pain points paraphrased from flowx.ai/banking -->
    <section class="section" id="problem">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">01 / The problem</span>
          <div class="section__headline">
            <h2 class="h2 rv">Where banking leaks time<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">The bottleneck isn't ambition —
              it's the manual handoffs between systems that were never meant to talk.</p>
          </div>
        </div>
        <div class="segs segs--3">
          <article class="seg rv" style="--i:0">
            <h3 class="seg__name">Onboarding that stalls</h3>
            <p class="seg__desc">KYC and onboarding drag across days of manual checks — customers wait while documents bounce between teams.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <h3 class="seg__name">Lending bottlenecks</h3>
            <p class="seg__desc">Underwriting queues grow faster than headcount. Every exception is a handoff, and every handoff is a day.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <h3 class="seg__name">Reporting overhead</h3>
            <p class="seg__desc">Financial reporting eats analyst time reconciling numbers across systems instead of explaining them.</p>
          </article>
        </div>
      </div>
    </section>
```

**(f) Split the old banking section in two.** The existing `<section class="section" id="banking">` (head + `.vs` figure + `.segs`) becomes two sections:

Section `02 / Value stream` — keeps the `.vs` figure **unchanged** (spine, stages, chips, pulses), with a new head:

```html
    <!-- ================= VALUE STREAM ================= -->
    <section class="section" id="value-stream">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">02 / Value stream</span>
          <div class="section__headline">
            <h2 class="h2 rv">The lending journey, end to end<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From first application to funded account —
              agents attach to every stage of origination, onboarding, and risk.</p>
          </div>
        </div>
        <!-- the existing banking .vs figure goes here, unchanged -->
      </div>
    </section>
```

Section `03 / Who it's for` — keeps the three existing `.seg` cards (Retail Banking · Commercial &amp; Corporate Banking · Risk &amp; Compliance) **unchanged**, including their `data-stages` attributes:

```html
    <!-- ================= SEGMENTS ================= -->
    <section class="section" id="segments">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">03 / Who it's for</span>
          <div class="section__headline">
            <h2 class="h2 rv">Built for every banking desk<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">Hover a segment to see where its
              agents sit on the journey.</p>
          </div>
        </div>
        <!-- the existing three banking .segs cards go here, unchanged -->
      </div>
    </section>
```

**(g) Featured bento** — in the `id="featured"` section, change the head to `04 / Featured` and the lede to `Nine banking agents — what each one watches, decides, and hands back to your team.`; then replace the nine cards inside `<div class="feat">` with (names from flowx.ai/banking; keep `false-positive-screener` and `voice-call-transcriber` exactly as they are in `agents.html` — the first two cards and the last card below):

```html
          <article class="fcard fcard--3 rv" style="--i:0">
            <h3 class="fcard__name mono">false-positive-screener</h3>
            <p class="fcard__desc">Reasons through transaction context to filter obvious false positives before human review</p>
            <div class="fviz fviz--feed mono" id="fpsFeed" aria-hidden="true"></div>
          </article>
          <article class="fcard fcard--3 rv" style="--i:1">
            <h3 class="fcard__name mono">sar-report-compiler</h3>
            <p class="fcard__desc">Drafts suspicious-activity reports from case evidence, ready for compliance review.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>case 4471-A · draft ready <em class="amber">6 min</em></span>
              <span>sections auto-filled <em>11/13</em></span>
              <span>reviewer edits <em>−72%</em></span>
            </div>
          </article>

          <article class="fcard fcard--2 rv" style="--i:2">
            <h3 class="fcard__name mono">alert-triage</h3>
            <p class="fcard__desc">Ranks incoming alerts by risk so analysts open the ones that matter first.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>ALR-2210 · low risk <em>closed</em></span>
              <span>ALR-2214 · duplicate <em>merged</em></span>
              <span>ALR-2216 · pattern hit <em class="amber">escalated</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:3">
            <h3 class="fcard__name mono">case-narrative-generator</h3>
            <p class="fcard__desc">Writes the case narrative from transaction history and analyst notes.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>sources cited <em>14</em></span>
              <span>timeline attached <em>yes</em></span>
              <span>review status <em class="amber">ready</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:4">
            <h3 class="fcard__name mono">timeline-generator</h3>
            <p class="fcard__desc">Reconstructs event timelines across accounts and counterparties.</p>
            <div class="fviz fviz--dots mono" aria-hidden="true">
              <span>evt</span><i></i><i class="on"></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i class="on"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:5">
            <h3 class="fcard__name mono">evidence-compiler</h3>
            <p class="fcard__desc">Gathers statements, logs, and documents into one indexed evidence pack.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>documents pulled <em>27</em></span>
              <span>duplicates removed <em>9</em></span>
              <span>pack indexed <em class="amber">done</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:6">
            <h3 class="fcard__name mono">business-activity-classification</h3>
            <p class="fcard__desc">Classifies counterparty business activity for KYC risk scoring.</p>
            <div class="fviz fviz--bars" aria-hidden="true">
              <i style="--h:42%"></i><i style="--h:66%"></i><i class="on" style="--h:84%"></i><i style="--h:31%"></i><i style="--h:57%"></i><i style="--h:48%"></i><i style="--h:73%"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:7">
            <h3 class="fcard__name mono">legal-contract-drafting</h3>
            <p class="fcard__desc">Drafts standard clauses from term sheets, flagging deviations from policy.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>clauses drafted <em>18</em></span>
              <span>deviations flagged <em class="amber">2</em></span>
              <span>playbook match <em>96%</em></span>
            </div>
          </article>

          <article class="fcard fcard--6 fcard--wave rv" style="--i:8">
            <div>
              <h3 class="fcard__name mono">voice-call-transcriber</h3>
              <p class="fcard__desc">Converts MP3 call recordings to searchable timestamped transcripts with keyword indexing</p>
              <p class="fviz__ctx mono">00:03:12 — “…confirm the delivery window for Thursday…”</p>
            </div>
            <div class="fviz fviz--wave" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </article>
```

New micro-visual copy is invented — add `<!-- DRAFT — marketing review: micro-visual data invented -->` above the bento.

**(h) Workflows section** — insert after `id="featured"`, before the CTA:

```html
    <!-- ================= WORKFLOWS ================= -->
    <!-- DRAFT — marketing review: descriptions paraphrased from flowx.ai/banking -->
    <section class="section" id="workflows">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">05 / Workflows</span>
          <div class="section__headline">
            <h2 class="h2 rv">Three workflows, mission-critical<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">Where banking agent stacks go to work first.</p>
          </div>
        </div>
        <div class="segs segs--3">
          <article class="seg rv" style="--i:0">
            <span class="seg__no mono">01</span>
            <h3 class="seg__name">Onboarding &amp; KYC</h3>
            <p class="seg__desc">Agents verify identity, screen documents, and assemble the case file before a human ever opens it.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <span class="seg__no mono">02</span>
            <h3 class="seg__name">Underwriting</h3>
            <p class="seg__desc">Income analysis, collateral checks, and policy pricing run in parallel — the underwriter reviews instead of retyping.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <span class="seg__no mono">03</span>
            <h3 class="seg__name">Financial Insights</h3>
            <p class="seg__desc">Agents reconcile positions and draft reports with sources attached, on schedule.</p>
          </article>
        </div>
      </div>
    </section>
```

**(i) CTA** — in the `id="cta"` section, change the number to `06 / Next` and the two title lines to:

```html
          <span class="rv" style="--i:0">Put agents on your</span>
          <span class="rv" style="--i:1">lending journey<span class="amber">.</span></span>
```

(buttons unchanged: mailto demo + `./index.html#hero`.)

**(j) Footer** — replace the Platform column:

```html
          <div>
            <h4 class="mono">Platform</h4>
            <a href="./banking.html">Banking</a>
            <a href="./insurance.html">Insurance</a>
            <a href="./logistics.html">Logistics</a>
            <a href="./index.html#blueprint">Agent Builder</a>
            <a href="./index.html#proof">Proof</a>
          </div>
```

**(k) Script** — change the entry at the bottom of the file:

```html
  <script type="module" src="/src/industry.js"></script>
```

- [ ] **Step 4: Add the Vite entry**

In `vite.config.js`, add to `rollupOptions.input`:

```js
        banking: fileURLToPath(new URL('./banking.html', import.meta.url)),
```

- [ ] **Step 5: Verify**

Run: `npm run dev`, open http://localhost:4321/banking.html

Expected: dropdown trigger lit (active `:has` state) with Banking marked in the menu; hero shows one orbit ring with a `banking` tag and the chip core; sections read 01 problem → 02 value stream → 03 who it's for → 04 featured → 05 workflows → 06 next; hovering a segment card in 03 dims the schematic in 02 and lights its stages (document-scoped JS); the screener feed ticks in 04.

Run: `npm run build`
Expected: exits 0, `dist/banking.html` present.

- [ ] **Step 6: Commit**

```bash
git add v1/banking.html v1/src/industry.js v1/src/style.css v1/vite.config.js
git commit -m "feat: banking industry page + shared industry.js entry"
```

---

### Task 3: Insurance page

**Files:**
- Create: `insurance.html` (start from a copy of `banking.html`)
- Modify: `vite.config.js` (add `insurance` input)

**Interfaces:**
- Consumes: `banking.html` structure from Task 2; the insurance `.vs` figure and `.segs` cards from `agents.html` (the `id="insurance"` section: claims-journey SVG with `insSpine`, and the Insurers &amp; Carriers / Brokers / Reinsurance cards).
- Produces: `insurance.html`.

- [ ] **Step 1: Create the page**

```bash
cp v1/banking.html v1/insurance.html
```

Apply these edits (all industry-specific content changes; structure stays):

**(a) Head:**

```html
  <title>FlowX — Insurance</title>
  <meta name="description" content="FlowX.AI insurance agents on the claims journey — underwriting, claims processing, and fraud detection, for carriers, brokers, and reinsurers." />
```

**(b) Nav:** move `aria-current="page"` from the Banking menu link to Insurance.

**(c) Hero:** eyebrow `Industries &middot; Insurance`; H1 `Insurance agents, on the claims journey<span class="amber">.</span>`; sub (keep the `DRAFT` comment):

```html
            From first notice of loss to settlement — agents for carriers,
            brokers, and reinsurers at every step of the claim. Built for
            insurers where failure is not an option.
```

Hero SVG: `aria-label="Insurance agents orbiting the FlowX core that powers them"`; rename `id="bkRing"` → `id="insRing"` (and all six+one `<mpath href>`s); orbit reversed like the old ring B — every `animateMotion` gains `keyPoints="1;0" keyTimes="0;1" calcMode="linear"` and `dur` becomes `22s` with `begin` values `0s, -3.7s, -7.3s, -11s, -14.7s, -18.3s` (pulse: `dur="22s"`); tag becomes:

```html
              <rect class="hero-tag" x="199" y="71" width="62" height="14"/>
              <text class="abx-cat" x="230" y="81" text-anchor="middle">insurance</text>
```

**(d) Problem section** (replace the three cards + headline; keep the `DRAFT` comment, source flowx.ai/insurance): h2 `Where insurance leaks time<span class="amber">.</span>`; lede `Fragmented data and manual reviews — the claim is decided long before anyone decides it.`; cards:

```html
          <article class="seg rv" style="--i:0">
            <h3 class="seg__name">Fragmented data</h3>
            <p class="seg__desc">Policy, claims, and telematics live in different systems — underwriters stitch them together by hand.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <h3 class="seg__name">Manual reviews</h3>
            <p class="seg__desc">Every claim above the threshold waits for a reviewer — including the majority that are routine.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <h3 class="seg__name">Exceptions everywhere</h3>
            <p class="seg__desc">Fraud signals hide in the noise, and exception handling swallows adjuster capacity.</p>
          </article>
```

**(e) Value stream (02):** h2 `The claims journey, end to end<span class="amber">.</span>`; lede `From first notice of loss to settlement — agents for carriers, brokers, and reinsurers at every step.`; replace the entire `.vs` figure with the insurance `.vs` figure from `agents.html` (the one with `id="insSpine"`, stages fnol → docs → assess → decide → settle), **unchanged**.

**(f) Segments (03):** h2 `Built for every side of the risk<span class="amber">.</span>`; lede unchanged (`Hover a segment…`); replace the three seg cards with the insurance cards from `agents.html` (Insurers &amp; Carriers / Brokers / Reinsurance, with their `data-stages` and chips), **unchanged**.

**(g) Featured (04):** lede `Eight insurance agents — what each one watches, decides, and hands back to your team.`; replace all cards inside `<div class="feat">` with (names from the flowx.ai/insurance agent catalog; keep the bento's `DRAFT` comment):

```html
          <article class="fcard fcard--3 rv" style="--i:0">
            <h3 class="fcard__name mono">quote-optimization</h3>
            <p class="fcard__desc">Tunes quote pricing against bind probability and portfolio targets.</p>
            <div class="fviz fviz--rate mono" aria-hidden="true">
              <span class="fviz__big"><span class="amber">$</span><span>1,284</span>/yr</span>
              <span class="fviz__ctx">motor · bind probability 68%</span>
            </div>
          </article>
          <article class="fcard fcard--3 rv" style="--i:1">
            <h3 class="fcard__name mono">premium-change-explainer</h3>
            <p class="fcard__desc">Explains premium changes in plain language, from rating factors to renewal letters.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>premium <em class="amber">+$112</em></span>
              <span>driver added · age band</span>
              <span>letter drafted <em>ready</em></span>
            </div>
          </article>

          <article class="fcard fcard--2 rv" style="--i:2">
            <h3 class="fcard__name mono">telematics-interpreter</h3>
            <p class="fcard__desc">Turns raw telematics streams into underwriting-ready risk scores.</p>
            <div class="fviz fviz--bars" aria-hidden="true">
              <i style="--h:38%"></i><i style="--h:52%"></i><i style="--h:44%"></i><i class="on" style="--h:81%"></i><i style="--h:60%"></i><i style="--h:47%"></i><i style="--h:69%"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:3">
            <h3 class="fcard__name mono">commission-rule-validation</h3>
            <p class="fcard__desc">Validates incentive and commission calculations against distributor contracts.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>statements checked <em>412</em></span>
              <span>mismatches <em class="amber">3</em></span>
              <span>recovered <em>$8.2k</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:4">
            <h3 class="fcard__name mono">contract-compliance-checker</h3>
            <p class="fcard__desc">Checks distributor contracts for clauses that drift from the approved playbook.</p>
            <div class="fviz fviz--risk mono" aria-hidden="true">
              <span>policy drift · 0.18</span>
              <div class="fviz__meter"><i style="--w:18%"></i></div>
              <span class="fviz__ctx">recommend: legal review §7.2</span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:5">
            <h3 class="fcard__name mono">sales-script-compliance</h3>
            <p class="fcard__desc">Reviews recorded sales calls against script and suitability requirements.</p>
            <div class="fviz fviz--dots mono" aria-hidden="true">
              <span>call</span><i class="on"></i><i></i><i class="on"></i><i class="on"></i><i></i><i class="on"></i><i></i><i class="on"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:6">
            <h3 class="fcard__name mono">cross-sell-trigger</h3>
            <p class="fcard__desc">Spots life events and coverage gaps that warrant a cross-sell conversation.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>P-8841 · new home <em class="amber">trigger</em></span>
              <span>coverage gap · contents</span>
              <span>next best action <em>queued</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:7">
            <h3 class="fcard__name mono">suitability-validator</h3>
            <p class="fcard__desc">Validates product recommendations against customer profile and regulation.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>profile match <em>0.91</em></span>
              <span>regulation check <em>pass</em></span>
              <span>re-match suggested <em class="amber">1</em></span>
            </div>
          </article>
```

(Note: `quote-optimization` reuses the `.fviz--rate` layout **without** the `id="rateVal"` hook — static by design; the random walk stays logistics-only.)

**(h) Workflows (05)** (keep the `DRAFT` comment, source flowx.ai/insurance): lede `Where insurance agent stacks go to work first.`; cards:

```html
          <article class="seg rv" style="--i:0">
            <span class="seg__no mono">01</span>
            <h3 class="seg__name">Underwriting</h3>
            <p class="seg__desc">Agents assemble the risk picture from fragmented sources so underwriters price with the full file.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <span class="seg__no mono">02</span>
            <h3 class="seg__name">Claims Processing</h3>
            <p class="seg__desc">Routine claims move straight through — documents checked, damage assessed, settlement queued.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <span class="seg__no mono">03</span>
            <h3 class="seg__name">Fraud Detection</h3>
            <p class="seg__desc">Signals surface early with the evidence attached, instead of at the bottom of an exception queue.</p>
          </article>
```

**(i) CTA:** second title line → `claims journey<span class="amber">.</span>`

- [ ] **Step 2: Add the Vite entry**

In `vite.config.js`, add:

```js
        insurance: fileURLToPath(new URL('./insurance.html', import.meta.url)),
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, open http://localhost:4321/insurance.html

Expected: Insurance marked active in the dropdown; hero ring orbits **reverse** with an `insurance` tag; claims-journey schematic (fnol → settle); segment hover from section 03 highlights stages in 02; featured bento shows the 8 insurance cards (no feed ticker, no rate walk — static visuals); CTA reads "…claims journey."

Run: `npm run build`
Expected: exits 0, `dist/insurance.html` present.

- [ ] **Step 4: Commit**

```bash
git add v1/insurance.html v1/vite.config.js
git commit -m "feat: insurance industry page"
```

---

### Task 4: Logistics page

**Files:**
- Create: `logistics.html` (start from a copy of `banking.html`)
- Modify: `vite.config.js` (add `logistics` input)

**Interfaces:**
- Consumes: `banking.html` structure from Task 2; the logistics `.vs` figure and five `.segs` cards from `agents.html` (the `id="logistics"` section with `lgSpine`); six existing fcards from the `agents.html` featured bento (`smart-quoting-margin-performance`, `predictive-maintenance-cost`, `service-history-analyzer`, `maintenance-planner`, `market-intelligence`, `failure-prediction`) and the `rate-optimization` fcard (keeps its `id="rateVal"` hook).
- Produces: `logistics.html`.

- [ ] **Step 1: Create the page**

```bash
cp v1/banking.html v1/logistics.html
```

Apply these edits:

**(a) Head:**

```html
  <title>FlowX — Logistics</title>
  <meta name="description" content="FlowX.AI logistics agents on the freight lifecycle — network optimization, load processing, and billing reconciliation, for carriers, 3PLs, brokers, forwarders, and shippers." />
```

**(b) Nav:** move `aria-current="page"` to the Logistics menu link.

**(c) Hero:** eyebrow `Industries &middot; Logistics`; H1 `Logistics agents, on the freight lifecycle<span class="amber">.</span>`; sub (keep the `DRAFT` comment):

```html
            From quote to invoice — agents for carriers, 3PLs, brokers,
            forwarders, and shippers along the whole move. Built for networks
            where failure is not an option.
```

Hero SVG: `aria-label="Logistics agents orbiting the FlowX core that powers them"`; rename `id="bkRing"` → `id="lgRing"` (and all `<mpath href>`s); forward direction (no `keyPoints`), `dur="20s"` everywhere, `begin` values `0s, -3.3s, -6.7s, -10s, -13.3s, -16.7s` (pulse: `dur="20s"`); tag:

```html
              <rect class="hero-tag" x="200" y="71" width="60" height="14"/>
              <text class="abx-cat" x="230" y="81" text-anchor="middle">logistics</text>
```

**(d) Problem section** (keep `DRAFT` comment, source flowx.ai/logistics): h2 `Where logistics leaks margin<span class="amber">.</span>`; lede `The network moves faster than the back office that runs it.`; cards:

```html
          <article class="seg rv" style="--i:0">
            <h3 class="seg__name">Stale network decisions</h3>
            <p class="seg__desc">Capacity and routing decisions lag the conditions on the ground — by the time the plan lands, the lane has moved.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <h3 class="seg__name">Manual load processing</h3>
            <p class="seg__desc">Tenders, confirmations, and exceptions still move through inboxes — one load at a time.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <h3 class="seg__name">Billing disputes</h3>
            <p class="seg__desc">Rate mismatches surface at invoice time — as revenue leakage, disputes, and days of reconciliation.</p>
          </article>
```

**(e) Value stream (02):** h2 `The freight lifecycle, end to end<span class="amber">.</span>`; lede `From quote to invoice — agents for carriers, 3PLs, brokers, forwarders, and shippers along the whole move.`; replace the `.vs` figure with the logistics `.vs` figure from `agents.html` (the one with `id="lgSpine"`, stages quote → book → move → deliver → invoice), **unchanged**.

**(f) Segments (03):** h2 `Built for every link in the chain<span class="amber">.</span>`; replace the three banking cards with the **five** logistics cards from `agents.html` (Carriers / 3PLs / Brokers / Forwarders / Shippers, with their `data-stages`, chips, and the existing `DRAFT — marketing review` comment), **unchanged**. Keep the wrapper `<div class="segs segs--3">` as in `agents.html` (five cards wrap to a 3+2 grid, same as today).

**(g) Featured (04):** lede `Eight logistics agents — what each one watches, decides, and hands back to your team.`; cards: copy `rate-optimization` from `agents.html` **unchanged but as the first card** (`fcard--3`, `--i:0`, keeps `id="rateVal"`), then this new card:

```html
          <article class="fcard fcard--3 rv" style="--i:1">
            <h3 class="fcard__name mono">route-optimization</h3>
            <p class="fcard__desc">Rebalances routes against live demand, weather, and capacity constraints.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>lane CHI→DAL · reroute <em class="amber">−3.2h</em></span>
              <span>fuel delta <em>−4%</em></span>
              <span>utilization <em>91%</em></span>
            </div>
          </article>
```

then copy these six `fcard--2` cards from `agents.html` unchanged, renumbering `--i:2` … `--i:7` in this order: `smart-quoting-margin-performance`, `predictive-maintenance-cost`, `service-history-analyzer`, `maintenance-planner`, `market-intelligence`, `failure-prediction`. Do **not** include `false-positive-screener` or `voice-call-transcriber` (they moved to banking). Delete the leftover `fcard--6` wave card.

**(h) Workflows (05)** (keep `DRAFT` comment, source flowx.ai/logistics): lede `Where logistics agent stacks go to work first.`; cards:

```html
          <article class="seg rv" style="--i:0">
            <span class="seg__no mono">01</span>
            <h3 class="seg__name">Network Optimization</h3>
            <p class="seg__desc">Agents rebalance capacity and routes as conditions change, not at the next planning cycle.</p>
          </article>
          <article class="seg rv" style="--i:1">
            <span class="seg__no mono">02</span>
            <h3 class="seg__name">Load Processing</h3>
            <p class="seg__desc">Tenders validated, loads entered, exceptions resolved — without the inbox in the middle.</p>
          </article>
          <article class="seg rv" style="--i:2">
            <span class="seg__no mono">03</span>
            <h3 class="seg__name">Billing Reconciliation</h3>
            <p class="seg__desc">Rates matched against contracts with an audit trail attached — before the dispute, not after.</p>
          </article>
```

**(i) CTA:** second title line → `freight lifecycle<span class="amber">.</span>`

- [ ] **Step 2: Add the Vite entry**

In `vite.config.js`, add:

```js
        logistics: fileURLToPath(new URL('./logistics.html', import.meta.url)),
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, open http://localhost:4321/logistics.html

Expected: Logistics active in the dropdown; hero ring with `logistics` tag; freight lifecycle schematic; **five** segment cards whose hover highlights stages in section 02; rate readout in the bento random-walks around $2.41/mi (the `#rateVal` hook lives here now); CTA reads "…freight lifecycle."

Run: `npm run build`
Expected: exits 0, `dist/logistics.html` present.

- [ ] **Step 4: Commit**

```bash
git add v1/logistics.html v1/vite.config.js
git commit -m "feat: logistics industry page"
```

---

### Task 5: Retire agents.html + link sweep

**Files:**
- Modify: `agents.html` (replace all content with a redirect stub)
- Delete: `src/agents.js`
- Modify: `index.html` (footer Platform column + "Explore All Agents" button, line ~210)
- Modify: `about.html` (footer Platform column + "Explore Agents" ghost button, line ~315)
- Modify: `resources.html` (footer Platform column + "Explore Agents" ghost button, line ~242)
- Modify: `blog-flowx-6.html` (footer Platform column)

**Interfaces:**
- Consumes: `banking.html` / `insurance.html` / `logistics.html` existing (Tasks 2–4 committed).
- Produces: no page links to `agents.html` anymore; `agents.html` redirects to `banking.html`.

- [ ] **Step 1: Replace `agents.html` with a redirect stub**

Replace the **entire** file content with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FlowX — Industries</title>
  <!-- the agents directory became three industry pages; keep this URL alive for shared/bookmarked links -->
  <meta http-equiv="refresh" content="0; url=./banking.html" />
  <meta name="robots" content="noindex" />
</head>
<body>
  <p>The agents directory is now organized by industry —
    <a href="./banking.html">continue to Banking</a>.</p>
</body>
</html>
```

Keep the `agents` input in `vite.config.js` (the stub must land in the build).

- [ ] **Step 2: Delete the old entry**

```bash
git rm v1/src/agents.js
```

- [ ] **Step 3: Update the footer Platform column on all four old pages**

On `index.html`, `about.html`, `resources.html`, `blog-flowx-6.html`, replace `<a href="./agents.html">Agents</a>` in the footer with:

```html
            <a href="./banking.html">Banking</a>
            <a href="./insurance.html">Insurance</a>
            <a href="./logistics.html">Logistics</a>
```

(keep the Agent Builder and Proof links that follow; on `index.html` they are same-page `#blueprint` / `#proof` anchors — leave as-is.)

- [ ] **Step 4: Repoint the explore buttons**

`index.html` (~line 210):

```html
          <a class="btn btn--primary" href="./banking.html">Explore Industries</a>
```

`about.html` (~line 315) and `resources.html` (~line 242):

```html
          <a class="btn btn--ghost btn--lg" href="./banking.html">Explore Industries</a>
```

- [ ] **Step 5: Verify no stale references remain**

Run: `grep -rn 'href="./agents.html"' v1/*.html`
Expected: **no matches** (no page links to agents.html anymore).

Run: `grep -rn "agents.html" v1/vite.config.js`
Expected: exactly one match — the `agents` build input (kept for the redirect stub). HTML comments mentioning agents.html history (e.g. `about.html`'s "copied from agents.html") are fine to leave.

Run: `grep -rn "agents.js" v1/*.html v1/vite.config.js`
Expected: no matches.

- [ ] **Step 6: Build and commit**

Run: `npm run build`
Expected: exits 0; `dist/` contains `agents.html` (stub), `banking.html`, `insurance.html`, `logistics.html`, plus the existing pages.

```bash
git add -A v1
git commit -m "feat: retire agents page — redirect to banking, sweep internal links"
```

---

### Task 6: Full-site verification pass

**Files:** none (verification only; fix-ups amend the relevant page if found)

- [ ] **Step 1: Manual pass in the dev server**

Run: `npm run dev`, then check:

1. Every page (`/`, `/about.html`, `/resources.html`, `/blog-flowx-6.html`, three industry pages): dropdown opens on hover **and** via keyboard Tab; the active industry is lit on its own page.
2. `/agents.html` immediately lands on `/banking.html`.
3. Each industry page: segment hover dims the schematic and lights the right stages; `.vs` strip edge-fades appear when the window is narrow; reveals (`.rv`) fire on scroll.
4. Banking: screener feed ticks. Logistics: rate readout random-walks. Insurance: all visuals static (by design).
5. OS-level "reduce motion" on (macOS: System Settings → Accessibility → Display → Reduce motion): orbits/pulses stop per existing CSS rules, dropdown still opens (no transition), pages remain fully readable.
6. Narrow viewport (<760px): nav links (incl. dropdown) hidden — matches the other pages.

Expected: all pass. Any failure: fix on the page in question, re-check, and amend/commit with `fix:` prefix.

- [ ] **Step 2: Production build check**

Run: `npm run build && npm run preview`, spot-check `/banking.html` and `/agents.html` (redirect) on the preview server.
Expected: build exits 0; both behave as in dev.
