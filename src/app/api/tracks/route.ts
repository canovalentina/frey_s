import { NextRequest, NextResponse } from "next/server";
import { DEMO_TRACKS } from "@/lib/tracks";

// When DATABASE_URL is configured, this will query Prisma.
// For now it falls back to the static demo tracks.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get("mood");
  const genre = searchParams.get("genre");
  const q = searchParams.get("q")?.toLowerCase();
  const sort = searchParams.get("sort") ?? "newest";

  let tracks = [...DEMO_TRACKS];

  // TODO: swap for Prisma query once DATABASE_URL is set
  // const tracks = await prisma.track.findMany({
  //   where: {
  //     published: true,
  //     ...(mood ? { moods: { some: { mood: { name: mood } } } } : {}),
  //     ...(genre ? { genres: { some: { genre: { name: genre } } } } : {}),
  //   },
  //   include: { moods: { include: { mood: true } }, genres: { include: { genre: true } }, licenses: true },
  //   orderBy: sort === "newest" ? { createdAt: "desc" } : undefined,
  // });

  if (q) {
    tracks = tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.moods.some((m) => m.includes(q)) ||
        t.genres.some((g) => g.includes(q))
    );
  }
  if (mood) tracks = tracks.filter((t) => t.moods.includes(mood));
  if (genre) tracks = tracks.filter((t) => t.genres.includes(genre));

  if (sort === "price-asc") {
    tracks.sort((a, b) => (a.licenses[0]?.price ?? 0) - (b.licenses[0]?.price ?? 0));
  } else if (sort === "price-desc") {
    tracks.sort((a, b) => (b.licenses[0]?.price ?? 0) - (a.licenses[0]?.price ?? 0));
  }

  return NextResponse.json({ tracks });
}
