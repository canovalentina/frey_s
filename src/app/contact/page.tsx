import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Federico Reyes (frey_s) for film scores, licensing, collaborations, and live performance bookings.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">
          Get in touch
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] mb-6">
          Contact
        </h1>
        <p className="font-serif text-xl text-[#6b6b6b] leading-relaxed">
          For film scores, licensing, collaborations, and live performance
          bookings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <ContactForm />

        {/* Info */}
        <div className="space-y-10">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-3">
              Email
            </p>
            <a
              href="mailto:federicoreyes94@gmail.com"
              className="font-display text-lg text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors"
            >
              federicoreyes94@gmail.com
            </a>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-3">
              Based in
            </p>
            <p className="font-display text-lg text-[#0a0a0a]">
              Barcelona, Spain
            </p>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-3">
              Response time
            </p>
            <p className="font-serif text-[#6b6b6b]">
              I typically respond within 2–3 business days.
            </p>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-3">
              Available for
            </p>
            <ul className="font-serif text-[#6b6b6b] space-y-1">
              {[
                "Film & TV scoring",
                "Documentary music",
                "Music licensing",
                "Live performances",
                "Sound installations",
                "Music production",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#b2a2cb] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
