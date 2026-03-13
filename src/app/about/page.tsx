import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Federico Reyes (frey_s) — Venezuelan composer and sound artist based in Barcelona.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">
          Biography
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a]">
          About
        </h1>
      </div>

      {/* Main Bio Section */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24 md:mb-32">
        {/* Photo */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e2e0dd]">
            <Image
              src="/img/fede-piano-barcelona.png"
              alt="Federico Reyes — Piano Barcelona"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#e2e0dd]">
            <Image
              src="/img/fede-kew-gardens.png"
              alt="Federico Reyes at Kew Gardens"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio Text */}
        <div className="flex flex-col justify-start pt-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-8 leading-tight">
            Federico Reyes
            <br />
            <span className="text-[#b2a2cb]">(frey_s)</span>
          </h2>

          <div className="font-serif text-lg text-[#6b6b6b] leading-relaxed space-y-6">
            <p>
              Federico Reyes (frey_s) is a Venezuelan artist based in Barcelona,
              Spain. With a foundation in piano, his creative pursuits have
              expanded to encompass music production, composition, live
              performance, and drawing.
            </p>
            <p>
              He studied{" "}
              <a
                href="https://www.city.ac.uk/prospective-students/courses/undergraduate/music-sound-and-technology"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] underline underline-offset-4 hover:text-[#b2a2cb] transition-colors"
              >
                Music, Sound and Technology at City University of London
              </a>{" "}
              and more recently earned an{" "}
              <a
                href="https://cei.es/cei-curso/curso-intensivo-diseno-grafico/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] underline underline-offset-4 hover:text-[#b2a2cb] transition-colors"
              >
                Adobe Creative Suite certification at CEI
              </a>{" "}
              in Madrid.
            </p>
            <p>
              His experience includes work as a luxury hotel pianist with{" "}
              <a
                href="https://www.sternbergclarke.co.uk/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] underline underline-offset-4 hover:text-[#b2a2cb] transition-colors"
              >
                Sternberg Clarke
              </a>
              , music teacher at{" "}
              <a
                href="https://www.themusicklub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] underline underline-offset-4 hover:text-[#b2a2cb] transition-colors"
              >
                The Music Klub
              </a>
              , and producer for independent projects including{" "}
              <a
                href="https://lacreurecords.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a0a0a] underline underline-offset-4 hover:text-[#b2a2cb] transition-colors"
              >
                La Creu Records
              </a>
              .
            </p>
            <p>
              Reyes is currently open to working on new sound, music, and visual
              art projects.
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-10 border-t border-[#e2e0dd]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-6">
              Find me on
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  label: "Spotify",
                  href: "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU",
                },
                {
                  label: "Bandcamp",
                  href: "https://freysss.bandcamp.com/",
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/_frey_s_/",
                },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-medium px-4 py-2 border border-[#e2e0dd] text-[#0a0a0a] hover:border-[#b2a2cb] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-2"
                >
                  {label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#e2e0dd] pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-3">
            Available for projects
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0a0a0a]">
            Let&apos;s work together
          </h2>
        </div>
        <Link
          href="/contact"
          className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-2 shrink-0"
        >
          Get in touch <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
