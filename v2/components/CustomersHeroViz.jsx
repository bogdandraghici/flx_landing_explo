'use client';
import { useEffect, useRef } from 'react';

/**
 * Customers hero visual — a 1:1 port of design variant "2b" (Hub): FlowX at the
 * centre with the client roster boxed around it, work flowing both ways along
 * the spokes. Six anonymized client endpoints (matching the page's real, but
 * unattributed, roster) ring a central FlowX hub; each is wired in by a spoke a
 * packet rides — outward to even endpoints, inward from odd ones — and every box
 * carries a live agent count and a breathing status dot.
 *
 * Two adaptations to this site's conventions (same as the integrations hero):
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme.
 *  - The boxes, spokes and travelling packets use the neutral schematic ink;
 *    brand amber is reserved for the *resolution* — the central FlowX hub the
 *    whole roster converges on — matching the "amber = resolution only" rule.
 *
 * The source's aggregate footnote ("06 CLIENTS · 96 AGENTS · PROD") is dropped;
 * the per-box counts already carry that fact legibly.
 *
 * Design space is the source's 478×478 canvas, scaled uniformly to fill the
 * square slot, so boxes and labels keep their proportions.
 */
const SIZE = 478;
const PI2 = Math.PI * 2;
const FROZEN_T = 2.2; // reduced-motion pose: packets spread along their spokes

// anonymized roster (from the source composition) — sector labels, agent counts
const CLIENTS = [
  { name: 'GLOBAL BANK', n: 24 },
  { name: 'PAN-EU BANK', n: 17 },
  { name: 'CEE BANKING GROUP', n: 21 },
  { name: 'RETAIL BANK', n: 14 },
  { name: 'GLOBAL INSURER', n: 9 },
  { name: 'LIFE INSURER', n: 11 },
];

export default function CustomersHeroViz({ className = '' }) {
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

    // ---- sizing / DPR / uniform scale into the 478×478 design space --------
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

    // ---- primitives (shared with the integrations hero) --------------------
    const dot = (x, y, r, color, halo) => {
      if (halo) { ctx.beginPath(); ctx.arc(x, y, r + 4, 0, PI2); ctx.fillStyle = halo; ctx.fill(); }
      ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fillStyle = color; ctx.fill();
    };
    const text = (str, x, y, sizePx, alpha, align) => {
      ctx.font = `${sizePx}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = align || 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = inkA(alpha);
      try { ctx.letterSpacing = '0.6px'; } catch (e) { /* Safari <17 */ }
      ctx.fillText(str, x, y);
    };
    // faint schematic dot-grid backdrop
    const grid = () => {
      ctx.fillStyle = inkA(0.04);
      for (let x = 14; x < SIZE; x += 24) for (let y = 14; y < SIZE; y += 24) ctx.fillRect(x, y, 1.2, 1.2);
    };

    // FlowX mark (from `x logo.svg`) rendered at the hub — the X in schematic
    // ink (flips with the theme), the underscore bar in brand amber. `LOGO_C` is
    // the svg viewBox centre; the artwork is ~280 units tall in that space.
    const LOGO_C = 148, LOGO_H = 280, LOGO_FIT = 30; // fit the mark into ~30px
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
    const R = 168, bw = 148, bh = 40, HUB_R = 34;
    const draw = (t) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      grid();

      const cx = SIZE / 2, cy = SIZE / 2;
      const pos = CLIENTS.map((_, i) => {
        const a = -Math.PI / 2 + (i * PI2) / 6;
        return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
      });

      // spokes: hub → each box, one packet riding it (out to even, in from odd)
      pos.forEach(([bx, by], i) => {
        const dx = bx - cx, dy = by - cy, len = Math.hypot(dx, dy) || 1;
        const x1 = cx + (dx / len) * (HUB_R + 12), y1 = cy + (dy / len) * (HUB_R + 12);
        const x2 = bx - (dx / len) * (bh / 2 + 14), y2 = by - (dy / len) * (bh / 2 + 14);
        ctx.strokeStyle = flowA(0.13); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const u = (t * 0.2 + i * 0.17) % 1, out = i % 2 === 0;
        const uu = out ? u : 1 - u;
        dot(x1 + (x2 - x1) * uu, y1 + (y2 - y1) * uu, 2, flowA(0.9), flowA(0.12));
      });

      // client boxes — neutral terminals, name + live agent count + status dot.
      // Filled opaque so the spoke passes *under* the box and never shows over
      // the label.
      pos.forEach(([bx, by], i) => {
        const cli = CLIENTS[i];
        ctx.fillStyle = bgSolid(); ctx.fillRect(bx - bw / 2, by - bh / 2, bw, bh);
        ctx.strokeStyle = inkA(0.16); ctx.lineWidth = 1;
        ctx.strokeRect(bx - bw / 2 + 0.5, by - bh / 2 + 0.5, bw - 1, bh - 1);
        text(cli.name, bx, by - 4, cli.name.length > 14 ? 9.5 : 11, 0.85, 'center');
        text(String(cli.n).padStart(2, '0') + ' AGENTS LIVE', bx, by + 11, 8, 0.42, 'center');
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.1);
        dot(bx + bw / 2 - 10, by - bh / 2 + 10, 2, flowA(0.3 + 0.65 * pulse));
      });

      // hub — the resolution: the roster converges into one FlowX journey. The
      // disc is filled opaque so spokes and packets that reach the centre pass
      // *under* it and never show over the mark.
      const br = (t * 0.35) % 1;
      ctx.beginPath(); ctx.arc(cx, cy, HUB_R + br * 30, 0, PI2);
      ctx.strokeStyle = inkA((1 - br) * 0.22); ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, HUB_R, 0, PI2);
      ctx.fillStyle = bgSolid(); ctx.fill();   // opaque base — hides lines beneath
      ctx.fillStyle = inkA(0.03); ctx.fill();  // faint neutral wash
      ctx.strokeStyle = inkA(0.4); ctx.stroke();
      drawLogo(cx, cy);
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
