import { bp } from '@/components/lib/base';
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
      <section className="section roi-hero">
        <div className="shell">
          <div className="section__head">
            <span className="section__no mono">Research · Papers</span>
            <div className="section__headline">
              <h1 className="h2 rv">The FlowX.AI paper series<span className="amber">.</span></h1>
              <p className="section__lede rv" style={{ '--i': 1 }}>
                Reliability, governance, measurement and memory for enterprise agents — each engineered
                and shown running in production, not hoped for. Read a summary, then download the full
                technical paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAPERS ================= */}
      <section className="section rlist-section">
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
