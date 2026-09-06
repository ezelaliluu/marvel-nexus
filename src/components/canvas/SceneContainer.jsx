import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import * as THREE from "three";
import InfinityGauntlet from "./InfinityGauntlet";
import AntiGravityCosmos from "./AntiGravityCosmos";
import FloatingDebris from "./FloatingDebris";

// Handles smooth interpolation of 3D Gauntlet based on scroll position
function ScrollRig({ onSelectStone, selectedStone }) {
  const groupRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (!groupRef.current || !scroll) return;

    // r is scroll offset from 0 to 1
    const r = scroll.offset;

    // Phase 1 (0 to 0.35): Hero centering, slight float
    // Phase 2 (0.35 to 1.0): Shifts smoothly to the top-right / side, scales down
    const targetX = THREE.MathUtils.lerp(0, 2.5, Math.min(r * 2.2, 1));
    const targetY = THREE.MathUtils.lerp(-0.25, 0.65, Math.min(r * 2.2, 1));
    const targetZ = THREE.MathUtils.lerp(0, -1.6, Math.min(r * 2.2, 1));

    const targetScale = THREE.MathUtils.lerp(1.05, 0.58, Math.min(r * 2.5, 1));
    const targetRotY = THREE.MathUtils.lerp(0, -0.6, Math.min(r * 2, 1));
    const targetRotX = THREE.MathUtils.lerp(0, 0.25, Math.min(r * 2, 1));

    // Smooth dampening
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      <InfinityGauntlet onSelectStone={onSelectStone} selectedStone={selectedStone} />
    </group>
  );
}

export default function SceneContainer({
  children,
  onSelectStone,
  selectedStone,
  pages = 3.6,
}) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto bg-[#040408]">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <Suspense fallback={null}>
          <AntiGravityCosmos />
          <FloatingDebris count={40} />

          <ScrollControls pages={pages} damping={0.25}>
            {/* 3D World layer */}
            <Scroll>
              <ScrollRig
                onSelectStone={onSelectStone}
                selectedStone={selectedStone}
              />
            </Scroll>

            {/* Synchronized HTML DOM layer */}
            <Scroll html style={{ width: "100%", pointerEvents: "auto" }}>
              {children}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
