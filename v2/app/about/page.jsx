import { bp } from '@/components/lib/base';
import AboutInit from '@/components/AboutInit';

export const metadata = {
  title: 'FlowX — About us',
  description: 'FlowX.AI — more than a decade of research and development in AI for mission-critical systems. Our mission, leadership, timeline, and offices.',
};

export default function About() {
  return (
    <>
      <main id="top">

        {/* ================= HERO ================= */}
        {/* two-column pattern mirrors agents.html: text left, animated system viz right */}
        <section className="ahero" id="ahero">
          <div className="shell ahero__grid">
            <div className="ahero__text">
              <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
                <span className="tick" aria-hidden="true" />
                Company · About FlowX.AI
              </p>
              <h1 className="hero__title">
                <span className="hero__line hero__line--big rv-load" style={{ '--d': 1 }}>More than a decade of R&amp;D in AI<span className="amber">.</span></span>
              </h1>
              <p className="hero__sub rv-load" style={{ '--d': 2 }}>
                FlowX.AI is built for the large-scale development of
                mission-critical systems.
              </p>
              <p className="astats mono rv-load" style={{ '--d': 3 }}>
                <span><b>2013</b> founded</span>
                <span><b>10+</b> yrs of R&amp;D</span>
                <span><b>2</b> offices</span>
                <span><b className="amber">●</b> largest series A in enterprise software</span>
              </p>
            </div>

            {/* the mission encoded as a system that evolves itself — a twisting
                 double helix; rungs are generated + animated in about.js */}
            <aside className="mviz rv-load" style={{ '--d': 2 }} aria-hidden="true">
              <div className="mviz__bar mono"><span>FlowX · DNA</span><span className="mviz__live"><i></i>encoded to evolve</span></div>
              <div className="mviz__stage">
                <div className="dna"></div>
              </div>
              <div className="mviz__foot mono">
                <div className="mviz__stat">
                  <span className="mviz__k">focus</span>
                  <span className="mviz__v">mission-critical</span>
                </div>
                <div className="mviz__stat">
                  <span className="mviz__k">method</span>
                  <span className="mviz__v">research-led</span>
                </div>
                <div className="mviz__stat">
                  <span className="mviz__k">principle</span>
                  <span className="mviz__v amber">safe by design</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="section" id="mission">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">02 / Mission</span>
              <div className="section__headline">
                <h2 className="h2 rv">Unlock new business value for enterprises by democratizing the creation of mission-critical systems with <span className="amber">safe AI</span>.</h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>We provide a secure foundation for embedding AI in highly
                  regulated environments, paving the way for enterprise platforms
                  that can self-maintain and evolve autonomously.</p>
              </div>
            </div>

            {/* the mission as safe AI: an AI process running inside a governance
                 boundary, cleared through validation checkpoints before it ships */}
            <figure className="mfound rv" style={{ '--i': 2 }} role="img" aria-label="An AI process running inside a governance boundary, cleared through policy, validation and audit checkpoints before emerging as safe output">
                <svg className="mfound__svg" viewBox="0 0 1000 280" aria-hidden="true">
                  {/* the governance boundary: everything runs inside a regulated envelope */}
                  <rect className="mgrd-bound" x="48" y="56" width="904" height="168" rx="18"/>
                  <text className="mgrd-lbl" x="48" y="44">regulated environment</text>

                  {/* guardrails channelling the AI between safe bounds */}
                  <line className="mgrd-rail" x1="200" y1="112" x2="840" y2="112"/>
                  <line className="mgrd-rail" x1="200" y1="168" x2="840" y2="168"/>

                  {/* the AI process, checked at every gate before it may proceed */}
                  <path id="mgrdFlow" className="mgrd-flow" d="M150 140 L890 140"/>

                  <g>
                    <line className="mgrd-gate" x1="330" y1="108" x2="330" y2="172"/>
                    <line className="mgrd-gate" x1="324" y1="108" x2="336" y2="108"/>
                    <line className="mgrd-gate" x1="324" y1="172" x2="336" y2="172"/>
                    <path className="mgrd-check" d="M330 132 L338 140 L330 148 L322 140 Z"/>
                    <text className="mgrd-lbl" x="330" y="202" textAnchor="middle">policy</text>
                  </g>
                  <g>
                    <line className="mgrd-gate" x1="520" y1="108" x2="520" y2="172"/>
                    <line className="mgrd-gate" x1="514" y1="108" x2="526" y2="108"/>
                    <line className="mgrd-gate" x1="514" y1="172" x2="526" y2="172"/>
                    <path className="mgrd-check--live" d="M520 132 L528 140 L520 148 L512 140 Z"/>
                    <text className="mgrd-lbl mgrd-lbl--amber" x="520" y="202" textAnchor="middle">validate</text>
                  </g>
                  <g>
                    <line className="mgrd-gate" x1="710" y1="108" x2="710" y2="172"/>
                    <line className="mgrd-gate" x1="704" y1="108" x2="716" y2="108"/>
                    <line className="mgrd-gate" x1="704" y1="172" x2="716" y2="172"/>
                    <path className="mgrd-check" d="M710 132 L718 140 L710 148 L702 140 Z"/>
                    <text className="mgrd-lbl" x="710" y="202" textAnchor="middle">audit</text>
                  </g>

                  {/* raw AI in on the left, validated-safe output on the right */}
                  <circle className="mgrd-node" cx="150" cy="140" r="6"/>
                  <text className="mgrd-lbl" x="150" y="202" textAnchor="middle">AI</text>
                  <circle className="mgrd-node--live" cx="890" cy="140" r="6"/>
                  <text className="mgrd-lbl mgrd-lbl--amber" x="890" y="202" textAnchor="middle">safe AI</text>

                  {/* the process flowing through the checks, continuously */}
                  <circle className="mgrd-pulse" r="3.5"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#mgrdFlow"/></animateMotion></circle>
                </svg>
            </figure>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="section" id="team">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">03 / Team</span>
              <div className="section__headline">
                <h2 className="h2 rv">Leadership &amp; Team<span className="amber">.</span></h2>
                <p className="section__lede rv" style={{ '--i': 1 }}>An experienced team of professionals powering progress with passion and&nbsp;expertise.</p>
              </div>
            </div>

            <ul className="crew">
              <li className="crew__card rv" style={{ '--i': 0 }}>
                <figure className="crew__photo">
                  <img src={bp("/team/ioan-iacob.jpg")} alt="Ioan Iacob, CEO and Founder of FlowX.AI" width="1024" height="1024" loading="lazy" />
                </figure>
                <div className="crew__meta">
                  <h3 className="crew__name">Ioan Iacob</h3>
                  <p className="crew__role mono">CEO and Founder</p>
                  <p className="crew__bio">Steadfast innovator who gets things done</p>
                </div>
              </li>
              <li className="crew__card rv" style={{ '--i': 1 }}>
                <figure className="crew__photo">
                  <img src={bp("/team/serban-chiricescu.jpg")} alt="Serban Chiricescu, CTO and Co-Founder of FlowX.AI" width="1024" height="1024" loading="lazy" />
                </figure>
                <div className="crew__meta">
                  <h3 className="crew__name">Serban Chiricescu</h3>
                  <p className="crew__role mono">CTO and Co-Founder</p>
                  <p className="crew__bio">Dedicated software architect, powered by relentless passion</p>
                </div>
              </li>
              <li className="crew__card rv" style={{ '--i': 2 }}>
                <figure className="crew__photo">
                  <img src={bp("/team/adrian-tomoiaga.jpg")} alt="Adrian Tomoiaga, CCO of FlowX.AI" width="1024" height="1024" loading="lazy" />
                </figure>
                <div className="crew__meta">
                  <h3 className="crew__name">Adrian Tomoiaga</h3>
                  <p className="crew__role mono">CCO</p>
                  <p className="crew__bio">Morale-boosting mentor, turning routine into inspiration</p>
                </div>
              </li>
              <li className="crew__card rv" style={{ '--i': 3 }}>
                <figure className="crew__photo">
                  <img src={bp("/team/radu-cautis.jpg")} alt="Radu Cautis, Executive Chairman of FlowX.AI" width="1024" height="1024" loading="lazy" />
                </figure>
                <div className="crew__meta">
                  <h3 className="crew__name">Radu Cautis</h3>
                  <p className="crew__role mono">Executive Chairman</p>
                  <p className="crew__bio">Venture visionary and a technology-to-solution builder</p>
                </div>
              </li>
            </ul>

            <figure className="crew__wide rv">
              <img src={bp("/team/team-snapshot.jpg")} alt="FlowX.AI team snapshot" width="2048" height="1152" loading="lazy" />
              <figcaption className="crew__cap mono">
                <span>team.snapshot — the people behind the platform</span>
                <span>bucharest · menlo park</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ================= TIMELINE ================= */}
        <section className="section" id="timeline">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">04 / Timeline</span>
              <div className="section__headline">
                <h2 className="h2 rv">From framework to FlowX 5<span className="amber">.</span></h2>
              </div>
            </div>
            <ol className="tl">
              <li className="tl__row rv" style={{ '--i': 0 }}>
                <span className="tl__year mono">2013</span>
                <span className="tl__node" aria-hidden="true"></span>
                <div className="tl__body">
                  <span className="tl__slug mono">#0001 — inflection-point</span>
                  <h3>Inflection point</h3>
                  <p>We started building our own enterprise technology framework.</p>
                </div>
              </li>
              <li className="tl__row rv" style={{ '--i': 1 }}>
                <span className="tl__year mono">2021</span>
                <span className="tl__node" aria-hidden="true"></span>
                <div className="tl__body">
                  <span className="tl__slug mono">#0002 — a-new-beginning</span>
                  <h3>A new beginning</h3>
                  <p>After a successful exit, we launched FlowX.AI to provide a
                    foundation for the next generation of enterprise technology.
                    In the same year, we successfully raised one of the largest
                    seed rounds in Europe.</p>
                </div>
              </li>
              <li className="tl__row rv" style={{ '--i': 2 }}>
                <span className="tl__year mono">2023</span>
                <span className="tl__node" aria-hidden="true"></span>
                <div className="tl__body">
                  <span className="tl__slug mono">#0003 — early-success-and-scaling</span>
                  <h3>Early success and scaling</h3>
                  <p>We raised the largest Series A globally, in enterprise software.</p>
                </div>
              </li>
              <li className="tl__row rv" style={{ '--i': 3 }}>
                <span className="tl__year mono">2024</span>
                <span className="tl__node" aria-hidden="true"></span>
                <div className="tl__body">
                  <span className="tl__slug mono">#0004 — ai-acceleration</span>
                  <h3>AI acceleration</h3>
                  <p>We launched our AI multi-agent platform.</p>
                </div>
              </li>
              <li className="tl__row rv" style={{ '--i': 4 }}>
                <span className="tl__year mono">2025</span>
                <span className="tl__node tl__node--live" aria-hidden="true"></span>
                <div className="tl__body">
                  <span className="tl__slug mono">#0005 — doubling-down-on-ai</span>
                  <h3>Doubling-down on AI</h3>
                  <p>We launched our AI Agent Builder. We launched FlowX 5, our
                    biggest update yet.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ================= OFFICES ================= */}
        <section className="section" id="offices">
          <div className="shell">
            <div className="section__head">
              <span className="section__no mono">05 / Offices</span>
              <div className="section__headline">
                <h2 className="h2 rv">Two offices, one system<span className="amber">.</span></h2>
              </div>
            </div>
            <div className="off">
              <article className="off__card rv" style={{ '--i': 0 }}>
                <p className="off__coords mono"><span><em className="amber">RO</em> 44.46°N · 26.08°E</span><span className="off__clock" data-tz="Europe/Bucharest">--:--:--</span></p>
                <h3 className="off__city">Bucharest</h3>
                <address className="off__addr mono">Charles de Gaulle Plaza,<br />Piata Charles de Gaulle 15, 9th floor,<br />011857 Bucharest, Romania</address>
              </article>
              <article className="off__card rv" style={{ '--i': 1 }}>
                <p className="off__coords mono"><span><em className="amber">US</em> 37.42°N · 122.20°W</span><span className="off__clock" data-tz="America/Los_Angeles">--:--:--</span></p>
                <h3 className="off__city">Menlo Park</h3>
                <address className="off__addr mono">352 Sharon Park Drive,<br />Menlo Park, CA 94025<br />United States</address>
              </article>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="section section--cta" id="cta">
          <canvas className="cta__canvas" aria-hidden="true" />
          <div className="shell">
            <span className="section__no mono">06 / Next</span>
            <h2 className="cta__title">
              <span className="rv" style={{ '--i': 0 }}>More than a decade in,</span>
              <span className="rv" style={{ '--i': 1 }}>just getting started<span className="amber">.</span></span>
            </h2>
            <div className="cta__row rv" style={{ '--i': 2 }}>
              <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Customized%20demo">Book a demo</a>
              <a className="btn btn--ghost btn--lg" href={bp("/banking")}>Explore Industries</a>
            </div>
          </div>
        </section>
      </main>
      <AboutInit />
    </>
  );
}
