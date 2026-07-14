'use client';

/* Agent ROI calculator — a v2 re-skin of the flowx.ai/business-agents-roi-calculator
   embed, with a more honest model. Same shape (industry → use case → volume +
   FTE cost + assumptions → agents ⇒ savings), rebuilt as a React client
   component in the FlowX v2 design language: charcoal ground, one amber accent,
   hairline cards, Sora/Geist/Geist-Mono, restrained motion.

   Model (see /roi-calculator methodology section + v2/docs/roi-calculator.md):
     hourlyCost      = fteCost / 1800
     savedMinutes    = Σ agent.t · automationRate        (per process run)
     valuePerRun     = savedMinutes / 60 · hourlyCost
     grossSavings    = monthlyVolume · 12 · valuePerRun
     netSavings      = grossSavings − annualPlatformCost
     FTE equivalent  = (savedMinutes · runs/yr / 60) / 1800
   The chart's "with AI" time and the savings now use the SAME automationRate,
   so they can't disagree (the source embed credited 100% to savings but drew a
   95% bar — that mismatch is fixed here). */

import { useMemo, useRef, useState } from 'react';
import { ROI_DATA, CURRENCIES, FTE_HOURS } from '@/lib/roiData';

/* Static, approximate FX rates per 1 EUR — enough to keep the FTE cost and the
   results in a believable range per currency (NOT live rates; see methodology). */
const FX = { EUR: 1, USD: 1.08, GBP: 0.85, JPY: 170 };

/* FTE-cost slider bounds, derived from an EUR baseline (20k–150k, step 5k) and
   scaled into each currency so the range stays sensible (e.g. millions of JPY). */
function fteBounds(code) {
  const r = FX[code];
  const snap = (n, s) => Math.round(n / s) * s;
  const step = code === 'JPY' ? 500000 : Math.max(1000, snap(5000 * r, 1000));
  return { min: snap(20000 * r, step), max: snap(150000 * r, step), step, default: snap(50000 * r, step) };
}

const LEAD_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScdjwhTaPKo5hmZJs4BT5LCzKc5r9rMxRTXjp59m_roz6rwIw/formResponse';

const INDUSTRIES = [...new Set(ROI_DATA.map((r) => r.i))].sort();

export default function RoiCalculator() {
  const [currency, setCurrency] = useState('EUR');
  const [industry, setIndustry] = useState('');
  const [stack, setStack] = useState('');
  const [executions, setExecutions] = useState('');
  const [fteCost, setFteCost] = useState(50000);
  const [autoPct, setAutoPct] = useState(75); // automation rate, % of manual time removed
  const [platformCost, setPlatformCost] = useState(''); // annual platform + rollout cost (optional)
  const [enabled, setEnabled] = useState({});
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

  /* ---- formatting ---- */
  const fmtNum = (n) => Math.round(n).toLocaleString('en-US');
  const money = (n) => cur.symbol + fmtNum(n);

  /* ---- derived model ---- */
  const monthlyExec = parseFloat(executions) || 0;
  const annualExec = monthlyExec * 12;
  const hourlyCost = fteCost / FTE_HOURS;
  const autoRate = autoPct / 100;
  const platform = parseFloat(platformCost) || 0;

  const enabledAgents = agents.filter((_, i) => enabled[i]);
  const allSelected = agents.length > 0 && agents.every((_, i) => enabled[i]);

  const step1Done = !!industry && !!stack;
  const step2Done = step1Done && monthlyExec > 0;
  const step3Done = step2Done && enabledAgents.length > 0;
  const ready = step1Done && step2Done && step3Done;
  const activeStep = !step1Done ? 1 : !step2Done ? 2 : !step3Done ? 3 : 0;

  const manualMinPerExec = enabledAgents.reduce((s, a) => s + (a.t || 0), 0);
  const savedMinPerExec = manualMinPerExec * autoRate;
  const valuePerExec = (savedMinPerExec / 60) * hourlyCost;
  const grossSavings = annualExec * valuePerExec;
  const netSavings = grossSavings - platform;
  const roiX = platform > 0 ? grossSavings / platform : null;
  const timeSavedHours = (annualExec * savedMinPerExec) / 60;
  const ftesSaved = timeSavedHours / FTE_HOURS;

  /* chart — manual vs. residual time after the chosen automation rate */
  const autoMinPerExec = manualMinPerExec * (1 - autoRate);
  const maxMin = Math.max(manualMinPerExec, 1);
  const manualW = ready ? 100 : 50;
  const autoW = ready ? Math.max((autoMinPerExec / maxMin) * 100, 4) : 12;
  const minLabel = (m) => (m < 1 ? `${(m * 60).toFixed(0)} sec` : `${m.toFixed(1)} min`);

  /* ---- handlers ---- */
  const onIndustry = (e) => { setIndustry(e.target.value); setStack(''); setEnabled({}); };
  const onStack = (e) => { setStack(e.target.value); setEnabled({}); };
  const toggleAgent = (i) => setEnabled((p) => ({ ...p, [i]: !p[i] }));
  const toggleAll = () => {
    if (allSelected) return setEnabled({});
    const next = {};
    agents.forEach((_, i) => { next[i] = true; });
    setEnabled(next);
  };
  function onCurrency(next) {
    const b = fteBounds(next);
    const eur = fteCost / FX[currency];
    const converted = Math.min(b.max, Math.max(b.min, Math.round((eur * FX[next]) / b.step) * b.step));
    setFteCost(converted);
    if (platformCost) setPlatformCost(String(Math.round((parseFloat(platformCost) / FX[currency]) * FX[next])));
    setCurrency(next);
  }

  /* ---- export → lead gate → print ---- */
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
          <td class="r">${a.t} min</td>
          <td class="r">${money(monthlyExec * per)}</td>
          <td class="r b">${money(annualExec * per)}</td>
        </tr>`;
      })
      .join('');

    const netRows = platform > 0
      ? `<div class="cell"><div class="k">Est. platform cost</div><div class="v">${money(platform)}</div></div>
         <div class="cell hero"><div class="k">Net annual savings</div><div class="v">${money(netSavings)}</div></div>`
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

  return (
    <div className="roi" id="calc">
      <div className="roi__rail">
        <label className="roi__rail-label mono" htmlFor="roi-currency">Currency</label>
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

      <div className="roi__layout">
        {/* ============ CONFIG ============ */}
        <aside className="roi__config">
          <div className="roi__config-head">
            <span className="roi__config-title">Configure your scenario</span>
            <span className="roi__chip mono">3 steps</span>
          </div>

          {/* Step 1 */}
          <section className={`roi__step${activeStep === 1 ? ' is-active' : ''}`}>
            <p className="roi__step-head"><span className="roi__step-no mono">1</span>Industry &amp; use case</p>
            <label className="roi__label" htmlFor="roi-industry">Industry</label>
            <select id="roi-industry" className="roi__select" value={industry} onChange={onIndustry}>
              <option value="" disabled>Select industry</option>
              {INDUSTRIES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <label className="roi__label" htmlFor="roi-stack">Stack / use case</label>
            <select id="roi-stack" className="roi__select" value={stack} onChange={onStack} disabled={!industry}>
              <option value="" disabled>Select use case</option>
              {stacks.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <p className="roi__help">Choose the business process you want to automate.</p>
          </section>

          {/* Step 2 */}
          <section className={`roi__step${activeStep === 2 ? ' is-active' : ''}`}>
            <p className="roi__step-head"><span className="roi__step-no mono">2</span>Volume, cost &amp; assumptions</p>
            <label className="roi__label" htmlFor="roi-vol">Expected monthly volume</label>
            <input
              id="roi-vol" className="roi__input mono" type="number" min="0" step="100"
              placeholder="e.g. 5,000" value={executions}
              onChange={(e) => setExecutions(e.target.value)}
            />
            <div className="roi__presets">
              {[1000, 5000, 10000].map((v) => (
                <button key={v} type="button" className="roi__preset mono" onClick={() => setExecutions(String(v))}>
                  {v / 1000}K/mo
                </button>
              ))}
            </div>

            <div className="roi__fte-head">
              <span className="roi__label" style={{ margin: 0 }}>Cost per FTE</span>
              <span className="roi__fte-pill mono">{money(fteCost)} / yr</span>
            </div>
            <input
              className="roi__range" type="range"
              min={bounds.min} max={bounds.max} step={bounds.step}
              value={Math.min(bounds.max, Math.max(bounds.min, fteCost))}
              onChange={(e) => setFteCost(parseFloat(e.target.value))}
              aria-label="Annual cost per FTE"
            />
            <p className="roi__help">Fully-loaded annual cost per FTE — used to value the time saved.</p>

            <div className="roi__fte-head">
              <span className="roi__label" style={{ margin: 0 }}>Automation rate</span>
              <span className="roi__fte-pill mono">{autoPct}%</span>
            </div>
            <input
              className="roi__range" type="range" min="40" max="95" step="5"
              value={autoPct} onChange={(e) => setAutoPct(parseInt(e.target.value, 10))}
              aria-label="Automation rate"
            />
            <p className="roi__help">Share of manual handling time the agents actually remove — the rest stays with a human (review, exceptions).</p>

            <label className="roi__label" htmlFor="roi-plat">Est. annual platform + rollout cost <span className="roi__opt">(optional)</span></label>
            <input
              id="roi-plat" className="roi__input mono" type="number" min="0" step="1000"
              placeholder={`e.g. ${cur.symbol}${(150000 * FX[currency]).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
              value={platformCost} onChange={(e) => setPlatformCost(e.target.value)}
            />
            <p className="roi__help">Enter a figure to see savings <em>net</em> of investment and a first-year ROI multiple.</p>
          </section>

          {/* Step 3 */}
          <section className={`roi__step${activeStep === 3 ? ' is-active' : ''}`}>
            <p className="roi__step-head"><span className="roi__step-no mono">3</span>Choose AI agents</p>
            <div className="roi__agents-top">
              <span className="roi__label" style={{ margin: 0 }}>Available agents ({agents.length})</span>
              {agents.length > 0 && (
                <button type="button" className="roi__selectall mono" onClick={toggleAll}>
                  {allSelected ? 'Clear all' : 'Select all'}
                </button>
              )}
            </div>
            <div className="roi__agent-list">
              {agents.length === 0 ? (
                <p className="roi__empty mono">Pick an industry &amp; use case first.</p>
              ) : (
                agents.map((a, i) => (
                  <label key={a.n + i} className={`roi__agent${enabled[i] ? ' is-on' : ''}`}>
                    <input type="checkbox" checked={!!enabled[i]} onChange={() => toggleAgent(i)} />
                    <span className="roi__agent-info">
                      <span className="roi__agent-name">{a.n}</span>
                      <span className="roi__agent-dept mono">{a.d}</span>
                    </span>
                  </label>
                ))
              )}
            </div>
          </section>

          <button type="button" className="btn btn--primary roi__export" onClick={() => setModalOpen(true)} disabled={!ready}>
            Export PDF report
          </button>
        </aside>

        {/* ============ RESULTS COLUMN (hero → chart → breakdown) ============ */}
        <div className="roi__results">
        {/* ============ HERO ============ */}
        <div className={`roi__panel roi__result${ready ? '' : ' is-dim'}`}>
          <p className="roi__panel-label mono">Estimated annual savings</p>
          <p className="roi__value">{money(grossSavings)}<span className="amber">.</span></p>
          <p className="roi__value-sub">{ftesSaved.toFixed(2)} FTE equivalent · {autoPct}% automation</p>
          <a className="roi__valnote mono" href="#how-calculated">How is this calculated? ↓</a>

          {platform > 0 && ready && (
            <div className="roi__net mono">
              <span>Gross {money(grossSavings)}</span>
              <span className="roi__net-op">− platform {money(platform)}</span>
              <span className="roi__net-total">= net {money(netSavings)}</span>
              {roiX && <span className="amber">≈ {roiX.toFixed(1)}× first-year</span>}
            </div>
          )}

          <p className="roi__value-desc">
            Automating <em>{stack || 'this process'}</em> with{' '}
            <strong>{enabledAgents.length} {enabledAgents.length === 1 ? 'agent' : 'agents'}</strong> at a{' '}
            <strong>{autoPct}% automation rate</strong> frees <strong>{fmtNum(timeSavedHours)} hours</strong> of
            capacity a year — time your team can redirect to higher-value work.
          </p>
          <div className="roi__stats">
            <div className="roi__stat">
              <span className="roi__stat-v">{fmtNum(timeSavedHours)} hrs</span>
              <span className="roi__stat-k mono">Time saved annually</span>
            </div>
            <div className="roi__stat">
              <span className="roi__stat-v">{enabledAgents.length}</span>
              <span className="roi__stat-k mono">Active agents</span>
            </div>
          </div>
        </div>

        {/* ============ CHART ============ */}
        <div className={`roi__panel roi__chart${ready ? '' : ' is-dim'}`}>
          <p className="roi__panel-label mono">Time per process</p>
          <div className="roi__bars">
            <div className="roi__bar-row">
              <span className="roi__bar-label mono">Before</span>
              <span className="roi__bar-track">
                <span className="roi__bar roi__bar--manual" style={{ width: `${manualW}%` }} />
              </span>
              <span className="roi__bar-val mono">{ready ? minLabel(manualMinPerExec) : '—'}</span>
            </div>
            <div className="roi__bar-row">
              <span className="roi__bar-label mono">With AI</span>
              <span className="roi__bar-track">
                <span className="roi__bar roi__bar--auto" style={{ width: `${autoW}%` }} />
              </span>
              <span className="roi__bar-val mono amber">{ready ? minLabel(autoMinPerExec) : '—'}</span>
            </div>
          </div>
          <div className="roi__legend mono">
            <span className="roi__legend-item"><i className="roi__swatch roi__swatch--manual" />Manual process</span>
            <span className="roi__legend-item"><i className="roi__swatch roi__swatch--auto" />After {autoPct}% automation</span>
          </div>
        </div>

        {/* ============ BREAKDOWN ============ */}
        <div className="roi__panel roi__breakdown">
          <div className="roi__panel-head">
            <p className="roi__panel-label mono">Agent breakdown</p>
            <span className="roi__chip mono">{enabledAgents.length} enabled</span>
          </div>
          <div className="roi__table-wrap">
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
                {!ready ? (
                  <tr>
                    <td colSpan={5} className="roi__table-empty mono">
                      {step2Done ? 'Select agents in step 3 to compute savings.' : 'Complete steps 1 & 2 to see the agent breakdown.'}
                    </td>
                  </tr>
                ) : (
                  enabledAgents.map((a, i) => {
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
                  })
                )}
              </tbody>
            </table>
          </div>
          <p className="roi__note">
            Estimate. Uses a <strong>{money(fteCost)}</strong> annual FTE cost, {FTE_HOURS.toLocaleString('en-US')} working
            hours/year, and a <strong>{autoPct}%</strong> automation rate. Figures reflect capacity freed, before
            change-management effort — see <a href="#how-calculated">how this is calculated</a>.
          </p>
        </div>
        </div>{/* /roi__results */}
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
