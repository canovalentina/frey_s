import type { Metadata } from "next";
import Link from "next/link";
import { Download, AlertTriangle, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Download",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function DownloadPage({ params }: Props) {
  const { token } = await params;

  // TODO: look up purchase by token in DB
  // const purchase = await prisma.purchase.findUnique({
  //   where: { downloadToken: token },
  //   include: { track: true, license: true },
  // });
  //
  // if (!purchase || purchase.status !== "completed") return <Invalid />;
  // if (purchase.downloadExpiry && purchase.downloadExpiry < new Date()) return <Expired />;
  // if (purchase.downloadCount >= 3) return <LimitReached />;
  //
  // // Increment download count
  // await prisma.purchase.update({
  //   where: { id: purchase.id },
  //   data: { downloadCount: { increment: 1 } },
  // });
  //
  // // Get signed R2 URL for actual file
  // const fileUrl = await getSignedR2Url(purchase.track.fullMp3Url);

  // Temporary: show the download UI with a placeholder
  const isValidToken = token.length === 64; // real tokens are 32 bytes → 64 hex chars

  if (!isValidToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <AlertTriangle size={40} className="text-[#b2a2cb] mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-[#0a0a0a] mb-3">
            Invalid link
          </h1>
          <p className="font-serif text-[#6b6b6b] mb-6">
            This download link is invalid or has expired. Check your email for
            the original link, or contact support.
          </p>
          <Link
            href="/contact"
            className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-block"
          >
            Contact support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="border border-[#e2e0dd] p-10 text-center">
          <Music size={32} className="text-[#b2a2cb] mx-auto mb-4" />
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-2">
            License Download
          </p>
          <h1 className="font-display text-2xl font-bold text-[#0a0a0a] mb-6">
            Your files are ready
          </h1>

          {/* File list — populated from DB purchase record */}
          <div className="space-y-3 mb-8 text-left">
            {[
              { label: "MP3 320kbps", ext: "mp3", note: "All licenses" },
              { label: "WAV 24-bit", ext: "wav", note: "Standard and above" },
              { label: "Stems (ZIP)", ext: "zip", note: "Professional only" },
            ].map((file) => (
              <div
                key={file.ext}
                className="flex items-center justify-between border border-[#e2e0dd] px-4 py-3"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-[#0a0a0a]">
                    {file.label}
                  </p>
                  <p className="font-display text-[10px] text-[#6b6b6b]">
                    {file.note}
                  </p>
                </div>
                {/* TODO: href={signedFileUrl} */}
                <button
                  disabled
                  className="font-display text-xs uppercase tracking-widest px-3 py-1.5 bg-[#0a0a0a] text-[#f7f5f2] opacity-40 cursor-not-allowed inline-flex items-center gap-1"
                  title="Connect database to enable downloads"
                >
                  <Download size={10} /> .{file.ext}
                </button>
              </div>
            ))}
          </div>

          <p className="font-display text-xs text-[#6b6b6b]">
            Database connection required to serve files.
            <br />
            Add <code className="bg-[#e2e0dd] px-1">DATABASE_URL</code> to{" "}
            <code className="bg-[#e2e0dd] px-1">.env</code> to activate.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/music/licensing"
            className="font-display text-xs text-[#6b6b6b] hover:text-[#b2a2cb] transition-colors"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
