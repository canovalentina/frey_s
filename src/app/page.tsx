import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  openGraph: {
    images: [{ url: "/api/og?title=frey_s&sub=Barcelona+%E2%80%94+piano+%2B+electronics", width: 1200, height: 630 }],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "frey_s",
  alternateName: "Federico Reyes",
  description: "Venezuelan composer and sound artist based in Barcelona. Piano, ambient, electronic, film scores.",
  url: "https://freyes.com",
  genre: ["Ambient", "Electronic", "Piano", "Orchestral"],
  sameAs: [
    "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU",
    "https://freysss.bandcamp.com/",
    "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A",
    "https://www.instagram.com/_frey_s_/",
  ],
};

const featuredWork = [
  { idx: "01", title: "ARP Improv No. 1", href: "https://www.youtube.com/watch?v=-wG3YN8odoM", img: "/img/arp-improv-no1.png", tag: "Electronic" },
  { idx: "02", title: "Fotografía", href: "https://www.youtube.com/watch?v=ds7z2Bki96U", img: "/img/fotografia-cassettes-piano.png", tag: "Solo piano" },
  { idx: "03", title: "Tru Combo", href: "https://www.youtube.com/watch?v=Y8U3FCCdi8s", img: "/img/trucombo-cassette-abierto.png", tag: "Production" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema} />

      {/* ─── Top: Swiss 2-col identity + work list ─── */}
      <section className="swiss-grid pt-20 md:pt-24 pb-16 border-b border-[#E5E5E5]">
        {/* Identity block — cols 1–3 */}
        <div className="col-start-1 col-span-12 md:col-span-3 flex flex-col justify-between gap-8 mb-12 md:mb-0">
          <div>
            <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              frey_s
            </p>
            <p className="text-sm text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Federico Reyes
            </p>
            <p className="text-[10px] text-[#999999] mt-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              composer · sound artist
            </p>
            <p className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              Barcelona, Spain
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/music/licensing" className="text-[13px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px self-start" style={{ fontFamily: "Inter, sans-serif" }}>
              License music →
            </Link>
            <Link href="/film" className="text-[13px] text-[#999999] hover:text-[#0A0A0A] self-start" style={{ fontFamily: "Inter, sans-serif" }}>
              Film work
            </Link>
          </div>
        </div>

        {/* Featured work list — cols 4–12 */}
        <div className="col-start-1 md:col-start-4 col-span-12 md:col-span-9">
          <p className="text-[10px] text-[#999999] mb-6" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            selected work
          </p>
          <div className="flex flex-col">
            {featuredWork.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-6 py-5 hover:bg-[#FFE500] ${i < featuredWork.length - 1 ? "border-b border-[#E5E5E5]" : ""}`}
              >
                <span className="text-[10px] text-[#999999] shrink-0 w-6" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {item.idx}
                </span>
                <div className="relative w-12 h-12 shrink-0 bg-[#E5E5E5] overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0A0A0A] truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.title}
                  </p>
                </div>
                <span className="text-[10px] text-[#999999] shrink-0" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {item.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Works grid ─── */}
      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-[#E5E5E5]">
        <p className="text-[10px] text-[#999999] mb-8" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          releases
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {featuredWork.map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block border-t border-[#E5E5E5] pt-4 pb-6 pr-0 ${i < 2 ? "md:pr-8" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {item.idx}
                </span>
                <span className="text-[10px] text-[#FF2200]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  {item.tag}
                </span>
              </div>
              <div className="relative aspect-[4/3] bg-[#E5E5E5] overflow-hidden mb-4">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
              </div>
              <p className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#FF2200]" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Licensing nudge ─── */}
      <section className="px-6 md:px-12 py-12 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <p className="text-[10px] text-[#999999] mb-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            music licensing
          </p>
          <p className="text-base text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Original tracks available for film, video, and commercial use.
          </p>
        </div>
        <Link
          href="/music/licensing"
          className="text-[13px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px shrink-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Browse catalog →
        </Link>
      </section>
    </>
  );
}
