/**
 * Research card thumbnail — a title-driven, generated cover for the papers
 * list. The real PDF covers are portrait; cropped into the 16:9 card they lose
 * their title, so instead each card gets a purpose-built thumbnail: the paper
 * code set large in mono, an editorial header row (label + catalogue index),
 * and a small schematic figure keyed to the paper's thesis.
 *
 * The figures are one shared system — the same neutral schematic ink, dot
 * nodes, and thin strokes as the hero results-figure, with amber reserved for
 * the single "resolution" element in each (the fitted point, the promoted
 * node, the passed check). That amber element glows (CSS drop-shadow via
 * .rthumb__hot) so it reads as the moment the figure resolves. Every colour
 * routes through theme tokens, so the set flips with light/dark. No animation:
 * these are static and decorative.
 */

/* Shared drawing tokens so the seven figures read as a set. */
const NEUTRAL = 'var(--text-faint)';   // structural ink (axes, links)
const EMPHASIS = 'var(--text-dim)';    // the one line that carries the story
const AMBER = 'var(--amber-text)';     // the single resolution accent
const BAND = 'rgba(var(--ink), 0.05)'; // faint fills (confidence band, etc.)
const SW = 1.4;

const dot = (x, y, r = 2, fill = NEUTRAL) => <circle cx={x} cy={y} r={r} fill={fill} />;

// Each figure draws inside a 132×120 box, sitting in the right half of the card.
const MOTIFS = {
  // VERA — a results figure: axes with ticks, a confidence band, scattered
  // trials, a dashed baseline, a fitted curve, and the resolution landing
  // amber at the measured endpoint with a delta bracket.
  vera: (
    <>
      <path d="M22 16 V102 H122" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" />
      {[34, 58, 82].map((y) => <path key={y} d={`M19 ${y} H22`} stroke={NEUTRAL} strokeWidth={SW} />)}
      <path d="M28 84 C56 70 86 44 116 30 L116 42 C86 56 56 82 28 96 Z" fill={BAND} />
      <path d="M28 84 L118 52" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeDasharray="3 4" />
      <path d="M28 90 C56 64 86 42 116 28" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      {[[40, 80], [58, 64], [74, 55], [92, 42], [104, 38]].map(([x, y], i) => dot(x, y))}
      <circle className="rthumb__hot" cx={116} cy={28} r={3.4} fill={AMBER} />
      <path className="rthumb__hot" d="M123 28 V52 M120 28 H126 M120 52 H126" stroke={AMBER} strokeWidth={SW} />
    </>
  ),

  // ORNA — a recursive adaptation loop: a near-closed circular arrow through
  // observed nodes, the improved node landing amber.
  'orna-autotune': (
    <>
      <circle cx={68} cy={60} r={30} fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeDasharray="1.5 5" />
      <path d="M92 34 A38 38 0 1 1 42 33" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      <path d="M42 33 l-2 -10 M42 33 l9 -1" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      {dot(31, 74, 2.6)}
      {dot(68, 98, 2.6)}
      {dot(105, 74, 2.6)}
      <circle className="rthumb__hot" cx={68} cy={22} r={3.8} fill={AMBER} />
    </>
  ),

  // HALO — layered oversight: concentric containment rings around a protected
  // core, the core landing amber.
  halo: (
    <>
      <circle cx={68} cy={60} r={48} fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeDasharray="1.5 6" />
      <circle cx={68} cy={60} r={36} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <circle cx={68} cy={60} r={23} fill="none" stroke={EMPHASIS} strokeWidth={SW} />
      <circle className="rthumb__hot" cx={68} cy={60} r={9} fill="none" stroke={AMBER} strokeWidth={SW} />
      <circle className="rthumb__hot" cx={68} cy={60} r={3.4} fill={AMBER} />
    </>
  ),

  // GAVEL — governance chain: requirement → policy → evidence, the evidence
  // node carrying the amber "verified" check.
  gavel: (
    <>
      {[14, 54, 94].map((x, i) => (
        <rect key={i} x={x} y={46} width={24} height={28} rx={3.5} fill="none"
          stroke={i === 2 ? EMPHASIS : NEUTRAL} strokeWidth={SW} />
      ))}
      <path d="M40 60 H50 M42 60 l-4 -3 M42 60 l-4 3" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" transform="translate(6 0)" />
      <path d="M80 60 H90 M82 60 l-4 -3 M82 60 l-4 3" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" transform="translate(6 0)" />
      <path className="rthumb__hot" d="M100 60 l4.5 5 l7 -11" fill="none" stroke={AMBER} strokeWidth={SW + 0.4} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // SIFT — a classifier cascade: a stream of pages funnelled and sorted into
  // lanes, the promoted lane landing amber.
  sift: (
    <>
      {[34, 46, 58, 70, 82].map((y, i) => dot(18, y, 1.9))}
      <path d="M34 26 L74 50 L74 70 L34 94" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round" />
      <path d="M74 52 H108 M104 52 l4 -3 M104 52 l4 3" fill="none" stroke={AMBER} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" className="rthumb__hot" />
      <path d="M74 68 H100" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" />
      <circle className="rthumb__hot" cx={112} cy={52} r={3.4} fill={AMBER} />
      {dot(102, 68, 2.2)}
    </>
  ),

  // RAILS — a deterministic state machine: typed nodes across phases joined by
  // directed edges, one bounded node landing amber.
  rails: (
    <>
      <path d="M28 44 H46 M28 80 H46 M74 62 H92 M46 44 L74 60 M46 80 L74 64"
        fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect x={12} y={36} width={16} height={16} rx={3.5} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect x={12} y={72} width={16} height={16} rx={3.5} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect className="rthumb__hot" x={46} y={36} width={16} height={16} rx={3.5} fill={AMBER} />
      <rect x={46} y={72} width={16} height={16} rx={3.5} fill="none" stroke={EMPHASIS} strokeWidth={SW} />
      <rect x={92} y={54} width={16} height={16} rx={3.5} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
    </>
  ),

  // MNEMĒ — an active knowledge graph: linked concept nodes, the written-back
  // node staged in amber with a confidence ring.
  mneme: (
    <>
      <path d="M32 42 L66 28 M32 42 L44 80 M66 28 L102 46 M44 80 L90 88 M102 46 L90 88 M66 28 L44 80 M66 28 L44 80"
        fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      {dot(32, 42, 2.8)}
      {dot(66, 28, 2.8)}
      {dot(44, 80, 2.8)}
      {dot(102, 46, 2.8)}
      <circle className="rthumb__hot" cx={90} cy={88} r={6} fill="none" stroke={AMBER} strokeWidth={SW} strokeDasharray="2 3" />
      <circle className="rthumb__hot" cx={90} cy={88} r={3.4} fill={AMBER} />
    </>
  ),
};

export default function ResearchThumb({ slug, code, index }) {
  const motif = MOTIFS[slug];
  return (
    <div className="rthumb" aria-hidden="true">
      <div className="rthumb__head mono">
        <span>Technical paper</span>
        {index != null && <span className="rthumb__index">{String(index).padStart(2, '0')}</span>}
      </div>
      <span className="rthumb__code mono">{code}</span>
      {motif && (
        <svg className="rthumb__motif" viewBox="0 0 132 120" fill="none" role="presentation">
          {motif}
        </svg>
      )}
    </div>
  );
}
