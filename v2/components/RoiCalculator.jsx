'use client';

/* Agent ROI calculator — CONVERSATIONAL rework (design 2a "Full conversational
   calculator"). Instead of a 3-step form sidebar, the six inputs are woven into
   one editable sentence ("We're a {industry} team automating {process}…"); the
   math writes itself into a result block, a before→with-AI bar, and a 3-year
   cumulative projection with a break-even point. Built in the FlowX v2 design
   language: token-driven so it flips light/dark, one amber accent, Sora/Geist/
   Geist-Mono, restrained motion.

   Preserved from the previous version (flagged as important, not in the 2a
   mockup): the EUR/USD/GBP/JPY currency switcher, MANUAL agent selection (the
   "see the agents" disclosure is where you pick them), and the lead-gated PDF
   export behind "Email me this estimate".

   Model (unchanged core; see /roi-calculator methodology + docs/roi-calculator.md):
     hourlyCost      = fteCost / 1800
     savedMinutes    = Σ agent.t · automationRate        (per process run)
     valuePerRun     = savedMinutes / 60 · hourlyCost
     grossSavings    = monthlyVolume · 12 · valuePerRun
     netSavings/yr   = grossSavings − annualPlatformCost  (platform is RECURRING)
   Projection: cumulative net over 36 months, the platform+rollout cost charged
   up-front at the start of EACH year (months 0/12/24) — so the curve dips below
   zero, crosses at the break-even month, and steps down once a year as the cost
   recurs. 3-year net = (gross − platform) × 3. */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ROI_DATA, CURRENCIES, FTE_HOURS } from '@/lib/roiData';

/* Static, approximate FX rates per 1 EUR (NOT live rates; see methodology). */
const FX = { EUR: 1, USD: 1.08, GBP: 0.85, JPY: 170 };

/* FTE-cost bounds, derived from an EUR baseline (20k–150k) and scaled per currency. */
function fteBounds(code) {
  const r = FX[code];
  const snap = (n, s) => Math.round(n / s) * s;
  const step = code === 'JPY' ? 500000 : Math.max(1000, snap(5000 * r, 1000));
  return { min: snap(20000 * r, step), max: snap(150000 * r, step), step, default: snap(50000 * r, step) };
}

const LEAD_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScdjwhTaPKo5hmZJs4BT5LCzKc5r9rMxRTXjp59m_roz6rwIw/formResponse';

const INDUSTRIES = [...new Set(ROI_DATA.map((r) => r.i))].sort();

/* ---- inline editable "word" controls ---------------------------------- */

function EditSelect({ field, value, placeholder, options, onSelect, disabled, openField, setOpenField }) {
  const open = openField === field;
  return (
    <span className="roic__pick-wrap">
      <button
        type="button"
        className={`roic__edit roic__pick${value ? '' : ' is-empty'}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpenField(open ? null : field)}
      >
        {value || placeholder}
        <span className="roic__caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <span className="roic__menu" role="listbox">
          {options.length === 0 ? (
            <span className="roic__menu-empty">Pick an industry first.</span>
          ) : (
            options.map((o) => (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={o === value}
                className={`roic__menu-item${o === value ? ' is-sel' : ''}`}
                onClick={() => { onSelect(o); setOpenField(null); }}
              >
                {o}
              </button>
            ))
          )}
        </span>
      )}
    </span>
  );
}

function EditNum({ value, onChange, onCommit, placeholder, ariaLabel }) {
  const display = value === '' || value == null ? '' : Number(value).toLocaleString('en-US');
  const width = Math.max((display || placeholder || '').length, 2);
  return (
    <input
      className="roic__edit roic__num"
      type="text"
      inputMode="numeric"
      aria-label={ariaLabel}
      value={display}
      placeholder={placeholder}
      style={{ width: `${width}ch` }}
      onChange={(e) => {
        const raw = e.target.value.replace(/[^\d]/g, '');
        onChange(raw === '' ? '' : parseInt(raw, 10));
      }}
      onBlur={onCommit}
    />
  );
}

/* ---- 3-year projection geometry --------------------------------------- */

function buildProjection(gross, platform) {
  const W = 960, H = 240, padX = 6, padTop = 20, padBot = 20;
  const x0 = padX, x1 = W - padX, plotW = x1 - x0, plotTop = padTop, plotBot = H - padBot, plotH = plotBot - plotTop;
  const perMo = gross / 12;
  const payAt = platform > 0 ? [0, 12, 24] : [];
  const paysDue = (m) => payAt.filter((p) => p <= m).length;

  const net = [];
  for (let m = 0; m <= 36; m++) {
    // At each yearly boundary, emit the top-of-year point (before that year's
    // charge) then the post-charge point — a clean vertical "re-investment" notch.
    if ((m === 12 || m === 24) && platform > 0) net.push([m, perMo * m - platform * (paysDue(m) - 1)]);
    net.push([m, perMo * m - platform * paysDue(m)]);
  }
  const grossEnd = perMo * 36;
  const vals = net.map((p) => p[1]).concat([0, grossEnd]);
  let maxV = Math.max(...vals), minV = Math.min(...vals);
  if (maxV === minV) { maxV = 1; minV = 0; }

  const X = (m) => x0 + (m / 36) * plotW;
  const Y = (v) => plotTop + ((maxV - v) / (maxV - minV)) * plotH;

  const netLine = net.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
  const netArea = `${netLine} L${X(36).toFixed(1)},${plotBot} L${X(0).toFixed(1)},${plotBot} Z`;
  const grossPath = `M${X(0).toFixed(1)},${Y(0).toFixed(1)} L${X(36).toFixed(1)},${Y(grossEnd).toFixed(1)}`;
  const yZero = Y(0);

  let beFrac = null;
  if (platform > 0 && perMo > 0) { const m = platform / perMo; if (m <= 36) beFrac = m; }

  return {
    W, H, netLine, netArea, grossPath,
    yZeroPct: (yZero / H) * 100,
    beFrac,
    beXPct: beFrac != null ? (X(beFrac) / W) * 100 : null,
  };
}

export default function RoiCalculator() {
  const [currency, setCurrency] = useState('EUR');
  const [industry, setIndustry] = useState('');
  const [stack, setStack] = useState('');
  const [executions, setExecutions] = useState(''); // monthly volume, number | ''
  const [fteCost, setFteCost] = useState(50000);
  const [autoPct, setAutoPct] = useState(75);
  const [platformCost, setPlatformCost] = useState(''); // annual platform + rollout, number | ''
  const [enabled, setEnabled] = useState({});
  const [openField, setOpenField] = useState(null);
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lead, setLead] = useState({ fname: '', lname: '', email: '', consent: false });
  const [submitting, setSubmitting] = useState(false);

  const cur = CURRENCIES[currency];
  const bounds = fteBounds(currency);

  const stacks = useMemo(
    () => (industry ? [...new Set(ROI_DATA.filter((r) => r.i === industry).map((r) => r.s))].sort() : []),
    [industry],
  );
  const agents = useMemo(
    () => (industry && stack ? ROI_DATA.filter((r) => r.i === industry && r.s === stack) : []),
    [industry, stack],
  );

  /* close the inline dropdown on outside click / Escape */
  useEffect(() => {
    if (!openField) return undefined;
    const onDown = (e) => { if (!e.target.closest('.roic__pick-wrap')) setOpenField(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpenField(null); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openField]);

  /* ---- formatting ---- */
  const fmtNum = (n) => Math.round(n).toLocaleString('en-US');
  const money = (n) => cur.symbol + fmtNum(n);
  const moneyShort = (n) => {
    const a = Math.abs(n);
    if (a >= 1e6) return `${cur.symbol}${(n / 1e6).toFixed(2).replace(/\.?0+$/, '')}M`;
    if (a >= 1e3) return `${cur.symbol}${Math.round(n / 1e3)}K`;
    return money(n);
  };

  /* ---- derived model ---- */
  const monthlyExec = Number(executions) || 0;
  const annualExec = monthlyExec * 12;
  const hourlyCost = fteCost / FTE_HOURS;
  const autoRate = autoPct / 100;
  const platform = Number(platformCost) || 0;

  const enabledAgents = agents.filter((_, i) => enabled[i]);
  const allSelected = agents.length > 0 && agents.every((_, i) => enabled[i]);

  const ready = !!industry && !!stack && monthlyExec > 0 && enabledAgents.length > 0;

  const manualMinPerExec = enabledAgents.reduce((s, a) => s + (a.t || 0), 0);
  const savedMinPerExec = manualMinPerExec * autoRate;
  const valuePerExec = (savedMinPerExec / 60) * hourlyCost;
  const grossSavings = annualExec * valuePerExec;
  const netSavings = grossSavings - platform;
  const timeSavedHours = (annualExec * savedMinPerExec) / 60;
  const ftesSaved = timeSavedHours / FTE_HOURS;

  /* break-even month + 3-year net (platform recurring, charged yearly up front) */
  const breakEvenMonth = platform > 0 && grossSavings > 0 ? Math.ceil((12 * platform) / grossSavings) : null;
  const breaksEven = breakEvenMonth != null && breakEvenMonth <= 36;
  const net3yr = grossSavings * 3 - platform * 3;

  /* chart — manual vs. residual time after the chosen automation rate */
  const autoMinPerExec = manualMinPerExec * (1 - autoRate);
  const maxMin = Math.max(manualMinPerExec, 1);
  const beforeW = ready ? 100 : 60;
  const afterW = ready ? Math.max((autoMinPerExec / maxMin) * 100, 4) : 15;
  const minLabel = (m) => (m < 1 ? `${(m * 60).toFixed(0)} sec` : `${m.toFixed(1)} min`);

  const proj = useMemo(
    () => (ready && grossSavings > 0 ? buildProjection(grossSavings, platform) : null),
    [ready, grossSavings, platform],
  );

  /* ---- handlers ---- */
  const onIndustry = (v) => { setIndustry(v); setStack(''); setEnabled({}); setAgentsOpen(false); };
  const onStack = (v) => { setStack(v); setEnabled({}); setAgentsOpen(true); };
  const toggleAgent = (i) => setEnabled((p) => ({ ...p, [i]: !p[i] }));
  const toggleAll = () => {
    if (allSelected) return setEnabled({});
    const next = {};
    agents.forEach((_, i) => { next[i] = true; });
    return setEnabled(next);
  };
  function commitFte() { setFteCost((v) => Math.min(bounds.max, Math.max(bounds.min, Number(v) || bounds.default))); }
  function commitAuto() { setAutoPct((v) => Math.min(95, Math.max(40, Number(v) || 75))); }
  function onCurrency(next) {
    const b = fteBounds(next);
    const eur = fteCost / FX[currency];
    setFteCost(Math.min(b.max, Math.max(b.min, Math.round((eur * FX[next]) / b.step) * b.step)));
    if (platformCost !== '') setPlatformCost(Math.round((Number(platformCost) / FX[currency]) * FX[next]));
    setCurrency(next);
  }

  /* ---- export → lead gate → print (unchanged behaviour) ---- */
  const submitRef = useRef(null);

  function submitLeadThenPrint(e) {
    e.preventDefault();
    if (!lead.fname || !lead.lname || !lead.email || !lead.consent) return;
    setSubmitting(true);
    const iframe = document.createElement('iframe');
    iframe.name = 'roi-lead-sink';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const form = document.createElement('form');
    form.action = LEAD_FORM_ACTION;
    form.method = 'POST';
    form.target = 'roi-lead-sink';
    form.style.display = 'none';
    const add = (name, value) => {
      const inp = document.createElement('input');
      inp.type = 'hidden';
      inp.name = name;
      inp.value = value;
      form.appendChild(inp);
    };
    add('entry.1241816557', lead.fname);
    add('entry.638964177', lead.lname);
    add('entry.97707432', lead.email);
    add('emailAddress', lead.email);
    add('entry.1187086305', 'I agree');
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
      form.remove();
      iframe.remove();
      setSubmitting(false);
      setModalOpen(false);
      printReport();
    }, 900);
  }

  function printReport() {
    const rows = enabledAgents
      .map((a) => {
        const per = ((a.t * autoRate) / 60) * hourlyCost;
        return `<tr>
          <td>${a.n}</td>
          <td class="dim">${a.d}</td>
          <td class="r">${(a.t * autoRate).toFixed(1)} min</td>
          <td class="r">${money(monthlyExec * per)}</td>
          <td class="r b">${money(annualExec * per)}</td>
        </tr>`;
      })
      .join('');

    const netRows = platform > 0
      ? `<div class="cell"><div class="k">Annual platform cost</div><div class="v">${money(platform)}</div></div>
         <div class="cell"><div class="k">Net savings / yr</div><div class="v">${money(netSavings)}</div></div>
         ${breaksEven ? `<div class="cell hero"><div class="k">Break-even</div><div class="v">Month ${breakEvenMonth}</div></div>` : ''}
         <div class="cell"><div class="k">3-year net savings</div><div class="v">${money(net3yr)}</div></div>`
      : `<div class="cell"><div class="k">Active agents</div><div class="v">${enabledAgents.length}</div></div>
         <div class="cell"><div class="k">Time saved / yr</div><div class="v">${fmtNum(timeSavedHours)} hrs</div></div>`;

    const doc = `<!doctype html><html><head><meta charset="utf-8"><title>FlowX.AI — Agent ROI Summary</title>
      <style>
        @page { size: A4 landscape; margin: 14mm; }
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #17181B; margin: 0; }
        .hd { display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid #ECECEE; padding-bottom:10px; margin-bottom:20px; }
        .brand { font-size:18pt; font-weight:800; letter-spacing:-.02em; }
        .brand span { color:#B8860B; }
        .meta { text-align:right; font-size:9pt; color:#6d6d72; line-height:1.5; }
        .meta b { color:#17181B; }
        .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:20px; }
        .cell { border:1px solid #E5E7EB; border-radius:10px; padding:12px 14px; background:#FAFAFA; }
        .cell.hero { background:#FFFBF0; border-color:#F3E2B8; }
        .k { font-size:8pt; color:#6d6d72; margin-bottom:6px; text-transform:uppercase; letter-spacing:.08em; }
        .v { font-size:15pt; font-weight:800; letter-spacing:-.02em; }
        .cell.hero .v { color:#8a5e00; }
        h2 { font-size:11pt; margin:0 0 8px; }
        table { width:100%; border-collapse:collapse; font-size:9pt; }
        th { text-align:left; color:#6d6d72; font-weight:600; padding:6px 6px; border-bottom:1px solid #E5E7EB; }
        td { padding:6px 6px; border-bottom:1px dashed #E5E7EB; }
        td.r, th.r { text-align:right; }
        td.b { font-weight:700; }
        td.dim { color:#6d6d72; }
        .foot { margin-top:18px; font-size:8pt; color:#6d6d72; }
      </style></head><body>
        <div class="hd">
          <div>
            <div class="brand">Flow<span>X</span>.AI · Agent ROI</div>
            <div style="font-size:10pt;color:#6d6d72;margin-top:4px;">Estimated savings — executive summary</div>
          </div>
          <div class="meta">
            <div>Prepared for <b>${lead.fname} ${lead.lname}</b></div>
            <div>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>
        <div class="grid">
          <div class="cell"><div class="k">Industry</div><div class="v" style="font-size:11pt">${industry}</div></div>
          <div class="cell"><div class="k">Use case</div><div class="v" style="font-size:11pt">${stack}</div></div>
          <div class="cell"><div class="k">Monthly volume</div><div class="v">${monthlyExec.toLocaleString('en-US')}</div></div>
          <div class="cell"><div class="k">Automation rate</div><div class="v">${autoPct}%</div></div>
          <div class="cell hero"><div class="k">Gross annual savings</div><div class="v">${money(grossSavings)}</div></div>
          <div class="cell"><div class="k">FTE equivalent</div><div class="v">${ftesSaved.toFixed(2)}</div></div>
          ${netRows}
        </div>
        <h2>Agent breakdown</h2>
        <table>
          <thead><tr><th>Agent</th><th>Department</th><th class="r">Time saved / process</th><th class="r">Monthly</th><th class="r">Annual</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="foot">Estimate. Based on a ${money(fteCost)} annual fully-loaded FTE cost, ${FTE_HOURS.toLocaleString('en-US')} working hours/year, and a ${autoPct}% automation rate. Savings reflect capacity freed, before change-management effort. flowx.ai/business-agents-roi-calculator</div>
      </body></html>`;

    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.right = '0';
    frame.style.bottom = '0';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    document.body.appendChild(frame);
    const w = frame.contentWindow;
    w.document.open();
    w.document.write(doc);
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
      setTimeout(() => frame.remove(), 500);
    }, 350);
  }

  const ftePlaceholder = fteBounds('EUR').default; // stable placeholder text
  const platPlaceholder = Math.round(150000 * FX[currency]);

  return (
    <div className="roi roic" id="calc">
      <div className="roic__card">
        {/* ---- header ---- */}
        <div className="roic__head">
          <span className="roic__eyebrow mono">ROI Calculator</span>
          <div className="roic__head-right">
            <span className="roic__hint mono" aria-hidden="true">Edit any highlighted value</span>
            <label className="roic__cur-label mono" htmlFor="roi-currency">Currency</label>
            <select
              id="roi-currency"
              className="roi__mini-select mono"
              value={currency}
              onChange={(e) => onCurrency(e.target.value)}
            >
              {Object.entries(CURRENCIES).map(([code, c]) => (
                <option key={code} value={code}>{code} ({c.symbol})</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- conversational sentence ---- */}
        <p className="roic__sentence">
          We&apos;re a{' '}
          <EditSelect
            field="industry" value={industry} placeholder="pick an industry" options={INDUSTRIES}
            onSelect={onIndustry} openField={openField} setOpenField={setOpenField}
          />{' '}
          team automating{' '}
          <EditSelect
            field="process" value={stack} placeholder="a process" options={stacks}
            onSelect={onStack} disabled={!industry} openField={openField} setOpenField={setOpenField}
          />
          . We handle{' '}
          <EditNum value={executions} onChange={setExecutions} placeholder="5,000" ariaLabel="Monthly volume" />{' '}
          cases a month, and agents can take over{' '}
          <EditNum value={autoPct} onChange={setAutoPct} onCommit={commitAuto} placeholder="75" ariaLabel="Automation rate (percent)" />% of the manual work.
          A full-time employee costs about {cur.symbol}
          <EditNum value={fteCost} onChange={setFteCost} onCommit={commitFte} placeholder={fmtNum(ftePlaceholder)} ariaLabel="Cost per FTE per year" />
          <span className="roic__unit"> / yr</span>, and we&apos;d invest {cur.symbol}
          <EditNum value={platformCost} onChange={setPlatformCost} placeholder={fmtNum(platPlaceholder)} ariaLabel="Annual platform and rollout cost (optional)" />
          <span className="roic__unit"> / yr</span> in platform &amp; rollout
          <span className="roic__opt-inline"> (optional)</span>.
        </p>

        {/* ---- agents disclosure (MANUAL selection — sits with the inputs) ---- */}
        <div className="roic__disc roic__disc--top">
          <button
            type="button"
            className={`roic__disc-btn${agentsOpen ? ' is-open' : ''}`}
            aria-expanded={agentsOpen}
            onClick={() => setAgentsOpen((o) => !o)}
            disabled={!stack}
          >
            <span>
              {ready ? 'See the agents behind this' : 'Choose the agents that run this'}
              {agents.length > 0 && <span className="roic__disc-count mono"> {enabledAgents.length}/{agents.length}</span>}
            </span>
            <span className="roic__disc-caret" aria-hidden="true">▾</span>
          </button>

          {agentsOpen && (
            <div className="roic__disc-body">
              <div className="roi__agents-top">
                <span className="roi__label" style={{ margin: 0 }}>
                  {stack ? `Available agents (${agents.length})` : 'Pick a process in the sentence above first.'}
                </span>
                {agents.length > 0 && (
                  <button type="button" className="roi__selectall mono" onClick={toggleAll}>
                    {allSelected ? 'Clear all' : 'Select all'}
                  </button>
                )}
              </div>
              {agents.length > 0 && (
                <div className="roi__agent-list">
                  {agents.map((a, i) => (
                    <label key={a.n + i} className={`roi__agent${enabled[i] ? ' is-on' : ''}`}>
                      <input type="checkbox" checked={!!enabled[i]} onChange={() => toggleAgent(i)} />
                      <span className="roi__agent-info">
                        <span className="roi__agent-name">{a.n}</span>
                        <span className="roi__agent-dept mono">{a.d}</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {ready && (
                <div className="roic__table-wrap">
                  <table className="roi__table">
                    <thead>
                      <tr>
                        <th>Agent</th>
                        <th>Department</th>
                        <th className="r">Time saved / process</th>
                        <th className="r">Monthly savings</th>
                        <th className="r">Annual savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enabledAgents.map((a, i) => {
                        const per = ((a.t * autoRate) / 60) * hourlyCost;
                        return (
                          <tr key={a.n + i}>
                            <td className="roi__td-name">{a.n}</td>
                            <td className="dim">{a.d}</td>
                            <td className="r mono">{(a.t * autoRate).toFixed(1)} min</td>
                            <td className="r mono">{money(monthlyExec * per)}</td>
                            <td className="r mono roi__td-annual">{money(annualExec * per)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---- result block ---- */}
        <div className={`roic__result${ready ? '' : ' is-dim'}`}>
          <div className="roic__worth-row">
            <div className="roic__worth">
              <div className="roic__worth-label mono">That&apos;s worth</div>
              <div className="roic__worth-val">
                {ready ? money(grossSavings) : `${cur.symbol}—`}
                <span className="roic__per">/ year</span>
              </div>
            </div>
            <div className="roic__kpis">
              <div className="roic__kpi">
                <div className="roic__kpi-v">{ready ? `${fmtNum(timeSavedHours)}` : '—'}<span className="roic__kpi-u"> hrs</span></div>
                <div className="roic__kpi-k">freed / year</div>
              </div>
              <div className="roic__kpi">
                <div className="roic__kpi-v">{ready ? ftesSaved.toFixed(1) : '—'}<span className="roic__kpi-u"> FTE</span></div>
                <div className="roic__kpi-k">capacity</div>
              </div>
              <div className="roic__kpi">
                {platform > 0 ? (
                  <>
                    <div className="roic__kpi-v roic__kpi-v--amber">{ready && breaksEven ? `Mo ${breakEvenMonth}` : '—'}</div>
                    <div className="roic__kpi-k">break-even</div>
                  </>
                ) : (
                  <>
                    <div className="roic__kpi-v roic__kpi-v--amber">{ready ? `${autoPct}%` : '—'}</div>
                    <div className="roic__kpi-k">automated</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* before / with-AI bars */}
          <div className="roic__bars">
            <div className="roic__bar-row">
              <span className="roic__bar-label mono">Before</span>
              <span className="roic__bar-track"><span className="roic__bar roic__bar--before" style={{ width: `${beforeW}%` }} /></span>
              <span className="roic__bar-val mono">{ready ? minLabel(manualMinPerExec) : '—'}</span>
            </div>
            <div className="roic__bar-row">
              <span className="roic__bar-label mono roic__bar-label--amber">With AI</span>
              <span className="roic__bar-track"><span className="roic__bar roic__bar--after" style={{ width: `${afterW}%` }} /></span>
              <span className="roic__bar-val mono roic__bar-val--amber">{ready ? minLabel(autoMinPerExec) : '—'}</span>
            </div>
          </div>
        </div>

        {/* ---- 3-year projection ---- */}
        <div className={`roic__proj${ready ? '' : ' is-dim'}`}>
          <div className="roic__proj-head">
            <div className="roic__proj-headline">
              {platform > 0 ? (
                <>Over three years, that compounds to <span className="amber">{ready ? moneyShort(net3yr) : `${cur.symbol}—`} net</span></>
              ) : (
                <>Over three years, that compounds to <span className="amber">{ready ? moneyShort(grossSavings * 3) : `${cur.symbol}—`}</span></>
              )}
            </div>
            <div className="roic__proj-sub">
              {platform > 0 ? `after ${money(platform)} / yr platform cost` : 'add a platform cost above to net it'}
            </div>
          </div>

          <div className="roic__chart-wrap">
            <svg className="roic__chart" viewBox={`0 0 ${proj ? proj.W : 960} ${proj ? proj.H : 240}`} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="roicGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: 'var(--amber)', stopOpacity: 0.22 }} />
                  <stop offset="1" style={{ stopColor: 'var(--amber)', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {proj && (
                <>
                  <line
                    x1="6" x2="954"
                    y1={(proj.yZeroPct / 100) * proj.H} y2={(proj.yZeroPct / 100) * proj.H}
                    strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
                    style={{ stroke: 'rgba(var(--ink),0.16)' }}
                  />
                  <path d={proj.netArea} style={{ fill: 'url(#roicGrad)' }} />
                  <path d={proj.grossPath} strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" style={{ fill: 'none', stroke: 'rgba(var(--ink),0.3)' }} />
                  <path d={proj.netLine} strokeWidth="2.5" vectorEffect="non-scaling-stroke" style={{ fill: 'none', stroke: 'var(--amber)' }} />
                </>
              )}
            </svg>
            {proj && proj.beXPct != null && (
              <>
                <span className="roic__be-dot" style={{ left: `${proj.beXPct}%`, top: `${proj.yZeroPct}%` }} aria-hidden="true" />
                <span className="roic__be-label mono" style={{ left: `${proj.beXPct}%`, top: `${proj.yZeroPct}%` }}>
                  Break-even · Mo {breakEvenMonth}
                </span>
              </>
            )}
          </div>

          <div className="roic__axis mono">
            <span>Today</span><span>12 mo</span><span>24 mo</span><span>36 mo</span>
          </div>
          <div className="roic__legend mono">
            <span className="roic__legend-item"><i className="roic__swatch roic__swatch--net" />Net savings</span>
            <span className="roic__legend-item"><i className="roic__swatch roic__swatch--gross" />Gross savings</span>
          </div>
        </div>

        {/* ---- footer ---- */}
        <div className="roic__foot">
          <p className="roic__foot-note">
            Assumes {FTE_HOURS.toLocaleString('en-US')} working hrs/yr · figures are capacity freed, not headcount ·{' '}
            <a className="roic__foot-link" href="#how-calculated">how this is calculated</a>
          </p>
          <button type="button" className="btn btn--primary roic__cta" onClick={() => setModalOpen(true)} disabled={!ready}>
            Email me this estimate
          </button>
        </div>
      </div>

      {/* ============ LEAD MODAL ============ */}
      {modalOpen && (
        <div className="roi__modal" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="roi__modal-card" role="dialog" aria-modal="true" aria-labelledby="roi-modal-title">
            <button type="button" className="roi__modal-close" aria-label="Close" onClick={() => setModalOpen(false)}>×</button>
            <p className="roi__modal-title" id="roi-modal-title">Get your ROI report</p>
            <p className="roi__modal-sub">Enter your details to download a personalized summary.</p>
            <form ref={submitRef} onSubmit={submitLeadThenPrint}>
              <label className="roi__label" htmlFor="lead-fn">First name</label>
              <input id="lead-fn" className="roi__input" required value={lead.fname}
                onChange={(e) => setLead({ ...lead, fname: e.target.value })} placeholder="Jane" />
              <label className="roi__label" htmlFor="lead-ln">Last name</label>
              <input id="lead-ln" className="roi__input" required value={lead.lname}
                onChange={(e) => setLead({ ...lead, lname: e.target.value })} placeholder="Doe" />
              <label className="roi__label" htmlFor="lead-em">Work email</label>
              <input id="lead-em" className="roi__input" type="email" required value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="jane@company.com" />
              <label className="roi__consent">
                <input type="checkbox" required checked={lead.consent}
                  onChange={(e) => setLead({ ...lead, consent: e.target.checked })} />
                <span>I agree to receive communications from FlowX.AI about products, services and events. I can unsubscribe at any time.</span>
              </label>
              <button type="submit" className="btn btn--primary roi__modal-submit" disabled={submitting}>
                {submitting ? 'Generating…' : 'Submit & download PDF'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
