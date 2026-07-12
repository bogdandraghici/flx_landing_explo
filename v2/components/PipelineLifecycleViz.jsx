'use client';
import { useEffect, useRef } from 'react';

/**
 * Pipeline "lifecycle" instrument — a 1:1 port of design variant "5A" (LIFECYCLE):
 * a 21:9 figure where ONE graph plays through the four pipeline stages as staged
 * acts (rather than four side-by-side zones), looping:
 *
 *  01 DRAW     nodes/edges author themselves under a cursor
 *  02 COMPILE  a compile wipe passes; scattered nodes snap into ordered phase columns
 *  03 RUN      a playhead sweeps the phases left→right, lighting nodes + edges,
 *              dropping a checkpoint per phase onto a checkpointer timeline
 *  04 RESUME   the playhead rewinds to checkpoint 02 and replays forward
 *
 * Adaptations to this site's conventions (mirroring AgentBuilderHeroViz):
 *  - The source's neutral accent (#D8D8DA) maps to the theme's schematic-ink
 *    tokens so the whole figure stays monochrome-neutral and reads in both the
 *    dark default and the light-paper theme (repaints on `themechange`). No amber
 *    is introduced — the source treatment is neutral, and amber stays reserved
 *    for genuine resolution beats elsewhere on the page.
 *  - The source is a hero with copy overlaid at top + a step strip at the bottom;
 *    here we show only the illustration, so the vertical margins are rebalanced to
 *    centre the graph in the caption-less card.
 *  - Fluid: laid out from live pixel width/height, so it compresses horizontally.
 *  - Honors prefers-reduced-motion: freezes on the RUN act mid-execution (the
 *    compiled "running state machine" pose).
 */

const FROZEN_T = 23.5; // reduced-motion snapshot: RUN act, ~60% through

export default function PipelineLifecycleViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    // ink → structural strokes / labels (the source's rgba(255,255,255,x))
    // acc → the "live" accent (the source's neutral #D8D8DA); kept neutral here.
    const P = { ink: '255, 255, 255', acc: '233, 236, 242' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.acc = get('--dia-bright', P.acc);
    };
    readPalette();

    const W = (a) => `rgba(${P.ink}, ${a})`;
    const A = (a) => `rgba(${P.acc}, ${a})`;

    // ---- sizing / DPR ------------------------------------------------------
    let w = 0, h = 0;
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width || 800;
      h = rect.height || 343;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const pw = Math.round(w * dpr), ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    // ---- primitives --------------------------------------------------------
    const cub = (a, b, u) => {
      const cx = (a.x + b.x) / 2, m = 1 - u;
      return {
        x: m * m * m * a.x + 3 * m * m * u * cx + 3 * m * u * u * cx + u * u * u * b.x,
        y: m * m * m * a.y + 3 * m * m * u * a.y + 3 * m * u * u * b.y + u * u * u * b.y,
      };
    };
    const edgePartial = (a, b, frac, style) => {
      ctx.strokeStyle = style; ctx.lineWidth = 1; ctx.beginPath();
      const steps = 20, lim = Math.max(0.0001, frac);
      for (let i = 0; i <= steps * lim; i++) {
        const u = i / steps, p = cub(a, b, u);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    };

    const substrate = () => {
      ctx.fillStyle = W(0.045);
      const g = 24;
      for (let x = g / 2; x < w; x += g)
        for (let y = g / 2; y < h; y += g) ctx.fillRect(x, y, 1, 1);
    };

    // ---- the 5A "acts" instrument (one graph, four acts) -------------------
    const drawActs = (t) => {
      // rebalanced vertical margins: no overlaid title / bottom step strip here,
      // so the graph centres in the card with the checkpointer near the base.
      const pad = 46, top = 76, bot = h - 72, ckY = h - 36;
      const x0 = pad, x1 = w - pad;
      const phasesDef = [['S'], ['a', 'b'], ['c', 'd'], ['E']];
      const drawPos = { S: [0.05, 0.50], a: [0.30, 0.22], b: [0.23, 0.80], c: [0.56, 0.72], d: [0.66, 0.24], E: [0.95, 0.50] };
      const nodes = {};
      phasesDef.forEach((ph, k) => {
        const colx = 0.06 + 0.88 * (k / 3), cnt = ph.length;
        ph.forEach((id, j) => {
          const yy = 0.5 + (j - (cnt - 1) / 2) * 0.34;
          nodes[id] = { dx: x0 + (x1 - x0) * drawPos[id][0], dy: top + (bot - top) * drawPos[id][1], cx: x0 + (x1 - x0) * colx, cy2: top + (bot - top) * yy, ph: k };
        });
      });
      const edges = [['S', 'a'], ['S', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'c'], ['c', 'E'], ['d', 'E']];
      const colXs = [0, 1, 2, 3].map((k) => x0 + (x1 - x0) * (0.06 + 0.88 * k / 3));
      const cyc = (t * 0.11) % 4, act = Math.floor(cyc), f = cyc - act;

      // stage ticker top-right
      ctx.font = '10px ui-monospace,Menlo,monospace'; ctx.textAlign = 'right';
      ['01 DRAW', '02 COMPILE', '03 RUN', '04 RESUME'].forEach((s, i) => {
        ctx.fillStyle = i === act ? A(0.9) : W(0.24);
        ctx.fillText(s, x1, 24 + i * 15);
      });
      ctx.textAlign = 'left';

      const cur = (id) => {
        const n = nodes[id]; let s;
        if (act === 0) s = 0;
        else if (act === 1) { const wx = x0 + (x1 - x0) * f * 1.12; const r = Math.max(0, Math.min(1, (wx - n.dx) / ((x1 - x0) * 0.13))); s = r * r * (3 - 2 * r); }
        else s = 1;
        return { x: n.dx + (n.cx - n.dx) * s, y: n.dy + (n.cy2 - n.dy) * s, s };
      };
      let px = null, litX = -1e9, rewind = false;
      if (act === 2) { px = colXs[0] + (colXs[3] - colXs[0]) * f; litX = px; }
      if (act === 3) {
        if (f < 0.25) { px = colXs[3] + (colXs[1] - colXs[3]) * (f / 0.25); rewind = true; }
        else px = colXs[1] + (colXs[3] - colXs[1]) * ((f - 0.25) / 0.75);
        litX = px;
      }

      const dp = f * (edges.length + 1);
      edges.forEach(([u, v], i) => {
        const a = cur(u), b = cur(v);
        if (act === 0) {
          const fr = i < Math.floor(dp) ? 1 : (i === Math.floor(dp) ? dp - Math.floor(dp) : 0);
          if (fr > 0) edgePartial(a, b, Math.min(1, fr), W(0.15));
        } else {
          const lit = act >= 2 && nodes[u].cx <= litX && nodes[v].cx <= litX;
          ctx.lineWidth = 1; ctx.strokeStyle = lit ? A(0.3) : W(0.12);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.bezierCurveTo((a.x + b.x) / 2, a.y, (a.x + b.x) / 2, b.y, b.x, b.y); ctx.stroke();
          if (lit && !rewind) { const pu = (t * 0.5 + i * 0.23) % 1, p = cub(a, b, pu); ctx.fillStyle = A(0.9); ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill(); }
        }
      });
      Object.keys(nodes).forEach((id) => {
        const c = cur(id), n = nodes[id], se = id === 'S' || id === 'E', sz = se ? 13 : 10;
        const lit = act >= 2 && n.cx <= litX + 2;
        ctx.fillStyle = lit ? A(0.10 + 0.06 * Math.sin(t * 3 + id.charCodeAt(0))) : A(0.05);
        ctx.fillRect(c.x - sz / 2, c.y - sz / 2, sz, sz);
        ctx.lineWidth = 1; ctx.strokeStyle = lit ? A(0.85) : W(0.24); ctx.strokeRect(c.x - sz / 2, c.y - sz / 2, sz, sz);
        if (se) { ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.fillStyle = W(0.42); ctx.textAlign = 'center'; ctx.fillText(id === 'S' ? '[in]' : '[out]', c.x, c.y - sz / 2 - 6); ctx.textAlign = 'left'; }
      });
      if (act === 0 && dp < edges.length) {
        const [u, v] = edges[Math.floor(dp)];
        const p = cub(cur(u), cur(v), Math.min(1, dp - Math.floor(dp)));
        ctx.strokeStyle = A(0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x - 6, p.y); ctx.lineTo(p.x + 6, p.y); ctx.moveTo(p.x, p.y - 6); ctx.lineTo(p.x, p.y + 6); ctx.stroke();
        ctx.fillStyle = A(0.95); ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill();
      }
      if (act === 1) {
        const wx = x0 + (x1 - x0) * Math.min(1, f * 1.12);
        const gr = ctx.createLinearGradient(wx - 110, 0, wx, 0); gr.addColorStop(0, A(0)); gr.addColorStop(1, A(0.06));
        ctx.fillStyle = gr; ctx.fillRect(wx - 110, top - 8, 110, bot - top + 16);
        ctx.strokeStyle = A(0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wx, top - 10); ctx.lineTo(wx, bot + 10); ctx.stroke();
        ctx.fillStyle = A(0.95); ctx.fillRect(wx - 2, top - 12, 4, 4);
      }
      if (px !== null) {
        ctx.strokeStyle = rewind ? W(0.25) : A(0.6); ctx.lineWidth = 1;
        if (rewind) ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(px, top - 10); ctx.lineTo(px, ckY - 14); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = rewind ? W(0.4) : A(0.95); ctx.fillRect(px - 2, top - 12, 4, 4);
        ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.fillStyle = rewind ? W(0.4) : A(0.7);
        ctx.fillText(rewind ? '← rewind to ckpt 02' : (act === 3 ? 'replay →' : 'run →'), px + 6, top - 16);
      }
      if (act >= 2) {
        ctx.strokeStyle = W(0.10); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(colXs[0], ckY); ctx.lineTo(colXs[3], ckY); ctx.stroke();
        ctx.font = '9px ui-monospace,Menlo,monospace'; ctx.fillStyle = W(0.30); ctx.fillText('CHECKPOINTER', colXs[0], ckY + 18);
        for (let k = 0; k < 4; k++) {
          const prog = act === 3 ? 1.01 : f, tk = k / 3;
          if (prog < tk) continue;
          const dropU = act === 3 ? 1 : Math.max(0, Math.min(1, (prog - tk) * 7));
          if (dropU < 1) { const y = bot + (ckY - 10 - bot) * dropU; ctx.fillStyle = A(0.85); ctx.beginPath(); ctx.arc(colXs[k], y, 2, 0, 7); ctx.fill(); continue; }
          ctx.setLineDash([2, 5]); ctx.strokeStyle = W(0.06); ctx.beginPath(); ctx.moveTo(colXs[k], bot + 10); ctx.lineTo(colXs[k], ckY - 8); ctx.stroke(); ctx.setLineDash([]);
          const resumed = act === 3 && k === 1;
          ctx.save(); ctx.translate(colXs[k], ckY); ctx.rotate(Math.PI / 4);
          if (resumed) { ctx.fillStyle = A(0.95); ctx.fillRect(-4, -4, 8, 8); } else { ctx.strokeStyle = A(0.6); ctx.lineWidth = 1; ctx.strokeRect(-3, -3, 6, 6); }
          ctx.restore();
          if (resumed) { ctx.setLineDash([3, 4]); ctx.lineDashOffset = -t * 10; ctx.strokeStyle = A(0.6); ctx.beginPath(); ctx.arc(colXs[k], ckY, 10, 0, 7); ctx.stroke(); ctx.setLineDash([]); ctx.lineDashOffset = 0; }
        }
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      substrate();
      drawActs(t);
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
