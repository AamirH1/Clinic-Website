"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { treatments } from "@/lib/data";
import Photo from "./ui/Photo";
import RevealText from "./ui/RevealText";
import { stockPhotos } from "@/lib/stockPhotos";

const photoCycle = [stockPhotos.clinicInterior, stockPhotos.consultation, stockPhotos.digitalScan, stockPhotos.scanReview];

export default function Treatments() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="treatments" className="py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-14 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Treatments</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
            Care built for every stage of your smile
          </h2>
        </RevealText>

        <div className="grid gap-x-16 lg:grid-cols-[1.1fr_0.9fr]">
          <ul className="border-t border-charcoal/10">
            {treatments.map((t, i) => (
              <li
                key={t.id}
                onMouseEnter={() => setHovered(i)}
                className="group relative border-b border-charcoal/10"
              >
                <a href={`#${t.id}`} className="flex items-center gap-6 py-7">
                  <span className="font-mono text-sm text-charcoal/40">{t.number}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-2xl text-charcoal transition-transform duration-500 ease-out-expo group-hover:translate-x-2 lg:text-3xl">
                      {t.name}
                    </span>
                    <span className="mt-1 block max-w-md text-sm text-charcoal/60 lg:hidden">
                      {t.description}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-500 ease-out-expo group-hover:-rotate-45 group-hover:border-charcoal lg:flex"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative hidden lg:block">
            <div className="sticky top-32 aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Photo photo={photoCycle[hovered % photoCycle.length]} className="h-full w-full" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-7">
                    <p className="font-serif text-xl text-ivory">{treatments[hovered].name}</p>
                    <p className="mt-1 max-w-sm text-sm text-ivory/80">{treatments[hovered].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
