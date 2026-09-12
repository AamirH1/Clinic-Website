"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import RevealText from "./ui/RevealText";
import { StarIcon } from "./icons";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section id="reviews" className="py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-14 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Patient Reviews</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
            Patients notice the difference
          </h2>
        </RevealText>

        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-1 text-charcoal">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-balance font-serif text-2xl leading-snug text-charcoal lg:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-6 text-sm text-charcoal/60">
                {t.name} &middot; {t.treatment}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:border-charcoal"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-charcoal" : "w-1.5 bg-charcoal/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:border-charcoal"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
