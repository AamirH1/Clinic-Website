import { listBookings } from "@/lib/bookingStore";

export const metadata = { title: "Bookings (Admin)", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Simple shared-secret gate: set ADMIN_TOKEN in your environment (.env.local
// for development, Vercel Project Settings → Environment Variables for
// production) and visit /admin/bookings?token=<that value>. This is
// intentionally minimal — for a real deployment, put this behind proper
// authentication instead.
export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-charcoal lg:px-10">
        <h1 className="font-serif text-2xl">Admin access not configured</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          Set an <code>ADMIN_TOKEN</code> environment variable (locally in{" "}
          <code>.env.local</code>, or in Vercel Project Settings → Environment Variables) then
          reload this page with <code>?token=&lt;that value&gt;</code>.
        </p>
      </main>
    );
  }

  if (token !== expected) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-charcoal lg:px-10">
        <h1 className="font-serif text-2xl">Access denied</h1>
        <p className="mt-4 text-sm text-charcoal/70">Add the correct <code>?token=</code> query parameter.</p>
      </main>
    );
  }

  const bookings = await listBookings();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
      <h1 className="font-serif text-3xl text-charcoal">Appointment Requests</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        {bookings.length} request{bookings.length === 1 ? "" : "s"}. Stored in a local file — see
        the note in <code>lib/bookingStore.ts</code> about production persistence on Vercel.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-charcoal/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ivory2/70 text-xs uppercase tracking-wide text-charcoal/50">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Preferred Date</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-charcoal/50">
                  No booking requests yet.
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-charcoal/10 align-top">
                <td className="whitespace-nowrap px-4 py-3 text-charcoal/60">
                  {new Date(b.receivedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-charcoal">{b.name}</td>
                <td className="px-4 py-3 text-charcoal/70">
                  <div>{b.phone}</div>
                  <div>{b.email}</div>
                </td>
                <td className="px-4 py-3 text-charcoal">{b.treatment}</td>
                <td className="px-4 py-3 text-charcoal/70">{b.preferredDate}</td>
                <td className="px-4 py-3 text-charcoal/60">{b.message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
