import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'Ontology Layer',
  description:
    'The FlowX.AI Ontology Layer is one shared model of how your business is organized — the connective structure agents reason over, and, uniquely, memory they can safely improve with every run.',
};

const KINDS = [
  { k: 'Documents', name: 'What things say', d: 'Policies, contracts and manuals, searched by meaning. Great for “what does this say?”, but blind to how anything relates.' },
  { k: 'Live data', name: 'What’s true now', d: 'Balances, statuses and records from your core systems — the authoritative current state of the business.' },
  { k: 'Ontology', name: 'How it all fits', d: 'The shared map: what a Mortgage is, that it’s a Secured Loan, what that requires. The structure that lets agents reason across the rest — and explain the path they took.' },
];

const ACTIVE = [
  { k: 'Provenance', name: 'Every fact carries its pedigree', d: 'Each concept and relationship records where it came from — imported from your systems, proposed by an agent, or entered by a person — and how confident we are in it.' },
  { k: 'Safe write-back', name: 'Agents improve it — safely', d: 'When an agent learns something the map lacks, it’s staged below a confidence bar, screened for conflicts, and kept out of live answers until it’s corroborated across runs or approved by a person.' },
  { k: 'Protected', name: 'Your source of truth stays read-only', d: 'Authoritative facts are imported one-way and can’t be altered by agents — so a mistake can never rewrite the record. You get memory that gets richer with use, with the safety of a read-only system.' },
];

const WHY = [
  ['Explainable answers', 'Agents don’t just return a similar passage — they follow the connected concepts and can show the path.'],
  ['Memory that improves', 'The knowledge grows every run, instead of decaying until a human gets around to editing it.'],
  ['Safe in regulated work', 'New knowledge is quarantined until verified, so a hallucination can never reach the canonical record.'],
];

export default function OntologyPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Platform · Ontology Layer</span>
            <div className="section__headline">
              <h1 className="h2 rv">One shared model of your business<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                The Ontology Layer is the map of how your world is organized — your products, rules and risk
                hierarchies, and how they relate. It&apos;s the structure agents reason over to give connected,
                explainable answers. And unlike everyone else&apos;s, it&apos;s memory the agents can safely help build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THESIS ================= */}
      <section className="abd-thesis">
        <div className="shell">
          <blockquote className="rv">Most platforms make the ontology a read-only reference a human team maintains. FlowX makes it <span className="amber">active memory</span> the agents help build — and makes every write safe.</blockquote>
          <p className="rv" style={{ '--i': 1 }}>The agent that just resolved an ambiguous entity or discovered a relationship is the one best placed to enrich the map. So it does — but every contribution is stamped with where it came from, screened for conflicts, and quarantined until it earns its place. The institutional memory improves from use, with the blast radius of a read-only system.</p>
        </div>
      </section>

      {/* ================= THREE KINDS ================= */}
      <section className="section" id="kinds">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">01 / The three kinds of memory</span>
            <div className="section__headline">
              <h2 className="h2 rv">Where the ontology sits<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Agents draw on three different stores. The ontology is the connective tissue between them.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {KINDS.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACTIVE MEMORY ================= */}
      <section className="section" id="active-memory">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">02 / Active, governed memory</span>
            <div className="section__headline">
              <h2 className="h2 rv">Memory that improves, safely<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>What makes the FlowX ontology different from the read-only knowledge graphs the rest of the market ships.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {ACTIVE.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
          <p className="abd-note mono rv">Read the research: <a className="amber" href={bp('/research/mneme')}>MNEMĒ — a knowledge graph agents can write to, safely →</a></p>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="section" id="why">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">03 / Why it matters</span>
            <div className="section__headline">
              <h2 className="h2 rv">Connected, explainable, current<span className="amber">.</span></h2>
            </div>
          </div>
          <div className="segs segs--3">
            {WHY.map((p, i) => (
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
            <span className="rv" style={{ '--i': 0 }}>Model your</span>
            <span className="rv" style={{ '--i': 1 }}>business<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring your products, rules and terminology. We&apos;ll stand up the ontology and show agents reasoning over it — with every fact traceable.</p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=FlowX%20Ontology%20Layer">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/platform')}>Platform overview</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
