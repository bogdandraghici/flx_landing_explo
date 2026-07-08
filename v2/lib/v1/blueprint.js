/*
 * FlowX blueprint compiler (mocked).
 * Classifies a free-text use case into a domain template, then renders:
 *  - meta chips
 *  - an animated SVG architecture diagram (lanes → nodes → drawn edges → pulses)
 *  - a typed blueprint.yaml spec sheet
 */

const CONTROLS_BASE = (policy, hitl) => [
  { l: 'Policy Engine', s: policy },
  { l: 'Human Review', s: hitl },
  { l: 'Audit Log', s: 'immutable · hash-chained · 7y' },
];

const TEMPLATES = [
  {
    id: 'kyc',
    match: /kyc|onboard|account opening|identity|customer due|cdd|know your/i,
    title: 'Retail KYC Onboarding',
    slug: 'retail-kyc-onboarding',
    tagline: 'Document-to-decision onboarding with straight-through KYC — human review only where risk demands it.',
    confidence: 0.94,
    eta: '6–8 wks',
    intake: [
      { l: 'Web & Mobile Forms', s: 'channel' },
      { l: 'Document Upload', s: 'channel · ocr-ready' },
      { l: 'Branch / Partner API', s: 'channel' },
    ],
    agents: [
      { l: 'Document Intelligence', s: 'ocr · classify · extract' },
      { l: 'Identity & Screening', s: 'pep · sanctions · adverse media' },
      { l: 'Risk Decision', s: 'policy-scored approval' },
    ],
    controls: CONTROLS_BASE('GDPR · AML5 in execution path', 'queue on risk > 0.72'),
    systems: [
      { l: 'Core Banking', s: 'write' },
      { l: 'CRM', s: 'write' },
      { l: 'Case Management', s: 'write' },
    ],
    integrations: ['core-banking', 'crm', 'case-mgmt', 'sanctions-api'],
    guardrails: ['pii.redaction: enforced', 'data.residency: eu-central', 'hitl.threshold: risk > 0.72', 'audit.retention: 7y'],
  },
  {
    id: 'claims',
    match: /claim|insur|fnol|adjudicat|damage|motor|policyholder|property loss/i,
    title: 'Claims Triage & Adjudication',
    slug: 'claims-triage-adjudication',
    tagline: 'First notice of loss to settlement decision — evidence extracted, fraud-scored, and routed in minutes.',
    confidence: 0.92,
    eta: '7–9 wks',
    intake: [
      { l: 'FNOL Portal & App', s: 'channel' },
      { l: 'Email & Attachments', s: 'channel · unstructured' },
      { l: 'Call Centre Notes', s: 'channel' },
    ],
    agents: [
      { l: 'Evidence Extraction', s: 'photos · reports · invoices' },
      { l: 'Coverage & Fraud Check', s: 'policy match · anomaly score' },
      { l: 'Settlement Decision', s: 'reserve calc · fast-track' },
    ],
    controls: CONTROLS_BASE('IDD · Solvency II in-path', 'queue on payout > €15k'),
    systems: [
      { l: 'Claims Core', s: 'write' },
      { l: 'Payments', s: 'write' },
      { l: 'Reinsurance Feed', s: 'notify' },
    ],
    integrations: ['claims-core', 'payments', 'reinsurance', 'fraud-db'],
    guardrails: ['pii.redaction: enforced', 'payout.ceiling: €15k auto', 'hitl.threshold: fraud > 0.6', 'audit.retention: 7y'],
  },
  {
    id: 'lending',
    match: /loan|lend|credit|mortgag|underwrit|sme|origination|financ/i,
    title: 'SME Credit Origination',
    slug: 'sme-credit-origination',
    tagline: 'Application to sanctioned offer in under 24 hours — with every decline explainable to the regulator.',
    confidence: 0.91,
    eta: '8–10 wks',
    intake: [
      { l: 'Application Portal', s: 'channel' },
      { l: 'Financial Statements', s: 'channel · pdf/xbrl' },
      { l: 'Open Banking Feed', s: 'channel · psd2' },
    ],
    agents: [
      { l: 'Financial Spreading', s: 'statements → ratios' },
      { l: 'Credit Assessment', s: 'scorecards · covenant check' },
      { l: 'Offer Composition', s: 'pricing · terms · limits' },
    ],
    controls: CONTROLS_BASE('Basel III · EBA GL in-path', 'queue on exposure > €250k'),
    systems: [
      { l: 'Loan Origination', s: 'write' },
      { l: 'Credit Bureau', s: 'read/write' },
      { l: 'Core Banking', s: 'write' },
    ],
    integrations: ['los', 'credit-bureau', 'core-banking', 'open-banking'],
    guardrails: ['explainability: adverse-action ready', 'exposure.ceiling: €250k auto', 'hitl.threshold: score band B–', 'audit.retention: 10y'],
  },
  {
    id: 'aml',
    match: /fraud|aml|transaction monitor|launder|sanction|suspicious|screening/i,
    title: 'Transaction Monitoring & AML',
    slug: 'transaction-monitoring-aml',
    tagline: 'Alert triage that clears the noise — investigators see the 4% of alerts that matter, with the narrative pre-written.',
    confidence: 0.93,
    eta: '6–8 wks',
    intake: [
      { l: 'Payment Streams', s: 'channel · real-time' },
      { l: 'Legacy TM Alerts', s: 'channel · batch' },
      { l: 'Watchlist Updates', s: 'channel' },
    ],
    agents: [
      { l: 'Alert Enrichment', s: 'kyc · history · network' },
      { l: 'Risk Narration', s: 'typology match · SAR draft' },
      { l: 'Disposition', s: 'close · escalate · file' },
    ],
    controls: CONTROLS_BASE('FATF · AMLD6 in-path', 'all SAR filings human-signed'),
    systems: [
      { l: 'Case Management', s: 'write' },
      { l: 'goAML / FIU', s: 'file' },
      { l: 'Core Banking', s: 'read' },
    ],
    integrations: ['tm-system', 'case-mgmt', 'goaml', 'watchlists'],
    guardrails: ['sar.filing: human-signed always', 'tipping-off: comms firewall', 'model.drift: weekly challenger', 'audit.retention: 10y'],
  },
  {
    id: 'support',
    match: /support|service|complaint|dispute|contact|resolution|customer request|inquiry|ticket/i,
    title: 'Regulated Customer Resolution',
    slug: 'regulated-customer-resolution',
    tagline: 'Complaints and disputes resolved inside SLA — with the paper trail your ombudsman expects.',
    confidence: 0.9,
    eta: '5–7 wks',
    intake: [
      { l: 'Omnichannel Inbox', s: 'channel · email/chat/voice' },
      { l: 'Regulator Referrals', s: 'channel · priority' },
      { l: 'Branch Escalations', s: 'channel' },
    ],
    agents: [
      { l: 'Case Understanding', s: 'intent · severity · product' },
      { l: 'Resolution Drafting', s: 'remediation · goodwill calc' },
      { l: 'Response & Close', s: 'sla-tracked · tone-checked' },
    ],
    controls: CONTROLS_BASE('DISP / consumer duty in-path', 'queue on redress > €500'),
    systems: [
      { l: 'CRM', s: 'write' },
      { l: 'Complaints Register', s: 'write' },
      { l: 'Payments', s: 'write · redress' },
    ],
    integrations: ['crm', 'complaints-register', 'payments'],
    guardrails: ['tone.policy: enforced', 'redress.ceiling: €500 auto', 'sla.breach: auto-escalate', 'audit.retention: 7y'],
  },
  {
    id: 'ops',
    match: /.*/,
    title: 'Back-Office Operations',
    slug: 'back-office-operations',
    tagline: 'The unglamorous work that eats your middle office — triaged, executed and escalated by governed agents.',
    confidence: 0.86,
    eta: '6–9 wks',
    intake: [
      { l: 'Shared Mailboxes', s: 'channel · unstructured' },
      { l: 'Document Queues', s: 'channel' },
      { l: 'Internal Requests', s: 'channel · api' },
    ],
    agents: [
      { l: 'Intake Triage', s: 'classify · prioritise · route' },
      { l: 'Process Execution', s: 'multi-system orchestration' },
      { l: 'Decision & Escalation', s: 'policy-scored outcomes' },
    ],
    controls: CONTROLS_BASE('your policy set, compiled', 'queue on confidence < 0.8'),
    systems: [
      { l: 'ERP / Core', s: 'write' },
      { l: 'Document Store', s: 'write' },
      { l: 'Workflow Engine', s: 'write' },
    ],
    integrations: ['erp', 'dms', 'workflow', 'idp'],
    guardrails: ['pii.redaction: enforced', 'data.residency: your region', 'hitl.threshold: conf < 0.8', 'audit.retention: 7y'],
  },
];

export function classify(input) {
  return TEMPLATES.find((t) => t.match.test(input)) || TEMPLATES[TEMPLATES.length - 1];
}

/* ---------------- SVG diagram ---------------- *
 * "Pulse" telemetry style (ported from the Architecture Diagram Explorations
 * "4a Pulse"): four lanes of glass cards on a 1455×650 canvas, thin connectors
 * with amber pulses riding the solid wires, dashed review/logging edges, an
 * ambient amber glow behind the agents lane, and breathing status dots on the
 * live nodes (the decision agent and human review). Rendered in SVG so it
 * scales responsively with the panel; the viewBox reuses the exploration's
 * exact coordinates.
 */

const NS = 'http://www.w3.org/2000/svg';
const VIEW_W = 1455;
const VIEW_H = 650;
const COL_X = [55, 413, 771, 1129]; // card left edge per lane
const ROW_TOP = [140, 308, 476]; // card top edge per row
const CARD_W = 270;
const CARD_H = 118;
const LANE_LABELS = ['01 — INTAKE', '02 — FLOWX AGENTS', '03 — CONTROLS', '04 — SYSTEMS OF RECORD'];
const CODE_PREFIX = ['IN', 'AG', 'CT', 'SR'];

// anchor helpers on the lattice
const cyOf = (ri) => ROW_TOP[ri] + CARD_H / 2; // 199 / 367 / 535
const cxOf = (li) => COL_X[li] + CARD_W / 2;
const rightOf = (li) => COL_X[li] + CARD_W;
const leftOf = (li) => COL_X[li];

function el(name, attrs = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

// horizontal transition between lanes: a symmetric bezier bowing at the mid-x
// (degenerates to a straight line when the two rows are level)
function hEdge(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}
// vertical drop down a lane, from one card's bottom to the next card's top
function vEdge(li, r1, r2) {
  return `M ${cxOf(li)} ${cyOf(r1) + CARD_H / 2} L ${cxOf(li)} ${cyOf(r2) - CARD_H / 2}`;
}

export function renderDiagram(container, t, { reduceMotion }) {
  container.innerHTML = '';
  const svg = el('svg', { viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, role: 'presentation' });

  // gradient defs: glass card fill + the ambient amber glow
  const defs = el('defs');
  // stop colours are set from theme tokens via CSS classes (see style.css) so
  // the compiled diagram's glass fill + amber glow flip with the theme
  const cardFill = el('linearGradient', { id: 'bpCardFill', x1: 0, y1: 0, x2: 0, y2: 1 });
  cardFill.appendChild(el('stop', { offset: '0', class: 'bp-cardfill-0' }));
  cardFill.appendChild(el('stop', { offset: '1', class: 'bp-cardfill-1' }));
  const glow = el('radialGradient', { id: 'bpGlow', cx: '0.5', cy: '0.5', r: '0.5' });
  glow.appendChild(el('stop', { offset: '0', class: 'bp-glow-0' }));
  glow.appendChild(el('stop', { offset: '1', class: 'bp-glow-1' }));
  defs.appendChild(cardFill);
  defs.appendChild(glow);
  svg.appendChild(defs);

  // ambient glow behind the agents lane
  svg.appendChild(el('ellipse', {
    class: 'bp-glow', cx: cxOf(1), cy: 380, rx: 235, ry: 250, fill: 'url(#bpGlow)',
  }));

  // paint order: edges + pulses sit behind the cards, cards on top
  const edgesG = el('g');
  const pulsesG = el('g');
  const cardsG = el('g');
  svg.appendChild(edgesG);
  svg.appendChild(pulsesG);
  svg.appendChild(cardsG);

  // lane labels
  LANE_LABELS.forEach((label, li) => {
    const txt = el('text', { x: COL_X[li], y: 96, class: 'bp-lane' });
    txt.textContent = label;
    cardsG.appendChild(txt);
  });

  // ---------- connectors (4a topology, structural) ----------
  // solid decision path — carries pulses; ordered to match the exploration's
  // per-wire cadence [d, dur, begin]
  const solid = [
    [hEdge(rightOf(0), cyOf(0), leftOf(1), cyOf(0)), 4.5, -0.5], // intake 1 → agent 1
    [hEdge(rightOf(0), cyOf(1), leftOf(1), cyOf(0)), 4.5, -2.0], // intake 2 → agent 1
    [hEdge(rightOf(0), cyOf(2), leftOf(1), cyOf(0)), 4.5, -3.5], // intake 3 → agent 1
    [vEdge(1, 0, 1), 3.0, -1.0],                                 // agent 1 → agent 2
    [vEdge(1, 1, 2), 3.0, -2.4],                                 // agent 2 → agent 3
    [hEdge(rightOf(1), cyOf(1), leftOf(2), cyOf(0)), 4.0, -0.8], // agent 2 → policy
    [hEdge(rightOf(2), cyOf(0), leftOf(3), cyOf(0)), 3.5, -1.2], // policy → system 1
    [hEdge(rightOf(2), cyOf(0), leftOf(3), cyOf(1)), 3.5, -2.9], // policy → system 2
    [hEdge(rightOf(2), cyOf(2), leftOf(3), cyOf(2)), 3.5, -0.1], // audit → system 3
  ];
  // dashed review / logging edges — no pulses
  const soft = [
    hEdge(rightOf(1), cyOf(2), leftOf(2), cyOf(1)), // decision agent → human review
    hEdge(rightOf(1), cyOf(2), leftOf(2), cyOf(2)), // decision agent → audit log
  ];

  const solidPaths = solid.map(([d]) => {
    const p = el('path', { d, class: 'bp-edge' });
    edgesG.appendChild(p);
    return p;
  });
  const softPaths = soft.map((d) => {
    const p = el('path', { d, class: 'bp-edge bp-edge--soft' });
    edgesG.appendChild(p);
    return p;
  });

  // ---------- glass telemetry cards ----------
  const laneData = [t.intake, t.agents, t.controls, t.systems];
  const cards = [];
  laneData.forEach((items, li) => {
    items.forEach((item, ri) => {
      const x = COL_X[li];
      const y = ROW_TOP[ri];
      // "live" nodes: the decision/escalation agent (full amber card) and human
      // review (breathing dot + amber telemetry only)
      const accentFull = li === 1 && ri === 2;
      const accentDot = li === 2 && ri === 1;
      const live = accentFull || accentDot;

      const g = el('g', { class: `bp-card${accentFull ? ' bp-card--live' : ''}` });
      g.appendChild(el('rect', { x, y, width: CARD_W, height: CARD_H, rx: 14, fill: 'url(#bpCardFill)', class: 'bp-card__box' }));
      g.appendChild(el('line', { x1: x + 14, y1: y + 1, x2: x + CARD_W - 14, y2: y + 1, class: 'bp-card__hi' }));

      const code = el('text', { x: x + 18, y: y + 27, class: `bp-code${accentFull ? ' bp-code--live' : ''}` });
      code.textContent = `${CODE_PREFIX[li]}·0${ri + 1}`;
      g.appendChild(code);

      g.appendChild(el('circle', {
        cx: x + CARD_W - 20, cy: y + 22, r: 2.6, class: live ? 'bp-dot bp-dot--live' : 'bp-dot',
      }));

      const title = el('text', { x: x + 18, y: y + 58, class: `bp-title${accentFull ? ' bp-title--live' : ''}` });
      title.textContent = item.l;
      g.appendChild(title);

      const sub = el('text', { x: x + 18, y: y + 85, class: `bp-sub${live ? ' bp-sub--live' : ''}` });
      sub.textContent = item.s;
      g.appendChild(sub);

      cardsG.appendChild(g);
      cards.push(g);
    });
  });

  container.appendChild(svg);

  // ---------- entrance choreography ----------
  let pulseTimer = 0;
  if (reduceMotion) {
    cards.forEach((c) => c.classList.add('in'));
    softPaths.forEach((p) => p.classList.add('in'));
    return () => {};
  }

  // draw the solid wires in, staggered
  solidPaths.forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    p.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${240 + i * 60}ms`;
  });
  requestAnimationFrame(() => {
    // cards reveal left-to-right, column by column
    cards.forEach((c, i) => {
      c.style.transitionDelay = `${i * 45}ms`;
      c.classList.add('in');
    });
    requestAnimationFrame(() => {
      solidPaths.forEach((p) => (p.style.strokeDashoffset = '0'));
      softPaths.forEach((p) => p.classList.add('in'));
    });
  });

  // ---------- amber pulses ride the solid wires ----------
  // added once the wires have drawn in, so nothing travels an undrawn edge
  pulseTimer = setTimeout(() => {
    solid.forEach(([d, dur, begin]) => {
      const c = el('circle', { r: 2, class: 'bp-pulse', opacity: 0 });
      c.appendChild(el('animateMotion', { path: d, dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite' }));
      c.appendChild(el('animate', {
        attributeName: 'opacity', values: '0;0.9;0.9;0', keyTimes: '0;0.12;0.82;1',
        dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite',
      }));
      pulsesG.appendChild(c);
    });
  }, 1250);

  return () => clearTimeout(pulseTimer);
}

/* ---------------- spec sheet ---------------- */

export function specText(t, input) {
  const trimmed = input.length > 46 ? input.slice(0, 46).trimEnd() + '…' : input;
  return [
    `# compiled from: "${trimmed}"`,
    `blueprint: ${t.slug}`,
    `pattern_confidence: ${t.confidence.toFixed(2)}`,
    `agents:`,
    ...t.agents.map((a) => `  - ${a.l.toLowerCase().replace(/[^a-z0-9]+/g, '-')}   # ${a.s}`),
    `model_routing:`,
    `  primary: claude-fable-5`,
    `  fallback: [private-llm, rules-engine]`,
    `guardrails:`,
    ...t.guardrails.map((g) => `  - ${g}`),
    `integrations: [${t.integrations.join(', ')}]`,
    `deploy: on-prem / private-vpc`,
    `estimate: ${t.eta.replace('wks', 'weeks')} to production`,
  ].join('\n');
}

export function typeSpec(preEl, statusEl, text, { reduceMotion }, done) {
  let cancelled = false;
  if (reduceMotion) {
    preEl.textContent = text;
    statusEl.textContent = 'signed · sha256:9f2c…b41a';
    if (done) done();
    return () => {};
  }
  preEl.textContent = '';
  statusEl.textContent = 'writing…';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  preEl.appendChild(cursor);
  let i = 0;
  const timer = setInterval(() => {
    if (cancelled) return;
    i = Math.min(i + 3, text.length);
    preEl.textContent = '';
    preEl.append(text.slice(0, i), cursor);
    if (i >= text.length) {
      clearInterval(timer);
      cursor.remove();
      statusEl.textContent = 'signed · sha256:9f2c…b41a';
      if (done) done();
    }
  }, 14);
  return () => {
    cancelled = true;
    clearInterval(timer);
  };
}
