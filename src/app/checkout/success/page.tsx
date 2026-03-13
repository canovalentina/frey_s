import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Mail, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Purchase Complete",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <CheckCircle size={48} className="text-[#b2a2cb] mx-auto mb-6" />

        <h1 className="font-display text-4xl font-bold text-[#0a0a0a] mb-4">
          Purchase complete
        </h1>
        <p className="font-serif text-lg text-[#6b6b6b] mb-10 leading-relaxed">
          Thank you! Your license files are on their way — check your inbox for
          a download link. The link is valid for 7 days.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="border border-[#e2e0dd] p-5 text-left">
            <Mail size={18} className="text-[#b2a2cb] mb-3" />
            <p className="font-display text-sm font-semibold text-[#0a0a0a] mb-1">
              Check your email
            </p>
            <p className="font-serif text-xs text-[#6b6b6b]">
              Your download link and license agreement have been sent.
            </p>
          </div>
          <div className="border border-[#e2e0dd] p-5 text-left">
            <Download size={18} className="text-[#b2a2cb] mb-3" />
            <p className="font-display text-sm font-semibold text-[#0a0a0a] mb-1">
              Secure download
            </p>
            <p className="font-serif text-xs text-[#6b6b6b]">
              Your link expires in 7 days and allows up to 3 downloads.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/music/licensing"
            className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 border border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f7f5f2] transition-colors"
          >
            Browse more tracks
          </Link>
          <Link
            href="/contact"
            className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors"
          >
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
