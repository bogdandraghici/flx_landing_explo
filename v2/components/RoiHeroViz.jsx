'use client';
import { useEffect, useRef } from 'react';

/**
 * ROI-calculator hero visual — the calculator's own story as an instrument:
 * "no black box, every number is traceable". Four INPUTS tick into place
 * (volume, cost per FTE, agents, automation rate), the CHAIN computes the
 * three methodology steps with real arithmetic (hourly → saved/run → gross),
 * a progress dot rides the left rail from inputs to result, and the annual
 * figure counts up and lands amber. Each cycle re-runs a different scenario.
 *
 * Site conventions (same as the other hero canvases):
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - Everything is neutral schematic ink; amber is reserved for the resolution
 *    (the final number landing).
 *  - `prefers-reduced-motion` → resolved pose (first scenario, fully computed).
 *  - The arithmetic is the calculator's actual model, so the instrument is
 *    honest: hourly = cost/1800 · saved = minutes × rate · gross = vol × 12 ×
 *    saved/60 × hourly.
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;

// rotating scenarios (plausible, deterministic — no randomness needed)
const SCENARIOS = [
  { cur: '€', vol: 12000, fte: 58000, agents: 6, mins: 38, rate: 0.75 },
  { cur: '$', vol: 4500, fte: 85000, agents: 9, mins: 52, rate: 0.7 },
  { cur: '£', vol: 28000, fte: 48000, agents: 4, mins: 21, rate: 0.8 },
];

// the calculator's real chain (see the methodology section on the page)
function compute(s) {
  const hourly = s.fte / 1800;
  const saved = s.mins * s.rate;
  const gross = s.vol * 12 * (saved / 60) * hourly;
  return { hourly, saved, gross };
}

// phase timing (seconds)
const T_IN = 2.0; // four inputs tick in, staggered
const T_ROW = 0.7; // per chain row
const T_RES = 1.4; // headline count-up
const HOLD = 4.0;
const FADE = 0.8;
const CYCLE = T_IN + 3 * T_ROW + T_RES + HOLD + FADE;

const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
const fmtM = (cur, n) =>
  n >= 1e6 ? `${cur}${(n / 1e6).toFixed(2)}M` : `${cur}${fmtInt(n / 1000)}k`;

export default function RoiHeroViz({ className = '' }) {
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

    const label = (text, x, y, align = 'left') => {
      ctx.font = mono(500, 10);
      ctx.fillStyle = inkA(0.34);
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };
    const rule = (x1, x2, y, a = 0.08) => {
      ctx.strokeStyle = inkA(a); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    };

    // ---- layout constants ----------------------------------------------------
    const L = 118, R = 544; // content bounds
    const RAIL = 92; // the left rail the progress dot rides
    const IN_Y = 138, IN_ROW = 78; // inputs 2×2
    const CH_Y = 348, CH_ROW = 44; // chain rows
    const RES_Y = 530; // headline

    // ---- the scene -----------------------------------------------------------
    // t is time within the cycle; fade is the end-of-cycle crossfade
    const draw = (t, fade, scen) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;
      ctx.textBaseline = 'alphabetic';

      const { hourly, saved, gross } = compute(scen);

      // progress through phases (0..1 each)
      const pIn = Math.min(t / T_IN, 1);
      const pRow = [0, 1, 2].map((i) =>
        Math.min(Math.max((t - T_IN - i * T_ROW) / T_ROW, 0), 1));
      const pRes = Math.min(Math.max((t - T_IN - 3 * T_ROW) / T_RES, 0), 1);
      const resolved = pRes >= 1;

      // ---- left rail + travelling progress dot (inputs → chain → result)
      ctx.strokeStyle = inkA(0.09); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(RAIL, IN_Y - 20); ctx.lineTo(RAIL, RES_Y + 14); ctx.stroke();
      const railTop = IN_Y - 20, railBot = RES_Y + 14;
      const prog = // overall progress along the rail
        (Math.min(t, T_IN) + pRow.reduce((s, p) => s + p * T_ROW, 0) + pRes * T_RES) /
        (T_IN + 3 * T_ROW + T_RES);
      const dotY = railTop + (railBot - railTop) * easeOut(Math.min(prog, 1));
      // the passed portion of the rail brightens
      ctx.strokeStyle = inkA(0.28); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(RAIL, railTop); ctx.lineTo(RAIL, dotY); ctx.stroke();
      ctx.fillStyle = resolved ? ambA(0.9) : inkA(0.6);
      ctx.beginPath(); ctx.arc(RAIL, dotY, 2.8, 0, Math.PI * 2); ctx.fill();

      // ---- INPUTS (2×2): each ticks in with a stagger
      label('INPUTS', L, IN_Y - 26);
      rule(L, R, IN_Y - 16);
      const inputs = [
        ['volume', `${fmtInt(scen.vol)} /mo`],
        ['cost per fte', `${scen.cur}${fmtInt(scen.fte / 1000)}k /yr`],
        ['agents', `${scen.agents} agents · ${scen.mins} min`],
        ['automation', `${Math.round(scen.rate * 100)}% automated`],
      ];
      inputs.forEach(([k, v], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = L + col * 224, y = IN_Y + 16 + row * IN_ROW;
        const p = easeOut(Math.min(Math.max((pIn * T_IN - i * 0.3) / 0.8, 0), 1));
        if (p <= 0) return;
        ctx.globalAlpha = fade * p;
        ctx.font = mono(500, 10); ctx.fillStyle = inkA(0.34); ctx.textAlign = 'left';
        ctx.fillText(k.toUpperCase(), x, y);
        ctx.font = mono(600, 17); ctx.fillStyle = inkA(0.78);
        // values "settle": the last few characters land one by one
        const shown = v.slice(0, Math.max(1, Math.round(v.length * p)));
        ctx.fillText(shown, x, y + 24);
        ctx.globalAlpha = fade;
      });

      // ---- CHAIN: the three methodology steps compute in order
      label('CHAIN', L, CH_Y - 26);
      rule(L, R, CH_Y - 16);
      const rows = [
        ['hourly cost', 'cost / 1,800 hrs', `${scen.cur}${hourly.toFixed(1)} /hr`, hourly],
        ['saved per run', 'Σ minutes × rate', `${saved.toFixed(1)} min`, saved],
        ['gross per year', 'vol × 12 × saved × hourly', fmtM(scen.cur, gross), gross],
      ];
      rows.forEach(([k, f, v, target], i) => {
        const y = CH_Y + 12 + i * CH_ROW;
        const p = pRow[i];
        if (p <= 0) return;
        ctx.globalAlpha = fade * Math.min(p * 3, 1);
        ctx.font = mono(500, 11); ctx.fillStyle = inkA(0.5); ctx.textAlign = 'left';
        ctx.fillText(k, L, y);
        ctx.font = mono(500, 10); ctx.fillStyle = inkA(0.26);
        ctx.fillText(f, L + 128, y);
        // the value counts up to its computed target
        ctx.font = mono(600, 14); ctx.fillStyle = inkA(0.82); ctx.textAlign = 'right';
        const cnt = target * easeOut(p);
        const disp = i === 2 ? fmtM(scen.cur, cnt) : i === 1 ? `${cnt.toFixed(1)} min` : `${scen.cur}${cnt.toFixed(1)} /hr`;
        ctx.fillText(p >= 1 ? v : disp, R, y);
        ctx.textAlign = 'left';
        if (i < 2) rule(L, R, y + 14, 0.05);
        ctx.globalAlpha = fade;
      });

      // ---- RESULT: the headline counts up and lands amber
      if (pRes > 0) {
        label('ANNUAL CAPACITY FREED', L, RES_Y - 30);
        rule(L, R, RES_Y - 20);
        const cnt = gross * easeOut(pRes);
        ctx.font = mono(700, 46);
        ctx.fillStyle = resolved ? ambA(1) : inkA(0.85);
        ctx.textAlign = 'left';
        ctx.fillText(fmtM(scen.cur, cnt), L, RES_Y + 28);
        // the traceability tag — the point of the whole page
        ctx.font = mono(500, 10.5);
        ctx.fillStyle = inkA(0.4);
        ctx.fillText('every figure traceable to the four inputs above', L, RES_Y + 52);
        // underline sweep as the number lands
        if (pRes > 0.5) {
          const uw = (R - L) * easeOut((pRes - 0.5) / 0.5);
          ctx.strokeStyle = resolved ? ambA(0.55) : inkA(0.2);
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(L, RES_Y + 38); ctx.lineTo(L + uw, RES_Y + 38); ctx.stroke();
        }
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
      const scen = SCENARIOS[Math.floor(el / CYCLE) % SCENARIOS.length];
      const c = el % CYCLE;
      const RUN = T_IN + 3 * T_ROW + T_RES;
      if (c < RUN + HOLD) draw(Math.min(c, RUN + HOLD), 1, scen);
      else draw(RUN, 1 - (c - RUN - HOLD) / FADE, scen);
    };

    const staticPose = () => draw(T_IN + 3 * T_ROW + T_RES, 1, SCENARIOS[0]);

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
