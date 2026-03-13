import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12">
      <p
        className="font-bold leading-none text-[#E5E5E5] select-none mb-8"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(6rem, 20vw, 16rem)" }}
      >
        404
      </p>
      <p className="text-base font-medium text-[#0A0A0A] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
        Page not found
      </p>
      <p className="text-sm text-[#999999] mb-10 max-w-sm" style={{ fontFamily: "Inter, sans-serif" }}>
        This page doesn&apos;t exist. Maybe you were looking for a track?
      </p>
      <div className="flex gap-8">
        <Link
          href="/"
          className="text-[13px] text-[#0A0A0A] hover:text-[#FF2200] border-b border-[#0A0A0A] hover:border-[#FF2200] pb-px"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Go home →
        </Link>
        <Link
          href="/music/licensing"
          className="text-[13px] text-[#999999] hover:text-[#0A0A0A]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Browse catalog
        </Link>
      </div>
    </div>
  );
}
