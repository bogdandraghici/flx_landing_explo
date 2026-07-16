/*
 * About — Mission "Policy gate" illustration.
 * Many creators on the left, production on the right, one policy gate between.
 * Packets earn the accent only after passing inspection — safe AI as a
 * checkpoint, not a cage.
 *
 * Ported from the Claude Design exploration "Unlock Explorations"
 * (Turn 01 — 21:9 hero illustrations, direction 1B "Policy gate").
 *
 * Theme-aware: structure is drawn from the page's --ink token, the "safe /
 * validated" side from --dia-bright (a neutral signal — deliberately not the
 * amber accent) and both are re-read on `themechange`, so the instrument flips
 * with the light/dark toggle. Honours prefers-reduced-motion by sitting on a
 * single settled frame instead of animating. The canvas is decorative
 * (aria-hidden); the legible labels are baked into the drawing and the copy
 * above it. Layout is fluid horizontally (x positions are fractions of width)
 * over a fixed vertical rhythm, so on narrow viewports it compresses sideways
 * while labels stay at a legible size.
 */

function parseTriplet(v) {
  const m = (v || '').trim().match(/(\d+)\D+(\d+)\D+(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

// left = the many creators; right = production, post-inspection
const L = [
  [0.103, 0.259], [0.139, 0.556], [0.099, 0.787],
  [0.242, 0.204], [0.266, 0.472], [0.234, 0.769],
];
const R = [[0.782, 0.324], [0.853, 0.500], [0.790, 0.713]];

export function createPolicyGate(canvas) {
  if (!canvas) return { destroy() {} };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // live palette, read from the page's theme tokens
  let INK = [255, 255, 255]; // structure (the design's flat white)
  let ACC = [233, 236, 242]; // safe AI — post-gate (a neutral signal, not amber)
  function readPalette() {
    const cs = getComputedStyle(document.documentElement);
    INK = parseTriplet(cs.getPropertyValue('--ink')) || INK;
    ACC = parseTriplet(cs.getPropertyValue('--dia-bright')) || ACC;
  }
  readPalette();

  // in reduced-motion, sit on a settled frame (packets mid-flow, scan centred)
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

  function bez(p0, c1, c2, p3, u) {
    const m = 1 - u;
    return [
      m * m * m * p0[0] + 3 * m * m * u * c1[0] + 3 * m * u * u * c2[0] + u * u * u * p3[0],
      m * m * m * p0[1] + 3 * m * m * u * c1[1] + 3 * m * u * u * c2[1] + u * u * u * p3[1],
    ];
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

    const gx = w * 0.52, gy = h * 0.5;
    const cxo = w * 0.119, gpull = w * 0.135, gh = h * 0.1333;
    const px = (f) => [f[0] * w, f[1] * h];
    const lEdge = (p0) => [p0, [p0[0] + cxo, p0[1]], [gx - gpull, gy], [gx - 16, gy]];
    const rEdge = (p0) => [[gx + 16, gy], [gx + gpull, gy], [p0[0] - cxo, p0[1]], p0];

    ctx.lineWidth = 1;

    // edges — left drawn in structure ink, right earns the accent
    L.forEach((f) => {
      const [p0, c1, c2, p3] = lEdge(px(f));
      ctx.strokeStyle = W(0.08);
      ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p3[0], p3[1]); ctx.stroke();
    });
    R.forEach((f) => {
      const [p0, c1, c2, p3] = rEdge(px(f));
      ctx.strokeStyle = A(0.14);
      ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p3[0], p3[1]); ctx.stroke();
    });

    // packets in transit
    L.forEach((f, i) => {
      const pr = (t * 0.10 * (0.8 + rnd(i) * 0.5) + rnd(i * 3.7)) % 1;
      const pt = bez(...lEdge(px(f)), pr);
      ctx.fillStyle = W(0.55);
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 2, 0, Math.PI * 2); ctx.fill();
    });
    R.forEach((f, i) => {
      const pr = (t * 0.12 * (0.85 + rnd(i + 9) * 0.4) + rnd(i * 5.1)) % 1;
      const pt = bez(...rEdge(px(f)), pr);
      ctx.fillStyle = A(0.95);
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 2.2, 0, Math.PI * 2); ctx.fill();
    });

    // nodes
    L.forEach((f) => {
      const [x, y] = px(f);
      ctx.strokeStyle = W(0.4); ctx.fillStyle = W(0.04);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    R.forEach((f) => {
      const [x, y] = px(f);
      ctx.strokeStyle = A(0.6); ctx.fillStyle = A(0.08);
      ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });

    // the gate
    ctx.strokeStyle = W(0.28);
    ctx.beginPath(); ctx.moveTo(gx - 12, gy - gh); ctx.lineTo(gx - 12, gy + gh); ctx.moveTo(gx + 12, gy - gh); ctx.lineTo(gx + 12, gy + gh); ctx.stroke();
    ctx.strokeStyle = W(0.12);
    ctx.beginPath(); ctx.moveTo(gx - 12, gy - gh); ctx.lineTo(gx + 12, gy - gh); ctx.moveTo(gx - 12, gy + gh); ctx.lineTo(gx + 12, gy + gh); ctx.stroke();
    // the scan sweeping the aperture
    const sy = gy - gh + ((t * 34) % (gh * 2));
    ctx.strokeStyle = A(0.6);
    ctx.beginPath(); ctx.moveTo(gx - 9, sy); ctx.lineTo(gx + 9, sy); ctx.stroke();
    ctx.fillStyle = A(0.06 + 0.04 * Math.sin(t * 1.2));
    ctx.fillRect(gx - 12, gy - gh, 24, gh * 2);

    label(ctx, 'teams', w * 0.097, h - 30, 0.32);
    label(ctx, 'policy gate', gx - 34, gy + gh + 28, 0.5, true);
    label(ctx, 'production', w * 0.762, h - 30, 0.32);
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
