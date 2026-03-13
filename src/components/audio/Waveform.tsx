"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
  audioUrl: string;
  isPlaying: boolean;
  onReady?: (duration: number) => void;
  onFinish?: () => void;
  onTimeUpdate?: (time: number) => void;
  height?: number;
  waveColor?: string;
  progressColor?: string;
}

export default function Waveform({
  audioUrl,
  isPlaying,
  onReady,
  onFinish,
  onTimeUpdate,
  height = 48,
  waveColor = "#e2e0dd",
  progressColor = "#b2a2cb",
}: WaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor,
      progressColor,
      height,
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      cursorWidth: 0,
      interact: true,
      normalize: true,
    });

    ws.load(audioUrl);

    ws.on("ready", () => {
      setLoading(false);
      onReady?.(ws.getDuration());
    });

    ws.on("finish", () => onFinish?.());

    ws.on("timeupdate", (time) => onTimeUpdate?.(time));

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // Sync play/pause
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws || loading) return;
    if (isPlaying) {
      ws.play();
    } else {
      ws.pause();
    }
  }, [isPlaying, loading]);

  return (
    <div className="relative w-full">
      {loading && (
        <div
          className="absolute inset-0 flex items-center"
          style={{ height }}
        >
          <div className="w-full h-px bg-[#e2e0dd] animate-pulse" />
        </div>
      )}
      <div ref={containerRef} className={loading ? "opacity-0" : "opacity-100 transition-opacity"} />
    </div>
  );
}
