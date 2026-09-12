"use client";

import { motion } from "framer-motion";
import { whyChooseUs } from "@/lib/data";
import RevealText from "./ui/RevealText";

export default function WhyChooseUs() {
  return (
    <section className="bg-ivory2/60 py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-14 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Why Choose Us</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
            The details that shape every visit
          </h2>
        </RevealText>

        <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-ivory p-8 transition-colors duration-500 hover:bg-charcoal"
            >
              <span className="font-mono text-xs text-clinicalDeep group-hover:text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl text-charcoal group-hover:text-ivory">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60 group-hover:text-ivory/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
