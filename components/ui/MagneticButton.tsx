"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { openChat } from "../ChatWidget";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
};

/**
 * A button with a subtle magnetic pull toward the cursor.
 * Falls back to a plain hover state on touch devices / reduced motion.
 * href="#chat" is a sentinel that opens the chat widget's booking flow
 * instead of navigating.
 */
export default function MagneticButton({ href, children, variant = "primary", className = "", onClick }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  const base =
    "magnetic-btn relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide whitespace-nowrap";
  const variants: Record<string, string> = {
    primary: "bg-charcoal text-ivory hover:bg-clinicalDeep",
    ghost: "border border-charcoal/25 text-charcoal hover:border-charcoal",
    light: "bg-ivory text-charcoal hover:bg-white"
  };

  if (href === "#chat") {
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => {
          openChat();
          onClick?.();
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
