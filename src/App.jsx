import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Float,
} from "@react-three/drei";
import {
  Zap,
  Eye,
  Wind,
  Layers,
  ShoppingBag,
  ChevronRight,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

/* =========================================================================
   1. DATA DEFINITIONS (Outside Main Component)
   ========================================================================= */
const marvelVariants = [
  {
    id: "iron-man-mk85",
    variantName: "Mark LXXXV Tactical Armor",
    title: "IRON MAN MARK LXXXV",
    subtitle: "STARK INDUSTRIES // TACTICAL ARTIFACT",
    desc: "Forged with a high-density gold-titanium nanoparticle matrix. Features integrated neural telemetry, 360° holographic retinal HUD targeting, and direct Arc-Core quantum power routing for extreme combat velocity.",
    modelPath: "/models/iron_man_rig.glb",
    scale: 0.005,
    position: [0, -1.9, 0],
    rotation: [0, 0, 0],
    accentColor: "#dc2626",
    accentGlow: "rgba(220, 38, 38, 0.35)",
    badge: "AVENGERS APEX SPEC",
  },
  {
    id: "ghost-rider",
    variantName: "Ghost Rider",
    title: "Ghost Rider",
    subtitle: "COSMIC ARTIFACT",
    desc: "Engineered from programmable smart nanoparticles to channel the raw gamma radiation and multiversal cosmic frequencies of all six Infinity Stones without biological cellular collapse.",
    modelPath: "/models/ghost_rider.glb",
    scale: 0.004,
    position: [0.0, -1, 0],
    rotation: [0, 0, 0],
    accentColor: "#ff0000",
    accentGlow: "rgba(255, 0, 0, 0.35)",
    badge: "VENGENCE FROM THE FUTURE",
  },
  {
    id: "thanos-conqueror",
    variantName: "Titan Warlord Armor",
    title: "WARLORD OF TITAN",
    subtitle: "BLACK ORDER // CONQUEROR SERIES",
    desc: "Heavy battle-tested uru-infused titanium plating crafted specifically for the Mad Titan. Engineered to withstand direct planetary bombardment and withstand close-quarters cosmic duels.",
    modelPath: "/models/thanos__the_endgame.glb",
    scale: 0.1,
    position: [0.25, -1.05, 0],
    rotation: [0, -0.45, 0],
    accentColor: "#9333ea",
    accentGlow: "rgba(147, 51, 234, 0.35)",
    badge: "LEVEL 9 RESTRICTED",
  },
];

// Preload models for instant transitions
marvelVariants.forEach((variant) => {
  useGLTF.preload(variant.modelPath);
});

const specsData = [
  {
    icon: Layers,
    title: "Nanotech Matrix",
    detail: "Sub-micron lattice reformation in <0.6s",
  },
  {
    icon: Zap,
    title: "Arc Core Output",
    detail: "8.4 Terawatts sustained energy throughput",
  },
  {
    icon: Eye,
    title: "Retinal HUD",
    detail: "Quantum trajectory & optical telemetry",
  },
  {
    icon: Wind,
    title: "Vectored Thrust",
    detail: "Mach 8.2 zero-drag supersonic flight",
  },
];

/* =========================================================================
   2. 3D MODEL COMPONENT (Strictly GLB only - No placeholder geometries)
   ========================================================================= */
function MarvelArtifactModel({ url, scale, position, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

/* =========================================================================
   3. MAIN APPLICATION (PlayStation DualSense Layout Overlay)
   ========================================================================= */
export default function App() {
  const [activeItem, setActiveItem] = useState(marvelVariants[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#060608] text-slate-100 select-none font-sans antialiased">
      {/* Dynamic Cinematic Studio Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, ${activeItem.accentGlow} 0%, rgba(9, 10, 15, 0.85) 45%, #050507 88%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle Technical Grid Underlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ==================================================================
          BACKGROUND LAYER: 3D Canvas
          Accepts mouse click & drag for 360 inspect
          ================================================================== */}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0.1, 4.8], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting Rig */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight
            position={[-5, 2, -2]}
            intensity={1.8}
            color={activeItem.accentColor}
          />
          <directionalLight
            position={[0, 4, -5]}
            intensity={1.5}
            color="#ffffff"
          />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.65}
            scale={9}
            blur={2.4}
            far={3.5}
            color="#000000"
          />

          {/* Zero Gravity Gentle Float */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
            <Suspense fallback={null}>
              <MarvelArtifactModel
                key={activeItem.modelPath}
                url={activeItem.modelPath}
                scale={activeItem.scale}
                position={activeItem.position}
                rotation={activeItem.rotation}
              />
            </Suspense>
          </Float>

          {/* City HDR Environment for reflections */}
          <Environment preset="city" />

          {/* Orbit Controls (enableZoom={false} enablePan={false}) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 1.7}
            autoRotate={isAutoRotate}
            autoRotateSpeed={0.85}
            rotateSpeed={0.65}
          />
        </Canvas>
      </div>

      {/* ==================================================================
          FOREGROUND LAYER: UI Overlay (Tailwind CSS)
          Uses pointer-events-none container with pointer-events-auto elements
          ================================================================== */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 pointer-events-none overflow-hidden">
        {/* ----------------------------------------------------------------
            TOP NAVBAR: Minimalist text logo, centered links, right controls
            ---------------------------------------------------------------- */}
        <header className="w-full flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-lg transition-colors duration-500"
              style={{ backgroundColor: activeItem.accentColor }}
            >
              MARVEL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold">
                  STARK ARCHIVE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                Vault OS // 2026.09
              </p>
            </div>
          </div>

          {/* Center Links (DualSense promo style) */}
          <nav className="hidden md:flex items-center gap-8 bg-white/[0.03] backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-xl shadow-black/40">
            {["Overview", "Architecture", "Nanotech OS", "Telemetry", "Specifications"].map(
              (item, i) => (
                <button
                  key={item}
                  className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                    i === 0
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 360 Turntable Auto-Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title="Toggle Turntable Spin"
              className={`p-2 rounded-full backdrop-blur-md border transition-all hover:scale-105 ${
                isAutoRotate
                  ? "bg-red-600/20 border-red-500/50 text-red-400"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-300"
              }`}
            >
              <RotateCw
                className={`w-4 h-4 ${isAutoRotate ? "animate-spin" : ""}`}
                style={{ animationDuration: "6s" }}
              />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-all hover:scale-105"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartCount((c) => c + 1)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-md border border-white/10 text-xs text-slate-200 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-xs">{cartCount}</span>
            </button>
          </div>
        </header>

        {/* ----------------------------------------------------------------
            MIDDLE SECTION: Left Column (Info) & Right Column (Variants)
            ---------------------------------------------------------------- */}
        <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 items-center my-auto pointer-events-none">
          {/* LEFT COLUMN: Dynamic active item details */}
          <div className="lg:col-span-5 max-w-md pointer-events-auto space-y-4 md:space-y-6">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[11px] font-mono tracking-widest uppercase">
              <Sparkles
                className="w-3 h-3 animate-spin"
                style={{ color: activeItem.accentColor, animationDuration: "4s" }}
              />
              <span className="text-slate-300">{activeItem.subtitle}</span>
            </div>

            {/* Large Bold Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400 leading-[1.05]">
                {activeItem.title}
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
                {activeItem.badge}
              </p>
            </div>

            {/* Short Elegant Description */}
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
              {activeItem.desc}
            </p>

            {/* Price Tag & Stock Status */}
            <div className="pt-1 flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                {activeItem.price}
              </span>
              <span className="text-[11px] font-mono tracking-wide text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                IN STOCK // PRE-ORDER OPEN
              </span>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCartCount((c) => c + 1)}
                className="group relative px-7 py-3.5 rounded-full font-medium text-xs tracking-wider uppercase overflow-hidden text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${activeItem.accentColor}, #7f1d1d)`,
                  boxShadow: `0 10px 25px -5px ${activeItem.accentGlow}`,
                }}
              >
                <span>ACQUIRE ARTIFACT</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className="px-5 py-3.5 rounded-full font-medium text-xs tracking-wider uppercase text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>360° VIEW</span>
              </button>
            </div>

            <p className="text-[10px] font-mono text-slate-400/90 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full border border-slate-500 animate-ping" />
              Click & drag in center stage to rotate 3D artifact in 360°.
            </p>
          </div>

          {/* Center Spacer for 3D Model Breathing Room */}
          <div className="hidden lg:block lg:col-span-4 pointer-events-none" />

          {/* RIGHT COLUMN: Vertical stack of glassmorphism variant cards */}
          <div className="lg:col-span-3 flex lg:flex-col justify-end lg:justify-center gap-3 pointer-events-auto mt-6 lg:mt-0">
            <div className="hidden lg:block mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                SELECT ARTIFACT VARIANT
              </span>
            </div>

            {marvelVariants.map((variant) => {
              const isSelected = activeItem.id === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => setActiveItem(variant)}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-xl backdrop-blur-xl transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? "bg-white/[0.08] border-white/35 shadow-xl scale-[1.02]"
                      : "bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/20"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 8px 24px -4px ${variant.accentGlow}` : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Color Swatch / Active Glow Indicator */}
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/30 transition-transform group-hover:scale-110 shadow-sm"
                      style={{ backgroundColor: variant.accentColor }}
                    />

                    <div>
                      <div className="text-xs font-semibold tracking-wide text-slate-200 group-hover:text-white">
                        {variant.variantName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {variant.price} • {variant.badge}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div
                      className="w-1.5 h-6 rounded-full"
                      style={{ backgroundColor: variant.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------------
            BOTTOM ROW: Specs cards mimicking the PS5 DualSense footer
            ---------------------------------------------------------------- */}
        <footer className="w-full pointer-events-auto pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {specsData.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.title}
                  className="p-3.5 sm:p-4 rounded-xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-amber-400 group-hover:text-amber-300 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-200 tracking-wide">
                      {spec.title}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    {spec.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </footer>
      </div>
    </div>
  );
}
