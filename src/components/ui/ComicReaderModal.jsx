import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";
import { soundFx } from "../../utils/sound";

export default function ComicReaderModal({ item, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const pages = item?.samplePages || [
    "Page 1: The cosmic void awakens...",
    "Page 2: Thanos raises the Infinity Gauntlet...",
    "Page 3: All existence bows before the Mad Titan...",
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      soundFx.playStoneResonance(580);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      soundFx.playStoneResonance(480);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#05060b] text-white select-none">
      {/* Reader Top Bar */}
      <header className="h-14 px-4 sm:px-6 bg-slate-950 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <div className="text-left">
            <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {item.title}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Page {currentPage + 1} of {pages.length}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            title="Zoom Out"
            className="p-1.5 rounded bg-slate-900 border border-white/10 hover:text-amber-400"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.2))}
            title="Zoom In"
            className="p-1.5 rounded bg-slate-900 border border-white/10 hover:text-amber-400"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 border border-white/10 hover:bg-red-600 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Page Viewer Stage */}
      <main className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 relative bg-dot-grid">
        {/* Previous page arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-white/15 text-white hover:bg-amber-500 hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition z-20 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Comic Page Canvas Sheet */}
        <div
          className="relative max-w-xl w-full aspect-[2/3] bg-[#0d0f19] border-2 border-amber-500/40 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-8 transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Comic Header / Issue Stamp */}
          <div className="flex justify-between items-center border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#e62429] text-white text-[10px] font-black px-1.5 py-0.5 uppercase">
                MARVEL
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                ISSUE ARCHIVE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              SERIAL #{item.id.toUpperCase().slice(0, 10)}
            </span>
          </div>

          {/* Comic Panel Art Simulation */}
          <div className="my-auto space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>

            {/* Narrator Caption Box */}
            <div className="bg-amber-100 text-slate-950 font-serif p-4 rounded-md border-2 border-black shadow-[4px_4px_0px_#000] text-left transform -rotate-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 block mb-1">
                Cosmic Omnipresence
              </span>
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                {pages[currentPage]}
              </p>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto italic">
              "{item.quote}"
            </p>
          </div>

          {/* Comic Footer */}
          <div className="flex justify-between items-center border-t border-white/10 pt-3 text-[11px] text-slate-400">
            <span>Creators: {item.creators}</span>
            <span className="font-mono text-amber-400 font-bold">
              PAGE {currentPage + 1}
            </span>
          </div>
        </div>

        {/* Next page arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-white/15 text-white hover:bg-amber-500 hover:text-slate-950 disabled:opacity-20 disabled:pointer-events-none transition z-20 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* Reader Bottom Navigation Bar */}
      <footer className="h-12 px-6 bg-slate-950 border-t border-white/10 flex items-center justify-center gap-4 text-xs">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="hover:text-amber-400 disabled:opacity-30"
        >
          Prev Page
        </button>
        <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          />
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
          className="hover:text-amber-400 disabled:opacity-30"
        >
          Next Page
        </button>
      </footer>
    </div>
  );
}
