# Merge Value-Stream + Who-It's-For Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On each industry page, merge the "Value stream" (02) and "Who it's for" (03) sections into one section so the segment cards sit directly beneath their pipeline and the existing hover-to-highlight interaction becomes visible; renumber the downstream sections; and lay out logistics' 5 segment cards as a clean centered row.

**Architecture:** Pure HTML + CSS. Per page, the two `<section>` blocks collapse into one `<section id="value-stream">` (primary journey head → `figure.vs` pipeline → a new `.section__subhead` "Who it's for" → the `.segs` cards). No JS changes: `industry.js` already selects a single `.vs` and the `.seg[data-stages]` cards `document`-wide, so the hover wiring keeps working once they share a section. Two small CSS additions: a `.section__subhead` heading style, and a centered-trailing-row rule for a 5-card `.segs` (scoped to a new `.segs--5` modifier so the many other 3-card `.segs` grids are untouched).

**Tech Stack:** Vanilla HTML/CSS in a Vite multi-page project. No test framework — verification is the dev server + Puppeteer screenshots + grep + `npm run build`.

**Spec:** `v1/specs/2026-07-06-merge-value-stream-and-segments-design.md`

## Global Constraints

- Keep all existing copy except: the two lede edits specified below, and the removal of the old segment lede ("Hover a segment to see where its agents sit on the journey.").
- The merged section keeps `id="value-stream"` and the label `02 / Value stream`. Downstream labels shift up one: `04 / Featured`→`03 / Featured`, `05 / Workflows`→`04 / Workflows`, `06 / Next`→`05 / Next`. Section `id`s (`#featured`, `#workflows`, `#cta`) do NOT change — only the visible `.section__no` text.
- Do NOT change: `industry.js`, the `figure.vs` SVG markup, the hover classes (`.vs--dimmed`, `.hot`), the `.seg` card content (incl. `data-stages` and `--i` stagger), or the mobile swipe-strip behavior.
- Do NOT normalize pipeline internals (logistics live stage stays `invoice`).
- Amber accent (`#FCB813`, tokens `--amber`/`--amber-line`) only where it already appears; the amber period `<span class="amber">.</span>` stays in headings.
- Responsive breakpoints already in `style.css`: `.segs` is 3-col by default, `repeat(2,1fr)` at `@media (max-width: 1080px)`, `1fr` at `@media (max-width: 760px)`. The 5-card centering must apply only above 1080px so those existing rules govern tablet/mobile untouched.
- Branch: `feat/merge-vs-segments` (already checked out). Commit after each task.
- Dev server: `cd v1 && npm run dev` → http://localhost:4321 (strict port). Puppeteer via `NODE_PATH="<repo>/v1/node_modules" node -e '…'`; element `clip` capture returns black on these pages — use full-viewport 1440×900 and crop with `sips` if needed. Look at every screenshot with the Read tool.

---

### Task 1: Banking — merge sections + add `.section__subhead` CSS

**Files:**
- Modify: `v1/banking.html` (replace the two sections at lines ~155–259 (`id="value-stream"`) and ~261–end-of `id="segments"` (~215–259); renumber `04/05/06` labels)
- Modify: `v1/src/style.css` (add `.section__subhead` rules near the other section-head styles, e.g. after `.section__lede` at line ~487)

**Interfaces:**
- Produces: the `.section__subhead` / `.section__subhead__eyebrow` / `.section__subhead__title` CSS classes and the merged-section HTML pattern, both reused verbatim (with per-page copy) by Tasks 2 and 3.
- Consumes: nothing from other tasks.

- [ ] **Step 1: Add the `.section__subhead` CSS**

In `v1/src/style.css`, immediately after the `.section__lede { … }` rule (ends at line ~487), add:

```css
/* secondary heading inside a merged section (e.g. "Who it's for" under the
   value-stream pipeline) — smaller than the section h2, with a mono eyebrow */
.section__subhead {
  margin-top: clamp(40px, 6vh, 72px);
  margin-bottom: clamp(20px, 3vh, 34px);
}
.section__subhead__eyebrow {
  display: block;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 14px;
}
.section__subhead__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 2.2rem);
  font-weight: 620;
  letter-spacing: -0.024em;
  line-height: 1.08;
  max-width: 22ch;
}
```

- [ ] **Step 2: Merge the banking sections**

In `v1/banking.html`, replace everything from the opening `<section class="section" id="value-stream">` through the closing `</section>` of `id="segments"` (i.e. the entire current 02 and 03 blocks, including the `<!-- ===== SEGMENTS ===== -->` comment between them) with the single merged section below.

Keep the `figure.vs …>…</figure>` block **verbatim** from the current file (the `<figure class="vs rv" style="--i:2" role="img" aria-label="Lending journey pipeline…">` … `</figure>` — do not retype the SVG, move it unchanged). Keep the three `<article class="seg rv" …>…</article>` cards **verbatim** (Retail Banking / Commercial & Corporate / Risk & Compliance).

```html
    <!-- ================= VALUE STREAM + WHO IT'S FOR ================= -->
    <section class="section" id="value-stream">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">02 / Value stream</span>
          <div class="section__headline">
            <h2 class="h2 rv">The lending journey, end to end<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From first application to funded account —
              agents attach to every stage of origination, onboarding, and risk. Hover a role
              below to see where its agents sit.</p>
          </div>
        </div>

        <!-- KEEP VERBATIM: the existing <figure class="vs rv" style="--i:2" …>…</figure> -->

        <div class="section__subhead">
          <span class="section__subhead__eyebrow mono rv">Who it's for</span>
          <h3 class="section__subhead__title rv" style="--i:1">Built for every banking desk<span class="amber">.</span></h3>
        </div>

        <div class="segs segs--3">
          <!-- KEEP VERBATIM: the three existing <article class="seg rv" …>…</article> cards -->
        </div>
      </div>
    </section>
```

Net effect: the primary lede gains the "Hover a role below to see where its agents sit." clause; the old `<div class="section__head">` of the segments section (its `03 / Who it's for` number, `h2`, and lede) is replaced by the `.section__subhead`; the second `<section>`/`<div class="shell">` wrappers are gone.

- [ ] **Step 3: Renumber downstream section labels**

In `v1/banking.html`, change exactly these three strings:
- `>04 / Featured<` → `>03 / Featured<`
- `>05 / Workflows<` → `>04 / Workflows<`
- `>06 / Next<` → `>05 / Next<`

- [ ] **Step 4: Verify**

Run `cd v1 && npm run dev` if not already up, open `http://localhost:4321/banking.html`.
Expected: a single section `02 / Value stream`; the journey h2 + extended lede, then the pipeline, then a "WHO IT'S FOR" eyebrow + "Built for every banking desk." sub-heading, then the three segment cards. Hovering a segment card dims the pipeline and highlights its stages (visible in the same viewport). Downstream sections now read `03 / Featured`, `04 / Workflows`, `05 / Next`. Take a full-viewport screenshot (1440×900) plus one while hovering a card (dispatch `mouseenter` via puppeteer `page.hover('.seg')`), save under the scratchpad, and Read them to confirm. Confirm no console errors (`page.on('pageerror')`).

Grep check:
```bash
grep -c 'id="segments"' v1/banking.html   # expect 0
grep -c 'section__subhead' v1/banking.html # expect 3 (block + eyebrow + title)
```

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/banking.html v1/src/style.css
git commit -m "feat(banking): merge value-stream + who-it's-for into one section

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Insurance — merge sections

**Files:**
- Modify: `v1/insurance.html` (replace the `id="value-stream"` and `id="segments"` sections; renumber `04/05/06`)

**Interfaces:**
- Consumes: `.section__subhead` CSS from Task 1 (already in `style.css`).
- Produces: nothing used later.

- [ ] **Step 1: Merge the insurance sections**

In `v1/insurance.html`, replace everything from `<section class="section" id="value-stream">` through the closing `</section>` of `id="segments"` with the merged section below. Keep the `<figure class="vs rv" … aria-label="Claims journey pipeline…">…</figure>` **verbatim**, and the three `<article class="seg rv" …>` cards (Insurers & Carriers / Brokers / Reinsurance) **verbatim**.

```html
    <!-- ================= VALUE STREAM + WHO IT'S FOR ================= -->
    <section class="section" id="value-stream">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">02 / Value stream</span>
          <div class="section__headline">
            <h2 class="h2 rv">The claims journey, end to end<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From first notice of loss to settlement —
              agents for carriers, brokers, and reinsurers at every step. Hover a role below to
              see where its agents sit.</p>
          </div>
        </div>

        <!-- KEEP VERBATIM: the existing <figure class="vs rv" style="--i:2" …>…</figure> -->

        <div class="section__subhead">
          <span class="section__subhead__eyebrow mono rv">Who it's for</span>
          <h3 class="section__subhead__title rv" style="--i:1">Built for every side of the risk<span class="amber">.</span></h3>
        </div>

        <div class="segs segs--3">
          <!-- KEEP VERBATIM: the three existing <article class="seg rv" …>…</article> cards -->
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Renumber downstream section labels**

In `v1/insurance.html`, change:
- `>04 / Featured<` → `>03 / Featured<`
- `>05 / Workflows<` → `>04 / Workflows<`
- `>06 / Next<` → `>05 / Next<`

- [ ] **Step 3: Verify**

Open `http://localhost:4321/insurance.html`. Expected: single `02 / Value stream` section, pipeline above "WHO IT'S FOR" + "Built for every side of the risk." + the 3 cards; hover highlights pipeline stages; downstream reads `03/04/05`. Full-viewport screenshot + a hover screenshot, saved to scratchpad and Read. No console errors.

```bash
grep -c 'id="segments"' v1/insurance.html   # expect 0
```

- [ ] **Step 4: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/insurance.html
git commit -m "feat(insurance): merge value-stream + who-it's-for into one section

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Logistics — merge sections + 5-card centered grid

**Files:**
- Modify: `v1/logistics.html` (replace the `id="value-stream"` and `id="segments"` sections; the segments grid becomes `class="segs segs--5"`; renumber `04/05/06`)
- Modify: `v1/src/style.css` (add the `.segs--5` centering rule after the `.segs` rule at line ~1223)

**Interfaces:**
- Consumes: `.section__subhead` CSS from Task 1.
- Produces: nothing used later.

- [ ] **Step 1: Add the 5-card centering CSS**

In `v1/src/style.css`, immediately after the `.segs { … }` rule (line ~1223), add:

```css
/* 5-persona grid (logistics): keep the 3-up first row, center the trailing two.
   A 6-col track lets each card span 2 (== 3-up); the 4th/5th cards shift in by
   one column so the second row of two is centered. Desktop-only — below 1080px
   the base .segs 2-col / 1-col rules govern. */
@media (min-width: 1081px) {
  .segs--5 { grid-template-columns: repeat(6, 1fr); }
  .segs--5 > .seg { grid-column: span 2; }
  .segs--5 > .seg:nth-child(4) { grid-column: 2 / span 2; }
  .segs--5 > .seg:nth-child(5) { grid-column: 4 / span 2; }
}
```

- [ ] **Step 2: Merge the logistics sections**

In `v1/logistics.html`, replace everything from `<section class="section" id="value-stream">` through the closing `</section>` of `id="segments"` with the merged section below. Keep the `<figure class="vs rv" … aria-label="Freight lifecycle pipeline…">…</figure>` **verbatim**, and the five `<article class="seg rv" …>` cards (Carriers / 3PLs / Brokers / Forwarders / Shippers) **verbatim** — including the existing `<!-- DRAFT — marketing review… -->` comment above them. Note the grid class changes from `segs segs--3` to `segs segs--5`.

```html
    <!-- ================= VALUE STREAM + WHO IT'S FOR ================= -->
    <section class="section" id="value-stream">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">02 / Value stream</span>
          <div class="section__headline">
            <h2 class="h2 rv">The freight lifecycle, end to end<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From quote to invoice — agents for carriers,
              3PLs, brokers, forwarders, and shippers along the whole move. Hover a role below to
              see where its agents sit.</p>
          </div>
        </div>

        <!-- KEEP VERBATIM: the existing <figure class="vs rv" style="--i:2" …>…</figure> -->

        <div class="section__subhead">
          <span class="section__subhead__eyebrow mono rv">Who it's for</span>
          <h3 class="section__subhead__title rv" style="--i:1">Built for every link in the chain<span class="amber">.</span></h3>
        </div>

        <div class="segs segs--5">
          <!-- KEEP VERBATIM: the DRAFT comment + the five existing <article class="seg rv" …>…</article> cards -->
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Renumber downstream section labels**

In `v1/logistics.html`, change:
- `>04 / Featured<` → `>03 / Featured<`
- `>05 / Workflows<` → `>04 / Workflows<`
- `>06 / Next<` → `>05 / Next<`

- [ ] **Step 4: Verify (incl. the centered grid at three widths)**

Open `http://localhost:4321/logistics.html`.
Expected at desktop (1440×900): single `02 / Value stream` section; pipeline above "WHO IT'S FOR" + "Built for every link in the chain."; the 5 cards render as a top row of 3 and a **centered** row of 2 (no empty-cell hole, no left-alignment). Hover a card → pipeline stages highlight. Downstream reads `03/04/05`.
Also screenshot at width 1000 (expect clean 2-col: rows of 2/2/1) and 700 (expect 1-col stack). Take full-viewport screenshots at 1440, 1000, and 700 wide, save to scratchpad, and Read each to confirm the layouts. Confirm no console errors and no horizontal page scroll at 700.

```bash
grep -c 'id="segments"' v1/logistics.html   # expect 0
grep -c 'segs--5' v1/logistics.html         # expect 1
```

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/logistics.html v1/src/style.css
git commit -m "feat(logistics): merge value-stream + who-it's-for; center 5-card grid

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Cross-page verification + build

**Files:**
- No source changes expected (verification only; fix-forward if a check fails).

**Interfaces:**
- Consumes: Tasks 1–3 complete.
- Produces: nothing.

- [ ] **Step 1: Grep sweep**

Run from the repo root:
```bash
grep -rn 'id="segments"' v1/*.html            # expect no output
grep -rn '#segments' v1/*.html v1/src          # expect no output
grep -rn 'Who it.s for' v1/banking.html v1/insurance.html v1/logistics.html  # expect the 3 subhead eyebrows only
grep -rn 'section__no mono">0' v1/banking.html v1/insurance.html v1/logistics.html
# expect each page: 01 problem, 02 value stream, 03 featured, 04 workflows, 05 next (no 06)
```
Expected: no `#segments` references anywhere; each page's section numbers run 01→05 with no gaps or `06`.

- [ ] **Step 2: Build**

```bash
cd v1 && npm run build
```
Expected: `✓ built in …`, no errors.

- [ ] **Step 3: Final visual pass**

With the dev server running, screenshot all three pages once more at 1440×900 and confirm each shows one merged `02 / Value stream` section (pipeline → "Who it's for" → cards) and correct downstream numbering. Read the screenshots. Confirm reduced-motion still resolves (puppeteer `page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}])`): reveals shown, pipeline static swipe-strip, cards visible.

- [ ] **Step 4: Commit (only if any fix-forward change was needed)**

```bash
cd "$(git rev-parse --show-toplevel)" && git add -A
git commit -m "fix: address cross-page verification findings for merged section

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
If no changes were needed, skip this commit and note the clean verification in the task report.
