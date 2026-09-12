import Photo from "./ui/Photo";
import RevealText from "./ui/RevealText";
import { stockPhotos } from "@/lib/stockPhotos";

export default function Intro() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <RevealText>
          <Photo photo={stockPhotos.consultation} className="aspect-[5/4] w-full rounded-[2rem]" />
        </RevealText>
        <div className="flex flex-col justify-center">
          <RevealText>
            <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Our Philosophy</p>
          </RevealText>
          <RevealText delay={0.08}>
            <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
              Modern dentistry, designed around <span className="italic">you.</span>
            </h2>
          </RevealText>
          <RevealText delay={0.16}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-charcoal/70">
              We believe exceptional dental care shouldn&apos;t feel clinical or rushed. Every visit
              is built around understanding your goals first — then applying precise, modern
              technique to get you there with confidence and comfort.
            </p>
          </RevealText>
          <RevealText delay={0.24} className="mt-10 grid grid-cols-2 gap-8 border-t border-charcoal/10 pt-8">
            <div>
              <p className="font-serif text-2xl text-charcoal">Patient‑first</p>
              <p className="mt-1 text-sm text-charcoal/60">Every plan starts with listening.</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-charcoal">Precision‑led</p>
              <p className="mt-1 text-sm text-charcoal/60">Digital tools, considered technique.</p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
