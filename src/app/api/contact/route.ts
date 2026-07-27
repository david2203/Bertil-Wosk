import { NextResponse } from "next/server";

// Stub endpoint. Wire to Resend (or similar) before launch — see AGENTS.md §12.
// Add spam protection (honeypot / rate limit) at that point.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Ogiltiga fält" }, { status: 400 });
  }

  // TODO: send email via Resend using RESEND_API_KEY -> CONTACT_TO_EMAIL.
  console.info("Contact submission:", body);

  return NextResponse.json({ ok: true });
}
