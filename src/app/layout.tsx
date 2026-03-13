import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlayerPadding from "@/components/layout/PlayerPadding";
import { AudioProvider } from "@/lib/audioContext";
import GlobalAudioPlayer from "@/components/audio/GlobalAudioPlayer";

const siteUrl = process.env.NEXTAUTH_URL ?? "https://freyes.com";
const ogImage = `${siteUrl}/api/og?title=frey_s&sub=Composer+%26+Sound+Artist+%E2%80%94+Barcelona`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "frey_s — Composer & Sound Artist",
    template: "%s | frey_s",
  },
  description:
    "Federico Reyes (frey_s) is a Venezuelan composer and sound artist based in Barcelona. Available for film, media, and licensing.",
  keywords: [
    "composer",
    "sound artist",
    "music licensing",
    "film music",
    "ambient",
    "electronic",
    "piano",
    "Barcelona",
    "Venezuelan",
    "Federico Reyes",
  ],
  openGraph: {
    title: "frey_s — Composer & Sound Artist",
    description:
      "Venezuelan composer and sound artist based in Barcelona. Film, media, and licensing.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "frey_s",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "frey_s" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "frey_s — Composer & Sound Artist",
    description:
      "Venezuelan composer and sound artist based in Barcelona. Film, media, and licensing.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <AudioProvider>
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <PlayerPadding />
          <Footer />
          <GlobalAudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
