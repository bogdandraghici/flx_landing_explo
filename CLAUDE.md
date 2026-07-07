# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

Design explorations for the **FlowX** landing page. A monorepo where each `vN/`
folder is a **self-contained Vite project** — an independent take on the landing
page. Explorations are kept side by side, not merged into one app.

| Version | Source | Live |
| --- | --- | --- |
| v1 | [`v1/`](v1/) | https://bogdandraghici.github.io/flx_landing_explo/v1/ |

Deployed builds live in `docs/vN/` and are served by GitHub Pages.

> **Active version:** `v1/` is the version we're actively working on — treat it
> as the source of truth. The `FLX Landing v2/` and `FLX Landing v3/` folders in
> the parent directory are separate/older explorations; ignore them unless asked.

## Layout

```
flx_landing_explo/
├── docs/vN/        # built output served by GitHub Pages (do not hand-edit)
├── v1/             # exploration 1 — a full Vite project
│   ├── index.html    # all markup (nav, hero, sections, footer)
│   ├── banking.html / insurance.html / logistics.html  # industry pages: hero, problem, value stream + who-it's-for (merged), featured bento, workflows, CTA
│   ├── agents.html    # redirect stub → banking.html (old /agents links)
│   ├── vite.config.js  # multi-page build (index, banking, insurance, logistics, about, resources, blog-flowx-6, agents entries)
│   ├── public/     # static assets (flowx-logo.svg)
│   └── src/
│       ├── main.js       # entry: hero canvas, terminal, blueprint, sections
│       ├── shared.js      # shared page chrome: grain, nav scroll state, reveals
│       ├── megamenu.js    # mega-menu behavior (disclosure pattern + mobile drawer)
│       ├── industry.js    # shared entry for the three industry pages
│       ├── style.css      # all styles; design tokens in :root
│       ├── orderField.js  # hero "order field" canvas animation + CTA static grid
│       └── blueprint.js   # mocked "solution compiler" (classify → SVG + yaml)
└── vN/             # future explorations follow the same shape
```

## Running (per exploration)

Each `vN/` is independent — `cd` into it first.

```bash
cd v1
npm install
npm run dev        # http://localhost:4321 (strict port)
npm run build      # production build → dist/
npm run preview
```

## v1 architecture

- **Vanilla ES modules, no framework.** No React/Vue/build magic beyond Vite.
- **`vite.config.js`** declares a multi-page build with entries for `index.html`,
  `banking.html`, `insurance.html`, `logistics.html`, `about.html`,
  `resources.html`, `blog-flowx-6.html`, plus `agents.html` (the redirect stub)
  — so all of them get built/optimized by Vite.
- **`index.html`** holds all the markup. Sections: nav (mega-menu — WAI-ARIA
  disclosure pattern, driven by `src/megamenu.js`, with a CSS-only no-JS
  fallback), hero, blueprint, compliance marquee, "why 95% fail", platform,
  proof, CTA, footer. **The nav markup is duplicated across all 7 pages**
  (index, banking, insurance, logistics, about, resources, blog-flowx-6) with
  per-page `aria-current` — edit it in every page, not just one.
- **`banking.html` / `insurance.html` / `logistics.html`** are the industry
  pages, each with: a hero with a bespoke industry-metaphor viz (vault /
  shield / route), a problem section, a merged value-stream + who-it's-for
  section (the pipeline schematic above the segment cards, so hovering a
  segment highlights its stages in view), a featured-agents bento, workflows,
  and a CTA.
- **`agents.html`** is a meta-refresh redirect to `banking.html`, kept so old
  `/agents` links still resolve.
- **`src/style.css`** is the single stylesheet. Design tokens (colors, fonts,
  easing) are CSS custom properties in `:root` at the top — prefer these over
  hardcoded values, except when intentionally matching a specific exploration.
- **`src/shared.js`** — page chrome shared across pages: grain overlay, nav
  scroll state, and scroll-reveal IntersectionObservers.
- **`src/main.js`** is the `index.html` entry point. It sets up the hero canvas,
  the terminal input + placeholder animation, and the section behaviors (audit
  ticker, model router, count-up stats), on top of the shared chrome.
- **`src/industry.js`** is the shared entry for the three industry pages. It
  wires the CTA canvas, document-scoped segment-hover → value-stream stage
  highlighting, and null-guarded micro-visual hooks — a screener feed on
  banking, a rate readout on logistics.
- **`src/orderField.js`** — the hero background's "order field" canvas
  animation; also exports the static, fully-resolved lattice frame used as the
  CTA section's background grid.
- **`src/blueprint.js`** — the mocked "solution compiler": classifies a free-text
  use case into one of six domain templates and renders an animated SVG diagram +
  typed `blueprint.yaml`. All client-side, no backend.

## Conventions

- **Accent:** brand amber `#FCB813` is the *only* accent color — use it sparingly.
- **Fonts:** Sora Variable (display), Geist Variable (body), Geist Mono Variable
  (terminal/data), served locally via `@fontsource-variable/*`.
- **Motion:** everything honors `prefers-reduced-motion`; guard new animations the
  same way (`reduceMotion` in `main.js`, the media query in `style.css`).
- **Aesthetic:** single-accent, Linear/Palantir-grade restraint. Dark is the
  default; a neutral-paper **light theme** ships alongside it.
- **Theming:** two themes share one token contract. Dark lives in `:root`,
  light in `:root[data-theme="light"]`, both in `style.css`. Theme-varying
  colors must go through tokens — solid hex tokens or `…-rgb` triplets consumed
  as `rgba(var(--x), a)` so alpha-graded veils/lines flip with one override.
  Never hardcode a new white/charcoal in a rule. The toggle + no-flash logic is
  in `shared.js` (nav toggle, persists to `localStorage`, emits a `themechange`
  event) and an inline `<head>` script in each page. Canvas visuals
  (`orderField.js`, `grain.js`) read the theme and re-paint on `themechange`;
  `blueprint.js` SVG stops are driven by CSS token classes.

## Git

Standard flow — feature branches merged into `main` via PR, or push straight to
`main` for small changes. `docs/vN/` holds the built output served by GitHub
Pages; rebuild (`npm run build`) rather than hand-editing it.
