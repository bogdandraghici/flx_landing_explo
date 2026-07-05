# Agents Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a second page, `agents.html`, to the v1 FlowX landing — the full flowx.ai/ai-agents directory reorganized as animated value-stream schematics per industry, plus a featured-agents bento — per the approved spec at `docs/superpowers/specs/2026-07-05-agents-page-design.md`.

**Architecture:** Second Vite HTML entry sharing `src/style.css` and a new `src/shared.js` (grain, nav, scroll reveals, footer year factored out of `main.js`). New thin entry `src/agents.js` adds page-specific behavior (segment→stage hover highlight, featured micro-visuals). Schematics are inline SVG reusing the landing's existing `abx-*` class vocabulary.

**Tech Stack:** Vite 6, vanilla ES modules, single CSS file with `:root` tokens. No new dependencies, no test framework — each task verifies via `npm run build` + `grep` on `dist/` + manual browser checks.

## Global Constraints

- Working directory for all commands: `v1/` (each `vN/` is self-contained).
- Amber `#FCB813` (`var(--amber)`) is the ONLY accent. Use sparingly.
- Fonts: Sora Variable (display), Geist Variable (body), Geist Mono Variable (mono) — already imported; never add font files.
- Every animation honors reduced motion: JS via the `reduceMotion` export, CSS inside the existing `@media (prefers-reduced-motion: reduce)` block at the end of `style.css`.
- No framework, no new npm dependencies.
- All source content is verbatim from the spec's "Content inventory" section. Invented copy is allowed ONLY for section ledes and the five logistics segment descriptions — the latter flagged `<!-- DRAFT — marketing review -->`.
- Agent use-case chips are dead placeholders: plain `<li>` items, not links.
- Design tokens live in `:root` in `src/style.css` — use `var(--…)`, no hardcoded colors except within SVG attributes already following `abx-*` conventions.
- The repo is on branch `feat/real-content` with unrelated WIP changes staged in the working tree (`index.html`, `main.js`, `style.css`, deleted `field.js`, `CLAUDE.md`). Commit ONLY the files each task names — never `git add -A`.

---

### Task 1: Vite multi-page config + shared bootstrap module

**Files:**
- Create: `v1/vite.config.js`
- Create: `v1/src/shared.js`
- Modify: `v1/src/main.js:1-54` and `v1/src/main.js:350-351`

**Interfaces:**
- Produces: `shared.js` exports — `reduceMotion: boolean`, `$(sel): Element|null`, `initChrome(): void` (grain canvas, nav scrolled class, `.rv` reveal observer, footer `#year`). All later tasks' JS imports from `'./shared.js'`.
- Produces: `vite.config.js` with two rollup inputs `main` (index.html) and `agents` (agents.html). Note: `agents.html` does not exist until Task 2 — build will fail between Task 1 and Task 2, which is why Task 1 verifies with a temporary stub, then deletes it.

- [ ] **Step 1: Create `v1/vite.config.js`**

```js
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        agents: fileURLToPath(new URL('./agents.html', import.meta.url)),
      },
    },
  },
});
```

- [ ] **Step 2: Create `v1/src/shared.js`**

Font/CSS imports move here so both entries get identical global setup.

```js
import '@fontsource-variable/sora';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './style.css';

import { createGrain } from './grain.js';

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (sel) => document.querySelector(sel);

/* page chrome shared by every page: grain overlay, nav scroll state,
   scroll reveals, footer year */
export function initChrome() {
  const grainCanvas = $('#grain');
  if (grainCanvas) createGrain(grainCanvas);

  const nav = $('#nav');
  let navTick = false;
  window.addEventListener(
    'scroll',
    () => {
      if (navTick) return;
      navTick = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 24);
        navTick = false;
      });
    },
    { passive: true }
  );

  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.rv').forEach((n) => revealIO.observe(n));

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}
```

- [ ] **Step 3: Refactor `v1/src/main.js` to use shared.js**

Replace lines 1–54 (imports, `reduceMotion`, `$`, hero field, grain, cta canvas, nav block, reveal block) with:

```js
import { $, reduceMotion, initChrome } from './shared.js';
import { createOrderField, createStaticField } from './orderField.js';
import { classify, renderDiagram, specText, typeSpec } from './blueprint.js';

initChrome();

/* ================= hero field ================= */
/* The hero background is the "order field" animation (the only mode). */
const canvas = $('#field');
if (canvas) createOrderField(canvas);

/* ================= cta static grid ================= */
const ctaCanvas = $('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);
```

Then delete the now-duplicated footer-year block at the end of the file (`$('#year').textContent = …` — handled by `initChrome`). Everything else in `main.js` (terminal, blueprint, audit ticker, model router, count-ups) stays untouched.

- [ ] **Step 4: Verify build with a temporary stub**

```bash
cd v1
echo '<!doctype html><html><head><title>stub</title></head><body><script type="module" src="/src/shared.js"></script></body></html>' > agents.html
npm run build
ls dist/index.html dist/agents.html
rm agents.html
```

Expected: build succeeds, both files listed. (Stub removed; Task 2 creates the real page.)

- [ ] **Step 5: Verify the landing still works**

```bash
cd v1 && npm run dev
```

Open `http://localhost:4321/` — hero canvas animates, grain visible, nav gains border on scroll, sections reveal, terminal compiles a use case, stats count up, footer year reads 2026. No console errors. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add v1/vite.config.js v1/src/shared.js v1/src/main.js
git commit -m "feat: multi-page vite config + shared page-chrome module"
```

---

### Task 2: agents.html page chrome — nav, compact hero, CTA, footer

**Files:**
- Create: `v1/agents.html`
- Create: `v1/src/agents.js`
- Modify: `v1/src/style.css` (append agents-hero styles before the responsive `@media` blocks at line ~1060; add one nav rule near `.nav__links a:hover` at line ~114)

**Interfaces:**
- Consumes: `initChrome`, `$` from `src/shared.js` (Task 1); `createStaticField` from `src/orderField.js` (existing).
- Produces: `agents.html` with `<main>` containing, in order: hero section `#ahero`, three empty-comment slots where Tasks 4–6 insert industry sections, a slot where Task 8 inserts featured, CTA `#cta`, footer. Section numbering: hero=01, banking=02, insurance=03, logistics=04, featured=05, cta=06.

- [ ] **Step 1: Create `v1/agents.html`**

Copy nav + footer verbatim from `index.html` with these deltas: brand `href="./index.html"`; nav links become `<a href="./agents.html" aria-current="page">AI Agents</a>` while Industries/Resources/Company stay dead (`href="#" data-page="…"`); "Book a demo" → `href="#cta"`; footer Platform column → `<a href="./agents.html">Agents</a>`, `<a href="./index.html#blueprint">Agent Builder</a>`, `<a href="./index.html#proof">Proof</a>`.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FlowX — AI Agents</title>
  <meta name="description" content="220+ enterprise-ready FlowX.AI agents mapped to banking, insurance, and logistics value streams — the full directory, by industry and business process." />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%230A0B0D'/%3E%3Cpath d='M28 26 L60 62 M60 26 L28 62' stroke='%23F4F5F3' stroke-width='9'/%3E%3Crect x='28' y='70' width='44' height='9' fill='%23FCB813'/%3E%3C/svg%3E" />
</head>
<body>
  <canvas id="grain" class="grain" aria-hidden="true"></canvas>

  <!-- ================= NAV ================= -->
  <!-- copied from index.html — see deltas above (brand href, aria-current, Book a demo → #cta) -->
  <header class="nav" id="nav">
    <div class="nav__inner">
      <a class="nav__brand" href="./index.html" aria-label="FlowX home">
        <svg class="nav__logo" viewBox="0 0 696 128" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX"><!-- identical 6 <path> elements as index.html:18-23 --></svg>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a href="./agents.html" aria-current="page">AI Agents</a>
        <a href="#" data-page="industries">Industries</a>
        <a href="#" data-page="resources">Resources</a>
        <a href="#" data-page="company">Company</a>
      </nav>
      <div class="nav__right">
        <a class="btn btn--primary btn--sm" href="#cta">Book a demo</a>
      </div>
    </div>
  </header>

  <main id="top">

    <!-- ================= HERO ================= -->
    <section class="ahero" id="ahero">
      <div class="shell">
        <p class="hero__eyebrow mono rv-load" style="--d:0">
          <span class="tick" aria-hidden="true"></span>
          AI Agents &middot; by industry and business process
        </p>
        <h1 class="hero__title">
          <span class="hero__line hero__line--big rv-load" style="--d:1">220+ agents, mapped to your value streams<span class="amber">.</span></span>
        </h1>
        <p class="hero__sub rv-load" style="--d:2">
          Every FlowX.AI agent is built for a real journey in a regulated
          industry. Explore the full directory below — organized by the value
          stream each agent works on — or build your own.
        </p>
        <p class="astats mono rv-load" style="--d:3">
          <span><b>220+</b> agents</span>
          <span><b>20</b> categories</span>
          <span><b>3</b> industries</span>
          <span><b class="amber">●</b> in production</span>
        </p>
      </div>
    </section>

    <!-- ================= 02 / BANKING (Task 4) ================= -->
    <!-- ================= 03 / INSURANCE (Task 5) ================= -->
    <!-- ================= 04 / LOGISTICS (Task 6) ================= -->
    <!-- ================= 05 / FEATURED (Task 8) ================= -->

    <!-- ================= CTA ================= -->
    <section class="section section--cta" id="cta">
      <canvas class="cta__canvas" aria-hidden="true"></canvas>
      <div class="shell">
        <span class="section__no mono">06 / Next</span>
        <h2 class="cta__title">
          <span class="rv" style="--i:0">Put agents on your</span>
          <span class="rv" style="--i:1">value streams<span class="amber">.</span></span>
        </h2>
        <div class="cta__row rv" style="--i:2">
          <a class="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
          <a class="btn btn--ghost btn--lg" href="./index.html#hero">Compile your own agent</a>
        </div>
      </div>
    </section>
  </main>

  <!-- ================= FOOTER ================= -->
  <!-- copied from index.html:580-624 — only the Platform column hrefs change, see deltas above -->

  <script type="module" src="/src/agents.js"></script>
</body>
</html>
```

Where a comment says "copied from index.html", paste the exact markup from the referenced lines of `index.html` and apply only the listed deltas. The logo SVG paths and footer are byte-identical otherwise.

- [ ] **Step 2: Create `v1/src/agents.js`**

```js
import { initChrome } from './shared.js';
import { createStaticField } from './orderField.js';

initChrome();

/* ================= cta static grid ================= */
const ctaCanvas = document.querySelector('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);
```

- [ ] **Step 3: Append agents-hero styles to `v1/src/style.css`**

Insert immediately before the `@media (max-width: 1080px)` block (~line 1060), and add the nav rule next to `.nav__links a:hover` (line ~114):

```css
/* next to .nav__links a:hover */
.nav__links a[aria-current="page"] { color: var(--text); }
```

```css
/* ============================================================
   agents page
   ============================================================ */
.ahero { padding: clamp(150px, 20vh, 210px) 0 clamp(56px, 8vh, 96px); }
.ahero .hero__sub { margin-top: 22px; }
.astats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 34px;
  margin-top: 36px;
  font-size: 12.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.astats b { color: var(--text); font-weight: 500; margin-right: 6px; }
.astats .amber { font-size: 9px; vertical-align: 2px; }
```

- [ ] **Step 4: Verify**

```bash
cd v1 && npm run build
grep -c 'aria-current="page"' dist/agents.html   # expect 1
grep -c 'section--cta' dist/agents.html          # expect 1
npm run dev
```

Open `http://localhost:4321/agents.html`: nav shows "AI Agents" in full white, hero + stats strip reveal on load, CTA grid canvas renders, footer intact, brand links back to `index.html`. No console errors. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add v1/agents.html v1/src/agents.js v1/src/style.css
git commit -m "feat: agents page chrome — hero, cta, nav/footer cross-links"
```

---

### Task 3: Landing cross-links to the agents page

**Files:**
- Modify: `v1/index.html:28` (nav), `v1/index.html:183` (registry button), `v1/index.html:600` (footer)

**Interfaces:**
- Consumes: `agents.html` existing at site root (Task 2).

- [ ] **Step 1: Point the three landing links at agents.html**

- Line 28: `<a href="#registry">AI Agents</a>` → `<a href="./agents.html">AI Agents</a>`
- Line 183: `<a class="btn btn--primary" href="#registry">Explore All Agents</a>` → `<a class="btn btn--primary" href="./agents.html">Explore All Agents</a>`
- Line 600: `<a href="#registry">Agents</a>` → `<a href="./agents.html">Agents</a>`

The hero's "Explore Agents" button (line 65) keeps `#registry` — in-page flow, per spec.

- [ ] **Step 2: Verify**

```bash
cd v1 && grep -c 'href="./agents.html"' index.html   # expect 3
npm run build   # expect success
```

- [ ] **Step 3: Commit**

```bash
git add v1/index.html
git commit -m "feat: cross-link landing to agents page"
```

---

### Task 4: Banking section — value-stream schematic + segment cards

**Files:**
- Modify: `v1/agents.html` (replace the `02 / BANKING` comment slot)
- Modify: `v1/src/style.css` (append `.vs` and `.seg` component styles to the agents-page block; add rules to the two `@media (max-width…)` blocks and the reduced-motion block)

**Interfaces:**
- Produces: CSS components `.vs` (schematic panel), `.segs`/`.seg` (segment card grid) reused verbatim by Tasks 5–6. SVG stage groups `<g class="vs-stage" data-stage="…">` and card attribute `data-stages="…"` consumed by Task 7's hover JS. Stage ids for banking: `apply verify underwrite decide onboard`.

- [ ] **Step 1: Insert the banking section markup**

Replace `<!-- ================= 02 / BANKING (Task 4) ================= -->` with:

```html
    <!-- ================= BANKING ================= -->
    <section class="section" id="banking">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">02 / Banking</span>
          <div class="section__headline">
            <h2 class="h2 rv">Banking agents, on the lending journey<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From first application to funded account —
              agents attach to every stage of origination, onboarding, and risk.</p>
          </div>
        </div>

        <figure class="vs rv" style="--i:2" role="img" aria-label="Lending journey pipeline: apply, verify, underwrite, decide, onboard — with agents attached to each stage">
          <div class="vs__bar mono"><span>banking / lending journey</span><span class="vs__live"><i></i>agents live</span></div>
          <div class="vs__scroll">
            <svg viewBox="0 0 960 216" aria-hidden="true">
              <path id="bkSpine" class="abx-edge" d="M20 59 H940"/>
              <g class="vs-stage" data-stage="apply">
                <rect class="abx-node" x="20" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="36" y="64">apply</text>
                <text class="abx-sub" x="132" y="64">01</text>
              </g>
              <g class="vs-stage" data-stage="verify">
                <rect class="abx-node" x="210" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="226" y="64">verify</text>
                <text class="abx-sub" x="322" y="64">02</text>
                <path class="abx-edge" d="M290 82 C290 112 296 128 296 148"/>
                <rect class="abx-chip" x="222" y="148" width="150" height="38" rx="9"/>
                <text class="abx-label" x="238" y="171">doc-completeness</text>
              </g>
              <g class="vs-stage vs-stage--live" data-stage="underwrite">
                <rect class="abx-node abx-node--live" x="400" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label abx-label--live" x="416" y="64">underwrite</text>
                <circle class="abx-dot--live" cx="540" cy="59" r="4"/>
                <path class="abx-edge" d="M480 82 C480 112 486 128 486 148"/>
                <rect class="abx-chip abx-chip--pick" x="404" y="148" width="164" height="38" rx="9"/>
                <text class="abx-label abx-label--live" x="420" y="171">income-analysis +8</text>
              </g>
              <g class="vs-stage" data-stage="decide">
                <rect class="abx-node" x="590" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="606" y="64">decide</text>
                <text class="abx-sub" x="702" y="64">04</text>
                <path class="abx-edge" d="M670 82 C670 112 676 128 676 148"/>
                <rect class="abx-chip" x="602" y="148" width="148" height="38" rx="9"/>
                <text class="abx-label" x="618" y="171">collateral-check</text>
              </g>
              <g class="vs-stage" data-stage="onboard">
                <rect class="abx-node" x="780" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="796" y="64">onboard</text>
                <text class="abx-sub" x="892" y="64">05</text>
              </g>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#bkSpine"/></animateMotion></circle>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#bkSpine"/></animateMotion></circle>
            </svg>
          </div>
        </figure>

        <div class="segs segs--3">
          <article class="seg rv" style="--i:0" data-stages="apply underwrite onboard">
            <h3 class="seg__name">Retail Banking</h3>
            <p class="seg__desc">Agents for high-volume customer journeys; from mortgage origination to account opening and customer retention.</p>
            <ul class="seg__chips mono">
              <li>Retail mortgage underwriting</li>
              <li>Customer churn &amp; retention</li>
              <li>Quick wins</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:1" data-stages="apply verify decide">
            <h3 class="seg__name">Commercial &amp; Corporate Banking</h3>
            <p class="seg__desc">End-to-end automation for commercial lending, corporate onboarding, SME underwriting, and trade finance operations.</p>
            <ul class="seg__chips mono">
              <li>Commercial onboarding</li>
              <li>Corporate account opening</li>
              <li>Commercial lending</li>
              <li>Trade finance invoice factoring</li>
              <li>SME/Corporate underwriting financial insights</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:2" data-stages="verify decide">
            <h3 class="seg__name">Risk &amp; Compliance</h3>
            <p class="seg__desc">Production-ready agents for fraud investigation, AML/KYC checks, financial crime risk assessment, and regulatory processing.</p>
            <ul class="seg__chips mono">
              <li>Fraud investigation</li>
              <li>AML &amp; KYC</li>
              <li>Garnishment processing</li>
              <li>Financial crime risk assessment</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Append `.vs` + `.seg` styles**

Add to the agents-page block in `style.css` (after `.astats` rules):

```css
/* value-stream schematic */
.vs {
  margin: 0 0 26px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--bg-panel);
  overflow: clip;
}
.vs__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--line-soft);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.vs__live { display: inline-flex; align-items: center; gap: 8px; color: var(--text-dim); }
.vs__live i {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--amber);
  animation: bpBreathe 4s ease-in-out infinite;
}
.vs__scroll { overflow-x: auto; padding: clamp(14px, 2.5vw, 26px); }
.vs__scroll svg { width: 100%; min-width: 760px; height: auto; display: block; }
.vs-stage { transition: opacity 0.3s var(--ease); }
.vs-stage.hot .abx-node { stroke: var(--amber-line); }
.vs-stage.hot .abx-label { fill: rgba(252, 184, 19, 0.9); }
.vs--dimmed .vs-stage:not(.hot) { opacity: 0.35; }

/* segment cards */
.segs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.seg {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--bg-raised);
  padding: 24px 22px;
  transition: border-color 0.3s var(--ease);
}
.seg:hover { border-color: var(--amber-line); }
.seg__name { font-family: var(--font-display); font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.seg__desc { color: var(--text-dim); font-size: 13.5px; line-height: 1.55; margin: 10px 0 16px; }
.seg__chips { list-style: none; display: flex; flex-wrap: wrap; gap: 7px; }
.seg__chips li {
  font-size: 11px;
  letter-spacing: 0.02em;
  padding: 5px 10px;
  border: 1px solid var(--line);
  border-radius: 7px;
  color: var(--text-dim);
  background: rgba(255, 255, 255, 0.02);
}
```

Responsive — add inside the existing `@media (max-width: 1080px)` block: `.segs { grid-template-columns: repeat(2, 1fr); }`. Inside `@media (max-width: 760px)`: `.segs { grid-template-columns: 1fr; }`.

Reduced motion — the existing block already kills `.abx-pulse` and `.abx-dot--live`; add `.vs__live i { animation: none; }` there.

- [ ] **Step 3: Verify**

```bash
cd v1 && npm run build
grep -c '<article class="seg' dist/agents.html            # expect 3
grep -o 'data-stage="[a-z]*"' dist/agents.html | sort -u  # expect the 5 banking stages
```

Open `http://localhost:4321/agents.html` (dev): schematic renders full-width, two pulses ride the spine, underwrite node glows amber, cards show 3/5/4 chips. At ~375px width the schematic scrolls horizontally inside its panel, cards stack 1-col.

- [ ] **Step 4: Commit**

```bash
git add v1/agents.html v1/src/style.css
git commit -m "feat: banking value-stream schematic + segment directory"
```

---

### Task 5: Insurance section

**Files:**
- Modify: `v1/agents.html` (replace the `03 / INSURANCE` comment slot)

**Interfaces:**
- Consumes: `.vs`, `.segs`, `.seg` CSS from Task 4 — no new styles.
- Produces: stage ids `fnol docs assess decide settle` consumed by Task 7.

- [ ] **Step 1: Insert the insurance section markup**

Same structure as banking; spine path id is `insSpine` (ids must be document-unique).

```html
    <!-- ================= INSURANCE ================= -->
    <section class="section" id="insurance">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">03 / Insurance</span>
          <div class="section__headline">
            <h2 class="h2 rv">Insurance agents, on the claims journey<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From first notice of loss to settlement —
              agents for carriers, brokers, and reinsurers at every step.</p>
          </div>
        </div>

        <figure class="vs rv" style="--i:2" role="img" aria-label="Claims journey pipeline: FNOL, docs, assess, decide, settle — with agents attached to each stage">
          <div class="vs__bar mono"><span>insurance / claims journey</span><span class="vs__live"><i></i>agents live</span></div>
          <div class="vs__scroll">
            <svg viewBox="0 0 960 216" aria-hidden="true">
              <path id="insSpine" class="abx-edge" d="M20 59 H940"/>
              <g class="vs-stage" data-stage="fnol">
                <rect class="abx-node" x="20" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="36" y="64">fnol</text>
                <text class="abx-sub" x="132" y="64">01</text>
              </g>
              <g class="vs-stage" data-stage="docs">
                <rect class="abx-node" x="210" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="226" y="64">docs</text>
                <text class="abx-sub" x="322" y="64">02</text>
                <path class="abx-edge" d="M290 82 C290 112 296 128 296 148"/>
                <rect class="abx-chip" x="222" y="148" width="150" height="38" rx="9"/>
                <text class="abx-label" x="238" y="171">doc-completeness</text>
              </g>
              <g class="vs-stage vs-stage--live" data-stage="assess">
                <rect class="abx-node abx-node--live" x="400" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label abx-label--live" x="416" y="64">assess</text>
                <circle class="abx-dot--live" cx="540" cy="59" r="4"/>
                <path class="abx-edge" d="M480 82 C480 112 486 128 486 148"/>
                <rect class="abx-chip abx-chip--pick" x="398" y="148" width="176" height="38" rx="9"/>
                <text class="abx-label abx-label--live" x="414" y="171">damage-extraction +5</text>
              </g>
              <g class="vs-stage" data-stage="decide">
                <rect class="abx-node" x="590" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="606" y="64">decide</text>
                <text class="abx-sub" x="702" y="64">04</text>
                <path class="abx-edge" d="M670 82 C670 112 676 128 676 148"/>
                <rect class="abx-chip" x="606" y="148" width="140" height="38" rx="9"/>
                <text class="abx-label" x="622" y="171">fraud-signals</text>
              </g>
              <g class="vs-stage" data-stage="settle">
                <rect class="abx-node" x="780" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="796" y="64">settle</text>
                <text class="abx-sub" x="892" y="64">05</text>
              </g>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#insSpine"/></animateMotion></circle>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#insSpine"/></animateMotion></circle>
            </svg>
          </div>
        </figure>

        <div class="segs segs--3">
          <article class="seg rv" style="--i:0" data-stages="fnol docs assess decide settle">
            <h3 class="seg__name">Insurers &amp; Carriers</h3>
            <p class="seg__desc">Core operational agents for insurance companies managing policies and claims directly.</p>
            <ul class="seg__chips mono">
              <li>Policy onboarding</li>
              <li>Claims processing</li>
              <li>Underwriting assessment</li>
              <li>Fraud detection &amp; alerting</li>
              <li>Regulatory &amp; Compliance</li>
              <li>Complaints &amp; disputes</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:1" data-stages="fnol docs settle">
            <h3 class="seg__name">Brokers</h3>
            <p class="seg__desc">Agents focused on distribution, client management, and sales optimization.</p>
            <ul class="seg__chips mono">
              <li>Distribution</li>
              <li>Renewals &amp; Upsell</li>
              <li>Policy onboarding</li>
              <li>Complaints &amp; disputes</li>
              <li>Regulatory &amp; Compliance</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:2" data-stages="assess decide">
            <h3 class="seg__name">Reinsurance</h3>
            <p class="seg__desc">Agents tailored for risk transfer, treaty management, and portfolio analysis.</p>
            <ul class="seg__chips mono">
              <li>Reinsurance coordination</li>
              <li>Underwriting assessment</li>
              <li>Fraud detection &amp; alerting</li>
              <li>Regulatory &amp; Compliance</li>
              <li>Claims processing</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

```bash
cd v1 && npm run build
grep -c '<article class="seg' dist/agents.html   # expect 6
grep -c 'insSpine' dist/agents.html              # expect 3 (id + 2 mpath refs)
```

Browser check: insurance schematic animates independently of banking's.

- [ ] **Step 3: Commit**

```bash
git add v1/agents.html
git commit -m "feat: insurance value-stream schematic + segment directory"
```

---

### Task 6: Logistics section (5 segments)

**Files:**
- Modify: `v1/agents.html` (replace the `04 / LOGISTICS` comment slot)

**Interfaces:**
- Consumes: `.vs`, `.segs`, `.seg` CSS from Task 4.
- Produces: stage ids `quote book move deliver invoice` consumed by Task 7. Five segment descriptions are invented — each carries `<!-- DRAFT — marketing review -->`.

- [ ] **Step 1: Insert the logistics section markup**

```html
    <!-- ================= LOGISTICS ================= -->
    <section class="section" id="logistics">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">04 / Logistics</span>
          <div class="section__headline">
            <h2 class="h2 rv">Logistics agents, on the freight lifecycle<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From quote to invoice — agents for carriers,
              3PLs, brokers, forwarders, and shippers along the whole move.</p>
          </div>
        </div>

        <figure class="vs rv" style="--i:2" role="img" aria-label="Freight lifecycle pipeline: quote, book, move, deliver, invoice — with agents attached to each stage">
          <div class="vs__bar mono"><span>logistics / freight lifecycle</span><span class="vs__live"><i></i>agents live</span></div>
          <div class="vs__scroll">
            <svg viewBox="0 0 960 216" aria-hidden="true">
              <path id="lgSpine" class="abx-edge" d="M20 59 H940"/>
              <g class="vs-stage" data-stage="quote">
                <rect class="abx-node" x="20" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="36" y="64">quote</text>
                <text class="abx-sub" x="132" y="64">01</text>
                <path class="abx-edge" d="M100 82 C100 112 106 128 106 148"/>
                <rect class="abx-chip" x="28" y="148" width="140" height="38" rx="9"/>
                <text class="abx-label" x="44" y="171">smart-quoting</text>
              </g>
              <g class="vs-stage" data-stage="book">
                <rect class="abx-node" x="210" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="226" y="64">book</text>
                <text class="abx-sub" x="322" y="64">02</text>
              </g>
              <g class="vs-stage" data-stage="move">
                <rect class="abx-node" x="400" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="416" y="64">move</text>
                <text class="abx-sub" x="512" y="64">03</text>
                <path class="abx-edge" d="M480 82 C480 112 486 128 486 148"/>
                <rect class="abx-chip" x="412" y="148" width="136" height="38" rx="9"/>
                <text class="abx-label" x="428" y="171">track-trace</text>
              </g>
              <g class="vs-stage" data-stage="deliver">
                <rect class="abx-node" x="590" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label" x="606" y="64">deliver</text>
                <text class="abx-sub" x="702" y="64">04</text>
              </g>
              <g class="vs-stage vs-stage--live" data-stage="invoice">
                <rect class="abx-node abx-node--live" x="780" y="36" width="160" height="46" rx="10"/>
                <text class="abx-label abx-label--live" x="796" y="64">invoice</text>
                <circle class="abx-dot--live" cx="920" cy="59" r="4"/>
                <path class="abx-edge" d="M860 82 C860 112 854 128 854 148"/>
                <rect class="abx-chip abx-chip--pick" x="760" y="148" width="182" height="38" rx="9"/>
                <text class="abx-label abx-label--live" x="776" y="171">invoice-recon +3</text>
              </g>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#lgSpine"/></animateMotion></circle>
              <circle class="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#lgSpine"/></animateMotion></circle>
            </svg>
          </div>
        </figure>

        <div class="segs segs--3">
          <!-- DRAFT — marketing review: the five logistics segment descriptions are invented (source has none) -->
          <article class="seg rv" style="--i:0" data-stages="move deliver invoice">
            <h3 class="seg__name">Carriers</h3>
            <p class="seg__desc">Agents that keep fleets moving — maintenance, fuel, pricing, and safety, without the back office drag.</p>
            <ul class="seg__chips mono">
              <li>Fleet optimization</li>
              <li>Predictive maintenance</li>
              <li>Load entry</li>
              <li>Fuel efficiency</li>
              <li>Compliance &amp; safety</li>
              <li>Dynamic pricing</li>
              <li>Invoicing</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:1" data-stages="quote book move invoice">
            <h3 class="seg__name">3PLs</h3>
            <p class="seg__desc">Agents that orchestrate inventory, routing, and customer commitments across the network.</p>
            <ul class="seg__chips mono">
              <li>Inventory optimization</li>
              <li>Dynamic routing</li>
              <li>Load entry</li>
              <li>Smart quoting</li>
              <li>Invoice reconciliation</li>
              <li>Customer service</li>
              <li>Exception management</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:2" data-stages="quote book invoice">
            <h3 class="seg__name">Brokers</h3>
            <p class="seg__desc">Agents that quote faster, match carriers smarter, and keep every margin visible.</p>
            <ul class="seg__chips mono">
              <li>Smart quoting</li>
              <li>Carrier matching</li>
              <li>Load entry</li>
              <li>Invoice reconciliation</li>
              <li>Inbox management</li>
              <li>Performance analysis</li>
              <li>Customs validation</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:3" data-stages="quote move deliver">
            <h3 class="seg__name">Forwarders</h3>
            <p class="seg__desc">Agents for cross-border moves — customs, compliance, and landed-cost certainty.</p>
            <ul class="seg__chips mono">
              <li>Customs validation</li>
              <li>Smart quoting</li>
              <li>Risk &amp; compliance</li>
              <li>Invoice reconciliation</li>
              <li>Cost prediction</li>
            </ul>
          </article>
          <article class="seg rv" style="--i:4" data-stages="quote book invoice">
            <h3 class="seg__name">Shippers</h3>
            <p class="seg__desc">Agents that put tendering, quoting, and freight-spend reconciliation on autopilot.</p>
            <ul class="seg__chips mono">
              <li>Load tendering</li>
              <li>Freight quoting</li>
              <li>Invoice reconciliation</li>
              <li>Demand forecasting</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

```bash
cd v1 && npm run build
grep -c '<article class="seg' dist/agents.html   # expect 11
grep -c '<li>' dist/agents.html                  # expect 58
```

Browser check: 5 logistics cards wrap 3+2 on desktop, 2-col at ≤1080px, 1-col at ≤760px.

- [ ] **Step 3: Commit**

```bash
git add v1/agents.html
git commit -m "feat: logistics value-stream schematic + 5-segment directory"
```

---

### Task 7: Segment hover → pipeline stage highlight

**Files:**
- Modify: `v1/src/agents.js` (append)

**Interfaces:**
- Consumes: `.seg[data-stages]` cards and `g.vs-stage[data-stage]` SVG groups (Tasks 4–6); `.hot` / `.vs--dimmed` CSS from Task 4.

- [ ] **Step 1: Append the hover wiring to `agents.js`**

```js
/* ================= segment hover → highlight pipeline stages =================
   Hovering a segment card lights up the stages its agents work on and dims the
   rest of that section's schematic. Progressive enhancement — pure CSS classes,
   nothing breaks without hover (touch devices simply never trigger it). */
document.querySelectorAll('.seg[data-stages]').forEach((seg) => {
  const section = seg.closest('section');
  const vs = section.querySelector('.vs');
  const ids = seg.dataset.stages.split(' ');
  const stages = ids.flatMap((id) => [...section.querySelectorAll(`.vs-stage[data-stage="${id}"]`)]);
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

- [ ] **Step 2: Verify**

Dev server, `http://localhost:4321/agents.html`: hover "Risk & Compliance" → banking's `verify` and `decide` nodes turn amber, other stages dim to 35%; mouse out restores. Repeat on one insurance and one logistics card. Keyboard/touch: page unaffected.

- [ ] **Step 3: Commit**

```bash
git add v1/src/agents.js
git commit -m "feat: segment hover highlights pipeline stages"
```

---

### Task 8: Featured agents bento (9 spec-cards + micro-visuals)

**Files:**
- Modify: `v1/agents.html` (replace the `05 / FEATURED` comment slot)
- Modify: `v1/src/style.css` (append `.feat`/`.fcard`/`.fviz` styles; responsive + reduced-motion rules)
- Modify: `v1/src/agents.js` (append micro-visual tickers)

**Interfaces:**
- Consumes: `reduceMotion` from `shared.js`.
- Produces: DOM ids `#fpsFeed` (screener feed) and `#rateVal` (rate readout) consumed by the JS in this same task.

- [ ] **Step 1: Insert the featured section markup**

Bento spans on a 6-col grid: screener (3) + rate (3) / six statics (2 each) / transcriber (6, full-width finale).

```html
    <!-- ================= FEATURED AGENTS ================= -->
    <section class="section" id="featured">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">05 / Featured</span>
          <div class="section__headline">
            <h2 class="h2 rv">Featured agents, up close<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">Nine agents from the directory — what each
              one watches, decides, and hands back to your team.</p>
          </div>
        </div>

        <div class="feat">
          <article class="fcard fcard--3 rv" style="--i:0">
            <h3 class="fcard__name mono">false-positive-screener</h3>
            <p class="fcard__desc">Reasons through transaction context to filter obvious false positives before human review</p>
            <div class="fviz fviz--feed mono" id="fpsFeed" aria-hidden="true"></div>
          </article>
          <article class="fcard fcard--3 rv" style="--i:1">
            <h3 class="fcard__name mono">rate-optimization</h3>
            <p class="fcard__desc">Calculates optimal bid prices based on demand, distance, and target margin.</p>
            <div class="fviz fviz--rate mono" aria-hidden="true">
              <span class="fviz__big"><span class="amber">$</span><span id="rateVal">2.41</span>/mi</span>
              <span class="fviz__ctx">lane CHI→DAL · target margin 14%</span>
            </div>
          </article>

          <article class="fcard fcard--2 rv" style="--i:2">
            <h3 class="fcard__name mono">smart-quoting-margin-performance</h3>
            <p class="fcard__desc">Monitors quote outcomes and tunes pricing models for profitability.</p>
            <div class="fviz fviz--bars" aria-hidden="true">
              <i style="--h:34%"></i><i style="--h:58%"></i><i style="--h:41%"></i><i style="--h:72%"></i><i class="on" style="--h:88%"></i><i style="--h:64%"></i><i style="--h:79%"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:3">
            <h3 class="fcard__name mono">predictive-maintenance-cost</h3>
            <p class="fcard__desc">Identifies vendor and part savings opportunities across repairs.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>brake pads · vendor B <em class="amber">−18%</em></span>
              <span>axle service · bundled <em class="amber">−11%</em></span>
              <span>tires · contract rate <em>−6%</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:4">
            <h3 class="fcard__name mono">service-history-analyzer</h3>
            <p class="fcard__desc">Analyzes maintenance logs to detect recurring issues and root causes.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>unit 4471 · coolant leak <em class="amber">4×</em></span>
              <span>root cause · gasket batch <em>B-112</em></span>
              <span>flagged fleet-wide <em>12 units</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:5">
            <h3 class="fcard__name mono">maintenance-planner</h3>
            <p class="fcard__desc">Recommends optimal service schedules based on utilization and condition.</p>
            <div class="fviz fviz--dots mono" aria-hidden="true">
              <span>wk</span><i></i><i></i><i class="on"></i><i></i><i class="on"></i><i></i><i></i><i class="on"></i>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:6">
            <h3 class="fcard__name mono">market-intelligence</h3>
            <p class="fcard__desc">Aggregates live rate indices, lane performance, and carrier availability.</p>
            <div class="fviz fviz--rows mono" aria-hidden="true">
              <span>rate index <em class="amber">▲ 2.1%</em></span>
              <span>lane volume · TX triangle <em>▲</em></span>
              <span>carrier availability <em>tight</em></span>
            </div>
          </article>
          <article class="fcard fcard--2 rv" style="--i:7">
            <h3 class="fcard__name mono">failure-prediction</h3>
            <p class="fcard__desc">Forecasts breakdown risk using historical repair and usage data.</p>
            <div class="fviz fviz--risk mono" aria-hidden="true">
              <span>unit 2209 · risk 0.72</span>
              <div class="fviz__meter"><i style="--w:72%"></i></div>
              <span class="fviz__ctx">recommend: inspect before load 7741</span>
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
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Append featured styles to `style.css`**

```css
/* featured agents bento */
.feat { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.fcard {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--bg-raised);
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.3s var(--ease);
}
.fcard:hover { border-color: var(--amber-line); }
.fcard--2 { grid-column: span 2; }
.fcard--3 { grid-column: span 3; }
.fcard--6 { grid-column: span 6; }
.fcard__name { font-size: 13px; letter-spacing: 0.04em; color: var(--text); }
.fcard__desc { font-size: 13.5px; line-height: 1.55; color: var(--text-dim); flex: 1; }
.fviz { margin-top: 8px; font-size: 11.5px; color: var(--text-faint); }
.fviz__ctx { display: block; font-size: 11px; color: var(--text-faint); margin-top: 6px; }
.fviz__big { font-size: 26px; color: var(--text); letter-spacing: 0.02em; }
.fviz--rate .fviz__big span:last-child { font-variant-numeric: tabular-nums; }

.fviz--feed { display: grid; gap: 4px; min-height: 66px; align-content: start; }
.fviz--feed .r { display: flex; justify-content: space-between; gap: 12px; white-space: nowrap; overflow: hidden; }
.fviz--feed .r em { color: var(--text-dim); }
.fviz--feed .r em.amber { color: var(--amber); }

.fviz--bars { display: flex; align-items: flex-end; gap: 5px; height: 52px; }
.fviz--bars i { flex: 1; height: var(--h); background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
.fviz--bars i.on { background: var(--amber); }

.fviz--rows { display: grid; gap: 5px; }
.fviz--rows span { display: flex; justify-content: space-between; gap: 12px; }
.fviz--rows em { color: var(--text-dim); }
.fviz--rows em.amber { color: var(--amber); }

.fviz--dots { display: flex; align-items: center; gap: 6px; }
.fviz--dots i { width: 9px; height: 9px; border-radius: 3px; background: rgba(255, 255, 255, 0.08); }
.fviz--dots i.on { background: var(--amber); }

.fviz__meter { height: 5px; border-radius: 3px; background: rgba(255, 255, 255, 0.07); margin: 8px 0; overflow: hidden; }
.fviz__meter i { display: block; height: 100%; width: var(--w); background: var(--amber); border-radius: 3px; }

.fcard--wave { flex-direction: row; align-items: center; gap: 28px; }
.fcard--wave > div:first-child { flex: 1; }
.fviz--wave { display: flex; align-items: center; gap: 3px; height: 56px; flex: 1; margin: 0; }
.fviz--wave i {
  flex: 1;
  height: 18%;
  border-radius: 2px;
  background: rgba(252, 184, 19, 0.55);
  animation: fwave 1.6s ease-in-out infinite;
}
.fviz--wave i:nth-child(3n) { animation-delay: 0.2s; }
.fviz--wave i:nth-child(3n + 1) { animation-delay: 0.45s; height: 30%; }
.fviz--wave i:nth-child(4n) { animation-delay: 0.7s; height: 12%; }
.fviz--wave i:nth-child(5n) { animation-delay: 0.3s; height: 40%; }
@keyframes fwave { 50% { transform: scaleY(2.6); } }
```

Responsive — inside `@media (max-width: 1080px)`: `.fcard--2 { grid-column: span 3; }` (2-up). Inside `@media (max-width: 760px)`: `.fcard--2, .fcard--3 { grid-column: span 6; } .fcard--wave { flex-direction: column; align-items: stretch; }`.

Reduced motion — add to the existing reduce block: `.fviz--wave i { animation: none; }`.

- [ ] **Step 3: Append micro-visual JS to `agents.js`**

```js
import { reduceMotion } from './shared.js';
```

(merge into the existing import from `./shared.js` — final form: `import { initChrome, reduceMotion } from './shared.js';`)

```js
/* ================= featured micro-visuals ================= */
/* screener feed — same pattern as the landing's audit ticker */
const fpsFeed = document.querySelector('#fpsFeed');
const FPS_POOL = [
  ['TXN-8841', 'vendor name match', 'cleared'],
  ['TXN-8842', 'recurring payee', 'cleared'],
  ['TXN-8847', 'amount pattern typical', 'cleared'],
  ['TXN-8851', 'geo mismatch', 'escalated'],
  ['TXN-8853', 'known counterparty', 'cleared'],
  ['TXN-8860', 'velocity in range', 'cleared'],
];
let fpsIdx = 0;
function pushFps() {
  const [id, why, st] = FPS_POOL[fpsIdx % FPS_POOL.length];
  fpsIdx++;
  const r = document.createElement('div');
  r.className = 'r';
  r.innerHTML = `<span>${id} · ${why}</span><em${st === 'escalated' ? ' class="amber"' : ''}>${st}</em>`;
  fpsFeed.prepend(r);
  while (fpsFeed.children.length > 4) fpsFeed.lastChild.remove();
}
if (fpsFeed) {
  for (let i = 0; i < 4; i++) pushFps();
  if (!reduceMotion) {
    let fpsTimer = 0;
    const fpsIO = new IntersectionObserver(([e]) => {
      clearInterval(fpsTimer);
      if (e.isIntersecting) fpsTimer = setInterval(pushFps, 2200);
    });
    fpsIO.observe(fpsFeed);
  }
}

/* rate readout — small random walk around $2.41/mi */
const rateVal = document.querySelector('#rateVal');
if (rateVal && !reduceMotion) {
  let rate = 2.41;
  const rateIO = new IntersectionObserver(([e]) => {
    clearInterval(rateVal._t);
    if (e.isIntersecting) {
      rateVal._t = setInterval(() => {
        rate = Math.min(2.6, Math.max(2.2, rate + (Math.random() - 0.5) * 0.04));
        rateVal.textContent = rate.toFixed(2);
      }, 1400);
    }
  });
  rateIO.observe(rateVal);
}
```

- [ ] **Step 4: Verify**

```bash
cd v1 && npm run build
grep -c '<article class="fcard' dist/agents.html   # expect 9
```

Browser: screener feed ticks when scrolled into view, rate readout drifts, waveform undulates; six static cards render their visuals. With OS reduced-motion on (or DevTools emulation): feed shows 4 static rows, rate frozen at 2.41, waveform bars static.

- [ ] **Step 5: Commit**

```bash
git add v1/agents.html v1/src/style.css v1/src/agents.js
git commit -m "feat: featured agents bento with micro-visuals"
```

---

### Task 9: Acceptance sweep + docs

**Files:**
- Modify: `flx_landing_explo/CLAUDE.md` (v1 architecture section — add `agents.html`, `src/shared.js`, `src/agents.js`, `vite.config.js`)

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Full build + content audit**

```bash
cd v1 && npm run build
grep -c '<article class="seg' dist/agents.html    # expect 11
grep -c '<li>' dist/agents.html                   # expect 58
grep -c '<article class="fcard' dist/agents.html  # expect 9
grep -c 'href="./agents.html"' dist/index.html    # expect 3
```

- [ ] **Step 2: Manual pass, both pages**

Dev server. Desktop + ~375px (responsive mode):
- `index.html`: everything works as before (terminal compile, audit ticker, router, stats).
- `agents.html`: nav cross-links both directions; three schematics animate with pulses; segment hover highlights stages (desktop); schematics scroll horizontally at 375px; segment grids collapse 3→2→1; featured bento reflows; CTA canvas renders.
- Reduced-motion emulation: no pulses, no live-dot breathing, no wave/feed/rate motion, reveals still make content visible.
- Zero console errors on both pages.

- [ ] **Step 3: Update `CLAUDE.md`**

In the Layout tree and "v1 architecture" section, add one line each for `agents.html` (AI Agents page: value-stream schematics + featured bento), `src/shared.js` (shared page chrome: grain, nav, reveals), `src/agents.js` (agents-page entry), `vite.config.js` (two HTML entries). Keep the existing style of the doc.

- [ ] **Step 4: Commit**

Caution: `CLAUDE.md` already carries unrelated WIP edits in the working tree
(from the real-content work). Stage only your hunks:

```bash
git diff ../CLAUDE.md          # confirm which hunks are yours
git add -p ../CLAUDE.md        # stage ONLY the agents-page hunks
git commit -m "docs: record agents page in repo guide"
```

If `git add -p` is unavailable to you (non-interactive), leave `CLAUDE.md`
uncommitted and report that in your completion summary instead.
