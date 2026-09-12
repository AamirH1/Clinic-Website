import { NextRequest, NextResponse } from "next/server";
import { saveBooking } from "@/lib/bookingStore";

type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  message?: string;
};

const NAME_RE = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, treatment, preferredDate, message } = body;

  if (!name || !email || !phone || !treatment || !preferredDate) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!NAME_RE.test(name.trim())) {
    return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone.trim()) || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  const date = new Date(preferredDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(date.getTime()) || date < today) {
    return NextResponse.json({ error: "Please choose today or a future date." }, { status: 400 });
  }

  // TODO: also wire this up to a real notification path, e.g.:
  //   - send an email via Resend/Postmark/SendGrid
  //   - forward to a CRM (e.g. Zapier webhook, HubSpot, Cliniko)
  // Requests are persisted via lib/bookingStore.ts (see /admin/bookings) and
  // logged server-side so nothing is silently dropped — but see that file's
  // notes on why this storage isn't sufficient for production on Vercel.
  const saved = await saveBooking({ name, email, phone, treatment, preferredDate, message });
  console.log("[booking request]", saved);

  return NextResponse.json({ ok: true });
}
