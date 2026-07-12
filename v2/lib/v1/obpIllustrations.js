/*
 * Observatory — "Regulation to runtime" pipeline illustrations.
 * Four 1:1 instrument canvases, one per step (compile · enforce · evidence ·
 * answer), each a small live diagram sitting on top of its card's copy.
 * Ported from the Claude Design exploration "Pipeline Illustrations"
 * (Turn 03 — square illustrations, art over copy).
 *
 * Theme-aware: colours are read from the page tokens (--ink for structure,
 * --dia-bright for the moving signal) and re-read on `themechange`, so the
 * instruments flip with the light/dark toggle. Honours prefers-reduced-motion
 * by freezing on a single resolved frame instead of animating. Each canvas is
 * decorative (aria-hidden); the legible labels live in the HTML copy beneath.
 */

function parseTriplet(v) {
  const m = (v || '').trim().match(/(\d+)\D+(\d+)\D+(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

export function createPipelineIllustrations(root) {
  const scope = root || document;
  const canvases = [...scope.querySelectorAll('canvas[data-obp]')];
  if (!canvases.length) return { destroy() {} };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // live palette, read from the page's theme tokens
  let INK = [255, 255, 255]; // structure (was the design's flat white)
  let SIG = [233, 236, 242]; // the moving signal (was the design's neutral accent)
  function readPalette() {
    const cs = getComputedStyle(document.documentElement);
    INK = parseTriplet(cs.getPropertyValue('--ink')) || INK;
    SIG = parseTriplet(cs.getPropertyValue('--dia-bright')) || SIG;
  }
  readPalette();

  // in reduced-motion, sit on a resolved frame (compile fully built, playheads
  // settled) rather than a cold t=0 pose
  let t = reduceMotion ? 12 : 0;

  // ---- shared helpers -------------------------------------------------------
  function prep(cv) {
    const rect = cv.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return null;
    const pw = Math.round(rect.width * dpr), ph = Math.round(rect.height * dpr);
    if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }
    const ctx = cv.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: rect.width, h: rect.height };
  }

  function substrate(ctx, w, h) {
    ctx.fillStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},0.045)`;
    const g = 24;
    for (let x = g / 2; x < w; x += g)
      for (let y = g / 2; y < h; y += g) ctx.fillRect(x, y, 1, 1);
  }

  function edge(ctx, a, b, s) {
    ctx.strokeStyle = s;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo((a.x + b.x) / 2, a.y, (a.x + b.x) / 2, b.y, b.x, b.y);
    ctx.stroke();
  }
  function cub(a, b, u) {
    const cx = (a.x + b.x) / 2, m = 1 - u;
    return {
      x: m * m * m * a.x + 3 * m * m * u * cx + 3 * m * u * u * cx + u * u * u * b.x,
      y: m * m * m * a.y + 3 * m * m * u * a.y + 3 * m * u * u * b.y + u * u * u * b.y,
    };
  }

  // ---- the four instruments (ported verbatim, tokenised colours) -----------
  function drawCompile(ctx, w, h) {
    const W = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
    const A = a => `rgba(${SIG[0]},${SIG[1]},${SIG[2]},${a})`;
    // Compile — prose rules are read one at a time by a descending compile
    // cursor and land as uniform predicates (metric · operator · threshold)
    // in a policy pack that grows to enclose them, then holds and resets.
    const padX = 22, top = 40, bot = h - 24;
    const rows = 5;
    const leftX = padX, leftW = (w - 2 * padX) * 0.30;
    const packX = padX + leftW + (w - 2 * padX) * 0.13;
    const packW = (w - padX) - packX;
    const rowGap = (bot - top) / rows;
    const yFor = i => top + (i + 0.5) * rowGap;

    const period = rows + 3;                 // build all rows, then hold, then reset
    const cyc = (t * 0.5) % period;
    const done = Math.floor(cyc);
    const building = done < rows;            // a rule is still compiling
    const built = Math.min(rows, done);      // predicates already in the pack
    const frac = building ? cyc - done : 0;  // in-progress row fill, 0..1
    const cursor = building ? built : -1;    // the rule currently being read

    // region labels
    ctx.font = '10px ui-monospace,Menlo,monospace';
    ctx.fillStyle = W(0.28);
    ctx.fillText('RULES', leftX, top - 14);
    ctx.fillText('POLICY PACK', packX, top - 14);

    // source prose (left): dim sentences; a rule fades once it's compiled
    ctx.lineWidth = 1;
    for (let i = 0; i < rows; i++) {
      const y = yFor(i);
      const consumed = i < built;
      let x = leftX, seed = i * 12.9 + 5;
      const segN = 3 + (i % 2);
      for (let s = 0; s < segN; s++) {
        seed += 1.7;
        const segW = 9 + (Math.sin(seed) * 0.5 + 0.5) * (leftW * 0.30);
        if (x + segW > leftX + leftW) break;
        ctx.strokeStyle = W(consumed ? 0.07 : 0.15);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + segW, y); ctx.stroke();
        x += segW + 6;
      }
      if (i === cursor) {
        ctx.fillStyle = A(0.9); // ▸ compile cursor on the rule being read
        ctx.beginPath();
        ctx.moveTo(leftX - 12, y - 4); ctx.lineTo(leftX - 12, y + 4); ctx.lineTo(leftX - 6, y);
        ctx.closePath(); ctx.fill();
      }
    }

    // the pack: a container that grows to enclose each predicate as it lands
    const fillH = (built + frac) * rowGap;
    if (built + frac > 0) {
      const complete = !building;
      const x0 = packX - 6, x1 = packX + packW + 3, y0 = top - 4, y1 = top + fillH + 4;
      ctx.strokeStyle = complete ? A(0.5) : W(0.16);
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      if (complete) { ctx.fillStyle = A(0.035); ctx.fillRect(x0, y0, x1 - x0, y1 - y0); }
    }

    // predicate rows — metric · operator · threshold, uniform across the pack
    const gapC = 8, opW = 13, inpad = 10;
    const tokX = packX + inpad, tokW = packW - inpad * 2;
    const metricW = tokW * 0.44;
    const threshW = tokW - metricW - opW - gapC * 2;
    for (let i = 0; i < rows; i++) {
      const appear = i < built ? 1 : (i === cursor ? frac : 0);
      if (appear <= 0) continue;
      const y = yFor(i);
      const active = i === cursor;
      const a = { x: leftX + leftW, y }, b = { x: packX - 6, y };

      // connector rule → predicate (only the compiling one is lit)
      edge(ctx, a, b, active ? A(0.5) : W(0.06));

      // metric — a labelled bar with a partial fill
      ctx.strokeStyle = W(0.14 * appear); ctx.strokeRect(tokX, y - 6, metricW, 12);
      const fillP = 0.34 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 0.5;
      ctx.fillStyle = A((active ? 0.3 : 0.16) * appear);
      ctx.fillRect(tokX + 1.5, y - 4.5, (metricW - 3) * fillP, 9);

      // operator — a glyph in a small box
      const ox = tokX + metricW + gapC;
      ctx.strokeStyle = W(0.12 * appear); ctx.strokeRect(ox, y - 6, opW, 12);
      ctx.fillStyle = W(0.55 * appear); ctx.font = '9px ui-monospace,Menlo,monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(['≥', '≤', '=', '<', '>', '≠'][i % 6], ox + opW / 2 + 0.5, y + 0.5);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

      // threshold — a track with two end stops and a single value marker
      const tx = ox + opW + gapC;
      ctx.strokeStyle = W(0.10 * appear);
      ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(tx + threshW, y); ctx.stroke();
      ctx.strokeStyle = W(0.12 * appear);
      ctx.beginPath();
      ctx.moveTo(tx, y - 3); ctx.lineTo(tx, y + 3);
      ctx.moveTo(tx + threshW, y - 3); ctx.lineTo(tx + threshW, y + 3);
      ctx.stroke();
      const mk = tx + (0.25 + (Math.cos(i * 1.7) * 0.5 + 0.5) * 0.5) * threshW;
      ctx.fillStyle = A((active ? 0.95 : 0.85) * appear);
      ctx.beginPath(); ctx.arc(mk, y, 2.5, 0, 7); ctx.fill();

      // the compile signal rides the active connector as the predicate fills in
      if (active) {
        const pk = cub(a, b, frac);
        ctx.fillStyle = A(0.95); ctx.beginPath(); ctx.arc(pk.x, pk.y, 2.5, 0, 7); ctx.fill();
        ctx.fillStyle = A(0.16); ctx.beginPath(); ctx.arc(pk.x, pk.y, 5, 0, 7); ctx.fill();
      }
    }
  }

  function drawEnforce(ctx, w, h) {
    const W = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
    const A = a => `rgba(${SIG[0]},${SIG[1]},${SIG[2]},${a})`;
    const padX = 24, top = 34, bot = h - 22;
    const px = padX + ((t * 0.1) % 1) * (w - 2 * padX);
    for (let i = 0; i <= 40; i++) {
      const x = padX + i / 40 * (w - 2 * padX), M = i % 5 === 0;
      ctx.strokeStyle = W(M ? 0.14 : 0.06);
      ctx.beginPath(); ctx.moveTo(x, top - 13); ctx.lineTo(x, top - 13 + (M ? 7 : 4)); ctx.stroke();
    }
    const lanes = 4, laneH = (bot - top) / lanes;
    for (let l = 0; l < lanes; l++) {
      const cy = top + laneH * (l + 0.5);
      ctx.strokeStyle = W(0.06); ctx.beginPath(); ctx.moveTo(padX, cy); ctx.lineTo(w - padX, cy); ctx.stroke();
      const mx = padX + (0.22 + 0.5 * ((l * 0.37 + 0.13) % 1)) * (w - 2 * padX);
      const near = Math.abs(px - mx) < 9;
      const amp = laneH * 0.3;
      ctx.strokeStyle = near ? A(0.55) : W(0.20); ctx.lineWidth = 1; ctx.beginPath();
      for (let x = padX; x <= w - padX; x += 3) {
        const u = (x - padX) / (w - 2 * padX);
        let y = cy + Math.sin(u * 20 + t * (0.8 + l * 0.25) + l) * amp * 0.35 + Math.sin(u * 6 - t * (0.5 + l * 0.2)) * amp * 0.45;
        const d = Math.abs(x - mx);
        if (d < 24) y += -Math.sign(Math.sin(t * 3)) * (1 - d / 24) * amp * 0.9 * (near ? 1 : 0.25);
        x === padX ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      const ms = 6;
      ctx.strokeStyle = near ? A(0.9) : W(0.22); ctx.strokeRect(mx - ms / 2, cy - ms / 2, ms, ms);
      if (near) {
        ctx.fillStyle = A(0.9); ctx.fillRect(mx - ms / 2, cy - ms / 2, ms, ms);
        ctx.strokeStyle = A(0.22); ctx.beginPath(); ctx.moveTo(mx, top); ctx.lineTo(mx, bot); ctx.stroke();
      }
    }
    const g = ctx.createLinearGradient(px - 70, 0, px, 0);
    g.addColorStop(0, A(0)); g.addColorStop(1, A(0.08));
    ctx.fillStyle = g; ctx.fillRect(px - 70, top, 70, bot - top);
    ctx.strokeStyle = A(0.7); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, top - 7); ctx.lineTo(px, bot); ctx.stroke();
    ctx.fillStyle = A(0.95); ctx.fillRect(px - 2, top - 9, 4, 4);
    ctx.font = '10px ui-monospace,Menlo,monospace'; ctx.fillStyle = W(0.26);
    ctx.fillText('t', w - padX + 3, top - 11);
  }

  function drawEvidence(ctx, w, h) {
    const W = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
    const A = a => `rgba(${SIG[0]},${SIG[1]},${SIG[2]},${a})`;
    const logX = 24, top = 22, bot = h - 22, logW = w * 0.42, rowH = 15;
    const rnd = s => { const v = Math.sin(s * 127.1) * 43758.5453; return v - Math.floor(v); };
    ctx.setLineDash([3, 4]); ctx.strokeStyle = W(0.08); ctx.strokeRect(logX, top, logW, bot - top); ctx.setLineDash([]);
    ctx.save(); ctx.beginPath(); ctx.rect(logX, top, logW, bot - top); ctx.clip();
    const speedPx = 20, scroll = (t * speedPx) % rowH, base = Math.floor(t * speedPx / rowH);
    const n = Math.ceil((bot - top) / rowH) + 2;
    for (let i = -1; i < n; i++) {
      const y = top + (n - 1 - i) * rowH - scroll + rowH * 0.6;
      const idx = base + i;
      const flagged = rnd(idx) > 0.82;
      ctx.fillStyle = W(0.10); ctx.fillRect(logX + 10, y - 3.5, 28, 7);
      let x = logX + 46, seed = idx * 2.3;
      const cols = 3 + Math.floor(rnd(idx * 1.7) * 3);
      for (let c = 0; c < cols; c++) {
        seed += 1.2;
        const seg = 12 + rnd(seed) * 34;
        ctx.fillStyle = W(flagged ? 0.28 : 0.12); ctx.fillRect(x, y - 3, seg, 6);
        x += seg + 8; if (x > logX + logW - 14) break;
      }
      if (flagged) { ctx.fillStyle = A(0.9); ctx.beginPath(); ctx.arc(logX + 5, y, 2.5, 0, 7); ctx.fill(); }
    }
    ctx.restore();
    const hy = (top + bot) / 2;
    ctx.setLineDash([2, 4]); ctx.strokeStyle = A(0.3);
    ctx.beginPath(); ctx.moveTo(logX, hy); ctx.lineTo(logX + logW, hy); ctx.stroke(); ctx.setLineDash([]);
    const sx = w * 0.62, ex = logX + logW, target = { x: sx, y: top + 22 }, src = { x: ex, y: hy };
    const pulse = (t * 0.4) % 1;
    ctx.strokeStyle = A(0.18);
    ctx.beginPath(); ctx.moveTo(src.x, src.y);
    ctx.bezierCurveTo((src.x + target.x) / 2, src.y, (src.x + target.x) / 2, target.y, target.x, target.y);
    ctx.stroke();
    const pk = cub(src, target, pulse);
    ctx.fillStyle = A(0.9); ctx.beginPath(); ctx.arc(pk.x, pk.y, 2.5, 0, 7); ctx.fill();
    const stackX = sx, stackW = w - 24 - sx, bh = 12, bn = 6;
    ctx.font = '10px ui-monospace,Menlo,monospace'; ctx.fillStyle = W(0.30);
    ctx.fillText('EVIDENCE', stackX, top - 6);
    for (let k = 0; k < bn; k++) {
      const by = top + 14 + k * (bh + 6);
      const fresh = k === 0 ? (0.5 + 0.5 * Math.sin(t * 2)) : 1;
      ctx.strokeStyle = W(0.12); ctx.strokeRect(stackX, by, stackW, bh);
      ctx.fillStyle = A(k === 0 ? 0.16 * fresh : 0.06); ctx.fillRect(stackX + 1.5, by + 1.5, stackW - 3, bh - 3);
      ctx.fillStyle = W(0.14); ctx.fillRect(stackX + 4, by + bh / 2 - 2, 16, 4);
    }
  }

  function drawAnswer(ctx, w, h) {
    const W = a => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;
    const A = a => `rgba(${SIG[0]},${SIG[1]},${SIG[2]},${a})`;
    const top = 30, bot = h - 30;
    const reqX = w * 0.15, polX = w * 0.5, eviX = w * 0.85;
    const col = (x, nn) => { const a = []; for (let i = 0; i < nn; i++) a.push({ x, y: top + (bot - top) * ((i + 0.5) / nn) }); return a; };
    const req = col(reqX, 2), pol = col(polX, 3), evi = col(eviX, 4);
    ctx.lineWidth = 1;
    for (let i = 0; i < evi.length; i++) edge(ctx, evi[i], pol[i % 3], W(0.06));
    for (let j = 0; j < pol.length; j++) edge(ctx, pol[j], req[j % 2], W(0.06));
    const phase = t * 0.13, idx = Math.floor(phase) % evi.length, u = phase - Math.floor(phase);
    const e = evi[idx], p = pol[idx % 3], r = req[idx % 2];
    edge(ctx, e, p, A(0.5)); edge(ctx, p, r, A(0.5));
    let pk; if (u < 0.5) pk = cub(e, p, u / 0.5); else pk = cub(p, r, (u - 0.5) / 0.5);
    const node = (nd, active) => {
      ctx.beginPath(); ctx.arc(nd.x, nd.y, 4, 0, 7);
      ctx.strokeStyle = active ? A(0.85) : W(0.18); ctx.lineWidth = 1; ctx.stroke();
      if (active) { ctx.fillStyle = A(0.14); ctx.fill(); }
    };
    evi.forEach(nd => node(nd, nd === e));
    pol.forEach(nd => node(nd, nd === p));
    req.forEach(nd => node(nd, nd === r));
    ctx.setLineDash([3, 4]); ctx.lineDashOffset = -t * 10; ctx.strokeStyle = A(0.5);
    ctx.beginPath(); ctx.arc(r.x, r.y, 11, 0, 7); ctx.stroke(); ctx.setLineDash([]); ctx.lineDashOffset = 0;
    ctx.fillStyle = A(0.95); ctx.beginPath(); ctx.arc(pk.x, pk.y, 3, 0, 7); ctx.fill();
    ctx.fillStyle = A(0.18); ctx.beginPath(); ctx.arc(pk.x, pk.y, 6, 0, 7); ctx.fill();
    const cxp = { x: w * 0.5 + Math.sin(t * 0.3) * w * 0.28, y: h * 0.5 + Math.cos(t * 0.22) * h * 0.28 };
    ctx.strokeStyle = W(0.08); ctx.beginPath();
    ctx.moveTo(cxp.x - 8, cxp.y); ctx.lineTo(cxp.x + 8, cxp.y);
    ctx.moveTo(cxp.x, cxp.y - 8); ctx.lineTo(cxp.x, cxp.y + 8); ctx.stroke();
    ctx.font = '10px ui-monospace,Menlo,monospace'; ctx.fillStyle = W(0.30); ctx.textAlign = 'center';
    ctx.fillText('REQUIREMENT', reqX, h - 10);
    ctx.fillText('POLICY', polX, h - 10);
    ctx.fillText('EVIDENCE', eviX, h - 10);
    ctx.textAlign = 'left';
  }

  const DRAW = { compile: drawCompile, enforce: drawEnforce, evidence: drawEvidence, answer: drawAnswer };

  function drawFrame() {
    for (const cv of canvases) {
      const fn = DRAW[cv.dataset.obp];
      if (!fn) continue;
      const p = prep(cv);
      if (!p) continue;
      const { ctx, w, h } = p;
      ctx.clearRect(0, 0, w, h);
      substrate(ctx, w, h);
      fn(ctx, w, h);
    }
  }

  // ---- loop / lifecycle -----------------------------------------------------
  let raf = 0, last = 0, running = false;

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    drawFrame();
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  if (reduceMotion) {
    drawFrame();
  } else {
    start();
  }

  // theme flip — re-read tokens; redraw immediately when frozen
  function onTheme() { readPalette(); if (reduceMotion) drawFrame(); }
  window.addEventListener('themechange', onTheme);

  // pause when tab is hidden (the animated loop only)
  function onVis() {
    if (document.hidden) stop();
    else start();
  }
  document.addEventListener('visibilitychange', onVis);

  // redraw the frozen frame on resize (the loop re-measures every frame on its own)
  let rt = 0;
  const ro = new ResizeObserver(() => {
    if (!reduceMotion) return;
    clearTimeout(rt);
    rt = setTimeout(drawFrame, 100);
  });
  canvases.forEach(cv => ro.observe(cv));

  return {
    destroy() {
      stop();
      window.removeEventListener('themechange', onTheme);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      clearTimeout(rt);
    },
  };
}
