import React, { useState, useMemo } from "react";
import { Filter, ArrowUpDown, RefreshCw, Flame, BookOpen } from "lucide-react";
import CatalogCard from "./CatalogCard";
import { CATEGORIES, MARVEL_CATALOG } from "../../data/marvelData";

export default function CatalogGrid({
  searchTerm,
  selectedStone,
  snappedIds,
  onResetSnap,
  onOpenDetail,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating"); // 'rating' | 'year-desc' | 'year-asc' | 'title'

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return MARVEL_CATALOG.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      // Stone filter
      const matchesStone =
        !selectedStone || item.stone === selectedStone.name;

      // Search term filter
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.creators.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesStone && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year-desc") return b.year - a.year;
      if (sortBy === "year-asc") return a.year - b.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [activeCategory, selectedStone, searchTerm, sortBy]);

  return (
    <section id="catalog-section" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Streaming Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Comics & Cinematic Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse canon sagas, prestige graphic novels, and MCU milestones.
          </p>
        </div>

        {/* Snap restoration indicator */}
        {snappedIds.length > 0 && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs text-amber-300">
            <span>
              The Snap erased {snappedIds.length} titles from existence.
            </span>
            <button
              onClick={onResetSnap}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-md hover:bg-amber-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              Undo Snap
            </button>
          </div>
        )}
      </div>

      {/* Control Bar: Categories & Sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Count Controls */}
        <div className="flex items-center justify-between lg:justify-end gap-4 text-xs">
          <span className="text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredItems.length}</strong> titles
          </span>

          <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-lg px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-slate-900 text-white">
                Highest Rated
              </option>
              <option value="year-desc" className="bg-slate-900 text-white">
                Year (Newest)
              </option>
              <option value="year-asc" className="bg-slate-900 text-white">
                Year (Oldest)
              </option>
              <option value="title" className="bg-slate-900 text-white">
                Title (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Multi-column Grid (1 col mobile, 2 sm, 3 md, 4 lg, 5 xl) */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <CatalogCard
              key={item.id}
              item={item}
              onOpenDetail={onOpenDetail}
              isSnapped={snappedIds.includes(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-slate-900/40 rounded-2xl border border-white/5">
          <BookOpen className="w-10 h-10 text-slate-600" />
          <h4 className="text-base font-bold text-slate-300">
            No entries found in the archives
          </h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Try adjusting your search query, clearing stone filters, or selecting "All" categories.
          </p>
        </div>
      )}
    </section>
  );
}
