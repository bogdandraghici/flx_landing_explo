import AgentCatalog from '@/components/AgentCatalog';
import CtaFieldInit from '@/components/CtaFieldInit';
import { bp } from '@/components/lib/base';
import { AGENTS } from '@/lib/agentsData';

export const metadata = {
  title: 'FlowX — AI Agents Catalog',
  description:
    'Browse 140+ enterprise-ready FlowX AI agents for banking, insurance and logistics. Filter by industry and deploy effort, search by outcome, and see the problem each agent solves, the KPIs it moves, and the agents it pairs with.',
};

export default function AiAgentsPage() {
  const total = AGENTS.length;
  const industries = [...new Set(AGENTS.map((a) => a.industry))];

  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Catalog · AI Agents</span>
            <div className="section__headline">
              <h1 className="h2 rv">{total} agents, ready for regulated work<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                A library of production-ready AI agents for {industries.join(', ')} — each one scoped to a
                real process. Filter by industry and deploy effort, search by the outcome you care about,
                and open any agent to see the problem it solves, the KPIs it moves, and what it pairs with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATALOG ================= */}
      <section className="section ac-section">
        <div className="shell">
          <AgentCatalog />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <canvas className="cta__canvas" aria-hidden="true" />
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span className="rv" style={{ '--i': 0 }}>Can&apos;t find your</span>
            <span className="rv" style={{ '--i': 1 }}>process<span className="amber">?</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>
            These are starting points, not a fixed menu. Bring your process and we&apos;ll scope the agent —
            or size the payback first with the ROI calculator.
          </p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=AI%20agents%20for%20our%20process">Talk to us</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
