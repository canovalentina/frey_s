"use client";

import { useState, useMemo } from "react";
import TrackCard from "@/components/audio/TrackCard";
import { DEMO_TRACKS, ALL_MOODS, ALL_GENRES, type LicensablTrack } from "@/lib/tracks";

type SortOption = "newest" | "price-asc" | "price-desc";

export default function LicensingCatalog() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const toggle = (value: string, current: string[], set: (v: string[]) => void) =>
    set(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);

  const filtered = useMemo(() => {
    let tracks: LicensablTrack[] = DEMO_TRACKS;
    if (search) {
      const q = search.toLowerCase();
      tracks = tracks.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.moods.some((m) => m.includes(q)) ||
        t.genres.some((g) => g.includes(q)) ||
        (t.instrumentation?.toLowerCase().includes(q) ?? false)
      );
    }
    if (selectedMoods.length) tracks = tracks.filter((t) => selectedMoods.every((m) => t.moods.includes(m)));
    if (selectedGenres.length) tracks = tracks.filter((t) => selectedGenres.every((g) => t.genres.includes(g)));
    if (sort === "price-asc") tracks = [...tracks].sort((a, b) => (a.licenses[0]?.price ?? 0) - (b.licenses[0]?.price ?? 0));
    if (sort === "price-desc") tracks = [...tracks].sort((a, b) => (b.licenses[0]?.price ?? 0) - (a.licenses[0]?.price ?? 0));
    return tracks;
  }, [search, selectedMoods, selectedGenres, sort]);

  const hasFilters = selectedMoods.length > 0 || selectedGenres.length > 0 || search;

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search tracks, moods, instruments…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-b border-[#d8d2ca] px-0 py-2 font-display text-sm text-[#111111] placeholder-[#8a847c] focus:border-[#111111] focus:outline-none transition-colors"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="bg-transparent border-b border-[#d8d2ca] py-2 font-display text-sm text-[#8a847c] focus:border-[#111111] focus:outline-none transition-colors cursor-pointer pr-4"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-display text-xs text-[#8a847c] mr-1">Mood</span>
          {ALL_MOODS.map((m) => (
            <button
              key={m}
              onClick={() => toggle(m, selectedMoods, setSelectedMoods)}
              className={`font-display text-xs px-2 py-1 border transition-colors ${
                selectedMoods.includes(m)
                  ? "border-[#c8432a] text-[#c8432a]"
                  : "border-[#d8d2ca] text-[#8a847c] hover:border-[#111111] hover:text-[#111111]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-display text-xs text-[#8a847c] mr-1">Genre</span>
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              onClick={() => toggle(g, selectedGenres, setSelectedGenres)}
              className={`font-display text-xs px-2 py-1 border transition-colors ${
                selectedGenres.includes(g)
                  ? "border-[#c8432a] text-[#c8432a]"
                  : "border-[#d8d2ca] text-[#8a847c] hover:border-[#111111] hover:text-[#111111]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {hasFilters && (
          <button
            onClick={() => { setSelectedMoods([]); setSelectedGenres([]); setSearch(""); }}
            className="font-display text-xs text-[#8a847c] hover:text-[#c8432a] transition-colors"
          >
            clear ×
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-sm text-[#8a847c]">No tracks match.</p>
          <button onClick={() => { setSelectedMoods([]); setSelectedGenres([]); setSearch(""); }}
            className="font-display text-xs text-[#c8432a] mt-2 hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="font-display text-xs text-[#8a847c] mb-6">{filtered.length} track{filtered.length !== 1 ? "s" : ""}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-0">
            {filtered.map((track) => (
              <TrackCard key={track.id} track={track} queue={filtered} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
