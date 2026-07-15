'use client';
import { useEffect, useRef } from 'react';

/**
 * Ontology hero visual — a 1:1 port of design variant "2a" (Field · Chaos →
 * model): a hundred scattered signals drift as unstructured noise, then assemble
 * into one coherent model — root, three hubs (products / rules / risk) and their
 * leaves — hold, and release, on a loop. Order out of noise.
 *
 * Two adaptations to this site's conventions (matching the sibling hero vizzes,
 * e.g. FlowxCodeHeroViz):
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme. The source's white-alpha
 *    ink → `--ink`; its signal accent → `--amber`. Here the accent only lights
 *    up as the model becomes coherent (settled hubs, the root, the pulse), so
 *    amber marks resolution — consistent with the single-accent convention.
 *  - Reduced motion freezes on the resolved pose (the coherent, fully-bound
 *    model with its edges drawn) instead of animating.
 *
 * Design space is a fixed 560×560, scaled uniformly into the square slot so the
 * field keeps the source's proportions.
 */
const SIZE = 560;
const PI2 = Math.PI * 2;

// Field layout (built once): root + three rings of 8 / 28 / 64 leaves, and the
// edges binding each ring to its parent. Seeds drive each node's drift.
function buildField() {
  const homes = [[280, 280]];
  const counts = [8, 28, 64];
  const rads = [60, 120, 180];
  counts.forEach((c, ri) => {
    for (let i = 0; i < c; i++) {
      const a = (i / c) * PI2 - Math.PI / 2 + ri * 0.2;
      homes.push([280 + Math.cos(a) * rads[ri], 280 + Math.sin(a) * rads[ri]]);
    }
  });
  const edges = [];
  for (let i = 0; i < 8; i++) edges.push([0, 1 + i]);
  for (let i = 0; i < 28; i++) edges.push([1 + Math.floor((i / 28) * 8), 9 + i]);
  for (let i = 0; i < 64; i++) edges.push([9 + Math.floor((i / 64) * 28), 37 + i]);
  const seeds = homes.map((h, i) => i * 17.13);
  return { homes, edges, seeds };
}

export default function OntologyHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { homes, edges, seeds } = buildField();

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', acc: '252, 184, 19' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.acc = get('--amber-rgb', P.acc);
    };
    readPalette();

    const inkA = (a) => `rgba(${P.ink}, ${a})`; // source's wh()
    const accA = (a) => `rgba(${P.acc}, ${a})`; // source's acc() — amber = resolution

    // ---- sizing / DPR / uniform scale into the 560×560 design space --------
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || SIZE;
      const cssH = rect.height || SIZE;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      const scale = cssW / SIZE; // square slot → uniform
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    size();

    // ---- primitives (ported from the source component's helpers) -----------
    const mono = (s, px, py, align, alpha, color) => {
      ctx.font = '10px ui-monospace, Menlo, monospace';
      try { ctx.letterSpacing = '1px'; } catch (e) {}
      ctx.textAlign = align || 'left';
      ctx.fillStyle = color || inkA(alpha == null ? 0.42 : alpha);
      ctx.fillText(s.toUpperCase(), px, py);
      try { ctx.letterSpacing = '0px'; } catch (e) {}
    };

    const grid = () => {
      ctx.fillStyle = inkA(0.04);
      for (let i = 22; i < SIZE; i += 28) {
        for (let j = 22; j < SIZE; j += 28) ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
      }
    };

    // ---- 2a: a hundred signals assemble into one coherent model ------------
    const draw = (t) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.textBaseline = 'alphabetic';
      grid();

      const T = 16;
      const p = (t / T) % 1;

      // each node lerps between a drifting free position and its settled home,
      // with a per-node assembly window offset by radial distance from centre
      const pos = homes.map((h, i) => {
        const s = seeds[i];
        const nx = 280 + Math.sin(s + t * 0.21) * 185 + Math.sin(s * 2.7 + t * 0.13) * 68;
        const ny = 280 + Math.cos(s * 1.3 + t * 0.17) * 185 + Math.cos(s * 3.1 + t * 0.11) * 68;
        const rr = Math.hypot(h[0] - 280, h[1] - 280) / 180;
        const a0 = 0.18 + rr * 0.14, a1 = a0 + 0.10;
        const d0 = 0.80 + rr * 0.06, d1 = d0 + 0.08;
        let m;
        if (p < a0) m = 0;
        else if (p < a1) m = (p - a0) / (a1 - a0);
        else if (p < d0) m = 1;
        else if (p < d1) m = 1 - (p - d0) / (d1 - d0);
        else m = 0;
        m = m * m * (3 - 2 * m);
        return [nx + (h[0] - nx) * m, ny + (h[1] - ny) * m, m];
      });

      // edges + query pulse only while the model is assembled
      const eA = Math.max(0, Math.min(1, (p - 0.34) / 0.08)) * Math.max(0, Math.min(1, (0.84 - p) / 0.06));
      if (eA > 0.01) {
        ctx.lineWidth = 1;
        edges.forEach((e) => {
          const a = pos[e[0]], b = pos[e[1]];
          ctx.strokeStyle = inkA(0.11 * eA * Math.min(a[2], b[2]));
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        });
        const ph = (t * 0.35) % 1;
        ctx.strokeStyle = accA(0.28 * (1 - ph) * eA);
        ctx.beginPath(); ctx.arc(280, 280, 14 + ph * 190, 0, PI2); ctx.stroke();
      }

      pos.forEach((q, i) => {
        if (i === 0) return;
        const hub = i < 9;
        ctx.fillStyle = hub && q[2] > 0.9 ? accA(0.85) : inkA(0.30 + q[2] * 0.22);
        ctx.beginPath(); ctx.arc(q[0], q[1], hub ? 2.2 : 1.4, 0, PI2); ctx.fill();
      });
      ctx.fillStyle = accA(0.35 + pos[0][2] * 0.55);
      ctx.beginPath(); ctx.arc(pos[0][0], pos[0][1], 3, 0, PI2); ctx.fill();

      const st = p > 0.34 && p < 0.88;
      mono(st ? 'MODEL · COHERENT' : 'SIGNALS · UNSTRUCTURED', 24, 536, 'left', 0.32, st ? accA(0.6) : null);
      mono('ONE SHARED MODEL', SIZE - 24, 536, 'right', 0.32);
    };

    // ---- lifecycle ---------------------------------------------------------
    const FROZEN_T = 9.6; // resolved pose: p≈0.6, model fully bound with edges
    let raf = 0;
    let start = 0;
    const frame = (now) => {
      if (!start) start = now;
      draw((now - start) / 1000); // elapsed seconds
      raf = requestAnimationFrame(frame);
    };

    const onTheme = () => { readPalette(); if (reduce) draw(FROZEN_T); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) draw(FROZEN_T); });
    ro.observe(canvas);

    if (reduce) {
      draw(FROZEN_T); // resolved pose, no motion
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
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}
