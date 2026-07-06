# About Us page — design

**Date:** 2026-07-05
**Status:** approved (real headshots stylized · "company as a system" layout · original copy verbatim)

## Goal

Add an About Us page to the v1 exploration, using the content of
https://www.flowx.ai/about-us verbatim (minor touch-ups only), but redesigned in
the v1 visual language — dark, amber single accent, mono/system motifs — fixing
the source page's lack of visuals and repetitive layout. Real leadership
headshots from the live site, stylized to match.

## Structure

- New `about.html` — third Vite entry next to `index.html` / `agents.html`
  (added to `vite.config.js` rollup inputs).
- New `src/about.js` entry: `initChrome()` + CTA static field + page behaviors.
- Styles appended to `src/style.css` under an `about page` banner, using
  existing tokens (`--amber`, `--line`, fonts, `.rv` reveals).
- `Company` nav link points to `./about.html` on all three pages
  (`aria-current="page"` on about). Footer gains an About link.
- Headshots + team snapshot downloaded from framerusercontent (the live site's
  own assets) into `public/team/`, referenced relatively (`./team/…`).

## Sections

1. **Hero** — compact (agents-page pattern). Eyebrow `Company · About
   FlowX.AI`; H1: "Deploy AI Agents in Weeks with Real Results in Production";
   sub: verbatim "more than a decade of research and development…" line; mono
   stat strip (est. 2013 · 2 offices · largest Series A in enterprise
   software).
2. **Mission** — mission sentence large + verbatim supporting paragraph;
   alongside, a `mission.yaml` spec panel in the blueprint visual language.
3. **Team** — verbatim lede. Four operator cards: real headshots, grayscale
   duotone at rest, full color + amber border on hover; verbatim names, titles,
   one-line bios; mono metadata row. Full-team snapshot as a wide panel below.
4. **Timeline** — 2013→2025 as a commit-log rail: amber nodes on a vertical
   rail, year + verbatim title/copy per entry, scroll-revealed.
5. **Offices** — Bucharest + Menlo Park coordinate cards (lat/lon in mono,
   verbatim addresses) on a dotted wireframe backdrop.
6. **CTA** — reuse `section--cta` + static order field; "Book a demo".

## Motion & a11y

Existing `.rv` reveal system; all new animation guarded by
`prefers-reduced-motion`. Headshot treatment is CSS filter only (no baked
edits). Alt text on all photos.

## Copy source

All copy verbatim from flowx.ai/about-us (fetched 2026-07-05): mission, team
lede, four bios, five timeline entries (2013, 2021, 2023, 2024, 2025), office
addresses.
