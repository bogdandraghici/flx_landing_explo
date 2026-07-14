'use client';
import { useEffect, useRef } from 'react';

/**
 * Blog-post header background — a "typeset manuscript": the faint wireframe of
 * an article (word blocks on baseline lines, the odd heading, paragraph breaks)
 * types itself in behind the real title, with a blinking caret. When the page
 * of blocks is fully set, it holds, fades, and re-types on a loop.
 *
 * Site conventions (same as the agent-builder / flowx-code hero visuals):
 *  - Colours come from theme tokens (repaints on `themechange`) so it reads in
 *    both the dark default and the light-paper theme.
 *  - Everything is neutral schematic ink; brand amber is reserved for the
 *    resolution beats only — the caret, and the occasional "link" word.
 *  - `prefers-reduced-motion` → the resolved pose (page fully typeset, no
 *    caret, no loop).
 *  - Layout is seeded (deterministic), so the same page always sets the same
 *    manuscript.
 */
const WPS = 16; // typing speed, words per second
const HOLD_MS = 3600; // pause once the page is fully set
const FADE_MS = 900; // crossfade back to blank

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BlogPostHeroBg({ className = '' }) {
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

    // ---- layout: seeded manuscript of word blocks --------------------------
    const S = { w: 0, h: 0, words: [] };
    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      S.w = rect.width || 800;
      S.h = rect.height || 360;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(S.w * dpr));
      canvas.height = Math.max(1, Math.round(S.h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rnd = mulberry32(0x5eed);
      const words = [];
      const lineH = 30;
      const left = S.w * 0.04;
      const right = S.w * 0.96;
      let y = 96; // start below the nav zone — the section runs under the fixed nav
      while (y < S.h - 14) {
        const isHead = rnd() < 0.16;
        const lines = isHead ? 1 : 2 + Math.floor(rnd() * 3);
        for (let li = 0; li < lines && y < S.h - 14; li++) {
          // last line of a paragraph runs short, like real prose
          const lineEnd = li === lines - 1 ? left + (right - left) * (0.42 + rnd() * 0.42) : right;
          let x = left;
          while (x < lineEnd) {
            const w = Math.min((isHead ? 48 : 26) + rnd() * (isHead ? 74 : 56), lineEnd - x);
            if (w < 12) break;
            words.push({ x, y, w, h: isHead ? 12 : 8, head: isHead, link: !isHead && rnd() < 0.035 });
            x += w + 10;
          }
          y += isHead ? lineH + 6 : lineH;
        }
        y += 16; // paragraph gap
      }
      S.words = words;
    };
    layout();

    // ---- draw ---------------------------------------------------------------
    // typed: how many words have been set (float — the fractional tail fades in).
    // fade: global alpha multiplier for the crossfade back to blank.
    const draw = (typed, fade, now) => {
      ctx.clearRect(0, 0, S.w, S.h);
      ctx.globalAlpha = fade;
      let caret = null;
      for (let i = 0; i < S.words.length; i++) {
        if (i >= typed) break;
        const wd = S.words[i];
        const settle = Math.min(1, (typed - i) / 3); // newest few blocks ease in
        const base = wd.head ? 0.10 : 0.06;
        ctx.beginPath();
        ctx.roundRect(wd.x, wd.y, wd.w, wd.h, 3);
        if (wd.link) {
          ctx.fillStyle = ambA(0.26 * settle);
          ctx.fill();
          ctx.strokeStyle = ambA(0.4 * settle);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(wd.x, wd.y + wd.h + 3.5); ctx.lineTo(wd.x + wd.w, wd.y + wd.h + 3.5); ctx.stroke();
        } else {
          ctx.fillStyle = inkA(base * settle);
          ctx.fill();
        }
        caret = wd;
      }
      // amber caret at the end of the last-set word (the one resolution accent)
      if (!reduce && caret && typed < S.words.length) {
        const blink = 0.45 + 0.4 * Math.sin(now / 180);
        ctx.fillStyle = ambA(Math.max(0, blink));
        ctx.fillRect(caret.x + caret.w + 5, caret.y - 3, 2, caret.h + 6);
      }
      ctx.globalAlpha = 1;
    };

    // ---- animation loop -----------------------------------------------------
    let raf = 0;
    let t0 = performance.now();
    let visible = true;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const typeMs = (S.words.length / WPS) * 1000;
      const cycle = typeMs + HOLD_MS + FADE_MS;
      const t = (now - t0) % cycle;
      if (t < typeMs + HOLD_MS) {
        draw(Math.min((t / 1000) * WPS, S.words.length), 1, now);
      } else {
        draw(S.words.length, 1 - (t - typeMs - HOLD_MS) / FADE_MS, now);
      }
    };

    const staticPose = () => draw(S.words.length, 1, 0);

    if (reduce) {
      staticPose();
    } else {
      raf = requestAnimationFrame(tick);
    }

    // ---- listeners ----------------------------------------------------------
    const onTheme = () => { readPalette(); if (reduce) staticPose(); };
    window.addEventListener('themechange', onTheme);

    const ro = new ResizeObserver(() => { layout(); if (reduce) staticPose(); });
    ro.observe(canvas);

    // pause offscreen — blog posts are long pages; don't animate while reading
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('themechange', onTheme);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
