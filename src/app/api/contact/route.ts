import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, projectType, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  // TODO: persist to DB and send email via Resend (Phase 4)
  // await prisma.inquiry.create({ data: { name, email, projectType, message } });
  // await resend.emails.send({ ... });

  console.log("New inquiry:", { name, email, projectType, message });

  return NextResponse.json({ success: true });
}
