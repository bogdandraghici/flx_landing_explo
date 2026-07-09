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
              <svg viewBox="0 0 1360 132" preserveAspectRatio="xMidYMid meet">
                {/* the runtime spine the whole chain hangs off */}
                <line className="obp-spine" x1="40" y1="100" x2="1320" y2="100" />

                {/* 01 · compile — regulation lines condense into a policy pack */}
                <g className="obp-st obp-st--1">
                  <line className="obp-rule" x1="143" y1="38" x2="187" y2="38" />
                  <line className="obp-rule" x1="139" y1="48" x2="191" y2="48" />
                  <line className="obp-rule" x1="147" y1="58" x2="179" y2="58" />
                  <line className="obp-link" x1="165" y1="62" x2="165" y2="70" />
                  <rect className="obp-box" x="143" y="70" width="44" height="18" rx="4" />
                  <line className="obp-inner" x1="151" y1="76" x2="171" y2="76" />
                  <line className="obp-inner" x1="151" y1="82" x2="163" y2="82" />
                  <line className="obp-link" x1="165" y1="88" x2="165" y2="100" />
                </g>

                {/* 02 · enforce — the policy drops onto the trace through a gate */}
                <g className="obp-st obp-st--2">
                  <rect className="obp-box" x="494" y="40" width="28" height="14" rx="3" />
                  <line className="obp-link" x1="508" y1="54" x2="508" y2="86" />
                  <path className="obp-gate" d="M508 86 L522 100 L508 114 L494 100 Z" />
                  <polyline className="obp-check" points="503,100 507,104 514,96" />
                </g>

                {/* 03 · evidence — the event rises off the trace into a sealed receipt */}
                <g className="obp-st obp-st--3">
                  <line className="obp-link" x1="852" y1="100" x2="852" y2="78" />
                  <rect className="obp-box" x="824" y="58" width="56" height="20" rx="3" />
                  <line className="obp-inner" x1="832" y1="65" x2="858" y2="65" />
                  <line className="obp-inner" x1="832" y1="71" x2="852" y2="71" />
                  <polyline className="obp-check" points="864,68 867,71 872,64" />
                </g>

                {/* 04 · answer — the audit point; the amber walk-back starts here */}
                <g className="obp-st obp-st--4">
                  <circle className="obp-ask" cx="1195" cy="100" r="7" />
                </g>

                {/* the answer, walking evidence back to the regulation */}
                <path className="obp-arc" d="M1195 88 C 1060 10, 300 10, 165 30" />
                <path className="obp-arr" d="M160 26 L165 36 L170 26 Z" />
                <line className="obp-rule-hot" x1="143" y1="38" x2="187" y2="38" />

                {/* the run travelling the spine */}
                <circle className="obp-run" cx="100" cy="100" r="3.6" />
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
            {/* each capability carries a small line-glyph — ink only, static, one
                 distinct silhouette per card: gate / tray / chain / waterfall / eye / ledger */}
            <div className="segs segs--3">
              <article className="seg seg--g rv" style={{ '--i': 0 }}>
                {/* comparator gate: a metric passes through a check */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <line className="og og--dim" x1="5" y1="24" x2="15" y2="24" />
                  <path className="og" d="M24 15 L33 24 L24 33 L15 24 Z" />
                  <polyline className="og" points="20.5,24 23,26.5 28,20.5" />
                  <line className="og og--dim" x1="33" y1="24" x2="43" y2="24" />
                </svg>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Policy engine</h3>
                <p className="seg__desc">Machine-checkable rules enforced against live telemetry, grouped into reusable regulatory packs.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 1 }}>
                {/* harvest tray: traces converge into a reviewed batch */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <circle className="og og--dim" cx="12" cy="11" r="2.5" />
                  <circle className="og og--dim" cx="24" cy="8" r="2.5" />
                  <circle className="og og--dim" cx="36" cy="11" r="2.5" />
                  <path className="og og--dim" d="M12 14 L24 25 M24 11 L24 25 M36 14 L24 25" />
                  <path className="og" d="M12 28 V38 H36 V28" />
                  <polyline className="og" points="19,32 23,36 30,29" />
                </svg>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Evidence pipeline</h3>
                <p className="seg__desc">Compliance evidence auto-collected from traces, with a collect → review → approve workflow.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 2 }}>
                {/* stepped chain: requirement → policy → evidence */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <rect className="og" x="8" y="8" width="11" height="8" rx="2" />
                  <path className="og og--dim" d="M13.5 16 V23.5 H19" />
                  <rect className="og" x="19" y="20" width="11" height="8" rx="2" />
                  <path className="og og--dim" d="M24.5 28 V35.5 H30" />
                  <rect className="og" x="30" y="32" width="11" height="8" rx="2" />
                </svg>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Regulatory mapping</h3>
                <p className="seg__desc">EU AI Act, GDPR, HIPAA, SOC 2, PCI-DSS, ISO 27001 — requirement → policy → evidence, with continuous gap analysis.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 3 }}>
                {/* trace waterfall: a run, its calls, their spans */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <line className="og" x1="8" y1="12" x2="34" y2="12" />
                  <line className="og og--dim" x1="14" y1="19" x2="30" y2="19" />
                  <line className="og og--dim" x1="14" y1="26" x2="40" y2="26" />
                  <line className="og og--dim" x1="20" y1="33" x2="32" y2="33" />
                  <line className="og og--dim" x1="8" y1="12" x2="8" y2="26" />
                </svg>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Execution tracing</h3>
                <p className="seg__desc">Hierarchical traces of every run, tool call, retrieval and decision, with token, cost and latency telemetry.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 4 }}>
                {/* oversight: an eye on the run, with the pause that can stop it */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <path className="og" d="M8 21 Q24 9 40 21 Q24 33 8 21 Z" />
                  <circle className="og" cx="24" cy="21" r="4" />
                  <line className="og og--dim" x1="8" y1="39" x2="19" y2="39" />
                  <line className="og" x1="22.5" y1="36" x2="22.5" y2="42" />
                  <line className="og" x1="26" y1="36" x2="26" y2="42" />
                  <line className="og og--dim" x1="29.5" y1="39" x2="40" y2="39" />
                </svg>
                <span className="seg__no mono">05</span>
                <h3 className="seg__name">Risk-based oversight</h3>
                <p className="seg__desc">In-the-loop for high-risk, on-the-loop otherwise, with a kill switch — human review recorded as evidence.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 5 }}>
                {/* sealed ledger: recorded rows, tamper-evident seal */}
                <svg className="seg__glyph" viewBox="0 0 48 48" aria-hidden="true">
                  <rect className="og" x="9" y="9" width="27" height="26" rx="3" />
                  <line className="og og--dim" x1="14" y1="17" x2="31" y2="17" />
                  <line className="og og--dim" x1="14" y1="23" x2="31" y2="23" />
                  <line className="og og--dim" x1="14" y1="29" x2="25" y2="29" />
                  <circle className="og" cx="35" cy="34" r="6" />
                  <polyline className="og" points="32.5,34 34.5,36 38,31.5" />
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
            {/* each number carries a hairline meter restating it as a mark:
                 a proportion, a proportion, a date closing in (the one amber tick),
                 and a count of six */}
            <dl className="stats stats--obs">
              <div className="stats__row rv" style={{ '--i': 0 }}>
                <dt>
                  <span className="stats__num">71%</span>
                  <svg className="stats__meter" viewBox="0 0 180 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="180" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="127.8" y2="6" />
                    <line className="om-cap" x1="127.8" y1="1.5" x2="127.8" y2="10.5" />
                  </svg>
                </dt>
                <dd>of organizations deploying agents have no formal governance framework.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 1 }}>
                <dt>
                  <span className="stats__num">80%</span>
                  <svg className="stats__meter" viewBox="0 0 180 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="180" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="144" y2="6" />
                    <line className="om-cap" x1="144" y1="1.5" x2="144" y2="10.5" />
                  </svg>
                </dt>
                <dd>have already observed risky agent behaviors, like unauthorized data access.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 2 }}>
                <dt>
                  <span className="stats__num">Aug 2026</span>
                  {/* a timeline: quarter ticks, and the deadline sitting one tick away */}
                  <svg className="stats__meter" viewBox="0 0 180 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="180" y2="6" />
                    <line className="om-tick" x1="1" y1="2.5" x2="1" y2="9.5" />
                    <line className="om-tick" x1="45" y1="2.5" x2="45" y2="9.5" />
                    <line className="om-tick" x1="90" y1="2.5" x2="90" y2="9.5" />
                    <line className="om-tick" x1="179" y1="2.5" x2="179" y2="9.5" />
                    <line className="om-fill" x1="0" y1="6" x2="135" y2="6" />
                    <line className="om-mark" x1="142.5" y1="0.5" x2="142.5" y2="11.5" />
                  </svg>
                </dt>
                <dd>EU AI Act reaches full effect — binding human oversight and multi-year record-keeping.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 3 }}>
                <dt>
                  <span className="stats__num">6</span>
                  <svg className="stats__meter" viewBox="0 0 180 12" aria-hidden="true">
                    <line className="om-count" x1="2" y1="1.5" x2="2" y2="10.5" />
                    <line className="om-count" x1="16" y1="1.5" x2="16" y2="10.5" />
                    <line className="om-count" x1="30" y1="1.5" x2="30" y2="10.5" />
                    <line className="om-count" x1="44" y1="1.5" x2="44" y2="10.5" />
                    <line className="om-count" x1="58" y1="1.5" x2="58" y2="10.5" />
                    <line className="om-count" x1="72" y1="1.5" x2="72" y2="10.5" />
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
