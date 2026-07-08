'use client';
import { useEffect, useRef } from 'react';
import { useCompiler } from './CompilerContext';
import { renderDiagram, specText, typeSpec } from './blueprint.js';

export default function BlueprintSection() {
  const { result } = useCompiler();
  const { t, input, initial } = result;
  const diagramRef = useRef(null);
  const specRef = useRef(null);
  const statusRef = useRef(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = firstRun.current && initial; // default draft renders resolved
    firstRun.current = false;
    let stopPulses, stopTyping;
    if (diagramRef.current) stopPulses = renderDiagram(diagramRef.current, t, { reduceMotion: instant || reduce });
    if (specRef.current) stopTyping = typeSpec(specRef.current, statusRef.current, specText(t, input), { reduceMotion: instant || reduce });
    return () => { stopPulses && stopPulses(); stopTyping && stopTyping(); };
  }, [t, input, initial]);

  const chips = [
    [`${t.agents.length}`, 'agents'],
    [`${t.integrations.length}`, 'integrations'],
    [`${t.guardrails.length + 2}`, 'guardrails'],
    [t.eta, 'to production'],
    [`${Math.round(t.confidence * 100)}%`, 'pattern confidence'],
  ];

  return (
    <section className="section section--blueprint" id="blueprint">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">03 / Blueprint</span>
          <div className="section__headline">
            <h2 className="h2" dangerouslySetInnerHTML={{ __html: `${t.title}<span class="amber">.</span>` }} />
            <p className="section__lede">{t.tagline}</p>
          </div>
        </div>

        <div className="bp">
          <div className="bp__result">
            <div className="bp__meta mono">
              {chips.map(([b, label], i) => (
                <span className="chip" style={{ '--i': i }} key={label}><b>{b}</b>{label}</span>
              ))}
            </div>
            <div className="bp__grid">
              <figure className="bp__diagram" ref={diagramRef} role="img" aria-label="Generated solution architecture diagram" />
              <aside className="bp__spec">
                <div className="bp__spec-bar mono"><span>blueprint.yaml</span><span className="amber" ref={statusRef}>writing…</span></div>
                <pre className="bp__spec-body mono" ref={specRef} />
              </aside>
            </div>
            <div className="bp__actions">
              <a className="btn btn--primary" href="#cta">Book a build review</a>
              <a className="btn btn--ghost" href="#hero">Compile another use case</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
