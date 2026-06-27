import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    data.name.length >= 1 &&
    data.name.length <= 100 &&
    typeof data.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.message === "string" &&
    data.message.length >= 10 &&
    data.message.length <= 5000
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        { error: "Invalid input. Name, valid email, and message (10-5000 chars) are required." },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY not configured — skipping email send");
      return NextResponse.json(
        { message: "Message received (email not configured)" },
        { status: 200 }
      );
    }

    const { name, email, message } = body;

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@example.com",
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
