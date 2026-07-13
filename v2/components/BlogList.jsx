'use client';

/* Blog index — a langchain.com/blog-style listing: a tag filter bar, a featured
   newest post, then a card grid. Text-forward (the source posts all share one
   generic hero, so no thumbnails). Metadata only — no article bodies ship to
   the client. v2 design, reusing the catalog filter idiom. */

import { useEffect, useMemo, useState } from 'react';
import { bp } from '@/components/lib/base';
import { POSTS, ALL_TAGS } from '@/lib/blogData';

function fmtDate(d) {
  if (!d) return null;
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogList() {
  const [tag, setTag] = useState('All');

  // deep-link: /blog?tag=Lending (read on mount, static-export friendly)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tag');
    if (t && ALL_TAGS.includes(t)) setTag(t);
  }, []);

  const counts = useMemo(() => {
    const m = { All: POSTS.length };
    POSTS.forEach((p) => p.tags.forEach((t) => { m[t] = (m[t] || 0) + 1; }));
    return m;
  }, []);

  const filtered = tag === 'All' ? POSTS : POSTS.filter((p) => p.tags.includes(tag));
  const [featured, ...rest] = filtered;

  const Card = ({ p, featured }) => (
    <a href={bp(`/blog/${p.slug}`)} className={`blog__card${featured ? ' blog__card--feat' : ''}`}>
      <div className="blog__tags">
        {p.tags.slice(0, featured ? 4 : 2).map((t) => <span key={t} className="blog__tag mono">{t}</span>)}
      </div>
      <h3 className="blog__title">{p.title}</h3>
      <p className="blog__excerpt">{p.description}</p>
      <div className="blog__meta mono">
        <span>{p.author}</span>
        {fmtDate(p.date) && <><span className="blog__dot">·</span><span>{fmtDate(p.date)}</span></>}
        <span className="blog__dot">·</span><span>{p.readingMins} min read</span>
      </div>
    </a>
  );

  return (
    <div className="blog">
      <div className="blog__filter" role="group" aria-label="Filter by tag">
        {['All', ...ALL_TAGS].map((t) => (
          <button key={t} type="button" className={`blog__chip${tag === t ? ' is-on' : ''}`} onClick={() => setTag(t)}>
            {t}<span className="blog__chip-n mono">{counts[t] || 0}</span>
          </button>
        ))}
      </div>

      {featured && <div className="blog__feat-wrap"><Card p={featured} featured /></div>}
      <div className="blog__grid">
        {rest.map((p) => <Card key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
