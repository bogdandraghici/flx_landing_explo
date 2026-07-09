# FlowX — landing explorations

Design explorations for the FlowX landing page.

| Version | Stack | Source | Run | Live |
| --- | --- | --- | --- | --- |
| v1 | Vite (vanilla HTML/CSS/JS) | [`/v1`](v1/) | `cd v1 && npm install && npm run dev` → http://localhost:4321 | https://bogdandraghici.github.io/flx_landing_explo/v1/ |
| v2 | Next.js 15 (App Router) + Tailwind v4 | [`/v2`](v2/) | `cd v2 && npm install && npm run dev` → http://localhost:3200 | — |

## v2 — Next.js port

`v2/` is a 1:1 Next.js + Tailwind rebuild of the v1 site — **identical page structure and content**, with v1's `style.css` kept verbatim as the source of truth (bridged into Tailwind `@theme` tokens) and every v1 animation preserved as a client-side init module.

```bash
cd v2
npm install
npm run dev      # http://localhost:3200
npm run build    # production build; all pages prerender as static
```

Pages (App Router routes under `v2/app/`): `/`, `/agents` (→ `/banking`), `/agent-builder`,
`/flowx-code`, `/observatory`, `/banking`, `/insurance`, `/logistics`, `/about`,
`/blog-flowx-6`, `/resources`.

How the port is structured:
- `app/layout.jsx` — shared shell: fonts (`@fontsource` Sora/Geist/Geist Mono, matching v1), the no-flash theme script, grain canvas, `<Nav>`/`<Footer>`, and `<Chrome>` (runs v1's shared `initChrome`).
- `app/<route>/page.jsx` — each page renders only its `<main>`; the v1 markup, converted to JSX.
- `lib/v1/*.js` — v1's JS (grain, order field, blueprint, mega-menu, industry, about, flowx-code CLI) ported as importable modules; each page mounts its own `*Init` client component.
- `app/globals.css` — Tailwind import + `@theme` token bridge + v1 `style.css` verbatim.

To verify parity against v1: run both dev servers (v1 on 4321, v2 on 3200) and compare the same routes.

---

Each `vN/` folder is self-contained. Deployed builds for v1 live in `docs/v1/` and are served by GitHub Pages.
