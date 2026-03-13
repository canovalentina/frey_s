import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[8rem] md:text-[12rem] font-bold leading-none text-[#e2e0dd] select-none">
        404
      </p>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0a0a0a] -mt-4 mb-4">
        Page not found
      </h1>
      <p className="font-serif text-lg text-[#6b6b6b] mb-10 max-w-sm">
        This page doesn&apos;t exist. Maybe you were looking for a track?
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-2"
        >
          Go home <ArrowRight size={14} />
        </Link>
        <Link
          href="/music/licensing"
          className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 border border-[#e2e0dd] text-[#6b6b6b] hover:border-[#b2a2cb] hover:text-[#b2a2cb] transition-colors"
        >
          Browse catalog
        </Link>
      </div>
    </div>
  );
}
