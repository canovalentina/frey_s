"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/music", label: "Music" },
  { href: "/film", label: "Film & Media" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#f7f5f2]/95 backdrop-blur-sm border-b border-[#e2e0dd]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-[#0a0a0a] hover:text-[#b2a2cb]"
          >
            frey_s
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-display text-sm font-medium tracking-wide uppercase transition-colors ${
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-[#b2a2cb]"
                    : "text-[#0a0a0a] hover:text-[#b2a2cb]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/music/licensing"
              className="font-display text-sm font-medium px-4 py-2 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors"
            >
              License Music
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#0a0a0a] hover:text-[#b2a2cb]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f7f5f2] flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-3xl font-bold tracking-tight transition-colors ${
                pathname === href
                  ? "text-[#b2a2cb]"
                  : "text-[#0a0a0a] hover:text-[#b2a2cb]"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/music/licensing"
            className="font-display text-sm font-medium px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors mt-4"
          >
            License Music
          </Link>
        </div>
      )}
    </>
  );
}
