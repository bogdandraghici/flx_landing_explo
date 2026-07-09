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

            {/* the governance plane, isometric: the REGULATION cube feeds the
                 OBSERVATORY / GAVEL core sitting on the runtime plane; AGENT RUNTIME
                 and 3rd-party agents connect through dashed telemetry conduits, and
                 EVIDENCE collects in the foreground. The one amber thread is the
                 AUDIT being answered — walking back to the exact rule it satisfies.
                 Desktop-only; the four cards below carry the story on smaller screens. */}
            <div className="obp rv" aria-hidden="true">
              <svg viewBox="0 -30 1360 620" preserveAspectRatio="xMidYMid meet">
                {/* runtime plane */}
                <polygon className="iso-plane" points="250,309.8 730,549.8 730,556 250,316" />
                <polygon className="iso-plane" points="1170,329.8 730,549.8 730,556 1170,336" />
                <polygon className="iso-plane" points="690,89.8 1170,329.8 730,549.8 250,309.8" />
                {/* dashed telemetry / evidence conduits */}
                <line className="iso-conduit" x1="614" y1="281.1" x2="700" y2="324.1" />
                <line className="iso-conduit" x1="798" y1="385.1" x2="902" y2="437.1" />
                <line className="iso-conduit" x1="682" y1="355.1" x2="562" y2="371.1" />
                {/* AGENT RUNTIME — field of cubes */}
                <polygon className="iso-face" points="512,165.4 550,184.4 550,224 512,205" />
                <polygon className="iso-face" points="588,165.4 550,184.4 550,224 588,205" />
                <polygon className="iso-face" points="550,146.4 588,165.4 550,184.4 512,165.4" />
                <polygon className="iso-face" points="556,187.4 594,206.4 594,246 556,227" />
                <polygon className="iso-face" points="468,187.4 506,206.4 506,246 468,227" />
                <polygon className="iso-face" points="632,187.4 594,206.4 594,246 632,227" />
                <polygon className="iso-face" points="544,187.4 506,206.4 506,246 544,227" />
                <polygon className="iso-face" points="594,168.4 632,187.4 594,206.4 556,187.4" />
                <polygon className="iso-face" points="506,168.4 544,187.4 506,206.4 468,187.4" />
                {/* REGULATION — floating cube */}
                <polygon className="iso-face" points="566,18 630,50 630,120.4 566,88.4" />
                <polygon className="iso-face" points="694,18 630,50 630,120.4 694,88.4" />
                <polygon className="iso-face" points="630,-14 694,18 630,50 566,18" />
                <polygon className="iso-face" points="512,209.4 550,228.4 550,268 512,249" />
                <polygon className="iso-face" points="424,209.4 462,228.4 462,268 424,249" />
                <polygon className="iso-face" points="588,209.4 550,228.4 550,268 588,249" />
                <polygon className="iso-face" points="500,209.4 462,228.4 462,268 500,249" />
                <polygon className="iso-face" points="550,190.4 588,209.4 550,228.4 512,209.4" />
                <polygon className="iso-face" points="462,190.4 500,209.4 462,228.4 424,209.4" />
                <polygon className="iso-face" points="556,231.4 594,250.4 594,290 556,271" />
                <polygon className="iso-face" points="468,231.4 506,250.4 506,290 468,271" />
                <polygon className="iso-face" points="632,231.4 594,250.4 594,290 632,271" />
                <polygon className="iso-face" points="544,231.4 506,250.4 506,290 544,271" />
                <polygon className="iso-face" points="594,212.4 632,231.4 594,250.4 556,231.4" />
                <polygon className="iso-face" points="506,212.4 544,231.4 506,250.4 468,231.4" />
                <polygon className="iso-face" points="512,253.4 550,272.4 550,312 512,293" />
                <polygon className="iso-face" points="588,253.4 550,272.4 550,312 588,293" />
                <polygon className="iso-face" points="550,234.4 588,253.4 550,272.4 512,253.4" />
                {/* OBSERVATORY / GAVEL core — stepped massif */}
                <polygon className="iso-face" points="666,308.8 770,360.8 770,396 666,344" />
                <polygon className="iso-face" points="874,308.8 770,360.8 770,396 874,344" />
                <polygon className="iso-face" points="770,256.8 874,308.8 770,360.8 666,308.8" />
                <polygon className="iso-face" points="724,165 770,188 770,306.8 724,283.8" />
                <polygon className="iso-face" points="816,165 770,188 770,306.8 816,283.8" />
                <polygon className="iso-face" points="770,142 816,165 770,188 724,165" />
                <polygon className="iso-face" points="774,220.8 820,243.8 820,331.8 774,308.8" />
                <polygon className="iso-face" points="674,251.6 720,274.6 720,331.8 674,308.8" />
                <polygon className="iso-face" points="866,220.8 820,243.8 820,331.8 866,308.8" />
                <polygon className="iso-face" points="766,251.6 720,274.6 720,331.8 766,308.8" />
                <polygon className="iso-face" points="820,197.8 866,220.8 820,243.8 774,220.8" />
                <polygon className="iso-face" points="720,228.6 766,251.6 720,274.6 674,251.6" />
                {/* EVIDENCE — foreground disc */}
                <polygon className="iso-face" points="430,356.6 514,398.6 514,436 430,394" />
                <polygon className="iso-face" points="598,356.6 514,398.6 514,436 598,394" />
                <polygon className="iso-face" points="514,314.6 598,356.6 514,398.6 430,356.6" />
                <ellipse className="iso-edge" cx="514" cy="356.6" rx="42.0" ry="21.0" />
                <polygon className="iso-face" points="724,261.2 770,284.2 770,356.8 724,333.8" />
                <polygon className="iso-face" points="816,261.2 770,284.2 770,356.8 816,333.8" />
                <polygon className="iso-face" points="770,238.2 816,261.2 770,284.2 724,261.2" />
                <polygon className="iso-face" points="732,125.2 770,144.2 770,186 732,167" />
                <polygon className="iso-face" points="808,125.2 770,144.2 770,186 808,167" />
                <polygon className="iso-face" points="770,106.2 808,125.2 770,144.2 732,125.2" />
                {/* 3RD-PARTY AGENTS — cluster */}
                <polygon className="iso-face" points="816,375.2 854,394.2 854,436 816,417" />
                <polygon className="iso-face" points="892,375.2 854,394.2 854,436 892,417" />
                <polygon className="iso-face" points="854,356.2 892,375.2 854,394.2 816,375.2" />
                <polygon className="iso-face" points="916,389.2 954,408.2 954,450 916,431" />
                <polygon className="iso-face" points="992,389.2 954,408.2 954,450 992,431" />
                <polygon className="iso-face" points="954,370.2 992,389.2 954,408.2 916,389.2" />
                <polygon className="iso-face" points="860,397.2 898,416.2 898,458 860,439" />
                <polygon className="iso-face" points="772,397.2 810,416.2 810,458 772,439" />
                <polygon className="iso-face" points="936,397.2 898,416.2 898,458 936,439" />
                <polygon className="iso-face" points="848,397.2 810,416.2 810,458 848,439" />
                <polygon className="iso-face" points="898,378.2 936,397.2 898,416.2 860,397.2" />
                <polygon className="iso-face" points="810,378.2 848,397.2 810,416.2 772,397.2" />
                <polygon className="iso-face" points="816,419.2 854,438.2 854,480 816,461" />
                <polygon className="iso-face" points="892,419.2 854,438.2 854,480 892,461" />
                <polygon className="iso-face" points="854,400.2 892,419.2 854,438.2 816,419.2" />
                {/* connector leaders + node dots */}
                <line className="iso-line" x1="630" y1="88.4" x2="630" y2="194" />
                <line className="iso-line" x1="638" y1="214.4" x2="638" y2="152.8" />
                <line className="iso-line" x1="734" y1="230.4" x2="734" y2="168.8" />
                <line className="iso-line" x1="762" y1="388.4" x2="762" y2="326.8" />
                <line className="iso-line" x1="578" y1="344.4" x2="578" y2="282.8" />
                <circle className="iso-dot" cx="638" cy="152.8" r="5" />
                <circle className="iso-dot" cx="734" cy="168.8" r="5" />
                <circle className="iso-dot" cx="762" cy="326.8" r="5" />
                <circle className="iso-dot" cx="578" cy="282.8" r="5" />
                {/* AUDIT — answered, walking back to the rule (amber) */}
                <line className="iso-line" x1="642" y1="379.1" x2="642" y2="314" />
                <circle className="iso-dot" cx="642" cy="314" r="5" />
                <path className="iso-hot" d="M642 314 C 502 164, 600 288.4, 630 88.4" />
                <circle className="iso-hot-dot" cx="630" cy="88.4" r="4" />
                {/* labels */}
                <text className="iso-label" x="150" y="150"><tspan x="150" dy="0">REGULATION</tspan></text>
                <text className="iso-label" x="120" y="360"><tspan x="120" dy="0">AGENT</tspan><tspan x="120" dy="16">RUNTIME</tspan></text>
                <text className="iso-label" x="980" y="150"><tspan x="980" dy="0">OBSERVATORY</tspan><tspan x="980" dy="16">CORE</tspan></text>
                <text className="iso-label" x="1120" y="380"><tspan x="1120" dy="0">3RD-PARTY</tspan><tspan x="1120" dy="16">AGENTS</tspan></text>
                <text className="iso-label" x="300" y="560"><tspan x="300" dy="0">EVIDENCE</tspan></text>
                <text className="iso-label iso-label--hot" x="658" y="318">AUDIT</text>
                <path className="iso-arrow" d="M150 162 l14 8 m0 0 l-6 0 m6 0 l0 -6" />
                <path className="iso-arrow" d="M120 388 l14 8 m0 0 l-6 0 m6 0 l0 -6" />
                <path className="iso-arrow" d="M980 178 l-14 8 m0 0 l6 0 m-6 0 l0 -6" />
                <path className="iso-arrow" d="M1120 408 l-14 8 m0 0 l6 0 m-6 0 l0 -6" />
                <path className="iso-arrow" d="M300 572 l14 8 m0 0 l-6 0 m6 0 l0 -6" />
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
                  <line className="og" x1="9" y1="22" x2="15" y2="22" />
                  <path className="og" d="M22 15 L29 22 L22 29 L15 22 Z" />
                  <line className="og" x1="29" y1="22" x2="35" y2="22" />
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
                  <path className="og" d="M10 11 L22 24 M22 11 L22 24 M34 11 L22 24" />
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
                  <path className="og" d="M12 14 V22 H16" />
                  <rect className="og" x="16" y="18" width="12" height="8" rx="2" />
                  <path className="og" d="M22 26 V34 H26" />
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
                  <line className="og" x1="16" y1="18" x2="30" y2="18" />
                  <line className="og" x1="16" y1="26" x2="37" y2="26" />
                  <line className="og" x1="21" y1="34" x2="31" y2="34" />
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
                  <line className="og" x1="6" y1="33" x2="17" y2="33" />
                  <line className="og" x1="20.5" y1="29.5" x2="20.5" y2="36.5" />
                  <line className="og" x1="23.5" y1="29.5" x2="23.5" y2="36.5" />
                  <line className="og" x1="27" y1="33" x2="38" y2="33" />
                </svg>
                <span className="seg__no mono">05</span>
                <h3 className="seg__name">Risk-based oversight</h3>
                <p className="seg__desc">In-the-loop for high-risk, on-the-loop otherwise, with a kill switch — human review recorded as evidence.</p>
              </article>
              <article className="seg seg--g rv" style={{ '--i': 5 }}>
                {/* sealed ledger: recorded rows, tamper-evident seal */}
                <svg className="seg__glyph" viewBox="0 0 44 44" aria-hidden="true">
                  <rect className="og" x="9" y="7" width="17" height="25" rx="2.5" />
                  <line className="og" x1="13" y1="13" x2="22" y2="13" />
                  <line className="og" x1="13" y1="17.5" x2="22" y2="17.5" />
                  <line className="og" x1="13" y1="22" x2="19" y2="22" />
                  <circle className="og og--seal" cx="29" cy="30" r="7" />
                  <polyline className="og" points="26,30 28.5,32.5 32.5,27" />
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
