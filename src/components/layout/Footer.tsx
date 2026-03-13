import Link from "next/link";

const navLinks = [
  { href: "/music", label: "Music" },
  { href: "/film", label: "Film" },
  { href: "/music/licensing", label: "License music" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const social = [
  { href: "https://www.instagram.com/_frey_s_/", label: "Instagram" },
  { href: "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU", label: "Spotify" },
  { href: "https://freysss.bandcamp.com/", label: "Bandcamp" },
  { href: "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5]">
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 justify-between">
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            © 2024
          </span>
          <Link href="/" className="text-[13px] font-medium text-[#0A0A0A] hover:text-[#FF2200]" style={{ fontFamily: "Inter, sans-serif" }}>
            frey_s
          </Link>
          <span className="text-[10px] text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            Barcelona
          </span>
        </div>

        <nav className="flex flex-wrap gap-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-[13px] text-[#999999] hover:text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-4">
          {social.map(({ href, label }) => (
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
    </footer>
  );
}
