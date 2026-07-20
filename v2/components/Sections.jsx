import { bp } from '@/components/lib/base';
/* Static content sections — ported markup styled by the copied v1 CSS. */

export function ComplianceMarquee() {
  const items = ['GDPR', 'EU AI ACT', 'DORA', 'SOC 2 TYPE II', 'ISO 27001', 'PSD2', 'BASEL III', 'MiFID II'];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track mono">
        {items.map((x) => (<span key={x}>{x}<i>·</i></span>))}
        {items.map((x) => (<span key={x + '2'}>{x}<i>·</i></span>))}
      </div>
    </div>
  );
}

const WHY = [
  ['The pilot works. Production never comes.', 'Demos run on laptops. Production needs rollout gates, rollback, and an owner on call.', 'Agents ship on rails — versioned, staged, and rolled back in one click.'],
  ['Compliance finds out last.', 'Risk teams meet the system after it’s built — then kill it, slowly and correctly.', 'The policy engine sits in the execution path, not in a PDF.'],
  ['Nobody can explain a decision six months later.', 'An auditor asks why a loan was declined in March. The logs shrug.', 'Every prompt, tool call and output is written to an immutable, hash-chained audit log.'],
  ['The model changes. Everything breaks.', 'Twelve months of prompt engineering welded to one vendor’s API.', 'A model-agnostic core — swap frontier or private models without re-platforming.'],
];

export function Why() {
  return (
    <section className="section" id="why">
      <div className="shell">
        <div className="why">
          <div className="why__left">
            <span className="section__no mono">Why 95% fail</span>
            <h2 className="h2 rv">Pilots don&apos;t die from bad&nbsp;models<span className="amber">.</span></h2>
            <p className="section__lede rv" style={{ '--i': 1 }}>They die from missing infrastructure — the unglamorous machinery between a promising demo and a system a regulator will sign off on. FlowX is that machinery.</p>
          </div>
          <ol className="why__list">
            {WHY.map(([h, p, fix], i) => (
              <li className="why__row rv" style={{ '--i': i }} key={h}>
                <span className="why__no mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="why__fail"><h3>{h}</h3><p>{p}</p></div>
                <p className="why__fix"><span className="mono amber">FLOWX →</span> {fix}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const OUTCOMES = [
  ['80%', 'of manual handoffs in lending flows automated for a European commercial bank.'],
  ['65%', 'reduction in processing time for underwriting at a global bank.'],
  ['$1.8M', 'projected annual savings for a global insurer after deploying an agent stack.'],
  ['62%', 'reduction in time-to-yes in an approval flow at a large financial institution.'],
  ['40%', 'lower operational cost for lending at a bank with 4M+ clients.'],
  ['8 wks', 'to build and launch a fund-management platform for an asset manager.'],
];

export function Outcomes() {
  return (
    <section className="section section--outcomes" id="outcomes">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Outcomes</span>
          <div className="section__headline">
            <h2 className="h2 rv">Real outcomes for regulated enterprises<span className="amber">.</span></h2>
            <p className="section__lede rv" style={{ '--i': 1 }}>95% of AI initiatives fail. FlowX.AI customers run mission-critical customer and operations journeys in production — and show the board real numbers.</p>
          </div>
        </div>
        <dl className="outcomes__grid">
          {OUTCOMES.map(([n, d], i) => (
            <div className="outcomes__card rv" style={{ '--i': i }} key={d}><dt className="mono">{n}</dt><dd>{d}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const AGENTS = [
  ['M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6', 'Banking', 'Retail Mortgage Underwriting', 'Nine agents for end-to-end checks: contract ↔ appraisal ↔ title, income & self-employed, debts, collateral, and final completeness.'],
  ['M6 3h9l3 3v15H6zM15 3v4h4M9 12h6M9 16h6', 'Banking', 'Commercial Onboarding', 'Seven agents for identity & UBO, signatory mandates, address checks, cross-doc consistency, and jurisdictional KYC.'],
  ['M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z', 'Insurance', 'Claims Processing', 'Six agents for FNOL & routing, doc completeness, policy and limits checks, damage estimation, and fraud signals.'],
  ['M3 7h11v10H3zM14 10h4l3 3v4h-7M7 20a2 2 0 100-4 2 2 0 000 4zM18 20a2 2 0 100-4 2 2 0 000 4z', 'Logistics', 'Invoice Reconciliation', 'Four agents to auto-create invoices, validate rates and taxes, reconcile payments, and surface real-time billing analytics.'],
];

export function Agents() {
  return (
    <section className="section section--agents" id="agents">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Agents</span>
          <div className="section__headline">
            <h2 className="h2 rv">Over 150 mission-critical agents, ready to deploy<span className="amber">.</span></h2>
            <a className="agents__all mono rv" style={{ '--i': 1 }} href={bp("/ai-agents")}>Explore all agents →</a>
          </div>
        </div>
        <div className="agents__grid">
          {AGENTS.map(([d, cat, title, desc], i) => (
            <article className="agents__card rv" style={{ '--i': i }} key={title}>
              <svg className="agents__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={d} /></svg>
              <span className="agents__cat mono">{cat}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  ['M13 2L4.5 13H11l-1 9 8.5-11H12z', 'Easy to deploy', 'Small teams deploy our agents and go live in weeks — while others are still planning.'],
  ['ellipse', 'Plugs into your data', 'Jack Henry, FIS, Finastra, Temenos, COBOL mainframe — we connect to any system you run.'],
  ['M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6zM9 12l2 2 4-4', 'Banking-grade safety', 'Centralized governance: audit trails, deterministic outputs, and zero hallucinations, built for regulators.'],
  ['rect', 'Impeccable data privacy', 'Data stays inside your perimeter. Agents run next to your systems, under your policies.'],
];

function PillarIcon({ d }) {
  if (d === 'ellipse') return (<svg className="pillars__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></svg>);
  if (d === 'rect') return (<svg className="pillars__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>);
  return (<svg className="pillars__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={d} /></svg>);
}

export function Foundations() {
  return (
    <section className="section section--pillars" id="foundations">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Foundations</span>
          <div className="section__headline">
            <h2 className="h2 rv">Built for mission-critical, regulated environments<span className="amber">.</span></h2>
          </div>
        </div>
        <div className="pillars__grid">
          {PILLARS.map(([d, title, desc], i) => (
            <div className="pillars__item rv" style={{ '--i': i }} key={title}>
              <PillarIcon d={d} /><h3>{title}</h3><p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUOTES = [
  ['To us, FlowX.AI is a business asset, not an IT asset. We’re shifting from technology that is a constraint to an enabler.', 'COO', 'Major Custodian Bank'],
  ['I have delivered more functionality in production with FlowX.AI in three months than in the rest of my career with the bank.', 'Solution Architect', 'European Bank'],
  ['Before FlowX.AI it took a year to launch a new product. Today we launch in 2–4 weeks. This would have been unthinkable.', 'Executive', 'Global Insurer'],
];

export function Testimonials() {
  return (
    <section className="section section--quotes" id="quotes">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Voices</span>
          <div className="section__headline">
            <h2 className="h2 rv">What financial leaders say<span className="amber">.</span></h2>
            <p className="section__lede rv" style={{ '--i': 1 }}>Trusted by global institutions.</p>
          </div>
        </div>
        <div className="quotes__grid">
          {QUOTES.map(([q, role, org], i) => (
            <figure className="quotes__card rv" style={{ '--i': i }} key={org}>
              <blockquote>{q}</blockquote>
              <figcaption><span className="quotes__role">{role}</span><span className="quotes__org mono">{org}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="section section--cta" id="cta">
      <div className="shell">
        <span className="section__no mono">Next</span>
        <h2 className="cta__title">
          <span className="rv" style={{ '--i': 0 }}>Stop piloting.</span>
          <span className="rv" style={{ '--i': 1 }}>Start deploying<span className="amber">.</span></span>
        </h2>
        <div className="cta__row rv" style={{ '--i': 2 }}>
          <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Architecture%20review">Book an architecture review</a>
          <a className="btn btn--ghost btn--lg" href="#blueprint">See a blueprint first</a>
        </div>
        <p className="cta__note mono rv" style={{ '--i': 3 }}>45 minutes · your stack · your security team welcome</p>
      </div>
    </section>
  );
}
