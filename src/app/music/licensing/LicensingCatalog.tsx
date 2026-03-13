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

  const toggleFilter = (
    value: string,
    current: string[],
    set: (v: string[]) => void
  ) => {
    set(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const filtered = useMemo(() => {
    let tracks: LicensablTrack[] = DEMO_TRACKS;

    if (search) {
      const q = search.toLowerCase();
      tracks = tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.moods.some((m) => m.includes(q)) ||
          t.genres.some((g) => g.includes(q)) ||
          (t.instrumentation?.toLowerCase().includes(q) ?? false)
      );
    }

    if (selectedMoods.length) {
      tracks = tracks.filter((t) =>
        selectedMoods.every((m) => t.moods.includes(m))
      );
    }

    if (selectedGenres.length) {
      tracks = tracks.filter((t) =>
        selectedGenres.every((g) => t.genres.includes(g))
      );
    }

    if (sort === "price-asc") {
      tracks = [...tracks].sort(
        (a, b) => (a.licenses[0]?.price ?? 0) - (b.licenses[0]?.price ?? 0)
      );
    } else if (sort === "price-desc") {
      tracks = [...tracks].sort(
        (a, b) => (b.licenses[0]?.price ?? 0) - (a.licenses[0]?.price ?? 0)
      );
    }

    return tracks;
  }, [search, selectedMoods, selectedGenres, sort]);

  const hasFilters =
    selectedMoods.length > 0 || selectedGenres.length > 0 || search;

  return (
    <div>
      {/* Search + Sort bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tracks, moods, instruments…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border border-[#e2e0dd] px-4 py-3 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="bg-transparent border border-[#e2e0dd] px-4 py-3 font-display text-sm text-[#0a0a0a] focus:border-[#b2a2cb] focus:outline-none transition-colors cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div>
          <p className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] mb-2">
            Mood
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_MOODS.map((mood) => (
              <button
                key={mood}
                onClick={() =>
                  toggleFilter(mood, selectedMoods, setSelectedMoods)
                }
                className={`font-display text-xs px-3 py-1 border transition-colors ${
                  selectedMoods.includes(mood)
                    ? "border-[#b2a2cb] bg-[#b2a2cb] text-[#0a0a0a]"
                    : "border-[#e2e0dd] text-[#6b6b6b] hover:border-[#b2a2cb] hover:text-[#b2a2cb]"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] mb-2">
            Genre
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() =>
                  toggleFilter(genre, selectedGenres, setSelectedGenres)
                }
                className={`font-display text-xs px-3 py-1 border transition-colors ${
                  selectedGenres.includes(genre)
                    ? "border-[#b2a2cb] bg-[#b2a2cb] text-[#0a0a0a]"
                    : "border-[#e2e0dd] text-[#6b6b6b] hover:border-[#b2a2cb] hover:text-[#b2a2cb]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        {hasFilters && (
          <button
            onClick={() => {
              setSelectedMoods([]);
              setSelectedGenres([]);
              setSearch("");
            }}
            className="font-display text-xs text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors self-end mb-0.5"
          >
            Clear all ×
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-[#e2e0dd] p-16 text-center">
          <p className="font-display text-[#6b6b6b]">
            No tracks match your filters.
          </p>
          <button
            onClick={() => {
              setSelectedMoods([]);
              setSelectedGenres([]);
              setSearch("");
            }}
            className="font-display text-xs text-[#b2a2cb] mt-3 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="font-display text-xs text-[#6b6b6b] mb-6">
            {filtered.length} track{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                queue={filtered}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
