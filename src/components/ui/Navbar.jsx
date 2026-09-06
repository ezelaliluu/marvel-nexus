import React, { useState } from "react";
import { Search, Volume2, VolumeX, Sparkles, X, ShieldAlert } from "lucide-react";
import { INFINITY_STONES } from "../../data/marvelData";
import { soundFx } from "../../utils/sound";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onTriggerSnap,
  selectedStone,
  setSelectedStone,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  const handleToggleSound = () => {
    if (!isAudioStarted) {
      soundFx.startAmbientHum();
      setIsAudioStarted(true);
    }
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleStoneClick = (stone) => {
    if (selectedStone?.name === stone.name) {
      setSelectedStone(null);
    } else {
      setSelectedStone(stone);
      soundFx.playStoneResonance(550);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-[#040408]/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Marvel Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#e62429] text-white font-black px-2.5 py-1 tracking-tighter text-lg uppercase shadow-[0_0_15px_rgba(230,36,41,0.5)]">
            MARVEL
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Titan Vault
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              Zero-G Archive
            </span>
          </div>
        </div>

        {/* Infinity Stones Aura Filter Bar */}
        <div className="hidden md:flex items-center gap-1.5 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mr-1">
            Gems:
          </span>
          {INFINITY_STONES.map((stone) => {
            const isActive = selectedStone?.name === stone.name;
            return (
              <button
                key={stone.name}
                onClick={() => handleStoneClick(stone)}
                title={`${stone.name} Stone: ${stone.desc}`}
                className={`w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center text-[10px] font-bold ${
                  isActive
                    ? "ring-2 ring-white scale-125 shadow-lg"
                    : "opacity-75 hover:opacity-100 hover:scale-110"
                }`}
                style={{
                  backgroundColor: stone.color,
                  boxShadow: isActive ? `0 0 12px ${stone.color}` : "none",
                }}
              >
                {stone.name[0]}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3">
          {/* Live Search Input */}
          <div className="relative w-40 sm:w-60 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search comics, films..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-full pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Thanos Snap Easter Egg Button */}
          <button
            onClick={onTriggerSnap}
            title="Perform The Snap (Disintegrate 50% of the archive!)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">The Snap</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Unmute Cosmic Ambience" : "Mute Sound"}
            className="p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
