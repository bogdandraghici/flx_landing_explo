import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { bp } from '@/components/lib/base';
import { LEGAL } from '@/lib/legalData';

/* Shared renderer for the legal pages (privacy / cookies / terms). Body is a
   cleaned HTML fragment in lib/legal-bodies/<slug>.html, read at build; the
   TOC is parsed from its <h2 id> anchors. Reuses the blog article layout. */
function readBody(slug) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'lib', 'legal-bodies', `${slug}.html`), 'utf8');
  } catch {
    return '';
  }
}

export default function LegalPage({ slug }) {
  const meta = LEGAL.find((l) => l.slug === slug);
  if (!meta) notFound();
  const body = readBody(slug);
  const toc = [...body.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));

  return (
    <main id="top">
      <section className="section blog-post-hero">
        <div className="shell shell--narrow">
          <a className="blog-post__back mono" href={bp('/')}>← Home</a>
          <p className="section__no mono" style={{ marginBottom: 14 }}>Legal</p>
          <h1 className="blog-post__title rv">{meta.title}</h1>
          <p className="blog-post__byline mono rv" style={{ '--i': 1 }}>FlowX.AI Business Systems</p>
        </div>
      </section>

      <section className="section blog-post-body">
        <div className="shell shell--narrow">
          <div className="blog-post__grid">
            <article className="blog-prose" dangerouslySetInnerHTML={{ __html: body }} />
            <aside className="blog-post__aside">
              {toc.length > 0 && (
                <nav className="blog-toc" aria-label="On this page">
                  <p className="blog-toc__h mono">On this page</p>
                  <ol className="blog-toc__list">
                    {toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
                  </ol>
                </nav>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
