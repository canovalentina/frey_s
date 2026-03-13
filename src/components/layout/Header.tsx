"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/music", label: "Music" },
  { href: "/film", label: "Film" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#f0ebe3]/92 backdrop-blur-sm border-b border-[#d8d2ca]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-base font-bold tracking-tight text-[#111111] hover:text-[#c8432a] transition-colors"
          >
            frey_s
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-display text-sm transition-colors relative ${
                  isActive(href)
                    ? "text-[#c8432a]"
                    : "text-[#111111] hover:text-[#c8432a]"
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#c8432a]" />
                )}
              </Link>
            ))}
            {/* Licensing link — slightly differentiated, not a button */}
            <Link
              href="/music/licensing"
              className={`font-display text-sm border-b border-[#111111] pb-px hover:border-[#c8432a] hover:text-[#c8432a] transition-colors ${
                pathname.startsWith("/music/licensing") ? "text-[#c8432a] border-[#c8432a]" : "text-[#111111]"
              }`}
            >
              License music
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden font-display text-sm text-[#111111] hover:text-[#c8432a] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f0ebe3] flex flex-col px-8 pt-24 pb-12 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={`font-display text-[clamp(2.5rem,10vw,4rem)] font-bold leading-tight transition-colors ${
                  isActive(href) ? "text-[#c8432a]" : "text-[#111111]"
                }`}
              >
                <span className="text-[#c8432a] text-base font-normal mr-3 align-middle">
                  0{i + 1}
                </span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link
              href="/music/licensing"
              className="font-display text-sm text-[#8a847c] hover:text-[#c8432a] transition-colors border-b border-[#d8d2ca] pb-px"
            >
              License music →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
