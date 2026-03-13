"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "@/lib/audioContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Music } from "lucide-react";
import Image from "next/image";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function GlobalAudioPlayer() {
  const { state, togglePlay, next, prev, setVolume, close } = useAudio();
  const { currentTrack, isPlaying, volume } = state;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentTrack) return;
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.src = currentTrack.audioUrl;
    audio.volume = volume;
    audio.load();

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => next();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }, [duration]);

  if (!currentTrack) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="global-player-visible fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5]">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="h-[1px] w-full bg-[#E5E5E5] cursor-pointer"
        onClick={handleProgressClick}
      >
        <div className="h-full bg-[#00DD44] transition-none" style={{ width: `${progress}%` }} />
      </div>

      <div className="px-6 md:px-12 h-12 flex items-center gap-4 md:gap-6">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {currentTrack.coverUrl ? (
            <div className="relative w-6 h-6 shrink-0 overflow-hidden">
              <Image src={currentTrack.coverUrl} alt={currentTrack.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-6 h-6 shrink-0 bg-[#E5E5E5] flex items-center justify-center">
              <Music size={10} className="text-[#999999]" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-[#0A0A0A] truncate" style={{ fontFamily: "Inter, sans-serif" }}>{currentTrack.title}</p>
            {currentTrack.artist && (
              <p className="text-[10px] text-[#999999] truncate" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{currentTrack.artist}</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={prev} className="text-[#999999] hover:text-[#0A0A0A]" aria-label="Previous">
            <SkipBack size={12} />
          </button>
          <button
            onClick={togglePlay}
            className="w-5 h-5 bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#FF2200]"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} />}
          </button>
          <button onClick={next} className="text-[#999999] hover:text-[#0A0A0A]" aria-label="Next">
            <SkipForward size={12} />
          </button>
        </div>

        {/* Time */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{formatTime(currentTime)}</span>
          <span className="text-[10px] text-[#E5E5E5]">/</span>
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button onClick={() => setMuted(!muted)} className="text-[#999999] hover:text-[#0A0A0A]" aria-label="Toggle mute">
            {muted || volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <input
            type="range" min={0} max={1} step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => { setMuted(false); setVolume(parseFloat(e.target.value)); }}
            className="w-16 cursor-pointer"
          />
        </div>

        {/* Close */}
        <button onClick={close} className="text-[#999999] hover:text-[#0A0A0A] shrink-0" aria-label="Close player">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
