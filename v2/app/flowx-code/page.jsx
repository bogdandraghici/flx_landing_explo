import FlowxCodeInit from '@/components/FlowxCodeInit';

export const metadata = {
  title: 'FlowX — FlowX Code',
  description: 'FlowX Code is a build copilot for regulated platforms. Describe a resource in one sentence; it drafts a contract-validated platform artifact — grounded in your live project, validated before it persists, and committed only when you click Save.',
};

export default function FlowxCode() {
  return (
    <>
      <main id="top">

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
                <a className="btn btn--primary btn--lg" href="#cta">Book a demo</a>
                <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
              </div>
              <p className="astats mono rv-load" style={{ '--d': 5 }}>
                <span>grounded · validated · human-gated</span>
              </p>
            </div>

            {/* contract compiler rail: natural language enters the CLI, is grounded by
                 the live registry, becomes one schema-bound resource bundle, validates,
                 then stops at the human Save gate before anything commits. */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="A natural-language CLI request is compiled into a live-registry-grounded, contract-validated resource bundle, then committed only after a human Save action">
                <g className="fxc-zones">
                  <line x1="210" y1="108" x2="210" y2="338" />
                  <line x1="364" y1="108" x2="364" y2="338" />
                  <text className="ivz-lbl" x="112" y="96" textAnchor="middle">write</text>
                  <text className="ivz-lbl" x="288" y="96" textAnchor="middle">compile resource</text>
                  <text className="ivz-lbl" x="406" y="96" textAnchor="middle">save</text>
                </g>

                <g className="fxc-terminal">
                  <rect className="fxc-term-shell" x="40" y="130" width="154" height="118" rx="12" />
                  <circle className="fxc-dot" cx="58" cy="148" r="2.5" />
                  <circle className="fxc-dot" cx="69" cy="148" r="2.5" />
                  <circle className="fxc-dot" cx="80" cy="148" r="2.5" />
                  <text className="fxc-cli" x="58" y="174">&gt; describe</text>
                  <line className="fxc-type fxc-type--one" x1="58" y1="194" x2="166" y2="194" />
                  <line className="fxc-type fxc-type--two" x1="58" y1="214" x2="138" y2="214" />
                  <g className="fxc-caret-track">
                    <rect className="fxc-caret" x="60" y="187" width="2" height="14" />
                  </g>
                </g>

                <line className="fxc-rail" x1="194" y1="210" x2="376" y2="210" />
                <line className="fxc-rail-hot" x1="194" y1="210" x2="376" y2="210" />

                <text className="ivz-lbl" x="112" y="284" textAnchor="middle">live registry</text>
                <g className="fxc-registry">
                  <rect className="fxc-reg-box" x="54" y="296" width="116" height="44" rx="8" />
                  <line className="fxc-reg-row" x1="68" y1="310" x2="154" y2="310" />
                  <line className="fxc-reg-row" x1="68" y1="318" x2="140" y2="318" />
                  <line className="fxc-reg-row" x1="68" y1="326" x2="150" y2="326" />
                </g>
                <path className="fxc-ground" d="M170 318 C202 318 204 286 238 286" />

                <g className="fxc-bundle">
                  <rect className="fxc-bundle-ghost" x="230" y="126" width="104" height="150" rx="12" />
                  <rect className="fxc-bundle-card" x="238" y="136" width="116" height="160" rx="12" />
                  <text className="ivz-lbl fxc-bundle-title" x="254" y="160" textAnchor="start" textLength="84" lengthAdjust="spacingAndGlyphs">resource bundle</text>
                  <line className="fxc-rule" x1="254" y1="174" x2="338" y2="174" />
                  <line className="fxc-slot" x1="254" y1="200" x2="338" y2="200" />
                  <line className="fxc-slot" x1="254" y1="226" x2="338" y2="226" />
                  <line className="fxc-slot" x1="254" y1="252" x2="338" y2="252" />
                  <line className="fxc-key" x1="254" y1="200" x2="276" y2="200" />
                  <line className="fxc-key" x1="254" y1="226" x2="276" y2="226" />
                  <line className="fxc-key" x1="254" y1="252" x2="276" y2="252" />
                  <line className="fxc-field" style={{ '--r': 0 }} x1="286" y1="200" x2="338" y2="200" />
                  <line className="fxc-field" style={{ '--r': 1 }} x1="286" y1="226" x2="328" y2="226" />
                  <line className="fxc-field" style={{ '--r': 2 }} x1="286" y1="252" x2="334" y2="252" />
                </g>

                <line className="fxc-gatepost" x1="406" y1="132" x2="406" y2="186" />
                <line className="fxc-gatepost" x1="406" y1="234" x2="406" y2="294" />
                <g className="fxc-wait">
                  <line className="fxc-barrier" x1="406" y1="186" x2="406" y2="234" />
                  <text className="ivz-lbl" x="406" y="314" textAnchor="middle">awaiting save</text>
                </g>

                <g className="fxc-commit">
                  <rect className="fxc-commit-glow" x="424" y="198" width="32" height="24" rx="6" />
                  <rect className="fxc-commit-card" x="428" y="201" width="25" height="18" rx="5" />
                  <path className="fxc-commit-mark" d="M434 210 l4 4 l9 -10" />
                </g>

                <g className="fxc-tag--draft" transform="translate(230 402)">
                  <rect className="ivz-tag" x="-78" y="-10" width="156" height="15" />
                  <text className="ivz-lbl" textAnchor="middle" y="1.5">drafted · validated · waiting</text>
                </g>
                <g className="fxc-tag--ok" transform="translate(230 402)">
                  <rect className="ivz-tag" x="-70" y="-10" width="140" height="15" />
                  <text className="ivz-lbl" textAnchor="middle" y="1.5">saved · committed</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= THESIS ================= */}
        <section className="abd-thesis">
          <div className="shell">
            <blockquote className="rv">In a code repository, a reviewer and a compiler stand between an agent&apos;s mistake and production. In a regulated platform, there is <span className="amber">neither</span>.</blockquote>
            <p className="rv" style={{ '--i': 1 }}>A build copilot&apos;s output isn&apos;t free-text code — it&apos;s a schema-bound artifact
              that takes effect the moment it&apos;s saved, with no diff review and no compiler in between. So FlowX Code
              inverts the field&apos;s optimization: not maximal autonomy, but grounded, validated, human-gated
              construction. The grounding, the validation and the human gate aren&apos;t friction — they&apos;re the compiler
              and the reviewer, moved into the agent.</p>
            <span className="abd-thesis__tag mono rv" style={{ '--i': 2 }}>FlowX Code · The most important thing to engineer into the loop is where it stops — at a human</span>
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
            <div className="segs abd-pipe">
              <article className="seg rv" style={{ '--i': 0 }}>
                <span className="seg__no mono">01</span>
                <h3 className="seg__name">Ground</h3>
                <p className="seg__desc">At session start it loads your live node registry, project metadata and permissions — so it can only emit capabilities the backend actually has.</p>
              </article>
              <article className="seg rv" style={{ '--i': 1 }}>
                <span className="seg__no mono">02</span>
                <h3 className="seg__name">Draft</h3>
                <p className="seg__desc">A complexity-aware router picks the right model; per-kind specialist sub-agents build the artifact against that live grounding.</p>
              </article>
              <article className="seg rv" style={{ '--i': 2 }}>
                <span className="seg__no mono">03</span>
                <h3 className="seg__name">Validate</h3>
                <p className="seg__desc">Per-kind contracts and Java-mirror validators reject a malformed emission before it persists — with the exact error the backend would return.</p>
              </article>
              <article className="seg rv" style={{ '--i': 3 }}>
                <span className="seg__no mono">04</span>
                <h3 className="seg__name">Commit</h3>
                <p className="seg__desc">Nothing mutates until you click Keep or Save. The loop&apos;s stopping condition is a human, on purpose.</p>
              </article>
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
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=FlowX%20Code%20demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href="#how">See how it works</a>
            </div>
          </div>
        </section>
      </main>
      <FlowxCodeInit />
    </>
  );
}
