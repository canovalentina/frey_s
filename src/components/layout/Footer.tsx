import Link from "next/link";
import { Instagram, Youtube, Music } from "lucide-react";

const footerLinks = {
  work: [
    { href: "/music", label: "Music" },
    { href: "/music/licensing", label: "License Music" },
    { href: "/film", label: "Film & Media" },
  ],
  info: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

const socialLinks = [
  {
    href: "https://www.instagram.com/_frey_s_/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU",
    label: "Spotify",
    icon: Music,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e2e0dd] bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-[#0a0a0a]"
            >
              frey_s
            </Link>
            <p className="mt-3 text-sm text-[#6b6b6b] font-display max-w-xs">
              Composer & Sound Artist
              <br />
              Barcelona, Spain
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Work */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] mb-4">
              Work
            </h3>
            <ul className="space-y-2">
              {footerLinks.work.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-display text-sm text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] mb-4">
              Info
            </h3>
            <ul className="space-y-2">
              {footerLinks.info.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-display text-sm text-[#0a0a0a] hover:text-[#b2a2cb] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] mb-4">
              Hire
            </h3>
            <p className="font-display text-sm text-[#6b6b6b] mb-4">
              Available for film, media, and licensing projects.
            </p>
            <Link
              href="/contact"
              className="font-display text-sm font-medium inline-block px-4 py-2 border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f7f5f2] transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#e2e0dd] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-display text-xs text-[#6b6b6b]">
            © {new Date().getFullYear()} Federico Reyes. All rights reserved.
          </p>
          <p className="font-display text-xs text-[#6b6b6b]">
            <a
              href="mailto:federicoreyes94@gmail.com"
              className="hover:text-[#b2a2cb] transition-colors"
            >
              federicoreyes94@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
