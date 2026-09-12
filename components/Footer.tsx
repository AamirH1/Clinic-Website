import { brand, navLinks, treatments } from "@/lib/data";
import { stockPhotos } from "@/lib/stockPhotos";

export default function Footer() {
  const year = new Date().getFullYear();
  const credits = Object.values(stockPhotos);

  return (
    <footer className="border-t border-charcoal/10 bg-ivory2/60 pt-16 pb-8">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl text-charcoal">{brand.shortName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/60">
              Exceptional dentistry, beautifully personal.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-charcoal/50">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-charcoal/70 hover:text-charcoal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-charcoal/50">Treatments</p>
            <ul className="mt-4 space-y-2">
              {treatments.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-sm text-charcoal/70 hover:text-charcoal">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-charcoal/50">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
              <li>{brand.address.line1}</li>
              <li>{brand.address.city}</li>
              <li>
                <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="hover:text-charcoal">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-charcoal">
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/10 pt-6 text-xs text-charcoal/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-charcoal">Privacy Policy</a>
            <a href="/terms" className="hover:text-charcoal">Terms</a>
            <a href="/accessibility" className="hover:text-charcoal">Accessibility</a>
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-charcoal/40">
          Placeholder photography via Unsplash:{" "}
          {credits.map((c, i) => (
            <span key={c.creditUrl}>
              <a href={c.creditUrl} target="_blank" rel="noreferrer" className="hover:text-charcoal">
                {c.credit}
              </a>
              {i < credits.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
