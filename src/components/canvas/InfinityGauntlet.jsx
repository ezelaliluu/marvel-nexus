import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { INFINITY_STONES } from "../../data/marvelData";
import { soundFx } from "../../utils/sound";

// Glowing Infinity Stone subcomponent with dedicated localized pointLight and pulse
function InfinityStone({ stone, onSelectStone, isSelected }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Dynamic cosmic pulse
    const pulse = Math.sin(t * 3.5 + stone.position[0] * 5) * 0.3 + 1;
    const scale = (hovered || isSelected ? 1.3 : 1) * pulse;
    meshRef.current.scale.set(scale, scale, scale);

    if (lightRef.current) {
      lightRef.current.intensity = (hovered || isSelected ? 3.5 : 1.8) * pulse;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    soundFx.playStoneResonance(520 + stone.position[0] * 200);
    if (onSelectStone) onSelectStone(stone);
  };

  const frequencies = {
    Power: 440,
    Space: 494,
    Reality: 554,
    Soul: 587,
    Time: 659,
    Mind: 740,
  };

  return (
    <group position={stone.position}>
      {/* Stone Socket Inset Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 16, 24]} />
        <meshStandardMaterial
          color="#33240e"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Pulsing Crystal Gem */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          soundFx.playStoneResonance(frequencies[stone.name] || 500);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <octahedronGeometry args={[stone.name === "Mind" ? 0.095 : 0.065, 0]} />
        <meshPhysicalMaterial
          color={stone.color}
          emissive={stone.color}
          emissiveIntensity={hovered || isSelected ? 3.2 : 1.8}
          roughness={0.08}
          metalness={0.2}
          transmission={0.4}
          thickness={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Gem Local Point Light */}
      <pointLight
        ref={lightRef}
        color={stone.color}
        distance={1.6}
        intensity={1.8}
        decay={2}
      />
    </group>
  );
}

// Articulated Finger with individual phalanges and gold plating
function GauntletFinger({ origin, angles, length = 0.45, thickness = 0.075 }) {
  return (
    <group position={origin}>
      {/* Proximal Phalanx */}
      <mesh position={[0, length * 0.35, 0]} rotation={[angles[0], 0, 0]}>
        <cylinderGeometry args={[thickness * 0.9, thickness, length * 0.7, 16]} />
        <meshStandardMaterial
          color="#c8963e"
          roughness={0.28}
          metalness={0.88}
        />
        {/* Joint Knuckle Ring */}
        <mesh position={[0, length * 0.35, 0]}>
          <sphereGeometry args={[thickness * 1.05, 12, 12]} />
          <meshStandardMaterial color="#8b6521" roughness={0.35} metalness={0.92} />
        </mesh>

        {/* Distal Phalanx & Armored Claw Tip */}
        <group position={[0, length * 0.7, 0]} rotation={[angles[1], 0, 0]}>
          <mesh position={[0, length * 0.3, 0]}>
            <coneGeometry args={[thickness * 0.85, length * 0.6, 16]} />
            <meshStandardMaterial
              color="#e0ac4a"
              roughness={0.25}
              metalness={0.92}
            />
          </mesh>
        </group>
      </mesh>
    </group>
  );
}

export default function InfinityGauntlet({ onSelectStone, selectedStone }) {
  const gauntletRef = useRef();
  const innerRef = useRef();

  // Subtle interactive mouse tilt in zero gravity
  useFrame(({ pointer, clock }) => {
    if (!innerRef.current) return;
    const targetRotX = -pointer.y * 0.35;
    const targetRotY = pointer.x * 0.5 + Math.sin(clock.getElapsedTime() * 0.6) * 0.15;
    const targetRotZ = -pointer.x * 0.15;

    innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, targetRotX, 0.05);
    innerRef.current.rotation.y = THREE.MathUtils.lerp(innerRef.current.rotation.y, targetRotY, 0.05);
    innerRef.current.rotation.z = THREE.MathUtils.lerp(innerRef.current.rotation.z, targetRotZ, 0.05);
  });

  return (
    <group ref={gauntletRef}>
      <Float
        speed={1.8}
        rotationIntensity={1.2}
        floatIntensity={1.6}
        floatingRange={[-0.15, 0.15]}
      >
        <group ref={innerRef} rotation={[0.2, -0.3, 0.1]}>
          {/* ============ GAUNTLET FOREARM / BRACER ============ */}
          <group position={[0, -0.9, 0]}>
            {/* Main Forearm Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.38, 0.46, 1.25, 32]} />
              <meshStandardMaterial
                color="#b88628"
                metalness={0.88}
                roughness={0.3}
              />
            </mesh>

            {/* Bronze Inset Armor Flutes */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.39, 0.47, 1.2, 8]} />
              <meshStandardMaterial
                color="#78551b"
                metalness={0.92}
                roughness={0.4}
                wireframe={false}
              />
            </mesh>

            {/* Forearm Cuff Rim Ring (Base) */}
            <mesh position={[0, -0.62, 0]}>
              <torusGeometry args={[0.47, 0.05, 16, 32]} />
              <meshStandardMaterial
                color="#d4af37"
                metalness={0.95}
                roughness={0.2}
              />
            </mesh>

            {/* Forearm Mid Ring Trim */}
            <mesh position={[0, 0.05, 0]}>
              <torusGeometry args={[0.42, 0.035, 16, 32]} />
              <meshStandardMaterial
                color="#e5be49"
                metalness={0.92}
                roughness={0.25}
              />
            </mesh>
          </group>

          {/* ============ WRIST GUARD & PALM CARAPACE ============ */}
          <group position={[0, 0, 0]}>
            {/* Articulated Wrist Collar */}
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.36, 0.39, 0.22, 32]} />
              <meshStandardMaterial
                color="#946d1b"
                metalness={0.9}
                roughness={0.35}
              />
            </mesh>

            {/* Dorsal Hand Plate (Palm & Back of Hand) */}
            <mesh position={[0, 0.25, 0.04]} scale={[1.1, 0.9, 0.7]}>
              <boxGeometry args={[0.7, 0.65, 0.45]} />
              <meshStandardMaterial
                color="#c49533"
                metalness={0.9}
                roughness={0.28}
              />
            </mesh>

            {/* Raised Dorsal Gem Mount Crest */}
            <mesh position={[0, 0.28, 0.23]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.19, 0.05, 8]} />
              <meshStandardMaterial
                color="#7c5512"
                metalness={0.95}
                roughness={0.3}
              />
            </mesh>

            {/* Knuckle Arch Bar */}
            <mesh position={[0, 0.54, 0.12]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.72, 16]} />
              <meshStandardMaterial
                color="#b88628"
                metalness={0.92}
                roughness={0.25}
              />
            </mesh>
          </group>

          {/* ============ 5 ARTICULATED FINGERS ============ */}
          {/* Index Finger (Power Stone) */}
          <GauntletFinger
            origin={[-0.3, 0.58, 0.11]}
            angles={[0.3, 0.4]}
            length={0.42}
            thickness={0.062}
          />

          {/* Middle Finger (Space Stone) */}
          <GauntletFinger
            origin={[-0.15, 0.61, 0.12]}
            angles={[0.25, 0.35]}
            length={0.48}
            thickness={0.065}
          />

          {/* Ring Finger (Reality Stone) */}
          <GauntletFinger
            origin={[0.0, 0.6, 0.12]}
            angles={[0.3, 0.4]}
            length={0.45}
            thickness={0.063}
          />

          {/* Pinky Finger (Soul Stone) */}
          <GauntletFinger
            origin={[0.15, 0.55, 0.11]}
            angles={[0.35, 0.45]}
            length={0.38}
            thickness={0.058}
          />

          {/* Opposable Thumb (Time Stone) */}
          <group position={[0.32, 0.32, 0.05]} rotation={[0.4, -0.6, -0.5]}>
            <GauntletFinger
              origin={[0, 0, 0]}
              angles={[0.35, 0.3]}
              length={0.38}
              thickness={0.068}
            />
          </group>

          {/* ============ 6 GLOWING INFINITY STONES ============ */}
          {INFINITY_STONES.map((stone) => (
            <InfinityStone
              key={stone.name}
              stone={stone}
              onSelectStone={onSelectStone}
              isSelected={selectedStone?.name === stone.name}
            />
          ))}

          {/* Central Cosmic Energy Aura Core */}
          <pointLight
            position={[0, 0.3, 0.4]}
            color="#ffd700"
            intensity={2.2}
            distance={3}
            decay={2}
          />
        </group>
      </Float>
    </group>
  );
}
