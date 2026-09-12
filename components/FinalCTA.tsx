import ArtPanel from "./ui/ArtPanel";
import MagneticButton from "./ui/MagneticButton";
import RevealText from "./ui/RevealText";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <ArtPanel tone="charcoal" pattern="arcs" className="absolute inset-0" />
      <div className="relative mx-auto max-w-wrap px-6 text-center text-ivory lg:px-10">
        <RevealText>
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08]">
            Your best smile starts <span className="italic text-gold">here.</span>
          </h2>
        </RevealText>
        <RevealText delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-lg text-ivory/70">
            Book your consultation and discover a more personalised approach to dentistry.
          </p>
        </RevealText>
        <RevealText delay={0.2} className="mt-10">
          <MagneticButton href="#chat" variant="light">
            Book Your Appointment
          </MagneticButton>
        </RevealText>
      </div>
    </section>
  );
}
