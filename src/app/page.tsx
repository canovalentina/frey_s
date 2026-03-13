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
  { title: "ARP Improv No. 1", href: "https://www.youtube.com/watch?v=-wG3YN8odoM", img: "/img/arp-improv-no1.png", tag: "Electronic" },
  { title: "Fotografía", href: "https://www.youtube.com/watch?v=ds7z2Bki96U", img: "/img/fotografia-cassettes-piano.png", tag: "Solo piano" },
  { title: "Tru Combo", href: "https://www.youtube.com/watch?v=Y8U3FCCdi8s", img: "/img/trucombo-cassette-abierto.png", tag: "Production" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema} />

      {/* ─── Hero ─── */}
      <section className="min-h-[95vh] flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-32 pb-12 max-w-7xl mx-auto w-full">
        <div>
          {/* Index tag */}
          <p className="font-display text-xs text-[#8a847c] mb-12 md:mb-20">
            frey_s — b. Venezuela, Barcelona
          </p>

          {/* Name — very large, poster treatment */}
          <h1 className="font-display font-bold leading-[0.9] tracking-[-0.04em] text-[#111111]"
              style={{ fontSize: "clamp(4.5rem, 16vw, 14rem)" }}>
            Federico<br />
            <span className="text-[#c8432a]">Reyes</span>
          </h1>
        </div>

        {/* Bottom row — disciplines + links */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-12 pt-8 border-t border-[#d8d2ca]">
          <p className="font-serif text-lg md:text-xl text-[#8a847c] max-w-md leading-relaxed italic">
            Piano, electronics, film scores.<br />
            Open to new projects.
          </p>
          <div className="flex gap-6 shrink-0">
            <Link href="/music/licensing" className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#111111] hover:border-[#c8432a] transition-colors pb-px">
              License music →
            </Link>
            <Link href="/film" className="font-display text-sm text-[#8a847c] hover:text-[#111111] transition-colors">
              Film work
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Work ─── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-8">
          <p className="font-display text-xs text-[#8a847c]">Selected work</p>
          <Link href="/music" className="font-display text-xs text-[#8a847c] hover:text-[#c8432a] transition-colors">
            All releases →
          </Link>
        </div>

        {/* Asymmetric grid — first image large, two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          {/* Large left */}
          <a
            href={featuredWork[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group md:col-span-3 block"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] overflow-hidden bg-[#d8d2ca]">
              <Image src={featuredWork[0].img} alt={featuredWork[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/10 transition-colors duration-300" />
            </div>
            <div className="flex justify-between items-baseline mt-3">
              <h3 className="font-display font-semibold text-[#111111] group-hover:text-[#c8432a] transition-colors">
                {featuredWork[0].title}
              </h3>
              <span className="font-display text-xs text-[#8a847c]">{featuredWork[0].tag}</span>
            </div>
          </a>

          {/* Two stacked right */}
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
            {featuredWork.slice(1).map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#d8d2ca]">
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/10 transition-colors duration-300" />
                </div>
                <div className="flex justify-between items-baseline mt-3">
                  <h3 className="font-display text-sm font-semibold text-[#111111] group-hover:text-[#c8432a] transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-display text-xs text-[#8a847c]">{item.tag}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About strip ─── */}
      <section className="border-t border-[#d8d2ca] grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[#d8d2ca]">
          <Image
            src="/img/fede-piano-barcelona.png"
            alt="Federico Reyes at the piano, Barcelona"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-8 md:px-14 py-14 md:py-20 flex flex-col justify-center">
          <p className="font-display text-xs text-[#8a847c] mb-8">About</p>
          <p className="font-serif text-2xl md:text-3xl text-[#111111] leading-snug mb-10">
            Classical piano foundation,
            expanded into production, electronics,
            and composition for film.
          </p>
          <p className="font-serif text-base text-[#8a847c] leading-relaxed mb-10">
            Trained at City University of London. Based in Barcelona.
            Open to sound, music, and visual art projects.
          </p>
          <Link href="/about" className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#d8d2ca] hover:border-[#c8432a] pb-px transition-colors self-start">
            Read more
          </Link>
        </div>
      </section>

      {/* ─── Licensing nudge — quiet, not a sales banner ─── */}
      <section className="border-t border-[#d8d2ca] px-6 md:px-12 py-14 md:py-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-xs text-[#8a847c] mb-2">Music licensing</p>
          <p className="font-display text-xl md:text-2xl font-semibold text-[#111111]">
            Original tracks available for film, video, and commercial use.
          </p>
        </div>
        <Link
          href="/music/licensing"
          className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#111111] hover:border-[#c8432a] transition-colors pb-px shrink-0"
        >
          Browse catalog →
        </Link>
      </section>
    </>
  );
}
