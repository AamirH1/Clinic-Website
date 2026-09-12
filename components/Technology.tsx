import { technologyFeatures } from "@/lib/data";
import Photo from "./ui/Photo";
import RevealText from "./ui/RevealText";
import { stockPhotos } from "@/lib/stockPhotos";

export default function Technology() {
  return (
    <section id="technology" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <RevealText>
            <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Technology</p>
          </RevealText>
          <RevealText delay={0.08}>
            <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
              Precision, without the cold clinical feel
            </h2>
          </RevealText>
          <div className="mt-10 space-y-8">
            {technologyFeatures.map((f, i) => (
              <RevealText key={f.name} delay={0.1 + i * 0.06} className="border-b border-charcoal/10 pb-8">
                <h3 className="font-serif text-lg text-charcoal">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{f.description}</p>
              </RevealText>
            ))}
          </div>
        </div>
        <RevealText delay={0.15}>
          <Photo photo={stockPhotos.digitalScan} className="aspect-[4/5] w-full rounded-[2rem] lg:sticky lg:top-32" />
        </RevealText>
      </div>
    </section>
  );
}
