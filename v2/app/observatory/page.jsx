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

            {/* the evidence chain, drawn: a run travels the pipeline left to right —
                 regulation lines compile into a policy pack, pass the enforcement gate
                 on the live trace, seal into an evidence receipt — and then the answer
                 walks the chain BACK: an amber arc rises from Answer and lands on the
                 regulation, lighting the rule it satisfies. 12s loop; reduced motion
                 shows the answered pose. Stations align to the four cards below. */}
            <div className="obp rv" aria-hidden="true">
              <svg viewBox="0 0 1360 100" preserveAspectRatio="xMidYMid meet">
                {/* the runtime spine; four identical stations — node, stem, chip —
                     only the mark inside each chip differs */}
                <line className="obp-spine" x1="40" y1="84" x2="1320" y2="84" />

                {/* 01 · compile — the regulation, as written rules */}
                <g className="obp-st obp-st--1">
                  <rect className="obp-chip" x="138" y="34" width="54" height="30" rx="5" />
                  <line className="obp-stem" x1="165" y1="64" x2="165" y2="79" />
                  <circle className="obp-node" cx="165" cy="84" r="4.5" />
                  <line className="obp-mark" x1="149" y1="42.5" x2="181" y2="42.5" />
                  <line className="obp-mark" x1="149" y1="49" x2="173" y2="49" />
                  <line className="obp-mark" x1="149" y1="55.5" x2="167" y2="55.5" />
                </g>

                {/* 02 · enforce — the gate the run must pass */}
                <g className="obp-st obp-st--2">
                  <rect className="obp-chip" x="481" y="34" width="54" height="30" rx="5" />
                  <line className="obp-stem" x1="508" y1="64" x2="508" y2="79" />
                  <circle className="obp-node" cx="508" cy="84" r="4.5" />
                  <path className="obp-fine" d="M508 41 L516 49 L508 57 L500 49 Z" />
                </g>

                {/* 03 · evidence — the sealed receipt */}
                <g className="obp-st obp-st--3">
                  <rect className="obp-chip" x="825" y="34" width="54" height="30" rx="5" />
                  <line className="obp-stem" x1="852" y1="64" x2="852" y2="79" />
                  <circle className="obp-node" cx="852" cy="84" r="4.5" />
                  <line className="obp-mark" x1="836" y1="44.5" x2="858" y2="44.5" />
                  <line className="obp-mark" x1="836" y1="51" x2="853" y2="51" />
                  <polyline className="obp-fine" points="860,50.5 863,53.5 868,45.5" />
                </g>

                {/* 04 · answer — points back the way the evidence came */}
                <g className="obp-st obp-st--4">
                  <rect className="obp-chip" x="1168" y="34" width="54" height="30" rx="5" />
                  <line className="obp-stem" x1="1195" y1="64" x2="1195" y2="79" />
                  <circle className="obp-node" cx="1195" cy="84" r="4.5" />
                  <line className="obp-mark" x1="1188" y1="49" x2="1206" y2="49" />
                  <polyline className="obp-fine" points="1191,43.5 1185,49 1191,54.5" />
                </g>

                {/* the answer, walking evidence back to the regulation */}
                <path className="obp-arc" d="M1195 34 C 1080 0, 280 0, 165 34" />
                <path className="obp-arr" d="M160 26 L165 34 L170 26 Z" />
                <line className="obp-rule-hot" x1="149" y1="42.5" x2="181" y2="42.5" />

                {/* the run travelling the spine */}
                <circle className="obp-run" cx="100" cy="84" r="3.6" />
              </svg>
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
            {/* each capability carries a small line-glyph — ink only, static, all six
                 drawn on one 44px armature from the same primitives (rules, nodes,
                 chips) at one stroke weight; only the composition differs */}
            <div className="segs segs--3">
              <article className="seg seg--g rv" style={{ '--i': 0 }}>
                {/* comparator gate on a trace: metric in, check, metric out */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="og--node" cx="7" cy="22" r="2" />
                  <line className="og og--dim" x1="9" y1="22" x2="15" y2="22" />
                  <path className="og" d="M22 15 L29 22 L22 29 L15 22 Z" />
                  <line className="og og--dim" x1="29" y1="22" x2="35" y2="22" />
                  <circle className="og--node" cx="37" cy="22" r="2" />
                </svg>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Policy engine</h3>
                <p className="seg__desc">Machine-checkable rules enforced against live telemetry, grouped into reusable regulatory packs.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 1 }}>
                {/* harvest: three trace events converge into a checked chip */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="og--node" cx="10" cy="9" r="2" />
                  <circle className="og--node" cx="22" cy="9" r="2" />
                  <circle className="og--node" cx="34" cy="9" r="2" />
                  <path className="og og--dim" d="M10 11 L22 24 M22 11 L22 24 M34 11 L22 24" />
                  <rect className="og" x="12" y="26" width="20" height="12" rx="2" />
                  <polyline className="og" points="18,32 21,35 26.5,28.5" />
                </svg>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Evidence pipeline</h3>
                <p className="seg__desc">Compliance evidence auto-collected from traces, with a collect → review → approve workflow.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 2 }}>
                {/* stepped chain: requirement → policy → evidence */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <rect className="og" x="6" y="6" width="12" height="8" rx="2" />
                  <path className="og og--dim" d="M12 14 V22 H16" />
                  <rect className="og" x="16" y="18" width="12" height="8" rx="2" />
                  <path className="og og--dim" d="M22 26 V34 H26" />
                  <rect className="og" x="26" y="30" width="12" height="8" rx="2" />
                </svg>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Regulatory mapping</h3>
                <p className="seg__desc">EU AI Act, GDPR, HIPAA, SOC 2, PCI-DSS, ISO 27001 — requirement → policy → evidence, with continuous gap analysis.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 3 }}>
                {/* trace waterfall: a run, its calls, their spans */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="og--node" cx="7" cy="10" r="2" />
                  <line className="og" x1="11" y1="10" x2="33" y2="10" />
                  <line className="og og--dim" x1="16" y1="18" x2="30" y2="18" />
                  <line className="og og--dim" x1="16" y1="26" x2="37" y2="26" />
                  <line className="og og--dim" x1="21" y1="34" x2="31" y2="34" />
                </svg>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Execution tracing</h3>
                <p className="seg__desc">Hierarchical traces of every run, tool call, retrieval and decision, with token, cost and latency telemetry.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 4 }}>
                {/* oversight: the observer ring watches the trace; it can pause it */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <circle className="og" cx="22" cy="13" r="6" />
                  <circle className="og--node" cx="22" cy="13" r="2" />
                  <line className="og og--sight" x1="22" y1="21" x2="22" y2="27" />
                  <line className="og og--dim" x1="6" y1="33" x2="17" y2="33" />
                  <line className="og" x1="20.5" y1="29.5" x2="20.5" y2="36.5" />
                  <line className="og" x1="23.5" y1="29.5" x2="23.5" y2="36.5" />
                  <line className="og og--dim" x1="27" y1="33" x2="38" y2="33" />
                </svg>
                <span className="seg__no mono">05</span>
                <h3 className="seg__name">Risk-based oversight</h3>
                <p className="seg__desc">In-the-loop for high-risk, on-the-loop otherwise, with a kill switch — human review recorded as evidence.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 5 }}>
                {/* sealed ledger: recorded rows, tamper-evident seal */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <rect className="og" x="7" y="7" width="23" height="24" rx="2" />
                  <line className="og og--dim" x1="12" y1="14" x2="25" y2="14" />
                  <line className="og og--dim" x1="12" y1="19" x2="25" y2="19" />
                  <line className="og og--dim" x1="12" y1="24" x2="21" y2="24" />
                  <circle className="og" cx="31" cy="30" r="6" />
                  <polyline className="og" points="28.5,30 30.5,32 34,27.5" />
                </svg>
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
