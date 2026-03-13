// Placeholder track data — replace audioUrl with real Cloudflare R2 URLs when available.
// This is the single source of truth for the licensing catalog.

export interface LicensablTrack {
  id: string;
  slug: string;
  title: string;
  artist: string;
  audioUrl: string;       // R2 / Supabase Storage URL (preview clip, 30–45s)
  coverUrl?: string;
  duration?: number;      // seconds
  bpm?: number;
  key?: string;
  moods: string[];
  genres: string[];
  instrumentation?: string;
  stemsAvailable: boolean;
  licenses: {
    type: "personal" | "standard" | "professional" | "exclusive";
    price: number;
  }[];
}

export const DEMO_TRACKS: LicensablTrack[] = [
  {
    id: "track-01",
    slug: "silent-cartography",
    title: "Silent Cartography",
    artist: "frey_s",
    audioUrl: "",
    duration: 187,
    bpm: 72,
    key: "C min",
    moods: ["melancholic", "contemplative"],
    genres: ["ambient", "piano"],
    instrumentation: "Piano, strings, light electronics",
    stemsAvailable: true,
    licenses: [
      { type: "personal", price: 29 },
      { type: "standard", price: 99 },
      { type: "professional", price: 349 },
    ],
  },
  {
    id: "track-02",
    slug: "analog-pastoral",
    title: "Analog Pastoral",
    artist: "frey_s",
    audioUrl: "",
    duration: 214,
    bpm: 85,
    key: "G maj",
    moods: ["peaceful", "uplifting"],
    genres: ["electronic", "ambient"],
    instrumentation: "Analog synths, field recordings",
    stemsAvailable: false,
    licenses: [
      { type: "personal", price: 29 },
      { type: "standard", price: 129 },
      { type: "professional", price: 399 },
    ],
  },
  {
    id: "track-03",
    slug: "ciudad-interior",
    title: "Ciudad Interior",
    artist: "frey_s",
    audioUrl: "",
    duration: 162,
    bpm: 96,
    key: "A min",
    moods: ["tense", "cinematic"],
    genres: ["orchestral", "electronic"],
    instrumentation: "Strings, piano, percussion, synth bass",
    stemsAvailable: true,
    licenses: [
      { type: "personal", price: 49 },
      { type: "standard", price: 179 },
      { type: "professional", price: 599 },
    ],
  },
  {
    id: "track-04",
    slug: "lluvia-en-gracia",
    title: "Lluvia en Gràcia",
    artist: "frey_s",
    audioUrl: "",
    duration: 203,
    bpm: 68,
    key: "F maj",
    moods: ["melancholic", "romantic"],
    genres: ["piano", "ambient"],
    instrumentation: "Solo piano, rain field recording",
    stemsAvailable: false,
    licenses: [
      { type: "personal", price: 29 },
      { type: "standard", price: 99 },
      { type: "professional", price: 299 },
    ],
  },
  {
    id: "track-05",
    slug: "thermal-gradient",
    title: "Thermal Gradient",
    artist: "frey_s",
    audioUrl: "",
    duration: 241,
    bpm: 110,
    key: "D min",
    moods: ["tense", "driving"],
    genres: ["electronic", "experimental"],
    instrumentation: "Synthesizers, drum machine, bass",
    stemsAvailable: true,
    licenses: [
      { type: "personal", price: 49 },
      { type: "standard", price: 199 },
      { type: "professional", price: 699 },
    ],
  },
  {
    id: "track-06",
    slug: "memoria-costera",
    title: "Memoria Costera",
    artist: "frey_s",
    audioUrl: "",
    duration: 198,
    bpm: 76,
    key: "E min",
    moods: ["nostalgic", "peaceful"],
    genres: ["ambient", "piano"],
    instrumentation: "Piano, guitar harmonics, ocean ambience",
    stemsAvailable: true,
    licenses: [
      { type: "personal", price: 29 },
      { type: "standard", price: 109 },
      { type: "professional", price: 349 },
    ],
  },
];

export const ALL_MOODS = [...new Set(DEMO_TRACKS.flatMap((t) => t.moods))].sort();
export const ALL_GENRES = [...new Set(DEMO_TRACKS.flatMap((t) => t.genres))].sort();
