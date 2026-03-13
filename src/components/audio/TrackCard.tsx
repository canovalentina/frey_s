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
    <article className="border-t border-[#E5E5E5] py-4">
      <div className="flex items-center gap-3">
        {/* Play button */}
        <button
          onClick={handlePlay}
          className={`w-6 h-6 flex items-center justify-center shrink-0 ${
            isPlaying ? "bg-[#00DD44] text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={10} /> : <Play size={10} />}
        </button>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <Link href={`/music/licensing/${track.slug}`}>
            <p className="text-sm font-medium text-[#0A0A0A] hover:text-[#FF2200] truncate" style={{ fontFamily: "Inter, sans-serif" }}>
              {track.title}
            </p>
          </Link>
          <div className="flex gap-3 mt-0.5">
            {track.bpm && <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{track.bpm} bpm</span>}
            {track.key && <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{track.key}</span>}
            {track.duration && (
              <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                {Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        {lowestPrice !== undefined && lowestPrice !== Infinity && (
          <p className="text-[10px] text-[#0A0A0A] shrink-0" style={{ fontFamily: "IBM Plex Mono, monospace" }}>${lowestPrice}</p>
        )}
      </div>

      {/* Waveform */}
      <div className="h-6 flex items-center gap-[2px] cursor-pointer my-3" onClick={handlePlay} role="button" aria-label="Play preview">
        {Array.from({ length: 64 }).map((_, i) => {
          const seed = track.id.charCodeAt(i % track.id.length) + i;
          const height = 15 + ((seed * 7 + i * 13) % 85);
          return (
            <div
              key={i}
              className="w-[2px] flex-shrink-0"
              style={{
                height: `${height}%`,
                backgroundColor: isCurrentTrack ? "#00DD44" : "#E5E5E5",
              }}
            />
          );
        })}
      </div>

      {/* Tags + license link */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {track.moods?.map((m) => (
            <span key={m} className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{m}</span>
          ))}
          {track.genres?.map((g) => (
            <span key={g} className="text-[10px] text-[#999999] opacity-60" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{g}</span>
          ))}
        </div>
        <Link
          href={`/music/licensing/${track.slug}`}
          className="text-[10px] text-[#999999] hover:text-[#FF2200] shrink-0"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          License →
        </Link>
      </div>
    </article>
  );
}
