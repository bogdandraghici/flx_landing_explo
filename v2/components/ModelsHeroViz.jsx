'use client';
import { useEffect, useRef } from 'react';

/**
 * Open-models hero visual — a generic "how an LLM works" instrument, in the
 * same schematic language as the other hero canvases but its own diagram:
 * autoregressive generation with attention. A PROMPT column of token chips on
 * the left; a COMPLETION column generates token by token on the right. As each
 * token forms, attention arcs draw in from the prompt tokens with varying
 * weights (line opacity = weight), the new token lands amber and settles to
 * neutral ink as generation moves on. When the completion is full it holds,
 * fades, and generates again.
 *
 * Site conventions:
 *  - Colours from theme tokens (repaints on `themechange`) — dark + light-paper.
 *  - Chips and arcs are neutral schematic ink; amber is reserved for the
 *    resolution — the token being generated and its single strongest
 *    attention line.
 *  - `prefers-reduced-motion` → resolved pose (completion full, last token's
 *    attention fan shown statically).
 *  - Seeded layout/weights (deterministic): the same "sentence" every load.
 *
 * Design space is a fixed 640×640, scaled uniformly into the square slot.
 */
const SIZE = 640;
const PI2 = Math.PI * 2;

const N_IN = 8; // prompt tokens
const N_OUT = 8; // completion tokens
const T_GEN = 0.8; // seconds per generated token
const HOLD = 3.4; // hold once the completion is full
const FADE = 0.8; // crossfade back to blank completion
const CYCLE = N_OUT * T_GEN + HOLD + FADE;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ModelsHeroViz({ className = '' }) {
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

    // ---- sizing / DPR / uniform scale into the 640×640 design space --------
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

    // ---- seeded "sentence": chip widths + attention weight matrix ----------
    const rnd = mulberry32(0x70CE2);
    const ROW0 = 150, ROW_H = 46, CHIP_H = 16;
    const IN_RIGHT = 218; // prompt chips right-align here
    const OUT_LEFT = 422; // completion chips left-align here
    const inputs = Array.from({ length: N_IN }, (_, i) => {
      const w = 52 + rnd() * 74;
      return { x: IN_RIGHT - w, y: ROW0 + i * ROW_H, w };
    });
    const outputs = Array.from({ length: N_OUT }, (_, i) => ({
      x: OUT_LEFT, y: ROW0 + i * ROW_H, w: 48 + rnd() * 78,
    }));
    // W[k][i]: how much output token k attends to prompt token i — a few
    // dominant heads per token, the rest faint (softmax-ish, normalized to max 1)
    const W = Array.from({ length: N_OUT }, () => {
      const raw = Array.from({ length: N_IN }, () => Math.pow(rnd(), 3));
      const max = Math.max(...raw);
      return raw.map((v) => v / max);
    });

    // ---- draw primitives ----------------------------------------------------
    const chip = (c, fill, stroke) => {
      ctx.beginPath(); ctx.roundRect(c.x, c.y, c.w, CHIP_H, 4);
      ctx.fillStyle = fill; ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
    };

    // attention arc: prompt chip edge → forming token edge, a flat horizontal
    // bezier; `ease` draws it in, alpha carries the weight
    const arc = (from, to, ease, style, width) => {
      const mx = (from[0] + to[0]) / 2;
      ctx.beginPath();
      ctx.moveTo(from[0], from[1]);
      if (ease >= 1) {
        ctx.bezierCurveTo(mx, from[1], mx, to[1], to[0], to[1]);
      } else {
        // trace partially along the curve
        const steps = 32, last = Math.max(1, Math.floor(steps * ease));
        for (let s = 1; s <= last; s++) {
          const t = (s / steps) * ease;
          const mt = 1 - t;
          const px = mt * mt * mt * from[0] + 3 * mt * mt * t * mx + 3 * mt * t * t * mx + t * t * t * to[0];
          const py = mt * mt * mt * from[1] + 3 * mt * mt * t * from[1] + 3 * mt * t * t * to[1] + t * t * t * to[1];
          ctx.lineTo(px, py);
        }
      }
      ctx.strokeStyle = style; ctx.lineWidth = width; ctx.stroke();
    };

    const label = (text, x, y) => {
      ctx.font = '500 10px ui-monospace, Menlo, monospace';
      ctx.fillStyle = inkA(0.34);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(text, x, y);
    };

    const easeOut = (v) => 1 - Math.pow(1 - v, 3);

    // ---- the scene ----------------------------------------------------------
    // k: tokens fully generated; p: progress (0..1) of the token being formed;
    // fade: global alpha for the end-of-cycle crossfade
    const draw = (k, p, fade, now) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = fade;

      label('PROMPT', inputs[0].x, ROW0 - 22);
      label('COMPLETION', OUT_LEFT, ROW0 - 22);
      // hairline under the labels, like the node-card header rule
      ctx.strokeStyle = inkA(0.08); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(96, ROW0 - 12); ctx.lineTo(IN_RIGHT, ROW0 - 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(OUT_LEFT, ROW0 - 12); ctx.lineTo(544, ROW0 - 12); ctx.stroke();

      const generating = k < N_OUT;
      const cur = generating ? outputs[k] : null;

      // prompt chips — during generation they brighten by their attention weight
      inputs.forEach((c, i) => {
        const w = generating ? W[k][i] : 0;
        const lift = generating ? easeOut(Math.min(p * 2, 1)) * w * 0.14 : 0;
        chip(c, inkA(0.075 + lift));
      });

      // attention fan for the forming token (drawn under the chips' text plane)
      if (generating) {
        const ease = easeOut(Math.min(p / 0.55, 1));
        const to = [cur.x, cur.y + CHIP_H / 2];
        const top = W[k].indexOf(Math.max(...W[k]));
        W[k].forEach((w, i) => {
          if (w < 0.06) return; // prune the noise floor
          const from = [IN_RIGHT, inputs[i].y + CHIP_H / 2];
          if (i === top) {
            arc(from, to, ease, ambA(0.42 * ease), 1.3); // strongest head = the resolution
          } else {
            arc(from, to, ease, inkA(0.05 + 0.16 * w), 1);
          }
        });
      }

      // completion chips — settled tokens in ink, the fresh one lands amber
      outputs.forEach((c, i) => {
        if (i < k) {
          // the most recent settled token cools off from amber to ink
          const cool = i === k - 1 && generating ? Math.max(0, 1 - p * 1.6) : 0;
          chip(c, inkA(0.09), cool > 0 ? ambA(0.35 * cool) : null);
        } else if (i === k && generating && p > 0.55) {
          const land = easeOut((p - 0.55) / 0.45);
          chip({ ...c, w: c.w * land }, ambA(0.3 * land), ambA(0.55 * land));
        } else if (i === k && generating) {
          // ghost slot + blinking caret while attention is still gathering
          ctx.setLineDash([2, 3]);
          chip(c, 'transparent', inkA(0.14));
          ctx.setLineDash([]);
          const blink = reduce ? 0.6 : 0.4 + 0.4 * Math.sin(now / 160);
          ctx.fillStyle = ambA(Math.max(0, blink));
          ctx.fillRect(c.x + 5, c.y + 3, 2, CHIP_H - 6);
        }
      });

      // full completion (hold phase): last token keeps a quiet amber accent
      if (!generating) {
        outputs.forEach((c) => chip(c, inkA(0.09)));
        chip(outputs[N_OUT - 1], ambA(0.22), ambA(0.4));
      }

      ctx.globalAlpha = 1;
    };

    // ---- animation loop ------------------------------------------------------
    let raf = 0;
    let start = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      const c = ((now - start) / 1000) % CYCLE;
      if (c < N_OUT * T_GEN) {
        draw(Math.floor(c / T_GEN), (c % T_GEN) / T_GEN, 1, now);
      } else if (c < N_OUT * T_GEN + HOLD) {
        draw(N_OUT, 0, 1, now);
      } else {
        draw(N_OUT, 0, 1 - (c - N_OUT * T_GEN - HOLD) / FADE, now);
      }
    };

    // resolved pose: completion full + the last token's attention fan, static
    const staticPose = () => {
      draw(N_OUT, 0, 1, 0);
      const to = [outputs[N_OUT - 1].x, outputs[N_OUT - 1].y + CHIP_H / 2];
      const top = W[N_OUT - 1].indexOf(Math.max(...W[N_OUT - 1]));
      W[N_OUT - 1].forEach((w, i) => {
        if (w < 0.06) return;
        const from = [IN_RIGHT, inputs[i].y + CHIP_H / 2];
        arc(from, to, 1, i === top ? ambA(0.42) : inkA(0.05 + 0.16 * w), i === top ? 1.3 : 1);
      });
    };

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners -----------------------------------------------------------
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
