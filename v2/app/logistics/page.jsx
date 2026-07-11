import { bp } from '@/components/lib/base';
import IndustryInit from '@/components/IndustryInit';

export const metadata = {
  title: 'FlowX — Logistics',
  description: 'FlowX.AI logistics agents on the freight lifecycle — network optimization, load processing, and billing reconciliation, for carriers, 3PLs, brokers, forwarders, and shippers.',
};

export default function Logistics() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        <section className="ahero" id="ihero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Industries · Logistics
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Logistics agents, on the freight lifecycle<span className="amber">.</span></span>
              </h1>
              {/* DRAFT — marketing review */}
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                From quote to invoice — agents for carriers, 3PLs, brokers,
                forwarders, and shippers along the whole move. Built for networks
                where failure is not an option.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>220+</b> agents</span>
                <span><b>3</b> industries</span>
                <span><b className="amber">●</b> in production</span>
              </p>
            </div>

            {/* reroute: the planned route breaks mid-journey; the agent recomputes, an amber detour draws, the shipment still arrives — invoiced */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="A freight network where a leg of the planned route fails mid-journey; the agent instantly draws an amber detour and the shipment still arrives — rerouted, invoiced">
                {/* the wider network the planner knows about */}
                <line className="lrv-alt" x1="64" y1="300" x2="96" y2="208" />
                <line className="lrv-alt" x1="96" y1="208" x2="104" y2="120" />
                <line className="lrv-alt" x1="104" y1="120" x2="226" y2="96" />
                <line className="lrv-alt" x1="226" y1="96" x2="356" y2="96" />
                <line className="lrv-alt" x1="226" y1="96" x2="248" y2="220" />
                <line className="lrv-alt" x1="356" y1="96" x2="330" y2="180" />
                <line className="lrv-alt" x1="356" y1="96" x2="398" y2="262" />
                <line className="lrv-alt" x1="96" y1="208" x2="150" y2="244" />
                <line className="lrv-alt" x1="64" y1="300" x2="156" y2="368" />
                <line className="lrv-alt" x1="156" y1="368" x2="262" y2="398" />
                <line className="lrv-alt lrv-alt--scan" x1="262" y1="398" x2="352" y2="310" />
                <line className="lrv-alt lrv-alt--scan" x1="156" y1="368" x2="284" y2="290" />
                <line className="lrv-alt lrv-alt--scan" x1="150" y1="244" x2="284" y2="290" />
                <line className="lrv-alt" x1="248" y1="220" x2="284" y2="290" />
                <line className="lrv-alt" x1="284" y1="290" x2="352" y2="310" />
                <line className="lrv-alt" x1="352" y1="310" x2="398" y2="262" />

                {/* the planned route: drawn at dispatch; the leg past the break dims when it fails */}
                <path className="lrv-plan lrv-plan-a" pathLength="100" d="M64 300 L150 244 L248 220" />
                <path className="lrv-plan lrv-plan-b" pathLength="100" d="M248 220 L330 180 L398 262" />

                {/* the break: flash + mark on the dead leg */}
                <circle className="lrv-flash" cx="289" cy="200" r="9" />
                <g className="lrv-x">
                  <line x1="284" y1="195" x2="294" y2="205" />
                  <line x1="294" y1="195" x2="284" y2="205" />
                </g>

                {/* the agent's fix: the amber detour, drawn the moment the leg dies */}
                <path className="lrv-detour" pathLength="100" d="M248 220 L284 290 L352 310 L398 262" />

                {/* nodes */}
                <circle className="lrv-node" cx="150" cy="244" r="3" />
                <circle className="lrv-node" cx="248" cy="220" r="3" />
                <circle className="lrv-node" cx="330" cy="180" r="3" />
                <circle className="lrv-node" cx="284" cy="290" r="3" />
                <circle className="lrv-node" cx="352" cy="310" r="3" />
                <circle className="lrv-node" cx="96" cy="208" r="3" />
                <circle className="lrv-node" cx="104" cy="120" r="3" />
                <circle className="lrv-node" cx="226" cy="96" r="3" />
                <circle className="lrv-node" cx="356" cy="96" r="3" />
                <circle className="lrv-node" cx="156" cy="368" r="3" />
                <circle className="lrv-node" cx="262" cy="398" r="3" />
                <circle className="lrv-node lrv-node--end" cx="64" cy="300" r="3.4" />
                <circle className="lrv-ring" cx="64" cy="300" r="7" />
                <circle className="lrv-node lrv-node--end" cx="398" cy="262" r="3.4" />
                <circle className="lrv-ring" cx="398" cy="262" r="7" />

                {/* endpoints named in the page's own words */}
                <text className="ivz-lbl" x="64" y="326" textAnchor="middle">quote</text>
                <rect className="ivz-tag" x="367" y="234" width="62" height="14" />
                <text className="ivz-lbl" x="398" y="244" textAnchor="middle">invoice</text>

                {/* ambient traffic on a northern lane: the network never sleeps */}
                <circle className="lrv-amb" r="2.2">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M104 120 L226 96 L356 96" />
                  <animate attributeName="opacity" values="0;0.35;0.35;0" keyTimes="0;0.08;0.9;1" dur="9s" repeatCount="indefinite" />
                </circle>

                {/* the shipment: departs, halts at the break, takes the detour, arrives */}
                <circle className="lrv-dot" r="3.4">
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear"
                    keyPoints="0;0;0.4851;0.4851;1;1" keyTimes="0;0.12;0.34;0.50;0.76;1"
                    path="M64 300 L150 244 L248 220 L284 290 L352 310 L398 262" />
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.115;0.125;0.765;0.80;1" dur="12s" repeatCount="indefinite" />
                </circle>
                <circle className="lrv-arrive" cx="398" cy="262" r="9">
                  <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.76;0.79;0.87;1" dur="12s" repeatCount="indefinite" />
                </circle>

                {/* status tags */}
                <g className="lrv-tag--ex" transform="translate(289 154)">
                  <rect className="ivz-tag" x="-36" y="-10" width="72" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">exception</text>
                </g>
                <g className="lrv-tag--re" transform="translate(318 342)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">rerouted</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THE PROBLEM ================= */}
        {/* DRAFT — marketing review: pain points paraphrased from flowx.ai/logistics */}
        <section className="section" id="problem">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / The problem</span>
              <div className="section__headline">
                <h2 className="h2 rv">Where logistics leaks margin<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>The network moves faster than the back office that runs it.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <h3 className="seg__name">Stale network decisions</h3>
                <p className="seg__desc">Capacity and routing decisions lag the conditions on the ground — by the time the plan lands, the lane has moved.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <h3 className="seg__name">Manual load processing</h3>
                <p className="seg__desc">Tenders, confirmations, and exceptions still move through inboxes — one load at a time.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <h3 className="seg__name">Billing disputes</h3>
                <p className="seg__desc">Rate mismatches surface at invoice time — as revenue leakage, disputes, and days of reconciliation.</p>
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
                <h2 className="h2 rv">The freight lifecycle, end to end<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>From quote to invoice — agents for carriers,
                  3PLs, brokers, forwarders, and shippers along the whole move. Hover a role below to
                  see where its agents sit.</p>
              </div>
            </div>

            <figure className="vs rv" style={{ '--i': 2 }} role="img" aria-label="Freight lifecycle pipeline: quote, book, move, deliver, invoice — with agents attached to each stage">
              <div className="vs__bar mono"><span>logistics / freight lifecycle</span><span className="vs__live"><i />agents live</span></div>
              <div className="vs__scroll">
                <svg viewBox="0 0 960 216" aria-hidden="true">
                  <path id="lgSpine" className="abx-edge" d="M20 59 H940" />
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#lgSpine" /></animateMotion></circle>
                  <circle className="abx-pulse" r="2.6"><animateMotion dur="6s" begin="3s" repeatCount="indefinite"><mpath href="#lgSpine" /></animateMotion></circle>
                  <g className="vs-stage" data-stage="quote">
                    <rect className="abx-node" x="20" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="36" y="64">quote</text>
                    <text className="abx-sub" x="132" y="64">01</text>
                    <path className="abx-edge" d="M100 82 C100 112 106 128 106 148" />
                    <rect className="abx-chip" x="28" y="148" width="140" height="38" rx="9" />
                    <text className="abx-label" x="44" y="171">smart-quoting</text>
                  </g>
                  <g className="vs-stage" data-stage="book">
                    <rect className="abx-node" x="210" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="226" y="64">book</text>
                    <text className="abx-sub" x="322" y="64">02</text>
                  </g>
                  <g className="vs-stage" data-stage="move">
                    <rect className="abx-node" x="400" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="416" y="64">move</text>
                    <text className="abx-sub" x="512" y="64">03</text>
                    <path className="abx-edge" d="M480 82 C480 112 486 128 486 148" />
                    <rect className="abx-chip" x="412" y="148" width="136" height="38" rx="9" />
                    <text className="abx-label" x="428" y="171">track-trace</text>
                  </g>
                  <g className="vs-stage" data-stage="deliver">
                    <rect className="abx-node" x="590" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label" x="606" y="64">deliver</text>
                    <text className="abx-sub" x="702" y="64">04</text>
                  </g>
                  <g className="vs-stage vs-stage--live" data-stage="invoice">
                    <rect className="abx-node abx-node--live" x="780" y="36" width="160" height="46" rx="10" />
                    <text className="abx-label abx-label--live" x="796" y="64">invoice</text>
                    <circle className="abx-dot--live" cx="920" cy="59" r="4" />
                    <path className="abx-edge" d="M860 82 C860 112 854 128 854 148" />
                    <rect className="abx-chip abx-chip--pick" x="760" y="148" width="182" height="38" rx="9" />
                    <text className="abx-label abx-label--live" x="776" y="171">invoice-recon +3</text>
                  </g>
                </svg>
              </div>
            </figure>

            <div className="section__subhead">
              <span className="section__subhead__eyebrow mono rv">Who it&apos;s for</span>
              <h3 className="section__subhead__title rv" style={{ '--i': 1 }}>Built for every link in the chain<span className="amber">.</span></h3>
            </div>

            <div className="segs segs--5">
              {/* DRAFT — marketing review: the five logistics segment descriptions are invented (source has none) */}
              <article className="seg rv" style={{ '--i': 0 }} data-stages="move deliver invoice">
                <h3 className="seg__name">Carriers</h3>
                <p className="seg__desc">Agents that keep fleets moving — maintenance, fuel, pricing, and safety, without the back office drag.</p>
                <ul className="seg__chips mono">
                  <li>Fleet optimization</li>
                  <li>Predictive maintenance</li>
                  <li>Load entry</li>
                  <li>Fuel efficiency</li>
                  <li>Compliance &amp; safety</li>
                  <li>Dynamic pricing</li>
                  <li>Invoicing</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 1 }} data-stages="quote book move invoice">
                <h3 className="seg__name">3PLs</h3>
                <p className="seg__desc">Agents that orchestrate inventory, routing, and customer commitments across the network.</p>
                <ul className="seg__chips mono">
                  <li>Inventory optimization</li>
                  <li>Dynamic routing</li>
                  <li>Load entry</li>
                  <li>Smart quoting</li>
                  <li>Invoice reconciliation</li>
                  <li>Customer service</li>
                  <li>Exception management</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 2 }} data-stages="quote book invoice">
                <h3 className="seg__name">Brokers</h3>
                <p className="seg__desc">Agents that quote faster, match carriers smarter, and keep every margin visible.</p>
                <ul className="seg__chips mono">
                  <li>Smart quoting</li>
                  <li>Carrier matching</li>
                  <li>Load entry</li>
                  <li>Invoice reconciliation</li>
                  <li>Inbox management</li>
                  <li>Performance analysis</li>
                  <li>Customs validation</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 3 }} data-stages="quote move deliver">
                <h3 className="seg__name">Forwarders</h3>
                <p className="seg__desc">Agents for cross-border moves — customs, compliance, and landed-cost certainty.</p>
                <ul className="seg__chips mono">
                  <li>Customs validation</li>
                  <li>Smart quoting</li>
                  <li>Risk &amp; compliance</li>
                  <li>Invoice reconciliation</li>
                  <li>Cost prediction</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 4 }} data-stages="quote book invoice">
                <h3 className="seg__name">Shippers</h3>
                <p className="seg__desc">Agents that put tendering, quoting, and freight-spend reconciliation on autopilot.</p>
                <ul className="seg__chips mono">
                  <li>Load tendering</li>
                  <li>Freight quoting</li>
                  <li>Invoice reconciliation</li>
                  <li>Demand forecasting</li>
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
                <p className="section__lede rv" style={{ '--i': 1 }}>Eight logistics agents — what each one watches,
                  decides, and hands back to your team.</p>
              </div>
            </div>

            {/* DRAFT — marketing review: micro-visual data invented */}
            <div className="abento">
              <article className="fcard fcard--3 rv" style={{ '--i': 0 }}>
                <h3 className="fcard__name mono">rate-optimization</h3>
                <p className="fcard__desc">Calculates optimal bid prices based on demand, distance, and target margin.</p>
                <div className="fviz fviz--rate mono" aria-hidden="true">
                  <span className="fviz__big"><span className="amber">$</span><span id="rateVal">2.41</span>/mi</span>
                  <span className="fviz__ctx">lane CHI→DAL · target margin 14%</span>
                </div>
              </article>
              <article className="fcard fcard--3 rv" style={{ '--i': 1 }}>
                <h3 className="fcard__name mono">route-optimization</h3>
                <p className="fcard__desc">Rebalances routes against live demand, weather, and capacity constraints.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>lane CHI→DAL · reroute <em className="amber">−3.2h</em></span>
                  <span>fuel delta <em>−4%</em></span>
                  <span>utilization <em>91%</em></span>
                </div>
              </article>

              <article className="fcard fcard--2 rv" style={{ '--i': 2 }}>
                <h3 className="fcard__name mono">smart-quoting-margin-performance</h3>
                <p className="fcard__desc">Monitors quote outcomes and tunes pricing models for profitability.</p>
                <div className="fviz fviz--bars" aria-hidden="true">
                  <i style={{ '--h': '34%' }} /><i style={{ '--h': '58%' }} /><i style={{ '--h': '41%' }} /><i style={{ '--h': '72%' }} /><i className="on" style={{ '--h': '88%' }} /><i style={{ '--h': '64%' }} /><i style={{ '--h': '79%' }} />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 3 }}>
                <h3 className="fcard__name mono">predictive-maintenance-cost</h3>
                <p className="fcard__desc">Identifies vendor and part savings opportunities across repairs.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>brake pads · vendor B <em className="amber">−18%</em></span>
                  <span>axle service · bundled <em className="amber">−11%</em></span>
                  <span>tires · contract rate <em>−6%</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 4 }}>
                <h3 className="fcard__name mono">service-history-analyzer</h3>
                <p className="fcard__desc">Analyzes maintenance logs to detect recurring issues and root causes.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>unit 4471 · coolant leak <em className="amber">4×</em></span>
                  <span>root cause · gasket batch <em>B-112</em></span>
                  <span>flagged fleet-wide <em>12 units</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 5 }}>
                <h3 className="fcard__name mono">maintenance-planner</h3>
                <p className="fcard__desc">Recommends optimal service schedules based on utilization and condition.</p>
                <div className="fviz fviz--dots mono" aria-hidden="true">
                  <span>wk</span><i /><i /><i className="on" /><i /><i className="on" /><i /><i /><i className="on" />
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 6 }}>
                <h3 className="fcard__name mono">market-intelligence</h3>
                <p className="fcard__desc">Aggregates live rate indices, lane performance, and carrier availability.</p>
                <div className="fviz fviz--rows mono" aria-hidden="true">
                  <span>rate index <em className="amber">▲ 2.1%</em></span>
                  <span>lane volume · TX triangle <em>▲</em></span>
                  <span>carrier availability <em>tight</em></span>
                </div>
              </article>
              <article className="fcard fcard--2 rv" style={{ '--i': 7 }}>
                <h3 className="fcard__name mono">failure-prediction</h3>
                <p className="fcard__desc">Forecasts breakdown risk using historical repair and usage data.</p>
                <div className="fviz fviz--risk mono" aria-hidden="true">
                  <span>unit 2209 · risk 0.72</span>
                  <div className="fviz__meter"><i style={{ '--w': '72%' }} /></div>
                  <span className="fviz__ctx">recommend: inspect before load 7741</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= WORKFLOWS ================= */}
        {/* DRAFT — marketing review: descriptions paraphrased from flowx.ai/logistics */}
        <section className="section" id="workflows">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">04 / Workflows</span>
              <div className="section__headline">
                <h2 className="h2 rv">Three workflows, mission-critical<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Where logistics agent stacks go to work first.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Network Optimization</h3>
                <p className="seg__desc">Agents rebalance capacity and routes as conditions change, not at the next planning cycle.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Load Processing</h3>
                <p className="seg__desc">Tenders validated, loads entered, exceptions resolved — without the inbox in the middle.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Billing Reconciliation</h3>
                <p className="seg__desc">Rates matched against contracts with an audit trail attached — before the dispute, not after.</p>
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
              <span className="rv" style={{ '--i': 1 }}>freight lifecycle<span className="amber">.</span></span>
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
