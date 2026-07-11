import RoiCalculator from '@/components/RoiCalculator';
import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'FlowX — Agent ROI Calculator',
  description:
    'Estimate the annual cost savings and FTE capacity a stack of FlowX AI agents frees for your business. Pick an industry and use case, set volume and FTE cost, choose agents — see the ROI.',
};

export default function RoiCalculatorPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Prove it · ROI</span>
            <div className="section__headline">
              <h1 className="h2 rv">Put a number on the agents<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Choose an industry and a use case, set your monthly volume and cost per FTE, then pick
                the agents you&apos;d deploy. The calculator values the time each one frees against a real
                baseline — no black box, every number is traceable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALCULATOR ================= */}
      <section className="section roi-section">
        <div className="shell">
          <RoiCalculator />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <canvas className="cta__canvas" aria-hidden="true" />
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span className="rv" style={{ '--i': 0 }}>Turn the estimate</span>
            <span className="rv" style={{ '--i': 1 }}>into a plan<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>
            Bring the numbers you just built. We&apos;ll map them to a phased rollout on your stack — and
            show you the audit trail behind every agent.
          </p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Agent%20ROI%20review">Book an ROI review</a>
            <a className="btn btn--ghost btn--lg" href="/agents">Browse the agent catalog</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
