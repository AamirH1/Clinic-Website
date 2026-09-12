"use client";

import { useRef, useState, PointerEvent } from "react";
import ArtPanel from "./ArtPanel";

type Props = {
  label: string;
};

/**
 * Drag / touch / click to reveal "before" vs "after" state.
 * Uses placeholder art panels — swap for real, consented before/after
 * photography (see README).
 */
export default function BeforeAfterSlider({ label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  function update(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    update(e.clientX);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    update(e.clientX);
  }
  function stopDrag() {
    dragging.current = false;
  }

  return (
    <div className="group">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
        className="relative aspect-[4/5] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl"
      >
        <ArtPanel tone="charcoal" pattern="grid" className="absolute inset-0" />
        <div className="absolute left-4 top-4 rounded-full bg-charcoal/60 px-3 py-1 text-xs text-ivory backdrop-blur">
          After
        </div>

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <ArtPanel tone="ivory" pattern="arcs" className="h-full w-[calc(100vw)] max-w-none" />
          <div className="absolute left-4 top-4 rounded-full bg-ivory/80 px-3 py-1 text-xs text-charcoal backdrop-blur">
            Before
          </div>
        </div>

        <div
          className="absolute inset-y-0 flex w-10 -translate-x-1/2 items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <div className="h-full w-px bg-ivory/80" />
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-charcoal shadow-lg">
            <span className="text-xs">↔</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-charcoal/60">{label}</p>
    </div>
  );
}
