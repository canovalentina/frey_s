import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Federico Reyes (frey_s) for film scores, licensing, collaborations, and live performance bookings.",
};

export default function ContactPage() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 border-b border-[#E5E5E5] pb-8">
        <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          get in touch
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
          Contact
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <ContactForm />

        {/* Info */}
        <div className="space-y-8">
          <div>
            <p className="text-[10px] text-[#999999] mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              email
            </p>
            <a
              href="mailto:federicoreyes94@gmail.com"
              className="text-sm text-[#0A0A0A] hover:text-[#FF2200]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              federicoreyes94@gmail.com
            </a>
          </div>

          <div>
            <p className="text-[10px] text-[#999999] mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              based in
            </p>
            <p className="text-sm text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Barcelona, Spain
            </p>
          </div>

          <div>
            <p className="text-[10px] text-[#999999] mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              response time
            </p>
            <p className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>
              I typically respond within 2–3 business days.
            </p>
          </div>

          <div>
            <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              available for
            </p>
            <ul className="space-y-1.5">
              {[
                "Film & TV scoring",
                "Documentary music",
                "Music licensing",
                "Live performances",
                "Sound installations",
                "Music production",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-[4px] h-[4px] bg-[#0A0A0A] shrink-0 inline-block" />
                  <span className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
