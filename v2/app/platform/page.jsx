import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'Platform Overview',
  description:
    'What the FlowX.AI platform is, in plain terms: one place to design, run, integrate and govern AI-driven customer and operations journeys — on top of the core systems you already have.',
};

const BLOCKS = [
  { k: 'Design', name: 'Design studio', d: 'Draw journeys, screens, data and integrations on one visual canvas — business and engineering together, without piles of glue code.' },
  { k: 'Run', name: 'Journey engine', d: 'Executes your business processes and coordinates people, systems and data in real time, so a journey behaves the same way every time it runs.' },
  { k: 'Connect', name: 'Integration layer', d: 'Plugs into the systems you already run — mainframes, Temenos, FIS, databases, cloud services — through ready-made connectors and APIs. No rip-and-replace.' },
  { k: 'Experience', name: 'Web & mobile apps', d: 'Renders responsive web and mobile experiences from the same definitions, updated live — one build, every channel.' },
  { k: 'Intelligence', name: 'AI & agents', d: 'Build and run AI agents that decide and assist — placed as bounded, observable steps inside the flow, never an unaccountable black box.' },
  { k: 'Trust', name: 'Security & governance', d: 'Role-based access, workspace isolation for large organizations, and a full audit trail across everything — built for regulated work.' },
];

const PROOF = [
  ['Wraps, not replaces', 'Modernize on top of legacy cores instead of a multi-year rip-and-replace.'],
  ['Enterprise scale', 'Event-driven and Kubernetes-native — thousands of concurrent journeys.'],
  ['Multi-tenant', 'Complete workspace isolation for large, multi-brand organizations.'],
  ['Auditable by design', 'OAuth2, fine-grained permissions and comprehensive audit trails throughout.'],
];

export default function PlatformOverview() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Platform · Overview</span>
            <div className="section__headline">
              <h1 className="h2 rv">One platform to put AI to work — on the systems you already run<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Most vendors hand you a tool and leave the hard parts to you. FlowX.AI is the whole
                environment — design, run, integrate and govern — so a regulated customer or operations
                journey goes from idea to production in weeks, without replacing your core and without a
                pile of custom glue code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT IT MEANS ================= */}
      <section className="abd-thesis">
        <div className="shell">
          <blockquote className="rv">A &ldquo;platform&rdquo; isn&apos;t one feature. It&apos;s everything a journey needs — the canvas, the engine, the connections, the experience, the intelligence and the controls — in <span className="amber">one place</span>.</blockquote>
          <p className="rv" style={{ '--i': 1 }}>That&apos;s the difference between a demo that works once and software that runs a bank&apos;s
            lending, a insurer&apos;s claims, or a carrier&apos;s operations every day. The AI model sits inside as one
            bounded, observed step — so what you ship is reliable and explainable, not a black box you hope behaves.</p>
        </div>
      </section>

      {/* ================= BUILDING BLOCKS ================= */}
      <section className="section" id="building-blocks">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">01 / Building blocks</span>
            <div className="section__headline">
              <h2 className="h2 rv">What&apos;s inside the platform<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Six parts that work as one. You don&apos;t have to adopt them all at once — most teams start with one journey and grow.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {BLOCKS.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY IT HOLDS UP ================= */}
      <section className="section" id="why">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">02 / In the enterprise</span>
            <div className="section__headline">
              <h2 className="h2 rv">Why it holds up under real scrutiny<span className="amber">.</span></h2>
            </div>
          </div>
          <div className="segs">
            {PROOF.map((p, i) => (
              <article key={p[0]} className="seg rv" style={{ '--i': i % 3 }}>
                <h3 className="seg__name">{p[0]}</h3>
                <p className="seg__desc" style={{ marginBottom: 0 }}>{p[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE ================= */}
      <section className="section" id="explore">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">03 / Go deeper</span>
            <div className="section__headline">
              <h2 className="h2 rv">Explore the pieces<span className="amber">.</span></h2>
            </div>
          </div>
          <div className="segs segs--3">
            <a className="seg rv" href={bp('/agent-builder')} style={{ '--i': 0 }}>
              <h3 className="seg__name">Agent Builder →</h3>
              <p className="seg__desc" style={{ marginBottom: 0 }}>Design agents as typed nodes and edges that compile to a deterministic state machine.</p>
            </a>
            <a className="seg rv" href={bp('/observatory')} style={{ '--i': 1 }}>
              <h3 className="seg__name">Observatory →</h3>
              <p className="seg__desc" style={{ marginBottom: 0 }}>Trace and audit every agent decision in production.</p>
            </a>
            <a className="seg rv" href={bp('/ai-agents')} style={{ '--i': 2 }}>
              <h3 className="seg__name">AI agents catalog →</h3>
              <p className="seg__desc" style={{ marginBottom: 0 }}>140+ production-ready agents for banking, insurance and logistics.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <canvas className="cta__canvas" aria-hidden="true" />
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span className="rv" style={{ '--i': 0 }}>See it on your</span>
            <span className="rv" style={{ '--i': 1 }}>own core<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring one regulated journey. We&apos;ll show you the platform running it — design, integration and audit trail — on your stack.</p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=FlowX%20platform%20demo">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
