import { journeySteps } from "@/lib/data";
import RevealText from "./ui/RevealText";

export default function PatientJourney() {
  return (
    <section className="bg-charcoal py-24 text-ivory lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-16 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Patient Journey</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]">
            From first call to your new smile
          </h2>
        </RevealText>

        <div className="grid gap-0 lg:grid-cols-5">
          {journeySteps.map((step, i) => (
            <RevealText
              key={step.number}
              delay={i * 0.08}
              className={`border-t border-ivory/15 py-8 pr-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 ${
                i === 0 ? "lg:border-l-0" : ""
              }`}
            >
              <span className="font-serif text-3xl text-gold">{step.number}</span>
              <h3 className="mt-4 font-serif text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">{step.description}</p>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
