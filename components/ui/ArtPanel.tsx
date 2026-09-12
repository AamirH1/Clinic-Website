type Props = {
  className?: string;
  tone?: "clinical" | "gold" | "charcoal" | "ivory";
  pattern?: "arcs" | "grid" | "none";
};

const tones: Record<string, string> = {
  clinical: "from-clinical/25 via-clinical/10 to-clinicalDeep/30",
  gold: "from-gold/30 via-ivory2 to-gold/10",
  charcoal: "from-charcoal2 via-charcoal to-charcoal2",
  ivory: "from-ivory2 via-ivory to-ivory2"
};

/**
 * Abstract art placeholder standing in for real clinic photography.
 * Replace each usage with next/image once photography is available —
 * see README "Adding real photography".
 */
export default function ArtPanel({ className = "", tone = "clinical", pattern = "arcs" }: Props) {
  // Don't hard-code "relative" here: if a caller passes "absolute" (e.g. to
  // use this as a full-bleed section background), Tailwind's generated CSS
  // resolves the conflicting position utility by source order in its own
  // stylesheet, not by the order classes appear in this string — "relative"
  // silently wins over "absolute" every time, collapsing the panel to zero
  // height. Only supply a default position when the caller didn't specify one.
  const hasPosition = /(^|\s)(absolute|fixed|sticky|static|relative)(\s|$)/.test(className);
  return (
    <div className={`${hasPosition ? "" : "relative "}overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}>
      {pattern === "arcs" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-40"
          viewBox="0 0 400 400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="420" r="180" stroke="currentColor" strokeWidth="0.5" className="text-charcoal/30" />
          <circle cx="200" cy="420" r="140" stroke="currentColor" strokeWidth="0.5" className="text-charcoal/25" />
          <circle cx="200" cy="420" r="100" stroke="currentColor" strokeWidth="0.5" className="text-charcoal/20" />
        </svg>
      )}
      {pattern === "grid" && (
        <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-charcoal/40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}
      <div className="absolute inset-0 grain" />
    </div>
  );
}
