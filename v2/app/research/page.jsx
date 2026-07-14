import { bp } from '@/components/lib/base';
import ResearchHeroViz from '@/components/ResearchHeroViz';
import { PAPERS } from '@/lib/researchData';

export const metadata = {
  title: 'FlowX — Research',
  description:
    'The FlowX.AI technical-paper series: evidence-graded ROI (VERA), agent self-adaptation (ORNA), zero hallucination by construction (HALO), runtime governance (GAVEL), self-improving classification (SIFT), reliable execution (RAILS), and safe agent memory (MNEMĒ). Read the summaries, download the papers.',
};

export default function ResearchPage() {
  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="ahero" id="phero">
        <div className="shell ahero__grid">
          <div className="ahero__text">
            <p className="hero__eyebrow mono rv-load" style={{ '--d': 0 }}>
              <span className="tick" aria-hidden="true" />
              Research · Papers
            </p>
            <h1 className="hero__title">
              <span className="hero__line rv-load" style={{ '--d': 1 }}><span className="dim">The FlowX.AI</span></span>
              <span className="hero__line hero__line--big rv-load" style={{ '--d': 2 }}>paper series<span className="amber">.</span></span>
            </h1>
            <p className="hero__sub rv-load" style={{ '--d': 3 }}>
              Reliability, governance, measurement and memory for enterprise agents — each engineered
              and shown running in production, not hoped for. Read a summary, then download the full
              technical paper.
            </p>
            <div className="abd-hero__cta rv-load" style={{ '--d': 4 }}>
              <a className="btn btn--primary btn--lg" href="#papers">Browse the papers</a>
              <a className="btn btn--ghost btn--lg" href={bp('/models')}>See the open models</a>
            </div>
            <p className="astats mono rv-load" style={{ '--d': 5 }}>
              <span>engineered · measured · in production</span>
            </p>
          </div>

          {/* Results-figure instrument: axes sweep in, trial points scatter,
               a dashed baseline sweeps, the method curve fits through the
               points, and the delta bracket + readout land amber. A different
               figure plots each cycle. Reduced motion → resolved pose. */}
          <ResearchHeroViz className="ahero__viz" />
        </div>
      </section>

      {/* ================= PAPERS ================= */}
      <section className="section rlist-section" id="papers">
        <div className="shell">
          <ul className="rlist">
            {PAPERS.map((p, i) => (
              <li key={p.slug} className="rlist__card rv" style={{ '--i': i % 3 }}>
                <a className="rlist__cover" href={bp(`/research/${p.slug}`)} aria-hidden="true" tabIndex={-1}>
                  <img src={bp(p.cover)} alt="" width="1240" height="1754" loading="lazy" />
                </a>
                <div className="rlist__meta">
                  <span className="rlist__code mono">{p.code}</span>
                  <h3 className="rlist__name">
                    <a href={bp(`/research/${p.slug}`)}>{p.headline}</a>
                  </h3>
                  <p className="rlist__tagline">{p.tagline}</p>
                  <div className="rlist__links">
                    <a className="rlist__link" href={bp(`/research/${p.slug}`)}>Read summary <span aria-hidden="true">→</span></a>
                    <a className="rlist__pdf mono" href={bp(p.pdf)} target="_blank" rel="noopener" download>PDF ↓</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
