# Industry hero visuals — design

**Date:** 2026-07-06
**Scope:** `v1/banking.html`, `v1/insurance.html`, `v1/logistics.html`, `v1/src/style.css`

## Problem

The three industry pages share essentially the same hero visual — an orbit ring
of dots around the FlowX chip core, differing only in label and rotation
timing. Meanwhile every other page hero has a bespoke metaphor in the house
visual language (about: DNA double helix; resources: doc stack with a read
head). The industry heroes should each get a unique visual with a metaphor
matching its industry, in that same style.

## Decisions (user-approved)

- **Banking:** vault unlocking — tumbler rings rotate into alignment, amber
  unlock pulse ("approval granted").
- **Insurance:** shield deflecting risk — falling risk particles deflect off a
  shield arc protecting an asset; one lands and is restored with an amber
  sweep ("made whole").
- **Logistics:** optimal route — a node network where the optimal path draws
  in amber and a shipment dot travels it; alternates stay dim.
- **FlowX chip logo:** dropped from all three. Each metaphor stands alone,
  matching the about/resources heroes.

## Approach

Replace the orbit-ring SVG inside each page's `.ahero__viz` with a bespoke
inline SVG. HTML + CSS only — no JS changes (`industry.js` never touches the
hero viz). All motion is SMIL and/or CSS keyframes, following the resources
`rk-*` precedent. Styles are appended to `src/style.css` in per-page
namespaces:

| Page | Namespace | Metaphor |
| --- | --- | --- |
| banking.html | `bkv-*` | bank vault |
| insurance.html | `shv-*` | shield |
| logistics.html | `rtv-*` | route |

### Banking — vault unlocking (`bkv-*`)

- Square `viewBox="0 0 460 460"` to keep the current column proportions; the
  circular composition intentionally echoes the old orbit silhouette.
- Three concentric tumbler rings: thin arcs with notch gaps, each rotating at
  its own speed/direction via **CSS keyframe rotation** (not SMIL, so reduced
  motion can freeze them) choreographed to one shared loop duration: rings
  drift → click into alignment one by one → notches line up into a channel →
  center bolt gets an amber unlock pulse + small mono tag `approved` → loop.
- Base (unanimated) transform of every ring is the **aligned** pose.

### Insurance — shield deflecting risk (`shv-*`)

- Risk particles fall from the top on staggered **SMIL `animateMotion`**
  loops; a thin shield arc sits over an asset card (drawn like the `rk-card`
  doc stack).
- Most particles hit the arc and slide off along curved deflection paths; once
  per loop one lands inside and the asset gets an amber restore sweep.
- Mono tag `covered`.

### Logistics — optimal route (`rtv-*`)

- A network of ~10 nodes with faint dashed alternate edges.
- The optimal path draws itself in amber via `stroke-dashoffset` animation,
  then a shipment dot travels it via SMIL `animateMotion`, looping.
- Small mono corner readout: `3 legs · cleared`.

### Shared conventions

- Hairline 1px strokes from existing tokens (`--line-soft`, low-alpha whites).
- Amber (`--amber`) only at each metaphor's "resolution" moment.
- Mono labels ~8.5px uppercase, same voice as `.abx-cat`.
- `role="img"` with an updated `aria-label` per page; wrapper keeps
  `.ahero__viz` and the `rv-load` reveal.
- Prefer SMIL for traveling elements (the resources page notes SMIL avoids the
  reveal-layer rasterizing empty); CSS keyframes for anything that must freeze
  gracefully.

### Reduced motion

Each SVG's static pose is the **resolved** state: vault aligned, asset intact,
route fully drawn. In the existing `@media (prefers-reduced-motion: reduce)`
block:

- CSS animations get `animation: none`, freezing on the resolved pose.
- SMIL-driven movers (risk particles, shipment dot, restore sweep) get
  `display: none` — the same pattern the file already uses for the orbit dots.

### Cleanup

Once all three pages switch, the orbit-only classes become unused and are
removed from `style.css`, including their reduced-motion rules: `hero-ring`,
`hero-agent`, `hero-tag`, `hero-core`, `hero-core-inner`, `hero-chip-face`,
`hero-logo-x`, `hero-logo-bar`. The `abx-*` classes stay (used by the
agents-bento sections). Verify each removal with a repo-wide grep first.

## Error handling

Not applicable — static markup and styles, no runtime logic. Failure modes are
visual only and covered by manual verification.

## Testing / verification

- `npm run dev` and visually check all three heroes at desktop and narrow
  widths (the `.ahero__grid` stacks on mobile).
- Toggle `prefers-reduced-motion` (macOS: Settings → Accessibility → Display →
  Reduce motion) and confirm each hero shows its resolved static pose with no
  drifting SMIL elements.
- `npm run build` passes.
- Grep confirms no remaining references to removed classes.
