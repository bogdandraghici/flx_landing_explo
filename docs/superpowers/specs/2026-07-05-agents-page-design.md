# Agents page — design

**Date:** 2026-07-05
**Project:** `v1/` (FlowX landing exploration)
**Status:** approved

## Goal

Add a dedicated **AI Agents page** (`agents.html`) to the v1 landing. Content
comes 1:1 from https://www.flowx.ai/ai-agents — which is a repetitive,
visual-less link directory — reorganized as **value-stream schematics**: each
industry rendered as an animated journey pipeline with agents attached to the
stages where they work, in the landing's existing dark/amber/mono aesthetic.

Chosen concept (of three explored): **B — value-stream schematics**, with a
**dedicated featured-agents section** (option A) after the industries.

## Routing & plumbing

- New Vite entry `v1/agents.html`. Add `v1/vite.config.js` with
  `rollupOptions.input = { main: index.html, agents: agents.html }` (no config
  exists today; keep `port: 4321 strict` and any defaults otherwise implied).
- New thin entry `v1/src/agents.js`. Reuses the shared pieces from the landing
  (grain overlay, `.rv` scroll-reveal IntersectionObserver, nav behavior,
  `reduceMotion` guard). Factor those shared bits out of `main.js` if cheap
  (e.g. `src/shared.js`); do not fork logic.
- `v1/src/style.css` stays the single stylesheet — append new components using
  existing `:root` tokens.
- **Landing edits:** nav "AI Agents" link, registry "Explore All Agents"
  button, and footer "Agents" link → `./agents.html`. Hero "Explore Agents"
  keeps pointing at `#registry` (in-page flow).
- **Agents-page nav:** same nav component, "AI Agents" active; other items
  link back to `index.html#…` anchors; "Book a demo" → the page's own `#cta`
  section.

## Page flow

Numbered sections, same system as the landing (`section__no` mono labels).

### 01 / Hero — compact

No full-height canvas (that stays unique to the landing). Grain overlay only.

- Eyebrow (mono): `AI Agents · by industry and business process`
- H1: "220+ agents, mapped to your value streams." (amber period)
- Sub-copy: short; drawn from the landing's existing claims (220+
  enterprise-ready agents, regulated industries, plug into legacy systems).
- Mono stats strip: `220+ agents · 20 categories · 3 industries · in production`

### 02 / Banking · 03 / Insurance · 04 / Logistics

Each industry section is: **section head → animated SVG schematic → segment
cards** (full directory below).

**Schematics** — horizontal journey pipeline in the same visual language as
the landing's Agent Builder SVG (`abx-*` classes as reference: thin strokes,
mono labels, amber live-node, amber pulses riding wires via
`animateMotion`). Stage nodes on a spine; agent nodes wired beneath the
stages they serve. All animation behind the `reduceMotion` guard.

- Banking: `apply → verify → underwrite → decide → onboard` (lending journey)
- Insurance: `fnol → docs → assess → decide → settle` (claims journey)
- Logistics: `quote → book → move → deliver → invoice` (freight lifecycle)

**Hover link:** hovering a segment card highlights the pipeline stage(s) its
agents sit on (CSS class toggling from `agents.js`; a static mapping
per-segment → stage ids is fine). Progressive enhancement — page fully works
without it.

**Segment cards** — the full directory, nothing dropped. Each card: segment
name, its description (verbatim from source), agent use-cases as mono chips.
Chips are **dead placeholders** (`href="#"` or `<span>`s — match how the
landing handles dead nav items). Banking/Insurance: 3-up grid; Logistics: 5
cards, wrapping grid.

### 05 / Featured agents

Bento grid of all 9 featured agents as mono "spec-cards": agent name (mono,
kebab or as-written), the one-line description from the source, and a small
living micro-visual per card. Micro-visuals are cheap DOM/CSS/JS (no canvas):
e.g. ticking log lines for the false-positive screener, a CSS waveform for
the voice transcriber, a rate readout for rate optimization, sparkline bars
elsewhere. A few animated, the rest static — restraint over spectacle; all
behind `reduceMotion`.

### 06 / CTA + footer

Same components as the landing (`section--cta` styling, footer verbatim).
CTA copy variant: "Put agents on your value streams." Buttons: "Schedule a
customized demo" (mailto, as landing) + ghost button "Compile your own agent"
→ `index.html#hero` (the landing's terminal).

## Content inventory (verbatim from flowx.ai/ai-agents)

### Banking

- **Retail Banking** — "Agents for high-volume customer journeys; from
  mortgage origination to account opening and customer retention."
  Chips: Retail mortgage underwriting · Customer churn & retention · Quick wins
- **Commercial & Corporate Banking** — "End-to-end automation for commercial
  lending, corporate onboarding, SME underwriting, and trade finance
  operations."
  Chips: Commercial onboarding · Corporate account opening · Commercial
  lending · Trade finance invoice factoring · SME/Corporate underwriting
  financial insights
- **Risk & Compliance** — "Production-ready agents for fraud investigation,
  AML/KYC checks, financial crime risk assessment, and regulatory processing."
  Chips: Fraud investigation · AML & KYC · Garnishment processing · Financial
  crime risk assessment

### Insurance

- **Insurers & Carriers** — "Core operational agents for insurance companies
  managing policies and claims directly."
  Chips: Policy onboarding · Claims processing · Underwriting assessment ·
  Fraud detection & alerting · Regulatory & Compliance · Complaints & disputes
- **Brokers** — "Agents focused on distribution, client management, and sales
  optimization."
  Chips: Distribution · Renewals & Upsell · Policy onboarding · Complaints &
  disputes · Regulatory & Compliance
- **Reinsurance** — "Agents tailored for risk transfer, treaty management,
  and portfolio analysis."
  Chips: Reinsurance coordination · Underwriting assessment · Fraud detection
  & alerting · Regulatory & Compliance · Claims processing

### Logistics

- **Carriers** — chips: Fleet optimization · Predictive maintenance · Load
  entry · Fuel efficiency · Compliance & safety · Dynamic pricing · Invoicing
- **3PLs** — chips: Inventory optimization · Dynamic routing · Load entry ·
  Smart quoting · Invoice reconciliation · Customer service · Exception
  management
- **Brokers** — chips: Smart quoting · Carrier matching · Load entry ·
  Invoice reconciliation · Inbox management · Performance analysis · Customs
  validation
- **Forwarders** — chips: Customs validation · Smart quoting · Risk &
  compliance · Invoice reconciliation · Cost prediction
- **Shippers** — chips: Load tendering · Freight quoting · Invoice
  reconciliation · Demand forecasting

The logistics segments have no descriptions at the source; write one-line
ledes in the same register as banking/insurance (flag with an HTML comment
`<!-- DRAFT — marketing review -->`, same convention as the landing's FAQ).

### Featured agents (9)

1. **Smart quoting margin performance** (logistics broker) — "Monitors quote
   outcomes and tunes pricing models for profitability."
2. **Predictive maintenance cost optimization** (carriers) — "Identifies
   vendor and part savings opportunities across repairs."
3. **Service history analyzer** — "Analyzes maintenance logs to detect
   recurring issues and root causes."
4. **Rate optimization** — "Calculates optimal bid prices based on demand,
   distance, and target margin."
5. **Maintenance planner** — "Recommends optimal service schedules based on
   utilization and condition."
6. **False positive screener** — "Reasons through transaction context to
   filter obvious false positives before human review"
7. **Market intelligence** — "Aggregates live rate indices, lane performance,
   and carrier availability."
8. **Failure prediction** — "Forecasts breakdown risk using historical repair
   and usage data."
9. **Voice call transcriber** — "Converts MP3 call recordings to searchable
   timestamped transcripts with keyword indexing"

## Conventions & constraints

- Amber `#FCB813` is the only accent; use sparingly (live nodes, pulses,
  section numbers, one word per heading at most).
- Fonts as landing: Sora (display) / Geist (body) / Geist Mono (data).
- Every animation honors `prefers-reduced-motion` (both the JS `reduceMotion`
  guard and the CSS media query).
- No framework, no new dependencies.
- Responsive: schematics scale down (SVG viewBox) and segment grids collapse
  to 1-col on narrow viewports; test at ~375px.

## Testing / acceptance

- `npm run build` succeeds and emits both `index.html` and `agents.html`.
- Manual pass on both pages, desktop + ~375px: nav cross-links work both
  directions, all 11 segments and all agent chips present, 9 featured cards
  present, schematic animations run and stop under reduced motion.
- No console errors on either page.
