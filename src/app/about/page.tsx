import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Federico Reyes (frey_s) — Venezuelan composer and sound artist based in Barcelona.",
};

export default function AboutPage() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 border-b border-[#E5E5E5] pb-8">
        <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          biography
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
          About
        </h1>
      </div>

      {/* Swiss two-column layout */}
      <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-20">
        {/* Photo — cols 1–4 */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E5E5]">
            <Image
              src="/img/fede-piano-barcelona.png"
              alt="Federico Reyes — Piano Barcelona"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E5E5]">
            <Image
              src="/img/fede-kew-gardens.png"
              alt="Federico Reyes at Kew Gardens"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio — cols 5–12 */}
        <div className="md:col-span-8 flex flex-col justify-start pt-1">
          <h2 className="text-xl font-semibold text-[#0A0A0A] mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Federico Reyes
            <span className="text-[#999999] font-normal ml-2">(frey_s)</span>
          </h2>

          <div className="text-sm text-[#999999] leading-relaxed space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
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
                className="text-[#0A0A0A] hover:text-[#FF2200] underline underline-offset-4"
              >
                Music, Sound and Technology at City University of London ↗
              </a>{" "}
              and more recently earned an{" "}
              <a
                href="https://cei.es/cei-curso/curso-intensivo-diseno-grafico/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A0A0A] hover:text-[#FF2200] underline underline-offset-4"
              >
                Adobe Creative Suite certification at CEI ↗
              </a>{" "}
              in Madrid.
            </p>
            <p>
              His experience includes work as a luxury hotel pianist with{" "}
              <a
                href="https://www.sternbergclarke.co.uk/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A0A0A] hover:text-[#FF2200] underline underline-offset-4"
              >
                Sternberg Clarke ↗
              </a>
              , music teacher at{" "}
              <a
                href="https://www.themusicklub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A0A0A] hover:text-[#FF2200] underline underline-offset-4"
              >
                The Music Klub ↗
              </a>
              , and producer for independent projects including{" "}
              <a
                href="https://lacreurecords.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A0A0A] hover:text-[#FF2200] underline underline-offset-4"
              >
                La Creu Records ↗
              </a>
              .
            </p>
            <p>
              Reyes is currently open to working on new sound, music, and visual
              art projects.
            </p>
          </div>

          {/* Social links */}
          <div className="mt-10 pt-8 border-t border-[#E5E5E5]">
            <p className="text-[10px] text-[#999999] mb-4" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              elsewhere
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Spotify", href: "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU" },
                { label: "Bandcamp", href: "https://freysss.bandcamp.com/" },
                { label: "YouTube", href: "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A" },
                { label: "Instagram", href: "https://www.instagram.com/_frey_s_/" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#999999] hover:text-[#0A0A0A]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#E5E5E5] pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-base text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
          Let&apos;s work together
        </p>
        <Link
          href="/contact"
          className="text-[13px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px shrink-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
