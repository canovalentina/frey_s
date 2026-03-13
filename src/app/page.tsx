import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredWork = [
  {
    title: "ARP Improv No. 1",
    href: "https://www.youtube.com/watch?v=-wG3YN8odoM",
    img: "/img/arp-improv-no1.png",
    tag: "Electronic",
  },
  {
    title: "Fotografía",
    href: "https://www.youtube.com/watch?v=ds7z2Bki96U",
    img: "/img/fotografia-cassettes-piano.png",
    tag: "Solo Piano",
  },
  {
    title: "Tru Combo",
    href: "https://www.youtube.com/watch?v=Y8U3FCCdi8s",
    img: "/img/trucombo-cassette-abierto.png",
    tag: "Production",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-6">
            Composer & Sound Artist — Barcelona
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#0a0a0a]">
            Federico
            <br />
            <span className="text-[#b2a2cb]">Reyes</span>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-[#6b6b6b] mt-8 max-w-xl leading-relaxed">
            Film scores, ambient electronics, and solo piano — available for
            collaboration and licensing.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/music/licensing"
              className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-2"
            >
              License Music <ArrowRight size={14} />
            </Link>
            <Link
              href="/film"
              className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f7f5f2] transition-colors"
            >
              Film Work
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="border-t border-[#e2e0dd]" />

      {/* ─── Featured Work ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">
            Featured Work
          </h2>
          <Link
            href="/music"
            className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredWork.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-[#e2e0dd]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="font-display text-xs uppercase tracking-widest text-[#b2a2cb] mb-1">
                    {item.tag}
                  </p>
                  <h3 className="font-display font-semibold text-[#0a0a0a] group-hover:text-[#b2a2cb] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <ArrowRight
                  size={16}
                  className="text-[#6b6b6b] mt-1 group-hover:text-[#b2a2cb] transition-colors"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="border-t border-[#e2e0dd]" />

      {/* ─── About Strip ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e2e0dd]">
          <Image
            src="/img/fede-piano-barcelona.png"
            alt="Federico Reyes — Piano Barcelona"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-6">
            About
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-[#0a0a0a] mb-6">
            Venezuelan composer
            <br />
            based in Barcelona
          </h2>
          <p className="font-serif text-lg text-[#6b6b6b] leading-relaxed mb-8">
            With a foundation in piano, Federico&apos;s work spans music
            production, composition, live performance, and visual art. Trained
            at City University of London, his sound bridges classical tradition
            with experimental electronics.
          </p>
          <Link
            href="/about"
            className="font-display text-sm font-semibold uppercase tracking-widest text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors inline-flex items-center gap-2"
          >
            Full bio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="border-t border-[#e2e0dd]" />

      {/* ─── CTA Banner ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#f7f5f2] leading-tight">
              Ready to license
              <br />
              <span className="text-[#b2a2cb]">original music?</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/music/licensing"
              className="font-display text-sm font-semibold uppercase tracking-widest px-8 py-4 bg-[#b2a2cb] text-[#0a0a0a] hover:bg-[#f7f5f2] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              Browse Catalog <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="font-display text-sm font-semibold uppercase tracking-widest px-8 py-4 border border-[#f7f5f2]/30 text-[#f7f5f2] hover:border-[#b2a2cb] hover:text-[#b2a2cb] transition-colors text-center"
            >
              Custom Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
