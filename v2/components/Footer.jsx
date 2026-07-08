/* Site footer — verbatim port of the v1 footer markup. Canonical across all
   pages (v1's per-page variants differed only in a couple of links); cross-page
   anchors use root-absolute paths so they resolve from any route. #year is
   filled by initChrome() in <Chrome>. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__id">
            <svg className="footer__logo" viewBox="0 0 696 128" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX">
              <path d="M32.6 31.3999V54.1999H103.2V81.3999H32.6V123.7H0V3.8999H117.1V31.4999H32.6V31.3999Z" fill="currentColor" />
              <path d="M241.9 95.5999V123.7H134.1V3.8999H166.7V95.5999H241.9Z" fill="currentColor" />
              <path d="M247.7 63.8C247.7 23.2 276.3 0 320.6 0C364.9 0 393.6 23.3 393.6 63.8C393.6 104.3 364.8 127.6 320.6 127.6C276.3 127.6 247.7 104.4 247.7 63.8ZM360.3 63.8C360.3 41.2 345.1 28.4 320.5 28.4C296.1 28.4 280.7 41.2 280.7 63.8C280.7 86.4 295.9 99.2 320.5 99.2C345.1 99.2 360.3 86.4 360.3 63.8Z" fill="currentColor" />
              <path d="M595.5 3.8999L554.8 123.7H522.4L496.4 40.2999L470.2 123.7H438.1L397.2 3.8999H430.6L455 86.1999L481.7 3.8999H511.7L538.4 86.1999L562.8 3.8999H595.5Z" fill="currentColor" />
              <path d="M695.4 99.5H603.2V123.7H695.4V99.5Z" fill="#FCB813" />
              <path d="M663.4 38.5999L695.4 75.2999H665.9L648.5 54.8999L631.1 75.2999H603.3L635.2 38.9999L604.1 3.8999H633.7L650.2 23.1999L666.7 3.8999H694.6L663.4 38.5999Z" fill="currentColor" />
            </svg>
            <address className="footer__offices mono">
              Charles de Gaulle Plaza, Piata Charles de Gaulle 15, 9th floor, 011857 Bucharest, Romania<br />
              352 Sharon Park Drive, Menlo Park, CA 94025
            </address>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <div>
              <h4 className="mono">Platform</h4>
              <a href="/banking">Banking</a>
              <a href="/insurance">Insurance</a>
              <a href="/logistics">Logistics</a>
              <a href="/agent-builder">Agent Builder</a>
              <a href="/flowx-code">FlowX Code</a>
              <a href="/observatory">Observatory</a>
              <a href="/#proof">Proof</a>
            </div>
            <div>
              <h4 className="mono">Company</h4>
              <a href="/about">About us</a>
            </div>
            <div>
              <h4 className="mono">Resources</h4>
              <a href="/resources">Blog</a>
              <a href="https://docs.flowx.ai" target="_blank" rel="noopener">Documentation</a>
              <a href="https://academy.flowx.ai" target="_blank" rel="noopener">Academy</a>
              <a href="/#cta">Support</a>
            </div>
            <div>
              <h4 className="mono">Legal</h4>
              <a href="https://www.flowx.ai/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
              <a href="https://www.flowx.ai/cookies" target="_blank" rel="noopener">Cookies</a>
              <a href="https://www.flowx.ai/terms-and-conditions" target="_blank" rel="noopener">Terms &amp; Conditions</a>
            </div>
          </nav>
        </div>
        <div className="footer__base mono">
          <span>© <span id="year">2026</span> FlowX.AI Business Systems — Bucharest · Menlo Park</span>
        </div>
      </div>
    </footer>
  );
}
