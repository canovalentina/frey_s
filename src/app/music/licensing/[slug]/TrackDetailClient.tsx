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
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Back */}
      <Link
        href="/music/licensing"
        className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-1 mb-12"
      >
        <ArrowLeft size={12} /> Back to catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
        {/* Left — player & info */}
        <div>
          {/* Waveform area */}
          <div className="bg-[#0a0a0a] p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-display text-[10px] uppercase tracking-widest text-[#b2a2cb] mb-1">
                  {track.genres.join(" · ")}
                </p>
                <h1 className="font-display text-2xl font-bold text-[#f7f5f2]">
                  {track.title}
                </h1>
                <p className="font-display text-sm text-[#6b6b6b] mt-0.5">
                  frey_s
                </p>
              </div>
              <button
                onClick={handlePlay}
                className="w-14 h-14 rounded-full bg-[#b2a2cb] text-[#0a0a0a] flex items-center justify-center hover:bg-[#f7f5f2] transition-colors shrink-0"
                aria-label={isPlaying ? "Pause preview" : "Play preview"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>

            {/* Static waveform visualization */}
            <div
              className="h-16 flex items-center gap-[2px] cursor-pointer"
              onClick={handlePlay}
            >
              {Array.from({ length: 80 }).map((_, i) => {
                const seed = track.id.charCodeAt(i % track.id.length) + i;
                const height = 15 + ((seed * 11 + i * 7) % 85);
                return (
                  <div
                    key={i}
                    className={`w-[2px] rounded-sm flex-shrink-0 transition-colors ${
                      isCurrentTrack ? "bg-[#b2a2cb]/60" : "bg-[#2a2a2a]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            <p className="font-display text-[10px] text-[#3a3a3a] mt-3 text-center">
              30-second watermarked preview
            </p>
          </div>

          {/* Track metadata */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Duration", value: formatDuration(track.duration) },
              { label: "BPM", value: track.bpm ?? "—" },
              { label: "Key", value: track.key ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="border border-[#e2e0dd] p-3 text-center">
                <p className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] mb-1">
                  {label}
                </p>
                <p className="font-display font-semibold text-[#0a0a0a]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {track.moods.map((m) => (
              <span
                key={m}
                className="font-display text-xs px-3 py-1 bg-[#f0eee9] text-[#6b6b6b]"
              >
                {m}
              </span>
            ))}
            {track.genres.map((g) => (
              <span
                key={g}
                className="font-display text-xs px-3 py-1 border border-[#e2e0dd] text-[#6b6b6b]"
              >
                {g}
              </span>
            ))}
          </div>

          {track.instrumentation && (
            <p className="font-serif text-sm text-[#6b6b6b]">
              <span className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] mr-2">
                Instrumentation:
              </span>
              {track.instrumentation}
            </p>
          )}

          {track.stemsAvailable && (
            <p className="font-display text-xs text-[#b2a2cb] mt-2 inline-flex items-center gap-1">
              <Check size={12} /> Stems available on Pro license
            </p>
          )}
        </div>

        {/* Right — license selector */}
        <div>
          <h2 className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-6">
            Choose a License
          </h2>

          <div className="space-y-3 mb-8">
            {track.licenses.map((license) => {
              const info = LICENSE_INFO[license.type];
              const selected = selectedLicense?.type === license.type;
              return (
                <button
                  key={license.type}
                  onClick={() => setSelectedLicense(license)}
                  className={`w-full text-left p-5 border transition-all ${
                    selected
                      ? "border-[#b2a2cb] bg-[#b2a2cb]/5"
                      : "border-[#e2e0dd] hover:border-[#b2a2cb]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-display font-semibold text-[#0a0a0a]">
                        {info.label}
                      </p>
                      <p className="font-serif text-sm text-[#6b6b6b] mt-0.5">
                        {info.use}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="font-display text-xl font-bold text-[#0a0a0a]">
                        ${license.price}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-0.5 mt-3">
                    {info.includes.map((item) => (
                      <li
                        key={item}
                        className="font-display text-[11px] text-[#6b6b6b] inline-flex items-center gap-1 mr-3"
                      >
                        <Check size={10} className="text-[#b2a2cb]" /> {item}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}

            {/* Exclusive CTA */}
            <div className="border border-dashed border-[#e2e0dd] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-[#0a0a0a]">
                    Exclusive
                  </p>
                  <p className="font-serif text-sm text-[#6b6b6b]">
                    Full buyout — custom quote
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="font-display text-xs uppercase tracking-widest px-4 py-2 border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f7f5f2] transition-colors shrink-0"
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
                className="w-full font-display text-sm font-semibold uppercase tracking-widest py-4 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading
                  ? "Redirecting to checkout…"
                  : `Purchase — $${selectedLicense.price}`}
              </button>
              {checkoutError && (
                <p className="font-display text-xs text-red-600 text-center mt-2">
                  {checkoutError}
                </p>
              )}
            </>
          )}

          <p className="font-display text-[10px] text-[#6b6b6b] text-center mt-3">
            Secure checkout via Stripe · Instant download after payment
          </p>
        </div>
      </div>

      {/* Related tracks */}
      {related.length > 0 && (
        <div>
          <div className="border-t border-[#e2e0dd] pt-16 mb-8">
            <h2 className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">
              Similar Tracks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((t) => (
              <TrackCard key={t.id} track={t} queue={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
