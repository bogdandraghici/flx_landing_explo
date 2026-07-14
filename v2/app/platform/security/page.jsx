import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'Security & Compliance',
  description:
    'Compliance built into the platform, not bolted on: six pre-built regulatory frameworks, automatic evidence collection, full audit trail, RBAC, PII redaction and EU data residency — purpose-built for regulated work.',
};

/* Six regulatory frameworks that ship pre-mapped in the governance engine. */
const FRAMEWORKS = [
  ['EU AI Act', 'Risk-based regulation for AI systems'],
  ['GDPR', 'Data privacy & protection'],
  ['HIPAA', 'Healthcare data protection'],
  ['SOC 2', 'Security, availability, confidentiality'],
  ['PCI-DSS', 'Payment card data security'],
  ['ISO 27001', 'Information security management'],
];

/* The security & governance controls, as building blocks. */
const CONTROLS = [
  { k: 'Access', name: 'Authentication & SSO', d: 'OAuth2 / Keycloak and Azure AD, with bearer-token validation on every endpoint and UUID API keys for SDK access. One identity model across the platform.' },
  { k: 'Roles', name: 'Role-based access control', d: 'Fine-grained RBAC scoped to the organization — Admin, Compliance Officer, ML Engineer, Viewer — with complete workspace isolation for multi-brand enterprises.' },
  { k: 'Trace', name: 'Comprehensive audit trail', d: 'Every significant action logged with actor, resource, IP and timestamp: policy changes, evidence approvals, role edits, framework seeds. Nothing happens off the record.' },
  { k: 'Privacy', name: 'PII detection & redaction', d: 'Sensitive data identified and masked in agent context, outputs and RAG knowledge bases via NER across 100+ languages — before it ever reaches a log or a model.' },
  { k: 'Runtime', name: 'Adversarial defense', d: 'Prompt Shield blocks injection attempts before they reach the LLM; LLM-Guard runtime checks and sandboxed code execution keep agent behavior inside its lane.' },
  { k: 'Govern', name: 'Continuous governance loop', d: 'Policies evaluate live AI data, evidence is collected automatically, and compliance status stays current — Define → Assign → Evaluate → Collect → Report, on repeat.' },
];

/* EU AI Act article crosswalk — requirement mapped to the FlowX capability. */
const CROSSWALK = [
  ['Art. 9', 'Risk management system across the lifecycle', 'Online monitoring, custom evaluators, alert thresholds'],
  ['Art. 10', 'Data governance & bias prevention', 'PII detection + redaction, bias evaluators, policy engine'],
  ['Art. 12', 'Automatic event logging over the system’s lifetime', 'End-to-end tracing with configurable retention'],
  ['Art. 13', 'Transparency & interpretable outputs', 'Full execution traces and visual workflow graphs'],
  ['Art. 14', 'Human oversight & intervention', 'Pause nodes, annotation queues, decision routing'],
  ['Art. 15', 'Accuracy metrics & adversarial resilience', '13-metric LLM-as-Judge + adversarial evaluators'],
  ['Art. 72', 'Post-market monitoring', 'Statistical drift detection with real-time alerting'],
  ['GDPR Art. 32', 'Technical measures for data protection', 'PII redaction, encryption, RBAC, audit logging'],
];

const DEPLOY = [
  ['EU data residency', 'Managed cloud that keeps every trace and record in-jurisdiction.'],
  ['Bring your own cloud', 'The full stack in your own Kubernetes cluster or cloud region.'],
  ['Self-hosted', 'Runs entirely inside your perimeter — your data never leaves it.'],
];

export default function SecurityPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Platform · Security &amp; Compliance</span>
            <div className="section__headline">
              <h1 className="h2 rv">Built for regulated work<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                In banking, insurance and healthcare, an AI system has to prove it behaves. FlowX.AI
                wires governance directly into live AI data — so policies evaluate real performance,
                evidence is gathered automatically, and you walk into an audit with the record already
                built, not scrambling to reconstruct it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THESIS ================= */}
      <section className="abd-thesis">
        <div className="shell">
          <blockquote className="rv">Most vendors treat compliance as a second thought — a spreadsheet you fill in after the fact. FlowX makes it <span className="amber">built in</span>: the same platform that runs your agents proves they were safe.</blockquote>
          <p className="rv" style={{ '--i': 1 }}>Every agent decision is traced, every policy is checked against what actually happened, and every artifact an auditor asks for is collected as the system runs. That&apos;s the difference between compliance posture on paper and evidence you can hand over on the day.</p>
        </div>
      </section>

      {/* ================= FRAMEWORKS ================= */}
      <section className="section" id="frameworks">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">01 / Regulatory frameworks</span>
            <div className="section__headline">
              <h2 className="h2 rv">Six frameworks, out of the box<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Each ships broken down into requirements, with the evidence needed and suggested assessments pre-mapped. Your policies, evidence and assessments auto-map to the right requirement — and you can add your own frameworks.</p>
            </div>
          </div>
          <div className="sec-fw">
            {FRAMEWORKS.map((f, i) => (
              <article key={f[0]} className="sec-fw__item rv" style={{ '--i': i % 3 }}>
                <h3 className="sec-fw__name">{f[0]}</h3>
                <p className="sec-fw__desc">{f[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTROLS ================= */}
      <section className="section" id="controls">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">02 / Controls</span>
            <div className="section__headline">
              <h2 className="h2 rv">The controls underneath<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>Enterprise-grade access, privacy and governance — applied uniformly across every agent, workspace and journey.</p>
            </div>
          </div>
          <div className="segs segs--3">
            {CONTROLS.map((b, i) => (
              <article key={b.name} className="seg rv" style={{ '--i': i % 3 }}>
                <span className="seg__no mono abd-k">{b.k}</span>
                <h3 className="seg__name">{b.name}</h3>
                <p className="seg__desc">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EU AI ACT CROSSWALK ================= */}
      <section className="section" id="eu-ai-act">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">03 / EU AI Act</span>
            <div className="section__headline">
              <h2 className="h2 rv">Mapped to the Act, article by article<span className="amber">.</span></h2>
              <p className="section__lede rv" style={{ '--i': 1 }}>The high-risk provisions apply from <span className="amber">2 August 2026</span>, with penalties up to €15M or 3% of worldwide turnover. Here is where each core requirement lands in the platform.</p>
            </div>
          </div>
          <div className="sec-cw rv">
            <table>
              <thead>
                <tr>
                  <th scope="col">Article</th>
                  <th scope="col">Requirement</th>
                  <th scope="col">How FlowX meets it</th>
                </tr>
              </thead>
              <tbody>
                {CROSSWALK.map((r) => (
                  <tr key={r[0]}>
                    <td className="mono sec-cw__art">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="sec-cw__cap">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="abd-note mono rv">Read more: <a className="amber" href={bp('/observatory')}>Observatory — trace and govern every agent decision →</a></p>
        </div>
      </section>

      {/* ================= DEPLOYMENT & DATA RESIDENCY ================= */}
      <section className="section" id="residency">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">04 / Data residency</span>
            <div className="section__headline">
              <h2 className="h2 rv">Your data, where you need it<span className="amber">.</span></h2>
            </div>
          </div>
          <div className="segs segs--3">
            {DEPLOY.map((p, i) => (
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
            <span className="rv" style={{ '--i': 0 }}>Bring your</span>
            <span className="rv" style={{ '--i': 1 }}>auditors<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring one regulated journey and your compliance checklist. We&apos;ll show the platform running it — with the traces, policies and evidence an audit actually asks for.</p>
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
