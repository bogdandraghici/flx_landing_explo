import { HF_ORG } from '@/lib/modelsData';
import { OPENNER_REPO } from '@/lib/openModelsData';

/* Shared template for the four open industry-model one-pagers
   (/models/openledger · opencover · openfreight · openvita). Renders a data
   object from lib/openModelsData.js in the v2 dark design line, reusing the
   site's .section / .shell / .section__head / .faq idioms plus the scoped
   om-* block in globals.css. Pure server component; scroll-reveal (.rv) and
   the shared chrome come from the global <RevealInit>/<Chrome> in the layout. */

function SectionHead({ no, label, title, sub }) {
  return (
    <div className="section__head">
      <span className="section__no mono">{no} / {label}</span>
      <div className="section__headline">
        <h2 className="h2 rv">{title}</h2>
        {sub ? <p className="section__lede rv" style={{ '--i': 1 }}>{sub}</p> : null}
      </div>
    </div>
  );
}

const Check = () => (
  <span className="om-priv__check" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
  </span>
);

function BenchCell({ cell }) {
  if (cell.score !== undefined) {
    return (
      <td>
        <span className={`om-score${cell.win ? ' om-score--win' : ''}`}>{cell.score}</span>
        {cell.sub ? <span className="om-cell__sub">{cell.sub}</span> : null}
      </td>
    );
  }
  return (
    <td>
      {cell.main}
      {cell.sub ? <span className="om-cell__sub">{cell.sub}</span> : null}
    </td>
  );
}

export default function OpenModelPage({ model: m }) {
  return (
    <main id="top" className="om-page">
      {/* ================= HERO ================= */}
      <header className="om-hero" id="hero">
        <div className="om-hero__glow" aria-hidden="true" />
        <div className="shell om-hero__inner">
          <p className="om-eyebrow rv-load"><span className="tick" aria-hidden="true" />{m.eyebrow}</p>
          <p className="om-tag rv-load" style={{ '--d': 1 }}>{m.tagline}</p>
          <h1 className="om-h1 rv-load" style={{ '--d': 2 }}>
            {m.h1.lead}<em>{m.h1.em}</em>{m.h1.tail}
          </h1>
          <p className="om-hero__sub rv-load" style={{ '--d': 3 }}>{m.sub}</p>
          <div className="om-ctas rv-load" style={{ '--d': 4 }}>
            <a className="btn btn--primary btn--lg" href={OPENNER_REPO} target="_blank" rel="noopener">View on GitHub ↗</a>
            <a className="btn btn--ghost btn--lg" href={HF_ORG} target="_blank" rel="noopener">Download on Hugging Face ↗</a>
          </div>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <div className="om-stats">
        <div className="shell om-stats__grid">
          {m.stats.map((s, i) => (
            <div className="om-stat rv" key={i}>
              <div className="om-stat__val">{s.value}</div>
              <div className="om-stat__label">{s.label}</div>
              {s.sub ? <div className="om-stat__sub">{s.sub}</div> : null}
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICKSTART ================= */}
      <section className="section" id="quickstart">
        <div className="shell">
          <SectionHead {...m.quickstart} />
          <div className="om-qs">
            <div>
              <ul className="om-points">
                {m.quickstart.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <p className="om-pip">$ <b>{m.quickstart.pip}</b></p>
            </div>
            <div className="om-code rv">
              <div className="om-code__bar">
                <span className="om-code__dot" /><span className="om-code__dot" /><span className="om-code__dot" />
                <span>{m.quickstart.code.file}</span>
              </div>
              <div className="om-code__scroll"><pre>{m.quickstart.code.body}</pre></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RUNTIME ================= */}
      <section className="section" id="runtime">
        <div className="shell">
          <SectionHead {...m.runtime} />
          <div className="om-grid om-grid--4">
            {m.runtime.cards.map((c, i) => (
              <article className="om-card rv" key={i}>
                <span className="om-card__mark">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRIVACY ================= */}
      <section className="section" id="privacy">
        <div className="shell">
          <SectionHead {...m.privacy} />
          <div className="om-priv">
            {m.privacy.items.map((it, i) => (
              <div className="om-priv__item rv" key={i}>
                <Check />
                <div><strong>{it.strong}</strong><span>{it.span}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODEL LIBRARY ================= */}
      <section className="section" id="models">
        <div className="shell">
          <SectionHead {...m.models} />
          <div className="om-grid om-grid--4">
            {m.models.cards.map((c, i) => (
              <article className="om-card om-card--model rv" key={i}>
                <div className="om-mname">{c.name}</div>
                <p>{c.desc}</p>
                <div className="om-pills">
                  {c.pills.map((p) => <span className="om-pill" key={p}>{p}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="section" id="products">
        <div className="shell">
          <SectionHead {...m.products} />
          <div className="om-grid om-grid--3">
            {m.products.cards.map((c, i) => (
              <article className="om-card om-card--product rv" key={i}>
                <span className="om-ptag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPLIANCE ================= */}
      <section className="section" id="compliance">
        <div className="shell">
          <SectionHead {...m.compliance} />
          <div className="om-chips">
            {m.compliance.chips.map((c, i) => (
              <span className="om-chip rv" key={i}><b>{c.b}</b><span>{c.span}</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENCHMARKS ================= */}
      <section className="section" id="benchmarks">
        <div className="shell">
          <SectionHead {...m.benchmarks} />
          {m.benchmarks.table ? (
            <div className="om-bench rv">
              <table className="om-btable">
                <thead>
                  <tr>{m.benchmarks.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {m.benchmarks.table.rows.map((row, ri) => (
                    <tr key={ri}>{row.map((cell, ci) => <BenchCell cell={cell} key={ci} />)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {m.benchmarks.callouts && m.benchmarks.callouts.length ? (
            <div className="om-callouts">
              {m.benchmarks.callouts.map((c, i) => (
                <div className="om-callout rv" key={i}>
                  <div className="om-callout__val">{c.value}</div>
                  <div className="om-callout__label">{c.label}</div>
                </div>
              ))}
            </div>
          ) : null}
          {m.benchmarks.note ? <p className="om-bench__note">{m.benchmarks.note}</p> : null}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section" id="faq">
        <div className="shell">
          <SectionHead no={m.faq.no} label={m.faq.label} title={m.faq.title} />
          <div className="faq rv">
            {m.faq.items.map((it, i) => (
              <details className="faq__item" key={i}>
                <summary className="faq__q">
                  <span className="faq__no mono">Q.{String(i + 1).padStart(2, '0')}</span>
                  {it.q}
                  <span className="faq__mark" aria-hidden="true">+</span>
                </summary>
                <div className="faq__a"><p>{it.a}</p></div>
              </details>
            ))}
          </div>
          {m.colophon ? <p className="om-colophon">{m.colophon}</p> : null}
        </div>
      </section>
    </main>
  );
}
