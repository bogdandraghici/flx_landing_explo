import { bp } from './lib/base';
import { POSTS } from '@/lib/blogData';

const LATEST = POSTS.slice(0, 2);
const fmtNavDate = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '');

/* Primary navigation — verbatim port of the v1 mega-menu markup.
   Static server component; megamenu.js (run by <Chrome>) enhances it with the
   WAI-ARIA disclosure behaviour + mobile drawer after hydration. */
export default function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav__inner">
        <a className="nav__brand" href={bp("/")} aria-label="FlowX home">
          {/* Official FlowX.AI wordmark, exactly as published on flowx.ai (extracted
              from the header SVG). Letters use currentColor so it flips with the
              theme; amber bar on the X. */}
          <svg className="nav__logo" viewBox="0 0 143 21" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX.AI">
            <path d="M 107.652 16.06 L 93.191 16.06 L 93.191 19.858 L 107.652 19.858 Z" fill="#FCB813" />
            <path d="M 102.63 6.505 L 107.652 12.262 L 103.028 12.262 L 100.294 9.062 L 97.559 12.262 L 93.191 12.262 L 98.198 6.569 L 93.319 1.065 L 97.957 1.065 L 100.549 4.087 L 103.142 1.065 L 107.524 1.065 Z" fill="currentColor" />
            <path d="M 5.028 5.132 L 5.028 8.858 L 15.918 8.858 L 15.918 13.303 L 5.028 13.303 L 5.028 20.217 L 0 20.217 L 0 0.637 L 18.062 0.637 L 18.062 5.148 L 5.028 5.148 Z" fill="currentColor" />
            <path d="M 37.327 15.624 L 37.327 20.217 L 20.684 20.217 L 20.684 0.637 L 25.713 0.637 L 25.713 15.624 Z" fill="currentColor" />
            <path d="M 38.206 10.427 C 38.206 3.792 42.618 0 49.451 0 C 56.284 0 60.711 3.808 60.711 10.427 C 60.711 17.046 56.268 20.854 49.451 20.854 C 42.618 20.854 38.206 17.063 38.206 10.427 Z M 55.59 10.427 C 55.59 6.733 53.245 4.642 49.451 4.642 C 45.687 4.642 43.312 6.733 43.312 10.427 C 43.312 14.121 45.656 16.213 49.451 16.213 C 53.245 16.213 55.59 14.121 55.59 10.427 Z" fill="currentColor" />
            <path d="M 91.868 0.637 L 85.591 20.217 L 80.593 20.217 L 76.583 6.586 L 72.541 20.217 L 67.59 20.217 L 61.282 0.637 L 66.433 0.637 L 70.197 14.088 L 74.315 0.637 L 78.943 0.637 L 83.061 14.088 L 86.825 0.637 Z" fill="currentColor" />
            <path d="M 110.686 19.318 C 110.686 18.68 111.133 18.206 111.796 18.206 C 112.46 18.206 112.907 18.68 112.907 19.318 C 112.907 19.955 112.46 20.429 111.796 20.429 C 111.133 20.446 110.686 19.972 110.686 19.318 Z" fill="currentColor" />
            <path d="M 133.159 14.431 L 120.094 14.431 L 117.056 20.217 L 115.529 20.217 L 125.878 0.637 L 127.405 0.637 L 137.755 20.217 L 136.228 20.217 Z M 132.465 13.091 L 126.603 1.978 L 120.773 13.091 Z" fill="currentColor" />
            <path d="M 141.627 20.217 L 141.627 0.637 L 143 0.637 L 143 20.217 Z" fill="currentColor" />
          </svg>
        </a>
        <nav className="nav__links" id="nav-links" aria-label="Primary">
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-platform">Platform <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-platform">
              <div className="nav__sheet nav__sheet--feat">
                <div className="nav__main">
                  <div className="nav__cols">
                    <div className="nav__group">
                      <p className="nav__glabel mono">Govern &amp; measure</p>
                      <a className="nav__link--desc" href={bp("/observatory")}>
                        <span className="nav__link-t">Observatory</span>
                        <span className="nav__link-d">Trace every agent decision in production</span>
                      </a>
                      <a className="nav__link--desc" href={bp("/platform/roi-hub")}>
                        <span className="nav__link-t">ROI Hub</span>
                        <span className="nav__link-d">Every dollar graded by its evidence</span>
                      </a>
                    </div>
                    <div className="nav__group">
                      <p className="nav__glabel mono">Foundation</p>
                      <a className="nav__link--desc" href={bp("/platform/ontology")}>
                        <span className="nav__link-t">Ontology Layer</span>
                        <span className="nav__link-d">One shared model of your business</span>
                      </a>
                      <a className="nav__link--desc" href={bp("/platform/integrations")}>
                        <span className="nav__link-t">Integrations &amp; Connectors</span>
                        <span className="nav__link-d">Plug into core and legacy systems</span>
                      </a>
                    </div>
                    <div className="nav__group">
                      <p className="nav__glabel mono">Run</p>
                      <a className="nav__link--desc" href={bp("/platform/security")}>
                        <span className="nav__link-t">Security &amp; Compliance</span>
                        <span className="nav__link-d">Controls built for regulated work</span>
                      </a>
                      <a className="nav__link--desc" href={bp("/platform/deployment")}>
                        <span className="nav__link-t">Deployment</span>
                        <span className="nav__link-d">Cloud, hybrid, or on-prem</span>
                      </a>
                      <a className="nav__link--desc" href={bp("/platform/status")}>
                        <span className="nav__link-t">Status</span>
                        <span className="nav__link-d">Live uptime across US &amp; EU</span>
                      </a>
                    </div>
                  </div>
                  <p className="nav__foot mono"><a href={bp("/platform")}>Platform overview <span className="nav__arr" aria-hidden="true">→</span></a></p>
                </div>
                {/* Right rail: the two "Build" products as equal featured cards —
                    Agent Builder and FlowX Code stacked, splitting the rail height so
                    neither reads as subordinate. Keeps the left side three balanced
                    columns instead of a lonely one-item "Build" column. Each card carries
                    its own motif, resolving to one amber accent:
                      · Agent Builder — an agent-flow node graph (design → branch → ship).
                      · FlowX Code — a platform-layer stack (echoing its L0→L3 hero),
                        the full platform expressed as code.
                    Both motifs are built from CSS shapes (+ an SVG for the graph's edges)
                    so they scale horizontally with the card, distinct from the ROI
                    sparkline and the agent-catalog tile grid. */}
                <div className="nav__side">
                  <a className="nav__feat" href={bp("/agent-builder")}>
                    <span className="nav__feat-kicker">Design, evaluate, and ship AI agents</span>
                    <span className="nav__feat-title">Agent Builder</span>
                    <span className="nav__feat-graph" aria-hidden="true">
                      <svg className="nav__feat-graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path className="nav__feat-graph-edge" d="M14,50 L44,22" vectorEffect="non-scaling-stroke" />
                        <path className="nav__feat-graph-edge" d="M14,50 L44,78" vectorEffect="non-scaling-stroke" />
                        <path className="nav__feat-graph-edge" d="M44,22 L82,50" vectorEffect="non-scaling-stroke" />
                        <path className="nav__feat-graph-edge" d="M44,78 L82,50" vectorEffect="non-scaling-stroke" />
                      </svg>
                      <span className="nav__feat-node" style={{ left: '14%', top: '50%' }} />
                      <span className="nav__feat-node" style={{ left: '44%', top: '22%' }} />
                      <span className="nav__feat-node" style={{ left: '44%', top: '78%' }} />
                      <span className="nav__feat-node nav__feat-node--amber" style={{ left: '82%', top: '50%' }} />
                    </span>
                    <span className="nav__feat-cta mono">Open Agent Builder <span className="nav__arr" aria-hidden="true">→</span></span>
                  </a>
                  <a className="nav__feat" href={bp("/flowx-code")}>
                    <span className="nav__feat-kicker">The full platform, expressed as code</span>
                    <span className="nav__feat-title">FlowX Code</span>
                    <span className="nav__feat-layers" aria-hidden="true">
                      <span className="nav__feat-layer" />
                      <span className="nav__feat-layer" />
                      <span className="nav__feat-layer nav__feat-layer--amber" />
                      <span className="nav__feat-layer" />
                    </span>
                    <span className="nav__feat-cta mono">Explore FlowX Code <span className="nav__arr" aria-hidden="true">→</span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-solutions">Solutions <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-solutions">
              <div className="nav__sheet nav__sheet--feat">
                <div className="nav__main">
                  <div className="nav__cols">
                    <div className="nav__group">
                      <p className="nav__glabel mono">By industry</p>
                      <a className="nav__link--desc" href={bp("/banking")}><span className="nav__link-t">Banking</span><span className="nav__link-d">Onboarding, lending, fraud, AML</span></a>
                      <a className="nav__link--desc" href={bp("/insurance")}><span className="nav__link-t">Insurance</span><span className="nav__link-d">Claims, underwriting, distribution</span></a>
                      <a className="nav__link--desc" href={bp("/logistics")}><span className="nav__link-t">Logistics</span><span className="nav__link-d">Freight, fleet, visibility</span></a>
                    </div>
                    <div className="nav__group nav__group--split">
                      <p className="nav__glabel mono">By use case</p>
                      <div className="nav__group-cols">
                        <a className="nav__link--desc" href={bp("/ai-agents?use=onboarding")}><span className="nav__link-t">Onboarding</span><span className="nav__link-d">KYC and account opening</span></a>
                        <a className="nav__link--desc" href={bp("/ai-agents?use=lending")}><span className="nav__link-t">Lending</span><span className="nav__link-d">Origination and credit</span></a>
                        <a className="nav__link--desc" href={bp("/ai-agents?use=underwriting")}><span className="nav__link-t">Underwriting</span><span className="nav__link-d">Risk, pricing, decisioning</span></a>
                        <a className="nav__link--desc" href={bp("/ai-agents?use=claims")}><span className="nav__link-t">Claims</span><span className="nav__link-d">Intake to settlement</span></a>
                        <a className="nav__link--desc" href={bp("/ai-agents?use=quoting")}><span className="nav__link-t">Quoting</span><span className="nav__link-d">Pricing and rate optimization</span></a>
                        <a className="nav__link--desc" href={bp("/ai-agents?industry=Logistics")}><span className="nav__link-t">Track &amp; trace</span><span className="nav__link-d">Shipment visibility</span></a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Featured: the AI agent catalog promoted to a card — a tile field
                    standing in for the 140+ agents, one amber (the resolved accent). */}
                <a className="nav__feat" href={bp("/ai-agents")}>
                  <span className="nav__feat-kicker">140+ production-ready agents</span>
                  <span className="nav__feat-title">All AI agents</span>
                  <span className="nav__feat-grid" aria-hidden="true">
                    <span className="nav__feat-grid-inner">
                      {['', 'on', '', '', 'on', '', '', 'on', 'on', '', '', 'amber', '', 'on', '', '', '', '', 'on', '', '', 'on', '', 'on'].map((v, i) => (
                        <span key={i} className={`nav__feat-tile${v ? ` nav__feat-tile--${v}` : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="nav__feat-cta mono">Browse the catalog <span className="nav__arr" aria-hidden="true">→</span></span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-research">Research <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-research">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group nav__group--split">
                    <p className="nav__glabel mono">Papers · eXponential6</p>
                    {/* 7 papers over two column-major columns (4 + 3); 4 rows so the
                        7th doesn't spill into an implicit third column */}
                    <div className="nav__group-cols" style={{ gridTemplateRows: 'repeat(4, auto)' }}>
                      <a className="nav__link--desc" href={bp("/research/vera")}><span className="nav__link-t mono">VERA</span><span className="nav__link-d">Evidence-graded ROI for agents</span></a>
                      <a className="nav__link--desc" href={bp("/research/orna-autotune")}><span className="nav__link-t mono">ORNA</span><span className="nav__link-d">Agent self-adaptation in production</span></a>
                      <a className="nav__link--desc" href={bp("/research/halo")}><span className="nav__link-t mono">HALO</span><span className="nav__link-d">Zero hallucination, by construction</span></a>
                      <a className="nav__link--desc" href={bp("/research/gavel")}><span className="nav__link-t mono">GAVEL</span><span className="nav__link-d">Governance, evidenced at runtime</span></a>
                      <a className="nav__link--desc" href={bp("/research/sift")}><span className="nav__link-t mono">SIFT</span><span className="nav__link-d">A classifier that teaches itself</span></a>
                      <a className="nav__link--desc" href={bp("/research/rails")}><span className="nav__link-t mono">RAILS</span><span className="nav__link-d">Deterministic graphs, stochastic nodes</span></a>
                      <a className="nav__link--desc" href={bp("/research/mneme")}><span className="nav__link-t mono">MNEMĒ</span><span className="nav__link-d">Safe, active agent memory</span></a>
                    </div>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Open models</p>
                    <a className="nav__link--desc" href={bp("/models")}><span className="nav__link-t">Models overview</span><span className="nav__link-d">Open-weight models, benchmarked</span></a>
                    <a className="nav__link--desc" href="https://huggingface.co/flowxai" target="_blank" rel="noopener"><span className="nav__link-t">Hugging Face <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Download the open weights</span></a>
                    <a className="nav__link--desc" href={bp("/models#benchmarks")}><span className="nav__link-t">Benchmarks</span><span className="nav__link-d">Head-to-head vs frontier models</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Approach</p>
                    <a className="nav__link--desc" href={bp("/research/methodology")}><span className="nav__link-t">Methodology</span><span className="nav__link-d">How we build and evaluate</span></a>
                    <a className="nav__link--desc" href={bp("/research/safety")}><span className="nav__link-t">Safety &amp; governance</span><span className="nav__link-d">Controls for regulated AI</span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href={bp("/research")}>Research overview <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-developers">Developers <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-developers">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group">
                    <p className="nav__glabel mono">Learn</p>
                    <a className="nav__link--desc" href="https://docs.flowx.ai/" target="_blank" rel="noopener"><span className="nav__link-t">Documentation <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Guides and platform reference</span></a>
                    <a className="nav__link--desc" href="https://academy.flowx.ai/" target="_blank" rel="noopener"><span className="nav__link-t">Academy <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Courses and certification</span></a>
                    <a className="nav__link--desc" href="https://docs.flowx.ai/5.9/cookbooks/overview" target="_blank" rel="noopener"><span className="nav__link-t">Cookbooks <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Recipes and patterns</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Reference</p>
                    <a className="nav__link--desc" href="https://docs.flowx.ai/api" target="_blank" rel="noopener"><span className="nav__link-t">API reference <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Endpoints and schemas</span></a>
                    <a className="nav__link--desc" href="https://docs.flowx.ai/release-notes/overview" target="_blank" rel="noopener"><span className="nav__link-t">Release notes <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">What&apos;s new each version</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Models</p>
                    <a className="nav__link--desc" href="https://huggingface.co/flowxai" target="_blank" rel="noopener"><span className="nav__link-t">Hugging Face <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Pull the open weights</span></a>
                    <a className="nav__link--desc" href={bp("/models")}><span className="nav__link-t">Model cards &amp; licenses</span><span className="nav__link-d">Specs, benchmarks, terms</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Start</p>
                    <a className="nav__link--desc" href="https://docs.flowx.ai/quickstart" target="_blank" rel="noopener"><span className="nav__link-t">Quickstart <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">From zero to running</span></a>
                    <a className="nav__link--desc" href="https://flowxai.zendesk.com/" target="_blank" rel="noopener"><span className="nav__link-t">Support <span className="nav__ext" aria-hidden="true">↗</span></span><span className="nav__link-d">Get help from our team</span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="https://docs.flowx.ai/" target="_blank" rel="noopener">docs.flowx.ai <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-resources">Resources <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-resources">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group nav__group--wide">
                    <p className="nav__glabel mono">Latest from the Knowledge Hub</p>
                    {/* the two latest posts promoted to featured article cards —
                        a tag · date meta line and the title, kept spare */}
                    {LATEST.map((p) => (
                      <a key={p.slug} className="nav__post-card" href={bp(`/blog/${p.slug}`)}>
                        <span className="nav__post-meta mono">
                          <span className="nav__post-tag">{p.tags[0]}</span>
                          <span>{fmtNavDate(p.date)}</span>
                        </span>
                        <span className="nav__post-title">{p.title}</span>
                      </a>
                    ))}
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Topics</p>
                    <a href={bp("/blog?tag=Legacy+core")}><span className="nav__link-t">Legacy core</span></a>
                    <a href={bp("/blog?tag=Lending")}><span className="nav__link-t">Lending</span></a>
                    <a href={bp("/blog?tag=Compliance")}><span className="nav__link-t">Compliance</span></a>
                    <a href={bp("/blog?tag=Cost+%26+ROI")}><span className="nav__link-t">Cost &amp; ROI</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Tools</p>
                    <a className="nav__link--desc" href={bp("/ai-agents")}>
                      <span className="nav__link-t">AI agents catalog</span>
                      <span className="nav__link-d">Browse 140+ agents by industry &amp; effort</span>
                    </a>
                    <a className="nav__link--desc" href={bp("/roi-calculator")}>
                      <span className="nav__link-t">ROI calculator</span>
                      <span className="nav__link-d">Estimate savings for an agent stack</span>
                    </a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">More</p>
                    <a href={bp("/blog")}><span className="nav__link-t">Knowledge Hub — all articles</span></a>
                    <a href={bp("/blog-flowx-6")}><span className="nav__link-t">Events — FlowX.AI 6</span></a>
                    <a href={bp("/resources/webinars")}><span className="nav__link-t">Webinars</span></a>
                    <a href={bp("/research")}><span className="nav__link-t">Research papers</span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href={bp("/blog")}>Explore the Knowledge Hub <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-customers">Customers <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-customers">
              <div className="nav__sheet nav__sheet--feat">
                <div className="nav__main">
                  <div className="nav__cols">
                    <div className="nav__group">
                      <p className="nav__glabel mono">Featured</p>
                      <a className="nav__link--desc" href={bp("/customers")}><span className="nav__link-t">Success stories</span><span className="nav__link-d">Banks and insurers running on FlowX</span></a>
                    </div>
                    <div className="nav__group">
                      <p className="nav__glabel mono">Browse</p>
                      <a className="nav__link--desc" href={bp("/customers#industry")}><span className="nav__link-t">By industry</span><span className="nav__link-d">Banking, insurance, logistics</span></a>
                      <a className="nav__link--desc" href={bp("/customers#use-case")}><span className="nav__link-t">By outcome</span><span className="nav__link-d">Automation, time saved, cost</span></a>
                    </div>
                  </div>
                  <p className="nav__foot mono"><a href={bp("/customers")}>All customers <span className="nav__arr" aria-hidden="true">→</span></a></p>
                </div>
                {/* Primary option: ROI calculator promoted to a feature card with a
                    "rising trend" sparkline climbing to an amber endpoint (the site's
                    ROI motif — amber reserved for the resolved outcome). */}
                <a className="nav__feat" href={bp("/roi-calculator")}>
                  <span className="nav__feat-kicker">See your return in minutes</span>
                  <span className="nav__feat-title">ROI Calculator</span>
                  <span className="nav__feat-spark" aria-hidden="true">
                    <svg viewBox="0 0 324 128" width="100%" height="100%" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="navFeatSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" className="nav__feat-spark-stop0" />
                          <stop offset="100%" className="nav__feat-spark-stop1" />
                        </linearGradient>
                      </defs>
                      <path className="nav__feat-spark-area" d="M0,104 L54,86 L108,94 L162,58 L216,44 L270,26 L324,10 L324,128 L0,128 Z" />
                      <path className="nav__feat-spark-line" d="M0,104 L54,86 L108,94 L162,58 L216,44 L270,26 L324,10" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="nav__feat-spark-dot" />
                  </span>
                  <span className="nav__feat-cta mono">Open the calculator <span className="nav__arr" aria-hidden="true">→</span></span>
                </a>
              </div>
            </div>
          </div>
          <a className="nav__top" href={bp("/about")}>Company</a>
        </nav>
        <div className="nav__right">
          <a className="btn btn--primary btn--sm" href="#demo">Book a demo</a>
          <button className="nav__burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><span className="nav__burger-lines" aria-hidden="true" /></button>
        </div>
      </div>
    </header>
  );
}
