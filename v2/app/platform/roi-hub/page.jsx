import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';
import RoiHubHeroViz from '@/components/RoiHubHeroViz';

export const metadata = {
  title: 'ROI Hub',
  description:
    'The ROI Hub is the financial-justification surface of the FlowX.AI Observatory: it measures what production agents actually return, computes value across three reconciled dimensions, and grades every reported dollar by the strength of its evidence — Verified, Modeled or Assumed.',
};

/* The three measurement dimensions (VERA architecture). */
const DIMENSIONS = [
  { k: 'D1', name: 'Baseline', d: 'The intentionally simple floor: configured manual hours × role rate × run count. Cheap, deterministic, always present — the sanity check the other dimensions are reconciled against.' },
  { k: 'D2', name: 'Counterfactual estimator', d: 'Answers, for every run: how many human-hours would this specific output have taken? A usefulness gate admits the run, an estimator prices it, and calibration against your own labelled history keeps it conservative and unbiased in aggregate.' },
  { k: 'D3', name: 'Realized outcomes', d: 'A ledger of value that actually occurred: outcome contracts define what counts as a realized event, records link back to the originating run, and causal experiments (randomized holdouts) validate the effect. Only this dimension can produce Verified credit.' },
];

/* The confidence grades (one tier per unit of value). */
const GRADES = [
  { k: 'Verified', name: 'Backed by causal evidence', d: 'Value validated by a holdout experiment or a verified outcome record — and credited conservatively, at the lower bound of its confidence interval.' },
  { k: 'Modeled', name: 'Estimated, then calibrated', d: 'Per-run counterfactual estimates, corrected against your organization’s own labelled samples. Noisy per run, trustworthy in aggregate — and it never silently inflates.' },
  { k: 'Assumed', name: 'The declared floor', d: 'The flat baseline every ROI conversation starts from today. VERA keeps it visible — as the anchor the higher grades are reconciled against, not as the headline.' },
];

/* From graded ROI to decisions. */
const GOVERN = [
  ['Portfolio decisions', 'Net ROI and payback per agent feed a standing review: SCALE what earns, WATCH what’s unclear, FIX what leaks, KILL what doesn’t pay.'],
  ['Anti-gaming by design', 'An acceptance signal and a per-operation inclusion policy keep the measurement honest — an agent can’t farm credit for output nobody keeps.'],
  ['Self-correcting', 'Realized outcomes feed back to re-calibrate the estimator, so the modeled numbers converge on the verified truth instead of drifting from it.'],
];

export default function RoiHubPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="ahero" id="phero">
        <div className="shell ahero__grid">
          <div className="ahero__text">
            <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
              <span className="tick" aria-hidden="true" />
              Platform · ROI Hub
            </p>
            <h1 className="hero__title">
              <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">Every dollar, graded</span></span>
              <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>by its evidence<span className="amber">.</span></span>
            </h1>
            <p className="hero__sub rv-load" style={{ '--d': 3 }}>
              The ROI Hub is the Observatory&apos;s financial-justification surface. It measures what your
              production agents actually return — over the same run telemetry the platform already
              captures — and grades every reported dollar as Verified, Modeled or Assumed, so the number
              you take to the CFO carries its own audit trail.
            </p>
            <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
              <a className="btn btn--primary btn--lg" href="#dimensions">See how it grades</a>
              <a className="btn btn--ghost btn--lg" href={bp('/research/vera')}>Read the VERA paper</a>
            </div>
            <p className="astats mono rv-load" style={{ '--d': 5 }}>
              <span>verified · modeled · assumed — one tier per dollar</span>
            </p>
          </div>

          {/* Grading-ledger instrument: run-value entries tick into the ledger,
               the confidence engine stamps each with its tier, graded totals
               accumulate — and the Verified total lands amber, credited at the
               CI lower bound. Reduced motion → resolved pose. */}
          <RoiHubHeroViz className="ahero__viz" />
        </div>
      </section>

      {/* ================= THESIS ================= *//* editorial split: this thesis runs longer than the single punchy line
           the base treatment expects, so the claim reads across (left) against
           its evidence (right) instead of stacking into a heading-sized wall */}
      <section className="abd-thesis abd-thesis--split">
        <div className="shell">
          <span className="abd-thesis__kicker mono rv" style={{ '--i': 0 }}>The measurement thesis</span>
          <blockquote className="rv" style={{ '--i': 1 }}>The agent-ROI crisis is not a value crisis. It is a <span className="amber">measurement-credibility</span> crisis — and credibility is an engineering property of the measurement system, not a rhetorical one.</blockquote>
          <div className="abd-thesis__evidence">
            <p className="rv" style={{ '--i': 2 }}>95% of generative-AI pilots show no measurable P&amp;L impact — not because agents don&apos;t create
              value, but because flat assumptions and self-reported time savings are figures a finance function
              correctly declines to capitalize. The fix is the one financial accounting found a century ago:
              don&apos;t make every number certain — grade it, audit it, and recognize it under the right tier.</p>
            <span className="abd-thesis__tag mono rv" style={{ '--i': 3 }}>VERA · Verifiable, Evidence-Graded Return on Agents</span>
          </div>
        </div>
      </section>

      {/* ================= THREE DIMENSIONS ================= */}
      <section className="section" id="dimensions">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">01 / Three dimensions</span>
            <div className="section__headline">
              <h2 className="h2 rv">Three measurements, one reconciled number<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>The dimensions aren&apos;t alternatives — they&apos;re layers over one stream of agent-run telemetry, each visible, each feeding the confidence engine that decides how much value may be credited, and at what tier.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {DIMENSIONS.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONFIDENCE GRADES ================= */}
      <section className="section" id="grades">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">02 / Confidence grading</span>
            <div className="section__headline">
              <h2 className="h2 rv">Verified, Modeled, Assumed<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Borrowed from revenue recognition: a dollar backed by a randomized holdout is not the same asset as a dollar inferred from a model assumption — so each unit of value is counted under exactly one tier.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {GRADES.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
          <p className="abd-note mono rv">Read the research: <a className="amber" href={bp('/research/vera')}>VERA — Evidence-Graded ROI for Production Agents →</a></p>
        </div>
      </section>

      {/* ================= GOVERNANCE ================= */}
      <section className="section" id="decisions">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">03 / From number to decision</span>
            <div className="section__headline">
              <h2 className="h2 rv">Graded ROI becomes portfolio decisions<span className="amber">.</span></h2>
            </div>
          </div>
          <div className="segs segs--3">
            {GOVERN.map((p, i) => (
              <article key={p[0]} className="seg rv" style={{ '--i': i }}>
                <h3 className="seg__name">{p[0]}</h3>
                <p className="seg__desc" style={{ marginBottom: 0 }}>{p[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <canvas className="cta__canvas" aria-hidden="true" />
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span className="rv" style={{ '--i': 0 }}>Take a number the</span>
            <span className="rv" style={{ '--i': 1 }}>CFO will accept<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring one agent already in production — or one you&apos;re sizing. We&apos;ll show its return measured, graded and reconciled on the ROI Hub, evidence attached.</p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Size the payback first</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
