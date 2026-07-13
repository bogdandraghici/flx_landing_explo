import fs from 'node:fs';
import path from 'node:path';
import { bp } from '@/components/lib/base';
import { SEGMENTS, OUTCOMES, CUSTOMER_COUNT } from '@/lib/customersData';

/* Inline the logo SVGs at build so `currentColor` inherits the page color
   (an <img>-loaded SVG can't) — that's what makes the wall a uniform, muted,
   theme-aware monochrome. Trusted local assets. */
function logoSvg(logoPath) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'public', logoPath), 'utf8');
  } catch {
    return '';
  }
}

export const metadata = {
  title: 'FlowX — Customers',
  description:
    'The banks, insurers and delivery partners running critical customer and operations journeys on FlowX.AI — BNP Paribas, UniCredit, OTP Bank, Banca Transilvania, State Street, Legal & General, Signal Iduna, Triglav, IBM, Kyndryl and more.',
};

export default function CustomersPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Customers &amp; partners</span>
            <div className="section__headline">
              <h1 className="h2 rv">Trusted where the stakes are highest<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                {CUSTOMER_COUNT} of the world&apos;s banks, insurers and technology partners run critical
                customer and operations journeys on FlowX.AI — modernizing on top of the cores they already
                have, under real regulatory scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUTCOMES ================= */}
      <section className="section cust-out-section" id="use-case">
        <div className="shell">
          <div className="cust-out">
            {OUTCOMES.map((o, i) => (
              <div key={i} className="cust-out__card rv" style={{ '--i': i }}>
                <span className="cust-out__metric">{o.metric}</span>
                <span className="cust-out__label">{o.label}</span>
                <span className="cust-out__who mono">{o.who}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOGO WALL ================= */}
      <section className="section cust-section" id="industry">
        <div className="shell">
          {SEGMENTS.map((seg) => (
            <div key={seg.id} className="cust-group" id={seg.id}>
              <p className="cust-group__label mono">{seg.label}</p>
              <ul className="cust-grid">
                {seg.customers.map((c) => (
                  <li key={c.name} className="cust-tile" title={c.name} aria-label={c.name}>
                    <span className="cust-logo" role="img" aria-label={c.name} dangerouslySetInnerHTML={{ __html: logoSvg(c.logo) }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="cust-note mono">
            Logos shown are customers and technology partners of FlowX.AI. Outcome metrics are anonymized at
            the customer&apos;s request.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta" id="cta">
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span>Join them in the</span>
            <span>5%<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub">Most AI initiatives never reach production. Bring a regulated journey and we&apos;ll show you a path that does — on your core, with the audit trail.</p>
          <div className="cta__row">
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=FlowX%20for%20our%20institution">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
          </div>
        </div>
      </section>
    </main>
  );
}
