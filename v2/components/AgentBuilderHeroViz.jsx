'use client';
import { useEffect, useRef } from 'react';

/**
 * Agent-builder hero visual — a 1:1 port of design variant "5a" (Builder canvas,
 * square): typed nodes wired into a small agent graph that builds itself
 * top-to-bottom. An Input feeds the Agent, which fans out to a Tool and a Memory,
 * and both converge on Output; each link is a live, flowing dashed wire dragged
 * into place until it snaps home, and the Output lights up once the graph lands.
 *
 * Two adaptations to this site's conventions:
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme.
 *  - The flow/wires/nodes use the neutral schematic ink; brand amber is reserved
 *    for the *resolution* (the wire snapping in + the Output node lighting up),
 *    matching the "amber = resolution only" rule.
 *
 * Design space is a fixed 640×640; it's scaled uniformly to fill the square slot,
 * so node cards and labels keep their proportions the way the source SVG did.
 */
const SIZE = 640;
const PI2 = Math.PI * 2;

export default function AgentBuilderHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', flow: '233, 236, 242', bg: '#0A0B0D' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => {
        const v = cs.getPropertyValue(name).trim();
        return v || fallback;
      };
      P.ink = get('--ink', P.ink);
      P.flow = get('--dia-bright', P.flow);
      P.bg = get('--bg', P.bg);
    };
    readPalette();

    const inkA = (a) => `rgba(${P.ink}, ${a})`;
    const flowA = (a) => `rgba(${P.flow}, ${a})`;

    // ---- sizing / DPR / uniform scale into the 640×640 design space --------
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

    // ---- primitives (from the source's gNode / gPort / bez) ----------------
    const bez = (a, c1, c2, b, t) => {
      const mt = 1 - t;
      return [
        mt * mt * mt * a[0] + 3 * mt * mt * t * c1[0] + 3 * mt * t * t * c2[0] + t * t * t * b[0],
        mt * mt * mt * a[1] + 3 * mt * mt * t * c1[1] + 3 * mt * t * t * c2[1] + t * t * t * b[1],
      ];
    };

    // rounded node card with header dot, title and hairline config rows.
    // `glow` is the accent the node lights with when active.
    const gNode = (n, glow) => {
      const { x, y, w, h, title } = n;
      const active = n.active;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 10);
      ctx.fillStyle = inkA(0.028); ctx.fill();
      if (active) {
        ctx.save();
        ctx.shadowColor = `rgba(${glow}, 0.45)`;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = `rgba(${glow}, 0.6)`;
        ctx.lineWidth = 1.25; ctx.stroke();
        ctx.restore();
      } else {
        ctx.strokeStyle = inkA(0.1); ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.fillStyle = active ? `rgba(${glow}, 1)` : inkA(0.32);
      ctx.beginPath(); ctx.arc(x + 16, y + 18, 3, 0, PI2); ctx.fill();
      ctx.font = '600 11px ui-monospace, Menlo, monospace';
      ctx.fillStyle = inkA(0.72);
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(title, x + 28, y + 18.5);
      ctx.strokeStyle = inkA(0.06); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + 12, y + 32.5); ctx.lineTo(x + w - 12, y + 32.5); ctx.stroke();
      const rows = n.rows || 2;
      for (let i = 0; i < rows; i++) {
        const ry = y + 44 + i * 15;
        if (ry + 5 > y + h - 8) break;
        ctx.fillStyle = inkA(0.11);
        ctx.beginPath(); ctx.roundRect(x + 14, ry, 18, 5, 2.5); ctx.fill();
        ctx.fillStyle = inkA(0.055);
        ctx.beginPath(); ctx.roundRect(x + 38, ry, w - 70, 5, 2.5); ctx.fill();
      }
      ctx.textBaseline = 'alphabetic';
    };

    const gPort = (p) => {
      ctx.fillStyle = P.bg.startsWith('#') ? P.bg : `rgb(${P.bg})`;
      ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, PI2); ctx.fill();
      ctx.strokeStyle = inkA(0.3); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, PI2); ctx.stroke();
    };

    // vertical-oriented control points (flow reads top-to-bottom)
    const ctrl = (a, b) => {
      const dy = b[1] - a[1];
      return [[a[0], a[1] + dy * 0.5], [b[0], b[1] - dy * 0.5]];
    };

    // progressively-drawn dashed connector (the "drag"); returns its control
    // points + current tip so packets and endpoints can ride the same curve.
    const wire = (from, to, ease, stroke, dashOffset) => {
      const [c1, c2] = ctrl(from, to);
      ctx.beginPath();
      const steps = 48, last = Math.max(1, Math.floor(steps * ease));
      for (let s = 0; s <= last; s++) {
        const tt = Math.min(s / steps, ease);
        const pt = bez(from, c1, c2, to, tt);
        if (s === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]);
      }
      ctx.save();
      ctx.setLineDash([4, 5]); ctx.lineDashOffset = dashOffset;
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
      return { c1, c2, tip: bez(from, c1, c2, to, ease) };
    };

    // travelling packets along a completed curve — "the flow keeps running"
    const packets = (from, c1, c2, to, phase, colA) => {
      const N = 2;
      for (let i = 0; i < N; i++) {
        const p = (phase + i / N) % 1;
        const pt = bez(from, c1, c2, to, p);
        const fade = Math.sin(p * Math.PI);
        const halo = ctx.createRadialGradient(pt[0], pt[1], 0, pt[0], pt[1], 9);
        halo.addColorStop(0, colA(0.3 * fade)); halo.addColorStop(1, colA(0));
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(pt[0], pt[1], 9, 0, PI2); ctx.fill();
        ctx.fillStyle = colA(0.95 * fade); ctx.beginPath(); ctx.arc(pt[0], pt[1], 2.6, 0, PI2); ctx.fill();
      }
    };

    // wire endpoint: a snapped port + resolution halo, or a live cursor tip +
    // dashed ghost target while still being dragged.
    const endpoint = (snapped, tip, target, colA) => {
      if (snapped) {
        gPort(target);
        const halo = ctx.createRadialGradient(target[0], target[1], 0, target[0], target[1], 12);
        halo.addColorStop(0, colA(0.32)); halo.addColorStop(1, colA(0));
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(target[0], target[1], 12, 0, PI2); ctx.fill();
      } else {
        const halo = ctx.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], 10);
        halo.addColorStop(0, colA(0.28)); halo.addColorStop(1, colA(0));
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(tip[0], tip[1], 10, 0, PI2); ctx.fill();
        ctx.fillStyle = colA(1); ctx.beginPath(); ctx.arc(tip[0], tip[1], 3, 0, PI2); ctx.fill();
        ctx.strokeStyle = inkA(0.16); ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.arc(target[0], target[1], 3.5, 0, PI2); ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    // ---- the scene ---------------------------------------------------------
    const draw = (t, frozen) => {
      const W = SIZE, H = SIZE;
      ctx.clearRect(0, 0, W, H);

      // a small agent graph, centred now that the palette rail is gone: an Input
      // feeds the Agent, which fans out to a Tool and a Memory, and both of those
      // converge on Output.
      const nInput  = { x: 230, y: 48,  w: 180, h: 64,  title: 'Input',  rows: 1 };
      const nAgent  = { x: 218, y: 238, w: 204, h: 104, title: 'Agent',  rows: 3, active: true };
      const nTool   = { x: 64,  y: 432, w: 168, h: 72,  title: 'Tool',   rows: 1 };
      const nMemory = { x: 408, y: 432, w: 168, h: 72,  title: 'Memory', rows: 1 };
      const nOutput = { x: 236, y: 558, w: 168, h: 64,  title: 'Output', rows: 1 };

      const outC  = (n) => [n.x + n.w / 2, n.y + n.h];
      const inC   = (n) => [n.x + n.w / 2, n.y];
      const outAt = (n, f) => [n.x + n.w * f, n.y + n.h];
      const inAt  = (n, f) => [n.x + n.w * f, n.y];

      // Edges grouped into build stages; a stage only starts once the previous one
      // has landed, so the graph assembles itself top-to-bottom. Within a stage,
      // the wires (the Agent's two fan-outs, the two converging inputs) draw in
      // together. Once the whole graph is home it holds for 5s before rebuilding.
      // (t is elapsed seconds, so the hold is a real 5s regardless of frame rate.)
      const stages = [
        [{ from: outC(nInput),        to: inC(nAgent) }],
        [{ from: outAt(nAgent, 0.32), to: inC(nTool) },
         { from: outAt(nAgent, 0.68), to: inC(nMemory) }],
        [{ from: outC(nTool),         to: inAt(nOutput, 0.3) },
         { from: outC(nMemory),       to: inAt(nOutput, 0.7) }],
      ];

      const easeInOut = (w) => (w < 0.5 ? 2 * w * w : 1 - Math.pow(-2 * w + 2, 2) / 2);
      const DRAG = 1.2, GAP = 0.5, HOLD = 5.0; // seconds
      const NST = stages.length;
      const CYCLE = (NST - 1) * (DRAG + GAP) + DRAG + HOLD;
      const c = t % CYCLE;
      const dash = -t * 8;
      const phase = (t * 0.3) % 1;

      // per-stage draw-in progress, whether it has snapped, and whether it shows yet
      const stageEase = stages.map((_, i) =>
        frozen ? 1 : easeInOut(Math.min(Math.max((c - i * (DRAG + GAP)) / DRAG, 0), 1)));
      const stageSnapped = stageEase.map((e) => e > 0.985);
      const stageShown = stages.map((_, i) => frozen || i === 0 || stageSnapped[i - 1]);

      // wires + travelling packets (flow keeps running on whatever is connected)
      stages.forEach((edges, i) => {
        if (!stageShown[i]) return;
        const ease = stageEase[i], snapped = stageSnapped[i];
        edges.forEach((e) => {
          e._w = wire(e.from, e.to, ease, snapped ? flowA(0.75) : flowA(0.6), dash);
          if (!frozen && snapped) packets(e.from, e._w.c1, e._w.c2, e.to, phase, flowA);
        });
      });

      // nodes — Agent is the always-on brain; Output lights as the last wires land
      nOutput.active = stageSnapped[NST - 1];
      gNode(nInput, P.flow); gNode(nAgent, P.flow);
      gNode(nTool, P.flow); gNode(nMemory, P.flow);
      gNode(nOutput, P.flow);

      // source ports + animated endpoints for every shown edge
      stages.forEach((edges, i) => {
        if (!stageShown[i]) return;
        const snapped = stageSnapped[i];
        edges.forEach((e) => {
          gPort(e.from);
          endpoint(snapped, e._w.tip, e.to, flowA);
        });
      });
    };

    // ---- lifecycle ---------------------------------------------------------
    let raf = 0;
    let start = 0;
    const frame = (now) => {
      if (!start) start = now;
      draw((now - start) / 1000, false); // elapsed seconds
      raf = requestAnimationFrame(frame);
    };

    const onTheme = () => { readPalette(); if (reduce) draw(0, true); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) draw(0, true); });
    ro.observe(canvas);

    if (reduce) {
      draw(0, true); // resolved pose, no motion
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
