import Link from "next/link";
import { ReactNode } from "react";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
      <Link href="/" className="text-sm text-charcoal/60 hover:text-charcoal">
        ← Back home
      </Link>
      <h1 className="mt-6 font-serif text-4xl text-charcoal">{title}</h1>
      <div className="prose prose-neutral mt-8 max-w-none text-charcoal/80">{children}</div>
    </main>
  );
}
