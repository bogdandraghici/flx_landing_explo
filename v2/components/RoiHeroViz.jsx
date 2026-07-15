'use client';
import { useEffect, useRef } from 'react';

/**
 * ROI-calculator hero visual — REDACTED SCHEMATIC (design 1a: "structure
 * without literal numbers"). Same instrument story as before — INPUTS feed a
 * CHAIN of methodology steps that resolve to the ANNUAL CAPACITY FREED — but
 * the figures themselves are redacted to blank bars, so the visual shows the
 * *shape* of the calculation ("no black box, every number is traceable")
 * without pinning it to any one scenario. Your real numbers land on the page,
 * not in the illustration.
 *
 * The MOTION is unchanged from the previous (numeric) version:
 *  - Four INPUTS tick into place, staggered.
 *  - The three CHAIN rows compute in order.
 *  - A progress dot rides the left rail from inputs → chain → result.
 *  - The ANNUAL figure resolves and lands amber, with an underline sweep.
 * Only the value slots differ: instead of counting numbers up, each redaction
 * bar wipes in; the result is an amber "your number" bar rather than a figure.
 *
 * Site conventions (same as the other hero canvases):
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - Everything is neutral schematic ink; amber is reserved for the resolution
 *    (the final "your number" bar landing).
 *  - `prefers-reduced-motion` → resolved pose (fully revealed schematic).
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;

// phase timing (seconds) — unchanged from the numeric version
const T_IN = 2.0; // four inputs tick in, staggered
const T_ROW = 0.7; // per chain row
const T_RES = 1.4; // result resolves
const HOLD = 4.0;
const FADE = 0.8;
const RUN = T_IN + 3 * T_ROW + T_RES;
const CYCLE = RUN + HOLD + FADE;

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
    // a redaction bar — the point of 1a: a value's *place* without its digits
    const bar = (x, y, w, h, amber = false) => {
      ctx.fillStyle = amber ? ambA(0.92) : inkA(0.14);
      ctx.beginPath();
      const ww = Math.max(0, w);
      if (ctx.roundRect) ctx.roundRect(x, y, ww, h, 2);
      else ctx.rect(x, y, ww, h);
      ctx.fill();
    };

    // ---- layout constants (unchanged) ---------------------------------------
    const L = 118, R = 544; // content bounds
    const RAIL = 92; // the left rail the progress dot rides
    const IN_Y = 138, IN_ROW = 78; // inputs 2×2
    const CH_Y = 348, CH_ROW = 44; // chain rows
    const RES_Y = 530; // result

    // redacted value widths (relative proportions carried from design 1a)
    const inputs = [
      ['VOLUME', 104],
      ['COST PER FTE', 82],
      ['AGENTS', 120],
      ['AUTOMATION', 92],
    ];
    const chain = [
      ['hourly cost', 'cost / hours', 64],
      ['saved per run', 'Σ minutes × rate', 52],
      ['gross per year', 'vol × 12 × saved × hourly', 74],
    ];
    const RES_BAR_W = 220;

    // ---- the scene -----------------------------------------------------------
    // t is time within the cycle; fade is the end-of-cycle crossfade
    const draw = (t, fade) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;
      ctx.textBaseline = 'alphabetic';

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
      const prog =
        (Math.min(t, T_IN) + pRow.reduce((s, p) => s + p * T_ROW, 0) + pRes * T_RES) / RUN;
      const dotY = railTop + (railBot - railTop) * easeOut(Math.min(prog, 1));
      ctx.strokeStyle = inkA(0.28); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(RAIL, railTop); ctx.lineTo(RAIL, dotY); ctx.stroke();
      ctx.fillStyle = resolved ? ambA(0.9) : inkA(0.6);
      ctx.beginPath(); ctx.arc(RAIL, dotY, 2.8, 0, Math.PI * 2); ctx.fill();

      // ---- INPUTS (2×2): label ticks in, redaction bar wipes in
      label('INPUTS', L, IN_Y - 26);
      rule(L, R, IN_Y - 16);
      inputs.forEach(([k, w], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = L + col * 224, y = IN_Y + 16 + row * IN_ROW;
        const p = easeOut(Math.min(Math.max((pIn * T_IN - i * 0.3) / 0.8, 0), 1));
        if (p <= 0) return;
        ctx.globalAlpha = fade * p;
        ctx.font = mono(500, 10); ctx.fillStyle = inkA(0.34); ctx.textAlign = 'left';
        ctx.fillText(k, x, y);
        bar(x, y + 12, w * p, 14);
        ctx.globalAlpha = fade;
      });

      // ---- CHAIN: the three methodology steps resolve in order
      label('CHAIN', L, CH_Y - 26);
      rule(L, R, CH_Y - 16);
      chain.forEach(([k, f, w], i) => {
        const y = CH_Y + 12 + i * CH_ROW;
        const p = pRow[i];
        if (p <= 0) return;
        ctx.globalAlpha = fade * Math.min(p * 3, 1);
        ctx.font = mono(500, 11); ctx.fillStyle = inkA(0.5); ctx.textAlign = 'left';
        ctx.fillText(k, L, y);
        ctx.font = mono(500, 10); ctx.fillStyle = inkA(0.26);
        ctx.fillText(f, L + 128, y);
        // the value slot: a redaction bar right-aligned to R, wiping in
        const bw = w * easeOut(p);
        bar(R - bw, y - 11, bw, 12);
        if (i < 2) rule(L, R, y + 14, 0.05);
        ctx.globalAlpha = fade;
      });

      // ---- RESULT: the "your number" bar resolves and lands amber
      if (pRes > 0) {
        label('ANNUAL CAPACITY FREED', L, RES_Y - 30);
        rule(L, R, RES_Y - 20);
        const rw = RES_BAR_W * easeOut(pRes);
        bar(L, RES_Y - 2, rw, 34, true);
        // the "← your number" caption fades in beside the bar
        if (pRes > 0.35) {
          ctx.globalAlpha = fade * Math.min((pRes - 0.35) / 0.4, 1);
          ctx.font = mono(500, 11); ctx.fillStyle = inkA(0.42); ctx.textAlign = 'left';
          ctx.fillText('← your number', L + RES_BAR_W + 14, RES_Y + 20);
          ctx.globalAlpha = fade;
        }
        // the traceability tag — the point of the whole page
        ctx.font = mono(500, 10.5);
        ctx.fillStyle = inkA(0.4);
        ctx.textAlign = 'left';
        ctx.fillText('every figure traceable to the four inputs above', L, RES_Y + 58);
        // amber underline sweep as the bar lands
        if (pRes > 0.5) {
          const uw = (R - L) * easeOut((pRes - 0.5) / 0.5);
          ctx.strokeStyle = resolved ? ambA(0.55) : inkA(0.2);
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(L, RES_Y + 40); ctx.lineTo(L + uw, RES_Y + 40); ctx.stroke();
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
      const c = el % CYCLE;
      if (c < RUN + HOLD) draw(Math.min(c, RUN + HOLD), 1);
      else draw(RUN, 1 - (c - RUN - HOLD) / FADE);
    };

    const staticPose = () => draw(RUN, 1);

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
