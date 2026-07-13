import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { bp } from '@/components/lib/base';
import { absUrl, OG_IMAGE, SITE_NAME } from '@/components/lib/site';
import { POSTS } from '@/lib/blogData';
import ShareBar from '@/components/ShareBar';

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
  const body = readBody(slug);
  const byline = [fmtDate(p.date), `${p.readingMins} min read`].filter(Boolean).join(' · ');
  const url = absUrl(`/blog/${slug}`);

  const ld = {
    '@context': 'https://schema.org',
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
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

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
            <a className="btn btn--primary btn--lg" href="mailto:hello@flowx.ai?subject=Modernizing%20our%20core">Book a demo</a>
            <a className="btn btn--ghost btn--lg" href={bp('/roi-calculator')}>Estimate the ROI</a>
          </div>
        </div>
      </section>
    </main>
  );
}
