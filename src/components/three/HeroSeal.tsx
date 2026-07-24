"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#d9a54a";
const GOLD_BRIGHT = "#efc26b";
const GOLD_DEEP = "#8a6420";
const OCCLUDER = "#0a1020";

const TICK_COUNT = 72;
const TICK_RADIUS = 1.92;

/** Serrated tick ring — the "seal" edge, built as one instanced mesh. */
function TickRing() {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current!;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    for (let i = 0; i < TICK_COUNT; i++) {
      const angle = (i / TICK_COUNT) * Math.PI * 2;
      p.set(Math.cos(angle) * TICK_RADIUS, Math.sin(angle) * TICK_RADIUS, 0);
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      const long = i % 6 === 0;
      s.set(long ? 0.22 : 0.1, 0.014, 0.014);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, TICK_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.8} />
    </instancedMesh>
  );
}

/** Small dot travelling the ring — a quiet "scanning / verifying" pulse. */
function ScannerDot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.5;
    ref.current!.position.set(Math.cos(t) * 1.62, Math.sin(t) * 1.62, 0);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={GOLD_BRIGHT} />
    </mesh>
  );
}

function Seal() {
  const root = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    outer.current!.rotation.z -= d * 0.06;
    core.current!.rotation.y += d * 0.22;
    core.current!.rotation.x += d * 0.07;
    // subtle mouse parallax, eased
    const r = root.current!;
    r.rotation.x = THREE.MathUtils.lerp(r.rotation.x, mouse.current.y * 0.22, 0.04);
    r.rotation.y = THREE.MathUtils.lerp(r.rotation.y, mouse.current.x * 0.3, 0.04);
  });

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.62, 0.008, 8, 128), []);
  const innerRingGeo = useMemo(() => new THREE.TorusGeometry(1.34, 0.004, 8, 128), []);

  return (
    <group ref={root}>
      <group ref={outer}>
        <TickRing />
        <mesh geometry={ringGeo}>
          <meshBasicMaterial color={GOLD_DEEP} transparent opacity={0.9} />
        </mesh>
        <ScannerDot />
      </group>

      <mesh geometry={innerRingGeo} rotation={[Math.PI / 3.2, 0.4, 0]}>
        <meshBasicMaterial color={GOLD_DEEP} transparent opacity={0.5} />
      </mesh>

      <group ref={core}>
        {/* dark occluder so the back of the wireframe recedes */}
        <mesh>
          <icosahedronGeometry args={[0.86, 1]} />
          <meshBasicMaterial color={OCCLUDER} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.88, 1]} />
          <meshBasicMaterial color={GOLD_BRIGHT} wireframe transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroSeal({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Seal />
    </Canvas>
  );
}
