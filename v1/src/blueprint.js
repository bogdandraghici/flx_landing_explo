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

/* ---------------- SVG diagram ---------------- */

const NS = 'http://www.w3.org/2000/svg';
const LANES = [
  { key: 'intake', label: '01 — INTAKE', x: 34, w: 190 },
  { key: 'agents', label: '02 — FLOWX AGENTS', x: 330, w: 224 },
  { key: 'controls', label: '03 — CONTROLS', x: 660, w: 214 },
  { key: 'systems', label: '04 — SYSTEMS OF RECORD', x: 964, w: 174 },
];
const ROW_Y = [158, 296, 434];
const NODE_H = { intake: 58, agents: 70, controls: 62, systems: 58 };

function el(name, attrs = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function hEdge(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export function renderDiagram(container, t, { reduceMotion }) {
  container.innerHTML = '';
  const svg = el('svg', { viewBox: '0 0 1172 520', role: 'presentation' });

  // lane labels
  for (const lane of LANES) {
    const label = el('text', { x: lane.x, y: 52, class: 'bp-lane' });
    label.textContent = lane.label;
    svg.appendChild(label);
  }

  const edgesG = el('g');
  const nodesG = el('g');
  svg.appendChild(edgesG);
  svg.appendChild(nodesG);

  const nodeMeta = []; // for edge anchor lookup
  const laneData = [t.intake, t.agents, t.controls, t.systems];
  const laneClass = ['', 'bp-node--agent', 'bp-node--ctrl', ''];

  laneData.forEach((items, li) => {
    const lane = LANES[li];
    const h = NODE_H[lane.key];
    items.forEach((item, ri) => {
      const cy = ROW_Y[ri];
      const g = el('g', { class: `bp-node ${laneClass[li]}`.trim() });
      g.appendChild(el('rect', { x: lane.x, y: cy - h / 2, width: lane.w, height: h, rx: 10 }));
      const l1 = el('text', { x: lane.x + 16, y: cy - 3, class: 'l1' });
      l1.textContent = item.l;
      const l2 = el('text', { x: lane.x + 16, y: cy + 17, class: 'l2' });
      l2.textContent = item.s;
      g.appendChild(l1);
      g.appendChild(l2);
      nodesG.appendChild(g);
      nodeMeta.push({ li, ri, g, left: lane.x, right: lane.x + lane.w, cx: lane.x + lane.w / 2, cy, h });
    });
  });

  const at = (li, ri) => nodeMeta.find((n) => n.li === li && n.ri === ri);

  // solid decision path + dashed logging edges
  const solid = [];
  const A = (li, ri) => at(li, ri);
  // intake → first agent
  for (let r = 0; r < 3; r++) solid.push(hEdge(A(0, r).right, A(0, r).cy, A(1, 0).left, A(1, 0).cy));
  // agent chain (vertical)
  for (let r = 0; r < 2; r++) {
    const a = A(1, r), b = A(1, r + 1);
    solid.push(`M ${a.cx} ${a.cy + a.h / 2} L ${b.cx} ${b.cy - b.h / 2}`);
  }
  // last agent → policy engine + human review
  solid.push(hEdge(A(1, 2).right, A(1, 2).cy, A(2, 0).left, A(2, 0).cy));
  solid.push(hEdge(A(1, 2).right, A(1, 2).cy, A(2, 1).left, A(2, 1).cy));
  // policy engine → systems
  for (let r = 0; r < 3; r++) solid.push(hEdge(A(2, 0).right, A(2, 0).cy, A(3, r).left, A(3, r).cy));

  const soft = [];
  // every agent logs to the audit node
  for (let r = 0; r < 3; r++) soft.push(hEdge(A(1, r).right, A(1, r).cy + 14, A(2, 2).left, A(2, 2).cy));

  const solidPaths = solid.map((d) => {
    const p = el('path', { d, class: 'bp-edge' });
    edgesG.appendChild(p);
    return p;
  });
  soft.forEach((d) => edgesG.appendChild(el('path', { d, class: 'bp-edge bp-edge--soft' })));

  container.appendChild(svg);

  // ---------- entrance choreography ----------
  const nodes = [...nodesG.children];
  if (reduceMotion) {
    nodes.forEach((n) => n.classList.add('in'));
  } else {
    solidPaths.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${240 + i * 70}ms`;
    });
    requestAnimationFrame(() => {
      nodes.forEach((n, i) => {
        n.style.transitionDelay = `${i * 55}ms`;
        n.classList.add('in');
      });
      requestAnimationFrame(() => solidPaths.forEach((p) => (p.style.strokeDashoffset = '0')));
    });
  }

  // ---------- traveling pulses ----------
  let raf = 0;
  if (!reduceMotion) {
    const pulses = Array.from({ length: 4 }, (_, i) => {
      const c = el('circle', { r: 2.6, class: 'bp-pulse', opacity: 0 });
      svg.appendChild(c);
      return { c, path: null, t: Math.random(), speed: 0.0018 + Math.random() * 0.0014, delay: i * 500 };
    });
    const t0 = performance.now();
    const step = (now) => {
      raf = requestAnimationFrame(step);
      for (const p of pulses) {
        if (now - t0 < p.delay + 1400) continue;
        if (!p.path) p.path = solidPaths[Math.floor(Math.random() * solidPaths.length)];
        p.t += p.speed * 16;
        if (p.t >= 1) {
          p.t = 0;
          p.path = solidPaths[Math.floor(Math.random() * solidPaths.length)];
        }
        const len = p.path.getTotalLength();
        const pt = p.path.getPointAtLength(p.t * len);
        p.c.setAttribute('cx', pt.x);
        p.c.setAttribute('cy', pt.y);
        p.c.setAttribute('opacity', String(Math.min(1, Math.sin(p.t * Math.PI) * 1.6) * 0.95));
      }
    };
    raf = requestAnimationFrame(step);
  }

  return () => cancelAnimationFrame(raf);
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
