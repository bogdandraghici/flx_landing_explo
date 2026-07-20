'use client';
import { useEffect, useRef, useState } from 'react';

const AUDIT_POOL = [
  ['doc-intelligence', 'extracted passport MRZ', 'ok'],
  ['identity-screening', 'sanctions list cleared', 'ok'],
  ['risk-decision', 'approved · score 0.18', 'ok'],
  ['policy-engine', 'residency rule applied', 'ok'],
  ['risk-decision', 'routed to human review', 'hitl'],
  ['claims-evidence', 'invoice totals reconciled', 'ok'],
  ['credit-assessment', 'covenant check passed', 'ok'],
  ['alert-enrichment', 'network graph expanded', 'ok'],
  ['human-review', 'override recorded · j.okafor', 'signed'],
  ['audit-log', 'chain verified · block 84k', 'ok'],
];
const MODELS = ['claude-fable-5', 'private-llm / vllm', 'rules-engine'];

export default function Platform() {
  const [rows, setRows] = useState([]);
  const [active, setActive] = useState(0);
  const clockRef = useRef(41 * 60 + 7);
  const rowsRef = useRef(null);

  const makeRow = () => {
    clockRef.current += 1 + Math.floor(Math.random() * 4);
    const m = Math.floor(clockRef.current / 60) % 60;
    const s = clockRef.current % 60;
    const time = `11:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const [agent, action, st] = AUDIT_POOL[Math.floor(Math.random() * AUDIT_POOL.length)];
    return { time, agent, action, st, key: `${time}-${Math.random()}` };
  };

  useEffect(() => {
    setRows(Array.from({ length: 6 }, makeRow));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setRows((r) => [makeRow(), ...r].slice(0, 7)), 1900);
    });
    if (rowsRef.current) io.observe(rowsRef.current);
    const rot = setInterval(() => setActive((a) => (a + 1) % MODELS.length), 2400);
    return () => { clearInterval(timer); clearInterval(rot); io.disconnect(); };
  }, []);

  return (
    <section className="section section--platform" id="platform">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Platform</span>
          <div className="section__headline">
            <h2 className="h2 rv">Built like infrastructure, because it is<span className="amber">.</span></h2>
            <p className="section__lede rv" style={{ '--i': 1 }}>Not a chatbot wrapper. A governed execution layer for AI agents, engineered to the standard of your core systems.</p>
          </div>
        </div>
        <div className="plat">
          <article className="plat__cell plat__cell--wide rv" style={{ '--i': 0 }}>
            <header className="plat__head"><h3>Every decision, auditable</h3><p>Agents don’t just act — they leave evidence. Hash-chained logs of every prompt, retrieval, tool call and human override, queryable for seven years.</p></header>
            <div className="audit mono" aria-hidden="true">
              <div className="audit__hd"><span>timestamp</span><span>agent</span><span>action</span><span>status</span></div>
              <div className="audit__rows" ref={rowsRef}>
                {rows.map((r, i) => (
                  <div className={`r${i === 0 ? ' new' : ''}`} key={r.key}>
                    <span>{r.time}</span><span>{r.agent}</span><span>{r.action}</span><span className={`st${r.st === 'ok' ? ' info' : ''}`}>{r.st}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="plat__cell rv" style={{ '--i': 1 }}>
            <header className="plat__head"><h3>Deterministic guardrails</h3><p>Policies are compiled, not suggested. If a rule says a human signs off above €50k, no temperature setting changes that.</p></header>
            <ul className="rails mono">
              <li><span className="rails__state rails__state--on" />pii.redaction<em>enforced</em></li>
              <li><span className="rails__state rails__state--on" />data.residency = eu-central<em>enforced</em></li>
              <li><span className="rails__state rails__state--on" />hitl.threshold &gt; 0.72<em>enforced</em></li>
              <li><span className="rails__state rails__state--on" />audit.retention = 7y<em>enforced</em></li>
            </ul>
          </article>

          <article className="plat__cell rv" style={{ '--i': 2 }}>
            <header className="plat__head"><h3>Runs inside your perimeter</h3><p>On-prem Kubernetes, private VPC, or EU sovereign cloud. Your data never crosses a boundary you didn’t draw.</p></header>
            <ul className="targets mono">
              <li><span className="amber">▪</span> on-prem / k8s</li>
              <li><span className="amber">▪</span> private vpc</li>
              <li><span className="amber">▪</span> eu sovereign cloud</li>
              <li><span className="dim2">▪ zero data egress by default</span></li>
            </ul>
          </article>

          <article className="plat__cell plat__cell--wide rv" style={{ '--i': 3 }}>
            <header className="plat__head"><h3>Model-agnostic routing</h3><p>Route each task to the best model for it — frontier, open-weight or your own fine-tune — behind one governed interface.</p></header>
            <div className="router mono" aria-hidden="true">
              <span className="router__in">task</span>
              <span className="router__line" />
              <span className="router__hub">policy<br />router</span>
              <span className="router__line router__line--fan" />
              <div className="router__models">
                {MODELS.map((m, i) => (<span className={`router__model${i === active ? ' active' : ''}`} key={m}>{m}</span>))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
