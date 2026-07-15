import { notFound } from 'next/navigation';
import { bp } from '@/components/lib/base';
import { absUrl, OG_IMAGE, SITE_NAME } from '@/components/lib/site';
import { PAPERS } from '@/lib/researchData';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return PAPERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PAPERS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `FlowX — ${p.code}: ${p.headline}`,
    description: p.tagline || (p.abstract ? p.abstract.slice(0, 155) : undefined),
  };
}

export default async function PaperPage({ params }) {
  const { slug } = await params;
  const p = PAPERS.find((x) => x.slug === slug);
  if (!p) notFound();
  const url = absUrl(`/research/${p.slug}`);

  return (
    <main id="top">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ScholarlyArticle',
            headline: `${p.code}: ${p.headline}`,
            name: p.code,
            abstract: p.abstract || undefined,
            description: p.tagline || undefined,
            keywords: (p.keywords || []).join(', '),
            author: { '@type': 'Organization', name: SITE_NAME, url: 'https://www.flowx.ai' },
            publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
            mainEntityOfPage: url,
            url,
            associatedMedia: { '@type': 'MediaObject', contentUrl: absUrl(p.pdf), encodingFormat: 'application/pdf' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Research', item: absUrl('/research') },
              { '@type': 'ListItem', position: 3, name: p.code, item: url },
            ],
          },
        ],
      }} />
      {/* ================= HERO ================= */}
      <section className="section rp-hero">
        <div className="shell">
          <div className="rp__hero-grid">
            <div className="rp__hero-text">
              <p className="section__no mono rv">Technical paper · {p.code}</p>
              <h1 className="rp__title rv" style={{ '--i': 1 }}>{p.headline}<span className="amber">.</span></h1>
              {p.tagline && <p className="section__lede rv" style={{ '--i': 2 }}>{p.tagline}</p>}
              <div className="rp__actions rv" style={{ '--i': 3 }}>
                <a className="btn btn--primary btn--lg" href={bp(p.pdf)} target="_blank" rel="noopener" download>
                  Download full paper (PDF)
                </a>
                <a className="btn btn--ghost btn--lg" href={bp('/research')}>All papers</a>
              </div>
              {p.keywords?.length > 0 && (
                <ul className="rp__kw">
                  {p.keywords.map((k, i) => <li key={i} className="mono">{k}</li>)}
                </ul>
              )}
            </div>
            <a className="rp__cover" href={bp(p.pdf)} target="_blank" rel="noopener" aria-label={`Download the ${p.code} paper`}>
              <img src={bp(p.cover)} alt={`${p.code} technical paper cover`} width="1240" height="1754" loading="eager" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= THESIS ================= */}
      {p.thesis && (
        <section className="rp-thesis">
          <div className="shell">
            <p className="rp__thesis-kicker mono rv">Core thesis</p>
            <blockquote className={`rp__thesis rp__thesis--${p.thesisSize} rv`} style={{ '--i': 1 }}>
              {p.thesisLines.map((line, i) => {
                const at = p.thesisHl ? line.indexOf(p.thesisHl) : -1;
                return (
                  <span className="rp__thesis-line" key={i}>
                    {at >= 0
                      ? (<>{line.slice(0, at)}<span className="rp__thesis-hl">{p.thesisHl}</span>{line.slice(at + p.thesisHl.length)}</>)
                      : line}
                  </span>
                );
              })}
            </blockquote>
          </div>
        </section>
      )}

      {/* ================= ABSTRACT + CONTENTS ================= */}
      <section className="section">
        <div className="shell">
          <div className="rp__body">
            <div className="rp__abstract">
              <h2 className="rp__h rv">Abstract</h2>
              {(p.abstractParas?.length ? p.abstractParas : [p.abstract]).map((para, i) => (
                <p
                  key={i}
                  className={`rp__abstract-p rv${i === 0 ? ' rp__abstract-p--lead' : ''}`}
                  style={{ '--i': i + 1 }}
                >
                  {para}
                </p>
              ))}
            </div>
            {p.sections?.length > 0 && (
              <aside className="rp__contents">
                <h2 className="rp__h">In this paper</h2>
                <ol className="rp__toc">
                  {p.sections.map((s, i) => <li key={i}>{s.replace(/^\d+\s*/, '')}</li>)}
                </ol>
                <a className="btn btn--primary rp__toc-cta" href={bp(p.pdf)} target="_blank" rel="noopener" download>
                  Download PDF
                </a>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta">
        <div className="shell">
          <span className="section__no mono">Series</span>
          <h2 className="cta__title">
            <span>Part of the FlowX.AI</span>
            <span>paper series<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub">Each paper names a framework and shows it running in production — governance, reliability, memory, and measurement, engineered rather than hoped for.</p>
          <div className="cta__row">
            <a className="btn btn--primary btn--lg" href={bp(p.pdf)} target="_blank" rel="noopener" download>Download {p.code} (PDF)</a>
            <a className="btn btn--ghost btn--lg" href={bp('/research')}>Browse all papers</a>
          </div>
        </div>
      </section>
    </main>
  );
}
