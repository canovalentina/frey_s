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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
        <div className="px-6 md:px-12 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-sans text-sm font-medium text-[#0A0A0A] hover:text-[#FF2200]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            frey_s
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-[13px] text-[#0A0A0A] hover:text-[#FF2200]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute -bottom-[14px] left-0 w-full h-[2px] bg-[#FF2200]" />
                )}
              </Link>
            ))}
            <Link
              href="/music/licensing"
              className={`text-[13px] border-b pb-px hover:text-[#FF2200] hover:border-[#FF2200] ${
                pathname.startsWith("/music/licensing")
                  ? "text-[#FF2200] border-[#FF2200]"
                  : "text-[#0A0A0A] border-[#0A0A0A]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              License music
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[13px] text-[#0A0A0A] hover:text-[#FF2200]"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "close ×" : "menu"}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col px-6 pt-20 pb-12 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={`flex items-baseline gap-4 text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-tight hover:text-[#FF2200] ${
                  isActive(href) ? "text-[#FF2200]" : "text-[#0A0A0A]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="text-[11px] font-normal text-[#999999]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                  0{i + 1}
                </span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link
              href="/music/licensing"
              className="text-[13px] text-[#999999] hover:text-[#FF2200] border-b border-[#E5E5E5] pb-px"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              License music →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
