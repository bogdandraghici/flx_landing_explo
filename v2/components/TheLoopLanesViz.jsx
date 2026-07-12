'use client';
import { useEffect, useRef } from 'react';

/**
 * "The loop" figure — a 1:1 port of Claude Design variant "1B" (The Loop · Hero
 * Illustrations): a full-width timeline band where a single turn runs left→right
 * from REQUEST to ARTIFACT across four stacked lanes (GROUND / DRAFT / VALIDATE /
 * COMMIT). A playhead sweeps the band; each lane's blocks light as the head
 * enters them, and a HUMAN GATE (HOLD) marker sits at the end of the COMMIT lane
 * — the loop's stopping condition, on purpose. The four lanes mirror the four
 * step cards below it, so the figure reads as their timeline.
 *
 * Two adaptations to this site's conventions (matching FlowxCodeHeroViz):
 *  - Colours come from theme tokens (repaints on `themechange`). The source's
 *    white-alpha ink → `--ink`; its neutral accent (`#D8D8DA`) → `--dia-bright`,
 *    kept neutral (no amber), consistent with the sibling flowx-code hero.
 *  - Reduced motion freezes on a representative pose (playhead mid-VALIDATE)
 *    instead of animating.
 *
 * Unlike the square hero (uniformly scaled into a fixed design space), this band
 * renders at native pixel dimensions and lays everything out from live width, so
 * it compresses horizontally on smaller viewports while text stays at a legible
 * fixed size — per this repo's illustration convention.
 */
const PI2 = Math.PI * 2;

export default function TheLoopLanesViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', acc: '233, 236, 242', panel: '#0C0E11' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.acc = get('--dia-bright', P.acc);
      P.panel = get('--bg-panel', P.panel); // opaque box fill (hides the lane line)
    };
    readPalette();

    const inkA = (a) => `rgba(${P.ink}, ${a})`;  // source's _w()
    const accA = (a) => `rgba(${P.acc}, ${a})`;  // source's _a() — kept neutral

    const mono = (s) => {
      ctx.font = (s || 10) + 'px ui-monospace, Menlo, Consolas, monospace';
      try { ctx.letterSpacing = '1px'; } catch (e) {}
    };

    // ---- sizing / DPR (render at native CSS pixels, fluid width) -----------
    let W = 0, H = 0;
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const grid = (w, h) => {
      ctx.fillStyle = inkA(0.04);
      const g = 28;
      for (let x = g / 2; x < w; x += g) for (let y = g / 2; y < h; y += g) ctx.fillRect(x, y, 1, 1);
    };

    // ---- 1B: timeline lanes (ported from drawLanes) ------------------------
    const draw = (t) => {
      const w = W, h = H;
      ctx.clearRect(0, 0, w, h);
      grid(w, h);

      // labels ride on the boxes now, so no left gutter — the track fills the
      // width, with a modest inset both sides (compresses on narrow viewports).
      const padL = Math.max(44, Math.min(64, w * 0.045));
      const padR = Math.max(56, Math.min(96, w * 0.06));
      const x0 = padL, x1 = w - padR, aw = x1 - x0;
      const y0 = h * 0.26, y1 = h * 0.82, lh = (y1 - y0) / 4;
      const names = ['GROUND', 'DRAFT', 'VALIDATE', 'COMMIT'];
      const nums = ['01', '02', '03', '04'];
      const blocks = [[[0.03, 0.19]], [[0.23, 0.45], [0.49, 0.57]], [[0.55, 0.75]], [[0.82, 0.95]]];

      // ruler ticks
      ctx.strokeStyle = inkA(0.12); ctx.lineWidth = 1;
      for (let i = 0; i <= 20; i++) {
        const x = x0 + aw * i / 20; const long = (i % 5 === 0);
        ctx.beginPath(); ctx.moveTo(x, y0 - 22); ctx.lineTo(x, y0 - 22 + (long ? 10 : 5)); ctx.stroke();
      }
      mono(10); ctx.fillStyle = inkA(0.32); ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left'; ctx.fillText('REQUEST', x0, y0 - 34);
      ctx.textAlign = 'right'; ctx.fillText('ARTIFACT', x1, y0 - 34);

      const pp = (t * 0.075) % 1; const px = x0 + aw * pp;
      blocks.forEach((row, i) => {
        const ly = y0 + lh * i + lh / 2;
        // lane line first, so the opaque boxes below sit over it (not through it)
        ctx.strokeStyle = inkA(0.06); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x0, ly); ctx.lineTo(x1, ly); ctx.stroke();
        row.forEach((b) => {
          const bx = x0 + aw * b[0], bw = aw * (b[1] - b[0]);
          const active = pp >= b[0] && pp <= b[1];
          ctx.fillStyle = P.panel; ctx.fillRect(bx, ly - 13, bw, 26); // opaque base
          ctx.fillStyle = active ? accA(0.16) : inkA(0.05);
          ctx.fillRect(bx, ly - 13, bw, 26);
          ctx.strokeStyle = active ? accA(0.6) : inkA(0.12);
          ctx.strokeRect(bx + 0.5, ly - 12.5, bw - 1, 25);
          if (active) { ctx.fillStyle = accA(0.95); ctx.beginPath(); ctx.arc(px, ly, 3.2, 0, PI2); ctx.fill(); }
        });
        // stage label rides on the lane's first box
        const lx = x0 + aw * row[0][0] + 9;
        mono(10); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillStyle = inkA(0.42); ctx.fillText(nums[i], lx, ly);
        ctx.fillStyle = inkA(0.74); ctx.fillText(names[i], lx + ctx.measureText(nums[i]).width + 9, ly);
      });

      // playhead
      ctx.strokeStyle = accA(0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, y0 - 12); ctx.lineTo(px, y1 + 14); ctx.stroke();
      ctx.fillStyle = accA(0.9);
      ctx.beginPath(); ctx.moveTo(px, y0 - 12); ctx.lineTo(px - 5, y0 - 20); ctx.lineTo(px + 5, y0 - 20); ctx.closePath(); ctx.fill();

      // human gate marker at end of the commit lane
      const gx = x0 + aw * 0.955, gy = y0 + lh * 3 + lh / 2;
      ctx.strokeStyle = accA(0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, gy - 15); ctx.lineTo(gx, gy + 15); ctx.stroke();
      mono(9); ctx.fillStyle = accA(0.6); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText('HOLD', gx + 9, gy);

      mono(10); ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = inkA(0.3);
      ctx.fillText('t ' + pp.toFixed(3), x1, h - 22);
    };

    // ---- lifecycle ---------------------------------------------------------
    const FROZEN_T = 9; // playhead inside the VALIDATE block, clear of its label
    let raf = 0;
    let start = 0;
    const frame = (now) => {
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };

    const onTheme = () => { readPalette(); if (reduce) draw(FROZEN_T); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) draw(FROZEN_T); });
    ro.observe(canvas);

    if (reduce) {
      draw(FROZEN_T);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('themechange', onTheme);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
