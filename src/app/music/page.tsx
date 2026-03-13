import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Released albums and music catalog by Federico Reyes (frey_s) — ambient, electronic, and solo piano.",
};

const albums = [
  {
    title: "7-10-22",
    year: "July 2023",
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
    year: "June 2021",
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
    year: "December 2019",
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
    year: "August 2019",
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
    year: "October 2021",
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
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">
          Discography
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] mb-6">
          Music
        </h1>
        <p className="font-serif text-xl text-[#6b6b6b] leading-relaxed">
          Five years of piano, electronics, and sonic exploration.
        </p>
      </div>

      {/* Licensing CTA */}
      <div className="mb-16 p-8 md:p-12 bg-[#0a0a0a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#b2a2cb] mb-2">
            Sync & Licensing
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#f7f5f2]">
            Need music for your project?
          </h2>
        </div>
        <Link
          href="/music/licensing"
          className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#b2a2cb] text-[#0a0a0a] hover:bg-[#f7f5f2] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          Browse Licensing Catalog <ArrowRight size={14} />
        </Link>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {albums.map((album) => (
          <article key={album.title} className="group">
            <div className="relative aspect-square overflow-hidden bg-[#e2e0dd] mb-4">
              <Image
                src={album.img}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex gap-2 mb-2">
              {album.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-display text-[10px] uppercase tracking-widest text-[#b2a2cb]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-xl font-bold text-[#0a0a0a] mb-1">
              {album.title}
            </h3>
            <p className="font-display text-xs text-[#6b6b6b] mb-3">
              {album.year}
            </p>
            <p className="font-serif text-sm text-[#6b6b6b] leading-relaxed mb-4">
              {album.description}
            </p>
            <div className="flex gap-4">
              {album.links.spotify && (
                <a
                  href={album.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs uppercase tracking-widest text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-1"
                >
                  Spotify <ExternalLink size={10} />
                </a>
              )}
              {album.links.bandcamp && (
                <a
                  href={album.links.bandcamp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs uppercase tracking-widest text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-1"
                >
                  Bandcamp <ExternalLink size={10} />
                </a>
              )}
              {album.links.youtube && (
                <a
                  href={album.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs uppercase tracking-widest text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-1"
                >
                  YouTube <ExternalLink size={10} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
