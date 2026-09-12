"use client";

import { useState } from "react";
import { galleryCategories } from "@/lib/data";
import BeforeAfterSlider from "./ui/BeforeAfterSlider";
import RevealText from "./ui/RevealText";

const items = [
  { label: "Veneers · Full smile refresh", category: "Veneers" },
  { label: "Invisalign · 9 month case", category: "Invisalign" },
  { label: "Whitening · Two shade lift", category: "Whitening" },
  { label: "Implants · Single tooth restoration", category: "Implants" }
]; // [PLACEHOLDER] descriptions — replace with real, consented case studies

export default function SmileGallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-4 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Smile Gallery</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
            Real results, honestly presented
          </h2>
        </RevealText>
        <p className="mb-10 max-w-lg text-sm text-charcoal/60">
          Drag the slider to compare. Gallery imagery shown here is placeholder art —
          replace with real, patient‑consented before/after photography.
        </p>

        <div className="mb-10 flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                active === cat
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <RevealText key={item.label} delay={i * 0.06}>
              <BeforeAfterSlider label={item.label} />
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
