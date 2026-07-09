'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODES = [
  { pos: [-6, 1.6, 0], kind: 'input' },
  { pos: [-2.2, 2.6, 0.6], kind: 'agent' },
  { pos: [-2.2, 0.4, -0.6], kind: 'tool' },
  { pos: [1.6, 2.8, -0.4], kind: 'agent' },
  { pos: [1.6, 0.2, 0.8], kind: 'tool' },
  { pos: [1.6, -2.2, 0], kind: 'agent' },
  { pos: [5.4, 1.2, 0.4], kind: 'agent' },
  { pos: [5.4, -1.6, -0.4], kind: 'tool' },
  { pos: [8.6, -0.2, 0], kind: 'output' },
];
const EDGES = [[0,1],[0,2],[1,3],[1,4],[2,3],[2,5],[3,6],[4,6],[4,5],[5,7],[6,8],[7,8],[6,7]];
const AMBER = 0xfdb913;
const INK = 0xf2efe6;

export default function AgentBuilderScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 14, 30);
    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 14);
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

    const nodeGeo = new THREE.BoxGeometry(1.4, 0.8, 0.5);
    const edgeGeo = new THREE.EdgesGeometry(nodeGeo);
    const vec = (a) => new THREE.Vector3(a[0], a[1], a[2]);
    const nodeObjs = [];

    NODES.forEach((n) => {
      const group = new THREE.Group();
      group.position.copy(vec(n.pos));
      const wire = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.85 }));
      group.add(wire);
      const hit = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ visible: false }));
      group.add(hit);
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), new THREE.MeshBasicMaterial({ color: n.kind === 'output' || n.kind === 'input' ? AMBER : 0xf5f3ec }));
      group.add(pin);
      root.add(group);
      nodeObjs.push({ group, hit, wire, pin });
    });

    const edgeInfos = [];
    EDGES.forEach(([a, b]) => {
      const midOffset = new THREE.Vector3(0, 0, (Math.random() - 0.5) * 1.4);
      const curve = new THREE.CatmullRomCurve3([
        vec(NODES[a].pos), new THREE.Vector3().addVectors(vec(NODES[a].pos), vec(NODES[b].pos)).multiplyScalar(0.5).add(midOffset), vec(NODES[b].pos),
      ]);
      const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 }));
      root.add(line);
      edgeInfos.push({ from: a, to: b, midOffset, curve, line, geom });
    });

    const rebuildEdge = (info) => {
      const p0 = nodeObjs[info.from].group.position;
      const p1 = nodeObjs[info.to].group.position;
      const mid = new THREE.Vector3().addVectors(p0, p1).multiplyScalar(0.5).add(info.midOffset);
      info.curve.points[0].copy(p0); info.curve.points[1].copy(mid); info.curve.points[2].copy(p1);
      info.geom.setFromPoints(info.curve.getPoints(40));
    };

    const packetGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const packets = [];
    for (let i = 0; i < 24; i++) {
      const mesh = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      root.add(mesh);
      packets.push({ edgeIdx: Math.floor(Math.random() * edgeInfos.length), t: Math.random(), speed: 0.55 + Math.random() * 0.6, mesh });
    }

    const pCount = 140;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.4 }));
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
      updatePointer(e);
      const node = pickNode();
      if (!node) return;
      dragging = node;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      const worldPos = new THREE.Vector3();
      node.group.getWorldPosition(worldPos);
      dragPlane.setFromNormalAndCoplanarPoint(camDir, worldPos);
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(dragPlane, intersectPoint);
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
          if (hovered) { hovered.wire.material.opacity = 0.85; hovered.group.scale.setScalar(1); }
          hovered = node;
          if (hovered) { hovered.wire.material.opacity = 1; hovered.group.scale.setScalar(1.08); }
          canvas.style.cursor = hovered ? 'grab' : 'default';
        }
      }
    };
    const onUp = (e) => {
      if (dragging) { try { canvas.releasePointerCapture(e.pointerId); } catch {} dragging = null; canvas.style.cursor = hovered ? 'grab' : 'default'; }
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', onUp);

    const clock = new THREE.Clock();
    let time = 0, raf = 0;
    const tmp = new THREE.Vector3();
    const flash = new Array(nodeObjs.length).fill(0);
    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!dragging) { time += dt; root.rotation.y = Math.sin(time * 0.25) * (10 * Math.PI / 180); }
      nodeObjs.forEach((n, i) => {
        n.pin.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + i) * 0.15);
        if (flash[i] > 0) { flash[i] -= dt; n.wire.material.opacity = 0.85 + Math.max(0, flash[i] / 0.3) * 0.6; }
      });
      packets.forEach((p) => {
        p.t += p.speed * dt;
        while (p.t >= 1) {
          const info = edgeInfos[p.edgeIdx];
          flash[info.to] = 0.3;
          const cands = edgeInfos.map((e, idx) => ({ e, idx })).filter((x) => x.e.from === info.to);
          p.edgeIdx = cands.length ? cands[Math.floor(Math.random() * cands.length)].idx : Math.floor(Math.random() * edgeInfos.length);
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
      camera.aspect = width / height; camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
      renderer.dispose();
      nodeGeo.dispose(); edgeGeo.dispose(); packetGeo.dispose(); pGeo.dispose();
      edgeInfos.forEach((e) => { e.geom.dispose(); e.line.material.dispose(); });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
