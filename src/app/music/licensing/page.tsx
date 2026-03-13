import type { Metadata } from "next";
import Link from "next/link";
import LicensingCatalog from "./LicensingCatalog";

export const metadata: Metadata = {
  title: "License Music",
  description:
    "License original music by frey_s for film, TV, YouTube, podcasts, and commercial projects.",
};

export default function LicensingPage() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Header — Swiss grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="md:col-start-1 md:col-span-4">
          <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            sync licensing
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
            License Music
          </h1>
        </div>
        <div className="md:col-start-5 md:col-span-8 flex flex-col justify-end">
          <p className="text-sm text-[#999999] mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Original compositions for film, TV, advertising, YouTube, and more.
            Click play to preview — all previews are watermarked.
          </p>
          <Link
            href="/contact"
            className="text-[10px] text-[#999999] hover:text-[#FF2200] self-start"
            style={{ fontFamily: "IBM Plex Mono, monospace" }}
          >
            Need something custom? →
          </Link>
        </div>
      </div>

      {/* Tier reference — 4 horizontal cells */}
      <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E5E5E5] mb-12">
        {[
          { name: "Personal", price: "from $29", use: "Student films, personal" },
          { name: "Standard", price: "from $99", use: "YouTube, podcasts" },
          { name: "Professional", price: "from $299", use: "Film, TV, advertising" },
          { name: "Exclusive", price: "Custom", use: "Full buyout" },
        ].map((tier, i) => (
          <div key={tier.name} className={`p-4 md:p-5 ${i < 3 ? "border-r border-[#E5E5E5]" : ""}`}>
            <p className="text-[10px] text-[#FF2200] mb-1" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              {tier.name}
            </p>
            <p className="text-sm font-medium text-[#0A0A0A] mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              {tier.price}
            </p>
            <p className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{tier.use}</p>
          </div>
        ))}
      </div>

      {/* Catalog */}
      <LicensingCatalog />
    </div>
  );
}
