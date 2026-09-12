import { promises as fs } from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// BOOKING STORAGE — READ THIS BEFORE RELYING ON IT IN PRODUCTION
// ---------------------------------------------------------------------------
// This writes booking requests to a JSON file on disk. That works reliably
// when you run `next dev` / `next start` on a normal server or your own
// machine, where the filesystem is persistent.
//
// It will NOT reliably work once deployed to Vercel: serverless functions
// there run on an ephemeral, read-only filesystem outside of /tmp, and /tmp
// itself is wiped between cold starts and is not shared across instances or
// regions. Bookings written this way on Vercel can silently disappear.
//
// For real production use on Vercel, replace this with a managed store —
// e.g. Vercel Postgres, Vercel KV, Supabase, or forwarding each submission
// to email/CRM (see the TODO in app/api/booking/route.ts). This file store
// exists so you have a working, inspectable admin view (/admin/bookings)
// out of the box during development and on non-serverless hosts.
// ---------------------------------------------------------------------------

export type BookingRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  message?: string;
  receivedAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

async function readAll(): Promise<BookingRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as BookingRecord[];
  } catch {
    return [];
  }
}

export async function saveBooking(record: Omit<BookingRecord, "id" | "receivedAt">) {
  const all = await readAll();
  const entry: BookingRecord = {
    ...record,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString()
  };
  all.unshift(entry);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return entry;
}

export async function listBookings(): Promise<BookingRecord[]> {
  return readAll();
}
