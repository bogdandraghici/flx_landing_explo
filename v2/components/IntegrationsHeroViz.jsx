'use client';
import { useEffect, useRef } from 'react';

/**
 * Integrations hero visual — a 1:1 port of design variant "1a" (Node graph):
 * the systems you already run sit as peers around one hub. Six typed nodes
 * (CORE, DB, API, FILES, EMAIL, AI) ring a central FlowX hub, each wired in by
 * a gently-bowed edge, and a packet rides every edge inward — the estate
 * flowing together into a single journey.
 *
 * Two adaptations to this site's conventions:
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme.
 *  - The nodes, edges and travelling packets use the neutral schematic ink;
 *    brand amber is reserved for the *resolution* — the central FlowX hub the
 *    whole estate converges into — matching the "amber = resolution only" rule.
 *
 * Design space is a fixed 400×400 (the source canvas size), scaled uniformly to
 * fill the square slot, so nodes and labels keep their proportions.
 */
const SIZE = 400;
const PI2 = Math.PI * 2;
const NAMES = ['CORE', 'DB', 'API', 'FILES', 'EMAIL', 'AI'];
const VARY = [0, 12, -8, 10, -6, 4]; // per-node radius jitter (from the source)
const FROZEN_T = 2.2; // reduced-motion pose: packets spread along their edges

export default function IntegrationsHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', flow: '233, 236, 242', amber: '252, 184, 19', bg: '#0A0B0D' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.flow = get('--dia-bright', P.flow);
      P.amber = get('--amber-rgb', P.amber);
      P.bg = get('--bg', P.bg);
    };
    readPalette();

    const inkA = (a) => `rgba(${P.ink}, ${a})`;
    const flowA = (a) => `rgba(${P.flow}, ${a})`;
    const ambA = (a) => `rgba(${P.amber}, ${a})`;
    const bgSolid = () => (P.bg.startsWith('#') ? P.bg : `rgb(${P.bg})`);

    // ---- sizing / DPR / uniform scale into the 400×400 design space --------
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || SIZE;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round((rect.height || cssW) * dpr));
      const scale = cssW / SIZE; // square slot → uniform
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    size();

    // ---- primitives --------------------------------------------------------
    const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    // point along a quadratic bezier
    const qpt = (a, c, b, p) => {
      const q = 1 - p;
      return {
        x: q * q * a.x + 2 * q * p * c.x + p * p * b.x,
        y: q * q * a.y + 2 * q * p * c.y + p * p * b.y,
      };
    };
    const dot = (x, y, r, color, halo) => {
      if (halo) { ctx.beginPath(); ctx.arc(x, y, r + 4, 0, PI2); ctx.fillStyle = halo; ctx.fill(); }
      ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fillStyle = color; ctx.fill();
    };
    const label = (text, x, y, align, color) => {
      ctx.font = '9px ui-monospace, Menlo, monospace';
      ctx.textAlign = align || 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color || inkA(0.42);
      try { ctx.letterSpacing = '1.2px'; } catch (e) { /* Safari <17 */ }
      ctx.fillText(text, x, y);
    };
    // faint schematic dot-grid backdrop (from the source composition)
    const grid = () => {
      ctx.fillStyle = inkA(0.04);
      for (let x = 14; x < SIZE; x += 24) for (let y = 14; y < SIZE; y += 24) ctx.fillRect(x, y, 1.2, 1.2);
    };

    // FlowX mark (from `x logo.svg`) rendered at the hub — the X in schematic
    // ink (flips with the theme), the underscore bar in brand amber. `LOGO_C` is
    // the svg viewBox centre; the artwork is ~280 units tall in that space.
    const LOGO_C = 148, LOGO_H = 280, LOGO_FIT = 32; // fit the mark into ~32px
    const xPath = new Path2D('M181.031 89.0438L255.769 174.759H186.87L146.232 127.113L105.593 174.759H40.6643L115.169 89.9781L42.5329 8H111.665L150.202 53.0762L188.739 8H253.901L181.031 89.0438Z');
    const barPath = new Path2D('M255.769 231.28H40.4308V287.8H255.769V231.28Z');
    const drawLogo = (px, py) => {
      const s = LOGO_FIT / LOGO_H;
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(s, s);
      ctx.translate(-LOGO_C, -LOGO_C);
      ctx.fillStyle = inkA(0.92); ctx.fill(xPath);
      ctx.fillStyle = ambA(0.95); ctx.fill(barPath);
      ctx.restore();
    };

    // ---- the scene ---------------------------------------------------------
    const draw = (t) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      grid();

      const cx = SIZE / 2, cy = SIZE / 2;
      const hub = { x: cx, y: cy };
      const nodes = NAMES.map((n, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        const r = 138 + VARY[i];
        return { n, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, a };
      });

      // edges: a gently-bowed curve from each node to the hub, with one packet
      // riding inward along it (neutral schematic flow).
      nodes.forEach((nd, i) => {
        const mx = (nd.x + cx) / 2, my = (nd.y + cy) / 2, sgn = i % 2 ? 1 : -1;
        const px = -(cy - nd.y), py = cx - nd.x, pl = Math.hypot(px, py) || 1;
        const c = { x: mx + (px / pl) * 22 * sgn, y: my + (py / pl) * 22 * sgn };
        ctx.beginPath();
        ctx.moveTo(nd.x, nd.y);
        ctx.quadraticCurveTo(c.x, c.y, cx, cy);
        ctx.strokeStyle = flowA(0.14); ctx.lineWidth = 1; ctx.stroke();
        const p = ease((t * 0.12 + i * 0.17) % 1);
        const pt = qpt(nd, c, hub, p);
        dot(pt.x, pt.y, 2, flowA(0.9), flowA(0.12));
      });

      // hub — the resolution: the estate converges into one FlowX journey.
      // The disc is filled opaque so edges and packets that reach the centre
      // pass *under* it and never show over the logo.
      const ph = (t * 0.35) % 1;
      ctx.beginPath(); ctx.arc(cx, cy, 24 + ph * 38, 0, PI2);
      ctx.strokeStyle = ambA((1 - ph) * 0.24); ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 24, 0, PI2);
      ctx.fillStyle = bgSolid(); ctx.fill();  // opaque base — hides lines beneath
      ctx.fillStyle = ambA(0.06); ctx.fill(); // faint amber identity wash
      ctx.strokeStyle = ambA(0.65); ctx.stroke();
      drawLogo(cx, cy);

      // peripheral system nodes — neutral square terminals with a label.
      nodes.forEach((nd) => {
        ctx.fillStyle = bgSolid(); ctx.fillRect(nd.x - 6, nd.y - 6, 12, 12);
        ctx.strokeStyle = inkA(0.35); ctx.lineWidth = 1; ctx.strokeRect(nd.x - 5, nd.y - 5, 10, 10);
        label(nd.n, nd.x + Math.cos(nd.a) * 22, nd.y + Math.sin(nd.a) * 22, 'center');
      });
    };

    // ---- lifecycle ---------------------------------------------------------
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
