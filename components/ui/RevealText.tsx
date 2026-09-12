"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  once?: boolean;
};

/**
 * Fades + translates content into view on scroll. Purely CSS-transform based
 * (GPU friendly) and respects prefers-reduced-motion via framer-motion's
 * built-in handling combined with the global CSS override.
 */
export default function RevealText({ children, as = "div", className = "", delay = 0, once = true }: Props) {
  const Component = motion[as as "div"];
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
