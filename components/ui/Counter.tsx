"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  value: string;
  suffix?: string;
};

/**
 * Animates a numeric string (may contain commas / decimals) counting up
 * once it scrolls into view. Non-numeric values render as static text.
 */
export default function Counter({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const numeric = parseFloat(value.replace(/,/g, ""));
  const isNumeric = !Number.isNaN(numeric);
  const hasDecimal = value.includes(".");

  const [display, setDisplay] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (!inView || !isNumeric) {
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      setDisplay(
        hasDecimal
          ? current.toFixed(1)
          : Math.round(current).toLocaleString("en-US")
      );
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, isNumeric, numeric, hasDecimal, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </motion.span>
  );
}
