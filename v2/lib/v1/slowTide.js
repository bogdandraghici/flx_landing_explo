/*
 * FlowX hero background — "Slow Tide".
 * A glowing horizontal ring around a dark sphere, with a wave-rippled disk of
 * ~2200 orbiting particles ("agents"). The camera descends from a high, distant
 * vantage toward the horizon as the hero scrolls away, then eases back out.
 * A faint mono HUD readout and a staggered set of tracked agent labels ride on
 * top. Ported from the Claude Design exploration "HeroA7 — Slow Tide".
 *
 * Mounts onto the existing hero <canvas> and is confined to the .hero section
 * (it does NOT persist behind the rest of the page). The scene is intentionally
 * dark in both themes — the hero is pinned to the dark palette in CSS.
 */
import * as THREE from 'three';

const AMBER = 'rgba(252, 184, 19, 0.85)'; // brand amber (--amber-rgb) for the label markers

const TRACKED = [
  'KYC-VERIFY', 'LEND-SCORE', 'UW-RISK-04', 'CLM-TRIAGE', 'TRACE-ETA',
  'RETAIN-OFFER', 'QUOTE-GEN', 'FRAUD-WATCH', 'DOC-EXTRACT', 'AML-SCREEN',
  'COLLECT-PLAN', 'SUBRO-FLAG', 'FLEET-ROUTE', 'DISPUTE-RES',
];
// per-label seed radius + even angular spread (golden-angle) so they don't stack
const TRACK_RADII = [2.35, 2.85, 3.35, 3.95, 4.55, 2.6, 3.6, 4.2, 2.15, 3.1, 4.75, 2.75, 3.75, 4.4];

const ez = (x) => x * x * (3 - 2 * x);
const seg = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));

/** Soft round sprite for the particles. */
function makeDotTexture() {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const g = cv.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.4, 'rgba(255,255,255,.45)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}

export function createSlowTide(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = canvas.closest('section') || canvas.parentElement;
  if (!hero) return { destroy() {} };

  let rend;
  try {
    rend = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch {
    // No WebGL — leave the dark hero backdrop as-is.
    return { destroy() {} };
  }

  const MOTION_SPEED = 0.4;
  const WAVE_AMP = 0.09;
  // Fewer particles on small/handheld viewports (position updates run in JS).
  const N = window.innerWidth < 760 ? 1200 : 2200;

  let w = hero.clientWidth || window.innerWidth;
  let h = hero.clientHeight || window.innerHeight;
  rend.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  rend.setSize(w, h, false); // false: keep the CSS-driven 100%/100% sizing
  rend.setClearColor(0x0a0b0d, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0b0d, 0.04);
  const cam = new THREE.PerspectiveCamera(46, w / h, 0.1, 100);

  // Ring + additive glow + dark occluding sphere ("planet").
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.01, 8, 256),
    new THREE.MeshBasicMaterial({ color: 0xf7f4ea }),
  );
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  const glow = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.06, 8, 256),
    new THREE.MeshBasicMaterial({
      color: 0xf2ecd8, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  glow.rotation.x = Math.PI / 2;
  scene.add(glow);

  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(1.44, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x050504 }),
  ));

  // Orbiting particle disk.
  const pos = new Float32Array(N * 3);
  const ang = new Float32Array(N);
  const rad = new Float32Array(N);
  const ph = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    rad[i] = 1.92 + Math.pow(Math.random(), 0.8) * 3.6;
    ang[i] = Math.random() * Math.PI * 2;
    ph[i] = Math.random() * Math.PI * 2;
  }
  // Pin the first 14 particles to the tracked-label radii/angles.
  TRACK_RADII.forEach((r, k) => { rad[k] = r; ang[k] = k * 2.399; });

  const dotTex = makeDotTexture();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({
    map: dotTex, color: 0xcac6bb, size: 0.05, transparent: true, opacity: 0.42,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  }));
  scene.add(points);

  /* ---------- overlay DOM (HUD + tracked labels), confined to the hero ---------- */
  const vignette = document.createElement('div');
  vignette.className = 'tide-vignette';
  vignette.setAttribute('aria-hidden', 'true');

  const overlay = document.createElement('div');
  overlay.className = 'tide-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const hud = document.createElement('div');
  hud.className = 'tide-hud';
  const hudDot = document.createElement('span');
  hudDot.className = 'tide-hud__dot';
  const hudText = document.createElement('span');
  hudText.className = 'tide-hud__read';
  hudText.textContent = 'AZ 000.0° · EL 00.0° · R 0.00 · SCROLL 000';
  hud.append(hudDot, hudText);
  overlay.appendChild(hud);

  const labelNodes = TRACKED.map((name) => {
    const node = document.createElement('div');
    node.className = 'tide-label';
    const box = document.createElement('span');
    box.className = 'tide-label__box';
    const lead = document.createElement('span');
    lead.className = 'tide-label__lead';
    const tag = document.createElement('span');
    tag.className = 'tide-label__tag';
    tag.textContent = name;
    node.append(box, lead, tag);
    overlay.appendChild(node);
    return node;
  });

  const scrim = hero.querySelector('.hero__scrim');
  hero.insertBefore(vignette, canvas.nextSibling); // just above the canvas
  if (scrim) hero.insertBefore(overlay, scrim.nextSibling); // above the scrim, below the copy
  else hero.appendChild(overlay);

  /* ---------- frame ---------- */
  const pv = new THREE.Vector3();
  const dv = new THREE.Vector3();
  const t0 = performance.now();
  let p = 0; // eased scroll progress through the hero (0 = top, 1 = scrolled past)

  function scrollTarget() {
    const vh = window.innerHeight || 1;
    const top = hero.getBoundingClientRect().top;
    return Math.min(1, Math.max(0, -top / vh));
  }

  function renderFrame(now) {
    const target = scrollTarget();
    p += (target - p) * 0.026;
    const t = (now - t0) / 1000 * MOTION_SPEED;

    // particle disk — slow differential rotation + vertical wave
    for (let i = 0; i < N; i++) {
      const r0 = rad[i];
      const a = (ang[i] += 0.017 * MOTION_SPEED / Math.pow(r0, 1.5));
      const r = r0 + 0.05 * Math.sin(a * 2 + t * 0.5 + ph[i]);
      const y = WAVE_AMP * Math.sin(a * 3 - t * 0.7 + r0 * 1.9) * Math.min(1, (r0 - 1.9) * 0.6);
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    geo.attributes.position.needsUpdate = true;

    // ring breathe
    const b = 1 + 0.007 * Math.sin(t * 0.55);
    ring.scale.setScalar(b);
    glow.scale.setScalar(b);
    glow.material.opacity = 0.08 + 0.04 * (0.5 + 0.5 * Math.sin(t * 0.55));

    // scroll-driven camera descent, then a gentle pull back out
    const e1 = ez(seg(p, 0, 0.42));
    const e2 = ez(seg(p, 0.55, 1));
    const elv = 1.42 - 1.35 * e1 + 0.2 * e2;
    const dist = 11.8 - 5.6 * e1 + 3 * e2;
    const az = 0.6 + t * 0.012 - p * 1.6;
    cam.position.set(
      Math.cos(az) * Math.cos(elv) * dist,
      Math.sin(elv) * dist,
      Math.sin(az) * Math.cos(elv) * dist,
    );
    cam.lookAt(0, 0, 0);

    hudText.textContent =
      'AZ ' + (((az * 57.2958) % 360 + 360) % 360).toFixed(1).padStart(5, '0') +
      '° · EL ' + (elv * 57.2958).toFixed(1) +
      '° · R ' + dist.toFixed(2) +
      ' · SCROLL ' + String(Math.round(target * 100)).padStart(3, '0');

    // tracked labels — project the pinned particles, hide when occluded/offscreen
    const C = cam.position;
    const R = 1.46; // sphere radius used for occlusion + label mask
    const camD = C.length();
    const scProj = pv.set(0, 0, 0).project(cam);
    const scx = (scProj.x * 0.5 + 0.5) * w;
    const scy = (-scProj.y * 0.5 + 0.5) * h;
    const perp = dv.set(-C.z, 0, C.x).normalize().multiplyScalar(R);
    const ep = pv.copy(perp).project(cam);
    const rpx = Math.hypot((ep.x * 0.5 + 0.5) * w - scx, (-ep.y * 0.5 + 0.5) * h - scy);

    for (let k = 0; k < labelNodes.length; k++) {
      const node = labelNodes[k];
      const reveal = ez(seg(p, 0.02 + k * 0.062, 0.06 + k * 0.062));
      if (reveal <= 0) { node.style.opacity = 0; continue; }
      const v = pv.set(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);
      const d = dv.copy(v).sub(C);
      const len = d.length();
      d.divideScalar(len);
      const tca = -C.dot(d);
      const occ = tca > 0 && tca < len && (C.lengthSq() - tca * tca) < R * R;
      v.project(cam);
      if (occ || v.z > 1 || Math.abs(v.x) > 0.96 || Math.abs(v.y) > 0.92) {
        node.style.opacity = 0;
        continue;
      }
      const px = (v.x * 0.5 + 0.5) * w - 5;
      const py = (-v.y * 0.5 + 0.5) * h;
      // fade a label into the sphere's silhouette as it passes behind the limb
      if (len > camD - R) {
        const m = 'radial-gradient(circle ' + rpx.toFixed(1) + 'px at ' +
          (scx - px).toFixed(1) + 'px ' +
          (scy - py + (node.offsetHeight || 20) / 2).toFixed(1) + 'px, transparent 98%, #000 100%)';
        node.style.webkitMaskImage = m;
        node.style.maskImage = m;
      } else if (node.style.maskImage) {
        node.style.webkitMaskImage = '';
        node.style.maskImage = '';
      }
      node.style.opacity = (reveal * Math.max(0.25, Math.min(0.95, 1.5 - len / 12))).toFixed(2);
      node.style.transform =
        'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px) translateY(-50%)';
    }

    rend.render(scene, cam);
  }

  /* ---------- loop / lifecycle ---------- */
  let raf = 0;
  let running = false;

  function loop() {
    raf = requestAnimationFrame(loop);
    renderFrame(performance.now());
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function onResize() {
    w = hero.clientWidth || window.innerWidth;
    h = hero.clientHeight || window.innerHeight;
    rend.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    if (reduceMotion) renderFrame(t0); // repaint the static pose at the new size
  }
  window.addEventListener('resize', onResize);

  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? start() : stop()),
    { threshold: 0.02 },
  );
  io.observe(hero);

  function onVis() {
    if (document.hidden) stop();
    else start();
  }
  document.addEventListener('visibilitychange', onVis);

  if (reduceMotion) {
    // Freeze at a settled, mid-descent pose so the scene reads as intended.
    p = 0.34;
    renderFrame(t0);
    hudDot.style.animation = 'none';
  } else {
    start();
  }

  return {
    destroy() {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      vignette.remove();
      overlay.remove();
      geo.dispose();
      dotTex.dispose();
      rend.dispose();
    },
  };
}
