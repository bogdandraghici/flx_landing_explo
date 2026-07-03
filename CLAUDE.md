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
│   ├── index.html  # all markup (nav, hero, sections, footer)
│   ├── public/     # static assets (flowx-logo.svg)
│   └── src/
│       ├── main.js       # entry: wires nav, reveals, terminal, sections
│       ├── style.css      # all styles; design tokens in :root
│       ├── field.js       # canvas hero background ("grid resolve" animation)
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
- **`index.html`** holds all the markup. Sections: nav, hero, blueprint, compliance
  marquee, "why 95% fail", platform, proof, CTA, footer.
- **`src/style.css`** is the single stylesheet. Design tokens (colors, fonts,
  easing) are CSS custom properties in `:root` at the top — prefer these over
  hardcoded values, except when intentionally matching a specific exploration.
- **`src/main.js`** is the entry point (imported by `index.html`). It sets up the
  hero canvas, scroll-reveal IntersectionObservers, the terminal input +
  placeholder animation, and the section behaviors (audit ticker, model router,
  count-up stats).
- **`src/field.js`** — the hero background canvas animation.
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

## Git workflow (important)

This repo uses the **POC workflow** (`/poc-workflow` skill):

- **All work happens on `poc/*` branches** (kebab-case, e.g. `poc/new-hero`).
- **Never commit or push to `main`/`master`.** Branch first.
- **No merging, no force-pushing, no destructive git ops.**
- Pushing a `poc/*` branch auto-creates a **draft PR** — POC PRs are not merged
  directly; promotion to a feature is done by the team lead.
