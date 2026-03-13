import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-2xl">
        <p className="font-display text-xs text-[#8a847c] mb-4">
          portfolio
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#111111] mb-6">
          Film & Media
        </h1>
        <p className="font-serif text-xl text-[#8a847c] leading-relaxed">
          Original scores, sound design, and live performance for film,
          documentary, and visual art.
        </p>
      </div>

      {/* Hire nudge */}
      <div className="mb-16 border-t border-[#d8d2ca] pt-8 flex items-center justify-between">
        <p className="font-display text-xs text-[#8a847c]">Open to new projects</p>
        <Link
          href="/contact"
          className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#111111] hover:border-[#c8432a] transition-colors pb-px inline-flex items-center gap-1"
        >
          Get in touch <ArrowRight size={12} />
        </Link>
      </div>

      {/* Projects */}
      <div className="space-y-24 md:space-y-32">
        {projects.map((project, i) => (
          <article key={project.title} className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Video — alternate left/right on desktop */}
            <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative aspect-video bg-[#111111] overflow-hidden">
                <iframe
                  src={project.embedUrl}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            {/* Info */}
            <div className={`flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="font-display text-xs text-[#8a847c] mb-2">
                {project.type}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#111111] mb-2 leading-tight">
                {project.title}
              </h2>
              {project.year !== "—" && (
                <p className="font-display text-xs text-[#8a847c] mb-4">{project.year}</p>
              )}
              <p className="font-serif text-base text-[#8a847c] leading-relaxed">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-24 md:mt-32 pt-16 border-t border-[#d8d2ca] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-serif text-2xl md:text-3xl text-[#111111] leading-snug mb-2">
            Working on something?
          </p>
          <p className="font-serif text-base text-[#8a847c]">
            Available for film scores, documentary music, and creative sound projects.
          </p>
        </div>
        <Link
          href="/contact"
          className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#111111] hover:border-[#c8432a] transition-colors pb-px shrink-0 inline-flex items-center gap-1"
        >
          Let&apos;s talk <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
