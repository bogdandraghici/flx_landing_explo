import { bp } from '@/components/lib/base';
import IndustryInit from '@/components/IndustryInit';

export const metadata = {
  title: 'FlowX — Banking',
  description: 'FlowX.AI banking agents on the lending journey — onboarding & KYC, underwriting, and financial insights, for retail, commercial, and risk & compliance teams.',
};

export default function Banking() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        <section className="ahero" id="ihero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Industries · Banking
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Banking agents, on the lending journey<span className="amber">.</span></span>
              </h1>
              {/* DRAFT — marketing review */}
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                From first application to funded account — agents attach to every
                stage of origination, onboarding, and risk. Built for banks where
                failure is not an option.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>220+</b> agents</span>
                <span><b>3</b> industries</span>
                <span><b className="amber">●</b> in production</span>
              </p>
            </div>

            {/* loan funnel: applications from every channel drop into the funnel and narrow through
                 the verification stages; one jams at the neck (flagged), the agent clears it, the neck
                 opens amber, the queue drains, and the funded balance fills one landing at a time */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="Loan applications from every channel drop into an origination funnel and narrow through docs, KYC, bureau and income checks; one jams at the neck and is flagged, then the agent clears it — the neck opens, the queue drains, and the account balance fills: cleared, funded">
                {/* intake: three origination channels drop into the funnel mouth */}
                <circle className="bkg-src" cx="118" cy="52" r="2.6" />
                <circle className="bkg-src" cx="230" cy="44" r="2.6" />
                <circle className="bkg-src" cx="342" cy="52" r="2.6" />
                <text className="ivz-lbl" x="118" y="38" textAnchor="middle">branch</text>
                <text className="ivz-lbl" x="230" y="30" textAnchor="middle">web</text>
                <text className="ivz-lbl" x="342" y="38" textAnchor="middle">api</text>
                <path className="bkg-guide" d="M118 52 Q150 92 230 116" />
                <path className="bkg-guide" d="M230 44 L230 116" />
                <path className="bkg-guide" d="M342 52 Q310 92 230 116" />

                {/* invisible motion rails: each channel drops in, descends the funnel centreline to its
                     place in the queue above the neck, holds, then pours through into the account */}
                <path id="bkgRunW" fill="none" stroke="none" d="M230 44 L230 286 L230 342" />
                <path id="bkgRunB" fill="none" stroke="none" d="M118 52 Q160 92 230 120 L230 266 L230 342" />
                <path id="bkgRunA" fill="none" stroke="none" d="M342 52 Q300 92 230 120 L230 246 L230 342" />

                {/* faint funnel-mouth rim + interior stage gradations */}
                <line className="bkg-rim" x1="96" y1="120" x2="364" y2="120" />
                <line className="bkg-level" x1="122.5" y1="158" x2="337.5" y2="158" />
                <line className="bkg-level" x1="149" y1="196" x2="311" y2="196" />
                <line className="bkg-level" x1="175.5" y1="234" x2="284.5" y2="234" />
                <line className="bkg-level" x1="202" y1="272" x2="258" y2="272" />

                {/* the funnel: the strong central form — walls narrowing to a neck + spout */}
                <path className="bkg-wall" d="M96 120 L216 292" />
                <path className="bkg-wall" d="M364 120 L244 292" />
                <line className="bkg-spout" x1="216" y1="292" x2="216" y2="316" />
                <line className="bkg-spout" x1="244" y1="292" x2="244" y2="316" />
                {/* amber neck: the resolution — the spout runs amber once the jam clears */}
                <line className="bkg-spout-hot" x1="216" y1="292" x2="216" y2="316" />
                <line className="bkg-spout-hot" x1="244" y1="292" x2="244" y2="316" />

                {/* stage labels riding the funnel walls */}
                <text className="ivz-lbl" x="114" y="161" textAnchor="end">docs</text>
                <text className="ivz-lbl" x="140" y="199" textAnchor="end">kyc</text>
                <text className="ivz-lbl" x="167" y="237" textAnchor="end">bureau</text>
                <text className="ivz-lbl" x="193" y="275" textAnchor="end">income</text>
                <text className="ivz-lbl" x="346" y="161" textAnchor="start">01</text>
                <text className="ivz-lbl" x="320" y="199" textAnchor="start">02</text>
                <text className="ivz-lbl" x="293" y="237" textAnchor="start">03</text>
                <text className="ivz-lbl" x="267" y="275" textAnchor="start">04</text>

                {/* applications: three files drop in, stack at the neck (the jam), then pour through */}
                <g className="bkg-dot"><circle r="3" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;0.815;0.815;1;1" keyTimes="0;0.02;0.25;0.575;0.615;1"><mpath href="#bkgRunW" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.02;0.03;0.61;0.62;1" dur="12s" repeatCount="indefinite" />
                </g>
                <g className="bkg-dot"><circle r="3" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;0.788;0.788;1;1" keyTimes="0;0.10;0.34;0.60;0.655;1"><mpath href="#bkgRunB" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.10;0.11;0.65;0.66;1" dur="12s" repeatCount="indefinite" />
                </g>
                <g className="bkg-dot"><circle r="3" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;0.733;0.733;1;1" keyTimes="0;0.18;0.42;0.625;0.685;1"><mpath href="#bkgRunA" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.18;0.19;0.68;0.69;1" dur="12s" repeatCount="indefinite" />
                </g>

                {/* the jam: the neck plugs, flares, and is flagged until the agent clears it */}
                <line className="bkg-plug" x1="214" y1="290" x2="246" y2="290" />
                <circle className="bkg-flash" cx="230" cy="289" r="7" />
                <g className="bkg-tag--flag" transform="translate(316 258)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">flagged</text>
                </g>
                <g className="bkg-tag--ok" transform="translate(316 258)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">cleared</text>
                </g>

                {/* the funded account: the balance steps up as each application lands */}
                <rect className="bkg-card" x="158" y="344" width="144" height="48" rx="10" />
                <rect className="bkg-title" x="174" y="356" width="44" height="6" rx="3" />
                <line className="bkg-line" x1="174" y1="376" x2="286" y2="376" />
                <line className="bkg-fill" x1="174" y1="376" x2="286" y2="376" />
                <circle className="bkg-arr" cx="230" cy="344" r="8" />
                <line className="bkg-ground" x1="120" y1="404" x2="340" y2="404" />
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THE PROBLEM ================= */}
        {/* DRAFT — marketing review: pain points paraphrased from flowx.ai/banking */}
        <section className="section" id="problem">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / The problem</span>
              <div className="section__headline">
                <h2 className="h2 rv">Where banking leaks time<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>The bottleneck isn&apos;t ambition —
                  it&apos;s the manual handoffs between systems that were never meant to talk.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <h3 className="seg__name">Onboarding that stalls</h3>
                <p className="seg__desc">KYC and onboarding drag across days of manual checks — customers wait while documents bounce between teams.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <h3 className="seg__name">Lending bottlenecks</h3>
                <p className="seg__desc">Underwriting queues grow faster than headcount. Every exception is a handoff, and every handoff is a day.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <h3 className="seg__name">Reporting overhead</h3>
                <p className="seg__desc">Financial reporting eats analyst time reconciling numbers across systems instead of explaining them.</p>
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
                <h2 className="h2 rv">The lending journey, end to end<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>From first application to funded account —
                  agents attach to every stage of origination, onboarding, and risk. Hover a role
                  below to see where its agents sit.</p>
              </div>
            </div>

            <figure className="vs rv" style={{ '--i': 2 }} role="img" aria-label="Lending journey pipeline: apply, verify, underwrite, decide, onboard — with agents attached to each stage">
              <div className="vs__bar mono"><span>banking / lending journey</span><span className="vs__live"><i />agents live</span></div>
              <div className="vs__scroll">
                <svg viewBox="0 0 960 216" aria-hidden="true">
                  <path id="bkSpine" className="abx-edge" d="M20 59 H940" />
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#bkSpine" /></animateMotion></circle>
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#bkSpine" /></animateMotion></circle>
                  <g className="vs-stage" data-stage="apply">
                    <rect className="abx-node" x="20" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="36" y="64">apply</text>
                    <text className="abx-sub" x="132" y="64">01</text>
                  </g>
                  <g className="vs-stage" data-stage="verify">
                    <rect className="abx-node" x="210" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="226" y="64">verify</text>
                    <text className="abx-sub" x="322" y="64">02</text>
                    <path className="abx-edge" d="M290 82 C290 112 296 128 296 148" />
                    <rect className="abx-chip" x="222" y="148" width="150" height="38" rx="9" />
                    <text className="abx-label" x="238" y="171">doc-completeness</text>
                  </g>
                  <g className="vs-stage vs-stage--live" data-stage="underwrite">
                    <rect className="abx-node abx-node--live" x="400" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label abx-label--live" x="416" y="64">underwrite</text>
                    <circle className="abx-dot--live" cx="540" cy="59" r="4" />
                    <path className="abx-edge" d="M480 82 C480 112 486 128 486 148" />
                    <rect className="abx-chip abx-chip--pick" x="404" y="148" width="164" height="38" rx="9" />
                    <text className="abx-label abx-label--live" x="420" y="171">income-analysis +8</text>
                  </g>
                  <g className="vs-stage" data-stage="decide">
                    <rect className="abx-node" x="590" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="606" y="64">decide</text>
                    <text className="abx-sub" x="702" y="64">04</text>
                    <path className="abx-edge" d="M670 82 C670 112 676 128 676 148" />
                    <rect className="abx-chip" x="602" y="148" width="148" height="38" rx="9" />
                    <text className="abx-label" x="618" y="171">collateral-check</text>
                  </g>
                  <g className="vs-stage" data-stage="onboard">
                    <rect className="abx-node" x="780" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="796" y="64">onboard</text>
                    <text className="abx-sub" x="892" y="64">05</text>
                  </g>
                </svg>
              </div>
            </figure>

            <div className="section__subhead">
              <span className="section__subhead__eyebrow mono rv">Who it&apos;s for</span>
              <h3 className="section__subhead__title rv" style={{ '--i': 1 }}>Built for every banking desk<span className="amber">.</span></h3>
            </div>

            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }} data-stages="apply underwrite onboard">
                <h3 className="seg__name">Retail Banking</h3>
                <p className="seg__desc">Agents for high-volume customer journeys; from mortgage origination to account opening and customer retention.</p>
                <ul className="seg__chips mono">
                  <li>Retail mortgage underwriting</li>
                  <li>Customer churn &amp; retention</li>
                  <li>Quick wins</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 1 }} data-stages="apply verify decide">
                <h3 className="seg__name">Commercial &amp; Corporate Banking</h3>
                <p className="seg__desc">End-to-end automation for commercial lending, corporate onboarding, SME underwriting, and trade finance operations.</p>
                <ul className="seg__chips mono">
                  <li>Commercial onboarding</li>
                  <li>Corporate account opening</li>
                  <li>Commercial lending</li>
                  <li>Trade finance invoice factoring</li>
                  <li>SME/Corporate underwriting financial insights</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 2 }} data-stages="verify decide">
                <h3 className="seg__name">Risk &amp; Compliance</h3>
                <p className="seg__desc">Production-ready agents for fraud investigation, AML/KYC checks, financial crime risk assessment, and regulatory processing.</p>
                <ul className="seg__chips mono">
                  <li>Fraud investigation</li>
                  <li>AML &amp; KYC</li>
                  <li>Garnishment processing</li>
                  <li>Financial crime risk assessment</li>
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
                <p className="section__lede rv" style={{ '--i': 1 }}>Nine banking agents — what each one watches,
                  decides, and hands back to your team.</p>
              </div>
            </div>

            {/* DRAFT — marketing review: micro-visual data invented */}
            <div className="abento">
              <article className="fcard fcard--3 rv" style={{ '--i': 0 }}>
                <h3 className="fcard__name mono">false-positive-screener</h3>
                <p className="fcard__desc">Reasons through transaction context to filter obvious false positives before human review</p>
                <div className="fviz fviz--feed mono" id="fpsFeed" aria-hidden="true" />
              </article>
              <article className="fcard fcard--3 rv" style={{ '--i': 1 }}>
                <h3 className="fcard__name mono">sar-report-compiler</h3>
                <p className="fcard__desc">Drafts suspicious-activity reports from case evidence, ready for compliance review.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>case 4471-A · draft ready <em className="amber">6 min</em></span>
                  <span>sections auto-filled <em>11/13</em></span>
                  <span>reviewer edits <em>−72%</em></span>
                </div>
              </article>

              <article className="fcard fcard--2 rv" style={{ '--i': 2 }}>
                <h3 className="fcard__name mono">alert-triage</h3>
                <p className="fcard__desc">Ranks incoming alerts by risk so analysts open the ones that matter first.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>ALR-2210 · low risk <em>closed</em></span>
                  <span>ALR-2214 · duplicate <em>merged</em></span>
                  <span>ALR-2216 · pattern hit <em className="amber">escalated</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 3 }}>
                <h3 className="fcard__name mono">case-narrative-generator</h3>
                <p className="fcard__desc">Writes the case narrative from transaction history and analyst notes.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>sources cited <em>14</em></span>
                  <span>timeline attached <em>yes</em></span>
                  <span>review status <em className="amber">ready</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 4 }}>
                <h3 className="fcard__name mono">timeline-generator</h3>
                <p className="fcard__desc">Reconstructs event timelines across accounts and counterparties.</p>
                <div className="fviz fviz--dots mono" aria-hidden="true">
                  <span>evt</span><i /><i className="on" /><i /><i className="on" /><i className="on" /><i /><i /><i className="on" />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 5 }}>
                <h3 className="fcard__name mono">evidence-compiler</h3>
                <p className="fcard__desc">Gathers statements, logs, and documents into one indexed evidence pack.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>documents pulled <em>27</em></span>
                  <span>duplicates removed <em>9</em></span>
                  <span>pack indexed <em className="amber">done</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 6 }}>
                <h3 className="fcard__name mono">business-activity-classification</h3>
                <p className="fcard__desc">Classifies counterparty business activity for KYC risk scoring.</p>
                <div className="fviz fviz--bars" aria-hidden="true">
                  <i style={{ '--h': '42%' }} /><i style={{ '--h': '66%' }} /><i className="on" style={{ '--h': '84%' }} /><i style={{ '--h': '31%' }} /><i style={{ '--h': '57%' }} /><i style={{ '--h': '48%' }} /><i style={{ '--h': '73%' }} />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 7 }}>
                <h3 className="fcard__name mono">legal-contract-drafting</h3>
                <p className="fcard__desc">Drafts standard clauses from term sheets, flagging deviations from policy.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>clauses drafted <em>18</em></span>
                  <span>deviations flagged <em className="amber">2</em></span>
                  <span>playbook match <em>96%</em></span>
                </div>
              </article>

              <article className="fcard fcard--6 fcard--wave rv" style={{ '--i': 8 }}>
                <div>
                  <h3 className="fcard__name mono">voice-call-transcriber</h3>
                  <p className="fcard__desc">Converts MP3 call recordings to searchable timestamped transcripts with keyword indexing</p>
                  <p className="fviz__ctx mono">00:03:12 — “…confirm the delivery window for Thursday…”</p>
                </div>
                <div className="fviz fviz--wave" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= WORKFLOWS ================= */}
        {/* DRAFT — marketing review: descriptions paraphrased from flowx.ai/banking */}
        <section className="section" id="workflows">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">04 / Workflows</span>
              <div className="section__headline">
                <h2 className="h2 rv">Three workflows, mission-critical<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Where banking agent stacks go to work first.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Onboarding &amp; KYC</h3>
                <p className="seg__desc">Agents verify identity, screen documents, and assemble the case file before a human ever opens it.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Underwriting</h3>
                <p className="seg__desc">Income analysis, collateral checks, and policy pricing run in parallel — the underwriter reviews instead of retyping.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Financial Insights</h3>
                <p className="seg__desc">Agents reconcile positions and draft reports with sources attached, on schedule.</p>
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
              <span className="rv" style={{ '--i': 1 }}>lending journey<span className="amber">.</span></span>
            </h2>
            <div className="cta__row rv" style={{ '--i': 2 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
              <a className="btn btn--ghost btn--lg" href={bp("/#hero")}>Compile your own agent</a>
            </div>
          </div>
        </section>
      </main>
      <IndustryInit />
    </>
  );
}
