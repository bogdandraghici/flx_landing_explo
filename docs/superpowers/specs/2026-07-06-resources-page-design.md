# Resources page — design

Date: 2026-07-06
Project: `flx_landing_explo/v1/` (FlowX landing redesign)

## Goal

Add a **Resources** page holding three things: a link to the Documentation
site, a link to the Academy site, and a Blog section whose content is taken
from the live https://www.flowx.ai/blog. It must match the existing redesign
(shared nav / hero / section / CTA / footer chrome and design tokens).

## Chosen layout — "Portal cards + blog feed"

1. **Hero** (`.rhero`) — left-aligned eyebrow + title + sub (reuses the shared
   `hero__*` styles; overridden to left-align).
2. **01 / Learn** — two portal link cards (`.portal` / `.portal__card`):
   **Documentation** → `https://docs.flowx.ai`, **Academy** →
   `https://academy.flowx.ai`. External, `target="_blank"`.
3. **02 / Blog** — a **featured** latest post (`.feat`, FlowX.AI 6 Release
   Summary) followed by a responsive grid (`.blog__grid` / `.post`) of the
   remaining 10 articles, each linking to its live flowx.ai/blog article. A
   trailing "All articles on flowx.ai" ghost button.
4. **03 / Next** — the shared CTA section + footer.

## Content source

Blog cards are **static HTML** (no runtime fetch) — title, primary category
pill, date, a one-line excerpt, and the real article URL — captured from the
blog on 2026-07-06 (11 posts total: 1 featured + 10 in the grid).

## Files

- `resources.html` — new page (nav copied with `Resources` `aria-current`).
- `src/resources.js` — entry: `initChrome()` + CTA `createStaticField()`.
- `vite.config.js` — add `resources` input to the multi-page build.
- `src/style.css` — appended `.rhero`, `.portal*`, `.feat*`, `.blog*`, `.post*`
  rules + a `max-width:760px` block (all reuse existing tokens).
- Nav on `index.html`, `agents.html`, `about.html` — enable the previously
  disabled **Resources** link (Industries stays disabled).

## Decisions / assumptions

- Blog cards link **out** to flowx.ai (we are not building article pages).
- Featured = the FlowX.AI 6 release summary (flagship), grid ordered by date.
- Docs/Academy URLs taken from the existing footer (`docs.flowx.ai`,
  `academy.flowx.ai`) — flagged with `VERIFY URL` comments.
- Reduced-motion: reveals resolve to visible (shared rule); no page-specific
  animation added.
