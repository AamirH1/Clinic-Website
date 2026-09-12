import { brand } from "@/lib/data";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";
import { ChatIcon } from "./icons";

const mapQuery = encodeURIComponent(`${brand.address.line1}, ${brand.address.city}`);

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div>
          <RevealText>
            <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Visit Us</p>
          </RevealText>
          <RevealText delay={0.08}>
            <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
              Your best smile starts with a conversation
            </h2>
          </RevealText>

          <RevealText delay={0.16} className="mt-10 space-y-6 text-sm text-charcoal/70">
            <div>
              <p className="text-xs uppercase tracking-wide text-charcoal/50">Address</p>
              <p className="mt-1 text-base text-charcoal">
                {brand.address.line1}
                <br />
                {brand.address.line2}
                <br />
                {brand.address.city}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-charcoal/50">Phone &amp; Email</p>
              <p className="mt-1 text-base text-charcoal">
                <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                  {brand.phone}
                </a>
                <br />
                <a href={`mailto:${brand.email}`} className="hover:underline">
                  {brand.email}
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-charcoal/50">Hours</p>
              <ul className="mt-1 space-y-1">
                {brand.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 text-base text-charcoal">
                    <span className="text-charcoal/70">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-charcoal/50">
              Street parking and public transit available nearby. [PLACEHOLDER — replace with real
              parking/transit details]
            </p>
          </RevealText>

          <RevealText delay={0.2} className="mt-8 overflow-hidden rounded-2xl border border-charcoal/10">
            <iframe
              title="Clinic location map"
              className="h-64 w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            />
          </RevealText>
        </div>

        <RevealText
          delay={0.1}
          className="flex flex-col justify-center rounded-[1.75rem] border border-charcoal/10 bg-ivory2/50 p-8 text-center lg:p-12"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-ivory">
            <ChatIcon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-charcoal">Book in under a minute</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-charcoal/60">
            Skip the form — our chat assistant (bottom-right of your screen) can answer quick
            questions or take your appointment request step by step.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="#chat" variant="primary">
              Open Chat to Book
            </MagneticButton>
          </div>
          <p className="mt-4 text-xs text-charcoal/50">Or call us directly at {brand.phone}</p>
        </RevealText>
      </div>
    </section>
  );
}
