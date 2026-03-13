import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { DEMO_TRACKS } from "@/lib/tracks";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { trackId, licenseType, buyerEmail } = body as {
    trackId: string;
    licenseType: "personal" | "standard" | "professional" | "exclusive";
    buyerEmail?: string;
  };

  if (!trackId || !licenseType) {
    return NextResponse.json(
      { error: "trackId and licenseType are required" },
      { status: 400 }
    );
  }

  // Resolve track + license — swap for Prisma query once DB is connected
  const track = DEMO_TRACKS.find((t) => t.id === trackId);
  const license = track?.licenses.find((l) => l.type === licenseType);

  if (!track || !license) {
    return NextResponse.json({ error: "Track or license not found" }, { status: 404 });
  }

  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: license.price * 100, // cents
          product_data: {
            name: `${track.title} — ${licenseType.charAt(0).toUpperCase() + licenseType.slice(1)} License`,
            description: `${track.genres.join(", ")} · frey_s`,
            images: track.coverUrl ? [track.coverUrl] : [],
            metadata: {
              track_id: track.id,
              track_slug: track.slug,
              license_type: licenseType,
            },
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      track_id: track.id,
      track_slug: track.slug,
      license_type: licenseType,
    },
    success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/music/licensing/${track.slug}`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
