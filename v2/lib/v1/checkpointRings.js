/*
 * About — Mission "Checkpoint rings" illustration.
 * Sources converge onto one governed line that passes through three circular
 * checkpoints (policy → verify → sign). Each ring pulses as a packet clears it,
 * and packets earn the accent only after the final gate — safe AI as a sequence
 * of checkpoints, not a cage. A dashed "secure base" runs beneath.
 *
 * Ported from the Claude Design exploration "Unlock Explorations"
 * (Turn 05 — 5A "Checkpoint rings"). Replaces the earlier "Policy gate" (1B)
 * take in this same mission slot.
 *
 * Theme-aware: structure is drawn from the page's --ink token, the "safe /
 * validated" side from --dia-bright (a neutral signal — deliberately not the
 * amber accent), the ring cut-outs from --bg, and all are re-read on
 * `themechange` so the instrument flips with the light/dark toggle. Honours
 * prefers-reduced-motion by sitting on a single settled frame instead of
 * animating. The canvas is decorative (aria-hidden); the legible labels are
 * baked into the drawing and the copy above it. Layout is fluid horizontally
 * (the governed line stretches with width) over a fixed vertical rhythm, so on
 * narrow viewports it compresses sideways while labels stay legible.
 */

function parseTriplet(v) {
  const m = (v || '').trim().match(/(\d+)\D+(\d+)\D+(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

const GATE_F = [0.32, 0.54, 0.76]; // checkpoint positions along the line
const GATE_NAMES = ['policy', 'verify', 'sign'];

export function createCheckpointRings(canvas) {
  if (!canvas) return { destroy() {} };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // live palette, read from the page's theme tokens
  let INK = [255, 255, 255];   // structure (the design's flat white)
  let ACC = [233, 236, 242];   // safe AI — post-gate (a neutral signal, not amber)
  let BG = 'rgb(10,11,13)';    // ring cut-out — matches the section behind
  function readPalette() {
    const cs = getComputedStyle(document.documentElement);
    INK = parseTriplet(cs.getPropertyValue('--ink')) || INK;
    ACC = parseTriplet(cs.getPropertyValue('--dia-bright')) || ACC;
    BG = (cs.getPropertyValue('--bg') || '').trim() || BG;
  }
  readPalette();

  // in reduced-motion, sit on a settled frame (packets mid-flow past a gate)
  let t = reduceMotion ? 6 : 0;
  let raf = 0;
  let last = performance.now();

  function rnd(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  function prep() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return null;
    const pw = Math.round(rect.width * dpr), ph = Math.round(rect.height * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: rect.width, h: rect.height };
  }

  function label(ctx, s, x, y, a, accent) {
    ctx.save();
    ctx.font = '10px var(--font-mono), ui-monospace, Menlo, Consolas, monospace';
    try { ctx.letterSpacing = '1.6px'; } catch (e) {}
    const c = accent ? ACC : INK;
    ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    ctx.fillText(String(s).toUpperCase(), x, y);
    ctx.restore();
  }

  function draw() {
    const p = prep();
    if (!p) return;
    const { ctx, w, h } = p;
    const W = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
    const A = a => `rgba(${ACC[0]},${ACC[1]},${ACC[2]},${a})`;

    ctx.clearRect(0, 0, w, h);

    // faint instrument grid
    ctx.fillStyle = W(0.045);
    for (let x = 30; x < w; x += 30) for (let y = 30; y < h; y += 30) ctx.fillRect(x, y, 1, 1);

    const midY = h * 0.5;
    const inX = w * 0.075, outX = w - w * 0.075, joinX = inX + 92;
    const gates = GATE_F.map((f) => inX + (outX - inX) * f);
    const lastGate = gates[gates.length - 1];

    // packet positions along the governed line
    const packs = [];
    for (let i = 0; i < 7; i++) {
      const pr = (t * 0.09 * (0.8 + rnd(i) * 0.5) + rnd(i * 3.1)) % 1;
      packs.push(joinX + (outX - joinX) * pr);
    }

    ctx.lineWidth = 1;

    // input cluster — the many sources converging onto one line
    for (let i = 0; i < 4; i++) {
      const y = midY - 42 + i * 28;
      ctx.strokeStyle = W(0.35); ctx.fillStyle = W(0.04);
      ctx.beginPath(); ctx.arc(inX, y, 3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = W(0.08);
      ctx.beginPath(); ctx.moveTo(inX + 4, y); ctx.bezierCurveTo(inX + 50, y, joinX - 40, midY, joinX, midY); ctx.stroke();
    }

    // main governed line + verified accent past the final gate
    ctx.strokeStyle = W(0.14);
    ctx.beginPath(); ctx.moveTo(joinX, midY); ctx.lineTo(outX - 6, midY); ctx.stroke();
    ctx.strokeStyle = A(0.4);
    ctx.beginPath(); ctx.moveTo(lastGate, midY); ctx.lineTo(outX - 6, midY); ctx.stroke();

    // foundation dashed baseline
    ctx.save(); ctx.setLineDash([2, 7]); ctx.strokeStyle = W(0.08);
    ctx.beginPath(); ctx.moveTo(joinX, midY + 72); ctx.lineTo(outX, midY + 72); ctx.stroke(); ctx.restore();
    label(ctx, 'secure base', joinX, midY + 90, 0.28);

    // gate checkpoint rings — each pulses as a packet clears it
    gates.forEach((xg, i) => {
      const dist = Math.min(...packs.map((pk) => Math.abs(pk - xg)));
      const near = dist < 16;
      ctx.strokeStyle = near ? A(0.9) : W(0.4);
      ctx.fillStyle = BG;
      ctx.beginPath(); ctx.arc(xg, midY, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      if (near) {
        ctx.strokeStyle = A(0.5 - 0.5 * (dist / 16));
        ctx.beginPath(); ctx.arc(xg, midY, 20, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = near ? A(0.95) : W(0.45);
      ctx.beginPath(); ctx.arc(xg, midY, 3, 0, Math.PI * 2); ctx.fill();
      label(ctx, GATE_NAMES[i], xg - 14, midY + 40, 0.4);
    });

    // packets — accent only once past the final gate
    packs.forEach((x) => {
      ctx.fillStyle = x >= lastGate ? A(0.95) : W(0.55);
      ctx.beginPath(); ctx.arc(x, midY, 2, 0, Math.PI * 2); ctx.fill();
    });

    // output node — production, post-inspection
    ctx.strokeStyle = A(0.6); ctx.fillStyle = A(0.08);
    ctx.beginPath(); ctx.arc(outX, midY, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    label(ctx, 'sources', w * 0.05, midY - 60, 0.35);
    label(ctx, 'production', outX - 66, midY - 54, 0.35, true);
    label(ctx, 'checkpoint governance', w * 0.05, h - 26, 0.3);
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    draw();
    raf = requestAnimationFrame(loop);
  }

  const onTheme = () => { readPalette(); if (reduceMotion) draw(); };
  window.addEventListener('themechange', onTheme);

  if (reduceMotion) {
    draw();
  } else {
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('themechange', onTheme);
    },
  };
}
