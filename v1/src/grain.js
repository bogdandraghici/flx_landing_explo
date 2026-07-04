/*
 * FlowX site-wide film-grain / static layer.
 * A handful of pre-baked noise tiles are tiled across the canvas at a fresh
 * random offset every drawn frame — the reshuffling reads as gentle moving
 * static. The canvas is a fixed, pointer-events-none overlay covering the whole
 * viewport (see `.grain` in style.css), so the grain textures the entire
 * landing page as you scroll, not just the hero.
 *
 * Sized to the viewport, lightly super-sampled (SS) for finer dots. We keep the
 * backing store near CSS resolution rather than full devicePixelRatio: drawing
 * the sparse noise at device resolution and letting the browser downsample it
 * washes the static out to near-nothing on hi-dpi screens.
 */

const TILE = 160;
const AMT = 0.5; // grain strength (the exploration's default of 5/10)
// The static reshuffles once per drawn frame; capping the draw rate well below
// display refresh turns the frantic 60fps flicker into calm, slow-moving grain.
const FPS = 20;
const FRAME_MS = 1000 / FPS;
// Render the backing store a bit denser than CSS pixels; since the canvas is
// stretched to fit via CSS, each noise dot ends up covering less screen area —
// i.e. finer grain.
const SS = 1.6;

function makeTiles() {
  const tiles = [];
  for (let n = 0; n < 6; n++) {
    const c = document.createElement('canvas');
    c.width = TILE;
    c.height = TILE;
    const x = c.getContext('2d');
    const img = x.createImageData(TILE, TILE);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = d[i + 1] = d[i + 2] = 255;
      const r = Math.random();
      d[i + 3] = r > 0.82 ? Math.floor(((r - 0.82) / 0.18) * 90) : 0;
    }
    x.putImageData(img, 0, 0);
    tiles.push(c);
  }
  return tiles;
}

export function createGrain(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ctx;
  try {
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
  } catch {
    canvas.style.display = 'none';
    return { destroy() {} };
  }

  const tiles = makeTiles();

  // Fixed full-viewport overlay: track the viewport, not the (document-tall) host.
  function size() {
    canvas.width = Math.max(1, Math.round(window.innerWidth * SS));
    canvas.height = Math.max(1, Math.round(window.innerHeight * SS));
  }
  size();

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const tile = tiles[Math.floor(Math.random() * tiles.length)];
    ctx.globalAlpha = 0.5 * AMT;
    const offX = Math.floor(Math.random() * TILE), offY = Math.floor(Math.random() * TILE);
    for (let ty = -offY; ty < H; ty += TILE) {
      for (let tx = -offX; tx < W; tx += TILE) ctx.drawImage(tile, tx, ty);
    }
    ctx.globalAlpha = 1;
  }

  let raf = 0;
  let running = false;
  let lastDraw = 0;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (now - lastDraw < FRAME_MS) return; // throttle the reshuffle rate
    lastDraw = now;
    draw();
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  if (reduceMotion) {
    draw(); // one still frame, no flicker
  } else {
    start();
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      size();
      if (reduceMotion) draw();
    }, 150);
  }
  window.addEventListener('resize', onResize);

  // Pause while the tab is hidden; no need for an IntersectionObserver since the
  // fixed overlay is always on-screen.
  function onVis() {
    if (document.hidden) stop();
    else start();
  }
  document.addEventListener('visibilitychange', onVis);

  return {
    destroy() {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      clearTimeout(resizeTimer);
    },
  };
}
