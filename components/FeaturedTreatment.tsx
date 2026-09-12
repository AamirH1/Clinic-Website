"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Photo from "./ui/Photo";
import MagneticButton from "./ui/MagneticButton";
import { stockPhotos } from "@/lib/stockPhotos";

const benefits = [
  "Digital smile design mapped to your facial features",
  "Porcelain veneers, whitening and contouring in one plan",
  "A guided timeline from consultation to reveal"
];

export default function FeaturedTreatment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal py-28 text-ivory lg:py-36">
      <div className="mx-auto grid max-w-wrap items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div style={{ y: textY }}>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Featured Treatment</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08]">
            Smile <span className="italic">Makeovers</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">
            A fully coordinated approach that brings together whitening, contouring and veneers —
            planned digitally, delivered precisely.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-ivory/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MagneticButton href="#chat" variant="light">
              Book a Consultation
            </MagneticButton>
          </div>
        </motion.div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <Photo photo={stockPhotos.scanReview} className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
