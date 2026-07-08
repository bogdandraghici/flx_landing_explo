'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AMBER = 0xfdb913;

function buildGraph() {
  const NODES = [];
  const SPAN_COUNT = 6;
  const spanIdx = [];
  for (let i = 0; i < SPAN_COUNT; i++) {
    NODES.push({ pos: new THREE.Vector3(-6.5 + i * 2.6, 0, i % 2 === 0 ? 0.2 : -0.2), kind: 'span', size: [1.3, 0.7, 0.5] });
    spanIdx.push(NODES.length - 1);
  }
  const verifierIdx = [];
  for (let i = 0; i < SPAN_COUNT; i++) {
    const above = i % 2 === 0;
    NODES.push({ pos: new THREE.Vector3(-6.5 + i * 2.6 + (Math.random() - 0.5) * 0.3, above ? 2.4 : -2.4, (Math.random() - 0.5) * 0.8), kind: 'verifier', size: [0.9, 0.9, 0.9] });
    verifierIdx.push(NODES.length - 1);
  }
  NODES.push({ pos: new THREE.Vector3(0, 3.6, 0), kind: 'guardrail', size: [15.5, 0.2, 1.4] });
  const RAIL_TOP = NODES.length - 1;
  NODES.push({ pos: new THREE.Vector3(0, -3.6, 0), kind: 'guardrail', size: [15.5, 0.2, 1.4] });
  const RAIL_BOT = NODES.length - 1;
  NODES.push({ pos: new THREE.Vector3(0, 1.6, 0), kind: 'observer' });
  const OBSERVER = NODES.length - 1;

  const EDGES = [];
  for (let i = 0; i < SPAN_COUNT - 1; i++) EDGES.push([spanIdx[i], spanIdx[i + 1]]);
  for (let i = 0; i < SPAN_COUNT; i++) EDGES.push([spanIdx[i], verifierIdx[i]]);
  for (let i = 0; i < SPAN_COUNT; i++) EDGES.push([verifierIdx[i], OBSERVER]);
  EDGES.push([OBSERVER, RAIL_TOP]);
  EDGES.push([OBSERVER, RAIL_BOT]);
  return { NODES, EDGES, OBSERVER };
}

const baseOpacity = (k) => (k === 'guardrail' ? 0.35 : k === 'verifier' ? 0.9 : k === 'observer' ? 1 : 0.85);

export default function ObservatoryScene({ className = '' }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { NODES, EDGES, OBSERVER } = buildGraph();

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 16, 34);
    let width = mount.clientWidth || 1, height = mount.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 17);
    camera.lookAt(0, 0.2, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const pivot = new THREE.Group();
    pivot.rotation.x = 7 * (Math.PI / 180);
    scene.add(pivot);
    const root = new THREE.Group();
    pivot.add(root);

    const nodeObjs = [];
    const disposables = [];
    NODES.forEach((n) => {
      const group = new THREE.Group();
      group.position.copy(n.pos);
      let wire, hit, extra;
      if (n.kind === 'observer') {
        const torusGeo = new THREE.TorusGeometry(0.85, 0.06, 10, 48);
        const eGeo = new THREE.EdgesGeometry(torusGeo);
        disposables.push(torusGeo, eGeo);
        wire = new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 1 }));
        group.add(wire);
        const ringGeo = new THREE.RingGeometry(0.3, 0.34, 32);
        disposables.push(ringGeo);
        const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
        extra = ring;
        const hitGeo = new THREE.SphereGeometry(0.9, 12, 12);
        disposables.push(hitGeo);
        hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
        group.add(hit);
      } else {
        const [sx, sy, sz] = n.size ?? [1, 1, 1];
        const geo = new THREE.BoxGeometry(sx, sy, sz);
        const eGeo = new THREE.EdgesGeometry(geo);
        disposables.push(geo, eGeo);
        wire = new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ color: 0xf2efe6, transparent: true, opacity: baseOpacity(n.kind) }));
        group.add(wire);
        hit = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ visible: false }));
        group.add(hit);
        if (n.kind === 'verifier') {
          const pin = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), new THREE.MeshBasicMaterial({ color: AMBER }));
          group.add(pin);
        }
      }
      root.add(group);
      nodeObjs.push({ group, hit, wire, kind: n.kind, extra });
    });

    const edgeInfos = [];
    EDGES.forEach(([a, b]) => {
      const faint = NODES[a].kind === 'observer' || NODES[b].kind === 'observer' || NODES[a].kind === 'guardrail' || NODES[b].kind === 'guardrail';
      const midOffset = new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 1.0);
      const pa = NODES[a].pos, pb = NODES[b].pos;
      const curve = new THREE.CatmullRomCurve3([pa.clone(), new THREE.Vector3().addVectors(pa, pb).multiplyScalar(0.5).add(midOffset), pb.clone()]);
      const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: faint ? 0.1 : 0.22 }));
      root.add(line);
      edgeInfos.push({ from: a, to: b, midOffset, curve, line, geom });
    });
    const rebuildEdge = (info) => {
      const p0 = nodeObjs[info.from].group.position, p1 = nodeObjs[info.to].group.position;
      const mid = new THREE.Vector3().addVectors(p0, p1).multiplyScalar(0.5).add(info.midOffset);
      info.curve.points[0].copy(p0); info.curve.points[1].copy(mid); info.curve.points[2].copy(p1);
      info.geom.setFromPoints(info.curve.getPoints(40));
    };

    const packetGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const packets = [];
    for (let i = 0; i < 26; i++) {
      const mesh = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      root.add(mesh);
      packets.push({ edgeIdx: Math.floor(Math.random() * edgeInfos.length), t: Math.random(), speed: 0.55 + Math.random() * 0.6, mesh });
    }

    const pCount = 140;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.35 }));
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane();
    const dragOffset = new THREE.Vector3();
    const intersectPoint = new THREE.Vector3();
    let dragging = null, hovered = null;
    const canvas = renderer.domElement;
    canvas.style.touchAction = 'none';
    const updatePointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const pickNode = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(nodeObjs.map((n) => n.hit), false);
      if (!hits.length) return null;
      return nodeObjs.find((n) => n.hit === hits[0].object) ?? null;
    };
    const onDown = (e) => {
      updatePointer(e); const node = pickNode(); if (!node) return;
      dragging = node; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing';
      const camDir = new THREE.Vector3(); camera.getWorldDirection(camDir);
      const worldPos = new THREE.Vector3(); node.group.getWorldPosition(worldPos);
      dragPlane.setFromNormalAndCoplanarPoint(camDir, worldPos);
      raycaster.setFromCamera(pointer, camera); raycaster.ray.intersectPlane(dragPlane, intersectPoint);
      dragOffset.copy(worldPos).sub(intersectPoint);
    };
    const onMove = (e) => {
      updatePointer(e);
      if (dragging) {
        raycaster.setFromCamera(pointer, camera);
        if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
          const worldTarget = intersectPoint.clone().add(dragOffset);
          root.worldToLocal(worldTarget);
          dragging.group.position.copy(worldTarget);
          const idx = nodeObjs.indexOf(dragging);
          edgeInfos.forEach((info) => { if (info.from === idx || info.to === idx) rebuildEdge(info); });
        }
      } else {
        const node = pickNode();
        if (node !== hovered) {
          if (hovered) { hovered.wire.material.opacity = baseOpacity(hovered.kind); hovered.group.scale.setScalar(1); }
          hovered = node;
          if (hovered) { hovered.wire.material.opacity = 1; hovered.group.scale.setScalar(1.06); }
          canvas.style.cursor = hovered ? 'grab' : 'default';
        }
      }
    };
    const onUp = (e) => { if (dragging) { try { canvas.releasePointerCapture(e.pointerId); } catch {} dragging = null; canvas.style.cursor = hovered ? 'grab' : 'default'; } };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', onUp);

    const clock = new THREE.Clock();
    let time = 0, raf = 0;
    const tmp = new THREE.Vector3();
    const flash = new Array(nodeObjs.length).fill(0);
    const observer = nodeObjs[OBSERVER];
    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!dragging) { time += dt; root.rotation.y = Math.sin(time * 0.25) * (10 * Math.PI / 180); }
      observer.wire.rotation.z += dt * 0.6;
      if (observer.extra) {
        const s = 1 + (Math.sin(clock.elapsedTime * 2.4) + 1) * 0.8;
        observer.extra.scale.setScalar(s);
        observer.extra.material.opacity = 0.55 - (s - 1) * 0.25;
      }
      nodeObjs.forEach((n, i) => {
        if (flash[i] > 0) { flash[i] -= dt; n.wire.material.opacity = baseOpacity(n.kind) + Math.max(0, flash[i] / 0.3) * 0.5; }
      });
      packets.forEach((p) => {
        p.t += p.speed * dt;
        while (p.t >= 1) {
          const info = edgeInfos[p.edgeIdx];
          flash[info.to] = 0.3;
          const cands = edgeInfos.map((e, idx) => ({ e, idx })).filter((x) => x.e.from === info.to);
          if (cands.length) p.edgeIdx = cands[Math.floor(Math.random() * cands.length)].idx;
          else {
            const spine = edgeInfos.map((e, idx) => ({ e, idx })).filter((x) => NODES[x.e.from].kind === 'span');
            p.edgeIdx = spine[Math.floor(Math.random() * spine.length)].idx;
          }
          p.t -= 1;
        }
        edgeInfos[p.edgeIdx].curve.getPoint(p.t, tmp);
        p.mesh.position.copy(tmp);
      });
      particles.rotation.y += dt * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      width = mount.clientWidth; height = mount.clientHeight;
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerleave', onUp);
      renderer.dispose(); packetGeo.dispose(); pGeo.dispose();
      disposables.forEach((d) => d.dispose());
      edgeInfos.forEach((e) => { e.geom.dispose(); e.line.material.dispose(); });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className={className} />;
}
