'use client';
import { useEffect, useRef } from 'react';

/**
 * AI-agents catalog hero visual — the catalog as a matrix. A grid of agent
 * cells (each with a faint card tick, like the catalog cards below); every
 * cycle a handful of spread-out cells light up in sequence and interconnect
 * with hairline links — a stack being composed from the shelf. When the last
 * link lands the constellation takes the amber accent and a single pulse
 * travels the chain: the picked agents working together. Then it releases,
 * and a different set lights up.
 *
 * Site conventions (same as the other hero canvases):
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - The matrix and links are neutral schematic ink; amber is reserved for the
 *    resolution (the completed constellation + its travelling pulse).
 *  - `prefers-reduced-motion` → resolved pose (first constellation, connected).
 *  - Selections are seeded per cycle (deterministic).
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;
const PI2 = Math.PI * 2;

const COLS = 10, ROWS = 10, CELL = 34, GAP = 12;
const GRID = COLS * CELL + (COLS - 1) * GAP; // 448
const OX = (SIZE - GRID) / 2, OY = (SIZE - GRID) / 2;

const K = 6; // agents per constellation
const STEP = 0.55; // seconds per cell lighting
const AMBER_IN = 0.4; // the resolution wash
const HOLD = 3.6;
const FADE = 0.7;
const BUILD = K * STEP;
const CYCLE = BUILD + AMBER_IN + HOLD + FADE;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// pick K spread-out cells for a cycle, then order them greedy-nearest so the
// chain reads as a path instead of criss-crossing the grid
function constellation(cycleIdx) {
  const rnd = mulberry32(0xCA7A ^ (cycleIdx * 0x9E3779B9));
  const picks = [];
  let guard = 0;
  while (picks.length < K && guard++ < 400) {
    const c = Math.floor(rnd() * COLS), r = Math.floor(rnd() * ROWS);
    if (picks.some((p) => Math.max(Math.abs(p.c - c), Math.abs(p.r - r)) < 2)) continue;
    picks.push({ c, r });
  }
  const ordered = [picks[0]];
  const rest = picks.slice(1);
  while (rest.length) {
    const last = ordered[ordered.length - 1];
    let bi = 0, bd = Infinity;
    rest.forEach((p, i) => {
      const d = (p.c - last.c) ** 2 + (p.r - last.r) ** 2;
      if (d < bd) { bd = d; bi = i; }
    });
    ordered.push(rest.splice(bi, 1)[0]);
  }
  return ordered;
}

const center = (p) => [
  OX + p.c * (CELL + GAP) + CELL / 2,
  OY + p.r * (CELL + GAP) + CELL / 2,
];

export default function AgentsHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', amber: '252, 184, 19', bg: '#0A0B0D' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.amber = get('--amber-rgb', P.amber);
      P.bg = get('--bg', P.bg);
    };
    readPalette();
    const inkA = (a) => `rgba(${P.ink}, ${a})`;
    const ambA = (a) => `rgba(${P.amber}, ${a})`;
    const bgFill = () => (P.bg.startsWith('#') ? P.bg : `rgb(${P.bg})`);

    // ---- sizing / DPR / uniform scale ---------------------------------------
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || SIZE;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round((rect.height || SIZE) * dpr));
      const scale = cssW / SIZE;
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    size();

    // per-cell ambient shimmer phases (seeded once)
    const shimmer = (() => {
      const rnd = mulberry32(0x5A1AD);
      return Array.from({ length: COLS * ROWS }, () => rnd() * PI2);
    })();

    const easeOut = (v) => 1 - Math.pow(1 - v, 3);

    // ---- draw primitives ------------------------------------------------------
    // one agent cell: bg-opaque rounded square + inner card tick
    const cell = (c, r, lit, glow, pop = 1) => {
      const x = OX + c * (CELL + GAP), y = OY + r * (CELL + GAP);
      const g = (CELL * (1 - pop)) / 2; // pop-in grows from the middle
      ctx.beginPath(); ctx.roundRect(x + g, y + g, CELL - g * 2, CELL - g * 2, 7);
      ctx.fillStyle = bgFill(); ctx.fill(); // opaque, so links pass *between* cells
      ctx.fillStyle = inkA(lit ? 0.09 : 0.03); ctx.fill();
      if (lit && glow > 0) {
        ctx.save();
        ctx.shadowColor = ambA(0.4 * glow);
        ctx.shadowBlur = 14;
        ctx.strokeStyle = ambA(0.28 + 0.32 * glow);
        ctx.lineWidth = 1.25; ctx.stroke();
        ctx.restore();
      } else {
        ctx.strokeStyle = inkA(lit ? 0.3 : 0.09); ctx.lineWidth = 1; ctx.stroke();
      }
      // the card tick: header dot + short bar, like the catalog cards
      if (pop > 0.6) {
        const a = lit ? (glow > 0 ? ambA(0.55 + 0.45 * glow) : inkA(0.5)) : inkA(0.12);
        ctx.fillStyle = a;
        ctx.beginPath(); ctx.arc(x + 9, y + 10, 1.6, 0, PI2); ctx.fill();
        ctx.fillStyle = lit ? inkA(0.3) : inkA(0.08);
        ctx.beginPath(); ctx.roundRect(x + 7, y + 18, CELL - 14, 3, 1.5); ctx.fill();
        ctx.beginPath(); ctx.roundRect(x + 7, y + 25, (CELL - 14) * 0.6, 3, 1.5); ctx.fill();
      }
    };

    // dashed link between two cell centers, drawing in with `ease`
    const link = (a, b, ease, style) => {
      const tip = [a[0] + (b[0] - a[0]) * ease, a[1] + (b[1] - a[1]) * ease];
      ctx.save();
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = style; ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(tip[0], tip[1]); ctx.stroke();
      ctx.restore();
      return tip;
    };

    // ---- the scene -------------------------------------------------------------
    const draw = (t, fade, cycleIdx, now) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;

      const picks = constellation(cycleIdx);
      const centers = picks.map(center);
      const litCount = Math.min(Math.floor(t / STEP) + (t > 0 ? 1 : 0), K);
      const resolved = t >= BUILD;
      const glow = resolved ? easeOut(Math.min((t - BUILD) / AMBER_IN, 1)) : 0;

      // links first (they run between the opaque cells)
      for (let i = 1; i < K; i++) {
        const start = i * STEP - STEP, end = i * STEP;
        if (t < start) break;
        const ease = easeOut(Math.min((t - start) / (end - start), 1));
        link(centers[i - 1], centers[i], ease,
          glow > 0 ? ambA(0.2 + 0.25 * glow) : inkA(0.28));
      }

      // the matrix — unlit cells shimmer faintly; picked cells pop in sequence
      const lit = new Set();
      picks.slice(0, litCount).forEach((p) => lit.add(p.r * COLS + p.c));
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          if (lit.has(idx)) continue;
          // gentle ambient breathing so the shelf feels alive, never busy
          const amb = reduce ? 1 : 0.85 + 0.15 * Math.sin(now / 1400 + shimmer[idx]);
          ctx.globalAlpha = fade * amb;
          cell(c, r, false, 0);
        }
      }
      ctx.globalAlpha = fade;
      picks.slice(0, litCount).forEach((p, i) => {
        const pop = easeOut(Math.min(Math.max((t - i * STEP) / 0.3, 0), 1));
        cell(p.c, p.r, true, glow, pop);
      });

      // resolution pulse: one packet travels the whole chain while it holds
      if (resolved && glow >= 1 && !reduce) {
        const per = 0.9; // seconds per hop
        const total = (K - 1) * per;
        const pt = ((t - BUILD - AMBER_IN) % total) / per;
        const seg = Math.min(Math.floor(pt), K - 2);
        const f = pt - seg;
        const a = centers[seg], b = centers[seg + 1];
        const p = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
        const halo = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 9);
        halo.addColorStop(0, ambA(0.3)); halo.addColorStop(1, ambA(0));
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, PI2); ctx.fill();
        ctx.fillStyle = ambA(0.95); ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, PI2); ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    // ---- animation loop ----------------------------------------------------------
    let raf = 0;
    let start = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      const el = (now - start) / 1000;
      const cycleIdx = Math.floor(el / CYCLE);
      const c = el % CYCLE;
      if (c < BUILD + AMBER_IN + HOLD) draw(c, 1, cycleIdx, now);
      else draw(BUILD + AMBER_IN + HOLD, 1 - (c - BUILD - AMBER_IN - HOLD) / FADE, cycleIdx, now);
    };

    const staticPose = () => draw(BUILD + AMBER_IN, 1, 0, 0);

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners -----------------------------------------------------------------
    const onTheme = () => { readPalette(); if (reduce) staticPose(); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) staticPose(); });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('themechange', onTheme);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}
