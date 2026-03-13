import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[8rem] md:text-[12rem] font-bold leading-none text-[#d8d2ca] select-none">
        404
      </p>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-[#111111] -mt-4 mb-4">
        Page not found
      </h1>
      <p className="font-serif text-lg text-[#8a847c] mb-10 max-w-sm">
        This page doesn&apos;t exist. Maybe you were looking for a track?
      </p>
      <div className="flex flex-wrap gap-6 justify-center">
        <Link
          href="/"
          className="font-display text-sm text-[#111111] hover:text-[#c8432a] border-b border-[#111111] hover:border-[#c8432a] transition-colors pb-px inline-flex items-center gap-1"
        >
          Go home <ArrowRight size={12} />
        </Link>
        <Link
          href="/music/licensing"
          className="font-display text-sm text-[#8a847c] hover:text-[#111111] transition-colors"
        >
          Browse catalog
        </Link>
      </div>
    </div>
  );
}
