import React from "react";
import { X, Star, BookOpen, Film, Play, Bookmark, Sparkles, ExternalLink } from "lucide-react";
import { soundFx } from "../../utils/sound";
import { INFINITY_STONES } from "../../data/marvelData";

export default function DetailModal({
  item,
  onClose,
  onOpenReader,
  onOpenTrailer,
}) {
  if (!item) return null;

  const stoneData = INFINITY_STONES.find((s) => s.name === item.stone) || INFINITY_STONES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090b14] border border-white/15 shadow-2xl z-10 text-left flex flex-col md:flex-row overflow-hidden"
        style={{
          boxShadow: `0 20px 60px -10px ${stoneData.glow}, 0 0 30px rgba(0,0,0,0.9)`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:bg-black/90 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Portrait Artwork & Fast Stats */}
        <div className="md:w-5/12 relative shrink-0 bg-slate-950 flex flex-col justify-between p-6">
          {/* Cover image with glowing frame */}
          <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-4">
            <img
              src={item.cover}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Associated Stone Tag */}
            <div
              className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md"
              style={{
                backgroundColor: `${stoneData.color}25`,
                border: `1px solid ${stoneData.color}66`,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: stoneData.color }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                {stoneData.name} Stone Resonance
              </span>
            </div>
          </div>

          {/* Quick specs */}
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>Release Year:</span>
              <strong className="text-white font-mono">{item.year}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>Format:</span>
              <strong className="text-white">{item.issues}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>Creators / Crew:</span>
              <strong className="text-white truncate max-w-[150px]">
                {item.creators}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Lore & Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded text-white"
                style={{ backgroundColor: stoneData.color }}
              >
                {item.badge}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{item.rating} / 10</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {item.title}
            </h2>

            {/* Quote banner */}
            <blockquote className="border-l-2 border-amber-400 pl-3.5 py-1 text-xs sm:text-sm italic text-amber-200/90 font-serif">
              "{item.quote}"
            </blockquote>

            {/* Synopsis */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                Archival Synopsis
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.synopsis}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Canon Elements
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
            {item.type === "COMIC" ? (
              <button
                onClick={() => {
                  soundFx.playStoneResonance(620);
                  onOpenReader(item);
                }}
                className="flex-1 min-w-[140px] px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Read Issue Online
              </button>
            ) : null}

            <button
              onClick={() => {
                soundFx.playStoneResonance(550);
                onOpenTrailer(item);
              }}
              className="flex-1 min-w-[140px] px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Cinematic Trailer
            </button>

            <button
              onClick={() => soundFx.playStoneResonance(700)}
              title="Save to Reading Vault"
              className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
