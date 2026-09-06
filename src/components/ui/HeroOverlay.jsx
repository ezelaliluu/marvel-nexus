import React from "react";
import { ChevronDown, Shield, Compass, Sparkles } from "lucide-react";
import { soundFx } from "../../utils/sound";

export default function HeroOverlay({ onScrollToCatalog }) {
  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center text-center px-4 pt-16 pb-12 select-none pointer-events-none">
      {/* Top Banner Tag */}
      <div className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl animate-pulse-glow">
        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
        <span className="text-xs uppercase tracking-widest font-mono text-amber-300 font-semibold">
          Anti-Gravity Quantum Vault
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-xs text-slate-300">Earth-616 Canon</span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="max-w-4xl mx-auto space-y-4 my-auto pointer-events-auto">
        <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-xs tracking-widest font-bold uppercase mb-2">
          Interactive 3D Experience
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          The Mad Titan <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent text-glow-gold">
            Infinity Gauntlet
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed drop-shadow-md">
          Suspended in a zero-gravity cosmic void, the six primordial singularities pulse with unfathomable power. 
          Interact with the 3D artifact or scroll down to explore the premier catalog of Thanos comics and MCU blockbusters.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              soundFx.playStoneResonance(600);
              onScrollToCatalog();
            }}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            Explore Content Vault
          </button>

          <div className="px-5 py-3 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Hover or Click Any Stone</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        onClick={onScrollToCatalog}
        className="pointer-events-auto flex flex-col items-center gap-2 text-slate-400 hover:text-amber-400 transition cursor-pointer group"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase group-hover:tracking-wider transition-all">
          Scroll To Enter Catalog
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-amber-400" />
      </div>
    </section>
  );
}
