"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Music,
  MessageSquare,
  BarChart2,
  Plus,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { DEMO_TRACKS } from "@/lib/tracks";

// Simple client-side auth — replace with NextAuth in production
function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin") === "1");
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would call an API route that validates against ADMIN_PASSWORD env var
    if (password.length > 4) {
      sessionStorage.setItem("admin", "1");
      setAuthed(true);
    } else {
      setError("Invalid password");
    }
  };

  return { authed, password, setPassword, error, login };
}

// ─── Login Gate ────────────────────────────────────────────────
function LoginGate({
  password,
  setPassword,
  error,
  login,
}: {
  password: string;
  setPassword: (v: string) => void;
  error: string;
  login: (e: React.FormEvent) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2]">
      <form onSubmit={login} className="w-full max-w-sm px-6">
        <div className="mb-8">
          <Lock size={24} className="text-[#b2a2cb] mb-4" />
          <h1 className="font-display text-2xl font-bold text-[#0a0a0a]">
            Admin
          </h1>
          <p className="font-display text-sm text-[#6b6b6b] mt-1">
            frey_s dashboard
          </p>
        </div>
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-[#e2e0dd] px-4 py-3 pr-12 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && (
          <p className="font-display text-xs text-red-600 mb-3">{error}</p>
        )}
        <button
          type="submit"
          className="w-full font-display text-sm font-semibold uppercase tracking-widest py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="border border-[#e2e0dd] p-6">
      <div className="flex items-start justify-between mb-4">
        <Icon size={18} className="text-[#b2a2cb]" />
      </div>
      <p className="font-display text-3xl font-bold text-[#0a0a0a] mb-1">
        {value}
      </p>
      <p className="font-display text-xs uppercase tracking-widest text-[#6b6b6b]">
        {label}
      </p>
      {sub && (
        <p className="font-display text-xs text-[#b2a2cb] mt-1">{sub}</p>
      )}
    </div>
  );
}

// ─── Track Row ─────────────────────────────────────────────────
function TrackRow({ track }: { track: (typeof DEMO_TRACKS)[0] }) {
  return (
    <tr className="border-b border-[#e2e0dd] hover:bg-[#f0eee9] transition-colors">
      <td className="py-3 px-4">
        <p className="font-display text-sm font-semibold text-[#0a0a0a]">
          {track.title}
        </p>
        <p className="font-display text-[10px] text-[#6b6b6b]">
          {track.genres.join(" · ")}
        </p>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {track.moods.map((m) => (
            <span
              key={m}
              className="font-display text-[10px] px-2 py-0.5 bg-[#f0eee9] text-[#6b6b6b]"
            >
              {m}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4 font-display text-sm text-[#0a0a0a]">
        from ${Math.min(...track.licenses.map((l) => l.price))}
      </td>
      <td className="py-3 px-4">
        <span className="font-display text-[10px] uppercase tracking-widest px-2 py-1 bg-[#b2a2cb]/20 text-[#b2a2cb]">
          Demo
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-3">
          <Link
            href={`/music/licensing/${track.slug}`}
            target="_blank"
            className="text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors"
          >
            <ExternalLink size={14} />
          </Link>
        </div>
      </td>
    </tr>
  );
}

// ─── Add Track Form ────────────────────────────────────────────
function AddTrackForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/admin/tracks with form data
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onClose();
  };

  const inputClass =
    "w-full bg-transparent border border-[#e2e0dd] px-3 py-2 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors";

  return (
    <div className="fixed inset-0 bg-[#0a0a0a]/60 z-50 flex items-center justify-center p-4">
      <div className="bg-[#f7f5f2] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-[#0a0a0a]">
            Add Track
          </h2>
          <button
            onClick={onClose}
            className="font-display text-sm text-[#6b6b6b] hover:text-[#0a0a0a]"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Title *
              </label>
              <input name="title" required className={inputClass} />
            </div>
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Slug *
              </label>
              <input name="slug" required className={inputClass} placeholder="my-track-name" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                BPM
              </label>
              <input name="bpm" type="number" className={inputClass} />
            </div>
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Key
              </label>
              <input name="key" className={inputClass} placeholder="C min" />
            </div>
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Duration (sec)
              </label>
              <input name="durationSec" type="number" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
              Instrumentation
            </label>
            <input name="instrumentation" className={inputClass} />
          </div>

          <div>
            <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
              Moods (comma-separated)
            </label>
            <input name="moods" className={inputClass} placeholder="melancholic, peaceful" />
          </div>

          <div>
            <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
              Genres (comma-separated)
            </label>
            <input name="genres" className={inputClass} placeholder="ambient, piano" />
          </div>

          <div>
            <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
              Preview Audio URL (30-45s watermarked)
            </label>
            <input name="previewUrl" type="url" className={inputClass} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Personal Price ($)
              </label>
              <input name="pricePersonal" type="number" className={inputClass} placeholder="29" />
            </div>
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Standard Price ($)
              </label>
              <input name="priceStandard" type="number" className={inputClass} placeholder="99" />
            </div>
            <div>
              <label className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] block mb-1">
                Pro Price ($)
              </label>
              <input name="pricePro" type="number" className={inputClass} placeholder="349" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" name="stemsAvailable" id="stems" className="accent-[#b2a2cb]" />
            <label htmlFor="stems" className="font-display text-sm text-[#6b6b6b]">
              Stems available
            </label>
            <input type="checkbox" name="published" id="published" className="accent-[#b2a2cb] ml-4" />
            <label htmlFor="published" className="font-display text-sm text-[#6b6b6b]">
              Publish immediately
            </label>
          </div>

          <div className="pt-4 border-t border-[#e2e0dd]">
            <button
              type="submit"
              disabled={loading}
              className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save Track"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────
export default function AdminClient() {
  const { authed, password, setPassword, error, login } = useAdminAuth();
  const [tab, setTab] = useState<"tracks" | "inquiries" | "analytics">("tracks");
  const [showAddTrack, setShowAddTrack] = useState(false);

  if (authed === null) return null; // SSR guard
  if (!authed)
    return (
      <LoginGate
        password={password}
        setPassword={setPassword}
        error={error}
        login={login}
      />
    );

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {showAddTrack && <AddTrackForm onClose={() => setShowAddTrack(false)} />}

      {/* Admin header */}
      <div className="bg-[#0a0a0a] px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lock size={14} className="text-[#b2a2cb]" />
          <span className="font-display text-sm text-[#f7f5f2]">
            frey_s · Admin
          </span>
        </div>
        <Link
          href="/"
          className="font-display text-xs text-[#6b6b6b] hover:text-[#f7f5f2] transition-colors inline-flex items-center gap-1"
        >
          View site <ExternalLink size={10} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={Music} label="Tracks" value={DEMO_TRACKS.length} sub="Demo data" />
          <StatCard icon={BarChart2} label="Revenue" value="$0" sub="Stripe not connected" />
          <StatCard icon={MessageSquare} label="Inquiries" value="—" sub="DB not connected" />
          <StatCard icon={BarChart2} label="Purchases" value="—" sub="DB not connected" />
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#e2e0dd] mb-8">
          {(["tracks", "inquiries", "analytics"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-display text-xs uppercase tracking-widest px-5 py-3 border-b-2 transition-colors ${
                tab === t
                  ? "border-[#b2a2cb] text-[#0a0a0a]"
                  : "border-transparent text-[#6b6b6b] hover:text-[#0a0a0a]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tracks tab */}
        {tab === "tracks" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">
                Catalog
              </h2>
              <button
                onClick={() => setShowAddTrack(true)}
                className="font-display text-xs uppercase tracking-widest px-4 py-2 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1"
              >
                <Plus size={12} /> Add Track
              </button>
            </div>
            <div className="border border-[#e2e0dd] overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e2e0dd] bg-[#f0eee9]">
                    {["Title", "Moods", "Price", "Status", ""].map((h) => (
                      <th
                        key={h}
                        className="font-display text-[10px] uppercase tracking-widest text-[#6b6b6b] text-left py-2 px-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEMO_TRACKS.map((track) => (
                    <TrackRow key={track.id} track={track} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries tab */}
        {tab === "inquiries" && (
          <div className="border border-dashed border-[#e2e0dd] p-16 text-center">
            <MessageSquare size={24} className="text-[#b2a2cb] mx-auto mb-4" />
            <p className="font-display text-sm text-[#6b6b6b]">
              Connect a database to view inquiries.
            </p>
            <p className="font-display text-xs text-[#6b6b6b] mt-2">
              Add <code className="bg-[#e2e0dd] px-1">DATABASE_URL</code> to{" "}
              <code className="bg-[#e2e0dd] px-1">.env</code> and run{" "}
              <code className="bg-[#e2e0dd] px-1">npx prisma migrate dev</code>
            </p>
          </div>
        )}

        {/* Analytics tab */}
        {tab === "analytics" && (
          <div className="border border-dashed border-[#e2e0dd] p-16 text-center">
            <BarChart2 size={24} className="text-[#b2a2cb] mx-auto mb-4" />
            <p className="font-display text-sm text-[#6b6b6b]">
              Analytics available after connecting Stripe and database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
