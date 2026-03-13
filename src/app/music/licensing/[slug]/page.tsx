import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_TRACKS } from "@/lib/tracks";
import TrackDetailClient from "./TrackDetailClient";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMO_TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = DEMO_TRACKS.find((t) => t.slug === slug);
  if (!track) return {};

  const title = encodeURIComponent(track.title);
  const sub = encodeURIComponent(
    `${track.moods.join(", ")} · ${track.genres.join(", ")} · frey_s`
  );
  const tag = encodeURIComponent("License");
  const ogImage = `/api/og?title=${title}&sub=${sub}&tag=${tag}`;

  return {
    title: `${track.title} — License`,
    description: `License "${track.title}" by frey_s. ${track.moods.join(", ")} — ${track.genres.join(", ")}. Available for film, TV, and commercial use.`,
    openGraph: {
      title: `${track.title} — License | frey_s`,
      description: `${track.moods.join(", ")} · ${track.genres.join(", ")}. From $${Math.min(...track.licenses.map((l) => l.price))}.`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function TrackDetailPage({ params }: Props) {
  const { slug } = await params;
  const track = DEMO_TRACKS.find((t) => t.slug === slug);
  if (!track) notFound();

  const related = DEMO_TRACKS.filter(
    (t) =>
      t.id !== track.id &&
      (t.genres.some((g) => track.genres.includes(g)) ||
        t.moods.some((m) => track.moods.includes(m)))
  ).slice(0, 3);

  const musicSchema = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    name: track.title,
    composer: {
      "@type": "Person",
      name: "Federico Reyes",
      alternateName: "frey_s",
    },
    genre: track.genres,
    offers: track.licenses.map((l) => ({
      "@type": "Offer",
      name: `${l.type.charAt(0).toUpperCase() + l.type.slice(1)} License`,
      price: l.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <JsonLd data={musicSchema} />
      <TrackDetailClient track={track} related={related} />
    </>
  );
}
