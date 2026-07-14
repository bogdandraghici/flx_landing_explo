'use client';
import { useEffect, useRef } from 'react';

/**
 * Research hero visual — a results figure plotting itself. The money shot of
 * every paper is Figure 1: axes sweep in, trial points scatter across the
 * plot, a dashed baseline curve sweeps left-to-right, then the method curve
 * fits through the points — and the resolution is the delta bracket + readout
 * landing amber, with a confidence band settling around the fit. Each cycle
 * plots a different figure (task success ↑, hallucination rate ↓, verified
 * coverage ↑), echoing the series' claim: engineered and *measured*.
 *
 * Site conventions (same as the other hero canvases):
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - Axes, points and curves are neutral schematic ink; amber is reserved for
 *    the resolution (the delta bracket + readout).
 *  - `prefers-reduced-motion` → resolved pose (first figure, fully plotted).
 *  - Scatter jitter is seeded (deterministic); the deltas shown are computed
 *    from the curves, not hard-coded.
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;
const PI2 = Math.PI * 2;

// plot box
const PL = 118, PR = 548, PT = 172, PB = 466;

// rotating "experiments" — v(u) curves over u ∈ [0,1], values in [0,1]
const FIGS = [
  {
    code: 'FIG. 1', metric: 'TASK SUCCESS', note: 'n=1,240 runs · 95% CI', up: true,
    base: (u) => 0.38 + 0.10 * u,
    method: (u) => 0.38 + 0.34 * (1 - Math.exp(-2.6 * u)),
  },
  {
    code: 'FIG. 2', metric: 'HALLUCINATION RATE', note: 'n=8,600 samples · 95% CI', up: false,
    base: (u) => 0.62 - 0.06 * u,
    method: (u) => 0.62 - 0.42 * (1 - Math.exp(-2.2 * u)),
  },
  {
    code: 'FIG. 3', metric: 'VERIFIED COVERAGE', note: 'n=3,400 queries · 95% CI', up: true,
    base: (u) => 0.30 + 0.14 * u,
    method: (u) => 0.30 + 0.38 * Math.pow(u, 0.7),
  },
];

// timeline (seconds)
const T_AX = 0.7; // axes + grid sweep in
const T_PTS = 1.1; // scatter points pop in
const T_BASE = 0.9; // dashed baseline sweeps
const T_FIT = 1.1; // method curve fits through the points
const T_RES = 0.5; // delta bracket + readout land
const HOLD = 3.4;
const FADE = 0.7;
const RUN = T_AX + T_PTS + T_BASE + T_FIT + T_RES;
const CYCLE = RUN + HOLD + FADE;

const N_PTS = 22;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const X = (u) => PL + u * (PR - PL);
const Y = (v) => PB - v * (PB - PT);

export default function ResearchHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', amber: '252, 184, 19' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.amber = get('--amber-rgb', P.amber);
    };
    readPalette();
    const inkA = (a) => `rgba(${P.ink}, ${a})`;
    const ambA = (a) => `rgba(${P.amber}, ${a})`;

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

    const easeOut = (v) => 1 - Math.pow(1 - v, 3);
    const mono = (weight, px) => `${weight} ${px}px ui-monospace, Menlo, monospace`;

    // seeded scatter per figure: u positions + jitter around the method curve
    const scatter = FIGS.map((f, fi) => {
      const rnd = mulberry32(0x0F16 ^ (fi * 0x9E3779B9));
      return Array.from({ length: N_PTS }, () => {
        const u = 0.04 + rnd() * 0.92;
        const v = Math.min(0.98, Math.max(0.02, f.method(u) + (rnd() - 0.5) * 0.09));
        return { u, v };
      }).sort((a, b) => a.u - b.u);
    });

    // partial curve sweep: draws v(u) from u=0 to u=ease
    const sweep = (fn, ease, style, width, dashed) => {
      if (ease <= 0) return;
      ctx.save();
      if (dashed) ctx.setLineDash([4, 5]);
      ctx.strokeStyle = style; ctx.lineWidth = width;
      ctx.beginPath();
      const steps = 64, last = Math.max(1, Math.floor(steps * ease));
      for (let s = 0; s <= last; s++) {
        const u = Math.min(s / steps, ease);
        const px = X(u), py = Y(fn(u));
        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();
    };

    // ---- the scene -----------------------------------------------------------
    const draw = (t, fade, figIdx) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;
      ctx.textBaseline = 'alphabetic';

      const fig = FIGS[figIdx % FIGS.length];
      const pts = scatter[figIdx % FIGS.length];

      const pAx = easeOut(Math.min(t / T_AX, 1));
      const pPts = Math.min(Math.max((t - T_AX) / T_PTS, 0), 1);
      const pBase = easeOut(Math.min(Math.max((t - T_AX - T_PTS) / T_BASE, 0), 1));
      const pFit = easeOut(Math.min(Math.max((t - T_AX - T_PTS - T_BASE) / T_FIT, 0), 1));
      const pRes = easeOut(Math.min(Math.max((t - T_AX - T_PTS - T_BASE - T_FIT) / T_RES, 0), 1));
      const resolved = pRes >= 1;

      // ---- header / footer captions
      ctx.font = mono(500, 10.5);
      ctx.fillStyle = inkA(0.34); ctx.textAlign = 'left';
      ctx.fillText(`${fig.code} · ${fig.metric}${fig.up ? ' ↑' : ' ↓'}`, PL, PT - 34);
      ctx.strokeStyle = inkA(0.08); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PL, PT - 24); ctx.lineTo(PR, PT - 24); ctx.stroke();
      ctx.font = mono(500, 9.5);
      ctx.fillStyle = inkA(0.24);
      ctx.fillText(fig.note, PL, PB + 40);

      // ---- axes + grid (sweep in)
      ctx.strokeStyle = inkA(0.22); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PL, PB); ctx.lineTo(PL + (PR - PL) * pAx, PB); ctx.stroke(); // x
      ctx.beginPath(); ctx.moveTo(PL, PB); ctx.lineTo(PL, PB - (PB - PT) * pAx); ctx.stroke(); // y
      if (pAx > 0.4) {
        const ga = (pAx - 0.4) / 0.6;
        [0.25, 0.5, 0.75].forEach((v) => {
          ctx.strokeStyle = inkA(0.05 * ga);
          ctx.beginPath(); ctx.moveTo(PL, Y(v)); ctx.lineTo(PR, Y(v)); ctx.stroke();
          ctx.font = mono(500, 9);
          ctx.fillStyle = inkA(0.2 * ga); ctx.textAlign = 'right';
          ctx.fillText(String(Math.round(v * 100)), PL - 8, Y(v) + 3);
        });
        ctx.textAlign = 'left';
        // legend, top-right inside the plot
        const lx = PR - 128, ly = PT + 4;
        ctx.globalAlpha = fade * ga;
        ctx.setLineDash([4, 5]);
        ctx.strokeStyle = inkA(0.4);
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 20, ly); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = mono(500, 9.5); ctx.fillStyle = inkA(0.34);
        ctx.fillText('baseline', lx + 26, ly + 3);
        ctx.strokeStyle = inkA(0.75);
        ctx.beginPath(); ctx.moveTo(lx, ly + 16); ctx.lineTo(lx + 20, ly + 16); ctx.stroke();
        ctx.fillText('method', lx + 26, ly + 19);
        ctx.globalAlpha = fade;
      }

      // ---- scatter: trial points pop in staggered
      pts.forEach((p, i) => {
        const pp = easeOut(Math.min(Math.max((pPts * N_PTS - i) / 3, 0), 1));
        if (pp <= 0) return;
        ctx.fillStyle = inkA(0.3 * pp);
        ctx.beginPath(); ctx.arc(X(p.u), Y(p.v), 2.2 * pp, 0, PI2); ctx.fill();
      });

      // ---- confidence band settles around the fit as it resolves
      if (pRes > 0) {
        ctx.fillStyle = inkA(0.05 * pRes);
        ctx.beginPath();
        const steps = 48;
        for (let s = 0; s <= steps; s++) {
          const u = s / steps, w = 0.03 + 0.035 * u;
          const py = Y(Math.min(0.99, fig.method(u) + w));
          if (s === 0) ctx.moveTo(X(u), py); else ctx.lineTo(X(u), py);
        }
        for (let s = steps; s >= 0; s--) {
          const u = s / steps, w = 0.03 + 0.035 * u;
          ctx.lineTo(X(u), Y(Math.max(0.01, fig.method(u) - w)));
        }
        ctx.closePath(); ctx.fill();
      }

      // ---- curves: dashed baseline, then the method fit
      sweep(fig.base, pBase, inkA(0.4), 1.2, true);
      sweep(fig.method, pFit, inkA(0.8), 1.6, false);

      // ---- resolution: endpoint dot, delta bracket + readout land amber
      if (pRes > 0) {
        const bx = PR + 10;
        const yM = Y(fig.method(1)), yB = Y(fig.base(1));
        ctx.fillStyle = ambA(0.95 * pRes);
        ctx.beginPath(); ctx.arc(X(1), yM, 3, 0, PI2); ctx.fill();
        // square bracket spanning baseline→method at the right edge
        ctx.strokeStyle = ambA(0.6 * pRes); ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(bx, yB); ctx.lineTo(bx + 6, yB);
        ctx.moveTo(bx + 6, yB); ctx.lineTo(bx + 6, yM);
        ctx.moveTo(bx, yM); ctx.lineTo(bx + 6, yM);
        ctx.stroke();
        // the delta is computed from the curves — the figure is honest
        const d = ((fig.method(1) - fig.base(1)) / fig.base(1)) * 100;
        const disp = `${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}%`;
        ctx.font = mono(700, 17);
        ctx.fillStyle = resolved ? ambA(1) : ambA(0.7 * pRes);
        ctx.textAlign = 'left';
        ctx.fillText(disp, bx + 14, (yB + yM) / 2 - 2);
        ctx.font = mono(500, 9);
        ctx.fillStyle = inkA(0.38 * pRes);
        ctx.fillText('vs. baseline', bx + 14, (yB + yM) / 2 + 12);
      }

      ctx.globalAlpha = 1;
    };

    // ---- animation loop -------------------------------------------------------
    let raf = 0;
    let start = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      const el = (now - start) / 1000;
      const figIdx = Math.floor(el / CYCLE);
      const c = el % CYCLE;
      if (c < RUN + HOLD) draw(Math.min(c, RUN), 1, figIdx);
      else draw(RUN, 1 - (c - RUN - HOLD) / FADE, figIdx);
    };

    const staticPose = () => draw(RUN, 1, 0);

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners --------------------------------------------------------------
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
