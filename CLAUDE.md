# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

Design explorations for the **FlowX** landing page. A monorepo where each `vN/`
folder is a **self-contained project** — an independent take on the landing
page. Explorations are kept side by side, not merged into one app.

| Version | Stack | Source | Run | Live |
| --- | --- | --- | --- | --- |
| v1 | Vite (vanilla HTML/CSS/JS) | [`v1/`](v1/) | `cd v1 && npm run dev` → :4321 | https://bogdandraghici.github.io/flx_landing_explo/v1/ |
| v2 | Next.js 15 + Tailwind v4 | [`v2/`](v2/) | `cd v2 && npm run dev` → :3200 | https://bogdandraghici.github.io/flx_landing_explo/v2/ |

Deployed builds live in `docs/vN/` and are served by GitHub Pages.

> **Active version:** `v2/` (the Next.js port) is what we're actively working on.
> It's a 1:1 rebuild of v1 with identical content and style — v1 is the
> reference/source-of-truth, so read it to match, but make changes in `v2/`.
> The `FLX Landing v2/` and `FLX Landing v3/` folders in the *parent* directory
> are unrelated older explorations (not this repo's `v2/`); ignore them.
>
> **Collaboration:** the repo is shared with Bogdan Raduta. He owns the
> engineering/logic PRs into `v2/` (e.g. migrating the ROI calculator); we own
> the design/visual polish. Pull before starting and work on a branch to avoid
> colliding with his in-flight PRs.

## Layout

```
flx_landing_explo/
├── docs/vN/        # built output served by GitHub Pages (do not hand-edit)
├── v1/             # exploration 1 — a full Vite project
│   ├── index.html    # all markup (nav, hero, sections, footer)
│   ├── banking.html / insurance.html / logistics.html  # industry pages: hero, problem, value stream + who-it's-for (merged), featured bento, workflows, CTA
│   ├── agent-builder.html / flowx-code.html / observatory.html  # product pages
│   ├── about.html / resources.html / blog-flowx-6.html  # company / content pages
│   ├── agents.html    # redirect stub → banking.html (old /agents links)
│   ├── vite.config.js  # multi-page build (all 11 .html entries: index, banking, insurance, logistics, agent-builder, flowx-code, observatory, about, resources, blog-flowx-6, agents)
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

## v2 architecture (active)

`v2/` is a 1:1 Next.js + Tailwind rebuild of v1 — **identical page structure and
content**, with v1's `style.css` kept verbatim as the source of truth (bridged
into Tailwind `@theme` tokens) and every v1 animation preserved as a client-side
init module.

```bash
cd v2
npm install
npm run dev        # http://localhost:3200
npm run build      # production build; all pages prerender as static
```

- **`app/layout.jsx`** — shared shell: fonts (`@fontsource` Sora/Geist/Geist
  Mono, matching v1), no-flash theme script, grain canvas, `<Nav>`/`<Footer>`,
  and `<Chrome>` (runs v1's shared `initChrome`).
- **`app/<route>/page.jsx`** — each page renders only its `<main>`; the v1 markup
  converted to JSX. Routes: `/`, `/agents` (→ `/banking`), `/agent-builder`,
  `/flowx-code`, `/observatory`, `/banking`, `/insurance`, `/logistics`,
  `/about`, `/blog-flowx-6`, `/resources`.
- **`lib/v1/*.js`** — v1's JS (grain, order field, blueprint, mega-menu,
  industry, about, flowx-code CLI) ported as importable modules; each page mounts
  its own `*Init` client component.
- **`app/globals.css`** — Tailwind import + `@theme` token bridge + v1
  `style.css` verbatim. Design/theming conventions below still apply — the tokens
  and single-accent rules carried over from v1.

To verify parity against v1: run both dev servers (v1 :4321, v2 :3200) and
compare the same routes.

## v1 architecture (reference)

- **Vanilla ES modules, no framework.** No React/Vue/build magic beyond Vite.
- **`vite.config.js`** declares a multi-page build with entries for all 11 pages:
  `index.html`, `banking.html`, `insurance.html`, `logistics.html`,
  `agent-builder.html`, `flowx-code.html`, `observatory.html`, `about.html`,
  `resources.html`, `blog-flowx-6.html`, plus `agents.html` (the redirect stub)
  — so all of them get built/optimized by Vite.
- **`index.html`** holds all the markup. Sections: nav (mega-menu — WAI-ARIA
  disclosure pattern, driven by `src/megamenu.js`, with a CSS-only no-JS
  fallback), hero, blueprint, compliance marquee, "why 95% fail", platform,
  proof, CTA, footer. **The nav markup is duplicated across all 10 content pages**
  (index, banking, insurance, logistics, agent-builder, flowx-code, observatory,
  about, resources, blog-flowx-6) with per-page `aria-current` — edit it in every
  page, not just one. (`agents.html` is the 11th entry but a bare redirect stub
  with no nav.)
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
- **Hover:** only *actionable* elements (links, buttons, and other interactive
  controls) get a hover effect. Static content — headings, body copy, plain
  cards, decorative visuals — must not change on hover, so a hover cue always
  signals "you can click this." Don't add `:hover` styles to non-interactive
  elements.
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
`main` for small changes.

### Deploying to the live site (don't skip this)

**Committing a `vN/` source change does NOT update the live site.** GitHub Pages
serves the *built output* in `docs/vN/`, so a source-only commit leaves the live
page stale — you must rebuild and commit `docs/vN/` as a separate step.

Do **not** use a plain `npm run build`: it emits root-absolute `/assets/...`
URLs that 404 under the Pages subpath. Build with the base path, then clean-copy:

```bash
cd v1
npx vite build --base=/flx_landing_explo/v1/    # NOT `npm run build`
cd ..
rm -rf docs/v1 && cp -R v1/dist docs/v1         # clean copy; blog/team assets come from public/, don't hand-preserve
git add docs/v1 && git commit && git push
```

Verify before committing: `grep -o 'href="[^"]*\.css"' docs/v1/index.html` — the
paths must start with `/flx_landing_explo/v1/`. Pages takes ~1–2 min to
redeploy; hard-refresh (Cmd+Shift+R) to bypass cache. Never hand-edit
`docs/vN/`.

#### v2 (Next.js) deploy recipe

v2 is different from v1 — it's a Next.js static export, NOT Vite. The subpath is
wired in `v2/next.config.mjs` (basePath/assetPrefix + `NEXT_PUBLIC_BASE_PATH`,
which feeds the `bp()` helper in `components/lib/base.js` that prefixes
root-absolute `<a href>`/`<img src>`). So the build flag is `GITHUB_PAGES=true`,
not a `--base` arg.

**Just run the publish script** — it does the whole recipe (build → copy to
`docs/v2` → verify asset paths → commit → push), only on `main`, and is a no-op
if `docs/v2` is unchanged:

```bash
./publish-v2.sh        # from the flx_landing_explo/ repo root
```

Two things the script relies on (don't undo them):
- The Pages build uses `distDir: out-pages` (not the default `.next`), so it
  never clobbers a running `npm run dev` (which uses `.next`). Publishing is
  therefore safe while the dev server is up.
- `generateBuildId: () => 'flx-v2'` pins the build ID, so an unchanged source
  tree produces a byte-identical export — that's what makes the script a true
  no-op and keeps auto-publish (below) from committing build-ID churn.

**Auto-publish on push:** a personal `PostToolUse` hook (in
`../.claude/settings.local.json`, i.e. the workspace root above the repo — not
committed, so it's Bogdan's only, not Raduta's) runs `publish-v2.sh` after every
`git push`. So pushing v2 source to `main` republishes the live site
automatically. It only acts on `main` and no-ops when `docs/v2` is unchanged.
The hook activates when a session starts with that settings file present (open
`/hooks` once or restart to pick up a freshly-created one).

The equivalent by hand, if you ever need it:

```bash
cd v2
rm -rf out-pages && GITHUB_PAGES=true npm run build   # exports to v2/out-pages/
cd ..
rm -rf docs/v2 && cp -R v2/out-pages docs/v2          # clean copy
git add docs/v2 && git commit && git push
```

Two gotchas, both already handled but don't undo them:
- **`docs/.nojekyll` must exist.** Next emits assets under `_next/`, and Pages'
  legacy Jekyll build skips underscore-prefixed folders → every asset 404s.
  `.nojekyll` at the docs root disables Jekyll. (v1/Vite avoids this by using
  `assets/`.)
- **The `.nojekyll` only takes effect on a *fresh* build.** If Pages last built a
  commit that predated `.nojekyll`, force a rebuild:
  `gh api -X POST repos/bogdandraghici/flx_landing_explo/pages/builds`.

Verify: `grep -o 'href="[^"]*\.css"' docs/v2/index.html` must start with
`/flx_landing_explo/v2/_next/`, and after deploy the CSS URL must return 200
(not just the page) — a 200 page with 404 CSS means Jekyll ate `_next`.
