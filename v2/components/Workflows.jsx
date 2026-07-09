'use client';
import { useState } from 'react';

const TABS = [
  ['Onboarding', 'Identity & UBO checks, KYC, and document completeness with guided ask-backs — faster, cleaner approvals.'],
  ['Lending', 'Automate manual handoffs across lending flows, from application to decision, without disrupting core systems.'],
  ['Underwriting', 'End-to-end checks on income, collateral, and completeness with accurate, fair, and faster decisions.'],
  ['Claims', 'FNOL & routing, policy validation, damage estimation, and fraud signals for faster, more consistent claims.'],
];
const STATS = [['150+', 'Production-ready agents'], ['8 wks', 'Typical time to live'], ['65%', 'Faster underwriting'], ['99.99%', 'Platform robustness']];

export default function Workflows() {
  const [active, setActive] = useState(0);
  return (
    <section className="section section--workflows" id="workflows">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">02 / Workflows</span>
          <div className="section__headline"><h2 className="h2 rv">One platform. Every regulated workflow<span className="amber">.</span></h2></div>
        </div>
        <div className="wf">
          <div className="wf__left rv">
            <div className="wf__tabs" role="tablist" aria-label="Regulated workflows">
              {TABS.map(([label], i) => (
                <button key={label} type="button" role="tab" aria-selected={i === active}
                  className={`wf__tab${i === active ? ' is-active' : ''}`} onClick={() => setActive(i)}>{label}</button>
              ))}
            </div>
            <p className="wf__desc" aria-live="polite">{TABS[active][1]}</p>
            <a className="wf__link mono" href="#platform">See how it works →</a>
          </div>
          <div className="wf__viz rv" style={{ '--i': 1 }} aria-hidden="true">
            <svg viewBox="0 0 320 320" fill="none">
              <g stroke="var(--line)" strokeWidth="1">
                <line x1="160" y1="160" x2="288" y2="160" /><line x1="160" y1="160" x2="224" y2="271" />
                <line x1="160" y1="160" x2="96" y2="271" /><line x1="160" y1="160" x2="32" y2="160" />
                <line x1="160" y1="160" x2="96" y2="49" /><line x1="160" y1="160" x2="224" y2="49" />
              </g>
              <g fill="var(--text-faint)">
                <circle cx="288" cy="160" r="5" /><circle cx="224" cy="271" r="5" /><circle cx="96" cy="271" r="5" />
                <circle cx="32" cy="160" r="5" /><circle cx="96" cy="49" r="5" /><circle cx="224" cy="49" r="5" />
              </g>
              <circle cx="160" cy="160" r="30" fill="var(--amber-soft)" stroke="var(--amber-line)" />
              <circle cx="160" cy="160" r="9" fill="var(--amber)" />
            </svg>
          </div>
        </div>
        <dl className="wf__stats">
          {STATS.map(([n, d], i) => (<div className="rv" style={{ '--i': i }} key={d}><dt className="mono">{n}</dt><dd>{d}</dd></div>))}
        </dl>
      </div>
    </section>
  );
}
