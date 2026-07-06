# Industries pages — design

Date: 2026-07-06
Project: `flx_landing_explo/v1/` (FlowX landing redesign)

## Goal

Replace the **AI Agents** page with an **Industries** category: three
individual pages — **Banking**, **Insurance**, **Logistics** — reached from a
nav **hover dropdown**. Each page starts from that industry's section on the
current `agents.html` and expands it to fill a full page, using real content
from the live flowx.ai industry pages (`/banking`, `/insurance`, `/logistics`,
fetched 2026-07-06). Everything matches the existing chrome (nav / hero /
section / CTA / footer) and design tokens.

## Nav — Industries dropdown

- The **"AI Agents" link is removed** from the nav on every page. The
  previously disabled **Industries** item becomes a live dropdown trigger.
  Final nav: **Industries ▾ · Resources · Company**.
- Markup (copied per page, like the rest of the nav):

  ```html
  <div class="nav__drop">
    <button class="nav__droptrigger" type="button" aria-haspopup="true">Industries</button>
    <div class="nav__menu">
      <a href="./banking.html">Banking</a>
      <a href="./insurance.html">Insurance</a>
      <a href="./logistics.html">Logistics</a>
    </div>
  </div>
  ```

- **Pure CSS, no JS**: the panel opens on `.nav__drop:hover` and
  `.nav__drop:focus-within` (keyboard support falls out of `focus-within`).
  Small opacity/translate transition, guarded by the existing
  `prefers-reduced-motion` query. Styling mirrors existing nav link styles;
  the panel is a dark card (`--bg`-family, 1px border, subtle shadow).
- The trigger itself does **not** navigate — no Industries landing page.
- On an industry page: that page's menu link gets `aria-current="page"` and
  the trigger gets the active (lit) color.
- Mobile: `.nav__links` is already hidden by the existing mobile media query
  (`style.css:1628`) — the dropdown inherits that; nothing extra needed.

## Pages — shared skeleton

Three new top-level pages: `banking.html`, `insurance.html`, `logistics.html`.
All three share one section skeleton (numbered `01…06` like existing pages):

1. **Hero** (`.ihero`, adapted from `.ahero`) — eyebrow
   `Industries · <name>`, industry-specific H1 (promoted from the old
   section H2), sub, and a stats line (`.astats`). Right side: the orbit viz
   reduced to a **single industry ring** (that industry's orbit + agents +
   the FlowX chip core) — same SVG parts, one ring instead of three.
2. **01 / The problem** — new section: three pain-point cards from the real
   page's problem statement.
3. **02 / Value stream** — the industry's existing journey schematic
   (`.vs` figure) moved over unchanged, including segment-hover → stage
   highlighting.
4. **03 / Segments** — the industry's existing `.segs` cards (who it's for),
   moved over; chips unchanged.
5. **04 / Featured agents** — an industry-specific `.feat` bento
   (see redistribution below).
6. **05 / Workflows** — new section: the real page's three
   "mission-critical workflows", as three numbered cards.
7. **06 / Next** — shared CTA (static-field canvas) + footer.

## Per-page content

### banking.html — "Banking agents, on the lending journey."

- **Problem**: KYC/onboarding delays · lending bottlenecks · financial
  reporting overhead.
- **Value stream**: lending journey (apply → verify → underwrite → decide →
  onboard) — existing.
- **Segments**: Retail Banking · Commercial & Corporate Banking · Risk &
  Compliance — existing.
- **Featured** (9): `false-positive-screener` and `voice-call-transcriber`
  move here from the old bento (both are fraud-investigation agents on the
  real banking page); new cards in the same micro-viz style:
  `sar-report-compiler`, `alert-triage`, `case-narrative-generator`,
  `timeline-generator`, `evidence-compiler`,
  `business-activity-classification`, `legal-contract-drafting`.
- **Workflows**: Onboarding & KYC · Underwriting · Financial Insights.

### insurance.html — "Insurance agents, on the claims journey."

- **Problem**: underwriting delays · claims-processing inefficiency (manual
  reviews, exception handling) · fraud detection on fragmented data.
- **Value stream**: claims journey (fnol → docs → assess → decide → settle)
  — existing.
- **Segments**: Insurers & Carriers · Brokers · Reinsurance — existing.
- **Featured** (8, all new — the old bento had no insurance cards):
  `quote-optimization`, `premium-change-explainer`,
  `telematics-interpreter`, `commission-rule-validation`,
  `contract-compliance-checker`, `sales-script-compliance`,
  `cross-sell-trigger`, `suitability-validator` (names from the real
  insurance agent catalog).
- **Workflows**: Underwriting · Claims Processing · Fraud Detection.

### logistics.html — "Logistics agents, on the freight lifecycle."

- **Problem**: network decisions misaligned with live conditions · manual
  exception handling in load processing · billing-reconciliation disputes.
- **Value stream**: freight lifecycle (quote → book → move → deliver →
  invoice) — existing.
- **Segments**: Carriers · 3PLs · Brokers · Forwarders · Shippers — existing
  5 cards (descriptions keep their DRAFT marketing-review comment).
- **Featured** (8): keeps `rate-optimization`,
  `smart-quoting-margin-performance`, `predictive-maintenance-cost`,
  `service-history-analyzer`, `maintenance-planner`, `market-intelligence`,
  `failure-prediction` from the old bento; adds `route-optimization`
  (Dynamic Routing category on the real page).
- **Workflows**: Network Optimization · Load Processing · Billing
  Reconciliation.

## agents.html — redirect

`agents.html` is replaced by a minimal redirect page (kept as a Vite entry so
it lands in the build): `<meta http-equiv="refresh" content="0; url=./banking.html">`
plus a fallback link — the live GitHub Pages URL may be bookmarked/shared.
`src/agents.js` is renamed to `src/industry.js` (its behaviors — segment
hover, `.vs__scroll` edge fades, screener feed, rate readout, CTA canvas —
are already generic; feed/readout bits no-op on pages without those hooks).
New micro-visuals reuse the existing `fviz--rows/bars/dots/risk/feed` CSS
patterns; anything genuinely new gets a small addition in the same style.

## Internal link updates

- **Nav on all pages** (`index`, `about`, `resources`, `blog-flowx-6`, and
  the 3 new pages): remove "AI Agents", enable the Industries dropdown.
- `index.html:210` "Explore All Agents" button → relabeled **"Explore
  Industries"**, pointing to `./banking.html` (first industry).
- `about.html:315` / `resources.html:242` "Explore Agents" ghost buttons →
  point to `./banking.html`.
- **Footer "Platform" column** on all pages: the `Agents` link becomes three
  links — `Banking`, `Insurance`, `Logistics`.

## Files

- `banking.html`, `insurance.html`, `logistics.html` — new pages.
- `agents.html` — gutted to a meta-refresh redirect → `banking.html`.
- `src/agents.js` → `src/industry.js` — shared entry for the three pages.
- `vite.config.js` — add `banking`/`insurance`/`logistics` inputs; keep
  `agents` (redirect page).
- `src/style.css` — append `.nav__drop*`/`.nav__menu` dropdown rules,
  `.ihero` hero adaptation, problem-cards and workflow-cards sections
  (reusing existing tokens/patterns).
- Nav + footer edits on `index.html`, `about.html`, `resources.html`,
  `blog-flowx-6.html`.

## Decisions / assumptions

- **Copy fidelity**: real flowx.ai copy wherever it exists (problem
  statements, workflow names, agent names); gaps filled in the site's voice
  and marked with a `DRAFT — marketing review` comment like the existing
  logistics segments.
- **Stats line in heroes**: per-industry agent counts are not published —
  heroes reuse honest framings ("220+ agents · 3 industries · in
  production") rather than invented per-industry counts.
- Dropdown is desktop-only by inheritance (mobile nav links already hidden);
  a mobile menu is out of scope.
- No second value-stream per industry for now (banking onboarding journey
  noted as a possible follow-up, not in scope).
- Verification: `npm run dev` manual pass (dropdown hover + keyboard,
  segment-hover highlighting on all three pages, reduced-motion), then
  `npm run build`.
