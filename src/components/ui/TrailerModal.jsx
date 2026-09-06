import React from "react";
import { X, Play, ShieldAlert, Sparkles } from "lucide-react";

export default function TrailerModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Video Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-red-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <iframe
          src={`${item.trailerUrl}?autoplay=1&mute=0`}
          title={`${item.title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />

        {/* Bottom Banner */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">{item.title}</h4>
            <p className="text-xs text-amber-400 font-mono">Official Marvel Cinematic Trailer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
