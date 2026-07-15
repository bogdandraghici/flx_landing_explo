/**
 * Research card thumbnail — a title-driven, generated cover for the papers
 * list. The real PDF covers are portrait; cropped into the 16:9 card they lose
 * their title, so instead each card gets a purpose-built thumbnail: the paper
 * code set large in mono, a "technical paper" label, and a small schematic
 * motif keyed to the paper's thesis.
 *
 * The motifs are one shared system — the same neutral schematic ink, dot
 * nodes, and thin strokes as the hero figure, with amber reserved for the
 * single "resolution" element in each (the fitted point, the promoted node,
 * the passed check). No animation: these are static, decorative, and honour
 * the theme tokens so they flip with light/dark.
 */

/* Shared drawing tokens so the seven motifs read as a set. */
const NEUTRAL = 'var(--text-faint)';
const EMPHASIS = 'var(--text-dim)';
const AMBER = 'var(--amber-text)';
const SW = 1.4;

// Each motif draws inside a 132×120 box, sitting in the right half of the card.
const MOTIFS = {
  // VERA — a results figure: axes, scattered trials, dashed baseline, a fitted
  // curve, and the resolution landing amber at the measured endpoint.
  vera: (
    <>
      <path d="M22 18 V102 H120" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" />
      <path d="M28 84 L118 52" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeDasharray="3 4" />
      <path d="M28 92 C56 66 86 44 116 30" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      {[[40, 82], [58, 66], [74, 58], [92, 44], [104, 40]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill={NEUTRAL} />
      ))}
      <circle cx={116} cy={30} r={3.4} fill={AMBER} />
      <path d="M122 30 V52" stroke={AMBER} strokeWidth={SW} />
      <path d="M119 30 H125 M119 52 H125" stroke={AMBER} strokeWidth={SW} />
    </>
  ),

  // ORNA — a recursive adaptation loop: a near-closed circular arrow with
  // nodes, the improved node landing amber.
  'orna-autotune': (
    <>
      <path d="M96 34 A38 38 0 1 1 40 34" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      <path d="M40 34 l-6 -7 M40 34 l8 -3" fill="none" stroke={EMPHASIS} strokeWidth={SW} strokeLinecap="round" />
      <circle cx={30} cy={70} r={2.6} fill={NEUTRAL} />
      <circle cx={68} cy={106} r={2.6} fill={NEUTRAL} />
      <circle cx={106} cy={70} r={2.6} fill={NEUTRAL} />
      <circle cx={68} cy={34} r={3.6} fill={AMBER} />
    </>
  ),

  // HALO — layered oversight: concentric containment rings around a protected
  // core, the core landing amber.
  halo: (
    <>
      <circle cx={68} cy={60} r={46} fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeDasharray="2 5" />
      <circle cx={68} cy={60} r={33} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <circle cx={68} cy={60} r={20} fill="none" stroke={EMPHASIS} strokeWidth={SW} />
      <circle cx={68} cy={60} r={6.5} fill={AMBER} />
    </>
  ),

  // GAVEL — governance chain: requirement → policy → evidence, the evidence
  // node carrying the amber "verified" check.
  gavel: (
    <>
      {[16, 54, 92].map((x, i) => (
        <rect key={i} x={x} y={46} width={24} height={28} rx={3} fill="none"
          stroke={i === 2 ? EMPHASIS : NEUTRAL} strokeWidth={SW} />
      ))}
      <path d="M40 60 H54 M78 60 H92" fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <path d="M46 57 l3 3 M78 57 l-3 3 M46 63 l3 -3 M78 63 l-3 -3" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" />
      <path d="M97 60 l4 5 l7 -10" fill="none" stroke={AMBER} strokeWidth={SW + 0.3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // SIFT — a classifier cascade: a stream of pages funnelled and sorted into
  // lanes, the promoted lane landing amber.
  sift: (
    <>
      {[30, 40, 50, 60].map((y, i) => (
        <circle key={i} cx={20} cy={y} r={2} fill={NEUTRAL} />
      ))}
      <path d="M32 24 L70 44 L70 76 L32 96" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M70 52 H112" fill="none" stroke={AMBER} strokeWidth={SW} strokeLinecap="round" />
      <path d="M70 68 H100" fill="none" stroke={NEUTRAL} strokeWidth={SW} strokeLinecap="round" />
      <circle cx={112} cy={52} r={3.4} fill={AMBER} />
      <circle cx={100} cy={68} r={2.4} fill={NEUTRAL} />
    </>
  ),

  // RAILS — a deterministic state machine: typed nodes across phases joined by
  // edges, one bounded node landing amber.
  rails: (
    <>
      <path d="M24 42 H48 M24 78 H48 M72 60 H96 M48 42 L72 58 M48 78 L72 62" fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect x={10} y={34} width={16} height={16} rx={3} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect x={10} y={70} width={16} height={16} rx={3} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <rect x={46} y={34} width={16} height={16} rx={3} fill={AMBER} />
      <rect x={46} y={70} width={16} height={16} rx={3} fill="none" stroke={EMPHASIS} strokeWidth={SW} />
      <rect x={94} y={52} width={16} height={16} rx={3} fill="none" stroke={NEUTRAL} strokeWidth={SW} />
    </>
  ),

  // MNEMĒ — an active knowledge graph: linked concept nodes, the written-back
  // node staged in amber with a confidence ring.
  mneme: (
    <>
      <path d="M34 40 L70 30 M34 40 L44 78 M70 30 L104 48 M44 78 L88 88 M104 48 L88 88 M70 30 L44 78"
        fill="none" stroke={NEUTRAL} strokeWidth={SW} />
      <circle cx={34} cy={40} r={2.8} fill={NEUTRAL} />
      <circle cx={70} cy={30} r={2.8} fill={NEUTRAL} />
      <circle cx={44} cy={78} r={2.8} fill={NEUTRAL} />
      <circle cx={104} cy={48} r={2.8} fill={NEUTRAL} />
      <circle cx={88} cy={88} r={5} fill="none" stroke={AMBER} strokeWidth={SW} strokeDasharray="2 3" />
      <circle cx={88} cy={88} r={3.2} fill={AMBER} />
    </>
  ),
};

export default function ResearchThumb({ slug, code }) {
  const motif = MOTIFS[slug];
  return (
    <div className="rthumb" aria-hidden="true">
      <span className="rthumb__label mono">Technical paper</span>
      <span className="rthumb__code mono">{code}</span>
      {motif && (
        <svg className="rthumb__motif" viewBox="0 0 132 120" fill="none" role="presentation">
          {motif}
        </svg>
      )}
    </div>
  );
}
