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

export default function AgentCatalog() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('All');
  const [effort, setEffort] = useState('All');
  const [selected, setSelected] = useState(null);

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
    return AGENTS.filter((a) => {
      if (industry !== 'All' && a.industry !== industry) return false;
      if (effort !== 'All' && a.complexity !== effort) return false;
      if (!q) return true;
      return [a.name, a.does, a.problem, a.stack, a.sector, a.funcs]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q));
    });
  }, [query, industry, effort]);

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
        </div>
      </div>

      <p className="ac__count mono">
        {filtered.length} {filtered.length === 1 ? 'agent' : 'agents'}
        {(industry !== 'All' || effort !== 'All' || query) && (
          <button type="button" className="ac__clear" onClick={() => { setQuery(''); setIndustry('All'); setEffort('All'); }}>
            Clear filters
          </button>
        )}
      </p>

      {/* ---- grid ---- */}
      {filtered.length === 0 ? (
        <p className="ac__empty">No agents match that. Try a broader search or clear the filters.</p>
      ) : (
        <div className="ac__grid">
          {filtered.map((a) => (
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
