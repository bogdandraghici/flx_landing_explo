# DESIGN.md — FlowX landing (v1)

Source of truth: `src/style.css` `:root` tokens. This file summarizes them.

## Color

- Surfaces (dark, default): `--bg #0A0B0D`, `--bg-raised #0E1013`,
  `--bg-panel #0C0E11`. Light theme: neutral paper `#F4F4F5` / `#FCFCFD`.
- Ink system: `--ink` (rgb triplet) drives all hairlines/veils via
  `rgba(var(--ink), a)`. Lines: `--line` (8% dark / 12% light),
  `--line-soft`.
- Text: `--text`, `--text-dim` (58%), `--text-faint` (34%).
- Accent: `--amber #FCB813` (+ `--amber-text` deepens to `#8a5e00` on paper
  for AA). `--amber-soft` tint, `--amber-line` stroke. ONE accent, sparing.
- Never pure #000/#fff. Never hardcode a new grey — go through tokens.

## Typography

- Display: Sora Variable (`--font-display`) — headlines only.
- Body/UI: Geist Variable (`--font-body`), base 16px; nav/UI links 13.5px.
- Data/labels: Geist Mono (`--font-mono`) — uppercase micro-labels at
  10–11px with 0.16–0.2em tracking; section indices; terminal.

## Space & structure

- Shell: `max-width: 1360px; padding-inline: clamp(20px, 5vw, 72px)`.
- Nav bar height 66px, fixed, transparent until `.scrolled`
  (`rgba(var(--scrim), .72)` + 14px blur + bottom hairline).
- Popovers: `--bg-raised`, 1px `--line` border, 12px radius,
  `--shadow-pop`; item hover = `rgba(var(--ink), .05)` wash.

## Motion

- Ease: `--ease: cubic-bezier(0.16, 1, 0.3, 1)` (out-expo family).
- Durations 0.2–0.35s for chrome. Crisp snaps preferred over long fades.
- Every animation guarded by `prefers-reduced-motion`.

## Focus & a11y

- Global `:focus-visible`: 2px amber outline, 3px offset.
- `aria-current="page"` marks the active page in nav (lit to `--text`).
- Disabled/placeholder links: `aria-disabled="true"` at 22% text alpha.
