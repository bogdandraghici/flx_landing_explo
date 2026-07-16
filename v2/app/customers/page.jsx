import fs from 'node:fs';
import path from 'node:path';
import { bp } from '@/components/lib/base';
import CustomersInit from '@/components/CustomersInit';
import CustomersHeroViz from '@/components/CustomersHeroViz';
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
    <>
      <main id="top">
        {/* ================= HERO ================= */}
        <section className="ahero" id="chero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Customers &amp; partners
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>Trusted where the stakes are highest<span className="amber">.</span></span>
              </h1>
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                {CUSTOMER_COUNT} of the world&apos;s banks, insurers and technology partners run critical
                customer and operations journeys on FlowX.AI, modernizing on top of the cores they
                already have, under real regulatory scrutiny.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>{CUSTOMER_COUNT}</b> customers &amp; partners</span>
                <span><b>{SEGMENTS.length}</b> segments</span>
                <span><b className="amber">●</b> in production</span>
              </p>
            </div>

            {/* the hub: FlowX at the centre with the (anonymized) client roster
                 boxed around it, work flowing both ways along the spokes — each
                 endpoint carries a live agent count and a breathing status dot.
                 Ported from design variant 2b. */}
            <CustomersHeroViz className="ahero__viz" />
          </div>
        </section>

        {/* ================= LOGO WALL ================= */}
        <section className="section cust-section" id="industry">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">01 / Customers</span>
              <div className="section__headline">
                <h2 className="h2 rv">Who runs on FlowX<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>
                  The banks and insurers running critical journeys in production, and the technology
                  partners who deliver them. Grouped by what they run FlowX for.
                </p>
              </div>
            </div>
            {SEGMENTS.map((seg) => (
              <div key={seg.id} className="cust-group" id={seg.id}>
                <div className="cust-group__head rv">
                  <p className="cust-group__label mono">
                    {seg.label}<span className="cust-group__count">{seg.customers.length}</span>
                  </p>
                  <p className="cust-group__desc">{seg.desc}</p>
                </div>
                <ul className="cust-grid">
                  {seg.customers.map((c, i) => (
                    <li key={c.name} className="cust-tile rv" style={{ '--i': i }} title={c.name}>
                      <span className="cust-logo" role="img" aria-label={c.name} style={c.lh ? { '--lh': `${c.lh}px` } : undefined} dangerouslySetInnerHTML={{ __html: logoSvg(c.logo) }} />
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

        {/* ================= OUTCOMES ================= */}
        <section className="section cust-out-section" id="use-case">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Outcomes</span>
              <div className="section__headline">
                <h2 className="h2 rv">What production looks like<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>
                  Published results from live deployments. Attributions are anonymized at the
                  customer&apos;s request; the numbers are theirs.
                </p>
              </div>
            </div>
            <dl className="stats stats--obs">
              {OUTCOMES.map((o, i) => (
                <div key={i} className="stats__row rv" style={{ '--i': i }}>
                  <dt>
                    <span className="stats__val">
                      {o.pre && <span className="stats__unit mono">{o.pre}</span>}
                      <span className="stats__num mono" data-count={o.count} data-dec={o.dec}>{(0).toFixed(o.dec)}</span>
                      <span className="stats__unit mono">{o.unit}</span>
                    </span>
                    <svg className="stats__meter" viewBox="0 0 200 12" aria-hidden="true">
                      <line className="om-track" x1="0" y1="6" x2="200" y2="6" />
                      {o.ticks?.map((t) => (
                        <line key={t} className="om-tick" x1={t} y1="3" x2={t} y2="9" />
                      ))}
                      <line className="om-fill" x1="0" y1="6" x2={o.fill} y2="6" />
                      <line className="om-cap" x1={o.fill} y1="1.5" x2={o.fill} y2="10.5" />
                    </svg>
                  </dt>
                  <dd>{o.label} — {o.who}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">03 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>Join them in the</span>
              <span className="rv" style={{ '--i': 1 }}>5%<span className="amber">.</span></span>
            </h2>
            <p className="abd-cta__sub rv" style={{ '--i': 2 }}>Most AI initiatives never reach production. Bring a regulated journey and we&apos;ll show you a path that does, on your core, with the audit trail.</p>
            <div className="cta__row rv" style={{ '--i': 3 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
            </div>
          </div>
        </section>
      </main>
      <CustomersInit />
    </>
  );
}
