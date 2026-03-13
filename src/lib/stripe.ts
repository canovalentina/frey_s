import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Allow build to succeed without key; runtime calls will fail until set.
  console.warn("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
});
