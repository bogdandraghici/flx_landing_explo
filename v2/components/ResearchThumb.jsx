'use client';
import { useEffect, useRef } from 'react';

/**
 * Research card thumbnail — an animated schematic figure keyed to each paper's
 * thesis, drawn on a canvas. Ported from the "Article Thumbnails" Claude Design
 * project (seven `draw*` methods), one figure per paper, mapped by slug.
 *
 * Kept deliberately spare, in the spirit of the RAILS `graph` figure: each is a
 * single clean schematic + one animated element + one shared top-left caption.
 * The source project's legends, live counters, grade boxes and per-element label
 * stacks are dropped — that annotation density is what read as "too complex."
 *
 * Site conventions (same as ResearchHeroViz):
 *  - Colours route through theme tokens (`--ink`, `--bg-panel`) and the canvas
 *    background is left transparent, so the figures flip with light/dark. The
 *    import's neutral "signal" (its near-white accent) is kept neutral — the
 *    brightest ink — rather than re-tinted amber, so the set matches the import.
 *  - `prefers-reduced-motion` → a single populated static frame.
 *  - Off-screen cards pause via IntersectionObserver; DPR-aware sizing.
 *
 * Figures are drawn directly in CSS pixels using fractions of the card's own
 * width/height, so they compress horizontally while text stays a fixed,
 * legible size as the card narrows.
 */

// slug (researchData) → figure. Order matches the source project 1:1.
const FIGURE = {
  vera: 'roi',
  'orna-autotune': 'loop2',
  halo: 'harness',
  gavel: 'gov',
  sift: 'classifier',
  rails: 'graph',
  mneme: 'mneme',
};

// deterministic hash used for scattered-but-stable positions
const hs = (n) => Math.abs(Math.sin(n * 127.13) * 43758.54) % 1;

const mono = (ctx, s) => {
  ctx.font = `500 ${s || 9}px ui-monospace, Menlo, monospace`;
  try { ctx.letterSpacing = '1px'; } catch (e) { /* not all browsers */ }
};

const dots = (ctx, w, h, inkA) => {
  ctx.fillStyle = inkA(0.045);
  for (let x = 12; x < w; x += 22) for (let y = 12; y < h; y += 22) ctx.fillRect(x, y, 1, 1);
};

// One small top-left caption, in the RAILS style — the single label the whole
// set shares so each figure reads as one calm schematic, not an instrument panel.
const caption = (ctx, w, h, text, inkA) => {
  mono(ctx, 9);
  ctx.fillStyle = inkA(0.35);
  ctx.fillText(text, w * 0.07, h * 0.10);
};

/* ---- the seven figures (H = { inkA, sigA, panel }) --------------------- */

// 01 — observed vs counterfactual, with the measured gap and a drifting readout
function roi(ctx, w, h, t, { inkA, sigA }) {
  const y0 = h * 0.82, x0 = w * 0.10, x1 = w * 0.90;
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.10);
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
  const cf = (u) => y0 - h * 0.12 - h * 0.035 * Math.sin(u * 4 + 1);
  const ac = (u) => y0 - h * 0.12 - u * h * 0.34 - h * 0.04 * Math.sin(u * 7 + 2) - h * 0.025 * Math.sin(u * 13);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = x0 + u * (x1 - x0); i ? ctx.lineTo(X, ac(u)) : ctx.moveTo(X, ac(u)); }
  for (let i = 60; i >= 0; i--) { const u = i / 60; ctx.lineTo(x0 + u * (x1 - x0), cf(u)); }
  ctx.closePath(); ctx.fillStyle = sigA(0.07); ctx.fill();
  ctx.setLineDash([3, 4]); ctx.strokeStyle = inkA(0.30);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = x0 + u * (x1 - x0); i ? ctx.lineTo(X, cf(u)) : ctx.moveTo(X, cf(u)); }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = sigA(0.9);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const u = i / 60, X = x0 + u * (x1 - x0); i ? ctx.lineTo(X, ac(u)) : ctx.moveTo(X, ac(u)); }
  ctx.stroke();
  const p = (t * 0.07) % 1, px = x0 + p * (x1 - x0);
  ctx.fillStyle = sigA(0.9);
  ctx.beginPath(); ctx.arc(px, ac(p), 2.4, 0, 7); ctx.fill();
  caption(ctx, w, h, 'COUNTERFACTUAL LIFT', inkA);
}

// 02 — closed adaptation loop: four unlabeled stages, a comet lighting each
function loop2(ctx, w, h, t, { inkA, sigA }) {
  const cx = w * 0.5, cy = h * 0.54, rx = w * 0.24, ry = h * 0.27;
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.12);
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.stroke();
  const ang = t * 0.6;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  angles.forEach((a) => {
    const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
    let d = Math.abs(((ang - a) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    d = Math.min(d, Math.PI * 2 - d);
    const on = d < 0.5;
    if (on) {
      ctx.strokeStyle = sigA(0.5 * (1 - d / 0.5));
      ctx.beginPath(); ctx.arc(x, y, 9 + d * 8, 0, 7); ctx.stroke();
    }
    ctx.fillStyle = on ? sigA(0.95) : inkA(0.5);
    ctx.fillRect(x - 3, y - 3, 6, 6);
  });
  for (let k = 0; k < 12; k++) {
    const a = ang - k * 0.05;
    const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
    ctx.fillStyle = sigA(0.9 * (1 - k / 12));
    ctx.beginPath(); ctx.arc(x, y, k ? 1.1 : 2.4, 0, 7); ctx.fill();
  }
  caption(ctx, w, h, 'CLOSED ADAPTATION LOOP', inkA);
}

// 03 — verification harness: model → three gates → grounded out, some abstain
function harness(ctx, w, h, t, { inkA, sigA }) {
  const y = h * 0.50;
  const bx = w * 0.08, bw = w * 0.15, bh = h * 0.28, by = y - bh / 2;
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.25);
  ctx.strokeRect(bx + 0.5, by + 0.5, bw, bh);
  ctx.strokeStyle = sigA(0.45);
  ctx.beginPath();
  for (let i = 0; i <= 30; i++) {
    const X = bx + 4 + (i / 30) * (bw - 8);
    const Y = y + Math.sin(i * 0.9 + t * 5) * bh * 0.16 * (0.6 + 0.4 * Math.sin(i * 2.3 + t * 3));
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  }
  ctx.stroke();
  const xEnd = w * 0.92;
  ctx.strokeStyle = inkA(0.08);
  ctx.beginPath(); ctx.moveTo(bx + bw, y); ctx.lineTo(xEnd, y); ctx.stroke();
  const gates = [w * 0.46, w * 0.68];
  const gLast = gates[gates.length - 1];
  const gh = h * 0.15;
  gates.forEach((gx) => {
    ctx.strokeStyle = inkA(0.22);
    ctx.beginPath(); ctx.moveTo(gx, y - gh); ctx.lineTo(gx, y + gh); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gx - 4, y - gh); ctx.lineTo(gx + 4, y - gh);
    ctx.moveTo(gx - 4, y + gh); ctx.lineTo(gx + 4, y + gh);
    ctx.stroke();
  });
  const binX = w * 0.80, binY = h * 0.74;
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = inkA(0.20);
  ctx.strokeRect(binX + 0.5, binY + 0.5, w * 0.12, h * 0.14);
  ctx.setLineDash([]);
  for (let k = 0; k < 2; k++) {
    const tt = t * 0.28 - k * 0.5;
    if (tt < 0) continue;
    const id = Math.floor(tt), p = tt - id;
    const abst = hs(id * 3 + 1) > 0.7;
    let px = bx + bw + p * (xEnd - bx - bw), py = y, hollow = false;
    if (abst && px > gLast) {
      const q = Math.min(1, (px - gLast) / (xEnd - gLast));
      px = gLast + q * (binX + w * 0.06 - gLast);
      py = y + q * q * (binY + h * 0.07 - y);
      hollow = true;
    }
    gates.forEach((gx) => {
      if (Math.abs(bx + bw + p * (xEnd - bx - bw) - gx) < 5) {
        ctx.strokeStyle = sigA(0.8);
        ctx.beginPath(); ctx.moveTo(gx, y - gh); ctx.lineTo(gx, y + gh); ctx.stroke();
      }
    });
    if (hollow) {
      ctx.strokeStyle = sigA(0.8);
      ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.stroke();
    } else {
      ctx.fillStyle = sigA(0.9);
      ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.fill();
    }
  }
  ctx.fillStyle = inkA(0.5);
  ctx.fillRect(xEnd - 3, y - 3, 6, 6);
  caption(ctx, w, h, 'LAYERED OVERSIGHT', inkA);
}

// 04 — a policy line sweeping telemetry lanes, checking each event it passes
function gov(ctx, w, h, t, { inkA, sigA }) {
  const x0 = w * 0.10, x1 = w * 0.92;
  ctx.lineWidth = 1;
  const p = (t * 0.055) % 1, px = x0 + p * (x1 - x0);
  for (let i = 0; i < 3; i++) {
    const y = h * (0.34 + i * 0.16);
    ctx.strokeStyle = inkA(0.07);
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (let j = 0; j < 3; j++) {
      const u = hs(i * 17.3 + j * 3.1);
      const ex = x0 + u * (x1 - x0);
      ctx.strokeStyle = inkA(0.35);
      ctx.beginPath(); ctx.moveTo(ex, y - 3); ctx.lineTo(ex, y + 3); ctx.stroke();
      if (ex < px) {
        ctx.strokeStyle = sigA(0.7);
        ctx.strokeRect(ex - 3.5, y - 3.5, 7, 7);
      }
    }
  }
  ctx.strokeStyle = sigA(0.55);
  ctx.beginPath(); ctx.moveTo(px, h * 0.20); ctx.lineTo(px, h * 0.82); ctx.stroke();
  ctx.fillStyle = sigA(0.9);
  ctx.beginPath(); ctx.moveTo(px - 4, h * 0.20); ctx.lineTo(px + 4, h * 0.20); ctx.lineTo(px, h * 0.20 + 5); ctx.closePath(); ctx.fill();
  caption(ctx, w, h, 'RUNTIME POLICY', inkA);
}

// 05 — cost-tiered router: input fans to three tiers, through a frozen gate
function classifier(ctx, w, h, t, { inkA, sigA }) {
  const yc = h * 0.50, xIn = w * 0.06, xSplit = w * 0.30, xMerge = w * 0.44, gateX = w * 0.72, xEnd = w * 0.92;
  const tierY = [h * 0.26, h * 0.50, h * 0.74];
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.08);
  ctx.beginPath(); ctx.moveTo(xIn, yc); ctx.lineTo(xSplit, yc); ctx.stroke();
  tierY.forEach((y) => {
    ctx.strokeStyle = inkA(0.08);
    ctx.beginPath();
    ctx.moveTo(xSplit, yc);
    ctx.bezierCurveTo(xSplit + 22, yc, xMerge - 22, y, xMerge, y);
    ctx.lineTo(xEnd, y);
    ctx.stroke();
  });
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = inkA(0.28);
  ctx.beginPath(); ctx.moveTo(gateX, h * 0.18); ctx.lineTo(gateX, h * 0.82); ctx.stroke();
  ctx.setLineDash([]);
  for (let k = 0; k < 2; k++) {
    const tt = t * 0.30 - k * 0.45;
    if (tt < 0) continue;
    const id = Math.floor(tt), p = tt - id;
    const tier = Math.floor(hs(id * 7 + 2) * 3);
    let px, py;
    if (p < 0.35) { const q = p / 0.35; px = xIn + q * (xSplit - xIn); py = yc; }
    else if (p < 0.55) {
      const q = (p - 0.35) / 0.2;
      px = xSplit + q * (xMerge - xSplit);
      py = yc + (tierY[tier] - yc) * (q * q * (3 - 2 * q));
    } else { const q = (p - 0.55) / 0.45; px = xMerge + q * (xEnd - xMerge); py = tierY[tier]; }
    if (Math.abs(px - gateX) < 5) {
      ctx.strokeStyle = sigA(0.8);
      ctx.beginPath(); ctx.moveTo(gateX, h * 0.18); ctx.lineTo(gateX, h * 0.82); ctx.stroke();
    }
    ctx.fillStyle = tier === 2 ? sigA(0.95) : inkA(0.6);
    ctx.fillRect(px - 3, py - 4, 6, 8);
  }
  caption(ctx, w, h, 'COST-TIERED ROUTING', inkA);
}

// 06 — deterministic state machine, one bounded stochastic node
function graph(ctx, w, h, t, { inkA, sigA, panel }) {
  const N = { a: [w * 0.07, h * 0.5], b: [w * 0.27, h * 0.28], c: [w * 0.27, h * 0.72], d: [w * 0.5, h * 0.5], e: [w * 0.73, h * 0.28], f: [w * 0.73, h * 0.72], g: [w * 0.93, h * 0.5] };
  const edges = [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'], ['d', 'e'], ['d', 'f'], ['e', 'g'], ['f', 'g']];
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.13);
  edges.forEach((ed) => {
    const p1 = N[ed[0]], p2 = N[ed[1]];
    ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
  });
  const dw = 52, dh = 38, D = N.d;
  ctx.fillStyle = panel;
  ctx.fillRect(D[0] - dw / 2, D[1] - dh / 2, dw, dh);
  ctx.strokeStyle = inkA(0.28);
  ctx.strokeRect(D[0] - dw / 2 + 0.5, D[1] - dh / 2 + 0.5, dw, dh);
  ctx.strokeStyle = sigA(0.7);
  const c = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  c.forEach((cc) => {
    const X = D[0] + cc[0] * dw / 2, Y = D[1] + cc[1] * dh / 2;
    ctx.beginPath();
    ctx.moveTo(X, Y + cc[1] * -6); ctx.lineTo(X, Y); ctx.lineTo(X + cc[0] * -6, Y);
    ctx.stroke();
  });
  ctx.strokeStyle = sigA(0.5);
  ctx.beginPath();
  for (let i = 0; i <= 24; i++) {
    const X = D[0] - dw / 2 + 6 + (i / 24) * (dw - 12);
    const Y = D[1] + Math.sin(i * 1.3 + t * 6) * dh * 0.2 * Math.sin(i * 0.5 + t * 2.2);
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  }
  ctx.stroke();
  mono(ctx, 9);
  ctx.fillStyle = inkA(0.40);
  ctx.fillText('LLM · TYPED', D[0] - ctx.measureText('LLM · TYPED').width / 2, D[1] + dh / 2 + 14);
  for (const k in N) {
    if (k === 'd') continue;
    const p = N[k];
    ctx.fillStyle = panel;
    ctx.fillRect(p[0] - 4, p[1] - 4, 8, 8);
    ctx.strokeStyle = inkA(0.45);
    ctx.strokeRect(p[0] - 3.5, p[1] - 3.5, 7, 7);
  }
  const routes = [['a', 'b', 'd', 'e', 'g'], ['a', 'c', 'd', 'f', 'g']];
  const cyc = t * 0.22;
  const route = routes[Math.floor(cyc) % 2] || routes[0];
  const p = cyc % 1;
  const seg = Math.min(route.length - 2, Math.floor(p * (route.length - 1)));
  const sp = p * (route.length - 1) - seg;
  const p1 = N[route[seg]], p2 = N[route[seg + 1]];
  const px = p1[0] + (p2[0] - p1[0]) * sp, py = p1[1] + (p2[1] - p1[1]) * sp;
  ctx.fillStyle = sigA(0.95);
  ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.fill();
  ctx.strokeStyle = sigA(0.3);
  ctx.beginPath(); ctx.arc(px, py, 6, 0, 7); ctx.stroke();
  ctx.fillStyle = inkA(0.35);
  ctx.fillText('COMPILED · DETERMINISTIC', w * 0.07, h * 0.10);
}

// 07 — provenance-tracked writes to a knowledge graph
function mneme(ctx, w, h, t, { inkA, sigA }) {
  const pts = [[0.16, 0.30], [0.34, 0.18], [0.30, 0.56], [0.50, 0.36], [0.48, 0.72], [0.66, 0.22], [0.70, 0.56], [0.86, 0.38]].map((p) => [p[0] * w, p[1] * h]);
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
  ctx.lineWidth = 1;
  ctx.strokeStyle = inkA(0.10);
  edges.forEach((e) => {
    ctx.beginPath(); ctx.moveTo(pts[e[0]][0], pts[e[0]][1]); ctx.lineTo(pts[e[1]][0], pts[e[1]][1]); ctx.stroke();
  });
  pts.forEach((p) => {
    ctx.fillStyle = inkA(0.5);
    ctx.beginPath(); ctx.arc(p[0], p[1], 2.5, 0, 7); ctx.fill();
  });
  const cyc = Math.floor(t / 6), ph = (t % 6) / 6;
  const cands = [[[0.60, 0.80], 4], [[0.88, 0.70], 7], [[0.42, 0.10], 1]];
  const cand = cands[cyc % 3];
  const P = [cand[0][0] * w, cand[0][1] * h], par = pts[cand[1]];
  if (ph < 0.35) {
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = sigA(0.55);
    ctx.beginPath(); ctx.moveTo(par[0], par[1]); ctx.lineTo(P[0], P[1]); ctx.stroke();
    ctx.beginPath(); ctx.arc(P[0], P[1], 5, 0, 7); ctx.stroke();
    ctx.setLineDash([]);
  } else if (ph < 0.62) {
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = sigA(0.55);
    ctx.beginPath(); ctx.moveTo(par[0], par[1]); ctx.lineTo(P[0], P[1]); ctx.stroke();
    ctx.beginPath(); ctx.arc(P[0], P[1], 5, 0, 7); ctx.stroke();
    const q = (ph - 0.35) / 0.27;
    ctx.strokeStyle = sigA(0.6 * (1 - q));
    ctx.beginPath(); ctx.arc(P[0], P[1], 6 + q * 26, 0, 7); ctx.stroke();
    ctx.setLineDash([]);
  } else {
    ctx.strokeStyle = sigA(0.6);
    ctx.beginPath(); ctx.moveTo(par[0], par[1]); ctx.lineTo(P[0], P[1]); ctx.stroke();
    ctx.fillStyle = sigA(0.95);
    ctx.beginPath(); ctx.arc(P[0], P[1], 3, 0, 7); ctx.fill();
  }
  caption(ctx, w, h, 'GOVERNED MEMORY', inkA);
}

const DRAW = { roi, loop2, harness, gov, classifier, graph, mneme };

// Playback speed for the figures (1 = the source project's default pace).
const SPEED = 0.20;

// A frame that reads as populated when motion is disabled.
const STATIC_T = 7;

export default function ResearchThumb({ slug }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFig = DRAW[FIGURE[slug]] || roi;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- theme palette (re-read on themechange) --------------------------
    const P = { ink: '255, 255, 255', panel: '#08080A' };
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      P.ink = cs.getPropertyValue('--ink').trim() || P.ink;
      // --bg-panel is the cover's background; used to mask edges behind graph
      // nodes. In the light theme it's declared as var(--bg-raised) — if the
      // browser hands that back unresolved, fall back to --bg-raised directly.
      let panel = cs.getPropertyValue('--bg-panel').trim();
      if (!panel || panel.indexOf('var(') === 0) panel = cs.getPropertyValue('--bg-raised').trim();
      P.panel = panel || P.panel;
    };
    readPalette();
    const H = {
      inkA: (a) => `rgba(${P.ink}, ${a})`,
      sigA: (a) => `rgba(${P.ink}, ${a})`, // neutral "signal" — brightest ink
      get panel() { return P.panel; },
    };

    // ---- sizing / DPR ----------------------------------------------------
    let cssW = 0, cssH = 0;
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width || 320;
      cssH = rect.height || 180;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const render = (t) => {
      ctx.clearRect(0, 0, cssW, cssH);
      dots(ctx, cssW, cssH, H.inkA);
      try { drawFig(ctx, cssW, cssH, t, H); } catch (e) { /* one bad frame */ }
    };

    // ---- animation loop --------------------------------------------------
    let raf = 0, last = 0, tAcc = 0, visible = true;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      tAcc += dt * SPEED;
      render(tAcc);
    };

    if (reduce) {
      render(STATIC_T);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // ---- listeners -------------------------------------------------------
    const onTheme = () => { readPalette(); if (reduce) render(STATIC_T); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { size(); if (reduce) render(STATIC_T); });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; if (visible) last = 0; },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('themechange', onTheme);
      ro.disconnect();
      io.disconnect();
    };
  }, [slug]);

  return (
    <div className="rthumb" aria-hidden="true">
      <canvas ref={canvasRef} className="rthumb__canvas" />
    </div>
  );
}
