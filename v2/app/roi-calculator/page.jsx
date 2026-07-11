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

      {/* ================= METHODOLOGY ================= */}
      <section className="section roi-method" id="how-calculated">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Methodology</span>
            <div className="section__headline">
              <h2 className="h2 rv">How this number is calculated<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                No black box. The estimate is a straight labor-cost-avoidance model — every figure comes
                from four inputs you control. Here is the full chain, and exactly what it does and
                doesn&apos;t claim.
              </p>
            </div>
          </div>

          <div className="roi-method__grid">
            <ol className="roi-method__steps">
              <li className="roi-method__step">
                <div>
                  <h3>Price an hour of your team&apos;s time</h3>
                  <p>Your fully-loaded annual cost per FTE, divided by a working year.</p>
                  <code className="roi-method__formula">hourlyCost = costPerFTE / 1,800 hrs</code>
                </div>
              </li>
              <li className="roi-method__step">
                <div>
                  <h3>Add up the minutes each agent removes</h3>
                  <p>Every agent has a fixed &ldquo;minutes saved per process run&rdquo;. We sum that across the
                    agents you selected, then keep only the share your <em>automation rate</em> says is
                    genuinely removed — the rest stays with a human for review and exceptions.</p>
                  <code className="roi-method__formula">savedMin/run = Σ(agent minutes) × automationRate</code>
                </div>
              </li>
              <li className="roi-method__step">
                <div>
                  <h3>Scale by how often the process runs</h3>
                  <p>Monthly volume, annualized, turns time-per-run into money-per-year.</p>
                  <code className="roi-method__formula">gross = monthlyVolume × 12 × (savedMin/run / 60) × hourlyCost</code>
                </div>
              </li>
              <li className="roi-method__step">
                <div>
                  <h3>Net it against investment (optional)</h3>
                  <p>Enter an estimated annual platform + rollout cost to see savings net of investment,
                    plus a first-year return multiple.</p>
                  <code className="roi-method__formula">net = gross − platformCost   ·   ROI× = gross / platformCost</code>
                </div>
              </li>
            </ol>

            <aside className="roi-method__aside">
              <h3>Assumptions</h3>
              <ul className="roi-method__list">
                <li><strong>1,800 working hours</strong> per FTE per year (after leave &amp; overhead).</li>
                <li><strong>Automation rate</strong> defaults to 75% — the residual is human review, exceptions and QA.</li>
                <li><strong>Agent times are additive</strong> and assume the process actually runs at your stated volume.</li>
                <li><strong>Currency is converted</strong> at static, approximate rates — indicative, not live FX.</li>
              </ul>
              <h3>What it means — and doesn&apos;t</h3>
              <ul className="roi-method__list">
                <li>Savings measure <strong>capacity freed</strong> (time × labor rate), not cash already booked.</li>
                <li>The value is realized only if that capacity is <strong>redeployed or reduced</strong>.</li>
                <li>It&apos;s <strong>before</strong> integration, change-management and model-running effort unless you add a platform cost.</li>
              </ul>
              <p className="roi-method__honest">
                Treat the headline as a directional, best-case estimate for framing a business case — not a
                committed forecast. A real number comes out of a scoped assessment on your data and processes.
              </p>
            </aside>
          </div>
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
