import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';
import IntegrationsHeroViz from '@/components/IntegrationsHeroViz';

export const metadata = {
  title: 'Integrations & Connectors',
  description:
    'How FlowX.AI connects to the systems you already run — core banking, databases, REST APIs, files, email, AI tools and webhooks — so they work together inside your journeys, without a rip-and-replace.',
};

const CONNECTS = [
  { k: 'Core & legacy', name: 'Core and legacy systems', d: 'Mainframes, Temenos, FIS, Finastra, custom in-house apps and RPA tools — the systems of record you can’t (and shouldn’t) replace.' },
  { k: 'Data', name: 'Databases', d: 'Read from and write to your internal data stores and the FlowX data layer, so a journey always works from current data.' },
  { k: 'APIs', name: 'REST APIs & web services', d: 'Exchange data with modern internal and third-party services over standard REST — the common language of today’s systems.' },
  { k: 'Files', name: 'File storage', d: 'Move and process files across FTP, SFTP, Amazon S3 and Azure Blob — statements, documents, batch feeds.' },
  { k: 'Comms', name: 'Email & messaging', d: 'Send and receive email (Outlook, SMTP), monitor mailboxes, and drive multi-channel notifications from inside a flow.' },
  { k: 'AI', name: 'AI tools & knowledge (MCP)', d: 'Give agents access to external tools and business knowledge bases through the Model Context Protocol — grounded, useful AI.' },
];

const HOW = [
  { mode: 'No-code', name: 'Integration Designer', d: 'A visual, no-code canvas to connect most systems and shape the data — no custom development, so business and delivery teams move fast together.' },
  { mode: 'Pro-code', name: 'Custom connectors', d: 'For specialized legacy systems or bespoke logic, event-driven (Kafka) microservices give you full control where you need it.' },
];

const PROOF = [
  ['No rip-and-replace', 'Keep the systems that already run the business; wrap them instead of migrating.'],
  ['Faster to production', 'Visual, reusable integrations cut integration work from quarters to weeks.'],
  ['Governed & secure', 'Every call runs through the platform’s access controls and audit trail.'],
];

export default function IntegrationsPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="ahero" id="phero">
        <div className="shell ahero__grid">
          <div className="ahero__text">
            <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
              <span className="tick" aria-hidden="true" />
              Platform · Integrations
            </p>
            <h1 className="hero__title">
              <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">Connect the systems</span></span>
              <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>you already run<span className="amber">.</span></span>
            </h1>
            <p className="hero__sub rv-load" style={{ '--d': 3 }}>
              Integrations are how FlowX.AI plugs into your existing estate — core banking, databases, APIs,
              files, email and AI tools — so they work together inside a single journey. Nothing gets
              ripped out; your systems of record keep doing what they do, while new experiences run on top.
            </p>
            <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
              <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href="#connects">What it connects to</a>
            </div>
            <p className="astats mono rv-load" style={{ '--d': 5 }}>
              <span>six system types · one journey · no rip-and-replace</span>
            </p>
          </div>

          {/* Node graph (Hero Illustrations 1a): the systems you already run sit
               as peers around a central FlowX hub, each wired in by a bowed edge
               with a packet riding inward — the estate flowing together into one
               journey. Neutral schematic ink for the estate; brand amber only on
               the hub (the resolution everything converges into). Theme-aware via
               tokens; reduced-motion freezes on the resolved pose. */}
          <IntegrationsHeroViz className="ahero__viz" />
        </div>
      </section>

      {/* ================= THESIS ================= *//* editorial split, staggered claim (matches the ROI hub / observatory /
           ontology theses): dim negation setup → big amber payoff ("work
           together") → short "in real time" coda; evidence in the
           hairline-divided right column (no framework tag on this thesis) */}
      <section className="abd-thesis abd-thesis--split" style={{ '--payoff-measure': '20ch' }}>
        <div className="shell">
          <span className="abd-thesis__kicker mono rv" style={{ '--i': 0 }}>The integration thesis</span>
          <blockquote className="abd-thesis__claim rv" style={{ '--i': 1 }}>
            <span className="abd-thesis__setup">Integration isn&apos;t a migration.</span>
            <span className="abd-thesis__payoff">It&apos;s making what you already own <span className="amber">work together</span>.</span>
            <span className="abd-thesis__qualifier">Inside the flow, in real time.</span>
          </blockquote>
          <div className="abd-thesis__evidence">
            <p className="rv" style={{ '--i': 2 }}>A lending decision might read a mainframe, call a bureau API, pull a document from S3, run an AI check and write back to the core — as one governed journey. The customer sees a single, modern experience; nothing behind the glass had to be replaced.</p>
          </div>
        </div>
      </section>

      {/* ================= WHAT IT CONNECTS TO ================= */}
      <section className="section" id="connects">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">01 / What it connects to</span>
            <div className="section__headline">
              <h2 className="h2 rv">One journey, every system<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>From decades-old cores to the newest AI tools — the same journey can reach them all.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {CONNECTS.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="section" id="how">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">02 / How it works</span>
            <div className="section__headline">
              <h2 className="h2 rv">Two ways to connect<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Most connections are point-and-click. When something needs bespoke handling, you drop down to code — only where you need it.</p>
            </div>
          </div>
          <div className="abd-ways">
            {HOW.map((b, i) => (
              <article key={b.name} className="abd-ways__panel rv" style={{ '--i': i }}>
                <div className="abd-ways__hd">
                  <span className="abd-ways__idx mono">{`0${i + 1}`}</span>
                  <span className="abd-ways__mode mono">{b.mode}</span>
                </div>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc" style={{ margin: '12px 0 0' }}>{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROOF ================= */}
      <section className="section" id="why">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">03 / Why it matters</span>
            <div className="section__headline">
              <h2 className="h2 rv">Modernize without the risk<span className="amber">.</span></h2>
            </div>
          </div>
          <ul className="abd-assure">
            {PROOF.map((p, i) => (
              <li key={p[0]} className="abd-assure__item rv" style={{ '--i': i }}>
                <span className="abd-assure__tick" aria-hidden="true" />
                <h3 className="abd-assure__name">{p[0]}</h3>
                <p className="abd-assure__desc">{p[1]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <canvas className="cta__canvas" aria-hidden="true" />
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span className="rv" style={{ '--i': 0 }}>Map it to your</span>
            <span className="rv" style={{ '--i': 1 }}>stack<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Tell us what you run. We&apos;ll show the connectors and a journey wired end-to-end across them — on your systems.</p>
          <div className="cta__row rv" style={{ '--i': 3 }}>
            <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/platform')}>Platform overview</a>
          </div>
        </div>
      </section>
      <CtaFieldInit />
    </main>
  );
}
