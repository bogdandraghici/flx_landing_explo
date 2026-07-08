'use client';
import { useEffect, useRef, useState } from 'react';
import { useCompiler } from './CompilerContext';

const PLACEHOLDERS = [
  'automate KYC onboarding for retail customers',
  'triage motor insurance claims end to end',
  'underwrite SME loans in under 24 hours',
  'monitor transactions for AML, cut false positives',
  'resolve regulated customer complaints inside SLA',
];
const HINTS = [
  ['KYC onboarding', 'automate KYC onboarding for retail customers'],
  ['claims triage', 'triage motor insurance claims end to end'],
  ['SME lending', 'underwrite SME loans in under 24 hours'],
];

export default function HeroTerminal() {
  const { compile } = useCompiler();
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [log, setLog] = useState([]);
  const [busy, setBusy] = useState(false);
  const reduce = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) { setPlaceholder(PLACEHOLDERS[0]); return; }
    let pi = 0, ci = 0, deleting = false, timer;
    const tick = () => {
      const full = PLACEHOLDERS[pi];
      if (!deleting) {
        ci++;
        if (ci >= full.length) { deleting = true; setPlaceholder(full); timer = setTimeout(tick, 2100); return; }
      } else {
        ci -= 3;
        if (ci <= 0) { ci = 0; deleting = false; pi = (pi + 1) % PLACEHOLDERS.length; }
      }
      setPlaceholder(full.slice(0, ci));
      timer = setTimeout(tick, deleting ? 22 : 38 + Math.random() * 40);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = (raw) => {
    const v = raw.trim();
    if (!v || busy) return;
    setBusy(true);
    setValue('');
    const t = classifySlug(v);
    const steps = reduce.current ? [0, 0, 0, 0] : [80, 560, 1060, 1560];
    setLog([]);
    const add = (line, time, delay) => timers.current.push(setTimeout(() => setLog((l) => [...l, { line, time }]), delay));
    add('intent parsed', '128ms', steps[0]);
    add(`matched pattern — ${t}`, '412ms', steps[1]);
    add('agents + guardrails composed', '590ms', steps[2]);
    timers.current.push(setTimeout(() => setLog((l) => [...l, { line: 'rendering blueprint ↓', time: '', arrow: true }]), steps[3]));
    timers.current.push(setTimeout(() => {
      compile(v);
      document.getElementById('blueprint')?.scrollIntoView({ behavior: reduce.current ? 'auto' : 'smooth', block: 'start' });
      setBusy(false);
    }, reduce.current ? 60 : 2150));
  };

  return (
    <>
      <div className="term rv-load" style={{ '--d': 5 }} id="term">
        <div className="term__bar mono">
          <span className="term__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="term__title">flowx — solution compiler</span>
          <span className="term__ver">v4.2.1</span>
        </div>
        <div className="term__body mono">
          <p className="term__ask"><span className="amber">▸</span> what should your first agent do?</p>
          <form className="term__form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); run(value); }}>
            <label className="term__prompt" htmlFor="termInput">$</label>
            <input
              ref={inputRef} className="term__input" id="termInput" name="usecase" type="text" spellCheck={false}
              placeholder={placeholder} aria-label="Describe your use case" maxLength={120}
              value={value} disabled={busy} onChange={(e) => setValue(e.target.value)}
            />
            <span className="term__caret" aria-hidden="true" />
            <button className="term__go" type="submit" aria-label="Compile blueprint">compile ↵</button>
          </form>
          <div className="term__log" aria-live="polite">
            {log.map((l, i) => (
              <div className="ln" key={i}>
                <span><span className="ok">{l.arrow ? '▸' : '✓'}</span>{l.line}</span><span className="t">{l.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="term__hints mono rv-load" style={{ '--d': 6 }}>
        try —{' '}
        {HINTS.map(([label, hint], i) => (
          <span key={hint}>
            <button className="hint" type="button" onClick={() => run(hint)}>{label}</button>
            {i < HINTS.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </p>
    </>
  );
}

// lightweight slug echo for the log line (mirrors classify().slug)
import { classify } from './blueprint.js';
function classifySlug(v) { return classify(v).slug; }
