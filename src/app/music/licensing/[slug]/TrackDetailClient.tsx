"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, ArrowLeft, Check } from "lucide-react";
import { useAudio } from "@/lib/audioContext";
import TrackCard from "@/components/audio/TrackCard";
import type { LicensablTrack } from "@/lib/tracks";

const LICENSE_INFO = {
  personal: {
    label: "Personal",
    use: "Personal projects, student films, non-profit",
    includes: ["MP3 320kbps", "Single project use", "Credit required"],
  },
  standard: {
    label: "Standard",
    use: "YouTube, podcasts, small commercial campaigns",
    includes: [
      "WAV 24-bit + MP3",
      "Up to 1M streams/views",
      "Credit required",
    ],
  },
  professional: {
    label: "Professional",
    use: "Film, TV, advertising, large campaigns",
    includes: [
      "Stems + WAV + MP3",
      "Unlimited use",
      "Flexible credit",
      "Broadcast rights",
    ],
  },
  exclusive: {
    label: "Exclusive",
    use: "Full buyout — all rights transfer",
    includes: [
      "All formats + stems",
      "All rights transferred",
      "No credit required",
      "Custom agreement",
    ],
  },
};

interface Props {
  track: LicensablTrack;
  related: LicensablTrack[];
}

export default function TrackDetailClient({ track, related }: Props) {
  const { state, playTrack, togglePlay } = useAudio();
  const isCurrentTrack = state.currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  const [selectedLicense, setSelectedLicense] = useState<
    (typeof track.licenses)[0] | null
  >(track.licenses[1] ?? track.licenses[0] ?? null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = useCallback(async () => {
    if (!selectedLicense) return;
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId: track.id, licenseType: selectedLicense.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong");
      setCheckoutLoading(false);
    }
  }, [selectedLicense, track.id]);

  const handlePlay = useCallback(() => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  }, [isCurrentTrack, togglePlay, playTrack, track]);

  const formatDuration = (s?: number) => {
    if (!s) return "—";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Back */}
      <Link
        href="/music/licensing"
        className="text-[10px] text-[#999999] hover:text-[#FF2200] inline-flex items-center gap-1 mb-12"
        style={{ fontFamily: "IBM Plex Mono, monospace" }}
      >
        <ArrowLeft size={10} /> catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20">
        {/* Left — player & info */}
        <div>
          {/* Waveform area — dark panel */}
          <div className="bg-[#0A0A0A] p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-[#999999] mb-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {track.genres.join(" · ")}
                </p>
                <h1 className="text-xl font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  {track.title}
                </h1>
                <p className="text-[10px] text-[#999999] mt-0.5" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  frey_s
                </p>
              </div>
              <button
                onClick={handlePlay}
                className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                  isPlaying ? "bg-[#00DD44] text-[#0A0A0A]" : "bg-white text-[#0A0A0A] hover:bg-[#FF2200] hover:text-white"
                }`}
                aria-label={isPlaying ? "Pause preview" : "Play preview"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>

            {/* Waveform */}
            <div
              className="h-14 flex items-center gap-[2px] cursor-pointer"
              onClick={handlePlay}
            >
              {Array.from({ length: 80 }).map((_, i) => {
                const seed = track.id.charCodeAt(i % track.id.length) + i;
                const height = 15 + ((seed * 11 + i * 7) % 85);
                return (
                  <div
                    key={i}
                    className="w-[2px] flex-shrink-0"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isCurrentTrack ? "#00DD44" : "#333333",
                    }}
                  />
                );
              })}
            </div>

            <p className="text-[10px] text-[#555555] mt-3 text-center" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              30-second watermarked preview
            </p>
          </div>

          {/* Track metadata */}
          <div className="grid grid-cols-3 border border-[#E5E5E5] mb-6">
            {[
              { label: "Duration", value: formatDuration(track.duration) },
              { label: "BPM", value: track.bpm ?? "—" },
              { label: "Key", value: track.key ?? "—" },
            ].map(({ label, value }, i) => (
              <div key={label} className={`p-3 text-center ${i < 2 ? "border-r border-[#E5E5E5]" : ""}`}>
                <p className="text-[10px] text-[#999999] mb-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {label}
                </p>
                <p className="text-sm font-medium text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
            {track.moods.map((m) => (
              <span key={m} className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                {m}
              </span>
            ))}
            {track.genres.map((g) => (
              <span key={g} className="text-[10px] text-[#999999] opacity-60" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                {g}
              </span>
            ))}
          </div>

          {track.instrumentation && (
            <p className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="text-[10px] mr-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>instrumentation:</span>
              {track.instrumentation}
            </p>
          )}

          {track.stemsAvailable && (
            <p className="text-[10px] text-[#00DD44] mt-2 inline-flex items-center gap-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              <span className="w-[6px] h-[6px] bg-[#00DD44] inline-block" />
              stems available on pro license
            </p>
          )}
        </div>

        {/* Right — license selector */}
        <div>
          <p className="text-[10px] text-[#999999] mb-6" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            choose a license
          </p>

          <div className="space-y-2 mb-8">
            {track.licenses.map((license) => {
              const info = LICENSE_INFO[license.type];
              const selected = selectedLicense?.type === license.type;
              return (
                <button
                  key={license.type}
                  onClick={() => setSelectedLicense(license)}
                  className={`w-full text-left p-4 border ${
                    selected
                      ? "border-l-[3px] border-l-[#FF2200] border-t border-r border-b border-[#E5E5E5]"
                      : "border border-[#E5E5E5] hover:border-[#0A0A0A]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
                        {info.label}
                      </p>
                      <p className="text-[10px] text-[#999999] mt-0.5" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                        {info.use}
                      </p>
                    </div>
                    <p className="text-base font-semibold text-[#0A0A0A] shrink-0 ml-4" style={{ fontFamily: "Inter, sans-serif" }}>
                      ${license.price}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
                    {info.includes.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] text-[#999999] inline-flex items-center gap-1"
                        style={{ fontFamily: "IBM Plex Mono, monospace" }}
                      >
                        <Check size={8} className="text-[#999999]" /> {item}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}

            {/* Exclusive CTA */}
            <div className="border border-dashed border-[#E5E5E5] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
                    Exclusive
                  </p>
                  <p className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                    Full buyout — custom quote
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="text-[10px] px-3 py-1.5 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white shrink-0"
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          {selectedLicense && (
            <>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full text-sm font-medium py-3 bg-[#0A0A0A] text-white hover:bg-[#FF2200] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {checkoutLoading
                  ? "Redirecting to checkout…"
                  : `Purchase — $${selectedLicense.price}`}
              </button>
              {checkoutError && (
                <p className="text-[10px] text-[#FF2200] text-center mt-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {checkoutError}
                </p>
              )}
            </>
          )}

          <p className="text-[10px] text-[#999999] text-center mt-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            Secure checkout via Stripe · Instant download after payment
          </p>
        </div>
      </div>

      {/* Related tracks */}
      {related.length > 0 && (
        <div>
          <div className="border-t border-[#E5E5E5] pt-12 mb-6">
            <p className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              similar tracks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
            {related.map((t) => (
              <TrackCard key={t.id} track={t} queue={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
