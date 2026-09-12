"use client";

import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import Photo from "./ui/Photo";
import { stockPhotos } from "@/lib/stockPhotos";
import { StarIcon } from "./icons";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="mx-auto grid max-w-wrap items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-6 text-xs uppercase tracking-[0.2em] text-clinicalDeep">
            Harborview District · Est. placeholder
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance font-serif text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[1.05] text-charcoal"
          >
            Exceptional dentistry.
            <br />
            <span className="italic text-clinicalDeep">Beautifully</span> personal.
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-md text-lg leading-relaxed text-charcoal/70">
            A calm, precise approach to modern dentistry — combining advanced technology with
            genuinely personalised care, in a space designed to put you at ease.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#chat" variant="primary">
              Book an Appointment
            </MagneticButton>
            <MagneticButton href="#treatments" variant="ghost">
              Explore Our Treatments
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-14 flex items-center gap-6 text-sm text-charcoal/60">
            <span className="flex items-center gap-1 text-charcoal">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </span>
            <span>5.0 rating from 400+ patients</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Photo photo={stockPhotos.clinicInterior} priority className="aspect-[4/5] w-full rounded-[2rem]" />
          <div className="absolute -bottom-6 -left-6 hidden w-52 rounded-2xl border border-charcoal/10 bg-ivory/90 p-5 shadow-xl backdrop-blur sm:block">
            <p className="font-serif text-2xl text-charcoal">15+ yrs</p>
            <p className="mt-1 text-xs text-charcoal/60">of clinical excellence</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
