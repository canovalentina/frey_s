"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "@/lib/audioContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Music,
} from "lucide-react";
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

  // Create / update audio element when track changes
  useEffect(() => {
    if (!currentTrack) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

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

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !audioRef.current || !duration) return;
      const rect = progressRef.current.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = ratio * duration;
    },
    [duration]
  );

  if (!currentTrack) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="global-player-visible fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-[#1a1a1a] text-[#f7f5f2]">
      {/* Progress bar — full width, clickable */}
      <div
        ref={progressRef}
        className="h-0.5 w-full bg-[#2a2a2a] cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[#b2a2cb] transition-none relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#b2a2cb] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center gap-4 md:gap-6">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {currentTrack.coverUrl ? (
            <div className="relative w-9 h-9 shrink-0 overflow-hidden">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 shrink-0 bg-[#1a1a1a] flex items-center justify-center">
              <Music size={14} className="text-[#b2a2cb]" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-display text-xs font-semibold text-[#f7f5f2] truncate">
              {currentTrack.title}
            </p>
            {currentTrack.artist && (
              <p className="font-display text-[10px] text-[#6b6b6b] truncate">
                {currentTrack.artist}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={prev}
            className="text-[#6b6b6b] hover:text-[#f7f5f2] transition-colors"
            aria-label="Previous"
          >
            <SkipBack size={16} />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#b2a2cb] text-[#0a0a0a] flex items-center justify-center hover:bg-[#f7f5f2] transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={next}
            className="text-[#6b6b6b] hover:text-[#f7f5f2] transition-colors"
            aria-label="Next"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Time */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <span className="font-display text-[10px] text-[#6b6b6b]">
            {formatTime(currentTime)}
          </span>
          <span className="font-display text-[10px] text-[#3a3a3a]">/</span>
          <span className="font-display text-[10px] text-[#6b6b6b]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMuted(!muted)}
            className="text-[#6b6b6b] hover:text-[#f7f5f2] transition-colors"
            aria-label="Toggle mute"
          >
            {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setMuted(false);
              setVolume(parseFloat(e.target.value));
            }}
            className="w-20 accent-[#b2a2cb] cursor-pointer"
          />
        </div>

        {/* Close */}
        <button
          onClick={close}
          className="text-[#6b6b6b] hover:text-[#f7f5f2] transition-colors shrink-0"
          aria-label="Close player"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
