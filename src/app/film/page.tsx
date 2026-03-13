import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Film & Media",
  description:
    "Film and media composition work by Federico Reyes (frey_s) — short films, documentaries, art installations.",
};

const projects = [
  {
    title: "Los Capítulos Perdidos",
    year: "2024",
    embedUrl: "https://www.youtube.com/embed/uo5i8C7DI4E",
    type: "Film Score",
    description:
      "Original score composition for this short film project. Details on creative process and role to be added.",
  },
  {
    title: "Clean Ocean Project",
    year: "—",
    embedUrl: "https://www.youtube.com/embed/TZBTXS65zfw",
    type: "Documentary",
    description: "Music for documentary on ocean conservation. Details to be added.",
  },
  {
    title: "Art21 — Esteban Cabeza de Baca's Time Travels",
    year: "—",
    embedUrl: "https://www.youtube.com/embed/ellayFusll0",
    type: "Art Installation",
    description: "Sound design and composition for Art21 series. Details to be added.",
  },
  {
    title: "Art21 — Tau Lewis's Shreds of Memory",
    year: "—",
    embedUrl: "https://www.youtube.com/embed/ObU0EasffuA?start=186",
    type: "Art Installation",
    description: "Score for Art21 documentary. Details to be added.",
  },
  {
    title: "frey_s — Live @SSUAVE3000",
    year: "—",
    embedUrl: "https://www.youtube.com/embed/1doUlQMzxvY",
    type: "Live Performance",
    description: "Live audiovisual performance set.",
  },
];

export default function FilmPage() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 border-b border-[#E5E5E5] pb-8 flex items-end justify-between gap-8">
        <div>
          <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            portfolio
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Film & Media
          </h1>
        </div>
        <Link
          href="/contact"
          className="text-[10px] text-[#999999] hover:text-[#FF2200] shrink-0 border-b border-[#E5E5E5] pb-px"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          Open to new projects →
        </Link>
      </div>

      {/* Projects — numbered list, 2-col rows */}
      <div className="flex flex-col gap-16 md:gap-20">
        {projects.map((project, i) => (
          <article key={project.title} className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Index */}
            <div className="md:col-span-1">
              <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Info */}
            <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-3" : ""}`}>
              <p className="text-[10px] text-[#FF2200] mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                {project.type}
              </p>
              <h2 className="text-base font-semibold text-[#0A0A0A] mb-2 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                {project.title}
              </h2>
              {project.year !== "—" && (
                <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{project.year}</p>
              )}
              <p className="text-sm text-[#999999] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {project.description}
              </p>
            </div>

            {/* Video */}
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative aspect-video bg-[#0A0A0A] overflow-hidden">
                <iframe
                  src={project.embedUrl}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 pt-12 border-t border-[#E5E5E5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-base text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Working on something?
          </p>
          <p className="text-sm text-[#999999] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Available for film scores, documentary music, and creative sound projects.
          </p>
        </div>
        <Link
          href="/contact"
          className="text-[13px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px shrink-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Let&apos;s talk →
        </Link>
      </div>
    </div>
  );
}
