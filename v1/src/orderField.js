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

// Palette by theme. Dark: cool near-white dots crystallizing on charcoal.
// Light: the same lattice inverted to warm ink — a faint disordered grey (LO)
// resolving into near-black (HI) on paper, so the field reads on a light ground.
// LO is the disordered colour, HI the fully-ordered one; mix(LO,HI,order) runs
// between them, so in light LO is *lighter* than HI (the crystal darkens).
const PALETTES = {
  dark: { DOT_LO: [150, 160, 178], DOT_HI: [240, 244, 252], LINE: [210, 218, 232] },
  light: { DOT_LO: [176, 174, 166], DOT_HI: [28, 30, 36], LINE: [58, 62, 72] },
};
// live palette — mutated in place so every closure that captured it sees updates
let DOT_LO = [0, 0, 0], DOT_HI = [0, 0, 0], LINE = [0, 0, 0];
function applyPalette() {
  const p = PALETTES[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
  DOT_LO = p.DOT_LO; DOT_HI = p.DOT_HI; LINE = p.LINE;
}
applyPalette();
const GAP = 44; // lattice spacing — shared by the animated field and the static frame

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
  const CORE = 110; // radius the cursor orders within (full at <50, none at >110)
  const CREEP = 0.045; // per-second autonomous "priming" gain, independent of cursor
  const CREEP_CAP = 0.45; // creep alone can only prime this far (below connect 0.55)
  const NUCLEATION = 1.1; // expected spontaneous seeds per second

  // twinkle pulse: every so often a settled dot lights up and the glint ripples
  // outward to its lattice neighbours ring by ring, with a short delay per ring
  // and fading as it spreads — a slow, sophisticated pulse rather than isolated
  // sparkles. Only dots at or above the dim floor carry a pulse, so it plays
  // across the ambient grid without needing the field to fully crystallize.
  const PULSE = 0.9; // expected pulses/sec across the whole field
  const TW_DUR = 1.1; // seconds each dot's glint lasts (ease in and out)
  const TW_AMP = 0.68; // peak added brightness at the pulse origin
  const TW_GATE = 0.32; // dots at least this ordered can light (the dim floor up)
  const RING_DELAY = 0.3; // delay before a pulse reaches the next ring out
  const RING_DECAY = 0.82; // brightness falloff per ring (the ripple dies out)
  const MAX_RING = 5; // rings the pulse travels before it stops

  // ---- spherical projection -----------------------------------------------
  // The flat lattice is warped so it reads as the inner wall of a huge sphere
  // we're sitting inside: rows and columns bow into arcs, the cell size swells
  // toward the point we face (screen centre) and compresses toward the curving
  // rim, and a depth shade dims/shrinks the periphery so it recedes. It's a
  // barrel (fisheye) map — the corners stay pinned so the field still fills the
  // viewport. SPHERE scales the whole effect (0 = flat), FOVA is the half-angle
  // of the projection (bigger = rounder).
  const SPHERE = 1;
  const FOVA = 1.6;
  let Cx = 0, Cy = 0, Rref = 1;
  const sinA = Math.sin(FOVA);

  let w = 0, h = 0, cols = 0, dots = [];
  const mouse = { x: -1e4, y: -1e4, active: false };

  // pending pulse activations: each { i, t, amp, ring, pid } fires when its
  // timer t reaches 0, lighting dot i and scheduling its neighbours one ring out.
  let pulses = [];
  let pulseId = 0;

  // radial warp of a normalized radius (0..1): interior swells outward toward
  // the rim, most in the mid-radii, pinned at both centre and corner.
  const warpR = (rn) => rn + (Math.sin(rn * FOVA) / sinA - rn) * SPHERE;

  // project an on-screen point through the sphere; returns [x, y, depth] where
  // depth is 1 at the centre (nearest) falling toward the rim (farthest).
  function project(px, py) {
    const dx = px - Cx, dy = py - Cy;
    const r = Math.hypot(dx, dy);
    if (r < 1e-3) return [px, py, 1];
    const rn = Math.min(1, r / Rref);
    const s = (warpR(rn) * Rref) / r;
    const dep = 1 - (1 - (Math.cos(rn * FOVA) * 0.5 + 0.5)) * SPHERE;
    return [Cx + dx * s, Cy + dy * s, dep];
  }

  // invert the radial warp so cursor interaction, measured in screen space,
  // seeds the dots the user is actually pointing at (a few bisection steps —
  // the map is monotonic, so this converges fast).
  function unproject(px, py) {
    const dx = px - Cx, dy = py - Cy;
    const r = Math.hypot(dx, dy);
    if (r < 1e-3) return [px, py];
    const target = Math.min(1, r / Rref);
    let lo = 0, hi = 1;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      if (warpR(mid) < target) lo = mid; else hi = mid;
    }
    const s = (((lo + hi) / 2) * Rref) / r;
    return [Cx + dx * s, Cy + dy * s];
  }

  function buildDots() {
    dots = [];
    // centre the lattice on the viewport so a column/row sits dead-centre —
    // this lines the centred 880px (= 20·GAP) terminal's edges up with columns
    const sx = (((w / 2) % GAP) + GAP) % GAP;
    const sy = (((h / 2) % GAP) + GAP) % GAP;
    for (let y = sy; y < h; y += GAP) {
      for (let x = sx; x < w; x += GAP) {
        dots.push({
          hx: x, hy: y,
          cx: x + (Math.random() - 0.5) * 150,
          cy: y + (Math.random() - 0.5) * 150,
          ph: Math.random() * 6.283, sp: 0.5 + Math.random(),
          o: 0, px: x, py: y, tgt: 0, rate: 0, nuc: false,
          tw: 0, twT: 0, twAmp: 0, pid: -1,
        });
      }
    }
    cols = 0;
    const firstY = dots.length ? dots[0].hy : 0;
    for (const d of dots) { if (d.hy !== firstY) break; cols++; }
  }

  function layout() {
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // sphere faces the middle of the hero; Rref reaches the farthest corner so
    // that corner stays pinned and the warp never uncovers the viewport edges.
    Cx = w / 2;
    Cy = h * 0.5;
    Rref = Math.hypot(Math.max(Cx, w - Cx), Math.max(Cy, h - Cy)) || 1;
    buildDots();
    pulses = []; // dot indices just changed — drop any in-flight pulse fronts
  }
  layout();

  // vertical fade: the grid is dim at the top and ramps to full toward the
  // bottom (based on each dot's home row, so it doesn't flicker with wobble)
  const vfade = (y) => 0.22 + 0.78 * Math.max(0, Math.min(1, y / h));

  function render() {
    const ctx2 = ctx;
    ctx2.lineWidth = 1;
    // project every dot onto the sphere once per frame; sx/sy are the on-screen
    // positions, dep is the depth shade (1 near, <1 toward the receding rim).
    for (const d of dots) {
      const p = project(d.px, d.py);
      d.sx = p[0]; d.sy = p[1]; d.dep = p[2];
    }
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      if (d.o < 0.55) continue;
      const right = i % cols < cols - 1 ? dots[i + 1] : null;
      const down = dots[i + cols] || null;
      for (const n2 of [right, down]) {
        if (!n2 || n2.o < 0.55) continue;
        const dep = (d.dep + n2.dep) * 0.5;
        const a = (d.o - 0.55) * (n2.o - 0.55) * 4.9 * 0.17 * vfade((d.hy + n2.hy) / 2) * dep;
        if (a <= 0.005) continue;
        ctx2.strokeStyle = rgba(LINE, a);
        ctx2.beginPath();
        ctx2.moveTo(d.sx, d.sy);
        ctx2.lineTo(n2.sx, n2.sy);
        ctx2.stroke();
      }
    }
    for (const d of dots) {
      const tw = d.tw;
      const fade = vfade(d.hy) * d.dep;
      const rad = (0.5 + d.o * 0.5) * (0.55 + 0.45 * d.dep);
      // twinkle: a soft glow halo makes the glint read as a sparkle even on the
      // faint lattice, then the core dot brightens toward white and swells a
      // touch. The halo is what carries the effect — a single bright pixel is
      // invisible at screen scale.
      if (tw > 0.02) {
        ctx2.fillStyle = rgba(DOT_HI, 0.04 * tw * fade);
        ctx2.beginPath();
        ctx2.arc(d.sx, d.sy, rad + 1.7 * tw, 0, 6.2832);
        ctx2.fill();
      }
      const col = mix(DOT_LO, DOT_HI, Math.min(1, d.o + tw * 0.9));
      ctx2.fillStyle = rgba(col, (0.15 + d.o * 0.38 + tw * TW_AMP) * fade);
      ctx2.beginPath();
      ctx2.arc(d.sx, d.sy, rad + tw * 1.1, 0, 6.2832);
      ctx2.fill();
    }
  }

  function draw(t, dt) {
    ctx.clearRect(0, 0, w, h);

    const grow = Math.min(1, dt * 4.5); // cursor/nucleus seeds order at this rate
    const spread = Math.min(1, dt * 1.35); // the front advances one ring at a time
    const creep = dt * CREEP; // priming gain toward the dim disconnected floor

    // spontaneous nucleation: occasionally a dot in a still-disordered patch
    // becomes a fresh seed, so the field fills as separate growing clusters
    // instead of every dot crossing the threshold together
    if (Math.random() < dt * NUCLEATION) {
      const d = dots[(Math.random() * dots.length) | 0];
      if (d && !d.nuc && d.o < CREEP_CAP + 0.05) d.nuc = true;
    }

    // originate a pulse on a random settled dot, at roughly PULSE events/sec.
    if (Math.random() < dt * PULSE) {
      const i0 = (Math.random() * dots.length) | 0;
      const d0 = dots[i0];
      if (d0 && d0.o > TW_GATE && d0.twT <= 0) {
        pulseId++;
        d0.pid = pulseId;
        pulses.push({ i: i0, t: 0, amp: 1, ring: 0, pid: pulseId });
      }
    }

    // advance the pulse fronts: fire any activation whose delay has elapsed,
    // light that dot, and schedule its not-yet-touched neighbours one ring out.
    if (pulses.length) {
      const next = [];
      for (const pu of pulses) {
        pu.t -= dt;
        if (pu.t > 0) { next.push(pu); continue; }
        const d = dots[pu.i];
        if (!d) continue;
        if (d.twT <= 0) { d.twT = TW_DUR; d.twAmp = pu.amp; }
        const amp = pu.amp * RING_DECAY;
        if (pu.ring < MAX_RING && amp > 0.1) {
          const i = pu.i, c = i % cols;
          const nb = [];
          if (c > 0) nb.push(i - 1);
          if (c < cols - 1) nb.push(i + 1);
          if (i - cols >= 0) nb.push(i - cols);
          if (i + cols < dots.length) nb.push(i + cols);
          // spread chance starts at 100% for the origin's own neighbours and
          // drops 10 points per ring out (90%, 80%, …), so the ripple reaches
          // everything nearby but frays and thins as it travels.
          const spreadP = 1 - 0.1 * pu.ring;
          for (const ni of nb) {
            const nd = dots[ni];
            if (nd && nd.pid !== pu.pid && nd.o > TW_GATE && Math.random() < spreadP) {
              nd.pid = pu.pid; // claim so this pulse's front never revisits it
              next.push({ i: ni, t: RING_DELAY, amp, ring: pu.ring + 1, pid: pu.pid });
            }
          }
        }
      }
      pulses = next;
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
      // glint envelope: a smooth 0→1→0 bump over TW_DUR, scaled by the pulse
      // amplitude that reached this dot (fainter the further out the ring).
      if (d.twT > 0) {
        d.twT -= dt;
        const p = 1 - Math.max(0, d.twT) / TW_DUR;
        const bump = Math.sin(p * Math.PI);
        d.tw = bump * bump * d.twAmp;
      } else if (d.tw) d.tw = 0;
      const wob = 1 - d.o;
      d.px = d.hx + (d.cx - d.hx) * wob * 0.8 + Math.sin(t * d.sp + d.ph) * 18 * wob;
      d.py = d.hy + (d.cy - d.hy) * wob * 0.8 + Math.cos(t * d.sp * 0.9 + d.ph) * 18 * wob;
      // twinkle distortion: while a glint is on this dot, jitter it (and so the
      // lines meeting it) by a small amount that fades with the glint envelope.
      // Because the pulse reaches each ring a beat later, the wobble ripples
      // outward with it — a slight local warp that only fires where dots twinkle.
      if (d.tw > 0.02) {
        d.px += Math.sin(t * 3.4 + d.ph * 3.1) * 1.6 * d.tw;
        d.py += Math.cos(t * 2.9 + d.ph * 2.3) * 1.6 * d.tw;
      }
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
    const sx = (e.clientX - b.left) * (w / b.width);
    const sy = (e.clientY - b.top) * (h / b.height);
    // dots seed by their unwarped home distance, so map the screen cursor back
    // through the sphere to the lattice coordinate under it.
    const [mx, my] = unproject(sx, sy);
    mouse.x = mx;
    mouse.y = my;
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

  // theme flip: swap the palette; the running loop picks it up next frame, and
  // the reduced-motion still frame is repainted in the new colours.
  function onTheme() {
    applyPalette();
    if (reduceMotion) drawStatic();
  }
  window.addEventListener('themechange', onTheme);

  return {
    destroy() {
      stop();
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('themechange', onTheme);
      clearTimeout(resizeTimer);
      ctx.clearRect(0, 0, w, h);
    },
  };
}

/*
 * Static "final frame" of the order field — the fully-resolved lattice, no
 * animation or interaction. Same centred grid, colours and vertical fade as
 * the animated hero field, so it reads as the same grid at rest. Used as a
 * section background (e.g. the CTA). Redraws on size change.
 */
export function createStaticField(canvas) {
  let ctx;
  try {
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
  } catch {
    canvas.style.display = 'none';
    return { destroy() {} };
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function draw() {
    const w = canvas.clientWidth || 0;
    const h = canvas.clientHeight || 0;
    if (!w || !h) return;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // centred lattice, fully resolved (order o = 1 everywhere)
    const sx = (((w / 2) % GAP) + GAP) % GAP;
    const sy = (((h / 2) % GAP) + GAP) % GAP;
    const pts = [];
    let cols = 0;
    for (let y = sy; y < h; y += GAP) {
      const rowStart = pts.length;
      for (let x = sx; x < w; x += GAP) pts.push({ x, y });
      if (cols === 0) cols = pts.length - rowStart;
    }
    const DIM = 0.5; // this static frame sits dimmer than the animated hero grid
    const vfade = (y) => (0.22 + 0.78 * Math.max(0, Math.min(1, y / h))) * DIM;

    // lines (both dots at o = 1 → alpha 0.45·0.45·4.9·0.17, scaled by the fade)
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const right = i % cols < cols - 1 ? pts[i + 1] : null;
      const down = pts[i + cols] || null;
      for (const n2 of [right, down]) {
        if (!n2) continue;
        ctx.strokeStyle = rgba(LINE, 0.45 * 0.45 * 4.9 * 0.17 * vfade((a.y + n2.y) / 2));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }
    // dots (o = 1 → colour DOT_HI, alpha 0.53, radius 1.0, scaled by the fade)
    for (const p of pts) {
      ctx.fillStyle = rgba(DOT_HI, (0.15 + 0.38) * vfade(p.y));
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1, 0, 6.2832);
      ctx.fill();
    }
  }

  draw();

  let timer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(draw, 100);
  });
  ro.observe(canvas);

  function onTheme() { applyPalette(); draw(); }
  window.addEventListener('themechange', onTheme);

  return {
    destroy() {
      ro.disconnect();
      window.removeEventListener('themechange', onTheme);
      clearTimeout(timer);
      ctx.clearRect(0, 0, canvas.clientWidth || 0, canvas.clientHeight || 0);
    },
  };
}
