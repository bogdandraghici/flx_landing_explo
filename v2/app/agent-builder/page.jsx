import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'FlowX — Agent Builder',
  description: "Agent Builder is FlowX.AI's visual workflow engine. Draw an agent as typed nodes and edges; it compiles to a deterministic state machine you can audit, resume, and run in production.",
};

export default function AgentBuilder() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        <section className="ahero" id="phero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Platform · Agent Builder
              </p>
              <h1 className="hero__title">
                <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">Compose intelligence,</span></span>
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>brick by brick<span className="amber">.</span></span>
              </h1>
              {/* DRAFT — marketing review */}
              <p className="hero__sub rv-load" style={{ '--d': 3 }}>
                Drag agents, tools and memory into a living graph — the flow keeps
                running.
              </p>
              <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
                <a className="btn btn--primary btn--lg" href="#cta">Book a demo</a>
                <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
              </div>
              <p className="astats mono rv-load" style={{ '--d': 5 }}>
                <span>drag a node · reliable by construction</span>
              </p>
            </div>

            {/* the build: typed bricks are dragged out of a palette (agent · tool · memory) and
                 lock into an aligned grid one at a time; 'in' fans out to three parallel enrichers
                 (extract · classify · memory) that merge into reason, then guard, then out. the
                 moment a path exists a pulse starts on each branch and keeps flowing — until it
                 lands on a typed output that resolves amber: flow running, typed output.
                 Amber is reserved for the resolution (the lit output + tag). Base (non-animated)
                 values are the resolved pose — grid whole, output lit — for reduced motion. */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="Typed bricks — agent, tool, memory — are dragged from a palette and lock into an aligned grid: input fans out to three parallel enrichers — extract, classify and memory — which merge into a reasoning core, then pass a guard to a typed output. As the bricks seat, a pulse runs on each branch and keeps looping; the output lights amber — flow running, typed output">

                {/* ghost slots: the grid the bricks snap into */}
                <g className="abv-slots">
                  <rect className="abv-slot" x="172" y="150" width="88" height="36" rx="8" />
                  <rect className="abv-slot" x="172" y="210" width="88" height="36" rx="8" />
                  <rect className="abv-slot" x="172" y="286" width="88" height="36" rx="8" />
                  <rect className="abv-slot" x="292" y="168" width="92" height="44" rx="9" />
                  <rect className="abv-slot" x="292" y="250" width="88" height="36" rx="8" />
                </g>

                {/* palette: the three things you drag in (echoes the sub-headline) */}
                <g className="abv-pal">
                  <rect className="abv-pal-box" x="18" y="176" width="78" height="128" rx="12" />
                  <text className="ivz-lbl" x="57" y="168" textAnchor="middle">palette</text>
                  <g className="abv-chip">
                    <rect className="abv-node" x="26" y="186" width="62" height="30" rx="7" />
                    <circle className="abv-fam fa" cx="34" cy="201" r="2.6" />
                    <text className="abx-label" x="60" y="205" textAnchor="middle">agent</text>
                  </g>
                  <g className="abv-chip">
                    <rect className="abv-node" x="26" y="222" width="62" height="30" rx="7" />
                    <circle className="abv-fam ft" cx="34" cy="237" r="2.6" />
                    <text className="abx-label" x="60" y="241" textAnchor="middle">tool</text>
                  </g>
                  <g className="abv-chip">
                    <rect className="abv-node" x="26" y="258" width="62" height="30" rx="7" />
                    <circle className="abv-fam fm" cx="34" cy="273" r="2.6" />
                    <text className="abx-label" x="60" y="277" textAnchor="middle">memory</text>
                  </g>
                </g>

                {/* edges: drawn as their downstream brick seats.
                     painted first so the run dots ride on top of the lines */}
                <path className="abv-edge" style={{ '--n': 0 }} pathLength="1" d="M150 234 C164 234 160 168 172 168" />
                <path className="abv-edge" style={{ '--n': 1 }} pathLength="1" d="M150 234 C164 234 162 228 172 228" />
                <path className="abv-edge" style={{ '--n': 2 }} pathLength="1" d="M150 234 C164 234 160 304 172 304" />
                <path className="abv-edge" style={{ '--n': 3 }} pathLength="1" d="M260 168 C278 168 276 190 292 190" />
                <path className="abv-edge" style={{ '--n': 3 }} pathLength="1" d="M260 228 C278 228 278 190 292 190" />
                <path className="abv-edge" style={{ '--n': 3 }} pathLength="1" d="M260 304 C280 304 280 204 292 204" />
                <path className="abv-edge" style={{ '--n': 4 }} pathLength="1" d="M338 212 C338 230 336 238 336 250" />
                <path className="abv-edge" style={{ '--n': 4 }} pathLength="1" d="M380 268 C396 268 402 234 406 234" />

                {/* invisible motion rails: one per enricher branch, stitched from the exact
                     edge segments so the dots ride the visible lines and pass through nodes.
                     all three fan out of 'in', through their enricher, and merge into reason */}
                <path id="abvRunExtract" fill="none" stroke="none" d="M134 234 L150 234 C164 234 160 168 172 168 L260 168 C278 168 276 190 292 190 L338 190 L338 212 C338 230 336 238 336 250 L336 268 L380 268 C396 268 402 234 406 234 L421 234" />
                <path id="abvRunClassify" fill="none" stroke="none" d="M134 234 L150 234 C164 234 162 228 172 228 L260 228 C278 228 278 190 292 190 L338 190 L338 212 C338 230 336 238 336 250 L336 268 L380 268 C396 268 402 234 406 234 L421 234" />
                <path id="abvRunMemory" fill="none" stroke="none" d="M134 234 L150 234 C164 234 160 304 172 304 L260 304 C280 304 280 204 292 204 L338 204 L338 212 C338 230 336 238 336 250 L336 268 L380 268 C396 268 402 234 406 234 L421 234" />

                {/* the run: a pulse on each parallel branch, staggered so they cascade out of
                     'in' and merge into reason. dots ride the edges and slip UNDER the nodes
                     (painted before the ports + bricks, so a node's fill occludes the pass-through) */}
                <g className="abv-dot"><circle r="2.8" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.40;0.66;1"><mpath href="#abvRunExtract" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.40;0.41;0.65;0.66;1" dur="12s" repeatCount="indefinite" />
                </g>
                <g className="abv-dot"><circle r="2.8" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.51;0.78;1"><mpath href="#abvRunClassify" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.51;0.52;0.77;0.78;1" dur="12s" repeatCount="indefinite" />
                </g>
                <g className="abv-dot"><circle r="2.8" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.62;0.90;1"><mpath href="#abvRunMemory" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.62;0.63;0.89;0.90;1" dur="12s" repeatCount="indefinite" />
                </g>

                {/* typed contracts: input / output ports (paint over the dots) */}
                <g className="abv-port-pill">
                  <rect className="abv-node" x="118" y="222" width="32" height="24" rx="6" />
                  <text className="ivz-lbl" x="134" y="237" textAnchor="middle">in</text>
                </g>
                <g className="abv-port-pill">
                  <rect className="abv-node" x="406" y="222" width="30" height="24" rx="6" />
                  <rect className="abv-out-hot" x="406" y="222" width="30" height="24" rx="6" />
                  <text className="ivz-lbl" x="421" y="237" textAnchor="middle">out</text>
                </g>

                {/* bricks: lock into the grid one at a time (paint over the dots) */}
                <g className="abv-brick" style={{ '--n': 0 }}>
                  <rect className="abv-node" x="172" y="150" width="88" height="36" rx="8" />
                  <circle className="abv-fam fa" cx="183" cy="161" r="2.6" />
                  <text className="abx-label" x="216" y="172" textAnchor="middle">extract</text>
                </g>
                <g className="abv-brick" style={{ '--n': 1 }}>
                  <rect className="abv-node" x="172" y="210" width="88" height="36" rx="8" />
                  <circle className="abv-fam fa" cx="183" cy="221" r="2.6" />
                  <text className="abx-label" x="216" y="232" textAnchor="middle">classify</text>
                </g>
                <g className="abv-brick" style={{ '--n': 2 }}>
                  <rect className="abv-node" x="172" y="286" width="88" height="36" rx="8" />
                  <circle className="abv-fam fm" cx="183" cy="297" r="2.6" />
                  <text className="abx-label" x="216" y="308" textAnchor="middle">memory</text>
                </g>
                <g className="abv-brick" style={{ '--n': 3 }}>
                  <rect className="abv-node" x="292" y="168" width="92" height="44" rx="9" />
                  <circle className="abv-fam fa" cx="303" cy="179" r="2.6" />
                  <text className="abx-label" x="338" y="194" textAnchor="middle">reason</text>
                </g>
                <g className="abv-brick" style={{ '--n': 4 }}>
                  <rect className="abv-node" x="292" y="250" width="88" height="36" rx="8" />
                  <circle className="abv-fam ft" cx="303" cy="261" r="2.6" />
                  <text className="abx-label" x="336" y="272" textAnchor="middle">guard</text>
                </g>

                {/* resolution tag: appears once the run lands on a typed output */}
                <g className="abv-tag" transform="translate(230 402)">
                  <rect className="ivz-tag" x="-78" y="-10" width="156" height="15" />
                  <text className="ivz-lbl" textAnchor="middle" y="1.5">flow running · typed output</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THESIS ================= */}
        {/* DRAFT — marketing review: thesis copy from the RAILS positioning */}
        <section className="abd-thesis">
          <div className="shell">
            <blockquote className="rv">A workflow can be deterministic even when its nodes are <span className="amber">not</span>.</blockquote>
            <p className="rv" style={{ '--i': 1 }}>You don&apos;t get reliable agents by making the model predictable. You get
              them by building a harness whose control flow, contracts and side effects are predictable — and
              placing the model inside as one bounded, observed node. Reliability is an architectural property,
              engineered into the graph, not a model property to hope for.</p>
            <span className="abd-thesis__tag mono rv" style={{ '--i': 2 }}>RAILS · Reliable Agent Execution via Layered State-machines</span>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="section" id="how">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / Pipeline</span>
              <div className="section__headline">
                <h2 className="h2 rv">From a visual workflow to a running state machine<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>The author draws nodes and edges; the platform
                  compiles them ahead of time; the compiled graph executes phase by phase with
                  checkpointed state.</p>
              </div>
            </div>
            <div className="segs abd-pipe">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Draw</h3>
                <p className="seg__desc">Author the agent as typed nodes and edges on a visual canvas, with typed Start and End contracts that define its API.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Compile</h3>
                <p className="seg__desc">A topological sort orders nodes into parallel phases and builds a LangGraph state machine — control flow fixed at compile time, not by the model at runtime.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Run</h3>
                <p className="seg__desc">Execution streams every phase transition over SSE while persisting the full run to a checkpointer.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Resume &amp; audit</h3>
                <p className="seg__desc">Checkpointed state makes any run replayable and resumable — reconstruct what ran, in what order, on what input, at what cost.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= DETERMINISM GRADIENT ================= */}
        <section className="section" id="gradient">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Node catalog</span>
              <div className="section__headline">
                <h2 className="h2 rv">Place the stochastic core on a gradient<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Node types span a gradient from fully deterministic
                  to fully generative. Good design keeps control flow and contracts on the deterministic end
                  and confines generation to clearly marked nodes.</p>
              </div>
            </div>
            <div className="abd-rail rv" aria-hidden="true" />
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <p className="abd-grad__hd mono"><span className="abd-grad__dot" style={{ background: 'var(--text-faint)' }} />Deterministic</p>
                <p className="seg__desc">Same output every run.</p>
                <ul className="seg__chips mono">
                  <li>Condition</li>
                  <li>Custom Python</li>
                  <li>Data Transformation</li>
                  <li>Convert to PDF</li>
                  <li>Integration Workflow</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <p className="abd-grad__hd mono"><span className="abd-grad__dot" style={{ background: 'var(--text-dim)' }} />Bounded</p>
                <p className="seg__desc">The model picks within a fixed set.</p>
                <ul className="seg__chips mono">
                  <li>Orchestrator</li>
                  <li>Document / Text Extraction</li>
                  <li>ML Prediction</li>
                  <li>Guardrails / Data Privacy</li>
                  <li>Aggregator (AND / OR)</li>
                </ul>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <p className="abd-grad__hd mono"><span className="abd-grad__dot" style={{ background: 'var(--amber)' }} />Generative</p>
                <p className="seg__desc">Free-form text &amp; reasoning.</p>
                <ul className="seg__chips mono">
                  <li>Text Generation</li>
                  <li>Conversation / Complex Agent</li>
                  <li>Deep Agent / Deep Research</li>
                  <li>Aggregator (SYNTHESIZE)</li>
                  <li>Image Description</li>
                </ul>
              </article>
            </div>
            <p className="abd-note mono rv">Confine generation, then convert it back to deterministic form — a schema, a branch, a validated field — as early as possible.</p>
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}
        <section className="section" id="capabilities">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Capabilities</span>
              <div className="section__headline">
                <h2 className="h2 rv">Everything an enterprise agent needs, built in<span className="amber">.</span></h2>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono abd-k">Build</span>
                <h3 className="seg__name">Visual workflow engine</h3>
                <p className="seg__desc">A drag-and-drop canvas that compiles directly to an executable state machine. No ML expertise, no glue code.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono abd-k">Catalog</span>
                <h3 className="seg__name">30+ node types</h3>
                <p className="seg__desc">Reasoning agents, orchestrators, document extraction, RAG, A2A, MCP and more — covering most enterprise automation patterns out of the box.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono abd-k">Models</span>
                <h3 className="seg__name">7 LLM providers</h3>
                <p className="seg__desc">Anthropic, OpenAI, Google, Azure, Mistral, xAI, Ollama. Switch per node — optimise cost and quality, with no vendor lock-in.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono abd-k">Coordinate</span>
                <h3 className="seg__name">Multi-agent</h3>
                <p className="seg__desc">A2A, MCP and AP2 protocols for agent-to-agent collaboration and mandate-based, agent-led payments.</p>
              </article>
              <article className="seg rv" style={{ '--i': 4 }}>
                <span className="seg__no mono abd-k">Ground</span>
                <h3 className="seg__name">Agentic RAG</h3>
                <p className="seg__desc">Query decomposition, relevance grading and adaptive retry keep agents grounded in your proprietary data.</p>
              </article>
              <article className="seg rv" style={{ '--i': 5 }}>
                <span className="seg__no mono abd-k">Operate</span>
                <h3 className="seg__name">Production-ready</h3>
                <p className="seg__desc">PostgreSQL state, execution resume, SSE streaming, per-node timeouts and retry policies, full execution traces.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">04 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Design your</span>
              <span className="rv" style={{ '--i': 1 }}>first agent<span className="amber">.</span></span>
            </h2>
            <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Bring a regulated process. We&apos;ll draw it as an agent,
              compile it, and show you the audit trail — on your stack.</p>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Schedule a customized demo</a>
              <a className="btn btn--ghost btn--lg" href="/#hero">Compile your own agent</a>
            </div>
          </div>
        </section>
      </main>
      <CtaFieldInit />
    </>
  );
}
