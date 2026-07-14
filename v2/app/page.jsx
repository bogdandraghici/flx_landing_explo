import { bp } from '@/components/lib/base';
import HomeInit from '@/components/HomeInit';

export default function Home() {
  return (
    <>
      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero" id="hero">
          <canvas id="field" className="hero__canvas" aria-hidden="true" />
          <div className="hero__scrim" aria-hidden="true" />

          <div className="shell hero__inner">
            <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
              <span className="tick" aria-hidden="true" />
              Enterprise AI · AI for regulated industries
            </p>

            <h1 className="hero__title">
              <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Deploy Banking, Insurance, and Logistics AI Agents in Weeks<span className="amber">.</span></span>
              <span className="hero__line rv-load" style={{ '--d': 2 }}><span className="dim">Proven in Production.</span></span>
            </h1>

            <p className="hero__sub rv-load" style={{ '--d': 4 }}>
              Accelerate mission-critical value streams: onboarding, lending,
              underwriting, claims, retention, quoting, track &amp; trace, and more.
              Over 220 enterprise-ready AI agents — or build your own — ready to
              plug into your legacy systems.
            </p>

            <div className="hero__cta cta__row rv-load" style={{ '--d': 5 }}>
              <a className="btn btn--primary" href="#registry">Explore Agents</a>
              <a className="btn btn--ghost" href="#proof">Calculate ROI</a>
            </div>

            {/* Terminal / solution compiler */}
            <div className="term rv-load" style={{ '--d': 6 }} id="term">
              <div className="term__bar mono">
                <span className="term__dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="term__title">flowx — agent builder</span>
              </div>
              <div className="term__body mono">
                <p className="term__ask"><span className="amber">▸</span> what should your first agent do?</p>
                <form className="term__form" id="termForm" autoComplete="off">
                  <label className="term__prompt" htmlFor="termInput">$</label>
                  <span className="term__field">
                    <input className="term__input" id="termInput" name="usecase" type="text" spellCheck="false"
                      placeholder="" aria-label="Describe your use case" maxLength="120" />
                    <span className="term__caret" aria-hidden="true" />
                  </span>
                  <button className="term__go" type="submit" aria-label="Compile blueprint">compile ↵</button>
                </form>
                <div className="term__log" id="termLog" aria-live="polite" />
              </div>
            </div>

            <p className="term__hints mono rv-load" style={{ '--d': 7 }}>
              try —
              <button className="hint" type="button" data-hint="automate commercial onboarding for business clients">onboarding</button> ·
              <button className="hint" type="button" data-hint="underwrite retail mortgages in days, not weeks">underwriting</button> ·
              <button className="hint" type="button" data-hint="triage motor insurance claims end to end">claims</button> ·
              <button className="hint" type="button" data-hint="track and trace shipments across carriers">track &amp; trace</button>
            </p>
          </div>

          <div className="hero__foot mono rv-load" style={{ '--d': 8 }}>
            <span>[ scroll ]</span>
            <span className="hero__foot-right">001 — 220+ enterprise-ready agents · 20 categories · in production</span>
          </div>
        </section>

        {/* Compiled blueprint — revealed below the hero after a use case is compiled. */}
        <section className="section section--blueprint" id="bpSection" hidden>
          <div className="shell">
            <div className="bp" id="bp">
              <div className="bp__result" id="bpResult">
                <div className="bp__result-head">
                  <h3 className="bp__result-title" id="bpTitle" />
                  <p className="bp__result-lede" id="bpTagline" />
                </div>
                <div className="bp__meta mono" id="bpMeta" />
                <div className="bp__grid">
                  <figure className="bp__diagram" id="bpDiagram" role="img" aria-label="Generated solution architecture diagram" />
                  <aside className="bp__spec">
                    <div className="bp__spec-bar mono"><span>blueprint.yaml</span><span className="amber" id="bpSpecStatus">writing…</span></div>
                    <pre className="bp__spec-body mono" id="bpSpec" />
                  </aside>
                </div>
                <div className="bp__actions">
                  <a className="btn btn--primary" href="#cta">Book a build review</a>
                  <button className="btn btn--ghost" id="bpAgain" type="button">Compile another use case</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY 95% FAIL ================= */}
        <section className="section" id="why">
          <div className="shell">
            <div className="why">
              <div className="why__left">
                <span className="section__no mono">02 / The 5%</span>
                <h2 className="h2 rv">95% of AI initiatives do fail. Be in the <span className="amber">5%</span> that succeed.</h2>
              </div>
              <ol className="why__list">
                <li className="why__row rv" style={{ '--i': 0 }}>
                  <span className="why__no mono">01</span>
                  <div className="why__fail" style={{ gridColumn: '2 / -1' }}>
                    <h3>Why?</h3>
                    <p>The biggest challenge in deploying AI agents in mission-critical value streams is not building agents, but inadequacy in data access, integrations, process flows and more.</p>
                  </div>
                </li>
                <li className="why__row rv" style={{ '--i': 1 }}>
                  <span className="why__no mono">02</span>
                  <div className="why__fail" style={{ gridColumn: '2 / -1' }}>
                    <h3>Solution</h3>
                    <p>For 10+ years we&apos;ve shipped AI that scales in complex, regulated environments. Today, companies run critical customer and operations journeys on FlowX.AI.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ================= AGENTS REGISTRY ================= */}
        <section className="section" id="registry">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Agents</span>
              <div className="section__headline">
                <h2 className="h2 rv">Our production-ready AI agents and agent stacks<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Over 220 mission-critical AI agents across 20 categories,
                  designed for regulated industries. Four of the stacks running in production today:</p>
              </div>
            </div>
            <div className="reg rv" style={{ '--i': 2 }}>
              <div className="reg__hd mono"><span>stack</span><span>agents</span><span>covers</span><span>status</span></div>
              <ul className="reg__rows">
                <li className="reg__row mono">
                  <span className="reg__name">retail-mortgage-underwriting</span>
                  <span className="reg__count">9</span>
                  <span className="reg__caps">end-to-end checks: contract ↔ appraisal ↔ title/EPC · income &amp; self-employed · debts, collateral, completeness</span>
                  <span className="reg__st">in production</span>
                </li>
                <li className="reg__row mono">
                  <span className="reg__name">commercial-onboarding</span>
                  <span className="reg__count">7</span>
                  <span className="reg__caps">identity &amp; UBO · signatory/mandates · address checks · cross-doc consistency · jurisdictional KYC · guided ask-backs</span>
                  <span className="reg__st">in production</span>
                </li>
                <li className="reg__row mono">
                  <span className="reg__name">claims-processing</span>
                  <span className="reg__count">6</span>
                  <span className="reg__caps">FNOL &amp; routing · doc completeness · policy/limits check · damage extraction &amp; estimate · threshold validation · fraud signals</span>
                  <span className="reg__st">in production</span>
                </li>
                <li className="reg__row mono">
                  <span className="reg__name">invoice-reconciliation</span>
                  <span className="reg__count">4</span>
                  <span className="reg__caps">auto-create invoices · validate rates/taxes/compliance · reconcile payments &amp; adjustments · real-time billing analytics</span>
                  <span className="reg__st">in production</span>
                </li>
                <li className="reg__row reg__row--next mono">
                  <span className="reg__name">your-stack</span>
                  <span className="reg__count">—</span>
                  <span className="reg__caps">describe it in the compiler above</span>
                  <span className="reg__st"><a href="#blueprint">compile ↑</a></span>
                </li>
              </ul>
              <p className="reg__foot mono dim2">220+ agents · 20 categories · ready to plug into your legacy systems</p>
            </div>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary" href={bp("/banking")}>Explore Industries</a>
              <a className="btn btn--ghost" href="#proof">Calculate ROI</a>
            </div>
          </div>
        </section>

        {/* ================= PLATFORM ================= */}
        <section className="section section--platform" id="platform">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">04 / Why FlowX</span>
              <div className="section__headline">
                <h2 className="h2 rv" style={{ whiteSpace: 'normal' }}>Why do FlowX.AI agents succeed in enterprises?</h2>
              </div>
            </div>

            <div className="plat rv">
              {/* Audit log — large block */}
              <article className="plat__cell plat__cell--wide">
                <header className="plat__head">
                  <h3>Banking-Grade Safety</h3>
                  <p>Centralized governance: audit trails, zero hallucinations, deterministic outputs — built for regulators.</p>
                </header>
                <div className="audit mono" id="audit" aria-hidden="true">
                  <div className="audit__hd"><span>timestamp</span><span>agent</span><span>action</span><span>status</span></div>
                  <div className="audit__rows" id="auditRows" />
                </div>
              </article>

              {/* Guardrails */}
              <article className="plat__cell">
                <header className="plat__head">
                  <h3>Easy to Deploy</h3>
                  <p>Small teams deploy our agents. Go live while others are still planning.</p>
                </header>
                <ul className="rails mono">
                  <li><span className="rails__state rails__state--on" />env.provision<em>wk 1</em></li>
                  <li><span className="rails__state rails__state--on" />systems.connect<em>wk 2</em></li>
                  <li><span className="rails__state rails__state--on" />configure.test<em>wk 3+</em></li>
                  <li><span className="rails__state rails__state--on" />go.live<em>live</em></li>
                </ul>
              </article>

              {/* Perimeter */}
              <article className="plat__cell">
                <header className="plat__head">
                  <h3>Impeccable Data Privacy</h3>
                  <p>Data stays inside your perimeter, agents run next to your systems under your policies.</p>
                </header>
                <ul className="targets mono">
                  <li><span className="amber">▪</span> on-prem / k8s</li>
                  <li><span className="amber">▪</span> private vpc</li>
                  <li><span className="amber">▪</span> eu sovereign cloud</li>
                  <li><span className="dim2">▪ zero data egress by default</span></li>
                </ul>
              </article>

              {/* Model routing */}
              <article className="plat__cell plat__cell--wide">
                <header className="plat__head">
                  <h3>Plugs Into Your Existing Data</h3>
                  <p>Jack Henry, FIS, Finastra, Temenos, COBOL mainframe, transportation management systems — we connect to any type of system.</p>
                </header>
                <div className="router mono" id="router" aria-hidden="true">
                  <span className="router__in">agent</span>
                  <span className="router__line" />
                  <span className="router__hub">flowx<br />runtime</span>
                  <div className="router__fan" />
                  <div className="router__models">
                    <span className="router__model" data-m="0">jack-henry</span>
                    <span className="router__model" data-m="1">fis</span>
                    <span className="router__model" data-m="2">finastra</span>
                    <span className="router__model" data-m="3">temenos</span>
                    <span className="router__model" data-m="4">cobol-mainframe</span>
                    <span className="router__model" data-m="5">tms</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="section" id="process">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">05 / Process</span>
              <div className="section__headline">
                <h2 className="h2 rv">Start. Prove ROI. Scale<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Four steps from kickoff to production — weeks, not quarters.</p>
              </div>
            </div>
            <ol className="proc rv">
              <li className="proc__step">
                <span className="proc__no mono">01</span>
                <h3>We create your environment</h3>
                <p>Validate the gap with your team. Lock in the agent or agent stack that fixes your biggest pain.</p>
              </li>
              <li className="proc__step">
                <span className="proc__no mono">02</span>
                <h3>We connect your systems</h3>
                <p>We do the heavy lifting. Your legacy systems stay untouched. No disruption.</p>
              </li>
              <li className="proc__step">
                <span className="proc__no mono">03</span>
                <h3>We configure and you test</h3>
                <p>We train the agent on your data under your rules and compliance. Safe AI.</p>
              </li>
              <li className="proc__step">
                <span className="proc__no mono">04</span>
                <h3>Go live and see the impact</h3>
                <p>Launch. Measure impact. Show the board real numbers. Plan the next agent.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* ================= PROOF ================= */}
        <section className="section section--proof" id="proof">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">06 / Proof</span>
              <div className="section__headline">
                <h2 className="h2 rv">Success stories with FlowX.AI<span className="amber">.</span></h2>
              </div>
            </div>
            <dl className="stats stats--obs">
              <div className="stats__row rv" style={{ '--i': 0 }}>
                <dt>
                  <span className="stats__val"><span className="stats__num mono" data-count="80" data-dec="0">0</span><span className="stats__unit mono">%</span></span>
                  {/* proportion: filled to 80% of the rail */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="160" y2="6" />
                    <line className="om-cap" x1="160" y1="1.5" x2="160" y2="10.5" />
                  </svg>
                </dt>
                <dd>of manual handoffs in lending flows automated — European commercial bank</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 1 }}>
                <dt>
                  <span className="stats__val"><span className="stats__pre mono">−</span><span className="stats__num mono" data-count="40" data-dec="0">0</span><span className="stats__unit mono">%</span></span>
                  {/* proportion cut: filled to 40% of the rail */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="80" y2="6" />
                    <line className="om-cap" x1="80" y1="1.5" x2="80" y2="10.5" />
                  </svg>
                </dt>
                <dd>lower operational cost for lending flows — bank with 4M+ clients</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 2 }}>
                <dt>
                  <span className="stats__val"><span className="stats__pre mono">−</span><span className="stats__num mono" data-count="65" data-dec="0">0</span><span className="stats__unit mono">%</span></span>
                  {/* proportion cut: filled to 65% of the rail */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="130" y2="6" />
                    <line className="om-cap" x1="130" y1="1.5" x2="130" y2="10.5" />
                  </svg>
                </dt>
                <dd>reduction in processing time for underwriting — global bank</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 3 }}>
                <dt>
                  <span className="stats__val"><span className="stats__pre mono">−</span><span className="stats__num mono" data-count="62" data-dec="0">0</span><span className="stats__unit mono">%</span></span>
                  {/* proportion cut: filled to 62% of the rail */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-fill" x1="0" y1="6" x2="124" y2="6" />
                    <line className="om-cap" x1="124" y1="1.5" x2="124" y2="10.5" />
                  </svg>
                </dt>
                <dd>reduction in time-to-yes in an approval flow — large financial institution</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 4 }}>
                <dt>
                  <span className="stats__val"><span className="stats__pre mono">$</span><span className="stats__num mono" data-count="1.8" data-dec="1">0.0</span><span className="stats__unit mono">M</span></span>
                  {/* ruler: ten $0.2M gradations, filled to $1.8M */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-tick" x1="20" y1="3" x2="20" y2="9" />
                    <line className="om-tick" x1="40" y1="3" x2="40" y2="9" />
                    <line className="om-tick" x1="60" y1="3" x2="60" y2="9" />
                    <line className="om-tick" x1="80" y1="3" x2="80" y2="9" />
                    <line className="om-tick" x1="100" y1="3" x2="100" y2="9" />
                    <line className="om-tick" x1="120" y1="3" x2="120" y2="9" />
                    <line className="om-tick" x1="140" y1="3" x2="140" y2="9" />
                    <line className="om-tick" x1="160" y1="3" x2="160" y2="9" />
                    <line className="om-tick" x1="200" y1="3" x2="200" y2="9" />
                    <line className="om-fill" x1="0" y1="6" x2="180" y2="6" />
                    <line className="om-cap" x1="180" y1="1.5" x2="180" y2="10.5" />
                  </svg>
                </dt>
                <dd>projected annual savings — global insurer, after a stack of AI agents</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 5 }}>
                <dt>
                  <span className="stats__val"><span className="stats__num mono" data-count="8" data-dec="0">0</span><span className="stats__unit mono">wks</span></span>
                  {/* timeline: a 12-week quarter in fortnight ticks, launched by week 8 */}
                  <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                    <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                    <line className="om-tick" x1="33.3" y1="3" x2="33.3" y2="9" />
                    <line className="om-tick" x1="66.7" y1="3" x2="66.7" y2="9" />
                    <line className="om-tick" x1="100" y1="3" x2="100" y2="9" />
                    <line className="om-tick" x1="166.7" y1="3" x2="166.7" y2="9" />
                    <line className="om-tick" x1="200" y1="3" x2="200" y2="9" />
                    <line className="om-fill" x1="0" y1="6" x2="133.3" y2="6" />
                    <line className="om-cap" x1="133.3" y1="1.5" x2="133.3" y2="10.5" />
                  </svg>
                </dt>
                <dd>fund management platform built and launched — asset manager</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ================= VOICES ================= */}
        <section className="section" id="voices">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">07 / Voices</span>
              <div className="section__headline">
                <h2 className="h2 rv">Global companies, including financial institutions, trust FlowX.AI<span className="amber">.</span></h2>
              </div>
            </div>
            <div className="voices rv">
              <blockquote className="voice">
                <p>“To us, FlowX.AI is a business asset, not an IT asset. We&apos;re shifting from technology that is a constraint, to an enabler.”</p>
                <cite>COO of Major Custodian Bank</cite>
              </blockquote>
              <blockquote className="voice">
                <p>“We now see FlowX.AI as the engine that powers user experiences across our entire digital portfolio.”</p>
                <cite>Deputy Director of CEE Bank Group</cite>
              </blockquote>
              <blockquote className="voice">
                <p>“I have delivered more functionality in production with FlowX.AI in three months than in the rest of my entire career with the bank of six years.”</p>
                <cite>Solution Architect of a European Bank</cite>
              </blockquote>
              <blockquote className="voice">
                <p>“Before FlowX.AI, just like everyone else, it would take us a year to launch a new product. Today, we are able to launch new products in 2-4 weeks. This would have been unthinkable a few years ago.”</p>
                <cite>Insurance Executive</cite>
              </blockquote>
              <blockquote className="voice">
                <p>“FlowX.AI delivers value, multiple times faster, through its ability to integrate its modern tech platform with existing stack, through plug-and-play functionality.”</p>
                <cite>CTO of European Insurer</cite>
              </blockquote>
              <blockquote className="voice">
                <p>“FlowX.AI is the future of software development. It is exactly what we need to transform the entire bank.”</p>
                <cite>SVP Technology Architecture &amp; Strategy</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section" id="faq">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">08 / FAQ</span>
              <div className="section__headline">
                <h2 className="h2 rv">Frequently asked questions<span className="amber">.</span></h2>
              </div>
            </div>
            <div className="faq rv" style={{ '--i': 2 }}>
              <details className="faq__item">
                <summary className="faq__q"><span className="faq__no mono">Q.01</span>Do we have to change our core systems?<span className="faq__mark" aria-hidden="true">+</span></summary>
                <div className="faq__a"><p>No. Agents plug into the systems you already run — core banking, mainframes, document stores — through governed connectors. Nothing is ripped out or rewritten.</p></div>
              </details>
              <details className="faq__item">
                <summary className="faq__q"><span className="faq__no mono">Q.02</span>How fast can we get agents into production?<span className="faq__mark" aria-hidden="true">+</span></summary>
                <div className="faq__a"><p>Weeks, not quarters. A small joint team creates your environment, connects your systems, configures with you, and goes live — one fund management platform was built and launched in 8 weeks.</p></div>
              </details>
              <details className="faq__item">
                <summary className="faq__q"><span className="faq__no mono">Q.03</span>What level of effort will this require from our team?<span className="faq__mark" aria-hidden="true">+</span></summary>
                <div className="faq__a"><p>A small joint team, not a transformation program. Your people define the value stream and acceptance criteria; FlowX stands up the environment and the agent stacks.</p></div>
              </details>
              <details className="faq__item">
                <summary className="faq__q"><span className="faq__no mono">Q.04</span>What&apos;s the real cost?<span className="faq__mark" aria-hidden="true">+</span></summary>
                <div className="faq__a"><p>Priced against the value stream it accelerates. In production these deployments have cut lending operational costs by 40% and projected $1.8M in annual savings — sizing starts from your numbers, in a customized demo.</p></div>
              </details>
              <details className="faq__item">
                <summary className="faq__q"><span className="faq__no mono">Q.05</span>What does the timeline look like?<span className="faq__mark" aria-hidden="true">+</span></summary>
                <div className="faq__a"><p>Create your environment → connect your systems → configure and test → go live. Elapsed: weeks — with impact measured from the first live case.</p></div>
              </details>
            </div>
          </div>
        </section>

        {/* ================= AGENT BUILDER ================= */}
        <section className="section section--blueprint" id="blueprint">
          <div className="shell">
            <div className="abuild">
              <div className="abuild__text">
                <span className="section__no mono">09 / Agent Builder</span>
                <h2 className="h2 rv">Build your own agents with our Agent Builder<span className="amber">.</span></h2>
                <p className="section__lede rv">Streamline business flows, reduce human effort and risk.</p>
                <div className="cta__row bp__cta rv">
                  <a className="btn btn--primary" href="https://www.flowx.ai/" target="_blank" rel="noopener">See the video ↗</a>
                </div>
              </div>

              {/* abstract agent-builder wireframe: a component palette wiring into an agent flow */}
              <div className="abuild__visual rv" aria-hidden="true">
                <div className="abx">
                  <svg viewBox="0 0 600 380" role="img" aria-label="Abstract Agent Builder wireframe">
                    <defs>
                      <radialGradient id="abxGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FCB813" stopOpacity="0.18" />
                        <stop offset="68%" stopColor="#FCB813" stopOpacity="0.045" />
                        <stop offset="100%" stopColor="#FCB813" stopOpacity="0" />
                      </radialGradient>
                      <pattern id="abxGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle className="abx-grid-dot" cx="1.6" cy="1.6" r="1" />
                      </pattern>
                    </defs>

                    {/* component palette */}
                    <rect className="abx-tray" x="14" y="14" width="150" height="352" rx="14" />
                    <circle className="abx-tdot" cx="32" cy="38" r="2.5" />
                    <circle className="abx-tdot" cx="41" cy="38" r="2.5" />
                    <circle className="abx-tdot" cx="50" cy="38" r="2.5" />
                    <text className="abx-label abx-label--head" x="66" y="42">blocks</text>
                    <line className="abx-div" x1="14" y1="58" x2="164" y2="58" />

                    <text className="abx-cat" x="30" y="82">agents</text>
                    <rect className="abx-chip" x="28" y="92" width="122" height="44" rx="9" />
                    <rect className="abx-ico" x="40" y="106" width="12" height="12" rx="3" />
                    <text className="abx-label" x="62" y="111">extract</text>
                    <text className="abx-sub" x="62" y="126">ocr · parse</text>

                    <rect className="abx-chip abx-chip--pick" x="28" y="144" width="122" height="44" rx="9" />
                    <rect className="abx-ico abx-ico--pick" x="40" y="158" width="12" height="12" rx="3" />
                    <text className="abx-label abx-label--live" x="62" y="163">decide</text>
                    <text className="abx-sub" x="62" y="178">policy-scored</text>

                    <text className="abx-cat" x="30" y="216">controls</text>
                    <rect className="abx-chip" x="28" y="226" width="122" height="44" rx="9" />
                    <rect className="abx-ico" x="40" y="240" width="12" height="12" rx="3" />
                    <text className="abx-label" x="62" y="245">guardrail</text>
                    <text className="abx-sub" x="62" y="260">pii · audit</text>

                    <rect className="abx-chip" x="28" y="278" width="122" height="44" rx="9" />
                    <rect className="abx-ico" x="40" y="292" width="12" height="12" rx="3" />
                    <text className="abx-label" x="62" y="297">route</text>
                    <text className="abx-sub" x="62" y="312">llm · rules</text>

                    {/* builder canvas */}
                    <rect className="abx-frame" x="178" y="14" width="408" height="352" rx="16" />
                    <rect x="180" y="54" width="404" height="308" fill="url(#abxGrid)" />
                    <circle className="abx-tdot" cx="196" cy="32" r="2.5" />
                    <circle className="abx-tdot" cx="205" cy="32" r="2.5" />
                    <circle className="abx-tdot" cx="214" cy="32" r="2.5" />
                    <text className="abx-label abx-label--head" x="230" y="36">agent.flow</text>
                    <circle className="abx-dot--live" cx="568" cy="32" r="3" />
                    <line className="abx-div" x1="178" y1="52" x2="586" y2="52" />

                    {/* ambient amber glow behind the router */}
                    <ellipse className="abx-glow" cx="390" cy="182" rx="124" ry="98" fill="url(#abxGlow)" />

                    {/* wires */}
                    <path id="abxE1" className="abx-edge" d="M292 127 C316 127 318 176 336 178" />
                    <path id="abxE2" className="abx-edge" d="M292 237 C316 237 318 190 336 186" />
                    <path id="abxE3" className="abx-edge" d="M444 178 C458 178 462 118 474 118" />
                    <path id="abxE4" className="abx-edge" d="M444 182 C460 182 464 192 474 192" />
                    <path id="abxE5" className="abx-edge" d="M444 186 C458 186 462 266 474 266" />

                    {/* input nodes */}
                    <rect className="abx-node" x="200" y="104" width="92" height="46" rx="10" />
                    <text className="abx-label" x="212" y="124">input</text>
                    <text className="abx-sub" x="212" y="139">api · webhook</text>
                    <circle className="abx-port" cx="292" cy="127" r="2.6" />

                    <rect className="abx-node" x="200" y="214" width="92" height="46" rx="10" />
                    <text className="abx-label" x="212" y="234">context</text>
                    <text className="abx-sub" x="212" y="249">vector · kb</text>
                    <circle className="abx-port" cx="292" cy="237" r="2.6" />

                    {/* router (live) */}
                    <rect className="abx-node abx-node--live" x="336" y="150" width="108" height="64" rx="12" />
                    <text className="abx-label abx-label--live" x="350" y="178">router</text>
                    <text className="abx-sub" x="350" y="194">plan · dispatch</text>
                    <circle className="abx-dot--live" cx="424" cy="166" r="4" />
                    <circle className="abx-port" cx="336" cy="182" r="2.6" />
                    <circle className="abx-port" cx="444" cy="182" r="2.6" />

                    {/* output / control nodes */}
                    <rect className="abx-node" x="474" y="96" width="84" height="44" rx="10" />
                    <text className="abx-label" x="484" y="115">guard</text>
                    <text className="abx-sub" x="484" y="129">pii · policy</text>
                    <circle className="abx-port" cx="474" cy="118" r="2.6" />

                    <rect className="abx-node" x="474" y="170" width="84" height="44" rx="10" />
                    <text className="abx-label" x="484" y="189">action</text>
                    <text className="abx-sub" x="484" y="203">write · api</text>
                    <circle className="abx-port" cx="474" cy="192" r="2.6" />

                    <rect className="abx-node" x="474" y="244" width="84" height="44" rx="10" />
                    <text className="abx-label" x="484" y="263">audit</text>
                    <text className="abx-sub" x="484" y="277">hash · 7y</text>
                    <circle className="abx-port" cx="474" cy="266" r="2.6" />

                    {/* amber pulses riding the wires */}
                    <circle className="abx-pulse" r="2.6"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#abxE1" /></animateMotion></circle>
                    <circle className="abx-pulse" r="2.6"><animateMotion dur="2.6s" begin="0.6s" repeatCount="indefinite"><mpath href="#abxE5" /></animateMotion></circle>
                    <circle className="abx-pulse" r="2.6"><animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite"><mpath href="#abxE4" /></animateMotion></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">10 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Accelerate mission-critical</span>
              <span className="rv" style={{ '--i': 1 }}>value streams with our</span>
              <span className="rv" style={{ '--i': 2 }}>AI agents<span className="amber">.</span></span>
            </h2>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary btn--lg" id="ctaBtn" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
              <a className="btn btn--ghost btn--lg" href="#registry">Explore Agents</a>
            </div>
          </div>
        </section>
      </main>
      <HomeInit />
    </>
  );
}
