import { sendInquiryNotification } from "@/lib/inquiry-email";
import { getDatabase } from "@/lib/mongodb";

const allowedServices = new Set([
  "Coworking day pass",
  "Flexible desk membership",
  "Dedicated desk",
  "Private office",
  "Meeting room",
  "Virtual office",
  "Not sure yet",
]);

const maxRequestSize = 16_000;

type Inquiry = {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  teamSize: string;
  message: string;
};

function errorResponse(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > maxRequestSize) {
    return errorResponse("Your request is too large.", 413);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return errorResponse("Send your request as JSON.", 415);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > maxRequestSize) {
      return errorResponse("Your request is too large.", 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("We could not read your request.", 400);
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return errorResponse("Please check your request and try again.", 400);
  }

  const fields = body as Record<string, unknown>;
  if (typeof fields.companyWebsite === "string" && fields.companyWebsite.trim()) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const inquiry: Inquiry = {
    name: typeof fields.name === "string" ? fields.name.trim() : "",
    email: typeof fields.email === "string" ? fields.email.trim() : "",
    phone: typeof fields.phone === "string" ? fields.phone.trim() : "",
    city: typeof fields.city === "string" ? fields.city.trim() : "",
    service: typeof fields.service === "string" ? fields.service.trim() : "",
    teamSize: typeof fields.teamSize === "string" ? fields.teamSize.trim() : "",
    message: typeof fields.message === "string" ? fields.message.trim() : "",
  };

  if (
    !inquiry.name ||
    inquiry.name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) ||
    inquiry.email.length > 254 ||
    !inquiry.phone ||
    inquiry.phone.length > 40 ||
    !inquiry.city ||
    inquiry.city.length > 100 ||
    !allowedServices.has(inquiry.service) ||
    !inquiry.teamSize ||
    inquiry.teamSize.length > 40 ||
    inquiry.message.length > 2_000
  ) {
    return errorResponse("Please check the required fields and try again.", 400);
  }

  try {
    const database = await getDatabase();
    await database.collection("inquiries").insertOne({
      ...inquiry,
      submittedAt: new Date(),
    });

    try {
      await sendInquiryNotification(inquiry);
    } catch (error) {
      console.error("Inquiry was saved, but its email notification failed.", error);
      return errorResponse(
        "Your inquiry was saved, but we couldn't notify our team. Please contact us directly.",
        502,
      );
    }

    return Response.json(
      { ok: true, message: "Your request has been sent. Our team will follow up." },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to save workspace inquiry.", error);
    return errorResponse(
      "We could not save your request. Please try again later.",
      503,
    );
  }
}