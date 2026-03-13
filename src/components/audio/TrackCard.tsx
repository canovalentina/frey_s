"use client";

import { useCallback } from "react";
import { Play, Pause } from "lucide-react";
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

export default function TrackCard({ track, queue }: TrackCardProps) {
  const { state, playTrack, togglePlay } = useAudio();
  const isCurrentTrack = state.currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  const handlePlay = useCallback(() => {
    if (isCurrentTrack) togglePlay();
    else playTrack(track, queue);
  }, [isCurrentTrack, togglePlay, playTrack, track, queue]);

  const lowestPrice = track.licenses?.reduce((min, l) => (l.price < min ? l.price : min), Infinity);

  return (
    <article className={`group border-t transition-colors pt-4 pb-5 ${isCurrentTrack ? "border-[#c8432a]" : "border-[#d8d2ca] hover:border-[#111111]"}`}>
      {/* Top */}
      <div className="flex items-start gap-3 mb-4">
        <button
          onClick={handlePlay}
          className={`w-8 h-8 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
            isCurrentTrack ? "bg-[#c8432a] text-[#f0ebe3]" : "bg-[#111111] text-[#f0ebe3] opacity-0 group-hover:opacity-100"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          <Link href={`/music/licensing/${track.slug}`}>
            <h3 className="font-display font-semibold text-[#111111] hover:text-[#c8432a] transition-colors truncate">
              {track.title}
            </h3>
          </Link>
          <div className="flex flex-wrap gap-x-3 gap-y-0 mt-0.5">
            {track.bpm && <span className="font-display text-xs text-[#8a847c]">{track.bpm} bpm</span>}
            {track.key && <span className="font-display text-xs text-[#8a847c]">{track.key}</span>}
            {track.duration && (
              <span className="font-display text-xs text-[#8a847c]">
                {Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {lowestPrice !== undefined && lowestPrice !== Infinity && (
          <p className="font-display text-sm font-semibold text-[#111111] shrink-0">${lowestPrice}</p>
        )}
      </div>

      {/* Static waveform */}
      <div className="h-8 flex items-center gap-[2px] cursor-pointer mb-4" onClick={handlePlay} role="button" aria-label="Play preview">
        {Array.from({ length: 64 }).map((_, i) => {
          const seed = track.id.charCodeAt(i % track.id.length) + i;
          const height = 15 + ((seed * 7 + i * 13) % 85);
          return (
            <div
              key={i}
              className={`w-[2px] rounded-none flex-shrink-0 transition-colors ${isCurrentTrack ? "bg-[#c8432a]/50" : "bg-[#d8d2ca] group-hover:bg-[#c8c4bc]"}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Tags + license */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {track.moods?.map((m) => (
            <span key={m} className="font-display text-[10px] text-[#8a847c]">{m}</span>
          ))}
          {track.genres?.map((g) => (
            <span key={g} className="font-display text-[10px] text-[#8a847c] opacity-60">{g}</span>
          ))}
        </div>
        <Link
          href={`/music/licensing/${track.slug}`}
          className="font-display text-xs text-[#8a847c] hover:text-[#c8432a] transition-colors shrink-0 border-b border-transparent hover:border-[#c8432a] pb-px"
        >
          License →
        </Link>
      </div>
    </article>
  );
}
