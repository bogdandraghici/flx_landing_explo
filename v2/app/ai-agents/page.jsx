import AgentCatalog from '@/components/AgentCatalog';
import AgentsHeroViz from '@/components/AgentsHeroViz';
import CtaFieldInit from '@/components/CtaFieldInit';
import { bp } from '@/components/lib/base';
import { absUrl } from '@/components/lib/site';
import JsonLd from '@/components/JsonLd';
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'FlowX.AI AI agents catalog',
        description: `A catalog of ${total} production-ready AI agents for ${industries.join(', ')}.`,
        url: absUrl('/ai-agents'),
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: total,
          itemListElement: AGENTS.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.name })),
        },
      }} />
      {/* ================= HERO ================= */}
      <section className="ahero" id="phero">
        <div className="shell ahero__grid">
          <div className="ahero__text">
            <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
              <span className="tick" aria-hidden="true" />
              Catalog · AI Agents
            </p>
            <h1 className="hero__title">
              <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">{total} agents, ready</span></span>
              <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>for regulated work<span className="amber">.</span></span>
            </h1>
            <p className="hero__sub rv-load" style={{ '--d': 3 }}>
              A library of production-ready AI agents for {industries.join(', ')} — each one scoped to a
              real process. Filter by industry and deploy effort, search by outcome, and see what each
              agent solves, the KPIs it moves, and what it pairs with.
            </p>
            <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
              <a className="btn btn--primary btn--lg" href="#catalog">Browse the catalog</a>
              <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
            </div>
            <p className="astats mono rv-load" style={{ '--d': 5 }}>
              <span>pick a set · they work together</span>
            </p>
          </div>

          {/* Sector radar: three calibration rings hold the catalog's three
               sectors; a sweep line rotates and each agent blip flares amber
               the instant it's detected, then fades. Reduced motion → sweep
               parked mid-scan. */}
          <AgentsHeroViz className="ahero__viz" />
        </div>
      </section>

      {/* ================= CATALOG ================= */}
      <section className="section ac-section" id="catalog">
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
