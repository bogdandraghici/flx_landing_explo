/*
 * Banking hero visual — "agent decision log".
 * A live, upward-scrolling stream of agent decisions across the origination
 * pipeline: timestamp · agent id · stage · latency · verdict. Most rows PASS;
 * a few stand out (FUNDED / ESCALATE) in amber — the resolution signal.
 *
 * Ported from the Claude Design exploration "Banking agents illustrated"
 * (panel 1c, drawC). The design hardcoded a neutral-gray accent on black;
 * here it's re-tokenized to FlowX theme tokens (ink + the single amber accent)
 * so it flips with light/dark, and honours prefers-reduced-motion by painting
 * one resolved frame instead of animating.
 */

// live token colours — mutated in place, refreshed on themechange
let INK = [255, 255, 255];   // --ink triplet (near-white dark / near-black light)
let AMBER = [252, 184, 19];  // --amber-rgb — the one accent
let PANEL = [12, 14, 17];    // container's rendered bg, for the scroll fades

function parseTriplet(str) {
  const n = (str || '').split(',').map((s) => parseInt(s, 10));
  return n.length === 3 && n.every((v) => Number.isFinite(v)) ? n : null;
}
function parseRGB(str) {
  const m = (str || '').match(/(\d+),\s*(\d+),\s*(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

export function createDecisionLog(container) {
  const canvas = container.querySelector('canvas');
  if (!canvas) return { destroy() {} };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ctx;
  try {
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
  } catch {
    canvas.style.display = 'none';
    return { destroy() {} };
  }

  function readTokens() {
    const root = getComputedStyle(document.documentElement);
    INK = parseTriplet(root.getPropertyValue('--ink')) || INK;
    AMBER = parseTriplet(root.getPropertyValue('--amber-rgb')) || AMBER;
    PANEL = parseRGB(getComputedStyle(container).backgroundColor) || PANEL;
  }
  readTokens();

  const wt = (a) => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
  const acc = (a) => `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${a})`;
  const panel = (a) => `rgba(${PANEL[0]},${PANEL[1]},${PANEL[2]},${a})`;

  // deterministic hash → per-row pseudo-random, so the stream is stable
  function hash(n) {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  }
  function mono(size) {
    ctx.font = (size || 10) + 'px ui-monospace, "Geist Mono", Menlo, monospace';
    try { ctx.letterSpacing = '0.08em'; } catch (e) { /* not all engines */ }
  }

  const STAGES = ['INTAKE', 'KYC', 'BUREAU', 'UNDERWRITE', 'DOCS', 'FUND'];
  const ROW_H = 26;

  let cw = 0, ch = 0;
  function prep() {
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return false;
    if (canvas.width !== Math.round(w * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    cw = w; ch = h;
    return true;
  }

  function draw(t) {
    const x = ctx, w = cw, h = ch;
    const pad = 22, top = 76;

    // column layout — compress horizontally on narrow viewports, dropping the
    // most incidental columns first (latency, then agent id) so the core
    // ts · stage · verdict figure always stays legible.
    const showLatency = w >= 420;
    const showAgent = w >= 348;
    const agentX = pad + 106;
    const stageX = showAgent ? pad + 178 : pad + 104;
    const latencyR = w - pad - 84;

    mono(10);
    x.textBaseline = 'middle';

    // header
    x.textAlign = 'left';
    x.fillStyle = wt(0.42);
    x.fillText('AGENT DECISION LOG', pad, 33);
    x.textAlign = 'right';
    x.fillStyle = acc(0.85);
    x.fillText('LIVE', w - pad, 33);
    x.fillStyle = acc(0.9);
    x.beginPath();
    x.arc(w - pad - 42, 33, 2 + Math.max(0, Math.sin(t * 3)) * 0.9, 0, 7);
    x.fill();

    x.strokeStyle = wt(0.10);
    x.lineWidth = 1;
    x.beginPath(); x.moveTo(pad, 58); x.lineTo(w - pad, 58); x.stroke();

    // scrolling body — rows drift upward, clipped to the log window
    const total = t * 20, off = total % ROW_H, base = Math.floor(total / ROW_H);
    x.save();
    x.beginPath();
    x.rect(0, top - 12, w, h - top - 40);
    x.clip();
    const rows = Math.ceil((h - top) / ROW_H) + 2;
    for (let j = base - 1; j < base + rows; j++) {
      const y = top + (j - base) * ROW_H + ROW_H / 2 - off;
      const r = (k) => hash(j * 7.13 + k);
      const sec = Math.floor((j * 1.7) % 60);
      const min = Math.floor((2 + j * 0.028) % 60);
      const ts = '14:' + String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0')
        + '.' + String(Math.floor(r(9) * 999)).padStart(3, '0');
      const special = r(4) > 0.88;
      const verdict = special ? (r(5) > 0.5 ? 'ESCALATE' : 'FUNDED') : 'PASS';

      if (special) {
        x.fillStyle = acc(0.06);
        x.fillRect(pad - 8, y - ROW_H / 2 + 3, w - 2 * pad + 16, ROW_H - 6);
      }
      x.textAlign = 'left';
      x.fillStyle = wt(0.30); x.fillText(ts, pad, y);
      if (showAgent) {
        x.fillStyle = wt(0.55);
        x.fillText('AG-' + String(100 + Math.floor(r(2) * 900)), agentX, y);
      }
      x.fillStyle = wt(0.42); x.fillText(STAGES[j % 6], stageX, y);
      x.textAlign = 'right';
      if (showLatency) {
        x.fillStyle = wt(0.30);
        x.fillText((r(3) * 640 + 38).toFixed(0) + 'MS', latencyR, y);
      }
      x.fillStyle = special ? acc(0.95) : wt(0.40);
      x.fillText(verdict, w - pad, y);
    }
    x.restore();

    // top + bottom scroll fades, matched to the panel background
    let g = x.createLinearGradient(0, top - 12, 0, top + 16);
    g.addColorStop(0, panel(1)); g.addColorStop(1, panel(0));
    x.fillStyle = g; x.fillRect(0, top - 12, w, 28);
    g = x.createLinearGradient(0, h - 76, 0, h - 52);
    g.addColorStop(0, panel(0)); g.addColorStop(1, panel(1));
    x.fillStyle = g; x.fillRect(0, h - 76, w, 24);

    // footer
    x.strokeStyle = wt(0.10);
    x.beginPath(); x.moveTo(pad, h - 48); x.lineTo(w - pad, h - 48); x.stroke();
    mono(10);
    x.textAlign = 'left'; x.fillStyle = wt(0.42);
    x.fillText('STREAM / ORIGINATION', pad, h - 28);
    x.textAlign = 'right';
    x.fillText(String(84210 + base) + ' EVENTS', w - pad, h - 28);
  }

  // ---- run loop / static frame -------------------------------------------
  let raf = 0, running = false, t = 0, last = 0, io = null;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    t += dt;
    if (prep()) draw(t);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function paintStatic() {
    // one composed, populated frame (a couple of amber rows in view)
    if (prep()) draw(7.3);
  }

  if (reduceMotion) {
    paintStatic();
  } else {
    // only animate while the hero is on screen
    io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) start(); else stop();
    });
    io.observe(container);
  }

  function onResize() { if (reduceMotion || !running) paintStatic(); }
  window.addEventListener('resize', onResize);

  function onVis() {
    if (reduceMotion) return;
    if (document.hidden) stop();
    else if (isOnScreen()) start();
  }
  function isOnScreen() {
    const b = container.getBoundingClientRect();
    return b.bottom > 0 && b.top < innerHeight;
  }
  document.addEventListener('visibilitychange', onVis);

  function onTheme() {
    readTokens();
    if (reduceMotion || !running) paintStatic();
  }
  window.addEventListener('themechange', onTheme);

  return {
    destroy() {
      stop();
      if (io) io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('themechange', onTheme);
    },
  };
}
