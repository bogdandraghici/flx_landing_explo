import fs from 'node:fs';
import path from 'node:path';
import { bp } from '@/components/lib/base';
import CustomersInit from '@/components/CustomersInit';
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

            {/* the install base: a skyline of institutions above one shared platform rail.
                 Each building connects to the rail and its windows light up (journeys live
                 inside); the newest one is held "in review", then clears — the connection
                 runs amber, the tag flips to live, and traffic keeps moving on the rail. */}
            <div className="ahero__viz" aria-hidden="true">
              <svg viewBox="0 0 460 460" role="img" aria-label="Four institutions — a retail bank, a custodian, an insurer and a commercial bank — stand above one shared platform rail. Each connects to the rail and its windows light up; the newest connection is held in review, then clears and runs live, with traffic pulsing along the rail.">
                {/* back row: the rest of the install base, receded */}
                <rect className="ckv-back" x="128" y="176" width="44" height="164" />
                <rect className="ckv-back" x="296" y="176" width="44" height="164" />

                {/* ground + the platform rail beneath the skyline */}
                <line className="ckv-ground" x1="40" y1="340" x2="420" y2="340" />
                <line className="ckv-rail" x1="56" y1="392" x2="404" y2="392" />
                <text className="ivz-lbl" x="56" y="412" textAnchor="start">flowx platform</text>
                <text className="ivz-lbl" x="404" y="426" textAnchor="end">in production</text>

                {/* the counter: one tick per institution, filling as each connects */}
                <line className="ckv-count" x1="313" y1="410" x2="404" y2="410" />
                <line className="ckv-cf ckv-on1" x1="313" y1="410" x2="332" y2="410" />
                <line className="ckv-cf ckv-on2" x1="337" y1="410" x2="356" y2="410" />
                <line className="ckv-cf ckv-on3" x1="361" y1="410" x2="380" y2="410" />
                <line className="ckv-cf ckv-on4" x1="385" y1="410" x2="404" y2="410" />

                {/* the skyline: three live institutions + one being onboarded */}
                <rect className="ckv-bld" x="64" y="168" width="72" height="172" rx="4" />
                <rect className="ckv-bld" x="152" y="120" width="68" height="220" rx="4" />
                <rect className="ckv-bld" x="236" y="192" width="68" height="148" rx="4" />
                <rect className="ckv-bld ckv-t4-solid ckv-on4" x="320" y="152" width="76" height="188" rx="4" />
                <rect className="ckv-t4-draft" x="320" y="152" width="76" height="188" rx="4" />
                <text className="ivz-lbl" x="100" y="158" textAnchor="middle">retail bank</text>
                <text className="ivz-lbl" x="186" y="110" textAnchor="middle">custodian</text>
                <text className="ivz-lbl" x="270" y="182" textAnchor="middle">insurer</text>
                <text className="ivz-lbl" x="358" y="142" textAnchor="middle">commercial bank</text>

                {/* windows: faint until the institution's journeys go live */}
                <g className="ckv-win">
                  <rect x="76" y="186" width="18" height="3" rx="1.5" /><rect x="102" y="186" width="18" height="3" rx="1.5" />
                  <rect x="76" y="204" width="18" height="3" rx="1.5" /><rect x="102" y="204" width="18" height="3" rx="1.5" />
                  <rect x="76" y="222" width="18" height="3" rx="1.5" /><rect x="102" y="222" width="18" height="3" rx="1.5" />
                  <rect x="163" y="138" width="18" height="3" rx="1.5" /><rect x="189" y="138" width="18" height="3" rx="1.5" />
                  <rect x="163" y="156" width="18" height="3" rx="1.5" /><rect x="189" y="156" width="18" height="3" rx="1.5" />
                  <rect x="163" y="174" width="18" height="3" rx="1.5" /><rect x="189" y="174" width="18" height="3" rx="1.5" />
                  <rect x="163" y="192" width="18" height="3" rx="1.5" /><rect x="189" y="192" width="18" height="3" rx="1.5" />
                  <rect x="247" y="210" width="18" height="3" rx="1.5" /><rect x="273" y="210" width="18" height="3" rx="1.5" />
                  <rect x="247" y="228" width="18" height="3" rx="1.5" /><rect x="273" y="228" width="18" height="3" rx="1.5" />
                  <rect x="247" y="246" width="18" height="3" rx="1.5" /><rect x="273" y="246" width="18" height="3" rx="1.5" />
                  <rect x="333" y="170" width="18" height="3" rx="1.5" /><rect x="361" y="170" width="18" height="3" rx="1.5" />
                  <rect x="333" y="188" width="18" height="3" rx="1.5" /><rect x="361" y="188" width="18" height="3" rx="1.5" />
                  <rect x="333" y="206" width="18" height="3" rx="1.5" /><rect x="361" y="206" width="18" height="3" rx="1.5" />
                </g>
                <g className="ckv-win-on ckv-on1">
                  <rect x="76" y="186" width="18" height="3" rx="1.5" /><rect x="102" y="186" width="18" height="3" rx="1.5" />
                  <rect x="76" y="204" width="18" height="3" rx="1.5" /><rect x="102" y="204" width="18" height="3" rx="1.5" />
                  <rect x="76" y="222" width="18" height="3" rx="1.5" /><rect x="102" y="222" width="18" height="3" rx="1.5" />
                </g>
                <g className="ckv-win-on ckv-on2">
                  <rect x="163" y="138" width="18" height="3" rx="1.5" /><rect x="189" y="138" width="18" height="3" rx="1.5" />
                  <rect x="163" y="156" width="18" height="3" rx="1.5" /><rect x="189" y="156" width="18" height="3" rx="1.5" />
                  <rect x="163" y="174" width="18" height="3" rx="1.5" /><rect x="189" y="174" width="18" height="3" rx="1.5" />
                  <rect x="163" y="192" width="18" height="3" rx="1.5" /><rect x="189" y="192" width="18" height="3" rx="1.5" />
                </g>
                <g className="ckv-win-on ckv-on3">
                  <rect x="247" y="210" width="18" height="3" rx="1.5" /><rect x="273" y="210" width="18" height="3" rx="1.5" />
                  <rect x="247" y="228" width="18" height="3" rx="1.5" /><rect x="273" y="228" width="18" height="3" rx="1.5" />
                  <rect x="247" y="246" width="18" height="3" rx="1.5" /><rect x="273" y="246" width="18" height="3" rx="1.5" />
                </g>
                <g className="ckv-win-on ckv-on4">
                  <rect x="333" y="170" width="18" height="3" rx="1.5" /><rect x="361" y="170" width="18" height="3" rx="1.5" />
                  <rect x="333" y="188" width="18" height="3" rx="1.5" /><rect x="361" y="188" width="18" height="3" rx="1.5" />
                  <rect x="333" y="206" width="18" height="3" rx="1.5" /><rect x="361" y="206" width="18" height="3" rx="1.5" />
                </g>

                {/* connections: each institution drops a stem onto the rail */}
                <g className="ckv-on1">
                  <line className="ckv-stem" x1="100" y1="340" x2="100" y2="392" />
                  <circle className="ckv-port" cx="100" cy="392" r="3" />
                </g>
                <g className="ckv-on2">
                  <line className="ckv-stem" x1="186" y1="340" x2="186" y2="392" />
                  <circle className="ckv-port" cx="186" cy="392" r="3" />
                </g>
                <g className="ckv-on3">
                  <line className="ckv-stem" x1="270" y1="340" x2="270" y2="392" />
                  <circle className="ckv-port" cx="270" cy="392" r="3" />
                </g>
                <g className="ckv-stem4">
                  <line className="ckv-stem" x1="358" y1="340" x2="358" y2="392" />
                  <circle className="ckv-port" cx="358" cy="392" r="3" />
                </g>
                {/* the fourth connection is held in review, clears, and runs amber */}
                <line className="ckv-stem-hot" x1="358" y1="340" x2="358" y2="392" />
                <line className="ckv-hold" x1="350" y1="366" x2="366" y2="366" />
                <circle className="ckv-flash" cx="358" cy="366" r="7" />
                <g className="ckv-tag--rev" transform="translate(314 366)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">in review</text>
                </g>
                <g className="ckv-tag--live" transform="translate(314 366)">
                  <rect className="ivz-tag" x="-31" y="-10" width="62" height="14" />
                  <text className="ivz-lbl" textAnchor="middle" y="1">live</text>
                </g>

                {/* traffic: journeys riding the shared rail once connections exist */}
                <path id="ckvRail" fill="none" stroke="none" d="M56 392 H404" />
                <g className="ckv-dot"><circle r="2.6" />
                  <animateMotion dur="4s" repeatCount="indefinite"><mpath href="#ckvRail" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.13;0.15;0.9;0.94;1" dur="12s" repeatCount="indefinite" />
                </g>
                <g className="ckv-dot"><circle r="2.6" />
                  <animateMotion dur="4s" begin="2s" repeatCount="indefinite"><mpath href="#ckvRail" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.24;0.26;0.9;0.94;1" dur="12s" repeatCount="indefinite" />
                </g>
                {/* the cleared connection's first journey climbs into the building */}
                <g className="ckv-amb"><circle r="3" />
                  <animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.57;0.61;1"><mpath href="#ckvClimb" /></animateMotion>
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.57;0.58;0.6;0.62;1" dur="12s" repeatCount="indefinite" />
                </g>
                <path id="ckvClimb" fill="none" stroke="none" d="M358 392 L358 340" />
              </svg>
            </div>
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
            <div className="cust-led">
              {OUTCOMES.map((o, i) => (
                <figure key={i} className="cust-led__row rv" style={{ '--i': i }}>
                  <b className="cust-led__metric">{o.metric}</b>
                  <div className="cust-led__body">
                    <p className="cust-led__label">{o.label}</p>
                    <figcaption className="cust-led__who mono">
                      <span className="cust-led__dot" aria-hidden="true" />{o.who}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
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
