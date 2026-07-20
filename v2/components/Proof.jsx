'use client';
import { useEffect, useRef, useState } from 'react';

function StatNum({ target, dec }) {
  const ref = useRef(null);
  const [val, setVal] = useState((0).toFixed(dec));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVal(target.toFixed(dec)); return; }
    let raf;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min((now - t0) / 1400, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setVal((target * eased).toFixed(dec));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, dec]);
  return <span className="stats__num mono" ref={ref}>{val}</span>;
}

const STATS = [
  [6.4, 1, 'wks', 'median time from kickoff to first agent in production'],
  [2.7, 1, 'M+/day', 'governed agent decisions executed across live deployments'],
  [97.3, 1, '%', 'straight-through processing on document-heavy flows'],
  [0, 0, ' ', 'agent actions outside the audit log — by construction, not by policy'],
];

export default function Proof() {
  return (
    <section className="section section--proof" id="proof">
      <div className="shell">
        <div className="section__head">
          <span className="section__no mono">Proof</span>
          <div className="section__headline"><h2 className="h2 rv">In production, not in&nbsp;pilots<span className="amber">.</span></h2></div>
        </div>
        <dl className="stats">
          {STATS.map(([target, dec, unit, label], i) => (
            <div className="stats__row rv" style={{ '--i': i }} key={label}>
              <dt><StatNum target={target} dec={dec} /><span className="stats__unit mono">{unit}</span></dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
