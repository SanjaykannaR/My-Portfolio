import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    data.name.trim().length >= 1 &&
    data.name.length <= 100 &&
    typeof data.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) &&
    typeof data.message === "string" &&
    data.message.trim().length >= 1 &&
    data.message.length <= 5000
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        { error: "Invalid input. Name, valid email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        {
          error: "not_configured",
          message: "Email service not configured yet.",
          email: toEmail || "hello@example.com",
        },
        { status: 501 }
      );
    }

    const { name, email, message } = body;
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Email delivery failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    const message = err instanceof Error ? err.message : "Failed to send message";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
