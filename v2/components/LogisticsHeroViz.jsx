'use client';
import { useEffect, useRef } from 'react';

/**
 * Logistics hero visual — the freight network as one mesh. Five parties
 * (shipper, broker, forwarder, carrier, 3PL) sit on a ring; curved edges wire
 * them together and packets stream along the edges — each packet an agent
 * handoff moving through the network. Nodes pulse with a faint expanding ring.
 *
 * Ported from the "Freight Agent Illustrations" claude.ai/design project
 * (panel 1B — Network mesh), retimed onto the site's schematic language.
 *
 * Site conventions:
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *    No opaque background fill: the page's own surface shows through, so it
 *    reads correctly in both themes.
 *  - Neutral schematic ink throughout; no amber — a mesh of ambient handoffs has
 *    no single "resolution" moment to accent, so it stays monochrome by design.
 *  - `prefers-reduced-motion` → a static, settled frame (t = 0).
 *
 * Design space is a fixed 520×520, scaled uniformly into the square slot.
 */
const SIZE = 520;
const PI2 = Math.PI * 2;

// nodes: [label, x-fraction, y-fraction]
const NODES = [
  ['SHIPPER', 0.5, 0.15],
  ['BROKER', 0.16, 0.44],
  ['FORWARDER', 0.84, 0.44],
  ['CARRIER', 0.28, 0.82],
  ['3PL', 0.72, 0.82],
];
// edges between node indices
const EDGES = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [1, 4], [2, 3]];

// deterministic hash → phase offsets, so the same "network" draws every load
const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function LogisticsHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', bg: '#0A0B0D' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.bg = get('--bg', P.bg);
    };
    readPalette();
    const inkA = (a) => `rgba(${P.ink}, ${a})`;

    // ---- sizing / DPR / uniform scale into the 520×520 design space --------
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

    // ---- geometry -----------------------------------------------------------
    const W = SIZE, H = SIZE;
    const pts = NODES.map((n) => [n[1] * W, n[2] * H]);
    const cx = W / 2, cy = H * 0.5;

    // control point for an edge's gentle bow toward the centre
    const ctrl = (a, b) => {
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      return [mx + (cx - mx) * 0.3, my + (cy - my) * 0.3];
    };
    // quadratic-bezier point at k along edge e
    const q = (e, k) => {
      const p0 = pts[e[0]], p1 = pts[e[1]], cp = ctrl(p0, p1), u = 1 - k;
      return [
        u * u * p0[0] + 2 * u * k * cp[0] + k * k * p1[0],
        u * u * p0[1] + 2 * u * k * cp[1] + k * k * p1[1],
      ];
    };

    const dot = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill(); };
    const ring = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.stroke(); };

    // ---- the scene ----------------------------------------------------------
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;

      // faint dot-grid texture (like the source's background lattice)
      ctx.fillStyle = inkA(0.035);
      for (let x = 26; x < W; x += 26) for (let y = 26; y < H; y += 26) ctx.fillRect(x, y, 1, 1);

      // slowly rotating boundary ring — the edge of the network
      ctx.setLineDash([2, 6]);
      ctx.lineDashOffset = -t * 8;
      ctx.strokeStyle = inkA(0.07);
      ring(cx, cy, W * 0.40);
      ctx.setLineDash([]);

      // edges + streaming packets (agent handoffs)
      EDGES.forEach((e, ei) => {
        const p0 = pts[e[0]], p1 = pts[e[1]], cp = ctrl(p0, p1);
        ctx.strokeStyle = inkA(0.09);
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.quadraticCurveTo(cp[0], cp[1], p1[0], p1[1]);
        ctx.stroke();
        for (const s of [0, 0.5]) {
          const k = (t * 0.09 + hash(ei * 13.7) + s) % 1;
          for (let m = 0; m < 4; m++) {
            const kk = k - m * 0.018;
            if (kk < 0) continue;
            const p = q(e, kk);
            ctx.fillStyle = inkA(0.85 * (1 - m / 4));
            dot(p[0], p[1], 2.3 - m * 0.45);
          }
        }
      });

      // nodes
      ctx.font = '500 10px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      pts.forEach((p, i) => {
        const pr = (t * 9 + i * 11) % 13, pa = 0.22 * (1 - pr / 13);
        ctx.strokeStyle = inkA(pa);
        ring(p[0], p[1], 15 + pr);          // expanding pulse ring
        ctx.fillStyle = P.bg;
        dot(p[0], p[1], 15);                // punch the node out of the edges
        ctx.strokeStyle = inkA(0.28);
        ring(p[0], p[1], 15);
        ctx.fillStyle = inkA(0.5 + 0.4 * Math.sin(t * 1.6 + i * 2.1));
        dot(p[0], p[1], 2.4);               // breathing core
        ctx.fillStyle = inkA(0.42);
        ctx.fillText(NODES[i][0], p[0], p[1] + 32);
      });

      // footnote
      ctx.textAlign = 'left';
      ctx.fillStyle = inkA(0.30);
      ctx.fillText('PACKETS = AGENT HANDOFFS', 56, H - 40);
    };

    // ---- animation loop ------------------------------------------------------
    let raf = 0;
    let start = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      draw((now - start) / 1000);
    };

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners -----------------------------------------------------------
    const onTheme = () => { readPalette(); if (reduce) draw(0); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) draw(0); });
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
