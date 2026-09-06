import React, { useState } from "react";
import { Star, BookOpen, Film, Eye, Sparkles } from "lucide-react";
import { soundFx } from "../../utils/sound";
import { INFINITY_STONES } from "../../data/marvelData";

export default function CatalogCard({ item, onOpenDetail, isSnapped }) {
  const [isHovered, setIsHovered] = useState(false);

  // Find associated stone color
  const stoneData = INFINITY_STONES.find((s) => s.name === item.stone) || INFINITY_STONES[0];

  const handleClick = () => {
    soundFx.playStoneResonance(520);
    onOpenDetail(item);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playStoneResonance(650);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col cursor-pointer transition-all duration-300 select-none ${
        isSnapped ? "disintegrate pointer-events-none" : ""
      }`}
    >
      {/* 2:3 Aspect Ratio Card Cover Container */}
      <div
        className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-slate-900/90 border border-white/10 transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1.5"
        style={{
          boxShadow: isHovered
            ? `0 14px 35px -8px ${stoneData.glow}, 0 0 15px 1px ${stoneData.color}66`
            : "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
          borderColor: isHovered ? stoneData.color : "rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Cover Artwork Image */}
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Media Type Badge */}
          <span
            className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md"
            style={{
              backgroundColor: `${stoneData.color}dd`,
              color: "#ffffff",
            }}
          >
            {item.type === "COMIC" ? (
              <BookOpen className="w-2.5 h-2.5" />
            ) : (
              <Film className="w-2.5 h-2.5" />
            )}
            {item.type}
          </span>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
          </div>
        </div>

        {/* Hover Quick Action Layer */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white shadow-xl hover:scale-110 transition duration-200">
            <Eye className="w-6 h-6 text-amber-300" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Inspect Archive
          </span>
          <span className="text-[10px] text-slate-300 line-clamp-2 text-center italic">
            "{item.quote}"
          </span>
        </div>

        {/* Stone Energy Aura Indicator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
          style={{
            backgroundColor: stoneData.color,
            boxShadow: `0 0 10px ${stoneData.color}`,
          }}
        />
      </div>

      {/* Metadata Beneath Card */}
      <div className="mt-2.5 flex flex-col text-left">
        {/* Prominent Title */}
        <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
          {item.title}
        </h3>

        {/* Release Year, Issues & Creators */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
          <span className="font-mono font-medium text-slate-300">{item.year}</span>
          <span className="text-[11px] text-slate-500 truncate max-w-[120px]">
            {item.creators.split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
