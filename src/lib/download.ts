import crypto from "crypto";

/** Generate a cryptographically secure download token */
export function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/** Build the secure download URL */
export function buildDownloadUrl(token: string): string {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return `${base}/download/${token}`;
}

/** Expiry: 7 days from now */
export function downloadExpiry(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}
