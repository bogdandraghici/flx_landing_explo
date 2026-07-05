import { $, reduceMotion, initChrome } from './shared.js';
import { createOrderField, createStaticField } from './orderField.js';
import { classify, renderDiagram, specText, typeSpec } from './blueprint.js';

initChrome();

/* ================= hero field ================= */
/* The hero background is the "order field" animation (the only mode). */
const canvas = $('#field');
if (canvas) createOrderField(canvas);

/* ================= cta static grid ================= */
const ctaCanvas = $('.cta__canvas');
if (ctaCanvas) createStaticField(ctaCanvas);

/* ================= terminal ================= */
const term = $('#term');
const form = $('#termForm');
const input = $('#termInput');
const log = $('#termLog');

/* size the input to its text so the block caret trails the end, like a real terminal */
const inputGhost = document.createElement('span');
inputGhost.setAttribute('aria-hidden', 'true');
inputGhost.style.cssText =
  'position:absolute;left:-9999px;top:0;white-space:pre;visibility:hidden;pointer-events:none';
document.body.appendChild(inputGhost);
function sizeInput() {
  const cs = getComputedStyle(input);
  inputGhost.style.fontFamily = cs.fontFamily;
  inputGhost.style.fontSize = cs.fontSize;
  inputGhost.style.fontWeight = cs.fontWeight;
  inputGhost.style.letterSpacing = cs.letterSpacing;
  inputGhost.textContent = input.value || input.placeholder || '';
  const textW = Math.ceil(inputGhost.getBoundingClientRect().width) + 1;
  // never exceed the space left in the field (minus the trailing caret), so a
  // long placeholder can't push the caret off-screen or widen the layout
  const field = input.closest('.term__field');
  const caret = field ? field.querySelector('.term__caret') : null;
  const avail = field ? field.clientWidth - (caret ? caret.offsetWidth : 0) - 4 : textW;
  input.style.width = Math.max(1, Math.min(textW, avail)) + 'px';
}

const PLACEHOLDERS = [
  'automate commercial onboarding for business clients',
  'underwrite retail mortgages in days, not weeks',
  'triage motor insurance claims end to end',
  'quote commercial policies in minutes',
  'reconcile supplier invoices automatically',
  'track and trace shipments across carriers',
  'cut churn with in-flow retention offers',
];

let phTimer = 0;
function cyclePlaceholder() {
  if (reduceMotion) {
    input.placeholder = PLACEHOLDERS[0];
    sizeInput();
    return;
  }
  let pi = 0, ci = 0, deleting = false;
  const tick = () => {
    const full = PLACEHOLDERS[pi];
    if (!deleting) {
      ci++;
      if (ci >= full.length) {
        deleting = true;
        phTimer = setTimeout(tick, 2100);
        input.placeholder = full;
        sizeInput();
        return;
      }
    } else {
      ci -= 3;
      if (ci <= 0) {
        ci = 0;
        deleting = false;
        pi = (pi + 1) % PLACEHOLDERS.length;
      }
    }
    input.placeholder = full.slice(0, ci);
    sizeInput();
    phTimer = setTimeout(tick, deleting ? 22 : 38 + Math.random() * 40);
  };
  tick();
}
sizeInput();
cyclePlaceholder();

input.addEventListener('input', () => {
  term.classList.toggle('has-text', input.value.trim().length > 0);
  sizeInput();
});

/* the whole terminal reads as one field — clicking anywhere in it focuses the
   input (the input is only as wide as its text, so most of the strip is dead
   space otherwise). don't steal focus when the click was on the compile button
   or a text selection. */
term.addEventListener('mousedown', (e) => {
  if (input.disabled || e.target.closest('button') || e.target === input) return;
  if (window.getSelection && String(window.getSelection())) return;
  e.preventDefault();
  input.focus({ preventScroll: true });
});

/* focused on load so you can start typing immediately (desktop only — avoid
   popping the mobile keyboard; preventScroll keeps the hero in place). */
if (matchMedia('(pointer: fine)').matches) {
  input.focus({ preventScroll: true });
}

document.querySelectorAll('.hint').forEach((btn) => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.hint;
    term.classList.add('has-text');
    sizeInput();
    input.focus();
    form.requestSubmit();
  });
});

function logLine(msg, time, delay) {
  const ln = document.createElement('div');
  ln.className = 'ln';
  ln.style.animationDelay = `${delay}ms`;
  ln.innerHTML = `<span><span class="ok">✓</span>${msg}</span><span class="t">${time}</span>`;
  log.appendChild(ln);
}

/* ================= blueprint generation ================= */
const bp = $('#bp');
const bpSection = $('#bpSection');
const bpMeta = $('#bpMeta');
const bpDiagram = $('#bpDiagram');
const bpSpec = $('#bpSpec');
const bpSpecStatus = $('#bpSpecStatus');
const bpTitle = $('#bpTitle');
const bpTagline = $('#bpTagline');

let stopPulses = null;
let stopTyping = null;
let compiling = false;

/* while the terminal grows with each compile log line, ease the viewport down so
   its bottom edge stays in view — the final reveal then scrolls on to the section */
function followTermBottom() {
  const margin = 28; // breathing room kept below the terminal
  const overflow = term.getBoundingClientRect().bottom + margin - window.innerHeight;
  if (overflow > 1) window.scrollBy({ top: overflow, behavior: 'smooth' });
}

function compile(rawInput) {
  if (compiling) return;
  compiling = true;
  const t = classify(rawInput);

  input.disabled = true;
  log.innerHTML = '';
  const steps = reduceMotion
    ? [0, 0, 0, 0]
    : [80, 560, 1060, 1560];
  // append each line as its step fires so the terminal grows a line at a time;
  // after each growth, nudge the viewport so its bottom edge stays in view
  const emit = (fn) => {
    fn();
    if (!reduceMotion) followTermBottom();
  };
  setTimeout(() => emit(() => logLine('intent parsed', '128ms', 0)), steps[0]);
  setTimeout(() => emit(() => logLine(`matched pattern — ${t.slug}`, '412ms', 0)), steps[1]);
  setTimeout(() => emit(() => logLine('agents + guardrails composed', '590ms', 0)), steps[2]);
  setTimeout(() => emit(() => {
    const ln = document.createElement('div');
    ln.className = 'ln';
    ln.innerHTML = `<span><span class="ok">▸</span>rendering blueprint ↓</span><span class="t"></span>`;
    log.appendChild(ln);
  }), steps[3]);

  setTimeout(() => {
    // header
    bpTitle.innerHTML = `${t.title}<span class="amber">.</span>`;
    bpTagline.textContent = t.tagline;

    // meta chips
    bpMeta.innerHTML = '';
    const chips = [
      [`${t.agents.length}`, 'agents'],
      [`${t.integrations.length}`, 'integrations'],
      [`${t.guardrails.length + 2}`, 'guardrails'],
      [t.eta, 'to production'],
      [`${Math.round(t.confidence * 100)}%`, 'pattern confidence'],
    ];
    chips.forEach(([b, label], i) => {
      const c = document.createElement('span');
      c.className = 'chip';
      c.style.setProperty('--i', i);
      c.innerHTML = `<b>${b}</b>${label}`;
      bpMeta.appendChild(c);
    });

    // reveal the compiled blueprint section (sits right below the hero; the
    // section stays hidden — no layout gap — until the first compile)
    bpSection.hidden = false;

    // diagram + spec
    if (stopPulses) stopPulses();
    if (stopTyping) stopTyping();
    stopPulses = renderDiagram(bpDiagram, t, { reduceMotion });
    stopTyping = typeSpec(bpSpec, bpSpecStatus, specText(t, rawInput), { reduceMotion });

    // scroll to the compiled result itself, not the section's marketing header above it
    bp.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    });

    input.disabled = false;
    compiling = false;
  }, reduceMotion ? 60 : 2150);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = input.value.trim();
  if (!v || compiling) return;
  clearTimeout(phTimer);
  compile(v);
});

$('#bpAgain').addEventListener('click', () => {
  input.value = '';
  sizeInput();
  term.classList.remove('has-text');
  log.innerHTML = '';
  document.getElementById('hero').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  setTimeout(() => input.focus({ preventScroll: true }), reduceMotion ? 0 : 650);
});

/* ================= audit ticker ================= */
const auditRows = $('#auditRows');
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
let auditClock = 41 * 60 + 7; // 11:41:07, seconds precision drives realism
let auditTimer = 0;

function auditStamp() {
  auditClock += 1 + Math.floor(Math.random() * 4);
  const m = Math.floor(auditClock / 60) % 60;
  const s = auditClock % 60;
  return `11:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function pushAuditRow() {
  const [agent, action, st] = AUDIT_POOL[Math.floor(Math.random() * AUDIT_POOL.length)];
  const r = document.createElement('div');
  r.className = 'r new';
  r.innerHTML = `<span>${auditStamp()}</span><span>${agent}</span><span>${action}</span><span class="st${st === 'ok' ? ' info' : ''}">${st}</span>`;
  auditRows.prepend(r);
  while (auditRows.children.length > 7) auditRows.lastChild.remove();
}
for (let i = 0; i < 6; i++) pushAuditRow();

if (!reduceMotion && auditRows) {
  const auditIO = new IntersectionObserver(([e]) => {
    clearInterval(auditTimer);
    if (e.isIntersecting) auditTimer = setInterval(pushAuditRow, 1900);
  });
  auditIO.observe(auditRows);
}

/* ================= model router rotation ================= */
const models = document.querySelectorAll('.router__model');
if (models.length && !reduceMotion) {
  let active = 0;
  models[0].classList.add('active');
  setInterval(() => {
    models[active].classList.remove('active');
    active = (active + 1) % models.length;
    models[active].classList.add('active');
  }, 2400);
} else if (models.length) {
  models[0].classList.add('active');
}

/* ================= stat count-ups ================= */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec, 10);
  if (reduceMotion) {
    el.textContent = target.toFixed(dec);
    return;
  }
  const dur = 1400;
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = (target * eased).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        countUp(e.target);
        statIO.unobserve(e.target);
      }
    }
  },
  { threshold: 0.6 }
);
document.querySelectorAll('.stats__num').forEach((n) => statIO.observe(n));
