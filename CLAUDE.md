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

## Layout

```
flx_landing_explo/
├── docs/vN/        # built output served by GitHub Pages (do not hand-edit)
├── v1/             # exploration 1 — a full Vite project
│   ├── index.html    # all markup (nav, hero, sections, footer)
│   ├── agents.html    # AI Agents page: value-stream schematics + featured bento
│   ├── vite.config.js  # multi-page build (index.html + agents.html entries)
│   ├── public/     # static assets (flowx-logo.svg)
│   └── src/
│       ├── main.js       # entry: hero canvas, terminal, blueprint, sections
│       ├── shared.js      # shared page chrome: grain, nav, reveals
│       ├── agents.js      # agents-page entry
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
- **`vite.config.js`** declares a multi-page build with two HTML entries —
  `index.html` and `agents.html` — so both get built/optimized by Vite.
- **`index.html`** holds all the markup. Sections: nav, hero, blueprint, compliance
  marquee, "why 95% fail", platform, proof, CTA, footer.
- **`agents.html`** is the AI Agents page: hero, banking/insurance/logistics
  value-stream schematics, a featured-agents bento, and a CTA.
- **`src/style.css`** is the single stylesheet. Design tokens (colors, fonts,
  easing) are CSS custom properties in `:root` at the top — prefer these over
  hardcoded values, except when intentionally matching a specific exploration.
- **`src/shared.js`** — page chrome shared by both pages: grain overlay, nav
  scroll state, and scroll-reveal IntersectionObservers.
- **`src/main.js`** is the `index.html` entry point. It sets up the hero canvas,
  the terminal input + placeholder animation, and the section behaviors (audit
  ticker, model router, count-up stats), on top of the shared chrome.
- **`src/agents.js`** is the `agents.html` entry point. It wires the CTA canvas,
  segment-hover → value-stream stage highlighting, and the featured bento's
  micro-visuals (screener feed, rate readout).
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
- **Aesthetic:** dark, single-accent, Linear/Palantir-grade restraint.

## Git

Standard flow — feature branches merged into `main` via PR, or push straight to
`main` for small changes. `docs/vN/` holds the built output served by GitHub
Pages; rebuild (`npm run build`) rather than hand-editing it.
