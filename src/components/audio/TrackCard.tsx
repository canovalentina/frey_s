"use client";

import { useCallback } from "react";
import { Play, Pause, ShoppingCart } from "lucide-react";
import { useAudio, type Track } from "@/lib/audioContext";
import Link from "next/link";

interface License {
  type: "personal" | "standard" | "professional" | "exclusive";
  price: number;
}

interface TrackCardProps {
  track: Track & {
    slug: string;
    bpm?: number;
    key?: string;
    moods?: string[];
    genres?: string[];
    licenses?: License[];
  };
  queue?: Track[];
}

const LICENSE_LABELS: Record<string, string> = {
  personal: "Personal",
  standard: "Standard",
  professional: "Pro",
  exclusive: "Exclusive",
};

export default function TrackCard({ track, queue }: TrackCardProps) {
  const { state, playTrack, togglePlay } = useAudio();
  const isCurrentTrack = state.currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  const handlePlay = useCallback(() => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, queue);
    }
  }, [isCurrentTrack, togglePlay, playTrack, track, queue]);

  const lowestPrice = track.licenses?.reduce(
    (min, l) => (l.price < min ? l.price : min),
    Infinity
  );

  return (
    <article
      className={`group border transition-colors p-5 flex flex-col gap-4 ${
        isCurrentTrack
          ? "border-[#b2a2cb] bg-[#b2a2cb]/5"
          : "border-[#e2e0dd] hover:border-[#b2a2cb]"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Play button */}
        <button
          onClick={handlePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isCurrentTrack
              ? "bg-[#b2a2cb] text-[#0a0a0a]"
              : "bg-[#0a0a0a] text-[#f7f5f2] group-hover:bg-[#b2a2cb] group-hover:text-[#0a0a0a]"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <Link href={`/music/licensing/${track.slug}`}>
            <h3 className="font-display font-semibold text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors truncate">
              {track.title}
            </h3>
          </Link>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
            {track.bpm && (
              <span className="font-display text-[10px] text-[#6b6b6b]">
                {track.bpm} BPM
              </span>
            )}
            {track.key && (
              <span className="font-display text-[10px] text-[#6b6b6b]">
                {track.key}
              </span>
            )}
            {track.duration && (
              <span className="font-display text-[10px] text-[#6b6b6b]">
                {Math.floor(track.duration / 60)}:
                {String(Math.floor(track.duration % 60)).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        {lowestPrice !== undefined && lowestPrice !== Infinity && (
          <div className="text-right shrink-0">
            <p className="font-display text-xs text-[#6b6b6b]">from</p>
            <p className="font-display font-bold text-[#0a0a0a]">
              ${lowestPrice}
            </p>
          </div>
        )}
      </div>

      {/* Waveform placeholder (visual only — real waveform rendered on detail page) */}
      <div
        className="h-10 flex items-center gap-[2px] cursor-pointer"
        onClick={handlePlay}
        role="button"
        aria-label="Play preview"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          // Deterministic pseudo-random heights based on track id + index
          const seed = track.id.charCodeAt(i % track.id.length) + i;
          const height = 20 + ((seed * 7 + i * 13) % 80);
          const filled =
            state.currentTrack?.id === track.id &&
            i < 60 * (state.isPlaying ? 0.3 : 0);
          return (
            <div
              key={i}
              className={`w-[2px] rounded-sm flex-shrink-0 transition-colors ${
                filled ? "bg-[#b2a2cb]" : "bg-[#e2e0dd] group-hover:bg-[#c8c4be]"
              } ${isCurrentTrack ? "bg-[#b2a2cb]/40" : ""}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Tags + moods */}
      <div className="flex flex-wrap gap-2">
        {track.moods?.map((mood) => (
          <span
            key={mood}
            className="font-display text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#f0eee9] text-[#6b6b6b]"
          >
            {mood}
          </span>
        ))}
        {track.genres?.map((genre) => (
          <span
            key={genre}
            className="font-display text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#e2e0dd] text-[#6b6b6b]"
          >
            {genre}
          </span>
        ))}
      </div>

      {/* License quick-select */}
      {track.licenses && track.licenses.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-[#e2e0dd]">
          <div className="flex gap-1 flex-1 flex-wrap">
            {track.licenses.map((l) => (
              <span
                key={l.type}
                className="font-display text-[10px] text-[#6b6b6b]"
              >
                {LICENSE_LABELS[l.type]} ${l.price}
                {l.type !== track.licenses![track.licenses!.length - 1].type &&
                  " ·"}
              </span>
            ))}
          </div>
          <Link
            href={`/music/licensing/${track.slug}`}
            className="font-display text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1 shrink-0"
          >
            <ShoppingCart size={10} /> License
          </Link>
        </div>
      )}
    </article>
  );
}
