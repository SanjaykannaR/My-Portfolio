import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY or CONTACT_EMAIL in .env.local" },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: toEmail,
    subject: "Test email from your portfolio",
    text: "If you receive this, your contact form is fully working.",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data?.id, to: toEmail });
}
