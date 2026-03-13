import { NextRequest, NextResponse } from "next/server";
import { DEMO_TRACKS } from "@/lib/tracks";

function isAuthorized(request: NextRequest) {
  const auth = request.headers.get("x-admin-key");
  return auth === process.env.ADMIN_PASSWORD;
}

// GET /api/admin/tracks — list all tracks (published + drafts)
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: swap for Prisma once DB is connected
  // const tracks = await prisma.track.findMany({
  //   include: { moods: true, genres: true, licenses: true, _count: { select: { purchases: true } } },
  //   orderBy: { createdAt: "desc" },
  // });

  return NextResponse.json({ tracks: DEMO_TRACKS });
}

// POST /api/admin/tracks — create a new track
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // TODO: create in Prisma
  // const track = await prisma.track.create({ data: { ...body } });

  console.log("Track create (DB not connected):", body);
  return NextResponse.json({ success: true, id: "demo-" + Date.now() }, { status: 201 });
}
