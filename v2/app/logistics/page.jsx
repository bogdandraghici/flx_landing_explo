import { bp } from '@/components/lib/base';
import IndustryInit from '@/components/IndustryInit';
import LogisticsHeroViz from '@/components/LogisticsHeroViz';

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

            {/* network mesh: five parties on one mesh — shipper, broker, forwarder, carrier, 3PL — with packets streaming the edges as agent handoffs */}
            <LogisticsHeroViz className="ahero__viz" />
          </div>
        </section>

        {/* ================= THE PROBLEM ================= */}
        {/* DRAFT — marketing review: pain points paraphrased from flowx.ai/logistics */}
        <section className="section" id="problem">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">The problem</span>
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
              <span className="section__no mono">Value stream</span>
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
              <span className="section__no mono">Featured</span>
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
              <span className="section__no mono">Workflows</span>
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
            <span className="section__no mono">Next</span>
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
