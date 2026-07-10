import { bp } from '@/components/lib/base';
import CtaFieldInit from '@/components/CtaFieldInit';

export const metadata = {
  title: 'FlowX — Resources',
  description: 'FlowX.AI resources — product documentation, the FlowX Academy, and the latest articles and insights on building mission-critical AI agents.',
};

export default function Resources() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        {/* two-column pattern mirrors agents.html / about.html: text left, viz right */}
        <section className="ahero" id="rhero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Resources · Docs, Academy &amp; Blog
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Everything you need to build with FlowX<span className="amber">.</span></span>
              </h1>
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                Product documentation, hands-on training, and the latest thinking on
                shipping mission-critical AI agents in regulated enterprises.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>3</b> resource hubs</span>
                <span><b>11</b> articles</span>
                <span><b>20+</b> topics</span>
                <span><b className="amber">●</b> updated weekly</span>
              </p>
            </div>

            {/* the metaphor: a body of reference being read + indexed — a stack of
                 docs, an amber read-head sweeping the front page while an index
                 marker tracks alongside on the rail. Purely decorative. */}
            <div className="ahero__viz" aria-hidden="true">
              <svg className="rk" viewBox="0 0 400 300" role="img" aria-label="A stack of reference documents being read and indexed, with an index rail tracking the reader">
                  {/* index rail (table of contents) */}
                  <line className="rk-rail" x1="66" y1="86" x2="66" y2="248" />
                  <circle className="rk-tick" cx="66" cy="96" r="2.6" />
                  <circle className="rk-tick" cx="66" cy="134" r="2.6" />
                  <circle className="rk-tick" cx="66" cy="172" r="2.6" />
                  <circle className="rk-tick" cx="66" cy="210" r="2.6" />

                  {/* stacked reference docs (front on top) */}
                  <rect className="rk-card rk-card--back" x="142" y="44" width="196" height="196" rx="12" />
                  <rect className="rk-card rk-card--back" x="126" y="58" width="196" height="196" rx="12" />
                  <rect className="rk-card" x="110" y="72" width="196" height="196" rx="12" />

                  {/* front page: heading + lines of text */}
                  <rect className="rk-title" x="130" y="94" width="92" height="9" rx="4" />
                  <line className="rk-line" x1="130" y1="126" x2="286" y2="126" />
                  <line className="rk-line" x1="130" y1="144" x2="270" y2="144" />
                  <line className="rk-line" x1="130" y1="162" x2="248" y2="162" />
                  <line className="rk-line" x1="130" y1="180" x2="286" y2="180" />
                  <line className="rk-line" x1="130" y1="198" x2="214" y2="198" />
                  <line className="rk-line" x1="130" y1="216" x2="262" y2="216" />
                  <line className="rk-line" x1="130" y1="234" x2="198" y2="234" />

                  {/* read head: sweeps the page top→bottom; the rail marker + a
                       connector track the same line, tying index to content */}
                  <g className="rk-read">
                    <rect className="rk-glow" x="112" y="93" width="192" height="15" rx="3" />
                    <line className="rk-conn" x1="66" y1="100" x2="110" y2="100" />
                    <circle className="rk-marker" cx="66" cy="100" r="3.6" />
                    <rect className="rk-scan" x="112" y="99.1" width="192" height="1.8" />
                    {/* SMIL (not CSS) so the reveal-layer doesn't rasterize empty */}
                    <animateTransform attributeName="transform" attributeType="XML" type="translate"
                      values="0 0; 0 140" keyTimes="0; 1" dur="3.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.12; 0.8; 1" dur="3.6s" repeatCount="indefinite" />
                  </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ================= LEARN (docs + academy) ================= */}
        <section className="section" id="learn">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / Learn</span>
              <div className="section__headline">
                <h2 className="h2 rv">Documentation and hands-on training<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Start with the reference, then go deep in the Academy.</p>
              </div>
            </div>

            <div className="portal">
              {/* VERIFY URL */}
              <a className="portal__card rv" style={{ '--i': 0 }} href="https://docs.flowx.ai" target="_blank" rel="noopener">
                <span className="portal__kicker mono">reference</span>
                <h3 className="portal__title">Documentation</h3>
                <p className="portal__desc">Guides, API references, and platform concepts — everything to design, build, integrate, and run agents on FlowX.</p>
                <span className="portal__go mono">docs.flowx.ai <span className="portal__arrow" aria-hidden="true">↗</span></span>
              </a>
              {/* VERIFY URL */}
              <a className="portal__card rv" style={{ '--i': 1 }} href="https://academy.flowx.ai" target="_blank" rel="noopener">
                <span className="portal__kicker mono">training</span>
                <h3 className="portal__title">Academy</h3>
                <p className="portal__desc">Structured courses and certifications that take teams from first agent to production, at their own pace.</p>
                <span className="portal__go mono">academy.flowx.ai <span className="portal__arrow" aria-hidden="true">↗</span></span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= BLOG ================= */}
        {/* content pulled from https://www.flowx.ai/blog — cards link to the live articles */}
        <section className="section" id="blog">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Blog</span>
              <div className="section__headline">
                <h2 className="h2 rv">Latest articles and insights<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>Field notes on agentic AI, governance, and integration from the team building it.</p>
              </div>
            </div>

            {/* featured latest post */}
            <a className="feat rv" href={bp("/blog-flowx-6")}>
              <div className="feat__body">
                <p className="feat__meta mono"><span className="feat__tag">Updates</span><span>Jun 29, 2026</span></p>
                <h3 className="feat__title">FlowX.AI 6 Release Summary</h3>
                <p className="feat__excerpt">The questions every enterprise is asking about their agentic AI roadmap — answered in one release: real use cases, measurable ROI, zero-hallucination guardrails, and recurring self-improvement at scale.</p>
                <span className="feat__go mono">Read the article <span aria-hidden="true">↗</span></span>
              </div>
              <div className="feat__side mono" aria-hidden="true">
                <span className="feat__badge">featured</span>
                <span className="feat__no">#06</span>
              </div>
            </a>

            {/* the rest of the feed */}
            <div className="blog__grid">
              <a className="post rv" style={{ '--i': 0 }} href="https://www.flowx.ai/blog/we-built-a-calculator-to-show-you-the-expected-roi-for-a-selection-of-ai-agents-or-agent-stacks" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">ROI</span><span>Jul 3, 2026</span></p>
                <h3 className="post__title">We built a calculator for the expected ROI of AI agents and agent stacks</h3>
                <p className="post__excerpt">Why measuring impact matters — and a way to project the return before you build.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 1 }} href="https://www.flowx.ai/blog/the-day-onboarding-stopped-being-a-loop" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Use Cases</span><span>May 25, 2026</span></p>
                <h3 className="post__title">The day onboarding stopped being a loop</h3>
                <p className="post__excerpt">Turning commercial onboarding from an endless back-and-forth into a single agentic flow.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 2 }} href="https://www.flowx.ai/blog/the-five-tests-of-mission-critical-ai" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Governance</span><span>Apr 28, 2026</span></p>
                <h3 className="post__title">The five tests of mission-critical AI</h3>
                <p className="post__excerpt">Pragmatic standards for judging whether an AI system is ready for real, regulated work.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 3 }} href="https://www.flowx.ai/blog/the-control-deficit-why-ai-copilots-fail-the-moment-they-touch-real-work" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Governance</span><span>Apr 1, 2026</span></p>
                <h3 className="post__title">The control deficit: why AI copilots fail the moment they touch real work</h3>
                <p className="post__excerpt">The gap isn't intelligence. It's controllability: evidence, identity, oversight, and reliability under stress.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 4 }} href="https://www.flowx.ai/blog/copilots-raise-productivity-operating-models-create-outcomes" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">AI Agents</span><span>Mar 4, 2026</span></p>
                <h3 className="post__title">Copilots raise productivity. Operating models create outcomes</h3>
                <p className="post__excerpt">Copilots alone are incomplete — outcomes need an operating model built around them.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 5 }} href="https://www.flowx.ai/blog/your-ai-strategy-is-only-as-strong-as-your-integration-layer" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Integration</span><span>Dec 16, 2025</span></p>
                <h3 className="post__title">Your AI strategy is only as strong as your integration layer</h3>
                <p className="post__excerpt">Where your AI gets its data decides how far your strategy can actually go.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 6 }} href="https://www.flowx.ai/blog/engines-vs-railroads-why-ai-agents-stall-in-enterprise-regulated-value-streams-and-how-to-make-them-work" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">AI Agents</span><span>Sep 15, 2025</span></p>
                <h3 className="post__title">Engines vs. railroads: why AI agents stall in regulated value streams</h3>
                <p className="post__excerpt">The barrier isn't model capability — it's the rails the agents have to run on.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 7 }} href="https://www.flowx.ai/blog/turn-ai-potential-into-production-reality-with-flowx-ai-s-integration-designer" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Integration</span><span>Aug 12, 2025</span></p>
                <h3 className="post__title">Turn AI potential into production reality with the Integration Designer</h3>
                <p className="post__excerpt">Cutting the timeline from API spec to a live, production integration.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 8 }} href="https://www.flowx.ai/blog/bridging-the-operational-divide-what-banking-can-learn-from-process-heavy-industries" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Banks</span><span>Jul 14, 2025</span></p>
                <h3 className="post__title">Bridging the operational divide: what banking can learn from process-heavy industries</h3>
                <p className="post__excerpt">Risk and compliance lessons banking can borrow from industries built on process.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
              <a className="post rv" style={{ '--i': 9 }} href="https://www.flowx.ai/blog/your-mainframe-is-not-legacy-the-way-you-are-using-is" target="_blank" rel="noopener">
                <p className="post__meta mono"><span className="post__tag">Mainframe</span><span>Jul 3, 2025</span></p>
                <h3 className="post__title">Your mainframe isn't legacy — the way you're using it is</h3>
                <p className="post__excerpt">Rethinking mainframe modernization: the asset was never the problem.</p>
                <span className="post__go mono" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">03 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Read the docs, then</span>
              <span className="rv" style={{ '--i': 1 }}>build your first agent<span className="amber">.</span></span>
            </h2>
            <div className="cta__row rv" style={{ '--i': 2 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href={bp("/banking")}>Explore Industries</a>
            </div>
          </div>
        </section>
      </main>
      <CtaFieldInit />
    </>
  );
}
