import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';
import AgentBuilderHeroViz from '@/components/AgentBuilderHeroViz';
import PipelineLifecycleViz from '@/components/PipelineLifecycleViz';

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

            {/* Builder canvas (design variant 5a): typed nodes on a dot grid with a
                 palette rail — Input→Agent is a live flowing dashed wire, and a second
                 wire drags from Agent down to Output until it snaps home and the Output
                 lights amber (the resolution beat). Flow/wires stay neutral schematic
                 ink; amber is reserved for the resolution. Reduced motion → resolved
                 pose (wire landed, output lit), no animation. */}
            <AgentBuilderHeroViz className="ahero__viz" />
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
            {/* 5A lifecycle instrument — one graph played through the four stages as
                staged acts (draw → compile → run → resume), looping. */}
            <PipelineLifecycleViz className="abd-pipe-viz rv" />
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
              <a className="btn btn--ghost btn--lg" href={bp("/#hero")}>Compile your own agent</a>
            </div>
          </div>
        </section>
      </main>
      <CtaFieldInit />
    </>
  );
}
