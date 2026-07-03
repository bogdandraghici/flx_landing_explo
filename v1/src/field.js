/*
 * FlowX hero background — "full-bleed grid resolve".
 * A flat architectural grid where a compile sweep snaps scattered dots
 * onto the lattice and draws the connecting lines, holds, tears back
 * down, rests, and repeats. Ported from the Claude Design exploration
 * "Flowx Background Variants" (variant 2c).
 */

const YEL = '#FCB813';

function smoothstep(v) {
  v = Math.max(0, Math.min(1, v));
  return v * v * (3 - 2 * v);
}

/* Warp sweep progress 0..1 -> 0..1: same endpoints (loop timing preserved) but
   the front speeds up and slows down across the pass instead of a constant
   glide. Two sine terms give an organic, uneven cadence; amplitudes are kept
   small enough that the curve stays monotonic (the front never reverses). */
function easeWarp(p) {
  p = Math.max(0, Math.min(1, p));
  return p + 0.08 * Math.sin(p * Math.PI * 2) + 0.03 * Math.sin(p * Math.PI * 4);
}

function makeDust(n, w, h) {
  const d = [];
  for (let i = 0; i < n; i++) {
    d.push({
      x: Math.random() * w,
      y: Math.random() * h,
      yel: Math.random() < 0.06,
      a: 0.05 + Math.random() * 0.11,
      s: 1 + Math.random() * 1.4,
    });
  }
  return d;
}

function drawDust(ctx, dust, t) {
  for (const p of dust) {
    ctx.globalAlpha = p.a * (0.7 + 0.3 * Math.sin(t * 0.5 + p.x));
    ctx.fillStyle = p.yel ? YEL : '#fff';
    ctx.fillRect(p.x, p.y, p.s, p.s);
  }
  ctx.globalAlpha = 1;
}

function buildGrid(w, h) {
  const SP = 52;
  const grid = [];
  const pts = [];
  for (let r = 0; r * SP <= h; r++) {
    const row = [];
    for (let c = 0; c * SP <= w; c++) {
      row.push(pts.length);
      pts.push({
        gx: c * SP,
        gy: r * SP,
        sx: c * SP + (Math.random() - 0.5) * 380,
        sy: r * SP + (Math.random() - 0.5) * 340,
        ph: Math.random() * 6.28,
        yel: Math.random() < 0.05,
      });
    }
    grid.push(row);
  }
  return { grid, pts };
}

function waveFront(y, t) {
  return (
    Math.sin(y * 0.0052 + t * 0.85) * 165 +
    Math.sin(y * 0.0143 + t * 1.6 + 1.3) * 74 +
    Math.sin(y * 0.027 - t * 0.55 + 2.1) * 34
  );
}

export function createField(canvas) {
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
  const SPD = 120; // px/s sweep speed
  const HOLD = 1.8; // seconds fully resolved
  const REST = 1.2; // seconds fully torn down
  const LEADIN = 400; // px the resolve front starts off-screen to the left
  // Skip the empty lead-in on load so dots start organizing right away — the
  // sweep begins already entering the viewport instead of 400px+ off-screen.
  const PREROLL = (LEADIN + 120) / SPD; // seconds of phase head-start

  let w = 0, h = 0, grid = [], pts = [], dust = [];
  let span = 0, buildDur = 0, period = 0;

  // ---- spherical projection -------------------------------------------------
  // Same barrel/fisheye warp as the "order field" background, so the grid reads
  // as the inner wall of a huge sphere: rows/columns bow into arcs, cells swell
  // toward the centre and compress toward the receding rim. Corners stay pinned
  // so the field still fills the viewport. Kept in sync with orderField.js.
  const SPHERE = 1;
  const FOVA = 1.6;
  const sinA = Math.sin(FOVA);
  let Cx = 0, Cy = 0, Rref = 1;
  function project(px, py) {
    const dx = px - Cx, dy = py - Cy;
    const r = Math.hypot(dx, dy);
    if (r < 1e-3) return [px, py, 1];
    const rn = Math.min(1, r / Rref);
    const warped = rn + (Math.sin(rn * FOVA) / sinA - rn) * SPHERE;
    const s = (warped * Rref) / r;
    const dep = 1 - (1 - (Math.cos(rn * FOVA) * 0.5 + 0.5)) * SPHERE;
    return [Cx + dx * s, Cy + dy * s, dep];
  }

  function layout() {
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    Cx = w / 2;
    Cy = h * 0.5;
    Rref = Math.hypot(Math.max(Cx, w - Cx), Math.max(Cy, h - Cy)) || 1;
    ({ grid, pts } = buildGrid(w, h));
    dust = makeDust(50, w, h);
    span = w + 1200;
    buildDur = span / SPD;
    period = 2 * buildDur + HOLD + REST;
  }
  layout();

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    drawDust(ctx, dust, t);

    const tt = t % period;
    // Progress through the build and tear passes (0..1 over buildDur each),
    // warped so the front's pace varies instead of advancing at a fixed SPD.
    // span === buildDur * SPD, so the warped endpoints match the old linear ones.
    const buildP = Math.min(tt, buildDur) / buildDur;
    const tearP = Math.max(0, tt - buildDur - HOLD) / buildDur;
    const xBuild = -LEADIN + easeWarp(buildP) * span;
    const xTear = -LEADIN + easeWarp(tearP) * span;

    const resolvedAmt = (p) => {
      const o = waveFront(p.gy, t);
      return smoothstep((xBuild + o - p.gx) / 180) * (1 - smoothstep((xTear + o - p.gx) / 180));
    };

    ctx.strokeStyle = 'rgba(255,255,255,0.075)';
    ctx.lineWidth = 1;
    for (const row of grid) {
      ctx.beginPath();
      let open = false;
      for (let k = 0; k < row.length - 1; k++) {
        const a = pts[row[k]], b = pts[row[k + 1]];
        if (resolvedAmt(a) > 0.8 && resolvedAmt(b) > 0.8) {
          const pb = project(b.gx, b.gy);
          if (!open) { const pa = project(a.gx, a.gy); ctx.moveTo(pa[0], pa[1]); open = true; }
          ctx.lineTo(pb[0], pb[1]);
        } else open = false;
      }
      ctx.stroke();
    }
    for (let c = 0; c < grid[0].length; c++) {
      ctx.beginPath();
      let open = false;
      for (let r = 0; r < grid.length - 1; r++) {
        const a = pts[grid[r][c]], b = pts[grid[r + 1][c]];
        if (resolvedAmt(a) > 0.8 && resolvedAmt(b) > 0.8) {
          const pb = project(b.gx, b.gy);
          if (!open) { const pa = project(a.gx, a.gy); ctx.moveTo(pa[0], pa[1]); open = true; }
          ctx.lineTo(pb[0], pb[1]);
        } else open = false;
      }
      ctx.stroke();
    }

    for (const p of pts) {
      const r = resolvedAmt(p);
      const jx = Math.sin(t * 1.1 + p.ph) * 34 * (1 - r);
      const jy = Math.cos(t * 0.8 + p.ph * 1.7) * 28 * (1 - r);
      const [x, y, dep] = project(
        p.sx + (p.gx - p.sx) * r + jx,
        p.sy + (p.gy - p.sy) * r + jy
      );
      if (p.yel && r > 0.5) {
        ctx.globalAlpha = 0.72 * r * dep;
        ctx.strokeStyle = YEL;
        ctx.beginPath();
        ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y);
        ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
        ctx.stroke();
      } else {
        ctx.globalAlpha = (0.32 + 0.22 * r) * dep;
        ctx.fillStyle = '#fff';
        ctx.fillRect(x, y, 1.7 + r, 1.7 + r);
      }
    }

    ctx.globalAlpha = 1;
  }

  let raf = 0;
  let running = false;
  let t0 = null;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (t0 === null) t0 = now;
    draw((now - t0) / 1000 + PREROLL);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  if (reduceMotion) {
    draw(buildDur + HOLD * 0.5); // settled, mid-hold frame
  } else {
    start();
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      t0 = null;
      layout();
      if (reduceMotion) draw(buildDur + HOLD * 0.5);
    }, 150);
  }
  window.addEventListener('resize', onResize);

  const hero = canvas.closest('section') || canvas;
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
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(resizeTimer);
    },
  };
}
