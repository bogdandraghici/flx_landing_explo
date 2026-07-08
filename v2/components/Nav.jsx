/* Primary navigation — verbatim port of the v1 mega-menu markup.
   Static server component; megamenu.js (run by <Chrome>) enhances it with the
   WAI-ARIA disclosure behaviour + mobile drawer after hydration. */
export default function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="FlowX home">
          <svg className="nav__logo" viewBox="0 0 696 128" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX">
            <path d="M32.6 31.3999V54.1999H103.2V81.3999H32.6V123.7H0V3.8999H117.1V31.4999H32.6V31.3999Z" fill="currentColor" />
            <path d="M241.9 95.5999V123.7H134.1V3.8999H166.7V95.5999H241.9Z" fill="currentColor" />
            <path d="M247.7 63.8C247.7 23.2 276.3 0 320.6 0C364.9 0 393.6 23.3 393.6 63.8C393.6 104.3 364.8 127.6 320.6 127.6C276.3 127.6 247.7 104.4 247.7 63.8ZM360.3 63.8C360.3 41.2 345.1 28.4 320.5 28.4C296.1 28.4 280.7 41.2 280.7 63.8C280.7 86.4 295.9 99.2 320.5 99.2C345.1 99.2 360.3 86.4 360.3 63.8Z" fill="currentColor" />
            <path d="M595.5 3.8999L554.8 123.7H522.4L496.4 40.2999L470.2 123.7H438.1L397.2 3.8999H430.6L455 86.1999L481.7 3.8999H511.7L538.4 86.1999L562.8 3.8999H595.5Z" fill="currentColor" />
            <path d="M695.4 99.5H603.2V123.7H695.4V99.5Z" fill="#FCB813" />
            <path d="M663.4 38.5999L695.4 75.2999H665.9L648.5 54.8999L631.1 75.2999H603.3L635.2 38.9999L604.1 3.8999H633.7L650.2 23.1999L666.7 3.8999H694.6L663.4 38.5999Z" fill="currentColor" />
          </svg>
        </a>
        <nav className="nav__links" id="nav-links" aria-label="Primary">
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-platform">Platform <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-platform">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group">
                    <p className="nav__glabel mono">Build</p>
                    <a className="nav__link--desc" href="/agent-builder">
                      <span className="nav__link-t">Agent Builder</span>
                      <span className="nav__link-d">Design, evaluate, and ship AI agents</span>
                    </a>
                    <a className="nav__link--desc" href="/flowx-code">
                      <span className="nav__link-t">FlowX Code</span>
                      <span className="nav__link-d">The full platform, expressed as code</span>
                    </a>
                    <a className="nav__link--desc" href="/platform/developer-agents">
                      <span className="nav__link-t">Developer Agents</span>
                      <span className="nav__link-d">Agents that build alongside your team</span>
                    </a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Govern &amp; measure</p>
                    <a className="nav__link--desc" href="/observatory">
                      <span className="nav__link-t">Observatory</span>
                      <span className="nav__link-d">Trace every agent decision in production</span>
                    </a>
                    <a className="nav__link--desc" href="/platform/roi-hub">
                      <span className="nav__link-t">ROI Hub</span>
                      <span className="nav__link-d">Measure impact against a real baseline</span>
                    </a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Foundation</p>
                    <a className="nav__link--desc" href="/platform/ontology">
                      <span className="nav__link-t">Ontology Layer</span>
                      <span className="nav__link-d">One shared model of your business</span>
                    </a>
                    <a className="nav__link--desc" href="/platform/integrations">
                      <span className="nav__link-t">Integrations &amp; Connectors</span>
                      <span className="nav__link-d">Plug into core and legacy systems</span>
                    </a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Run</p>
                    <a className="nav__link--desc" href="/platform/security">
                      <span className="nav__link-t">Security &amp; Compliance</span>
                      <span className="nav__link-d">Controls built for regulated work</span>
                    </a>
                    <a className="nav__link--desc" href="/platform/deployment">
                      <span className="nav__link-t">Deployment</span>
                      <span className="nav__link-d">Cloud, hybrid, or on-prem</span>
                    </a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="/platform">Platform overview <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-solutions">Solutions <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-solutions">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group">
                    <p className="nav__glabel mono">By industry</p>
                    <a href="/banking"><span className="nav__link-t">Banking</span></a>
                    <a href="/insurance"><span className="nav__link-t">Insurance</span></a>
                    <a href="/logistics"><span className="nav__link-t">Logistics</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">By use case</p>
                    <a href="/solutions/onboarding"><span className="nav__link-t">Onboarding</span></a>
                    <a href="/solutions/lending"><span className="nav__link-t">Lending</span></a>
                    <a href="/solutions/underwriting"><span className="nav__link-t">Underwriting</span></a>
                    <a href="/solutions/claims"><span className="nav__link-t">Claims</span></a>
                    <a href="/solutions/quoting"><span className="nav__link-t">Quoting</span></a>
                    <a href="/solutions/track-and-trace"><span className="nav__link-t">Track &amp; trace</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Explore</p>
                    <a href="https://www.flowx.ai/ai-agents" target="_blank" rel="noopener"><span className="nav__link-t">All AI agents <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="https://www.flowx.ai/business-agents-roi-calculator" target="_blank" rel="noopener"><span className="nav__link-t">ROI calculator <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="/solutions">All solutions <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-research">Research <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-research">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group">
                    <p className="nav__glabel mono">Papers · eXponential6</p>
                    <a className="nav__link--mono" href="/research/vera"><span className="nav__link-t">VERA</span></a>
                    <a className="nav__link--mono" href="/research/orna-autotune"><span className="nav__link-t">ORNA / AutoTune</span></a>
                    <a className="nav__link--mono" href="/research/halo"><span className="nav__link-t">HALO</span></a>
                    <a className="nav__link--mono" href="/research/gavel"><span className="nav__link-t">GAVEL</span></a>
                    <a className="nav__link--mono" href="/research/sift"><span className="nav__link-t">SIFT</span></a>
                    <a className="nav__link--mono" href="/research/rails"><span className="nav__link-t">RAILS</span></a>
                    <a className="nav__link--mono" href="/research/mneme"><span className="nav__link-t">MNEMĒ</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Open models</p>
                    <a href="/models"><span className="nav__link-t">Models overview</span></a>
                    <a href="https://huggingface.co/flowx-ai" target="_blank" rel="noopener"><span className="nav__link-t">Download on Hugging Face <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="/models#benchmarks"><span className="nav__link-t">Benchmarks</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Approach</p>
                    <a href="/research/methodology"><span className="nav__link-t">Methodology</span></a>
                    <a href="/research/safety"><span className="nav__link-t">Safety &amp; governance</span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="/research">Research overview <span className="nav__arr" aria-hidden="true">→</span></a></p>
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
                    <a href="https://docs.flowx.ai/" target="_blank" rel="noopener"><span className="nav__link-t">Documentation <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="https://academy.flowx.ai/" target="_blank" rel="noopener"><span className="nav__link-t">Academy <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="/developers/cookbooks"><span className="nav__link-t">Cookbooks</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Reference</p>
                    <a href="https://docs.flowx.ai/api" target="_blank" rel="noopener"><span className="nav__link-t">API reference <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="/developers/changelog"><span className="nav__link-t">Changelog</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Models</p>
                    <a href="https://huggingface.co/flowx-ai" target="_blank" rel="noopener"><span className="nav__link-t">Open weights on Hugging Face <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="/models"><span className="nav__link-t">Model cards &amp; licenses</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Start</p>
                    <a href="https://docs.flowx.ai/quickstart" target="_blank" rel="noopener"><span className="nav__link-t">Quickstart <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                    <a href="https://flowxai.zendesk.com/" target="_blank" rel="noopener"><span className="nav__link-t">Support <span className="nav__ext" aria-hidden="true">↗</span></span></a>
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
                    <p className="nav__glabel mono">Latest</p>
                    <a className="nav__link--desc nav__post" href="https://www.flowx.ai/blog/we-built-a-calculator-to-show-you-the-expected-roi-for-a-selection-of-ai-agents-or-agent-stacks" target="_blank" rel="noopener">
                      <span className="nav__post-meta mono"><span className="nav__post-tag">ROI</span>Jul 3, 2026</span>
                      <span className="nav__link-t">We built a calculator for the expected ROI of AI agents <span className="nav__ext" aria-hidden="true">↗</span></span>
                    </a>
                    <a className="nav__link--desc nav__post" href="https://www.flowx.ai/blog/the-day-onboarding-stopped-being-a-loop" target="_blank" rel="noopener">
                      <span className="nav__post-meta mono"><span className="nav__post-tag">Use Cases</span>May 25, 2026</span>
                      <span className="nav__link-t">The day onboarding stopped being a loop <span className="nav__ext" aria-hidden="true">↗</span></span>
                    </a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Categories</p>
                    <a href="/blog/category/product"><span className="nav__link-t">Product</span></a>
                    <a href="/blog/category/engineering"><span className="nav__link-t">Engineering</span></a>
                    <a href="/blog/category/banking-insurance"><span className="nav__link-t">Banking &amp; Insurance</span></a>
                    <a href="/blog/category/governance-compliance"><span className="nav__link-t">Governance &amp; Compliance</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">More</p>
                    <a href="/blog-flowx-6"><span className="nav__link-t">Events — FlowX.AI 6</span></a>
                    <a href="/resources/webinars"><span className="nav__link-t">Webinars</span></a>
                    <a href="/resources/whitepapers"><span className="nav__link-t">Whitepapers</span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="/resources">All resources <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <button className="nav__trigger" type="button" aria-expanded="false" aria-controls="panel-customers">Customers <svg className="nav__caret" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="nav__panel" id="panel-customers">
              <div className="nav__sheet">
                <div className="nav__cols">
                  <div className="nav__group">
                    <p className="nav__glabel mono">Featured</p>
                    <a href="/customers"><span className="nav__link-t">Success stories</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Browse</p>
                    <a href="/customers#industry"><span className="nav__link-t">By industry</span></a>
                    <a href="/customers#use-case"><span className="nav__link-t">By use case</span></a>
                  </div>
                  <div className="nav__group">
                    <p className="nav__glabel mono">Prove it</p>
                    <a href="https://www.flowx.ai/business-agents-roi-calculator" target="_blank" rel="noopener"><span className="nav__link-t">ROI calculator <span className="nav__ext" aria-hidden="true">↗</span></span></a>
                  </div>
                </div>
                <p className="nav__foot mono"><a href="/customers">All customers <span className="nav__arr" aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
          <a className="nav__top" href="/about">Company</a>
        </nav>
        <div className="nav__right">
          <a className="btn btn--primary btn--sm" href="#cta">Book a demo</a>
          <button className="nav__burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><span className="nav__burger-lines" aria-hidden="true" /></button>
        </div>
      </div>
    </header>
  );
}
