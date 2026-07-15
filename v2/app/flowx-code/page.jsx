import FlowxCodeInit from '@/components/FlowxCodeInit';
import FlowxCodeHeroViz from '@/components/FlowxCodeHeroViz';
import TheLoopLanesViz from '@/components/TheLoopLanesViz';

export const metadata = {
  title: 'FlowX — FlowX Code',
  description: 'FlowX Code is a build copilot for regulated platforms. Describe a resource in one sentence; it drafts a contract-validated platform artifact — grounded in your live project, validated before it persists, and committed only when you click Save.',
};

export default function FlowxCode() {
  return (
    <>
      <main id="top" className="page-flowx-code">

        {/* ================= HERO ================= */}
        <section className="ahero" id="phero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Platform · FlowX Code
              </p>
              <h1 className="hero__title">
                <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">The build copilot for</span></span>
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>regulated platforms<span className="amber">.</span></span>
              </h1>
              <p className="hero__sub rv-load" style={{ '--d': 3 }}>
                Describe a resource in one sentence; FlowX Code drafts a
                contract-validated platform artifact — grounded in your live project,
                validated before it persists, and committed only when you click Save.
              </p>
              <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
                <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
                <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
              </div>
              <p className="astats mono rv-load" style={{ '--d': 5 }}>
                <span>grounded · validated · human-gated</span>
              </p>
            </div>

            {/* Layers · terminal panel: a natural-language request is typed into a
                 terminal session, then each word falls onto its platform layer
                 (process / steps / rules / data) as the binding sweep lands. */}
            <FlowxCodeHeroViz className="ahero__viz" />
          </div>
        </section>

        {/* ================= THESIS ================= *//* editorial split, staggered claim (matches the observatory governance
           thesis): dim setup framing → big payoff (amber "neither" = the missing
           safety net), evidence + FlowX Code tag set off by a hairline on the
           right. The claim splits along its own parallel structure — "In a code
           repository…" (the given) vs. "In a regulated platform…" (the punch). */}
        <section className="abd-thesis abd-thesis--split">
          <div className="shell">
            <span className="abd-thesis__kicker mono rv" style={{ '--i': 0 }}>The construction thesis</span>
            <blockquote className="abd-thesis__claim rv" style={{ '--i': 1 }}>
              <span className="abd-thesis__setup">In a code repository, a reviewer and a compiler stand between an agent&apos;s mistake and production.</span>
              <span className="abd-thesis__payoff">In a regulated platform, there is <span className="amber">neither</span>.</span>
            </blockquote>
            <div className="abd-thesis__evidence">
              <p className="rv" style={{ '--i': 2 }}>A build copilot&apos;s output isn&apos;t free-text code — it&apos;s a schema-bound artifact
                that takes effect the moment it&apos;s saved, with no diff review and no compiler in between. So FlowX Code
                inverts the field&apos;s optimization: not maximal autonomy, but grounded, validated, human-gated
                construction. The grounding, the validation and the human gate aren&apos;t friction — they&apos;re the compiler
                and the reviewer, moved into the agent.</p>
              <span className="abd-thesis__tag mono rv" style={{ '--i': 3 }}>FlowX Code · The most important thing to engineer into the loop is where it stops — at a human</span>
            </div>
          </div>
        </section>

        {/* ================= THE LOOP ================= */}
        <section className="section" id="how">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / The loop</span>
              <div className="section__headline">
                <h2 className="h2 rv">Loop engineering, constrained<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>A turn runs from a natural-language request to a
                  committed artifact — routed, grounded, validated, and gated behind a human, on purpose.</p>
              </div>
            </div>
            {/* the loop, shown as one unit: the timeline band (a turn sweeping
                REQUEST→ARTIFACT across four lanes, held at a human gate before
                COMMIT lands) joined to the four step cards it maps onto — each
                card sits under its lane, hairline-divided like the observatory
                "what it does" pane. */}
            <div className="abd-loop rv" style={{ '--i': 0 }}>
              <div className="abd-loop__viz">
                <TheLoopLanesViz />
              </div>
              <div className="abd-loop__cards">
                <article className="seg">
                  <span className="seg__no mono">01</span>
                  <h3 className="seg__name">Ground</h3>
                  <p className="seg__desc">At session start it loads your live node registry, project metadata and permissions — so it can only emit capabilities the backend actually has.</p>
                </article>
                <article className="seg">
                  <span className="seg__no mono">02</span>
                  <h3 className="seg__name">Draft</h3>
                  <p className="seg__desc">A complexity-aware router picks the right model; per-kind specialist sub-agents build the artifact against that live grounding.</p>
                </article>
                <article className="seg">
                  <span className="seg__no mono">03</span>
                  <h3 className="seg__name">Validate</h3>
                  <p className="seg__desc">Per-kind contracts and Java-mirror validators reject a malformed emission before it persists — with the exact error the backend would return.</p>
                </article>
                <article className="seg">
                  <span className="seg__no mono">04</span>
                  <h3 className="seg__name">Commit</h3>
                  <p className="seg__desc">Nothing mutates until you click Keep or Save. The loop&apos;s stopping condition is a human, on purpose.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARTIFACT KINDS ================= */}
        <section className="section" id="artifacts">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Artifact kinds</span>
              <div className="section__headline">
                <h2 className="h2 rv">Twelve kinds of platform artifact, from a sentence<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Integrations, processes, agents, UIs, data models and more — each with a
                  typed contract and a validator that pre-empts backend rejections.</p>
              </div>
            </div>
            <div className="segs segs--3">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Integration</h3>
                <p className="seg__desc">REST and 10 other system types, with a discriminated auth union.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Agent workflow</h3>
                <p className="seg__desc">Agent-builder node graphs, grounded in the live node registry.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Deep agent</h3>
                <p className="seg__desc">System-prompted agents with tools, toolkits and knowledge bases.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">BPMN process</h3>
                <p className="seg__desc">Business processes — swimlanes and nodes expanded onto the canvas.</p>
              </article>
              <article className="seg rv" style={{ '--i': 4 }}>
                <span className="seg__no mono">05</span>
                <h3 className="seg__name">Dynamic classifier</h3>
                <p className="seg__desc">Classifier domains with labels, policies and F1-gated promotion.</p>
              </article>
              <article className="seg rv" style={{ '--i': 5 }}>
                <span className="seg__no mono">06</span>
                <h3 className="seg__name">UI flow &amp; templates</h3>
                <p className="seg__desc">Standalone multi-screen navigation and user-task screens.</p>
              </article>
              <article className="seg rv" style={{ '--i': 6 }}>
                <span className="seg__no mono">07</span>
                <h3 className="seg__name">Function</h3>
                <p className="seg__desc">Reusable Python or JavaScript business rules, safety-checked.</p>
              </article>
              <article className="seg rv" style={{ '--i': 7 }}>
                <span className="seg__no mono">08</span>
                <h3 className="seg__name">Custom component</h3>
                <p className="seg__desc">Reusable React building blocks embedded in your UIs.</p>
              </article>
              <article className="seg rv" style={{ '--i': 8 }}>
                <span className="seg__no mono">09</span>
                <h3 className="seg__name">Data model</h3>
                <p className="seg__desc">Typed project entities and fields — the schema everything binds to.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= SAFE BY STRUCTURE ================= */}
        <section className="section" id="safe">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Safe by structure</span>
              <div className="section__headline">
                <h2 className="h2 rv">Autonomy is the wrong target here<span className="amber">.</span></h2>
              </div>
            </div>
            <dl className="stats">
              <div className="stats__row rv" style={{ '--i': 0 }}>
                <dt><span className="stats__num">12</span></dt>
                <dd>platform artifact kinds, each contract-validated before it persists.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 1 }}>
                <dt><span className="stats__num">0</span></dt>
                <dd>write tools — persistence requires an explicit human Save click.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 2 }}>
                <dt><span className="stats__num">Live</span></dt>
                <dd>grounding against the running node registry, so unsupported capabilities can&apos;t be emitted.</dd>
              </div>
              <div className="stats__row rv" style={{ '--i': 3 }}>
                <dt><span className="stats__num">RBAC</span></dt>
                <dd>inherited from you — the agent acts with your session, never a service account.</dd>
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
              <span className="rv" style={{ '--i': 0 }}>Build platform artifacts</span>
              <span className="rv" style={{ '--i': 1 }}>by describing them<span className="amber">.</span></span>
            </h2>
            <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Describe an integration, a process, or a UI — we&apos;ll draft it,
              validated against your live project, and you click Save.</p>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
            </div>
          </div>
        </section>
      </main>
      <FlowxCodeInit />
    </>
  );
}
