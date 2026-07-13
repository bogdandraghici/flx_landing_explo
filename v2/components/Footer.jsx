import { bp } from './lib/base';
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
            <svg className="footer__logo" viewBox="0 0 108 21" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FlowX">
              <path d="M 107.652 16.06 L 93.191 16.06 L 93.191 19.858 L 107.652 19.858 Z" fill="#FCB813" />
              <path d="M 102.63 6.505 L 107.652 12.262 L 103.028 12.262 L 100.294 9.062 L 97.559 12.262 L 93.191 12.262 L 98.198 6.569 L 93.319 1.065 L 97.957 1.065 L 100.549 4.087 L 103.142 1.065 L 107.524 1.065 Z" fill="currentColor" />
              <path d="M 5.028 5.132 L 5.028 8.858 L 15.918 8.858 L 15.918 13.303 L 5.028 13.303 L 5.028 20.217 L 0 20.217 L 0 0.637 L 18.062 0.637 L 18.062 5.148 L 5.028 5.148 Z" fill="currentColor" />
              <path d="M 37.327 15.624 L 37.327 20.217 L 20.684 20.217 L 20.684 0.637 L 25.713 0.637 L 25.713 15.624 Z" fill="currentColor" />
              <path d="M 38.206 10.427 C 38.206 3.792 42.618 0 49.451 0 C 56.284 0 60.711 3.808 60.711 10.427 C 60.711 17.046 56.268 20.854 49.451 20.854 C 42.618 20.854 38.206 17.063 38.206 10.427 Z M 55.59 10.427 C 55.59 6.733 53.245 4.642 49.451 4.642 C 45.687 4.642 43.312 6.733 43.312 10.427 C 43.312 14.121 45.656 16.213 49.451 16.213 C 53.245 16.213 55.59 14.121 55.59 10.427 Z" fill="currentColor" />
              <path d="M 91.868 0.637 L 85.591 20.217 L 80.593 20.217 L 76.583 6.586 L 72.541 20.217 L 67.59 20.217 L 61.282 0.637 L 66.433 0.637 L 70.197 14.088 L 74.315 0.637 L 78.943 0.637 L 83.061 14.088 L 86.825 0.637 Z" fill="currentColor" />
            </svg>
            <address className="footer__offices mono">
              Charles de Gaulle Plaza, Piata Charles de Gaulle 15, 9th floor, 011857 Bucharest, Romania<br />
              352 Sharon Park Drive, Menlo Park, CA 94025
            </address>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <div>
              <h4 className="mono">Platform</h4>
              <a href={bp("/banking")}>Banking</a>
              <a href={bp("/insurance")}>Insurance</a>
              <a href={bp("/logistics")}>Logistics</a>
              <a href={bp("/agent-builder")}>Agent Builder</a>
              <a href={bp("/flowx-code")}>FlowX Code</a>
              <a href={bp("/observatory")}>Observatory</a>
              <a href={bp("/#proof")}>Proof</a>
            </div>
            <div>
              <h4 className="mono">Company</h4>
              <a href={bp("/about")}>About us</a>
            </div>
            <div>
              <h4 className="mono">Resources</h4>
              <a href={bp("/resources")}>Blog</a>
              <a href="https://docs.flowx.ai" target="_blank" rel="noopener">Documentation</a>
              <a href="https://academy.flowx.ai" target="_blank" rel="noopener">Academy</a>
              <a href={bp("/#cta")}>Support</a>
            </div>
            <div>
              <h4 className="mono">Legal</h4>
              <a href={bp("/privacy-policy")}>Privacy Policy</a>
              <a href={bp("/cookie-policy")}>Cookies</a>
              <a href={bp("/terms-and-conditions")}>Terms &amp; Conditions</a>
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
