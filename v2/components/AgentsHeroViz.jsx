'use client';
import { useEffect, useRef } from 'react';

/**
 * AI-agents catalog hero visual — a sector radar. Three calibration rings hold
 * the catalog's three sectors (Logistics · Banking · Insurance); a sweep line
 * rotates and, as it passes each agent blip, the blip flares to life. The
 * radar reads the catalog: 140 agents across 3 sectors, continuously scanned.
 *
 * Ported from the "Hero Illustrations" Claude Design doc (panel 1D, "Sector
 * radar — industries on calibration rings"), re-fitted to the site conventions:
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - The rings, ticks, spokes, sweep and base blips are neutral schematic ink;
 *    amber is reserved for the resolution — the flare a blip takes the instant
 *    the sweep detects it, then fades. So amber lands sparingly, one or two
 *    detections at a time.
 *  - `prefers-reduced-motion` → resolved pose (sweep parked mid-scan with a
 *    couple of detections lit).
 *
 * Design space is a fixed 480×480 (matching the source doc's canvas), scaled
 * uniformly into the square slot.
 */
const SIZE = 480;
const PI2 = Math.PI * 2;
const RAD = Math.PI / 180;

const CX = 240, CY = 250;
const RINGS = [70, 115, 160];
const N_BLIPS = 27;
const SECTORS = [[-30, 'LOGISTICS'], [90, 'BANKING'], [210, 'INSURANCE']];

// deterministic hash → [0,1) (same generator as the source doc)
const hash = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function AgentsHeroViz({ className = '' }) {
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

    const mono = (px) => {
      ctx.font = `${px}px "Geist Mono Variable", ui-monospace, Menlo, monospace`;
      try { ctx.letterSpacing = '0.08em'; } catch (e) { /* older browsers */ }
    };

    // ---- the scene ----------------------------------------------------------
    const draw = (t) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.lineWidth = 1;

      // faint instrument grid, so the ground reads as a calibrated field
      ctx.fillStyle = inkA(0.025);
      for (let x = 20; x < SIZE; x += 24)
        for (let y = 20; y < SIZE; y += 24) ctx.fillRect(x, y, 1, 1);

      // concentric calibration rings (dashed)
      ctx.setLineDash([2, 6]); ctx.strokeStyle = inkA(0.10);
      RINGS.forEach((r) => { ctx.beginPath(); ctx.arc(CX, CY, r, 0, PI2); ctx.stroke(); });
      ctx.setLineDash([]);

      // outer bezel ticks — major every 30°
      for (let d = 0; d < 360; d += 6) {
        const a = d * RAD, maj = d % 30 === 0, len = maj ? 8 : 4;
        ctx.strokeStyle = inkA(maj ? 0.25 : 0.10);
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * 195, CY + Math.sin(a) * 195);
        ctx.lineTo(CX + Math.cos(a) * (195 - len), CY + Math.sin(a) * (195 - len));
        ctx.stroke();
      }

      // sector-dividing spokes
      ctx.strokeStyle = inkA(0.07);
      [-90, 30, 150].forEach((d) => {
        const a = d * RAD;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * 40, CY + Math.sin(a) * 40);
        ctx.lineTo(CX + Math.cos(a) * 185, CY + Math.sin(a) * 185);
        ctx.stroke();
      });

      // sector labels
      mono(9); ctx.textAlign = 'center'; ctx.fillStyle = inkA(0.42);
      SECTORS.forEach(([d, lb]) => {
        const a = d * RAD;
        ctx.fillText(lb, CX + Math.cos(a) * 218, CY + Math.sin(a) * 218 + 3);
      });

      // the sweep — trailing wedge + leading line (neutral)
      const sa = (t * 0.35) % PI2;
      ctx.fillStyle = inkA(0.05);
      ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, 193, sa - 0.5, sa); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = inkA(0.55);
      ctx.beginPath(); ctx.moveTo(CX, CY);
      ctx.lineTo(CX + Math.cos(sa) * 193, CY + Math.sin(sa) * 193); ctx.stroke();

      // agent blips — base dot in ink; amber flare as the sweep detects them
      for (let i = 0; i < N_BLIPS; i++) {
        const a0 = (-90 + (i % 3) * 120 + 10 + hash(i * 3) * 100) * RAD;
        const r = RINGS[Math.floor(hash(i * 5 + 1) * 3)];
        const x = CX + Math.cos(a0) * r, y = CY + Math.sin(a0) * r;
        const d = ((sa - a0) % PI2 + PI2) % PI2; // angle since the sweep passed
        const glow = Math.exp(-d * 3);
        ctx.fillStyle = inkA(0.30);
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, PI2); ctx.fill();
        if (glow > 0.04) {
          ctx.fillStyle = ambA(Math.min(0.9, glow));
          ctx.beginPath(); ctx.arc(x, y, 2, 0, PI2); ctx.fill();
          ctx.strokeStyle = ambA(glow * 0.5);
          ctx.beginPath(); ctx.arc(x, y, 3 + glow * 5, 0, PI2); ctx.stroke();
        }
      }

      // center crosshair, gently drifting
      const ox = reduce ? 0 : Math.sin(t * 0.25) * 5;
      const oy = reduce ? 0 : Math.cos(t * 0.2) * 5;
      ctx.strokeStyle = inkA(0.40);
      ctx.beginPath();
      ctx.moveTo(CX + ox - 8, CY + oy); ctx.lineTo(CX + ox + 8, CY + oy);
      ctx.moveTo(CX + ox, CY + oy - 8); ctx.lineTo(CX + ox, CY + oy + 8); ctx.stroke();
    };

    // ---- animation loop -----------------------------------------------------
    let raf = 0;
    let start = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      draw((now - start) / 1000);
    };

    // parked mid-scan, a couple of detections lit
    const staticPose = () => draw(2.4);

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners ----------------------------------------------------------
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
