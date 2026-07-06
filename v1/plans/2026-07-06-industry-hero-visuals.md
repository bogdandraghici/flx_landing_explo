# Industry Hero Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the shared orbit-ring hero SVG on the banking, insurance, and logistics pages with three bespoke, industry-metaphor visuals (vault unlocking / shield deflecting risk / optimal route).

**Architecture:** Pure HTML + CSS change. Each page's `.ahero__viz` gets a new inline SVG; motion is CSS keyframes (for anything that must freeze under reduced motion) and SMIL `animateMotion`/`animate` (for traveling elements, hidden under reduced motion). Styles append to `src/style.css` in per-page namespaces (`bkv-*`, `shv-*`, `rtv-*`) plus a tiny shared label voice (`ivz-*`), following the resources-page `rk-*` precedent. No JS changes.

**Tech Stack:** Vanilla HTML/SVG/CSS in a Vite multi-page project. No test framework — verification is visual (dev server) + `npm run build` + grep.

**Spec:** `v1/specs/2026-07-06-industry-hero-visuals-design.md`

## Global Constraints

- Amber `var(--amber)` (#FCB813) is the only accent — used only at each metaphor's "resolution" moment.
- Hairline strokes ~1–1.4px; palette from tokens: `--line-soft`, `--bg`, `--bg-raised`, `--text-faint`, `--font-mono`, low-alpha whites (match `rk-*` values).
- Every SVG's **base (unanimated) pose is the resolved state** (vault aligned, asset intact, route drawn) — that's what reduced-motion users see.
- SMIL-driven movers must be hidden with `display: none` in the `@media (prefers-reduced-motion: reduce)` block (SMIL ignores `animation: none`); CSS-animated elements get `animation: none` there.
- CSS transforms on SVG elements need explicit `transform-origin: 230px 230px` (SVG default origin is the viewBox corner, not the shape center).
- CSS `transform` replaces attribute `transform` — never CSS-animate an element that carries an attribute transform; wrap it in a `<g>` and animate the group.
- Keep the wrapper `<div class="ahero__viz" aria-hidden="true">` exactly as-is on all three pages; only replace the `<svg>` inside it. `.ahero__viz svg` (style.css:1157) already handles sizing.
- Working branch: `feat/real-content` (already checked out). Commit after each task.
- Dev server: `cd v1 && npm run dev` → http://localhost:4321 (strict port).

---

### Task 1: Banking hero — vault unlocking

**Files:**
- Modify: `v1/banking.html` (the `<svg>` inside `.ahero__viz`, lines ~76–106)
- Modify: `v1/src/style.css` (append new section before the `REDUCED MOTION` block or at end of file; add rules inside the existing `@media (prefers-reduced-motion: reduce)` block at line ~1746)

**Interfaces:**
- Produces: shared CSS classes `.ivz-lbl` (mono SVG label) and `.ivz-tag` (bg-fill rect behind a label) — Tasks 2 and 3 reuse them verbatim. Also establishes the reduced-motion pattern Tasks 2–3 extend.
- Consumes: nothing from other tasks.

**The metaphor:** three concentric tumbler rings, each with a notch gap, rotate (CSS keyframes, one shared 12s loop) from scattered start angles into alignment one by one; when all notches line up into a vertical channel at 12 o'clock, an amber channel line + bolt pulse + `approved` tag appear ("approval granted"), then the rings drift back and the loop repeats. Base pose (no animation): all rings aligned, channel + tag visible.

- [ ] **Step 1: Replace the banking hero SVG**

In `v1/banking.html`, replace the entire `<svg …>…</svg>` element inside `<div class="ahero__viz" aria-hidden="true">` (currently the `bkRing` orbit + FlowX chip, everything from `<svg viewBox="0 0 460 460"…>` through its closing `</svg>`) with:

```html
<svg viewBox="0 0 460 460" role="img" aria-label="A bank vault's tumbler rings rotating into alignment and unlocking — approval granted">
  <!-- static tracks under the tumblers -->
  <circle class="bkv-track" cx="230" cy="230" r="170"/>
  <circle class="bkv-track" cx="230" cy="230" r="136"/>
  <circle class="bkv-track" cx="230" cy="230" r="102"/>

  <!-- tumbler rings: each gapped arc rotates (CSS) from a scattered start
       angle into alignment; the attribute rotate(-90) puts each gap at
       12 o'clock in the aligned pose, so CSS rotate(0) = aligned -->
  <g class="bkv-ring bkv-ring--1">
    <circle class="bkv-arc" cx="230" cy="230" r="170" transform="rotate(-90 230 230)"
      stroke-dasharray="1022.14 46" stroke-dashoffset="-23"/>
    <line class="bkv-tick" x1="87.1" y1="312.5" x2="78.4" y2="317.5"/>
    <line class="bkv-tick" x1="272.7" y1="70.6" x2="275.3" y2="61.0"/>
  </g>
  <g class="bkv-ring bkv-ring--2">
    <circle class="bkv-arc" cx="230" cy="230" r="136" transform="rotate(-90 230 230)"
      stroke-dasharray="814.51 40" stroke-dashoffset="-20"/>
    <line class="bkv-tick" x1="295.5" y1="343.4" x2="300.5" y2="352.1"/>
    <line class="bkv-tick" x1="106.9" y1="185.2" x2="97.5" y2="181.8"/>
  </g>
  <g class="bkv-ring bkv-ring--3">
    <circle class="bkv-arc" cx="230" cy="230" r="102" transform="rotate(-90 230 230)"
      stroke-dasharray="606.88 34" stroke-dashoffset="-17"/>
    <line class="bkv-tick" x1="314.0" y1="181.5" x2="322.7" y2="176.5"/>
  </g>

  <!-- hub + handle wheel: quarter-turn when the vault opens -->
  <circle class="bkv-hub" cx="230" cy="230" r="64"/>
  <g class="bkv-wheel">
    <circle class="bkv-hub" cx="230" cy="230" r="48"/>
    <line class="bkv-spoke" x1="230" y1="216" x2="230" y2="182"/>
    <line class="bkv-spoke" x1="242.1" y1="237" x2="271.6" y2="254"/>
    <line class="bkv-spoke" x1="217.9" y1="237" x2="188.4" y2="254"/>
  </g>
  <circle class="bkv-bolt" cx="230" cy="230" r="7"/>

  <!-- resolution: the unlocked channel through the aligned notches -->
  <line class="bkv-channel" x1="230" y1="164" x2="230" y2="42"/>
  <circle class="bkv-pulse" cx="230" cy="230" r="64"/>
  <g class="bkv-tag-g" transform="translate(230 24)">
    <rect class="ivz-tag" x="-31" y="-10" width="62" height="14"/>
    <text class="ivz-lbl" text-anchor="middle" y="1">approved</text>
  </g>
</svg>
```

Also update the HTML comment above the wrapper from `<!-- single industry ring: banking agents orbiting the FlowX core -->` to `<!-- vault unlocking: tumbler rings align, the channel opens — approval granted -->`.

- [ ] **Step 2: Append the banking + shared CSS**

In `v1/src/style.css`, directly **above** the `/* ==== REDUCED MOTION ==== */` section header (line ~1743), add:

```css
/* ============================================================
   INDUSTRY HERO VISUALS — bespoke metaphors (banking / insurance / logistics)
   ============================================================ */
/* shared label voice for all three visuals (same tone as .abx-cat) */
.ivz-lbl { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; fill: var(--text-faint); }
.ivz-tag { fill: var(--bg); }

/* --- banking hero: vault unlocking (bkv-*) --- */
.bkv-track { fill: none; stroke: rgba(255, 255, 255, 0.05); stroke-width: 1; }
.bkv-arc { fill: none; stroke: rgba(255, 255, 255, 0.25); stroke-width: 1.2; }
.bkv-tick { stroke: rgba(205, 212, 226, 0.35); stroke-width: 1; }
.bkv-ring { transform-origin: 230px 230px; }
.bkv-ring--1 { animation: bkv-r1 12s cubic-bezier(0.7, 0, 0.25, 1) infinite; }
.bkv-ring--2 { animation: bkv-r2 12s cubic-bezier(0.7, 0, 0.25, 1) infinite; }
.bkv-ring--3 { animation: bkv-r3 12s cubic-bezier(0.7, 0, 0.25, 1) infinite; }
.bkv-hub { fill: none; stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; }
.bkv-wheel { transform-origin: 230px 230px; animation: bkv-turn 12s cubic-bezier(0.7, 0, 0.25, 1) infinite; }
.bkv-spoke { stroke: rgba(255, 255, 255, 0.3); stroke-width: 1.2; stroke-linecap: round; }
.bkv-bolt { fill: var(--amber); }
.bkv-channel { stroke: var(--amber); stroke-width: 1.2; opacity: 0.9; animation: bkv-open 12s linear infinite; }
.bkv-pulse { fill: none; stroke: var(--amber); stroke-width: 1; opacity: 0; transform-origin: 230px 230px; animation: bkv-pulse 12s ease-out infinite; }
.bkv-tag-g { opacity: 0.9; animation: bkv-open 12s linear infinite; }

@keyframes bkv-r1 { 0% { transform: rotate(210deg); } 22%, 86% { transform: rotate(0deg); } 100% { transform: rotate(210deg); } }
@keyframes bkv-r2 { 0%, 10% { transform: rotate(-150deg); } 36%, 86% { transform: rotate(0deg); } 100% { transform: rotate(-150deg); } }
@keyframes bkv-r3 { 0%, 24% { transform: rotate(120deg); } 50%, 86% { transform: rotate(0deg); } 100% { transform: rotate(120deg); } }
@keyframes bkv-turn { 0%, 52% { transform: rotate(0deg); } 62%, 86% { transform: rotate(90deg); } 100% { transform: rotate(0deg); } }
@keyframes bkv-open { 0%, 52% { opacity: 0; } 58%, 82% { opacity: 0.9; } 90%, 100% { opacity: 0; } }
@keyframes bkv-pulse { 0%, 53% { opacity: 0; transform: scale(0.72); } 57% { opacity: 0.8; } 72%, 100% { opacity: 0; transform: scale(1.12); } }
```

- [ ] **Step 3: Add banking reduced-motion rules**

Inside the existing `@media (prefers-reduced-motion: reduce)` block (after the `.ahero__viz .abx-port, .ahero__viz .hero-agent { display: none; }` line), add:

```css
  /* industry hero visuals: freeze CSS motion on the resolved pose */
  .bkv-ring--1, .bkv-ring--2, .bkv-ring--3, .bkv-wheel, .bkv-channel, .bkv-pulse, .bkv-tag-g { animation: none; }
```

(The base styles are the resolved pose: rings aligned, channel + tag visible at 0.9, pulse hidden.)

- [ ] **Step 4: Verify visually**

Run: `cd v1 && npm run dev` (background), open `http://localhost:4321/banking.html`.
Expected: right column shows three thin tumbler rings rotating with a "click" feel into alignment (~first 6s), notch gaps lining up vertically at 12 o'clock; then an amber vertical channel line, a brief amber pulse ring around the hub, a quarter-turn of the 3-spoke wheel, and the `APPROVED` tag; then rings drift back and the loop repeats every 12s. No FlowX chip, no orbiting dots. If a notch gap is visibly off 12 o'clock in the aligned pose, adjust that ring's `stroke-dashoffset` sign/value (it should equal −gap/2) until centered.

Also emulate reduced motion (DevTools → Rendering → `prefers-reduced-motion: reduce`): the scene must be static, rings aligned, channel + tag visible, nothing drifting.

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/banking.html v1/src/style.css
git commit -m "feat(banking): vault-unlocking hero visual replacing shared orbit ring

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Insurance hero — shield deflecting risk

**Files:**
- Modify: `v1/insurance.html` (the `<svg>` inside `.ahero__viz`, lines ~76–106)
- Modify: `v1/src/style.css` (append after the `bkv-*` section; extend the reduced-motion block)

**Interfaces:**
- Consumes: `.ivz-lbl`, `.ivz-tag` from Task 1 (defined in style.css).
- Produces: nothing used by later tasks.

**The metaphor:** risk particles fall from the top on staggered SMIL loops; four deflect off a thin shield arc protecting an asset card; once per 7s cycle one lands inside and the card gets an amber restore sweep (same read-head language as the resources page) — coverage making it whole. A `covered` tag sits on the arc apex. Base pose: shield + intact card + tag; particles and sweep are SMIL-only and hidden under reduced motion.

- [ ] **Step 1: Replace the insurance hero SVG**

In `v1/insurance.html`, replace the entire `<svg …>…</svg>` inside `<div class="ahero__viz" aria-hidden="true">` with:

```html
<svg viewBox="0 0 460 460" role="img" aria-label="A shield arc deflecting falling risk while the insured asset beneath is kept whole">
  <!-- risk particles: four deflect off the arc, one lands and is restored -->
  <g class="shv-p">
    <circle r="2.6"/>
    <animateMotion dur="5.6s" begin="0s" repeatCount="indefinite" path="M150 -10 L150 200 Q150 216 128 228 T 74 254"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5.6s" begin="0s" repeatCount="indefinite"/>
  </g>
  <g class="shv-p">
    <circle r="2.6"/>
    <animateMotion dur="5.6s" begin="-1.4s" repeatCount="indefinite" path="M310 -10 L310 200 Q310 216 332 228 T 386 254"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5.6s" begin="-1.4s" repeatCount="indefinite"/>
  </g>
  <g class="shv-p">
    <circle r="2.6"/>
    <animateMotion dur="5.6s" begin="-2.8s" repeatCount="indefinite" path="M190 -10 L190 176 Q190 190 168 198 T 116 228"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5.6s" begin="-2.8s" repeatCount="indefinite"/>
  </g>
  <g class="shv-p">
    <circle r="2.6"/>
    <animateMotion dur="5.6s" begin="-4.2s" repeatCount="indefinite" path="M262 -10 L262 174 Q262 186 284 194 T 340 222"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5.6s" begin="-4.2s" repeatCount="indefinite"/>
  </g>
  <!-- the one that gets through: falls, lands on the asset, fades -->
  <g class="shv-p">
    <circle r="2.6"/>
    <animateMotion dur="7s" begin="0s" repeatCount="indefinite" calcMode="linear"
      keyPoints="0;1;1" keyTimes="0;0.2;1" path="M230 -10 L230 270"/>
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.2;0.26;1" dur="7s" begin="0s" repeatCount="indefinite"/>
  </g>

  <!-- shield arcs over the asset -->
  <path class="shv-arc--outer" d="M96 300 A134 134 0 0 1 364 300"/>
  <path class="shv-arc" d="M110 300 A120 120 0 0 1 350 300"/>
  <g transform="translate(230 166)">
    <rect class="ivz-tag" x="-31" y="-10" width="62" height="14"/>
    <text class="ivz-lbl" text-anchor="middle" y="1">covered</text>
  </g>

  <!-- the insured asset: intact card, same language as the resources doc stack -->
  <rect class="shv-card" x="150" y="278" width="160" height="92" rx="12"/>
  <rect class="shv-title" x="170" y="298" width="64" height="8" rx="4"/>
  <line class="shv-line" x1="170" y1="322" x2="290" y2="322"/>
  <line class="shv-line" x1="170" y1="338" x2="258" y2="338"/>
  <line class="shv-ground" x1="120" y1="392" x2="340" y2="392"/>
  <text class="ivz-lbl" x="230" y="412" text-anchor="middle">asset &#183; intact</text>

  <!-- restore sweep: after the landed particle, the card is made whole -->
  <g class="shv-restore">
    <rect class="shv-glow" x="152" y="280" width="156" height="12" rx="3"/>
    <rect class="shv-scan" x="152" y="286" width="156" height="1.6"/>
    <animateTransform attributeName="transform" attributeType="XML" type="translate"
      values="0 0; 0 0; 0 74; 0 74" keyTimes="0; 0.24; 0.52; 1" dur="7s" begin="0s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.22;0.26;0.5;0.56;1" dur="7s" begin="0s" repeatCount="indefinite"/>
  </g>
</svg>
```

Also update the comment above the wrapper to `<!-- shield deflecting risk: the covered asset stays whole; what lands is restored -->`.

- [ ] **Step 2: Append the insurance CSS**

In `v1/src/style.css`, directly after the `bkv-*` keyframes from Task 1, add:

```css
/* --- insurance hero: shield deflecting risk (shv-*) --- */
.shv-arc { fill: none; stroke: rgba(255, 255, 255, 0.30); stroke-width: 1.2; }
.shv-arc--outer { fill: none; stroke: rgba(255, 255, 255, 0.08); stroke-width: 1; }
.shv-card { fill: var(--bg-raised); stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; }
.shv-title { fill: rgba(233, 236, 242, 0.45); }
.shv-line { stroke: rgba(205, 212, 226, 0.22); stroke-width: 2.4; stroke-linecap: round; }
.shv-ground { stroke: rgba(255, 255, 255, 0.06); stroke-width: 1; }
.shv-p { fill: rgba(205, 212, 226, 0.42); }
.shv-glow { fill: var(--amber); opacity: 0.10; }
.shv-scan { fill: var(--amber); }
```

- [ ] **Step 3: Extend the reduced-motion rules**

In the `@media (prefers-reduced-motion: reduce)` block, after the `.bkv-…` line from Task 1, add:

```css
  /* SMIL movers can't be frozen by CSS — hide them; the static scene is the resolved pose */
  .shv-p, .shv-restore { display: none; }
```

- [ ] **Step 4: Verify visually**

Open `http://localhost:4321/insurance.html`.
Expected: small grey particles fall from the top; four kiss the shield arc and slide off along its outside, fading out below; every 7s one falls through the arc's apex, lands on the card, and an amber glow + scan line sweeps the card top→bottom. Card, arcs, `COVERED` tag, and `ASSET · INTACT` label are static. If a deflecting particle visibly clips *inside* the arc, nudge its path's `Q`/`T` control points a few px outward — contact points were computed for the r=120 arc but are decorative.

Reduced motion: static shield + intact card + tag, no particles, no sweep.

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/insurance.html v1/src/style.css
git commit -m "feat(insurance): shield-deflecting-risk hero visual replacing shared orbit ring

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Logistics hero — optimal route

**Files:**
- Modify: `v1/logistics.html` (the `<svg>` inside `.ahero__viz`, lines ~76–106)
- Modify: `v1/src/style.css` (append after the `shv-*` section; extend the reduced-motion block)

**Interfaces:**
- Consumes: `.ivz-lbl` from Task 1.
- Produces: nothing used by later tasks.

**The metaphor:** a node network with faint dashed alternate edges; two "considered" alternates flicker briefly, then the optimal path draws itself in amber (`quote` → `invoice`, 3 legs) and a shipment dot travels it; the destination ring pulses on arrival. 9s loop. Base pose: route fully drawn, alternates dim, dot hidden.

- [ ] **Step 1: Replace the logistics hero SVG**

In `v1/logistics.html`, replace the entire `<svg …>…</svg>` inside `<div class="ahero__viz" aria-hidden="true">` with:

```html
<svg viewBox="0 0 460 460" role="img" aria-label="A route network where the optimal path lights up and a shipment travels it from quote to invoice">
  <!-- alternate edges: the network the optimiser considered -->
  <line class="rtv-alt" x1="64" y1="300" x2="150" y2="218"/>
  <line class="rtv-alt" x1="64" y1="300" x2="156" y2="352"/>
  <line class="rtv-alt" x1="104" y1="120" x2="150" y2="218"/>
  <line class="rtv-alt" x1="104" y1="120" x2="236" y2="132"/>
  <line class="rtv-alt" x1="150" y1="218" x2="236" y2="132"/>
  <line class="rtv-alt rtv-alt--scan" x1="150" y1="218" x2="250" y2="282"/>
  <line class="rtv-alt" x1="156" y1="352" x2="250" y2="282"/>
  <line class="rtv-alt" x1="156" y1="352" x2="262" y2="388"/>
  <line class="rtv-alt rtv-alt--scan" x1="236" y1="132" x2="338" y2="206"/>
  <line class="rtv-alt" x1="250" y1="282" x2="344" y2="330"/>
  <line class="rtv-alt" x1="262" y1="388" x2="344" y2="330"/>
  <line class="rtv-alt" x1="338" y1="206" x2="344" y2="330"/>
  <line class="rtv-alt" x1="344" y1="330" x2="398" y2="262"/>

  <!-- the optimal path: quote → invoice in 3 legs; pathLength=100 so the
       dash draw animates in percentages -->
  <path id="rtvRoute" class="rtv-route" pathLength="100" d="M64 300 L250 282 L338 206 L398 262"/>

  <!-- nodes -->
  <circle class="rtv-node" cx="150" cy="218" r="3"/>
  <circle class="rtv-node" cx="156" cy="352" r="3"/>
  <circle class="rtv-node" cx="104" cy="120" r="3"/>
  <circle class="rtv-node" cx="236" cy="132" r="3"/>
  <circle class="rtv-node" cx="250" cy="282" r="3"/>
  <circle class="rtv-node" cx="262" cy="388" r="3"/>
  <circle class="rtv-node" cx="338" cy="206" r="3"/>
  <circle class="rtv-node" cx="344" cy="330" r="3"/>
  <circle class="rtv-node rtv-node--end" cx="64" cy="300" r="3.4"/>
  <circle class="rtv-ring" cx="64" cy="300" r="7"/>
  <circle class="rtv-node rtv-node--end" cx="398" cy="262" r="3.4"/>
  <circle class="rtv-ring" cx="398" cy="262" r="7"/>

  <!-- endpoints named in the page's own words: from quote to invoice -->
  <text class="ivz-lbl" x="64" y="326" text-anchor="middle">quote</text>
  <text class="ivz-lbl" x="398" y="244" text-anchor="middle">invoice</text>
  <text class="ivz-lbl" x="64" y="428">3 legs &#183; cleared</text>

  <!-- the shipment: departs once the route is drawn, arrival pulse at the end -->
  <circle class="rtv-dot" r="3.4">
    <animateMotion dur="9s" repeatCount="indefinite" calcMode="linear"
      keyPoints="0;0;1;1" keyTimes="0;0.38;0.84;1"><mpath href="#rtvRoute"/></animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.38;0.41;0.84;0.88;1" dur="9s" repeatCount="indefinite"/>
  </circle>
  <circle class="rtv-arrive" cx="398" cy="262" r="9">
    <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.84;0.87;0.95;1" dur="9s" repeatCount="indefinite"/>
  </circle>
</svg>
```

Also update the comment above the wrapper to `<!-- optimal route: the network considered, the best path chosen, the shipment moved -->`.

- [ ] **Step 2: Append the logistics CSS**

In `v1/src/style.css`, directly after the `shv-*` block from Task 2, add:

```css
/* --- logistics hero: optimal route (rtv-*) --- */
.rtv-alt { stroke: rgba(255, 255, 255, 0.10); stroke-width: 1; stroke-dasharray: 3 5; }
.rtv-alt--scan { stroke: rgba(255, 255, 255, 0.28); opacity: 0.2; animation: rtv-consider 9s linear infinite; }
.rtv-node { fill: rgba(205, 212, 226, 0.35); }
.rtv-node--end { fill: rgba(233, 236, 242, 0.6); }
.rtv-ring { fill: none; stroke: rgba(255, 255, 255, 0.18); stroke-width: 1; }
.rtv-route { fill: none; stroke: var(--amber); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 100; stroke-dashoffset: 0; animation: rtv-draw 9s linear infinite; }
.rtv-dot { fill: var(--amber); }
.rtv-arrive { fill: none; stroke: var(--amber); stroke-width: 1; opacity: 0; }

@keyframes rtv-draw {
  0% { stroke-dashoffset: 100; opacity: 0; }
  8% { stroke-dashoffset: 100; opacity: 1; }
  36% { stroke-dashoffset: 0; opacity: 1; }
  94% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes rtv-consider { 0% { opacity: 0.2; } 8%, 26% { opacity: 1; } 40%, 100% { opacity: 0.2; } }
```

- [ ] **Step 3: Extend the reduced-motion rules**

In the `@media (prefers-reduced-motion: reduce)` block, extend the two industry-viz lines so they read:

```css
  /* industry hero visuals: freeze CSS motion on the resolved pose */
  .bkv-ring--1, .bkv-ring--2, .bkv-ring--3, .bkv-wheel, .bkv-channel, .bkv-pulse, .bkv-tag-g,
  .rtv-route, .rtv-alt--scan { animation: none; }
  /* SMIL movers can't be frozen by CSS — hide them; the static scene is the resolved pose */
  .shv-p, .shv-restore, .rtv-dot, .rtv-arrive { display: none; }
```

- [ ] **Step 4: Verify visually**

Open `http://localhost:4321/logistics.html`.
Expected: dashed faint network; early in the loop two alternate edges flicker brighter ("considered"), then the amber route draws from `QUOTE` to `INVOICE` across 3 legs, an amber dot travels it, and the destination ring blips on arrival; brief fade, loop repeats every 9s. `3 LEGS · CLEARED` readout sits bottom-left.

Reduced motion: static network with the amber route fully drawn, no dot, no flicker.

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/logistics.html v1/src/style.css
git commit -m "feat(logistics): optimal-route hero visual replacing shared orbit ring

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Remove the dead orbit-viz CSS and verify the build

**Files:**
- Modify: `v1/src/style.css` (delete now-unused rules at ~652–659 area and ~1158–1165, plus one reduced-motion line at ~1766)

**Interfaces:**
- Consumes: Tasks 1–3 must be complete (no page references the orbit classes anymore).
- Produces: nothing — cleanup only.

- [ ] **Step 1: Confirm the classes are orphaned**

Run from `v1/`:

```bash
grep -rn "hero-ring\|hero-agent\|hero-tag\|hero-core\|hero-chip-face\|hero-logo\|abx-pulse\|abx-cat" \
  --include="*.html" --include="*.js" *.html src/ | grep -v style.css
```

Expected: **no output** for `hero-*`; if `abx-pulse` or `abx-cat` still match (e.g. in the agents-bento sections), keep those two classes and only delete the `hero-*` rules. Do NOT touch `hero-spiral` (used by about.html) or `hero__*` (BEM elements of the text column — different naming, still used everywhere).

- [ ] **Step 2: Delete the orphaned rules**

In `v1/src/style.css` remove (only the selectors confirmed orphaned in Step 1):

- The block at ~1158–1165: `.hero-agent`, `.hero-ring`, `.hero-tag`, `.hero-core`, `.hero-chip-face`, `.hero-core-inner`, `.hero-logo-x`, `.hero-logo-bar`.
- In the reduced-motion block (~1766), the line `.ahero__viz .abx-port, .ahero__viz .hero-agent { display: none; }` and the SMIL comment line directly above it (the new industry-viz rules from Tasks 1–3 replace them). If `abx-pulse` is still used by the bento, leave `.abx-pulse { display: none; }` (~1752) alone.

- [ ] **Step 3: Build and re-grep**

```bash
cd v1 && npm run build
grep -rn "hero-ring\|hero-agent\|hero-tag\|hero-core\|hero-chip-face\|hero-logo" src/style.css *.html
```

Expected: build succeeds (`✓ built in …`); grep prints nothing.

- [ ] **Step 4: Final visual pass**

With the dev server running, check all three pages once more (`/banking.html`, `/insurance.html`, `/logistics.html`) at desktop width and at a narrow width (~700px — note `.ahero__viz` is `display: none` under the mobile breakpoint, so the hero collapsing to text-only is expected). Confirm no console errors.

- [ ] **Step 5: Commit**

```bash
cd "$(git rev-parse --show-toplevel)" && git add v1/src/style.css
git commit -m "chore: drop orbit-ring hero styles now unused by industry pages

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
