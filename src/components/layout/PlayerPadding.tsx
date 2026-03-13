"use client";

import { useAudio } from "@/lib/audioContext";

export default function PlayerPadding() {
  const { state } = useAudio();
  if (!state.currentTrack) return null;
  // Adds bottom spacing so footer doesn't hide behind the player
  return <div className="h-16" aria-hidden="true" />;
}
