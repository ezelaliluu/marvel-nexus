import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export default function AntiGravityCosmos() {
  const pointsRef = useRef();

  // Procedural cosmic dust nebula particles
  const [positions, colors] = useMemo(() => {
    const particleCount = 1200;
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const cosmicPalette = [
      new THREE.Color("#7e22ce"), // Deep purple
      new THREE.Color("#3b82f6"), // Cosmic blue
      new THREE.Color("#ec4899"), // Nebula pink
      new THREE.Color("#eab308"), // Gold dust
      new THREE.Color("#06b6d4"), // Cyan glow
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 9;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      pos[i3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i3 + 2] = radius * Math.cos(theta);

      const color = cosmicPalette[Math.floor(Math.random() * cosmicPalette.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.05;
    }
  });

  return (
    <>
      {/* Background color and deep space fog */}
      <color attach="background" args={["#040408"]} />
      <fog attach="fog" args={["#040408", 8, 22]} />

      {/* Drei Starfield */}
      <Stars
        radius={50}
        depth={50}
        count={3500}
        factor={3.5}
        saturation={0.5}
        fade
        speed={1.2}
      />

      {/* Drifting Nebula Dust Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.4} color="#7b82a0" />
      
      {/* Golden Key Light */}
      <spotLight
        position={[5, 8, 5]}
        angle={0.45}
        penumbra={0.9}
        intensity={3.5}
        color="#ffeaa7"
        castShadow
      />

      {/* Mystic Purple Rim Light */}
      <pointLight
        position={[-6, -3, -4]}
        intensity={2.8}
        color="#a855f7"
        distance={18}
      />

      {/* Cold Cosmic Fill Light */}
      <directionalLight
        position={[-4, 5, 2]}
        intensity={1.2}
        color="#38bdf8"
      />
    </>
  );
}
