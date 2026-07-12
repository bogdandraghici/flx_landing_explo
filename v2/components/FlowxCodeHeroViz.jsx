'use client';
import { useEffect, useRef } from 'react';

/**
 * FlowX Code hero visual — a 1:1 port of design variant "4a" (Layers · terminal
 * panel, square): a natural-language request is typed into a terminal session at
 * the top, then each word falls onto its platform layer in the diamond stack
 * below. A binding sweep walks L0→L3; the bound word's tokens underline, a beam
 * drops from the sentence onto the active layer, and that layer's emitted
 * artifact (`+ process: onboarding`, …) lights up as the beam lands.
 *
 * Two adaptations to this site's conventions (matching AgentBuilderHeroViz):
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme. The source's white-alpha
 *    ink → `--ink`; its neutral accent → `--dia-bright` (kept neutral — no amber,
 *    consistent with the sibling agent-builder hero).
 *  - Reduced motion freezes on a resolved pose (sentence fully typed, L0 bound
 *    and landed) instead of animating.
 *
 * Design space is a fixed 520×520, scaled uniformly into the square slot so the
 * terminal panel, diamonds and labels keep the source's proportions.
 */
const SIZE = 520;
const PI2 = Math.PI * 2;

export default function FlowxCodeHeroViz({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) ----------------------------
    const P = { ink: '255, 255, 255', acc: '233, 236, 242' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      P.ink = get('--ink', P.ink);
      P.acc = get('--dia-bright', P.acc);
    };
    readPalette();

    const inkA = (a) => `rgba(${P.ink}, ${a})`; // source's wt()
    const accA = (a) => `rgba(${P.acc}, ${a})`; // source's acc() — kept neutral

    // ---- sizing / DPR / uniform scale into the 520×520 design space --------
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || SIZE;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round((rect.height || SIZE) * dpr));
      const scale = cssW / SIZE; // square slot → uniform
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    size();

    // ---- primitives (ported from the source component's helpers) -----------
    const mono = (s) => {
      ctx.font = (s || 10) + 'px ui-monospace, Menlo, monospace';
      try { ctx.letterSpacing = '0.1em'; } catch (e) {}
    };

    const dots = (w, h) => {
      ctx.fillStyle = inkA(0.04);
      for (let x = 20; x < w; x += 26) {
        for (let y = 20; y < h; y += 26) ctx.fillRect(x, y, 1, 1);
      }
    };

    const termChrome = (x, y, w2, h2, title) => {
      ctx.fillStyle = inkA(0.02);
      ctx.fillRect(x, y, w2, h2);
      ctx.strokeStyle = inkA(0.16);
      ctx.strokeRect(x, y, w2, h2);
      ctx.strokeStyle = inkA(0.08);
      ctx.beginPath(); ctx.moveTo(x, y + 26); ctx.lineTo(x + w2, y + 26); ctx.stroke();
      ctx.fillStyle = inkA(0.2);
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 15 + i * 12, y + 13, 2.5, 0, PI2); ctx.fill(); }
      mono(9);
      ctx.fillStyle = inkA(0.35);
      ctx.fillText(title, x + 50, y + 16);
    };

    const layerDefs = () => [
      { label: 'L0 PROCESS', out: 'process: onboarding' },
      { label: 'L1 STEPS', out: 'step: kyc-review' },
      { label: 'L2 RULES', out: 'rule: sanctions.v2' },
      { label: 'L3 DATA', out: 'model: customer' },
    ];
    const layerToks = () => [
      { s: 'Add' }, { s: 'KYC', tgt: 1 }, { s: 'review', tgt: 1 }, { s: 'with' }, { s: 'a' },
      { s: 'sanctions', tgt: 2 }, { s: 'rule', tgt: 2 }, { s: 'for' },
      { s: 'customer', tgt: 3 }, { s: 'onboarding', tgt: 0 },
    ];

    const diamondPath = (cx, yc, hw, hd) => {
      ctx.beginPath();
      ctx.moveTo(cx, yc - hd); ctx.lineTo(cx + hw, yc); ctx.lineTo(cx, yc + hd); ctx.lineTo(cx - hw, yc);
      ctx.closePath();
    };
    const layerRow = (cx, yc, hw, hd, act, hot) => {
      if (hot) {
        ctx.save();
        diamondPath(cx, yc, hw, hd); ctx.clip();
        ctx.strokeStyle = accA(0.15);
        for (let hx = cx - hw; hx < cx + hw; hx += 8) {
          ctx.beginPath(); ctx.moveTo(hx, yc - hd); ctx.lineTo(hx + hd, yc + hd); ctx.stroke();
        }
        ctx.restore();
      }
      ctx.strokeStyle = hot ? accA(0.85) : inkA(act ? 0.3 : 0.18);
      diamondPath(cx, yc, hw, hd); ctx.stroke();
    };
    const layerRails = (cx, hw, ys) => {
      ctx.strokeStyle = inkA(0.07);
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.moveTo(cx - hw, ys[j]); ctx.lineTo(cx - hw, ys[j + 1]);
        ctx.moveTo(cx + hw, ys[j]); ctx.lineTo(cx + hw, ys[j + 1]);
        ctx.stroke();
      }
    };

    // char-typed sentence with token underlines; returns bind groups + cursor pos
    const termSentence = (stoks, tx0, sy0, s, nCh, binding, k, wrapX, lineH) => {
      mono(s);
      const sp = ctx.measureText(' ').width;
      const groups = [null, null, null, null];
      let ci = 0, x = tx0, y = sy0, cur = { x: tx0, y: sy0 };
      for (const tk of stoks) {
        const wd = ctx.measureText(tk.s).width;
        if (wrapX && x + wd > wrapX) { x = tx0; y += lineH; }
        const shown = Math.max(0, Math.min(tk.s.length, nCh - ci));
        if (shown > 0) {
          const act = binding && tk.tgt === k;
          ctx.fillStyle = inkA(tk.tgt != null ? (act ? 0.95 : 0.6) : 0.35);
          ctx.fillText(tk.s.slice(0, shown), x, y);
          cur = { x: x + ctx.measureText(tk.s.slice(0, shown)).width, y };
          if (binding && tk.tgt != null && shown === tk.s.length) {
            ctx.strokeStyle = act ? accA(0.9) : inkA(0.16);
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x + wd, y + 6); ctx.stroke();
            const g = groups[tk.tgt];
            if (!g || g.y !== y) groups[tk.tgt] = { x0: x, x1: x + wd, y };
            else g.x1 = x + wd;
          }
        }
        ci += tk.s.length + 1;
        x += wd + sp;
      }
      return { groups, cur };
    };

    const beamTo = (gx, gy, ex, ey, cpx, cpy, frac) => {
      const drop = Math.min(1, frac / 0.6);
      const e = drop * drop * (3 - 2 * drop);
      for (let d = 0; d < 6; d++) {
        const u = e - d * 0.05;
        if (u <= 0) continue;
        const iu = 1 - u;
        const px = iu * iu * gx + 2 * iu * u * cpx + u * u * ex;
        const py = iu * iu * gy + 2 * iu * u * cpy + u * u * ey;
        ctx.fillStyle = accA(d === 0 ? 0.95 : 0.3 - d * 0.04);
        ctx.beginPath(); ctx.arc(px, py, d === 0 ? 2.2 : 1.4, 0, PI2); ctx.fill();
      }
    };

    const termPhases = (t) => {
      const c = t % 16;
      const binding = c > 4;
      const kp = (c - 4) * 0.55;
      const k = binding ? Math.floor(kp) % 4 : -1;
      const frac = binding ? kp % 1 : 0;
      return { c, binding, k, frac, landed: binding && frac > 0.62 };
    };

    // ---- 4a: prompt in a terminal panel above the stack --------------------
    const draw = (t) => {
      const w = SIZE, h = SIZE;
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      dots(w, h);
      mono(10);
      ctx.fillStyle = inkA(0.42);
      ctx.fillText('PLATFORM LAYERS', 28, 40);
      ctx.textAlign = 'right';
      ctx.fillText('FLOWX.CODE', w - 28, 40);
      ctx.textAlign = 'left';

      const { c, binding, k, frac, landed } = termPhases(t);
      const stoks = layerToks();
      const full = stoks.map((s) => s.s).join(' ');
      const nCh = Math.floor(Math.min(1, c / 3.2) * full.length);

      const px0 = 36, py0 = 58, pw = 448, ph = 122;
      termChrome(px0, py0, pw, ph, 'flowx code — session');
      if (binding) {
        mono(9);
        ctx.fillStyle = accA(0.6);
        ctx.textAlign = 'right';
        ctx.fillText('BIND · L' + k, px0 + pw - 12, py0 + 16);
        ctx.textAlign = 'left';
      }
      mono(11);
      const sy = py0 + 50;
      ctx.fillStyle = accA(0.9);
      ctx.fillText('>', px0 + 16, sy);
      const res = termSentence(stoks, px0 + 32, sy, 11, nCh, binding, k, px0 + pw - 14, 22);
      if (c < 3.4 && Math.sin(t * 5) > 0) {
        ctx.fillStyle = accA(0.9);
        ctx.fillRect(res.cur.x + 3, res.cur.y - 10, 6, 12);
      }

      const layers = layerDefs();
      const cx = 224, hw = 112, hd = 26, ys = [250, 318, 386, 454];
      layerRails(cx, hw, ys);
      layers.forEach((ly, j) => {
        layerRow(cx, ys[j], hw, hd, j === k, j === k && landed);
        mono(9);
        ctx.fillStyle = inkA(j === k ? 0.6 : 0.3);
        ctx.fillText(ly.label, 30, ys[j] + 3);
        mono(10);
        ctx.fillStyle = j === k ? accA(landed ? 0.9 : 0.5) : inkA(0.22);
        ctx.fillText('+ ' + ly.out, cx + hw + 14, ys[j] + 3);
      });

      const g = binding ? res.groups[k] : null;
      if (g) {
        const gx = (g.x0 + g.x1) / 2;
        beamTo(gx, g.y + 10, cx, ys[k] - hd + 4, (gx + cx) / 2, g.y + 70, frac);
      }
    };

    // ---- lifecycle ---------------------------------------------------------
    const FROZEN_T = 5.5; // resolved pose: sentence typed, L0 bound + landed
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
