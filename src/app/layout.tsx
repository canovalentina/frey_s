import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "frey_s — Composer & Sound Artist",
    description:
      "Venezuelan composer and sound artist based in Barcelona. Film, media, and licensing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "frey_s — Composer & Sound Artist",
    description:
      "Venezuelan composer and sound artist based in Barcelona. Film, media, and licensing.",
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
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
