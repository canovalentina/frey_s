import Link from "next/link";

const links = {
  work: [
    { href: "/music", label: "Music" },
    { href: "/film", label: "Film" },
    { href: "/music/licensing", label: "License music" },
  ],
  info: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

const social = [
  { href: "https://www.instagram.com/_frey_s_/", label: "Instagram" },
  { href: "https://open.spotify.com/artist/2RhlkxQdR60M2zirFpmuTU", label: "Spotify" },
  { href: "https://freysss.bandcamp.com/", label: "Bandcamp" },
  { href: "https://www.youtube.com/channel/UCtoKbFukV0VzuYA02DNzF5A", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#d8d2ca]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-xl font-bold text-[#111111] hover:text-[#c8432a] transition-colors">
              frey_s
            </Link>
            <p className="font-display text-sm text-[#8a847c] mt-3 leading-relaxed">
              Barcelona, Spain
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="font-display text-xs text-[#8a847c] mb-4">Work</p>
            <ul className="space-y-2">
              {links.work.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-display text-sm text-[#111111] hover:text-[#c8432a] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-display text-xs text-[#8a847c] mb-4">Info</p>
            <ul className="space-y-2">
              {links.info.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="font-display text-sm text-[#111111] hover:text-[#c8432a] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-display text-xs text-[#8a847c] mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {social.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-sm text-[#111111] hover:text-[#c8432a] transition-colors"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d8d2ca] pt-8 flex flex-col md:flex-row justify-between gap-3">
          <p className="font-display text-xs text-[#8a847c]">
            © 2024 Federico Reyes
          </p>
          <a
            href="mailto:federicoreyes94@gmail.com"
            className="font-display text-xs text-[#8a847c] hover:text-[#c8432a] transition-colors"
          >
            federicoreyes94@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
