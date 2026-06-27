import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";

beforeEach(() => {
  vi.restoreAllMocks();
});

function makeRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Contact API - Validation", () => {
  it("returns 400 for missing body fields", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("returns 400 for empty name", async () => {
    const res = await POST(
      makeRequest({ name: "", email: "test@test.com", message: "Hello world this is a test message" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(
      makeRequest({ name: "John", email: "not-an-email", message: "Hello world this is a test message" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for too short message", async () => {
    const res = await POST(
      makeRequest({ name: "John", email: "test@test.com", message: "Hi" })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for empty request body", async () => {
    const res = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      })
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid input (no Resend key configured)", async () => {
    const res = await POST(
      makeRequest({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I'd like to discuss a project opportunity with you.",
      })
    );
    expect(res.status).toBe(200);
  });

  it("returns 500 on unexpected error", async () => {
    vi.spyOn(global.JSON, "parse").mockImplementationOnce(() => {
      throw new Error("Unexpected");
    });

    const res = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "null",
      })
    );
    expect(res.status).toBe(500);
  });
});
