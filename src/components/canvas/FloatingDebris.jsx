import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingDebris({ count = 35 }) {
  const meshRef = useRef();

  // Generate random asteroid fragments & crystal shards
  const debrisData = useMemo(() => {
    const items = [];
    const colors = [
      new THREE.Color("#d4af37"), // Gold alloy
      new THREE.Color("#7e22ce"), // Power stone shard
      new THREE.Color("#2563eb"), // Space stone shard
      new THREE.Color("#475569"), // Dark cosmic rock
      new THREE.Color("#64748b"), // Basalt
    ];

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;

      items.push({
        position: [Math.cos(theta) * radius, y, Math.sin(theta) * radius + z],
        scale: 0.04 + Math.random() * 0.12,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015,
        ],
        floatOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, [count]);

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle global zero-gravity drift
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.children.forEach((child, i) => {
      const d = debrisData[i];
      if (d) {
        child.rotation.x += d.rotationSpeed[0];
        child.rotation.y += d.rotationSpeed[1];
        child.rotation.z += d.rotationSpeed[2];
        child.position.y = d.position[1] + Math.sin(t * 0.8 + d.floatOffset) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {debrisData.map((d, i) => (
        <mesh key={i} position={d.position} scale={d.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={d.color}
            roughness={0.4}
            metalness={0.8}
            emissive={d.color}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
