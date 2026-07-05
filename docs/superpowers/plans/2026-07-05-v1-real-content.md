# v1 Real-Content Adaptation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace v1's invented marketing content with verified flowx.ai content and add the missing real sections (registry, process, voices, FAQ), keeping v1's aesthetics and interactive devices untouched.

**Architecture:** Single-page Vite site, vanilla ES modules. All content changes land in `v1/index.html`; new-section styles append to `v1/src/style.css` following existing block-naming (`.reg`, `.proc`, `.voices`, `.faq`); the only JS change is the `PLACEHOLDERS` array in `v1/src/main.js`. Scroll reveals (`.rv` + `--i`), count-ups (`data-count`/`data-dec`), and reduced-motion guards are all class/attribute-driven and pick up new sections automatically.

**Tech Stack:** Vite 5, vanilla JS, CSS custom properties. No test framework exists and none is added — this is a static content page. Each task's verification cycle is: `npm run build` (catches malformed HTML/CSS/JS) + `grep` assertions on the built output (catches missing/mangled content) + a visual pass at the end.

**Spec:** `docs/superpowers/specs/2026-07-05-v1-real-content-design.md` (contains all verified verbatim source copy).

## Global Constraints

- Work on branch `feat/real-content` in the `flx_landing_explo` repo; all paths below are repo-relative.
- Only touch `v1/index.html`, `v1/src/style.css`, `v1/src/main.js`. Never touch `docs/v1/` (built output — do NOT rebuild it in this plan).
- Amber `#FCB813` stays the only accent. New CSS uses existing tokens (`var(--line)`, `var(--text-dim)`, etc.) — no new colors.
- No vendor names in integration visuals (use `core-banking`, `cobol-mainframe`, `document-store`).
- Verbatim copy from the spec must be reproduced exactly where marked *(verbatim)*.
- Unverifiable claims get flagged: `<!-- CLAIMS — verify before publish -->` or `<!-- DRAFT ANSWERS — marketing review required -->`.
- All commands run from `v1/`: `cd v1` first. Build command is `npm run build`; expected tail: `✓ built in …`.
- Final section numbering: hero `001` → `02 / Agent Builder` → `03 / Why 95% fail` → `04 / Agents` → `05 / Platform` → `06 / Process` → `07 / Proof` → `08 / Voices` → `09 / FAQ` → `10 / Next`.
- Commit after every task with the exact message given. End commit messages with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Nav, hero, and terminal content

**Files:**
- Modify: `v1/index.html` (nav links ~line 26–39, hero ~line 51–100, meta ~line 7)
- Modify: `v1/src/main.js:116-122` (`PLACEHOLDERS`)

**Interfaces:**
- Produces: anchors `#registry` and `#faq` referenced by nav (sections created in Tasks 4 and 9 — until then the links are inert, which is fine for intermediate commits).

- [ ] **Step 1: Update nav links and flag the cert chip**

In `v1/index.html`, replace:

```html
      <nav class="nav__links" aria-label="Primary">
        <a href="#blueprint">Blueprint</a>
        <a href="#why">Why FlowX</a>
        <a href="#platform">Platform</a>
        <a href="#proof">Proof</a>
      </nav>
```

with:

```html
      <nav class="nav__links" aria-label="Primary">
        <a href="#blueprint">Agent Builder</a>
        <a href="#why">Why FlowX</a>
        <a href="#registry">Agents</a>
        <a href="#platform">Platform</a>
        <a href="#proof">Proof</a>
        <a href="#faq">FAQ</a>
      </nav>
```

And replace:

```html
        <span class="nav__cert mono">SOC 2 · ISO 27001</span>
```

with:

```html
        <!-- CLAIMS — verify before publish -->
        <span class="nav__cert mono">SOC 2 · ISO 27001</span>
```

- [ ] **Step 2: Update hero eyebrow, sub, hints, and foot**

Replace the eyebrow line:

```html
          Enterprise AI &middot; Regulated by design
```

with the verbatim tagline:

```html
          Enterprise AI &middot; AI for regulated industries
```

Replace the hero sub paragraph:

```html
        <p class="hero__sub rv-load" style="--d:4">
          Deploy AI agents in weeks — governed, auditable, and running inside
          your own perimeter. Proven in production at Tier-1 banks and insurers.
        </p>
```

with:

```html
        <p class="hero__sub rv-load" style="--d:4">
          Deploy banking, insurance, and logistics AI agents in weeks —
          proven in production. 220+ enterprise-ready agents, or build your
          own, plugged into the legacy systems you already run.
        </p>
```

Replace the hints block:

```html
        <p class="term__hints mono rv-load" style="--d:6">
          try —
          <button class="hint" type="button" data-hint="automate KYC onboarding for retail customers">KYC onboarding</button> ·
          <button class="hint" type="button" data-hint="triage motor insurance claims end to end">claims triage</button> ·
          <button class="hint" type="button" data-hint="underwrite SME loans in under 24 hours">SME lending</button>
        </p>
```

with (real value streams from the verbatim hero copy):

```html
        <p class="term__hints mono rv-load" style="--d:6">
          try —
          <button class="hint" type="button" data-hint="automate commercial onboarding for business clients">onboarding</button> ·
          <button class="hint" type="button" data-hint="underwrite retail mortgages in days, not weeks">underwriting</button> ·
          <button class="hint" type="button" data-hint="triage motor insurance claims end to end">claims</button> ·
          <button class="hint" type="button" data-hint="track and trace shipments across carriers">track &amp; trace</button>
        </p>
```

Replace the hero foot right label:

```html
        <span class="hero__foot-right">001 — production-grade agents, without the science project</span>
```

with:

```html
        <span class="hero__foot-right">001 — 220+ enterprise-ready agents · 20 categories · in production</span>
```

Replace the meta description (line 7):

```html
  <meta name="description" content="FlowX is the secure foundation for embedding AI in highly regulated environments. Deploy governed AI agents in weeks. Proven in production." />
```

with:

```html
  <meta name="description" content="FlowX.AI — deploy banking, insurance, and logistics AI agents in weeks, proven in production. 220+ enterprise-ready agents for regulated industries, or build your own." />
```

- [ ] **Step 3: Update terminal placeholders in main.js**

In `v1/src/main.js`, replace:

```js
const PLACEHOLDERS = [
  'automate KYC onboarding for retail customers',
  'triage motor insurance claims end to end',
  'underwrite SME loans in under 24 hours',
  'monitor transactions for AML, cut false positives',
  'resolve regulated customer complaints inside SLA',
];
```

with (the real value-stream list: onboarding, lending, underwriting, claims, retention, quoting, track & trace):

```js
const PLACEHOLDERS = [
  'automate commercial onboarding for business clients',
  'underwrite retail mortgages in days, not weeks',
  'triage motor insurance claims end to end',
  'quote commercial policies in minutes',
  'reconcile supplier invoices automatically',
  'track and trace shipments across carriers',
  'cut churn with in-flow retention offers',
];
```

- [ ] **Step 4: Verify build + content**

```bash
cd v1 && npm run build
```
Expected: ends with `✓ built in …` (no errors).

```bash
grep -c 'AI for regulated industries' dist/index.html && grep -c '220+ enterprise-ready agents' dist/index.html
```
Expected: `1` then `3` (hero sub + hero foot + meta description).

- [ ] **Step 5: Commit**

```bash
git add v1/index.html v1/src/main.js
git commit -m "feat(v1): real hero copy, nav links, and value-stream terminal content

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Blueprint section becomes the Agent Builder

**Files:**
- Modify: `v1/index.html` (blueprint section ~lines 104–150)

- [ ] **Step 1: Retitle and re-lede the section**

Replace:

```html
          <span class="section__no mono">02 / Blueprint</span>
          <div class="section__headline">
            <h2 class="h2" id="bpTitle">Your solution, drafted<span class="amber">.</span></h2>
            <p class="section__lede" id="bpTagline">Describe a use case in the compiler above — FlowX drafts the agents,
            guardrails and integrations it would ship with.</p>
          </div>
```

with:

```html
          <span class="section__no mono">02 / Agent Builder</span>
          <div class="section__headline">
            <h2 class="h2" id="bpTitle">Build your own agents<span class="amber">.</span></h2>
            <p class="section__lede" id="bpTagline">Describe a use case in the compiler above — the Agent Builder drafts
            the agents, guardrails and integrations it would ship with. Streamline
            business flows, reduce human effort and risk.</p>
          </div>
```

(Note: `#bpTitle`/`#bpTagline` are overwritten by JS after a compile — this copy is the pre-compile state. That's existing behavior; leave `main.js` alone.)

- [ ] **Step 2: Add the SEE VIDEO ghost action**

Replace:

```html
            <div class="bp__actions">
              <a class="btn btn--primary" href="#cta">Book a build review</a>
              <button class="btn btn--ghost" id="bpAgain" type="button">Compile another use case</button>
            </div>
```

with:

```html
            <div class="bp__actions">
              <a class="btn btn--primary" href="#cta">Book a build review</a>
              <button class="btn btn--ghost" id="bpAgain" type="button">Compile another use case</button>
              <!-- VERIFY URL — real Agent Builder video link needed -->
              <a class="btn btn--ghost" href="https://www.flowx.ai/" target="_blank" rel="noopener">See the video ↗</a>
            </div>
```

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'Agent Builder' dist/index.html
```
Expected: build succeeds; grep prints `3` or more (nav link, section number, lede).

- [ ] **Step 4: Commit**

```bash
git add v1/index.html
git commit -m "feat(v1): blueprint section presents as the Agent Builder

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Why-95% section gets the real failure modes

**Files:**
- Modify: `v1/index.html` (why section ~lines 161–206)

- [ ] **Step 1: Replace the lede and all four rows**

Replace the `.why__left` lede paragraph:

```html
            <p class="section__lede rv" style="--i:1">They die from missing infrastructure — the unglamorous machinery
              between a promising demo and a system a regulator will sign off on. FlowX is that machinery.</p>
```

with (grounded in the verbatim "biggest challenge" sentence):

```html
            <p class="section__lede rv" style="--i:1">The biggest challenge in deploying AI agents in mission-critical
              value streams is not building agents — it's inadequate data access, missing integrations, and broken
              process flows. FlowX is that machinery.</p>
```

Replace the entire `<ol class="why__list">…</ol>` with:

```html
          <ol class="why__list">
            <li class="why__row rv" style="--i:0">
              <span class="why__no mono">01</span>
              <div class="why__fail">
                <h3>The agent is smart. Your data won't talk to it.</h3>
                <p>The knowledge it needs is locked in cores, documents and desktops it can't reach.</p>
              </div>
              <p class="why__fix"><span class="mono amber">FLOWX →</span> Governed connectors mount your systems of record — data reaches agents without leaving your perimeter.</p>
            </li>
            <li class="why__row rv" style="--i:1">
              <span class="why__no mono">02</span>
              <div class="why__fail">
                <h3>Demos skip the hard part: your legacy stack.</h3>
                <p>Production means core banking, mainframes and document stores — not a clean sandbox.</p>
              </div>
              <p class="why__fix"><span class="mono amber">FLOWX →</span> Ready to plug into your legacy systems — no rip-and-replace, nothing rewritten.</p>
            </li>
            <li class="why__row rv" style="--i:2">
              <span class="why__no mono">03</span>
              <div class="why__fail">
                <h3>A model is not a process.</h3>
                <p>Mission-critical value streams need routing, approvals, exceptions and audit — end to end.</p>
              </div>
              <p class="why__fix"><span class="mono amber">FLOWX →</span> Agents run inside governed process flows, with humans in the loop where policy demands.</p>
            </li>
            <li class="why__row rv" style="--i:3">
              <span class="why__no mono">04</span>
              <div class="why__fail">
                <h3>Most stacks have never met a regulator.</h3>
                <p>You'd be the experiment — and risk teams know it.</p>
              </div>
              <p class="why__fix"><span class="mono amber">FLOWX →</span> Proven in production at banks, insurers and logistics operators — where failure is not an option.</p>
            </li>
          </ol>
```

- [ ] **Step 2: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'why__row' dist/index.html && grep -c 'legacy systems' dist/index.html
```
Expected: build succeeds; `4` rows; `legacy systems` ≥ 2 (hero mention differs in phrasing: "legacy systems you already run" counts once here plus why-fix).

- [ ] **Step 3: Commit**

```bash
git add v1/index.html
git commit -m "feat(v1): why-95% rows use the real failure modes

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: New Agents registry section

**Files:**
- Modify: `v1/index.html` (insert new section between the why section's closing `</section>` and `<!-- ================= PLATFORM ================= -->`)
- Modify: `v1/src/style.css` (append registry block after the WHY block, before PLATFORM)

**Interfaces:**
- Produces: `#registry` anchor (consumed by nav from Task 1, footer in Task 10, hero "Explore agents" style links).

- [ ] **Step 1: Insert the section HTML**

Immediately after the why section's closing `</section>` and before the PLATFORM comment, insert:

```html
    <!-- ================= AGENTS REGISTRY ================= -->
    <section class="section" id="registry">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">04 / Agents</span>
          <div class="section__headline">
            <h2 class="h2 rv">220+ agents, ready to deploy<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">Enterprise-ready AI agents across 20 categories — or build your
              own in the Agent Builder. Four of the stacks running in production today:</p>
          </div>
        </div>
        <div class="reg rv" style="--i:2">
          <div class="reg__hd mono"><span>stack</span><span>agents</span><span>covers</span><span>status</span></div>
          <ul class="reg__rows">
            <li class="reg__row mono">
              <span class="reg__name">retail-mortgage-underwriting</span>
              <span class="reg__count">9</span>
              <span class="reg__caps">contract · appraisal · title · income · affordability</span>
              <span class="reg__st">in production</span>
            </li>
            <li class="reg__row mono">
              <span class="reg__name">commercial-onboarding</span>
              <span class="reg__count">7</span>
              <span class="reg__caps">identity · UBO resolution · KYC · cross-document consistency</span>
              <span class="reg__st">in production</span>
            </li>
            <li class="reg__row mono">
              <span class="reg__name">claims-processing</span>
              <span class="reg__count">6</span>
              <span class="reg__caps">FNOL routing · damage extraction · fraud signals</span>
              <span class="reg__st">in production</span>
            </li>
            <li class="reg__row mono">
              <span class="reg__name">invoice-reconciliation</span>
              <span class="reg__count">4</span>
              <span class="reg__caps">auto-invoicing · rate &amp; tax validation · payment reconciliation</span>
              <span class="reg__st">in production</span>
            </li>
            <li class="reg__row reg__row--next mono">
              <span class="reg__name">your-stack</span>
              <span class="reg__count">—</span>
              <span class="reg__caps">describe it in the compiler above</span>
              <span class="reg__st"><a href="#blueprint">compile ↑</a></span>
            </li>
          </ul>
          <p class="reg__foot mono dim2">220+ agents · 20 categories · ready to plug into your legacy systems</p>
        </div>
      </div>
    </section>

```

(The `a[href="#blueprint"]` redirect-to-terminal behavior in `main.js` binds to ALL `#blueprint` links via `querySelectorAll`, so the `compile ↑` link automatically focuses the terminal while the blueprint is uncompiled. No JS change needed.)

- [ ] **Step 2: Append the registry CSS**

In `v1/src/style.css`, insert between the WHY block and the PLATFORM block:

```css
/* ============================================================
   AGENTS REGISTRY
   ============================================================ */
.reg {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--bg-panel);
  padding: clamp(20px, 3vw, 34px);
}
.reg__hd, .reg__row {
  display: grid;
  grid-template-columns: minmax(200px, 1.4fr) 70px 2fr 130px;
  gap: 16px;
  align-items: baseline;
}
.reg__hd {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line-soft);
}
.reg__rows { list-style: none; }
.reg__row {
  font-size: 12.5px;
  color: var(--text-dim);
  padding: 14px 0;
  border-bottom: 1px solid var(--line-soft);
}
.reg__name { color: var(--text); }
.reg__count { color: var(--amber); }
.reg__caps { color: var(--text-faint); }
.reg__st {
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.reg__row--next .reg__name { color: var(--amber); }
.reg__row--next .reg__st a {
  color: var(--amber);
  border-bottom: 1px dashed var(--amber-line);
  text-transform: none;
  letter-spacing: 0.04em;
}
.reg__foot { margin-top: 16px; font-size: 11px; letter-spacing: 0.1em; }
```

And inside the existing `@media (max-width: 760px)` block, add:

```css
  .reg__hd { display: none; }
  .reg__row { grid-template-columns: 1fr 56px; }
  .reg__caps, .reg__st { grid-column: 1 / -1; }
```

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'reg__row' dist/index.html && grep -c 'id="registry"' dist/index.html
```
Expected: build succeeds; `6` lines (the five `<li class="reg__row…">` rows plus the `<ul class="reg__rows">` line, which contains the substring); `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): add agents registry section (220+ agents, four stacks)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Platform cells become the four real pillars

**Files:**
- Modify: `v1/index.html` (platform section ~lines 209–281)

- [ ] **Step 1: Renumber and update section head**

Replace:

```html
          <span class="section__no mono">04 / Platform</span>
```

with:

```html
          <span class="section__no mono">05 / Platform</span>
```

- [ ] **Step 2: Realign the four cells to the real pillar names**

Replace the audit cell header:

```html
            <header class="plat__head">
              <h3>Every decision, auditable</h3>
              <p>Agents don't just act — they leave evidence. Hash-chained logs of every prompt, retrieval, tool call and human override, queryable for seven years.</p>
            </header>
```

with:

```html
            <header class="plat__head">
              <h3>Banking-grade safety</h3>
              <p>Agents don't just act — they leave evidence. Every prompt, retrieval, tool call and human override lands in an immutable audit log your examiner can replay.</p>
            </header>
```

Replace the guardrails cell (header + list):

```html
            <header class="plat__head">
              <h3>Deterministic guardrails</h3>
              <p>Policies are compiled, not suggested. If a rule says a human signs off above €50k, no temperature setting changes that.</p>
            </header>
            <ul class="rails mono">
              <li><span class="rails__state rails__state--on"></span>pii.redaction<em>enforced</em></li>
              <li><span class="rails__state rails__state--on"></span>data.residency = eu-central<em>enforced</em></li>
              <li><span class="rails__state rails__state--on"></span>hitl.threshold &gt; 0.72<em>enforced</em></li>
              <li><span class="rails__state rails__state--on"></span>audit.retention = 7y<em>enforced</em></li>
            </ul>
```

with (go-live checklist per spec):

```html
            <header class="plat__head">
              <h3>Easy to deploy</h3>
              <p>No transformation program. A small joint team takes your first agents from kickoff to production in weeks — not quarters.</p>
            </header>
            <ul class="rails mono">
              <li><span class="rails__state rails__state--on"></span>env.provision<em>wk 1</em></li>
              <li><span class="rails__state rails__state--on"></span>systems.connect<em>wk 2</em></li>
              <li><span class="rails__state rails__state--on"></span>configure.test<em>wk 3+</em></li>
              <li><span class="rails__state rails__state--on"></span>go.live<em>live</em></li>
            </ul>
```

Replace the perimeter cell header:

```html
            <header class="plat__head">
              <h3>Runs inside your perimeter</h3>
              <p>On-prem Kubernetes, private VPC, or EU sovereign cloud. Your data never crosses a boundary you didn't draw.</p>
            </header>
```

with:

```html
            <header class="plat__head">
              <h3>Impeccable data privacy</h3>
              <p>On-prem Kubernetes, private VPC, or EU sovereign cloud. Your data never crosses a boundary you didn't draw.</p>
            </header>
```

Replace the router cell (header + visual labels):

```html
            <header class="plat__head">
              <h3>Model-agnostic routing</h3>
              <p>Route each task to the best model for it — frontier, open-weight or your own fine-tune — behind one governed interface.</p>
            </header>
            <div class="router mono" id="router" aria-hidden="true">
              <span class="router__in">task</span>
              <span class="router__line"></span>
              <span class="router__hub">policy<br/>router</span>
              <span class="router__line router__line--fan"></span>
              <div class="router__models">
                <span class="router__model" data-m="0">claude-fable-5</span>
                <span class="router__model" data-m="1">private-llm / vllm</span>
                <span class="router__model" data-m="2">rules-engine</span>
              </div>
            </div>
```

with (fan-out rewired from models to legacy systems — generic names only):

```html
            <header class="plat__head">
              <h3>Plugs into your existing data</h3>
              <p>Agents draw on the systems you already run — cores, mainframes, document stores — behind one governed interface. Nothing rewritten, nothing replaced.</p>
            </header>
            <div class="router mono" id="router" aria-hidden="true">
              <span class="router__in">agent</span>
              <span class="router__line"></span>
              <span class="router__hub">flowx<br/>runtime</span>
              <span class="router__line router__line--fan"></span>
              <div class="router__models">
                <span class="router__model" data-m="0">core-banking</span>
                <span class="router__model" data-m="1">cobol-mainframe</span>
                <span class="router__model" data-m="2">document-store</span>
              </div>
            </div>
```

(The `.router__model` rotation in `main.js` keys off the class, not the text — no JS change.)

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'claude-fable-5\|jack-henry\|finastra\|temenos' dist/index.html; grep -c 'Banking-grade safety' dist/index.html
```
Expected: build succeeds; first grep prints `0` (exit code 1 is expected when count is 0 — no vendor/model names remain); second prints `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html
git commit -m "feat(v1): platform cells carry the four real pillars

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: New Process section (Start. Prove ROI. Scale)

**Files:**
- Modify: `v1/index.html` (insert between platform section's `</section>` and `<!-- ================= PROOF ================= -->`)
- Modify: `v1/src/style.css` (append process block after PLATFORM block, before PROOF/STATS)

- [ ] **Step 1: Insert the section HTML**

```html
    <!-- ================= PROCESS ================= -->
    <section class="section" id="process">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">06 / Process</span>
          <div class="section__headline">
            <h2 class="h2 rv">Start. Prove ROI. Scale<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">Four steps from kickoff to production — weeks, not quarters.</p>
          </div>
        </div>
        <ol class="proc">
          <li class="proc__step rv" style="--i:0">
            <span class="proc__no mono">01</span>
            <h3>We create your environment</h3>
            <p>Your runtime, provisioned inside your perimeter, under your security policies.</p>
          </li>
          <li class="proc__step rv" style="--i:1">
            <span class="proc__no mono">02</span>
            <h3>We connect your systems</h3>
            <p>Core, mainframe, documents — wired in through governed connectors, untouched underneath.</p>
          </li>
          <li class="proc__step rv" style="--i:2">
            <span class="proc__no mono">03</span>
            <h3>We configure and you test</h3>
            <p>Your value stream, your data, your acceptance criteria — your people sign off.</p>
          </li>
          <li class="proc__step rv" style="--i:3">
            <span class="proc__no mono">04</span>
            <h3>Go live and see the impact</h3>
            <p>Production traffic from the first case, measured like the numbers below.</p>
          </li>
        </ol>
      </div>
    </section>

```

(Step names are verbatim from the live site.)

- [ ] **Step 2: Append the process CSS**

Insert between the PLATFORM styles and the PROOF/STATS block:

```css
/* ============================================================
   PROCESS
   ============================================================ */
.proc {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.proc__step { background: var(--bg); padding: clamp(24px, 2.6vw, 36px); }
.proc__no {
  display: block;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--amber);
  margin-bottom: 18px;
}
.proc__step h3 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}
.proc__step p { font-size: 13.5px; color: var(--text-dim); }
```

And in the existing `@media (max-width: 1080px)` block add:

```css
  .proc { grid-template-columns: repeat(2, 1fr); }
```

And in the existing `@media (max-width: 760px)` block add:

```css
  .proc { grid-template-columns: 1fr; }
```

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'proc__step' dist/index.html && grep -c 'We configure and you test' dist/index.html
```
Expected: build succeeds; `4`; `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): add Start/Prove ROI/Scale process section

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Proof section gets the six real production stats

**Files:**
- Modify: `v1/index.html` (proof section ~lines 284–311)
- Modify: `v1/src/style.css` (stats block — add `.stats__val`/`.stats__pre`)

**Interfaces:**
- Consumes: `countUp()` in `main.js` — reads `data-count` (float) and `data-dec` (int) from `.stats__num`, writes `target.toFixed(dec)` as textContent. Signs and `$` therefore live OUTSIDE `.stats__num`, in a `.stats__pre` sibling inside a `.stats__val` wrapper.

- [ ] **Step 1: Renumber and replace all stat rows**

Replace:

```html
          <span class="section__no mono">05 / Proof</span>
```

with:

```html
          <span class="section__no mono">07 / Proof</span>
```

Replace the entire `<dl class="stats">…</dl>` with:

```html
        <dl class="stats">
          <div class="stats__row rv" style="--i:0">
            <dt><span class="stats__val"><span class="stats__num mono" data-count="80" data-dec="0">0</span></span><span class="stats__unit mono">%</span></dt>
            <dd>of manual handoffs automated in lending flows — in production</dd>
          </div>
          <div class="stats__row rv" style="--i:1">
            <dt><span class="stats__val"><span class="stats__pre mono">−</span><span class="stats__num mono" data-count="40" data-dec="0">0</span></span><span class="stats__unit mono">%</span></dt>
            <dd>operational cost for lending flows</dd>
          </div>
          <div class="stats__row rv" style="--i:2">
            <dt><span class="stats__val"><span class="stats__pre mono">−</span><span class="stats__num mono" data-count="65" data-dec="0">0</span></span><span class="stats__unit mono">%</span></dt>
            <dd>processing time for underwriting</dd>
          </div>
          <div class="stats__row rv" style="--i:3">
            <dt><span class="stats__val"><span class="stats__pre mono">−</span><span class="stats__num mono" data-count="62" data-dec="0">0</span></span><span class="stats__unit mono">%</span></dt>
            <dd>time-to-yes in approval flows</dd>
          </div>
          <div class="stats__row rv" style="--i:4">
            <dt><span class="stats__val"><span class="stats__pre mono">$</span><span class="stats__num mono" data-count="1.8" data-dec="1">0.0</span></span><span class="stats__unit mono">M</span></dt>
            <dd>projected annual savings — global insurer</dd>
          </div>
          <div class="stats__row rv" style="--i:5">
            <dt><span class="stats__val"><span class="stats__num mono" data-count="8" data-dec="0">0</span></span><span class="stats__unit mono">wks</span></dt>
            <dd>fund management platform — built and launched, in production</dd>
          </div>
        </dl>
```

- [ ] **Step 2: Add the wrapper/prefix CSS**

In `v1/src/style.css`, directly after the `.stats__num { … }` rule, add:

```css
.stats__val { display: inline-flex; align-items: baseline; }
.stats__pre {
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
```

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'stats__row' dist/index.html && grep -c 'data-count="1.8"' dist/index.html
```
Expected: build succeeds; `6`; `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): proof stats replaced with the six real production numbers

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: New Voices section (six verbatim testimonials)

**Files:**
- Modify: `v1/index.html` (insert between proof section's `</section>` and `<!-- ================= CTA ================= -->`)
- Modify: `v1/src/style.css` (append voices block after PROOF/STATS, before CTA)

- [ ] **Step 1: Insert the section HTML**

```html
    <!-- ================= VOICES ================= -->
    <section class="section" id="voices">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">08 / Voices</span>
          <div class="section__headline">
            <h2 class="h2 rv">The people running it<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">From production deployments — banks, insurers, and the teams inside them.</p>
          </div>
        </div>
        <div class="voices">
          <blockquote class="voice rv" style="--i:0">
            <p>“FlowX.AI is a business asset, not an IT asset.”</p>
            <cite>COO · major custodian bank</cite>
          </blockquote>
          <blockquote class="voice rv" style="--i:1">
            <p>“We now see FlowX.AI as the engine that powers user experiences.”</p>
            <cite>Deputy Director · CEE bank group</cite>
          </blockquote>
          <blockquote class="voice rv" style="--i:2">
            <p>“I have delivered more functionality in production with FlowX.AI in three months.”</p>
            <cite>Solution architect · European bank</cite>
          </blockquote>
          <blockquote class="voice rv" style="--i:3">
            <p>“Before FlowX.AI it would take us a year to launch a new product. Today we launch in 2–4 weeks.”</p>
            <cite>Insurance executive</cite>
          </blockquote>
          <blockquote class="voice rv" style="--i:4">
            <p>“FlowX.AI delivers value multiple times faster, through its ability to integrate.”</p>
            <cite>CTO · European insurer</cite>
          </blockquote>
          <blockquote class="voice rv" style="--i:5">
            <p>“FlowX.AI is the future of software development.”</p>
            <cite>SVP Technology Architecture &amp; Strategy</cite>
          </blockquote>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Append the voices CSS**

```css
/* ============================================================
   VOICES
   ============================================================ */
.voices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.voice {
  background: var(--bg);
  padding: clamp(24px, 2.8vw, 38px);
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.voice p { font-size: 16px; line-height: 1.55; color: var(--text); }
.voice cite {
  margin-top: auto;
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}
```

And in the existing `@media (max-width: 1080px)` block add:

```css
  .voices { grid-template-columns: repeat(2, 1fr); }
```

And in the existing `@media (max-width: 760px)` block add:

```css
  .voices { grid-template-columns: 1fr; }
```

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c '<blockquote' dist/index.html && grep -c 'business asset, not an IT asset' dist/index.html
```
Expected: build succeeds; `6`; `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): add voices section with six verbatim testimonials

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: New FAQ section (five real questions)

**Files:**
- Modify: `v1/index.html` (insert between voices section's `</section>` and `<!-- ================= CTA ================= -->`)
- Modify: `v1/src/style.css` (append FAQ block after VOICES, before CTA)

**Interfaces:**
- Produces: `#faq` anchor (consumed by nav from Task 1).

- [ ] **Step 1: Insert the section HTML**

```html
    <!-- ================= FAQ ================= -->
    <section class="section" id="faq">
      <div class="shell">
        <div class="section__head">
          <span class="section__no mono">09 / FAQ</span>
          <div class="section__headline">
            <h2 class="h2 rv">Asked by every risk committee<span class="amber">.</span></h2>
            <p class="section__lede rv" style="--i:1">The questions that decide these deals.</p>
          </div>
        </div>
        <!-- DRAFT ANSWERS — marketing review required. Questions are verbatim from flowx.ai. -->
        <div class="faq rv" style="--i:2">
          <details class="faq__item">
            <summary class="faq__q"><span class="faq__no mono">Q.01</span>Do we have to change our core systems?<span class="faq__mark" aria-hidden="true">+</span></summary>
            <div class="faq__a"><p>No. Agents plug into the systems you already run — core banking, mainframes, document stores — through governed connectors. Nothing is ripped out or rewritten.</p></div>
          </details>
          <details class="faq__item">
            <summary class="faq__q"><span class="faq__no mono">Q.02</span>How fast can we get agents into production?<span class="faq__mark" aria-hidden="true">+</span></summary>
            <div class="faq__a"><p>Weeks, not quarters. A small joint team creates your environment, connects your systems, configures with you, and goes live — one fund management platform was built and launched in 8 weeks.</p></div>
          </details>
          <details class="faq__item">
            <summary class="faq__q"><span class="faq__no mono">Q.03</span>What level of effort is required?<span class="faq__mark" aria-hidden="true">+</span></summary>
            <div class="faq__a"><p>A small joint team, not a transformation program. Your people define the value stream and acceptance criteria; FlowX stands up the environment and the agent stacks.</p></div>
          </details>
          <details class="faq__item">
            <summary class="faq__q"><span class="faq__no mono">Q.04</span>What's the real cost?<span class="faq__mark" aria-hidden="true">+</span></summary>
            <div class="faq__a"><p>Priced against the value stream it accelerates. In production these deployments have cut lending operational costs by 40% and projected $1.8M in annual savings — sizing starts from your numbers, in a customized demo.</p></div>
          </details>
          <details class="faq__item">
            <summary class="faq__q"><span class="faq__no mono">Q.05</span>What's the timeline?<span class="faq__mark" aria-hidden="true">+</span></summary>
            <div class="faq__a"><p>Create your environment → connect your systems → configure and test → go live. Elapsed: weeks — with impact measured from the first live case.</p></div>
          </details>
        </div>
      </div>
    </section>

```

- [ ] **Step 2: Append the FAQ CSS**

```css
/* ============================================================
   FAQ
   ============================================================ */
.faq { border-top: 1px solid var(--line); }
.faq__item { border-bottom: 1px solid var(--line); }
.faq__q {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 24px 0;
  cursor: pointer;
  list-style: none;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 570;
  letter-spacing: -0.01em;
}
.faq__q::-webkit-details-marker { display: none; }
.faq__no { font-size: 11px; letter-spacing: 0.14em; color: var(--text-faint); flex-shrink: 0; }
.faq__mark {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--amber);
  transition: transform 0.3s var(--ease);
}
.faq__item[open] .faq__mark { transform: rotate(45deg); }
.faq__a { padding: 0 0 26px 52px; }
.faq__a p { max-width: 62ch; font-size: 15px; color: var(--text-dim); }
@media (prefers-reduced-motion: reduce) {
  .faq__mark { transition: none; }
}
```

(Append the reduced-motion rule to the existing reduced-motion block at the bottom of the file instead of creating a second block: add `.faq__mark { transition: none; }` inside the existing `@media (prefers-reduced-motion: reduce) { … }`.)

- [ ] **Step 3: Verify build + content**

```bash
cd v1 && npm run build && grep -c '<details' dist/index.html && grep -c 'Do we have to change our core systems?' dist/index.html
```
Expected: build succeeds; `5`; `1`.

- [ ] **Step 4: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): add FAQ section with the five real questions

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: CTA and footer with real content

**Files:**
- Modify: `v1/index.html` (CTA section ~lines 314–328, footer ~lines 332–369)
- Modify: `v1/src/style.css` (footer — add `.footer__offices`)

- [ ] **Step 1: Update the CTA**

Replace:

```html
        <span class="section__no mono">06 / Next</span>
```

with:

```html
        <span class="section__no mono">10 / Next</span>
```

Replace:

```html
        <div class="cta__row rv" style="--i:2">
          <a class="btn btn--primary btn--lg" id="ctaBtn" href="mailto:hello@flowx.ai?subject=Architecture%20review">Book an architecture review</a>
          <a class="btn btn--ghost btn--lg" href="#blueprint">See a blueprint first</a>
        </div>
```

with:

```html
        <div class="cta__row rv" style="--i:2">
          <a class="btn btn--primary btn--lg" id="ctaBtn" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
          <a class="btn btn--ghost btn--lg" href="#blueprint">Compile a blueprint first</a>
        </div>
```

- [ ] **Step 2: Rebuild the footer**

Replace the entire `<div class="footer__top">…</div>` (logo + `footer__cols` nav) with:

```html
      <div class="footer__top">
        <div class="footer__id">
          <svg class="footer__logo" viewBox="0 0 696 128" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX">
            <path d="M32.6 31.3999V54.1999H103.2V81.3999H32.6V123.7H0V3.8999H117.1V31.4999H32.6V31.3999Z" fill="currentColor"/>
            <path d="M241.9 95.5999V123.7H134.1V3.8999H166.7V95.5999H241.9Z" fill="currentColor"/>
            <path d="M247.7 63.8C247.7 23.2 276.3 0 320.6 0C364.9 0 393.6 23.3 393.6 63.8C393.6 104.3 364.8 127.6 320.6 127.6C276.3 127.6 247.7 104.4 247.7 63.8ZM360.3 63.8C360.3 41.2 345.1 28.4 320.5 28.4C296.1 28.4 280.7 41.2 280.7 63.8C280.7 86.4 295.9 99.2 320.5 99.2C345.1 99.2 360.3 86.4 360.3 63.8Z" fill="currentColor"/>
            <path d="M595.5 3.8999L554.8 123.7H522.4L496.4 40.2999L470.2 123.7H438.1L397.2 3.8999H430.6L455 86.1999L481.7 3.8999H511.7L538.4 86.1999L562.8 3.8999H595.5Z" fill="currentColor"/>
            <path d="M695.4 99.5H603.2V123.7H695.4V99.5Z" fill="#FCB813"/>
            <path d="M663.4 38.5999L695.4 75.2999H665.9L648.5 54.8999L631.1 75.2999H603.3L635.2 38.9999L604.1 3.8999H633.7L650.2 23.1999L666.7 3.8999H694.6L663.4 38.5999Z" fill="currentColor"/>
          </svg>
          <address class="footer__offices mono">
            Charles de Gaulle Plaza, Piata Charles de Gaulle 15, 9th floor, 011857 Bucharest, Romania<br />
            352 Sharon Park Drive, Menlo Park, CA 94025
          </address>
        </div>
        <nav class="footer__cols" aria-label="Footer">
          <div>
            <h4 class="mono">Platform</h4>
            <a href="#registry">Agents</a>
            <a href="#blueprint">Agent Builder</a>
            <a href="#proof">Proof</a>
          </div>
          <!-- VERIFY URLS before publish -->
          <div>
            <h4 class="mono">Resources</h4>
            <a href="https://www.flowx.ai/blog" target="_blank" rel="noopener">Blog</a>
            <a href="https://docs.flowx.ai" target="_blank" rel="noopener">Documentation</a>
            <a href="https://academy.flowx.ai" target="_blank" rel="noopener">Academy</a>
            <a href="#cta">Support</a>
          </div>
          <div>
            <h4 class="mono">Legal</h4>
            <a href="https://www.flowx.ai/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
            <a href="https://www.flowx.ai/cookies" target="_blank" rel="noopener">Cookies</a>
            <a href="https://www.flowx.ai/terms-and-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</a>
          </div>
        </nav>
      </div>
```

Replace the footer base:

```html
      <div class="footer__base mono">
        <span>© <span id="year">2026</span> FlowX AI — Bucharest · London · New York</span>
        <span>SOC 2 TYPE II · ISO 27001 · GDPR</span>
      </div>
```

with:

```html
      <div class="footer__base mono">
        <span>© <span id="year">2026</span> FlowX.AI Business Systems — Bucharest · Menlo Park</span>
        <!-- CLAIMS — verify before publish -->
        <span>SOC 2 TYPE II · ISO 27001 · GDPR</span>
      </div>
```

- [ ] **Step 3: Add the offices CSS**

In `v1/src/style.css`, after the `.footer__logo { … }` rule, add:

```css
.footer__offices {
  margin-top: 18px;
  font-size: 11px;
  line-height: 1.9;
  letter-spacing: 0.02em;
  color: var(--text-faint);
  font-style: normal;
  max-width: 40ch;
}
```

- [ ] **Step 4: Verify build + content**

```bash
cd v1 && npm run build && grep -c 'Menlo Park' dist/index.html && grep -c 'London' dist/index.html; grep -c 'Schedule a customized demo' dist/index.html
```
Expected: build succeeds; `Menlo Park` = `2` (address + base line); `London` = `0` (exit 1 OK); `1`.

- [ ] **Step 5: Commit**

```bash
git add v1/index.html v1/src/style.css
git commit -m "feat(v1): real CTA label and full footer (offices, resources, legal)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: Full verification pass

**Files:** none modified (fixes, if any, amend the relevant task's files).

- [ ] **Step 1: Section-number and anchor sanity**

```bash
cd v1 && grep -o '[01][0-9] / [A-Za-z 95%]*' index.html
```
Expected output (order matters):
```
02 / Agent Builder
03 / Why 95% fail
04 / Agents
05 / Platform
06 / Process
07 / Proof
08 / Voices
09 / FAQ
10 / Next
```

```bash
for a in blueprint why registry platform process proof voices faq cta; do grep -q "id=\"$a\"" index.html && echo "$a ok" || echo "$a MISSING"; done
```
Expected: nine `ok` lines, no `MISSING`.

- [ ] **Step 2: Invented-content sweep**

```bash
grep -n '6.4\|2.7\|97.3\|jack-henry\|finastra\|temenos\|London\|claude-fable\|KYC onboarding for retail' index.html
```
Expected: no matches (exit code 1).

- [ ] **Step 3: Live visual pass**

```bash
cd v1 && npm run dev
```
Then verify in a browser at `http://localhost:4321`:
- Hero: field animation + toggle work; hints compile a blueprint; new sub copy renders on one screen at 1440px and 390px.
- Scroll the full page: every section reveals; count-ups land on 80 / −40 / −65 / −62 / $1.8 / 8; registry rows and `compile ↑` focus the terminal; FAQ opens/closes with keyboard (Tab + Enter) and the `+` rotates; footer links present.
- Reduced motion (macOS: System Settings → Accessibility → Display → Reduce motion, or DevTools emulation): no reveals/count-up animation, static placeholder, page fully readable.
- Mobile 390px: registry collapses to stacked rows, process/voices single column, no horizontal scroll.

- [ ] **Step 4: Final build check (do NOT copy to docs/)**

```bash
cd v1 && npm run build
```
Expected: `✓ built in …`. Leave `docs/v1/` untouched — deployment happens only after content approval.

- [ ] **Step 5: Commit any fixes**

If the visual pass required fixes, commit them:

```bash
git add v1/
git commit -m "fix(v1): visual-pass corrections

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
