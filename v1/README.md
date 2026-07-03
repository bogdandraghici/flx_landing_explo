# FlowX — landing page

Dark, single-accent landing page for FlowX: a secure foundation for embedding AI
in highly regulated environments. Linear/Palantir-grade aesthetic, brand amber
`#FCB813` as the only accent.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
```

## What's inside

- **Hero** — Three.js particle field (`src/field.js`): entropic particles on the
  left condense into an ordered lattice on the right — the 95% → 5% metaphor.
  Custom GLSL point shader, mouse parallax, pauses off-screen, honors
  `prefers-reduced-motion`, WebGL-failure fallback.
- **Solution compiler** — terminal input in the hero (`src/main.js` +
  `src/blueprint.js`). Free-text use case → keyword-classified into one of six
  domain templates (KYC, claims, lending, AML, resolution, generic ops) → renders
  an animated SVG architecture diagram (drawn edges, traveling pulses) plus a
  typed, "signed" `blueprint.yaml` spec sheet. All mocked client-side.
- **Sections** — compliance marquee, "why 95% fail" editorial split, platform
  grid with live audit-log ticker / guardrails / model router, count-up proof
  stats, CTA with magnetic hover, footer.

## Stack

Vite · vanilla ES modules · canvas 2D hero animation · Sora Variable (display) ·
Geist Variable (body) · Geist Mono Variable (terminal/data). No framework —
self-contained, fonts served locally.
