import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LicensingCatalog from "./LicensingCatalog";

export const metadata: Metadata = {
  title: "License Music",
  description:
    "License original music by frey_s for film, TV, YouTube, podcasts, and commercial projects.",
};

export default function LicensingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 md:mb-16 grid md:grid-cols-2 gap-8 items-end">
        <div>
          <p className="font-display text-xs text-[#8a847c] mb-4">
            sync licensing
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-[#111111]">
            License Music
          </h1>
        </div>
        <div>
          <p className="font-serif text-lg text-[#8a847c] leading-relaxed mb-6">
            Original compositions for film, TV, advertising, YouTube, and more.
            Click play to preview — all previews are watermarked.
          </p>
          <Link
            href="/contact"
            className="font-display text-xs text-[#8a847c] hover:text-[#c8432a] transition-colors inline-flex items-center gap-1"
          >
            Need something custom? <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Tier reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#d8d2ca] mb-16">
        {[
          { name: "Personal", price: "from $29", use: "Student films, personal" },
          { name: "Standard", price: "from $99", use: "YouTube, podcasts" },
          { name: "Professional", price: "from $299", use: "Film, TV, advertising" },
          { name: "Exclusive", price: "Custom", use: "Full buyout" },
        ].map((tier) => (
          <div key={tier.name} className="bg-[#f0ebe3] p-4 md:p-6">
            <p className="font-display text-[10px] text-[#c8432a] mb-1">
              {tier.name}
            </p>
            <p className="font-display font-bold text-[#111111] text-sm mb-0.5">
              {tier.price}
            </p>
            <p className="font-display text-[10px] text-[#8a847c]">{tier.use}</p>
          </div>
        ))}
      </div>

      {/* Catalog */}
      <LicensingCatalog />
    </div>
  );
}
