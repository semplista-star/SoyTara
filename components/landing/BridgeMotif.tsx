"use client";

import { useEffect, useRef } from "react";

/**
 * The brand's one recurring graphic: a single stroke that traces a small
 * screen, then keeps going as an open line toward the horizon. Reused with
 * small variations at the hero, the method transition, and the close —
 * "de la pantalla a la vida" made literal instead of stated.
 */
export default function BridgeMotif({
  className,
  variant = "open"
}: {
  className?: string;
  variant?: "open" | "resolved";
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const length = path.getTotalLength();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduceMotion ? "0" : `${length}`;

    if (reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const d =
    variant === "resolved"
      ? // Closing variant: the line has already left the screen — mostly
        // open horizon, screen reduced to a faint point of origin.
        "M24,44 L24,44 M24,44 C 90,20 150,58 220,30 C 280,8 320,26 356,12"
      : "M40,16 L60,16 A8,8 0 0 1 68,24 L68,56 A8,8 0 0 1 60,64 L40,64 A8,8 0 0 1 32,56 L32,24 A8,8 0 0 1 40,16 Z M68,40 C 108,40 128,20 168,26 C 208,32 236,10 284,14";

  return (
    <div className={className} ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 360 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <path ref={pathRef} d={d} stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
