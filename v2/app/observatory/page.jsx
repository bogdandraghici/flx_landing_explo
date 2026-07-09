import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'FlowX — Observatory',
  description: "Observatory is FlowX.AI's observability and governance plane. GAVEL enforces policy on live agent telemetry, harvests compliance evidence from every trace, and answers an audit by walking evidence back to the regulation.",
};

export default function Observatory() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        <section className="ahero" id="phero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Platform · Observatory
              </p>
              <h1 className="hero__title">
                <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">Governance that runs</span></span>
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>where the agent runs<span className="amber">.</span></span>
              </h1>
              <p className="hero__sub rv-load" style={{ '--d': 3 }}>
                Observatory is FlowX.AI's observability and governance plane. GAVEL
                enforces policy on live agent telemetry, harvests compliance evidence
                from every trace, and answers an audit by walking evidence back to the
                regulation.
              </p>
              <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
                <a className="btn btn--primary btn--lg" href="#cta">Book a demo</a>
                <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
              </div>
              <p className="astats mono rv-load" style={{ '--d': 5 }}>
                <span>enforced at runtime · evidence by default</span>
              </p>
            </div>

            {/* the live citation: a live agent trace streams; one runtime event is picked out
                 and an amber citation line rises from it up to the regulation clause it
                 satisfies — the clause's footnote marker lights, and the footnote resolves to
                 the real trace metadata that proves it. compliance, footnoted to reality. 12s loop. */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="A regulation clause states a compliance requirement; below it a live agent trace streams. One runtime event is picked out and an amber citation line rises from that event up to the clause, whose footnote marker lights — and the footnote resolves to the real trace metadata that proves it. Compliance, footnoted to reality.">

                {/* REGULATION: the clause that states a compliance requirement */}
                <text className="ivz-lbl" x="64" y="88" textAnchor="start">regulation · § 4.2</text>
                <line className="cit-edge" x1="57" y1="98" x2="57" y2="170" />
                <rect className="cit-rule" x="64" y="104" width="300" height="4" rx="2" />
                <rect className="cit-rule" x="64" y="116" width="332" height="4" rx="2" />
                {/* the active clause: the compliance requirement, legible; its footnote marker + underline light on resolution */}
                <text className="cit-clause" x="64" y="134">no action exceeds its permissions<tspan className="cit-mark" dy="-4">2</tspan></text>
                <line className="cit-clause-hot" x1="64" y1="139" x2="248" y2="139" />
                <rect className="cit-rule" x="64" y="150" width="250" height="4" rx="2" />
                <rect className="cit-rule" x="64" y="162" width="170" height="4" rx="2" />

                {/* the citation line: rises from the cited event up to the clause */}
                <line className="cit-line" x1="250" y1="324" x2="250" y2="148" />
                <path className="cit-arr" d="M246 154 l4 -6 l4 6 z" />

                {/* RUNTIME: the live execution trace */}
                <text className="ivz-lbl" x="64" y="300" textAnchor="start">runtime · live trace</text>
                <line className="cit-spine" x1="64" y1="330" x2="396" y2="330" />
                <circle className="cit-node" cx="80" cy="330" r="5" />
                <circle className="cit-node" cx="134" cy="330" r="5" />
                <circle className="cit-node" cx="188" cy="330" r="5" />
                <circle className="cit-node" cx="250" cy="330" r="5" />
                <circle className="cit-node" cx="298" cy="330" r="5" />
                <circle className="cit-node" cx="352" cy="330" r="5" />
                <circle className="cit-node" cx="396" cy="330" r="5" />
                {/* telemetry: token · cost · latency per event */}
                <g className="cit-tickset">
                  <line className="cit-tick" x1="80" y1="338" x2="80" y2="346" />
                  <line className="cit-tick" x1="134" y1="338" x2="134" y2="344" />
                  <line className="cit-tick" x1="188" y1="338" x2="188" y2="348" />
                  <line className="cit-tick" x1="250" y1="338" x2="250" y2="343" />
                  <line className="cit-tick" x1="298" y1="338" x2="298" y2="347" />
                  <line className="cit-tick" x1="352" y1="338" x2="352" y2="345" />
                  <line className="cit-tick" x1="396" y1="338" x2="396" y2="342" />
                </g>
                <text className="ivz-lbl" x="64" y="364" textAnchor="start">token · cost · latency</text>
                {/* the streaming run */}
                <circle className="cit-run" cx="64" cy="330" r="3.6" />
                {/* the cited event: picked out of the trace, where the citation lands */}
                <circle className="cit-pick" cx="250" cy="330" r="9" />

                {/* the footnote: the citation resolves to real trace metadata */}
                <text className="cit-note" x="64" y="390"><tspan className="cit-note-num">2</tspan>  trace 0x9f4a · permission check · pass · 14:32:07Z</text>

                {/* status tags */}
                <g className="cit-tag--live" transform="translate(230 418)">
                  <rect className="ivz-tag" x="-52" y="-10" width="104" height="15" />
                  <text className="ivz-lbl" textAnchor="middle" y="1.5">runtime · live</text>
                </g>
                <g className="cit-tag--ok" transform="translate(230 418)">
                  <rect className="ivz-tag" x="-66" y="-10" width="132" height="15" />
                  <text className="ivz-lbl" textAnchor="middle" y="1.5">cited · compliant</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THESIS ================= */}
        <section className="abd-thesis">
          <div className="shell">
            <blockquote className="rv">A policy that lives in a document cannot govern an agent that chains a dozen tool calls in a <span className="amber">second</span>.</blockquote>
            <p className="rv" style={{ '--i': 1 }}>The dominant failure mode in production isn't hallucination — it's privilege excess: an agent
              doing something it was technically able to but never should have, faster than any review cycle can
              follow. Governance has to run where the agent runs, check what the agent actually did, and leave
              behind the evidence that it did.</p>
            <span className="abd-thesis__tag mono rv" style={{ '--i': 2 }}>GAVEL · Governed Autonomy, Verified by an Evidence Layer</span>
          </div>
        </section>

        {/* ================= REGULATION TO RUNTIME ================= */}
        <section className="section" id="how">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / Regulation to runtime</span>
              <div className="section__headline">
                <h2 className="h2 rv">Enforced and evidenced at runtime<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Document suites pass a paper audit while agents misbehave;
                  control planes stop agents but prove nothing. GAVEL closes the gap — one evidence chain from
                  regulation to what the agent did.</p>
              </div>
            </div>
            <div className="segs abd-pipe">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Compile</h3>
                <p className="seg__desc">Organizational and regulatory rules become machine-checkable policies — a metric, an operator, a threshold — grouped into packs like an EU AI Act High-Risk Pack.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Enforce</h3>
                <p className="seg__desc">Policies evaluate against live execution telemetry, not a questionnaire — mandatory or advisory, continuously. A policy being violated says so the moment it happens.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Evidence</h3>
                <p className="seg__desc">Compliance evidence is auto-harvested from traces as a byproduct of enforcement — collect, review, approve.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Answer</h3>
                <p className="seg__desc">An audit is answered by walking evidence back through policy to requirement — every link grounded in what the agent actually did.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= WHAT IT DOES ================= */}
        <section className="section" id="capabilities">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / What it does</span>
              <div className="section__headline">
                <h2 className="h2 rv">Observability and governance, in one plane<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Every agent run is captured, evaluated against policy, and
                  turned into audit-ready evidence — without a parallel record to maintain.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Policy engine</h3>
                <p className="seg__desc">Machine-checkable rules enforced against live telemetry, grouped into reusable regulatory packs.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Evidence pipeline</h3>
                <p className="seg__desc">Compliance evidence auto-collected from traces, with a collect → review → approve workflow.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Regulatory mapping</h3>
                <p className="seg__desc">EU AI Act, GDPR, HIPAA, SOC 2, PCI-DSS, ISO 27001 — requirement → policy → evidence, with continuous gap analysis.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Execution tracing</h3>
                <p className="seg__desc">Hierarchical traces of every run, tool call, retrieval and decision, with token, cost and latency telemetry.</p>
              </article>
              <article className="seg rv" style={{ '--i': 4 }}>
                <span className="seg__no mono">05</span>
                <h3 className="seg__name">Risk-based oversight</h3>
                <p className="seg__desc">In-the-loop for high-risk, on-the-loop otherwise, with a kill switch — human review recorded as evidence.</p>
              </article>
              <article className="seg rv" style={{ '--i': 5 }}>
                <span className="seg__no mono">06</span>
                <h3 className="seg__name">Immutable audit trail</h3>
                <p className="seg__desc">Every access, enforcement action and human review recorded, tamper-evident, and retained for years.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= WHY NOW ================= */}
        <section className="section" id="why">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Why now</span>
              <div className="section__headline">
                <h2 className="h2 rv">Autonomy is outpacing oversight<span className="amber">.</span></h2>
              </div>
            </div>
            <dl className="stats">
              <div className="stats__row rv" style={{ '--i': 0 }}>
                <dt><span className="stats__num">71%</span></dt>
                <dd>of organizations deploying agents have no formal governance framework.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 1 }}>
                <dt><span className="stats__num">80%</span></dt>
                <dd>have already observed risky agent behaviors, like unauthorized data access.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 2 }}>
                <dt><span className="stats__num">Aug 2026</span></dt>
                <dd>EU AI Act reaches full effect — binding human oversight and multi-year record-keeping.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 3 }}>
                <dt><span className="stats__num">6</span></dt>
                <dd>regulatory frameworks mapped out of the box, from EU AI Act to ISO 27001.</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">04 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Govern the autonomy</span>
              <span className="rv" style={{ '--i': 1 }}>you grant<span className="amber">.</span></span>
            </h2>
            <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring a high-risk workflow — we'll enforce a policy pack against a
              live run and hand you the evidence chain.</p>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Observatory%20demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
            </div>
          </div>
        </section>
      </main>
      <CtaFieldInit />
    </>
  );
}
