import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Purchase Complete",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <p className="text-[10px] text-[#999999] mb-8" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          checkout complete
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
          Purchase complete
        </h1>
        <p className="text-sm text-[#999999] mb-12 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          Thank you. Your license files are on their way — check your inbox for
          a download link. The link is valid for 7 days.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="border border-[#E5E5E5] p-5">
            <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>01 — check email</p>
            <p className="text-sm text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Your download link and license agreement have been sent.
            </p>
          </div>
          <div className="border border-[#E5E5E5] p-5">
            <p className="text-[10px] text-[#999999] mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>02 — secure download</p>
            <p className="text-sm text-[#0A0A0A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Your link expires in 7 days and allows up to 3 downloads.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="/music/licensing"
            className="text-sm font-medium px-6 py-3 bg-[#0A0A0A] text-white hover:bg-[#FF2200] text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Browse more tracks
          </Link>
          <Link
            href="/contact"
            className="text-sm text-[#999999] hover:text-[#0A0A0A] self-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
