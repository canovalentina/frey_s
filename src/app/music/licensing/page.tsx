import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "License Music",
  description:
    "License original music by frey_s for film, TV, YouTube, podcasts, and commercial projects.",
};

export default function LicensingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="mb-16 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">
          Sync Licensing
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] mb-6">
          License Music
        </h1>
        <p className="font-serif text-xl text-[#6b6b6b] leading-relaxed">
          Original compositions available for film, TV, advertising, YouTube,
          and more. Flexible license tiers for every project size.
        </p>
      </div>

      {/* Coming soon placeholder */}
      <div className="border border-dashed border-[#e2e0dd] p-16 text-center">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#b2a2cb] mb-4">
          Coming Soon
        </p>
        <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-4">
          Catalog launching soon
        </h2>
        <p className="font-serif text-[#6b6b6b] mb-8 max-w-md mx-auto">
          The full licensing catalog is being prepared. In the meantime, reach
          out directly for licensing inquiries.
        </p>
        <Link
          href="/contact"
          className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-block"
        >
          Contact for Licensing
        </Link>
      </div>

      {/* License Tiers Preview */}
      <div className="mt-16 md:mt-24">
        <h2 className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-8">
          License Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Personal",
              price: "$29–49",
              use: "Personal projects, student films",
              includes: "MP3, credit required",
            },
            {
              name: "Standard",
              price: "$99–199",
              use: "YouTube, podcasts, small commercial",
              includes: "WAV + MP3, credit required",
            },
            {
              name: "Professional",
              price: "$299–999",
              use: "Film, TV, advertising",
              includes: "Stems, WAV, flexible credit",
            },
            {
              name: "Exclusive",
              price: "Custom",
              use: "Full buyout",
              includes: "All rights transfer",
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className="border border-[#e2e0dd] p-6 hover:border-[#b2a2cb] transition-colors"
            >
              <p className="font-display text-xs uppercase tracking-widest text-[#b2a2cb] mb-3">
                {tier.name}
              </p>
              <p className="font-display text-2xl font-bold text-[#0a0a0a] mb-2">
                {tier.price}
              </p>
              <p className="font-serif text-sm text-[#6b6b6b] mb-3">
                {tier.use}
              </p>
              <p className="font-display text-xs text-[#6b6b6b] border-t border-[#e2e0dd] pt-3">
                {tier.includes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
