import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Released albums and music catalog by Federico Reyes (frey_s) — ambient, electronic, and solo piano.",
};

const albums = [
  {
    title: "7-10-22",
    year: "2023",
    description:
      "Series of experimental piano improvisations, recorded in Barcelona in one afternoon.",
    img: "/img/7-10-22.png",
    links: {
      spotify: "https://open.spotify.com/album/3AC40JZMI1f5tgtJrSmOiq",
      youtube: "https://www.youtube.com/watch?v=Pq61a5YgUnU",
    },
    tags: ["Piano", "Experimental"],
  },
  {
    title: "Tru Combo",
    year: "2021",
    description:
      "Exploring heavy FX processing, beatmaking, analog synths, acoustic instruments, and samples.",
    img: "/img/tru-combo.png",
    links: {
      spotify: "https://open.spotify.com/album/4bKUif03dc89t46Se1evqu",
      youtube: "https://www.youtube.com/watch?v=E-jXiTb0Nis",
    },
    tags: ["Electronic", "Production"],
  },
  {
    title: "Fotografía Vol. 2",
    year: "2019",
    description: "Continuation of Fotografía Vol. 1.",
    img: "/img/fotografia-vol2.png",
    links: {
      spotify: "https://open.spotify.com/album/13GR4j1xcXHHYNeTQ9tNAp",
      bandcamp: "https://freysss.bandcamp.com/album/fotograf-a-vol-2",
      youtube: "https://www.youtube.com/watch?v=OCxB5puriWs",
    },
    tags: ["Piano", "Harmony"],
  },
  {
    title: "Fotografía Vol. 1",
    year: "2019",
    description: "Solo piano, harmony studies, improvisation.",
    img: "/img/fotografia-vol1.png",
    links: {
      spotify: "https://open.spotify.com/album/7aDU51xm2kgG18mOXMR6Cu",
      bandcamp: "https://freysss.bandcamp.com/album/fotograf-a",
      youtube: "https://www.youtube.com/watch?v=cTzJM9HrG8E",
    },
    tags: ["Piano", "Solo"],
  },
  {
    title: "The Hidden Toys",
    year: "2021",
    description: "Bonus tracks from Tru Combo sessions.",
    img: "/img/hidden-toys.png",
    links: {
      spotify: "https://open.spotify.com/album/2EU06TeOGNK4G2mkxemlrK",
      youtube: "https://www.youtube.com/watch?v=yHVkPV8dNG0",
    },
    tags: ["Electronic", "Bonus"],
  },
];

export default function MusicPage() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 border-b border-[#E5E5E5] pb-8">
        <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          discography
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
          Music
        </h1>
      </div>

      {/* Licensing nudge */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>
          Looking for tracks to license for your project?
        </p>
        <Link
          href="/music/licensing"
          className="text-[10px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px shrink-0"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          Browse catalog →
        </Link>
      </div>

      {/* Albums — horizontal list rows */}
      <div className="flex flex-col">
        {albums.map((album, i) => (
          <article
            key={album.title}
            className={`flex items-center gap-6 py-5 ${i < albums.length - 1 ? "border-b border-[#E5E5E5]" : ""}`}
          >
            {/* Index */}
            <span className="text-[10px] text-[#999999] w-5 shrink-0" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Cover */}
            <div className="relative w-12 h-12 shrink-0 bg-[#E5E5E5] overflow-hidden">
              <Image src={album.img} alt={album.title} fill className="object-cover" />
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0A0A0A] truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                {album.title}
              </p>
              <p className="text-sm text-[#999999] text-[11px] mt-0.5 hidden md:block truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                {album.description}
              </p>
            </div>

            {/* Year */}
            <span className="text-[10px] text-[#999999] shrink-0 hidden md:block" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              {album.year}
            </span>

            {/* Tags */}
            <div className="hidden md:flex gap-2 shrink-0">
              {album.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Platform links */}
            <div className="flex gap-3 shrink-0">
              {album.links.spotify && (
                <a
                  href={album.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#999999] hover:text-[#0A0A0A]"
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                >
                  Spotify ↗
                </a>
              )}
              {album.links.bandcamp && (
                <a
                  href={album.links.bandcamp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#999999] hover:text-[#0A0A0A]"
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                >
                  Bandcamp ↗
                </a>
              )}
              {album.links.youtube && (
                <a
                  href={album.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#999999] hover:text-[#0A0A0A]"
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                >
                  YouTube ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
