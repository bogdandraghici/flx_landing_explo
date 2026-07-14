'use client';
import { useEffect, useRef } from 'react';

/**
 * ROI-Hub hero visual — the VERA grading ledger as an instrument. Agent-run
 * value entries tick into a RUN LEDGER one by one; the confidence engine
 * stamps each with its evidentiary tier (VERIFIED / MODELED / ASSUMED, one
 * tier per dollar); the GRADED TOTALS bars accumulate as rows land. The
 * resolution: the batch reconciles and the Verified total takes the amber
 * accent — credited conservatively, at the CI lower bound.
 *
 * Site conventions (same as the other hero canvases):
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - Ledger rows and bars are neutral schematic ink; amber is reserved for the
 *    Verified tier — the evidence-backed dollars.
 *  - `prefers-reduced-motion` → resolved pose (first batch, fully graded).
 *  - Batches are seeded per cycle (deterministic values and tiers).
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;

const N_ROWS = 7;
const T_ROW = 0.85; // seconds per ledger entry (arrive → stamp)
const T_RES = 0.6; // reconciliation beat
const HOLD = 3.2;
const FADE = 0.7;
const RUN = N_ROWS * T_ROW + T_RES;
const CYCLE = RUN + HOLD + FADE;

const TIERS = ['VERIFIED', 'MODELED', 'ASSUMED'];

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// a seeded batch of ledger entries for one cycle
function batch(cycleIdx) {
  const rnd = mulberry32(0x1ED6E2 ^ (cycleIdx * 0x9E3779B9));
  return Array.from({ length: N_ROWS }, () => {
    const r = rnd();
    const tier = r < 0.34 ? 0 : r < 0.72 ? 1 : 2; // verified / modeled / assumed
    return {
      id: `run ${4000 + Math.floor(rnd() * 900)}`,
      value: 240 + Math.floor(rnd() * 2200),
      tier,
    };
  });
}

const fmt = (n) => `€${Math.round(n).toLocaleString('en-US')}`;

export default function RoiHubHeroViz({ className = '' }) {
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

    const label = (text, x, y) => {
      ctx.font = mono(500, 10);
      ctx.fillStyle = inkA(0.34);
      ctx.textAlign = 'left';
      ctx.fillText(text, x, y);
    };
    const rule = (x1, x2, y, a = 0.08) => {
      ctx.strokeStyle = inkA(a); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    };

    // layout
    const L = 100, R = 540;
    const LED_Y = 120, ROW_H = 34;
    const TOT_Y = 430, TOT_ROW = 40;

    // tier chip colours: Verified is the amber thread; the rest are ink
    const tierStyle = (tier, a = 1) =>
      tier === 0
        ? { text: ambA(0.9 * a), stroke: ambA(0.5 * a) }
        : tier === 1
          ? { text: inkA(0.6 * a), stroke: inkA(0.28 * a) }
          : { text: inkA(0.34 * a), stroke: inkA(0.14 * a) };

    // ---- the scene -----------------------------------------------------------
    const draw = (t, fade, cycleIdx) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;
      ctx.textBaseline = 'alphabetic';

      const rows = batch(cycleIdx);
      const resolved = t >= RUN - 0.001;
      const pRes = easeOut(Math.min(Math.max((t - N_ROWS * T_ROW) / T_RES, 0), 1));

      // ---- RUN LEDGER
      label('RUN LEDGER', L, LED_Y - 18);
      rule(L, R, LED_Y - 8);

      const totals = [0, 0, 0];
      rows.forEach((row, i) => {
        const tRow = t - i * T_ROW;
        if (tRow <= 0) return;
        const y = LED_Y + 18 + i * ROW_H;
        const arrive = easeOut(Math.min(tRow / 0.3, 1));
        // entry: run id + value slide-settle in
        ctx.globalAlpha = fade * arrive;
        ctx.font = mono(500, 12);
        ctx.fillStyle = inkA(0.45); ctx.textAlign = 'left';
        ctx.fillText(row.id, L + (1 - arrive) * -10, y);
        ctx.font = mono(600, 12.5);
        ctx.fillStyle = inkA(0.75); ctx.textAlign = 'right';
        ctx.fillText(`+ ${fmt(row.value)}`, L + 250, y);
        ctx.globalAlpha = fade;

        // the stamp: lands at 0.55s with a rubber-stamp settle (scale 1.4 → 1)
        const tStamp = (tRow - 0.5) / 0.25;
        if (tStamp > 0) {
          const s = Math.min(tStamp, 1);
          const scale = 1.4 - 0.4 * easeOut(s);
          const st = tierStyle(row.tier, s);
          const cx = R - 62, cy = y - 4.5;
          const tw = 66 + (row.tier === 0 ? 6 : 0);
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(scale, scale);
          ctx.font = mono(600, 9.5);
          ctx.textAlign = 'center';
          ctx.strokeStyle = st.stroke; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.roundRect(-tw / 2, -9, tw, 17, 4); ctx.stroke();
          ctx.fillStyle = st.text;
          ctx.fillText(TIERS[row.tier], 0, 3.5);
          ctx.restore();
          if (s >= 1) totals[row.tier] += row.value;
        }
        if (i < N_ROWS - 1) rule(L, R, y + 11, 0.045);
      });

      // ---- GRADED TOTALS: three accumulating bars
      label('GRADED TOTALS', L, TOT_Y - 18);
      rule(L, R, TOT_Y - 8);
      const maxTotal = Math.max(rows.reduce((s, r) => s + (r.tier === 0 ? r.value : 0), 0),
        rows.reduce((s, r) => s + (r.tier === 1 ? r.value : 0), 0),
        rows.reduce((s, r) => s + (r.tier === 2 ? r.value : 0), 0), 1);
      const trackW = R - L - 200;
      TIERS.forEach((name, ti) => {
        const y = TOT_Y + 14 + ti * TOT_ROW;
        const st = tierStyle(ti, ti === 0 ? (0.55 + 0.45 * pRes) : 1);
        ctx.font = mono(500, 10);
        ctx.fillStyle = ti === 0 ? (pRes > 0 ? ambA(0.5 + 0.5 * pRes) : inkA(0.45)) : inkA(0.45);
        ctx.textAlign = 'left';
        ctx.fillText(name, L, y);
        // track + fill
        const bx = L + 100, bh = 9, by = y - 8;
        ctx.fillStyle = inkA(0.06);
        ctx.beginPath(); ctx.roundRect(bx, by, trackW, bh, 4.5); ctx.fill();
        const w = (totals[ti] / maxTotal) * trackW;
        if (w > 0) {
          ctx.fillStyle = ti === 0 ? ambA(0.42 + 0.4 * pRes) : inkA(ti === 1 ? 0.32 : 0.16);
          ctx.beginPath(); ctx.roundRect(bx, by, Math.max(w, bh), bh, 4.5); ctx.fill();
        }
        ctx.font = mono(600, 12);
        ctx.fillStyle = ti === 0 && pRes > 0 ? ambA(0.6 + 0.4 * pRes) : inkA(0.7);
        ctx.textAlign = 'right';
        ctx.fillText(fmt(totals[ti]), R, y);
      });

      // ---- resolution: the credit rule lands with the Verified accent
      if (pRes > 0) {
        const y = TOT_Y + 14 + 3 * TOT_ROW + 8;
        ctx.globalAlpha = fade * pRes;
        ctx.strokeStyle = ambA(0.45); ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(L, y - 14); ctx.lineTo(L + (R - L) * pRes, y - 14); ctx.stroke();
        ctx.font = mono(500, 10.5);
        ctx.fillStyle = inkA(0.42); ctx.textAlign = 'left';
        ctx.fillText('one tier per dollar · verified credited at the CI lower bound', L, y + 4);
        ctx.globalAlpha = fade;
      }

      ctx.globalAlpha = 1;
    };

    // ---- animation loop --------------------------------------------------------
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
      if (c < RUN + HOLD) draw(Math.min(c, RUN), 1, cycleIdx);
      else draw(RUN, 1 - (c - RUN - HOLD) / FADE, cycleIdx);
    };

    const staticPose = () => draw(RUN, 1, 0);

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners ----------------------------------------------------------------
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
