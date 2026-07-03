/*
 * FlowX hero background — "order field" (variation II).
 * A drifting scatter of dots crystallizes into a lattice. The cursor is a
 * seed: points within ~90px snap to full order fast, then order spreads as a
 * front — a point only advances once it borders an ordered neighbour, and at
 * a slower rate — so the ordered region grows outward one ring at a time.
 * Order is irreversible (o never decreases); once crisp, a region stays crisp.
 * On top of that, every point also creeps toward full order on its own, so the
 * whole grid eventually completes even with no interaction.
 * Ported from the Claude Design exploration "Hero Background Explorations"
 * (variant 2b, "order field").
 */

const DOT_LO = [150, 160, 178];
const DOT_HI = [240, 244, 252];
const LINE = [210, 218, 232];

function smoothstep(v) {
  v = Math.max(0, Math.min(1, v));
  return v * v * (3 - 2 * v);
}
function mix(a, b, t) {
  return [
    (a[0] + (b[0] - a[0]) * t) | 0,
    (a[1] + (b[1] - a[1]) * t) | 0,
    (a[2] + (b[2] - a[2]) * t) | 0,
  ];
}
function rgba(c, a) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export function createOrderField(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ctx;
  try {
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
  } catch {
    canvas.style.display = 'none';
    return { destroy() {} };
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const GAP = 44; // lattice spacing
  const CORE = 90; // radius the cursor orders within (full at <30, none at >90)
  const CREEP = 0.03; // per-second autonomous "priming" gain, independent of cursor
  const CREEP_CAP = 0.45; // creep alone can only prime this far (below connect 0.55)
  const NUCLEATION = 0.55; // expected spontaneous seeds per second

  let w = 0, h = 0, cols = 0, dots = [];
  const mouse = { x: -1e4, y: -1e4, active: false };

  function buildDots() {
    dots = [];
    for (let y = GAP / 2; y < h; y += GAP) {
      for (let x = GAP / 2; x < w; x += GAP) {
        dots.push({
          hx: x, hy: y,
          cx: x + (Math.random() - 0.5) * 150,
          cy: y + (Math.random() - 0.5) * 150,
          ph: Math.random() * 6.283, sp: 0.5 + Math.random(),
          o: 0, px: x, py: y, tgt: 0, rate: 0, nuc: false,
        });
      }
    }
    cols = 0;
    const y0 = dots.length ? dots[0].hy : 0;
    for (const d of dots) { if (d.hy !== y0) break; cols++; }
  }

  function layout() {
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildDots();
  }
  layout();

  function render() {
    const ctx2 = ctx;
    ctx2.lineWidth = 1;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      if (d.o < 0.55) continue;
      const right = i % cols < cols - 1 ? dots[i + 1] : null;
      const down = dots[i + cols] || null;
      for (const n2 of [right, down]) {
        if (!n2 || n2.o < 0.55) continue;
        const a = (d.o - 0.55) * (n2.o - 0.55) * 4.9 * 0.17;
        if (a <= 0.005) continue;
        ctx2.strokeStyle = rgba(LINE, a);
        ctx2.beginPath();
        ctx2.moveTo(d.px, d.py);
        ctx2.lineTo(n2.px, n2.py);
        ctx2.stroke();
      }
    }
    for (const d of dots) {
      const col = mix(DOT_LO, DOT_HI, d.o);
      ctx2.fillStyle = rgba(col, 0.15 + d.o * 0.38);
      ctx2.beginPath();
      ctx2.arc(d.px, d.py, 0.5 + d.o * 0.5, 0, 6.2832);
      ctx2.fill();
    }
  }

  function draw(t, dt) {
    ctx.clearRect(0, 0, w, h);

    const grow = Math.min(1, dt * 2.2); // cursor/nucleus seeds order at this rate
    const spread = Math.min(1, dt * 0.7); // the front advances one ring at a time
    const creep = dt * CREEP; // priming gain toward the dim disconnected floor

    // spontaneous nucleation: occasionally a dot in a still-disordered patch
    // becomes a fresh seed, so the field fills as separate growing clusters
    // instead of every dot crossing the threshold together
    if (Math.random() < dt * NUCLEATION) {
      const d = dots[(Math.random() * dots.length) | 0];
      if (d && !d.nuc && d.o < CREEP_CAP + 0.05) d.nuc = true;
    }

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      // seed: a compact core under the cursor that orders immediately
      const md = mouse.active ? Math.hypot(d.hx - mouse.x, d.hy - mouse.y) : 1e4;
      let seed = Math.max(0, Math.min(1, (CORE - md) / 60));
      seed = seed * seed * (3 - 2 * seed);
      // front: order only advances into dots bordering an already-ordered one
      const col = i % cols;
      let nb = 0;
      if (col > 0) nb = Math.max(nb, dots[i - 1].o);
      if (col < cols - 1) nb = Math.max(nb, dots[i + 1].o);
      if (i - cols >= 0) nb = Math.max(nb, dots[i - cols].o);
      if (i + cols < dots.length) nb = Math.max(nb, dots[i + cols].o);
      // expansion gate: order only advances into a dot once a neighbour is
      // essentially aligned, so the connected frontier finishes crisp before
      // it expands to the next ring outward
      const gate = nb > 0.85 ? 1 : 0;
      if (d.nuc) { d.tgt = 1; d.rate = grow; } // a seed drives itself to full order
      else { d.tgt = Math.max(seed, gate); d.rate = seed >= d.tgt ? grow : spread; }
    }
    for (const d of dots) {
      // order only ever increases: seeds and their growing fronts push toward
      // full order; the field converges and never dissolves back to chaos
      if (d.tgt > d.o) d.o += (d.tgt - d.o) * d.rate;
      // autonomous creep only primes dots to a dim, disconnected floor — past
      // that, order must arrive as a front from a seed, so the grid never all
      // crosses the connect threshold at once. The rate rolls across the field
      // over time (smooth sum-of-sines) so patches prime faster than others.
      if (d.o < CREEP_CAP) {
        const s =
          Math.sin(d.hx * 0.01 + t * 0.5) +
          Math.sin(d.hy * 0.012 - t * 0.37) +
          Math.sin((d.hx + d.hy) * 0.008 + t * 0.6);
        const cf = 0.2 + 1.1 * (0.5 + s / 6); // ~0.2x .. ~1.3x of the base rate
        const ease = 0.45 + 5.5 * (1 - d.o) * (1 - d.o); // fast burst while low
        d.o = Math.min(CREEP_CAP, d.o + creep * cf * ease);
      }
      const wob = 1 - d.o;
      d.px = d.hx + (d.cx - d.hx) * wob * 0.8 + Math.sin(t * d.sp + d.ph) * 18 * wob;
      d.py = d.hy + (d.cy - d.hy) * wob * 0.8 + Math.cos(t * d.sp * 0.9 + d.ph) * 18 * wob;
    }

    render();
  }

  // Reduced motion: a single calm, fully-resolved lattice frame.
  function drawStatic() {
    for (const d of dots) { d.o = 1; d.px = d.hx; d.py = d.hy; }
    ctx.clearRect(0, 0, w, h);
    render();
  }

  let raf = 0;
  let running = false;
  let t0 = null;
  let last = 0;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (t0 === null) { t0 = now; last = now; }
    const t = (now - t0) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    draw(t, dt);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  if (reduceMotion) drawStatic();
  else start();

  const hero = canvas.closest('section') || canvas;

  function onMove(e) {
    const b = canvas.getBoundingClientRect();
    if (!b.width || !b.height) return;
    mouse.x = (e.clientX - b.left) * (w / b.width);
    mouse.y = (e.clientY - b.top) * (h / b.height);
    mouse.active = true;
  }
  function onLeave() { mouse.active = false; }
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      t0 = null;
      layout();
      if (reduceMotion) drawStatic();
    }, 150);
  }
  window.addEventListener('resize', onResize);

  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? start() : stop()),
    { threshold: 0.02 }
  );
  io.observe(hero);

  function onVis() {
    if (document.hidden) stop();
    else start();
  }
  document.addEventListener('visibilitychange', onVis);

  return {
    destroy() {
      stop();
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(resizeTimer);
      ctx.clearRect(0, 0, w, h);
    },
  };
}
