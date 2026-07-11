'use client';

/* AI agent catalog — a business-user-facing browser over the 140-agent ORNA
   dataset (lib/agentsData.js). Design goals: find agents by industry / effort /
   free-text fast, and understand each one without reading a spec. Interaction:
   a filter bar + responsive card grid + a slide-in detail panel whose
   "pairs well with" chips cross-link to related agents, so the catalog reads
   like a browsable graph rather than a flat list. v2 language throughout:
   charcoal ground, one amber accent, hairline cards, Sora/Geist/Geist-Mono. */

import { useEffect, useMemo, useState } from 'react';
import { AGENTS } from '@/lib/agentsData';

const INDUSTRIES = ['All', 'Banking', 'Insurance', 'Logistics'];
const EFFORTS = ['All', 'Low', 'Medium', 'High'];
const EFFORT_LEVEL = { Low: 1, Medium: 2, High: 3 };

/* Use cases mirror the site's "Solutions → by use case" taxonomy. Each is a
   curated keyword preset matched across an agent's category + descriptive text
   (the dataset has no single use-case field). Track & trace is intentionally
   absent — the logistics agents here are pricing/routing/maintenance, with no
   clean visibility subset — so its nav link filters by the Logistics industry
   instead. */
const USE_CASES = [
  { id: 'onboarding', label: 'Onboarding', kw: ['onboarding', 'account opening', 'kyc', 'know your customer', 'due diligence'] },
  { id: 'lending', label: 'Lending', kw: ['lending', 'loan', 'mortgage', 'factoring', 'credit facility', 'borrower'] },
  { id: 'underwriting', label: 'Underwriting', kw: ['underwrit'] },
  { id: 'claims', label: 'Claims', kw: ['claim'] },
  { id: 'quoting', label: 'Quoting & pricing', kw: ['quoting', 'quote', 'pricing', 'fee quoter', 'premium rating', 'rate optimization'] },
];
const USE_BY_ID = Object.fromEntries(USE_CASES.map((u) => [u.id, u]));
const useHaystack = (a) => `${a.stack || ''} ${a.sector || ''} ${a.name} ${a.does} ${a.problem || ''}`.toLowerCase();

function EffortMeter({ level, label = false }) {
  const n = EFFORT_LEVEL[level] || 2;
  return (
    <span className="ac__effort" title={`Deploy effort: ${level}`}>
      {label && <span className="ac__effort-label mono">Effort</span>}
      <span className="ac__dots" aria-label={`Deploy effort ${level}`}>
        {[1, 2, 3].map((i) => <i key={i} className={i <= n ? 'is-on' : ''} />)}
      </span>
      {label && <span className="ac__effort-txt">{level}</span>}
    </span>
  );
}

/* Default rows shown before "Load more". The grid is 4-up on desktop, so 12 ≈
   three rows there (fewer columns → more rows, still a sensible first screen). */
const PAGE_SIZE = 12;

export default function AgentCatalog() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('All');
  const [effort, setEffort] = useState('All');
  const [useCase, setUseCase] = useState('All');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  // deep-link support: /ai-agents?use=claims or ?industry=Logistics (read on
  // mount; window-based to stay static-export friendly, no Suspense needed).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const u = p.get('use');
    if (u && USE_BY_ID[u]) setUseCase(u);
    const ind = p.get('industry');
    if (ind && INDUSTRIES.includes(ind)) setIndustry(ind);
    const q = p.get('q');
    if (q) setQuery(q);
  }, []);

  const byName = useMemo(() => {
    const m = new Map();
    AGENTS.forEach((a) => m.set(a.name, a));
    return m;
  }, []);

  const industryCounts = useMemo(() => {
    const m = { All: AGENTS.length };
    AGENTS.forEach((a) => { m[a.industry] = (m[a.industry] || 0) + 1; });
    return m;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const uc = useCase !== 'All' ? USE_BY_ID[useCase] : null;
    return AGENTS.filter((a) => {
      if (industry !== 'All' && a.industry !== industry) return false;
      if (effort !== 'All' && a.complexity !== effort) return false;
      if (uc && !uc.kw.some((w) => useHaystack(a).includes(w))) return false;
      if (!q) return true;
      return [a.name, a.does, a.problem, a.stack, a.sector, a.funcs]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q));
    });
  }, [query, industry, effort, useCase]);

  // reset the visible window whenever the result set changes
  useEffect(() => { setVisible(PAGE_SIZE); }, [query, industry, effort, useCase]);

  // close the drawer on Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <div className="ac" id="catalog">
      {/* ---- filter bar ---- */}
      <div className="ac__controls">
        <div className="ac__search">
          <svg className="ac__search-ico" viewBox="0 0 20 20" aria-hidden="true" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className="ac__search-input"
            placeholder="Search agents — try “fraud”, “onboarding”, “pricing”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search agents"
          />
        </div>

        <div className="ac__filters">
          <div className="ac__seg" role="group" aria-label="Filter by industry">
            {INDUSTRIES.map((i) => (
              <button
                key={i} type="button"
                className={`ac__seg-btn${industry === i ? ' is-on' : ''}`}
                onClick={() => setIndustry(i)}
              >
                {i}<span className="ac__seg-n mono">{industryCounts[i] || 0}</span>
              </button>
            ))}
          </div>
          <div className="ac__seg ac__seg--effort" role="group" aria-label="Filter by deploy effort">
            {EFFORTS.map((e) => (
              <button
                key={e} type="button"
                className={`ac__seg-btn${effort === e ? ' is-on' : ''}`}
                onClick={() => setEffort(e)}
              >
                {e === 'All' ? 'Any effort' : e}
              </button>
            ))}
          </div>

          <label className="ac__usecase">
            <span className="ac__usecase-label mono">Use case</span>
            <select className="ac__usecase-select mono" value={useCase} onChange={(e) => setUseCase(e.target.value)}>
              <option value="All">Any use case</option>
              {USE_CASES.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <p className="ac__count mono">
        {filtered.length} {filtered.length === 1 ? 'agent' : 'agents'}
        {useCase !== 'All' && <span className="ac__count-tag">· {USE_BY_ID[useCase].label}</span>}
        {(industry !== 'All' || effort !== 'All' || useCase !== 'All' || query) && (
          <button type="button" className="ac__clear" onClick={() => { setQuery(''); setIndustry('All'); setEffort('All'); setUseCase('All'); }}>
            Clear filters
          </button>
        )}
      </p>

      {/* ---- grid ---- */}
      {filtered.length === 0 ? (
        <p className="ac__empty">No agents match that. Try a broader search or clear the filters.</p>
      ) : (
        <>
          <div className="ac__grid">
            {filtered.slice(0, visible).map((a) => (
              <button key={a.slug} type="button" className="ac__card" onClick={() => setSelected(a)}>
                <span className="ac__card-eyebrow mono">
                  {a.industry}{a.sector ? ` · ${a.sector}` : ''}
                </span>
                <span className="ac__card-name">{a.name}</span>
                <span className="ac__card-does">{a.does}</span>
                <span className="ac__card-foot">
                  <EffortMeter level={a.complexity} />
                  <span className="ac__card-more mono">Details →</span>
                </span>
              </button>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="ac__more">
              <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more
              </button>
              <span className="ac__more-count mono">Showing {Math.min(visible, filtered.length)} of {filtered.length}</span>
            </div>
          )}
        </>
      )}

      {/* ---- detail drawer ---- */}
      {selected && (
        <div className="ac__scrim" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <aside className="ac__drawer" role="dialog" aria-modal="true" aria-labelledby="ac-drawer-name">
            <button type="button" className="ac__drawer-close" aria-label="Close" onClick={() => setSelected(null)}>×</button>
            <p className="ac__drawer-eyebrow mono">
              {selected.industry}{selected.sector ? ` · ${selected.sector}` : ''}{selected.stack ? ` · ${selected.stack}` : ''}
            </p>
            <h3 className="ac__drawer-name" id="ac-drawer-name">{selected.name}</h3>
            <div className="ac__drawer-effort"><EffortMeter level={selected.complexity} label /></div>

            <div className="ac__block">
              <h4 className="ac__block-h mono">What it does</h4>
              <p className="ac__block-p">{selected.does}</p>
            </div>

            {selected.problem && (
              <div className="ac__block">
                <h4 className="ac__block-h mono">The problem it solves</h4>
                <p className="ac__block-p">{selected.problem}</p>
              </div>
            )}

            {selected.funcs && (
              <div className="ac__block">
                <h4 className="ac__block-h mono">How it works</h4>
                <p className="ac__block-p">{selected.funcs}</p>
              </div>
            )}

            {selected.kpis.length > 0 && (
              <div className="ac__block">
                <h4 className="ac__block-h mono">Outcomes it moves</h4>
                <ul className="ac__kpis">
                  {selected.kpis.map((k, i) => (
                    <li key={i}><span className="ac__kpi-tick" aria-hidden="true">✓</span>{k}</li>
                  ))}
                </ul>
              </div>
            )}

            {selected.adjacent.length > 0 && (
              <div className="ac__block">
                <h4 className="ac__block-h mono">Pairs well with</h4>
                <div className="ac__chips">
                  {selected.adjacent.map((name, i) => {
                    const target = byName.get(name);
                    return target ? (
                      <button key={i} type="button" className="ac__chip is-link" onClick={() => setSelected(target)}>
                        {name} <span aria-hidden="true">→</span>
                      </button>
                    ) : (
                      <span key={i} className="ac__chip">{name}</span>
                    );
                  })}
                </div>
              </div>
            )}

            <a className="btn btn--primary ac__drawer-cta" href={`mailto:hello@flowx.ai?subject=${encodeURIComponent('Agent: ' + selected.name)}`}>
              Talk to us about this agent
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
