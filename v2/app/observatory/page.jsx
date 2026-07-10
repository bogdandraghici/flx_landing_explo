import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'FlowX — Observatory',
  description: "Observatory is FlowX.AI's observability and governance plane. GAVEL enforces policy on live agent telemetry, harvests compliance evidence from every trace, and answers an audit by walking evidence back to the regulation.",
};

export default function Observatory() {
  return (
    <>
      <main id="top" className="page-observatory">

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
                 the real trace metadata that proves it. compliance, footnoted to reality. 12s loop.

                 Built in HTML/CSS on a fixed-vertical / fluid-horizontal layer (not a single
                 scaling SVG): every label, the clause and the footnote sit at fixed legible px
                 sizes, while the trace nodes and the citation line ride a percentage grid — so
                 on narrow viewports the figure compresses horizontally instead of shrinking the
                 text with everything else. Same construction as the stitch diagram below. */}
            <div className="ahero__viz cit" aria-hidden="true">
              {/* REGULATION — the clause that states a compliance requirement */}
              <p className="cit__lbl cit__lbl--reg">regulation · § 4.2</p>
              <div className="cit__doc">
                <span className="cit__bar" style={{ width: '86%' }} />
                <span className="cit__bar" style={{ width: '72%' }} />
                {/* the active clause: legible; its footnote marker + underline light on resolution */}
                <p className="cit__clause">
                  <span className="cit__clause-t">no action exceeds its permissions<span className="cit__ul" /></span><sup className="cit__mark">2</sup>
                </p>
                <span className="cit__bar" style={{ width: '54%' }} />
                <span className="cit__bar" style={{ width: '37%' }} />
              </div>

              {/* the citation line: rises from the cited event up to the clause */}
              <span className="cit__link"><span className="cit__arr" /></span>

              {/* RUNTIME — the live execution trace */}
              <p className="cit__lbl cit__lbl--run">runtime · live trace</p>
              <div className="cit__rail">
                <span className="cit__node" style={{ left: '4%' }} />
                <span className="cit__node" style={{ left: '20%' }} />
                <span className="cit__node" style={{ left: '36%' }} />
                <span className="cit__node cit__node--cited" style={{ left: '52%' }} />
                <span className="cit__node" style={{ left: '66%' }} />
                <span className="cit__node" style={{ left: '82%' }} />
                <span className="cit__node" style={{ left: '96%' }} />
                {/* telemetry ticks under each event */}
                <span className="cit__tick" style={{ left: '4%', height: '8px' }} />
                <span className="cit__tick" style={{ left: '20%', height: '6px' }} />
                <span className="cit__tick" style={{ left: '36%', height: '10px' }} />
                <span className="cit__tick" style={{ left: '52%', height: '5px' }} />
                <span className="cit__tick" style={{ left: '66%', height: '9px' }} />
                <span className="cit__tick" style={{ left: '82%', height: '7px' }} />
                <span className="cit__tick" style={{ left: '96%', height: '4px' }} />
                {/* the streaming run, and the cited event picked out of the trace */}
                <span className="cit__run" />
                <span className="cit__pick" />
              </div>
              <p className="cit__lbl cit__lbl--tel">token · cost · latency</p>

              {/* the footnote: the citation resolves to real trace metadata */}
              <p className="cit__note"><span className="cit__note-num">2</span> trace 0x9f4a · permission check · pass · 14:32:07Z</p>

              {/* status tag — swaps from "runtime · live" to "cited · compliant" */}
              <div className="cit__tags">
                <span className="cit__tag cit__tag--live">runtime · live</span>
                <span className="cit__tag cit__tag--ok">cited · compliant</span>
              </div>
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

            {/* the stitch: regulation and runtime are two rails, tied together at
                 each of the four steps by a single amber thread. The clause (§ 4.2)
                 rides the top rail, the live trace runs along the bottom, and every
                 step stitches one to the other — the answer step resolved into a
                 sealed node on the trace. Threads align to the four cards below;
                 desktop-only. */}
            <div className="obp rv" aria-hidden="true">
              <div className="stitch">
                {/* step labels — one per stitch, aligned over the four cards */}
                <div className="stitch__steps">
                  <span className="stitch__step">compile</span>
                  <span className="stitch__step">enforce</span>
                  <span className="stitch__step">evidence</span>
                  <span className="stitch__step stitch__step--answer">answer</span>
                </div>

                {/* two rails — regulation (top) and runtime (bottom) — stitched by
                     four amber threads. Built in HTML with fixed vertical sizes and
                     text so labels stay legible; the threads sit on a percentage
                     grid, so on narrow viewports the diagram compresses horizontally
                     rather than shrinking the whole thing. */}
                <div className="stitch__body">
                  <span className="stitch__lbl stitch__lbl--reg">regulation · clauses</span>
                  <div className="stitch__rail stitch__rail--reg" />
                  <span className="stitch__cite">§ 4.2</span>

                  <div className="stitch__threads">
                    <span className="stitch__thread"><span className="stitch__flow" /></span>
                    <span className="stitch__thread"><span className="stitch__flow" /></span>
                    <span className="stitch__thread"><span className="stitch__flow" /></span>
                    <span className="stitch__thread stitch__thread--answer"><span className="stitch__flow" /></span>
                  </div>

                  <div className="stitch__rail stitch__rail--run" />
                  <span className="stitch__lbl stitch__lbl--run">runtime · live trace</span>
                </div>
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
            {/* each number carries the same hairline track under it, restated as
                 marks: a filled proportion, a filled proportion, a timeline whose
                 one amber tick is the deadline, six marks on the rail */}
            <dl className="stats stats--obs">
              <div className="stats__row rv" style={{ '--i': 0 }}>
                <dt>
                  <span className="stats__num">71%</span>
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="142" y2="6" />
                    <line className="om-cap" x1="142" y1="1.5" x2="142" y2="10.5" />
                  </svg>
                </dt>
                <dd>of organizations deploying agents have no formal governance framework.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 1 }}>
                <dt>
                  <span className="stats__num">80%</span>
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="160" y2="6" />
                    <line className="om-cap" x1="160" y1="1.5" x2="160" y2="10.5" />
                  </svg>
                </dt>
                <dd>have already observed risky agent behaviors, like unauthorized data access.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 2 }}>
                <dt>
                  <span className="stats__num">Aug 2026</span>
                  {/* two years of quarters, filled to today; the amber tick is the deadline */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-tick" x1="25" y1="3" x2="25" y2="9" />
                    <line className="om-tick" x1="50" y1="3" x2="50" y2="9" />
                    <line className="om-tick" x1="75" y1="3" x2="75" y2="9" />
                    <line className="om-tick" x1="100" y1="3" x2="100" y2="9" />
                    <line className="om-tick" x1="125" y1="3" x2="125" y2="9" />
                    <line className="om-tick" x1="175" y1="3" x2="175" y2="9" />
                    <line className="om-fill" x1="0" y1="6" x2="150" y2="6" />
                    <line className="om-mark" x1="158" y1="0.5" x2="158" y2="11.5" />
                  </svg>
                </dt>
                <dd>EU AI Act reaches full effect — binding human oversight and multi-year record-keeping.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 3 }}>
                <dt>
                  <span className="stats__num">6</span>
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-count" x1="2.5" y1="1.5" x2="2.5" y2="10.5" />
                    <line className="om-count" x1="41.5" y1="1.5" x2="41.5" y2="10.5" />
                    <line className="om-count" x1="80.5" y1="1.5" x2="80.5" y2="10.5" />
                    <line className="om-count" x1="119.5" y1="1.5" x2="119.5" y2="10.5" />
                    <line className="om-count" x1="158.5" y1="1.5" x2="158.5" y2="10.5" />
                    <line className="om-count" x1="197.5" y1="1.5" x2="197.5" y2="10.5" />
                  </svg>
                </dt>
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
