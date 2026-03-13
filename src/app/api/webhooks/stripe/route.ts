import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { generateDownloadToken, buildDownloadUrl, downloadExpiry } from "@/lib/download";
import { sendLicenseEmail } from "@/lib/email";
import { DEMO_TRACKS } from "@/lib/tracks";
import type Stripe from "stripe";

// Stripe requires the raw body for signature verification — disable body parsing
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { track_id, track_slug, license_type } = session.metadata ?? {};
  const buyerEmail = session.customer_details?.email ?? session.customer_email;
  const buyerName = session.customer_details?.name ?? "Customer";

  if (!track_id || !license_type || !buyerEmail) {
    console.error("Webhook: missing metadata", session.id);
    return;
  }

  const track = DEMO_TRACKS.find((t) => t.id === track_id);
  if (!track) {
    console.error("Webhook: track not found", track_id);
    return;
  }

  // Generate secure download token
  const token = generateDownloadToken();
  const expiry = downloadExpiry();
  const downloadUrl = buildDownloadUrl(token);

  // TODO: persist purchase + token to DB
  // await prisma.purchase.create({
  //   data: {
  //     trackId: track_id,
  //     licenseId: ...,
  //     buyerEmail,
  //     buyerName,
  //     stripeSessionId: session.id,
  //     stripePaymentIntentId: session.payment_intent as string,
  //     status: "completed",
  //     downloadToken: token,
  //     downloadExpiry: expiry,
  //   },
  // });

  // Send license delivery email
  try {
    await sendLicenseEmail({
      to: buyerEmail,
      buyerName,
      trackTitle: track.title,
      licenseType: license_type.charAt(0).toUpperCase() + license_type.slice(1),
      downloadUrl,
      downloadExpiry: expiry,
    });
    console.log(`License email sent to ${buyerEmail} for "${track.title}"`);
  } catch (err) {
    console.error("Failed to send license email:", err);
  }

  // Log for now — in production this is stored in DB
  console.log(`Purchase complete: ${track.title} (${license_type}) → ${buyerEmail}`);
  console.log(`Download token: ${token} (expires ${expiry.toISOString()})`);
  void track_slug;
}
