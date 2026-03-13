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
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tracks, moods, instruments…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent border-b border-[#E5E5E5] px-0 py-2 text-sm text-[#0A0A0A] placeholder-[#999999] focus:border-[#0A0A0A] focus:outline-none"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="bg-transparent border-b border-[#E5E5E5] py-2 text-[10px] text-[#999999] focus:border-[#0A0A0A] focus:outline-none cursor-pointer"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          <option value="newest">newest</option>
          <option value="price-asc">price ↑</option>
          <option value="price-desc">price ↓</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>mood</span>
          {ALL_MOODS.map((m) => (
            <button
              key={m}
              onClick={() => toggle(m, selectedMoods, setSelectedMoods)}
              className={`text-[10px] ${
                selectedMoods.includes(m)
                  ? "text-[#FF2200]"
                  : "text-[#999999] hover:text-[#0A0A0A]"
              }`}
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              {selectedMoods.includes(m) ? `[${m}]` : m}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>genre</span>
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              onClick={() => toggle(g, selectedGenres, setSelectedGenres)}
              className={`text-[10px] ${
                selectedGenres.includes(g)
                  ? "text-[#FF2200]"
                  : "text-[#999999] hover:text-[#0A0A0A]"
              }`}
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              {selectedGenres.includes(g) ? `[${g}]` : g}
            </button>
          ))}
        </div>
        {hasFilters && (
          <button
            onClick={() => { setSelectedMoods([]); setSelectedGenres([]); setSearch(""); }}
            className="text-[10px] text-[#999999] hover:text-[#FF2200]"
            style={{ fontFamily: "IBM Plex Mono, monospace" }}
          >
            clear ×
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20">
          <p className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>No tracks match.</p>
          <button
            onClick={() => { setSelectedMoods([]); setSelectedGenres([]); setSearch(""); }}
            className="text-[10px] text-[#FF2200] mt-2 hover:underline"
            style={{ fontFamily: "IBM Plex Mono, monospace" }}
          >
            clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-[10px] text-[#999999] mb-4" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            {filtered.length} track{filtered.length !== 1 ? "s" : ""}
          </p>
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
