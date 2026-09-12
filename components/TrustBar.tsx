import { trustStats } from "@/lib/data";
import Counter from "./ui/Counter";
import RevealText from "./ui/RevealText";

export default function TrustBar() {
  return (
    <section className="border-y border-charcoal/10 bg-ivory2/60 py-14">
      <div className="mx-auto grid max-w-wrap grid-cols-2 gap-10 px-6 lg:grid-cols-4 lg:px-10">
        {trustStats.map((stat, i) => (
          <RevealText key={stat.label} delay={i * 0.08} className="text-center lg:text-left">
            <p className="font-serif text-4xl text-charcoal lg:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-charcoal/60">{stat.label}</p>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
