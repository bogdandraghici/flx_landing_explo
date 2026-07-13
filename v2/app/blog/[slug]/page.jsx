import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { bp } from '@/components/lib/base';
import { absUrl, OG_IMAGE, SITE_NAME } from '@/components/lib/site';
import { POSTS } from '@/lib/blogData';
import ShareBar from '@/components/ShareBar';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  const url = absUrl(`/blog/${slug}`);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.description,
      url,
      siteName: SITE_NAME,
      publishedTime: p.date || undefined,
      modifiedTime: p.dateModified || p.date || undefined,
      authors: [p.author],
      tags: p.tags,
      images: [{ url: OG_IMAGE, alt: p.title }],
    },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [OG_IMAGE] },
  };
}

function fmtDate(d) {
  if (!d) return null;
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/* bodies are cleaned HTML fragments emitted next to the data (lib/blog-bodies).
   read at build time — server component, static export. */
function readBody(slug) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'lib', 'blog-bodies', `${slug}.html`), 'utf8');
  } catch {
    return '';
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const rawBody = readBody(slug);
  const byline = [fmtDate(p.date), `${p.readingMins} min read`].filter(Boolean).join(' · ');
  const url = absUrl(`/blog/${slug}`);

  // The source articles end with a flat "Frequently Asked Questions" section.
  // When we have the structured FAQ, cut that section from the prose and re-render
  // it below as a collapsible accordion (same design as the home page).
  const faqIdx = p.faq?.length ? rawBody.search(/<h2[^>]*id="frequently-asked-questions"/i) : -1;
  const body = faqIdx >= 0 ? rawBody.slice(0, faqIdx) : rawBody;

  // Key takeaways — the first sentence of each of the first few FAQ answers.
  // Real content (answer-first), so it's exactly what answer engines lift.
  const takeaways = (p.faq || []).slice(0, 4).map((f) => {
    const first = (f.a || '').split(/(?<=[.?!])\s+/)[0].trim();
    return first.length > 190 ? `${first.slice(0, 187)}…` : first;
  }).filter(Boolean);

  const graph = [
    {
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date || undefined,
      dateModified: p.dateModified || p.date || undefined,
      author: { '@type': 'Organization', name: p.author, url: 'https://www.flowx.ai' },
      publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
      mainEntityOfPage: url,
      image: OG_IMAGE,
      keywords: p.tags.join(', '),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: absUrl('/blog') },
        { '@type': 'ListItem', position: 3, name: p.title, item: url },
      ],
    },
  ];
  if (p.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <main id="top">
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />

      {/* ================= HEADER ================= */}
      <section className="section blog-post-hero">
        <div className="shell shell--narrow">
          <a className="blog-post__back mono" href={bp('/blog')}>← All articles</a>
          <div className="blog-post__tags">
            {p.tags.map((t) => (
              <a key={t} className="blog__tag mono" href={bp(`/blog?tag=${encodeURIComponent(t)}`)}>{t}</a>
            ))}
          </div>
          <h1 className="blog-post__title rv">{p.title}</h1>
          <p className="blog-post__byline mono rv" style={{ '--i': 1 }}>
            <span className="amber">{p.author}</span>{byline ? ` · ${byline}` : ''}
          </p>
          <ShareBar title={p.title} url={url} />
        </div>
      </section>

      {/* ================= BODY + TOC ================= */}
      <section className="section blog-post-body">
        <div className="shell shell--narrow">
          {takeaways.length > 0 && (
            <div className="blog-tldr">
              <p className="blog-tldr__h mono">Key takeaways</p>
              <ul className="blog-tldr__list">
                {takeaways.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
          <div className="blog-post__grid">
            <article className="blog-prose" dangerouslySetInnerHTML={{ __html: body }} />

            <aside className="blog-post__aside">
              {p.toc.length > 0 && (
                <nav className="blog-toc" aria-label="On this page">
                  <p className="blog-toc__h mono">On this page</p>
                  <ol className="blog-toc__list">
                    {p.toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
                  </ol>
                </nav>
              )}
            </aside>
          </div>

          {/* ================= FAQ (collapsible, home-style) ================= */}
          {p.faq?.length > 0 && (
            <div className="blog-faq" id="frequently-asked-questions">
              <h2 className="blog-faq__h">Frequently asked questions</h2>
              <div className="faq">
                {p.faq.map((f, i) => (
                  <details className="faq__item" key={i}>
                    <summary className="faq__q">
                      <span className="faq__no mono">Q.{String(i + 1).padStart(2, '0')}</span>{f.q}
                      <span className="faq__mark" aria-hidden="true">+</span>
                    </summary>
                    <div className="faq__a"><p>{f.a}</p></div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ================= FURTHER READING ================= */}
          {(p.related?.length > 0 || p.resource) && (
            <div className="blog-refs">
              <h2 className="blog-refs__h">Further reading</h2>
              <ul className="blog-refs__list">
                {p.related.map((r) => (
                  <li key={r.slug}>
                    <a href={bp(`/blog/${r.slug}`)}><span className="blog-refs__kind mono">Article</span>{r.title}</a>
                  </li>
                ))}
                {p.resource && (
                  <li>
                    <a href={bp(p.resource.href)}><span className="blog-refs__kind mono">Resource</span>{p.resource.label}</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section section--cta">
        <div className="shell">
          <span className="section__no mono">Next</span>
          <h2 className="cta__title">
            <span>See it on your</span>
            <span>own core<span className="amber">.</span></span>
          </h2>
          <p className="abd-cta__sub">Bring a legacy-core workflow. We&apos;ll wrap it with agents and show the audit trail — or size the payback first.</p>
          <div className="cta__row">
            <a className="btn btn--primary btn--lg" href="#demo">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
          </div>
        </div>
      </section>
    </main>
  );
}
