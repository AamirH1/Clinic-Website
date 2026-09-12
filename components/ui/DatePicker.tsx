"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "../icons";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDisplay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Lightweight custom calendar popover — replaces the native OS date input,
 * whose look varies (and often looks dated) across browsers.
 */
export default function DatePicker({ value, onChange, placeholder = "Select a date" }: Props) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewDate, setViewDate] = useState(() => (value ? new Date(value) : new Date()));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  ];

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-full border border-charcoal/20 bg-ivory px-4 py-2 text-left text-sm outline-none focus:border-charcoal"
      >
        <CalendarIcon className="h-4 w-4 shrink-0 text-charcoal/50" />
        <span className={value ? "text-charcoal" : "text-charcoal/40"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-10 mb-2 w-64 rounded-2xl border border-charcoal/10 bg-ivory p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="rounded-full px-2 py-1 text-sm text-charcoal/60 hover:bg-ivory2"
              aria-label="Previous month"
            >
              ‹
            </button>
            <p className="text-sm font-medium text-charcoal">
              {viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="rounded-full px-2 py-1 text-sm text-charcoal/60 hover:bg-ivory2"
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-charcoal/40">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={`${d}-${i}`}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <span key={i} />;
              const iso = toISODate(date);
              const isPast = date < today;
              const isSelected = value === iso;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`aspect-square rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-charcoal text-ivory"
                      : isPast
                        ? "text-charcoal/20"
                        : "text-charcoal hover:bg-ivory2"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
