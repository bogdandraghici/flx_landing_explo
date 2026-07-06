# Merge "Value stream" + "Who it's for" into one section — design

**Date:** 2026-07-06
**Scope:** `v1/banking.html`, `v1/insurance.html`, `v1/logistics.html`, `v1/src/style.css`

## Problem

On each industry page the "Value stream" pipeline (section 02) and the "Who
it's for" segment cards (section 03) are separate sections. The segment cards
carry `data-stages` and, on hover, highlight the matching stages on the value
stream (wired in `industry.js`, `document`-scoped). But because the pipeline
lives in the section above, it is usually scrolled off-screen when a visitor
hovers a card — so the interaction fires invisibly. Merging the two into one
section puts the cards directly beneath their pipeline, making the
hover-to-highlight connection visible and meaningful, and unifying the three
pages' structure as a side effect.

## Decision (user-approved)

Merge sections 02 and 03 into a single section per page (Option B), pipeline
above cards. Keep all existing copy. Fold in the centered-trailing-row grid fix
so logistics' 5 cards lay out cleanly. Do **not** normalize the pipeline
internals (logistics keeps its live stage on `invoice`).

## Grounding facts (verified)

- All three pages share the section order: `01 problem` → `02 value-stream` →
  `03 segments` → `04 featured` → `05 workflows` → `06 next` (cta).
- Nothing references the `#value-stream` or `#segments` anchors anywhere in the
  HTML/JS/CSS (the only "value-stream" hits are a blog URL in `resources.html`
  and CSS comments) — so merging and renumbering breaks no anchors.
- The hover interaction in `industry.js` selects a single `.vs` and all
  `.seg[data-stages]`; both remain present and unchanged after the merge, so it
  keeps working with no JS change.
- `.vs` is a bordered panel (`.vs__bar` header + `.vs__scroll` SVG). `.segs` is
  `grid-template-columns: repeat(3, 1fr)`; logistics has 5 `.seg` cards (ragged
  3+2), banking/insurance have 3 (clean row).

## Design

### Merged section structure (per page)

Replace the two `<section id="value-stream">` and `<section id="segments">`
blocks with ONE `<section class="section" id="value-stream">` containing, in
order:

1. **Primary head** — `.section__head` with `.section__no` = `02 / Value stream`
   and `.section__headline` holding the existing journey `h2` (unchanged per
   page) and the existing lede **extended** by one clause pointing at the
   interaction. Exact ledes:
   - Banking: `From first application to funded account — agents attach to every
     stage of origination, onboarding, and risk. Hover a role below to see where
     its agents sit.`
   - Insurance: `From first notice of loss to settlement — agents for carriers,
     brokers, and reinsurers at every step. Hover a role below to see where its
     agents sit.`
   - Logistics: `From quote to invoice — agents for carriers, 3PLs, brokers,
     forwarders, and shippers along the whole move. Hover a role below to see
     where its agents sit.`
2. **The pipeline** — the existing `figure.vs` (`.vs__bar` + `.vs__scroll` SVG),
   moved verbatim, no content change.
3. **Secondary head** — a lighter "who it's for" heading introducing the cards:
   a new `.section__subhead` block containing a mono eyebrow `Who it's for` and
   an `h3.h3` holding each page's existing segment headline (`Built for every
   banking desk.` / `Built for every side of the risk.` / `Built for every link
   in the chain.`). The old segment lede ("Hover a segment to see where its
   agents sit on the journey.") is **removed** — its message now lives in the
   primary lede, avoiding duplication.
4. **The cards** — the existing `.segs.segs--3` grid with its `.seg` cards
   (content unchanged, including `data-stages` and `--i` stagger).

The old `#segments` section wrapper is removed; its contents move inside the
merged section's single `.shell`.

### Reveal stagger

The pipeline (`figure.vs`) keeps `rv` with `style="--i:2"`. The secondary head
and cards keep their existing `rv` / `--i` values so the reveal cascade reads
top-to-bottom within the one section.

### Numbering

The merged section stays `02 / Value stream`. Renumber the downstream section
labels on all three pages:

- `04 / Featured` → `03 / Featured`
- `05 / Workflows` → `04 / Workflows`
- `06 / Next` → `05 / Next`

Section `id`s downstream (`#featured`, `#workflows`, `#cta`) are unchanged — only
the visible `.section__no` numbers change.

### CSS

Add to `src/style.css`:

1. **`.section__subhead`** — a compact secondary heading with top spacing to
   separate it from the pipeline (e.g. `margin-top: clamp(36px, 5vh, 60px)`),
   holding a mono eyebrow and an `h3`. Reuse existing tokens/`.mono`; match the
   type scale of the surrounding heads (the eyebrow like other mono eyebrows,
   the `h3` smaller than the section `h2`).
2. **Centered trailing row for `.segs`** — so logistics' 5-in-a-3-col grid
   lays out as a clean 3 + centered 2 instead of 3 + left-aligned 2 with a
   hole. Banking/insurance (exactly 3) are unaffected. Implementation approach:
   keep the 3-column desktop grid; make a trailing partial row center. Preferred
   technique is a `:nth-last-child`/`:first-child` rule set that horizontally
   centers a final row of 2 within the 3-column track (e.g. via `grid-column`
   offset on the 4th-of-5 card), scoped so it only triggers for a 5-card grid
   and only at the 3-column breakpoint. Must degrade correctly at the 2-column
   (`repeat(2, 1fr)`) and 1-column breakpoints, where no centering is needed.

No change to `industry.js`, the SVG markup, the hover classes (`.vs--dimmed`,
`.hot`), or the mobile swipe-strip behavior.

## Non-goals

- Not normalizing pipeline internals (logistics live stage stays `invoice`;
  chip placement per page unchanged).
- No reciprocal interaction (hovering a stage highlighting cards) — YAGNI.
- No content rewrites beyond the two lede edits and the removed segment lede.

## Error handling

Not applicable — static markup + CSS, no runtime logic added. The one JS
consumer (`industry.js`) is unchanged and already null-guarded.

## Testing / verification

- `npm run dev`; on each of the three pages confirm: one merged section numbered
  `02 / Value stream`; pipeline above, "Who it's for" cards below; hovering a
  card dims the pipeline and lights its stages (now visible in the same
  viewport); downstream sections read `03 / 04 / 05`.
- Logistics: the 5 segment cards render as a clean 3 + centered 2 at desktop
  width, and reflow correctly at the 2-column and 1-column breakpoints.
- Toggle `prefers-reduced-motion` and a narrow viewport: reveals resolve,
  pipeline is a swipeable strip, no horizontal page scroll.
- `npm run build` passes; grep confirms no dangling `#segments` reference.
