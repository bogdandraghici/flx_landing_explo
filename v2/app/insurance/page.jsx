import IndustryInit from '@/components/IndustryInit';

export const metadata = {
  title: 'FlowX — Insurance',
  description: 'FlowX.AI insurance agents on the claims journey — underwriting, claims processing, and fraud detection, for carriers, brokers, and reinsurers.',
};

export default function Insurance() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        <section className="ahero" id="ihero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Industries · Insurance
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Insurance agents, on the claims journey<span className="amber">.</span></span>
              </h1>
              {/* DRAFT — marketing review */}
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                From first notice of loss to settlement — agents for carriers,
                brokers, and reinsurers at every step of the claim. Built for
                insurers where failure is not an option.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>220+</b> agents</span>
                <span><b>3</b> industries</span>
                <span><b className="amber">●</b> in production</span>
              </p>
            </div>

            {/* risk radar: the sweep watches a quiet field; one blip flares into an incident, is bracketed, tracked, and resolved amber — settled */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="A radar sweep over a field of quiet risk blips; one flares into an incident, is bracketed and tracked as a claim, then resolves amber — settled">
                {/* scope: range rings, axes, degree ticks */}
                <circle className="irv-grid" cx="230" cy="230" r="48" />
                <circle className="irv-grid" cx="230" cy="230" r="96" />
                <circle className="irv-grid" cx="230" cy="230" r="144" />
                <circle className="irv-edge" cx="230" cy="230" r="184" />
                <line className="irv-axis" x1="46" y1="230" x2="414" y2="230" />
                <line className="irv-axis" x1="230" y1="46" x2="230" y2="414" />
                <g className="irv-tick">
                  <line x1="230" y1="50" x2="230" y2="42" />
                  <line x1="320" y1="74.1" x2="324" y2="67.2" />
                  <line x1="385.9" y1="140" x2="392.8" y2="136" />
                  <line x1="410" y1="230" x2="418" y2="230" />
                  <line x1="385.9" y1="320" x2="392.8" y2="324" />
                  <line x1="320" y1="385.9" x2="324" y2="392.8" />
                  <line x1="230" y1="410" x2="230" y2="418" />
                  <line x1="140" y1="385.9" x2="136" y2="392.8" />
                  <line x1="74.1" y1="320" x2="67.2" y2="324" />
                  <line x1="50" y1="230" x2="42" y2="230" />
                  <line x1="74.1" y1="140" x2="67.2" y2="136" />
                  <line x1="140" y1="74.1" x2="136" y2="67.2" />
                </g>

                {/* quiet field: blips glow as the beam passes (delays synced to sweep angle) */}
                <circle className="irv-b" cx="343" cy="295" r="2.6" style={{ animationDelay: '-4s' }} />
                <circle className="irv-b" cx="206" cy="296" r="2.6" style={{ animationDelay: '-2.67s' }} />
                <circle className="irv-b" cx="95" cy="266" r="2.6" style={{ animationDelay: '-1.75s' }} />
                <circle className="irv-b" cx="148" cy="183" r="2.6" style={{ animationDelay: '-1s' }} />
                <circle className="irv-b" cx="177" cy="84" r="2.6" style={{ animationDelay: '-0.33s' }} />
                <circle className="irv-b" cx="286" cy="385" r="2.6" style={{ animationDelay: '-3.33s' }} />

                {/* the sweep: leading beam + trailing wedge, one rotation per 6s */}
                <g className="irv-sweep">
                  <path className="irv-wedge" d="M230 230 L138 70.7 A184 184 0 0 1 230 46 Z" />
                  <line className="irv-beam" x1="230" y1="230" x2="230" y2="46" />
                </g>
                <circle className="irv-hub" cx="230" cy="230" r="10" />
                <circle className="irv-core" cx="230" cy="230" r="2.6" />

                {/* the incident: flares on the first pass, bracketed and tracked as a claim */}
                <circle className="irv-inc" cx="307" cy="166" r="3.2" />
                <circle className="irv-inc--set" cx="307" cy="166" r="3.2" />
                <g className="irv-brk">
                  <path d="M293 159 L293 152 L300 152" />
                  <path d="M314 152 L321 152 L321 159" />
                  <path d="M321 173 L321 180 L314 180" />
                  <path d="M300 180 L293 180 L293 173" />
                </g>
                <circle className="irv-track" cx="307" cy="166" r="20" pathLength="100" />
                <circle className="irv-pulse" cx="307" cy="166" r="20" />
                <g className="irv-tag--fnol" transform="translate(307 122)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">fnol</text>
                </g>
                <g className="irv-tag--set" transform="translate(307 122)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">settled</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THE PROBLEM ================= */}
        {/* DRAFT — marketing review: pain points paraphrased from flowx.ai/insurance */}
        <section className="section" id="problem">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / The problem</span>
              <div className="section__headline">
                <h2 className="h2 rv">Where insurance leaks time<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Fragmented data and manual reviews —
                  the claim is decided long before anyone decides it.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <h3 className="seg__name">Fragmented data</h3>
                <p className="seg__desc">Policy, claims, and telematics live in different systems — underwriters stitch them together by hand.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <h3 className="seg__name">Manual reviews</h3>
                <p className="seg__desc">Every claim above the threshold waits for a reviewer — including the majority that are routine.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <h3 className="seg__name">Exceptions everywhere</h3>
                <p className="seg__desc">Fraud signals hide in the noise, and exception handling swallows adjuster capacity.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= VALUE STREAM + WHO IT'S FOR ================= */}
        <section className="section" id="value-stream">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Value stream</span>
              <div className="section__headline">
                <h2 className="h2 rv">The claims journey, end to end<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>From first notice of loss to settlement —
                  agents for carriers, brokers, and reinsurers at every step. Hover a role below to
                  see where its agents sit.</p>
              </div>
            </div>

            <figure className="vs rv" style={{ '--i': 2 }} role="img" aria-label="Claims journey pipeline: FNOL, docs, assess, decide, settle — with agents attached to each stage">
              <div className="vs__bar mono"><span>insurance / claims journey</span><span className="vs__live"><i />agents live</span></div>
              <div className="vs__scroll">
                <svg viewBox="0 0 960 216" aria-hidden="true">
                  <path id="insSpine" className="abx-edge" d="M20 59 H940" />
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#insSpine" /></animateMotion></circle>
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#insSpine" /></animateMotion></circle>
                  <g className="vs-stage" data-stage="fnol">
                    <rect className="abx-node" x="20" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="36" y="64">fnol</text>
                    <text className="abx-sub" x="132" y="64">01</text>
                  </g>
                  <g className="vs-stage" data-stage="docs">
                    <rect className="abx-node" x="210" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="226" y="64">docs</text>
                    <text className="abx-sub" x="322" y="64">02</text>
                    <path className="abx-edge" d="M290 82 C290 112 296 128 296 148" />
                    <rect className="abx-chip" x="222" y="148" width="150" height="38" rx="9" />
                    <text className="abx-label" x="238" y="171">doc-completeness</text>
                  </g>
                  <g className="vs-stage vs-stage--live" data-stage="assess">
                    <rect className="abx-node abx-node--live" x="400" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label abx-label--live" x="416" y="64">assess</text>
                    <circle className="abx-dot--live" cx="540" cy="59" r="4" />
                    <path className="abx-edge" d="M480 82 C480 112 486 128 486 148" />
                    <rect className="abx-chip abx-chip--pick" x="398" y="148" width="176" height="38" rx="9" />
                    <text className="abx-label abx-label--live" x="414" y="171">damage-extraction +5</text>
                  </g>
                  <g className="vs-stage" data-stage="decide">
                    <rect className="abx-node" x="590" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="606" y="64">decide</text>
                    <text className="abx-sub" x="702" y="64">04</text>
                    <path className="abx-edge" d="M670 82 C670 112 676 128 676 148" />
                    <rect className="abx-chip" x="606" y="148" width="140" height="38" rx="9" />
                    <text className="abx-label" x="622" y="171">fraud-signals</text>
                  </g>
                  <g className="vs-stage" data-stage="settle">
                    <rect className="abx-node" x="780" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="796" y="64">settle</text>
                    <text className="abx-sub" x="892" y="64">05</text>
                  </g>
                </svg>
              </div>
            </figure>

            <div className="section__subhead">
              <span className="section__subhead__eyebrow mono rv">Who it&apos;s for</span>
              <h3 className="section__subhead__title rv" style={{ '--i': 1 }}>Built for every side of the risk<span className="amber">.</span></h3>
            </div>

            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }} data-stages="fnol docs assess decide settle">
                <h3 className="seg__name">Insurers &amp; Carriers</h3>
                <p className="seg__desc">Core operational agents for insurance companies managing policies and claims directly.</p>
                <ul className="seg__chips mono">
                  <li>Policy onboarding</li>
                  <li>Claims processing</li>
                  <li>Underwriting assessment</li>
                  <li>Fraud detection &amp; alerting</li>
                  <li>Regulatory &amp; Compliance</li>
                  <li>Complaints &amp; disputes</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 1 }} data-stages="fnol docs settle">
                <h3 className="seg__name">Brokers</h3>
                <p className="seg__desc">Agents focused on distribution, client management, and sales optimization.</p>
                <ul className="seg__chips mono">
                  <li>Distribution</li>
                  <li>Renewals &amp; Upsell</li>
                  <li>Policy onboarding</li>
                  <li>Complaints &amp; disputes</li>
                  <li>Regulatory &amp; Compliance</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 2 }} data-stages="assess decide">
                <h3 className="seg__name">Reinsurance</h3>
                <p className="seg__desc">Agents tailored for risk transfer, treaty management, and portfolio analysis.</p>
                <ul className="seg__chips mono">
                  <li>Reinsurance coordination</li>
                  <li>Underwriting assessment</li>
                  <li>Fraud detection &amp; alerting</li>
                  <li>Regulatory &amp; Compliance</li>
                  <li>Claims processing</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ================= FEATURED AGENTS ================= */}
        <section className="section" id="featured">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Featured</span>
              <div className="section__headline">
                <h2 className="h2 rv">Featured agents, up close<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Eight insurance agents — what each one watches,
                  decides, and hands back to your team.</p>
              </div>
            </div>

            {/* DRAFT — marketing review: micro-visual data invented */}
            <div className="abento">
              <article className="fcard fcard--3 rv" style={{ '--i': 0 }}>
                <h3 className="fcard__name mono">quote-optimization</h3>
                <p className="fcard__desc">Tunes quote pricing against bind probability and portfolio targets.</p>
                <div className="fviz fviz--rate mono" aria-hidden="true">
                  <span className="fviz__big"><span className="amber">$</span><span>1,284</span>/yr</span>
                  <span className="fviz__ctx">motor · bind probability 68%</span>
                </div>
              </article>
              <article className="fcard fcard--3 rv" style={{ '--i': 1 }}>
                <h3 className="fcard__name mono">premium-change-explainer</h3>
                <p className="fcard__desc">Explains premium changes in plain language, from rating factors to renewal letters.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>premium <em className="amber">+$112</em></span>
                  <span>driver added · age band</span>
                  <span>letter drafted <em>ready</em></span>
                </div>
              </article>

              <article className="fcard fcard--2 rv" style={{ '--i': 2 }}>
                <h3 className="fcard__name mono">telematics-interpreter</h3>
                <p className="fcard__desc">Turns raw telematics streams into underwriting-ready risk scores.</p>
                <div className="fviz fviz--bars" aria-hidden="true">
                  <i style={{ '--h': '38%' }} /><i style={{ '--h': '52%' }} /><i style={{ '--h': '44%' }} /><i className="on" style={{ '--h': '81%' }} /><i style={{ '--h': '60%' }} /><i style={{ '--h': '47%' }} /><i style={{ '--h': '69%' }} />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 3 }}>
                <h3 className="fcard__name mono">commission-rule-validation</h3>
                <p className="fcard__desc">Validates incentive and commission calculations against distributor contracts.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>statements checked <em>412</em></span>
                  <span>mismatches <em className="amber">3</em></span>
                  <span>recovered <em>$8.2k</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 4 }}>
                <h3 className="fcard__name mono">contract-compliance-checker</h3>
                <p className="fcard__desc">Checks distributor contracts for clauses that drift from the approved playbook.</p>
                <div className="fviz fviz--risk mono" aria-hidden="true">
                  <span>policy drift · 0.18</span>
                  <div className="fviz__meter"><i style={{ '--w': '18%' }} /></div>
                  <span className="fviz__ctx">recommend: legal review §7.2</span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 5 }}>
                <h3 className="fcard__name mono">sales-script-compliance</h3>
                <p className="fcard__desc">Reviews recorded sales calls against script and suitability requirements.</p>
                <div className="fviz fviz--dots mono" aria-hidden="true">
                  <span>call</span><i className="on" /><i /><i className="on" /><i className="on" /><i /><i className="on" /><i /><i className="on" />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 6 }}>
                <h3 className="fcard__name mono">cross-sell-trigger</h3>
                <p className="fcard__desc">Spots life events and coverage gaps that warrant a cross-sell conversation.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>P-8841 · new home <em className="amber">trigger</em></span>
                  <span>coverage gap · contents</span>
                  <span>next best action <em>queued</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 7 }}>
                <h3 className="fcard__name mono">suitability-validator</h3>
                <p className="fcard__desc">Validates product recommendations against customer profile and regulation.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>profile match <em>0.91</em></span>
                  <span>regulation check <em>pass</em></span>
                  <span>re-match suggested <em className="amber">1</em></span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= WORKFLOWS ================= */}
        {/* DRAFT — marketing review: descriptions paraphrased from flowx.ai/insurance */}
        <section className="section" id="workflows">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">04 / Workflows</span>
              <div className="section__headline">
                <h2 className="h2 rv">Three workflows, mission-critical<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Where insurance agent stacks go to work first.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Underwriting</h3>
                <p className="seg__desc">Agents assemble the risk picture from fragmented sources so underwriters price with the full file.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Claims Processing</h3>
                <p className="seg__desc">Routine claims move straight through — documents checked, damage assessed, settlement queued.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Fraud Detection</h3>
                <p className="seg__desc">Signals surface early with the evidence attached, instead of at the bottom of an exception queue.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">05 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Put agents on your</span>
              <span className="rv" style={{ '--i': 1 }}>claims journey<span className="amber">.</span></span>
            </h2>
            <div className="cta__row rv" style={{ '--i': 2 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
              <a className="btn btn--ghost btn--lg" href="/#hero">Compile your own agent</a>
            </div>
          </div>
        </section>
      </main>
      <IndustryInit />
    </>
  );
}
