import { team } from "@/lib/data";
import ArtPanel from "./ui/ArtPanel";
import RevealText from "./ui/RevealText";
import { UserIcon } from "./icons";

const tones = ["clinical", "gold", "charcoal"] as const;

export default function Team() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-10">
        <RevealText className="mb-14 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-clinicalDeep">Our Team</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-charcoal">
            Clinicians you can trust
          </h2>
        </RevealText>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <RevealText key={member.name} delay={i * 0.08} className="group">
              <div className="relative overflow-hidden rounded-2xl">
                <ArtPanel
                  tone={tones[i % tones.length]}
                  pattern="none"
                  className="aspect-[4/5] w-full transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center text-charcoal/25">
                  <UserIcon className="h-16 w-16" />
                </div>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-charcoal/35">Photo coming soon</p>
              <h3 className="mt-5 font-serif text-xl text-charcoal">{member.name}</h3>
              <p className="mt-1 text-sm text-clinicalDeep">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{member.bio}</p>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
