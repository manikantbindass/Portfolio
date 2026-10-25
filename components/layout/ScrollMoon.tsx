"use client";

import { useEffect, useRef } from "react";

/**
 * A moon that travels along a smooth arc across the entire viewport
 * as the user scrolls from top to bottom of the page.
 *
 * Path: starts bottom-left → rises to top-center → descends to bottom-right
 * (classic moon arc across a night sky)
 */
export default function ScrollMoon() {
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moon = moonRef.current;
    if (!moon || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      // progress: 0 (top) → 1 (bottom)
      const t = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      // ── Arc path ──────────────────────────────────────────────────────────
      // x: 10% vw  →  50% vw  →  90% vw  (smooth cubic)
      // y: 90% vh  →  12% vh  →  90% vh  (parabola, peak at t=0.5)
      const xPct = 10 + 80 * t; // linear left→right
      const yPct = 90 - 78 * Math.sin(Math.PI * t); // parabolic arc

      // ── Size: grows as it "rises", shrinks as it "sets" ──────────────────
      const scale = 0.7 + 0.6 * Math.sin(Math.PI * t);

      // ── Glow intensity ────────────────────────────────────────────────────
      const glowOpacity = 0.35 + 0.45 * Math.sin(Math.PI * t);

      moon.style.transform = `translate3d(${xPct}vw, ${yPct}vh, 0) translate(-50%, -50%) scale(${scale})`;
      moon.style.setProperty("--glow-opacity", String(glowOpacity));
    };

    update();
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={moonRef}
      aria-hidden="true"
      className="scroll-moon"
      style={{
        position: "fixed",
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
        /* initial position — overwritten instantly by JS */
        left: 0,
        top: 0,
        transform: "translate3d(10vw,90vh,0) translate(-50%, -50%) scale(0.7)",
      }}
    >
      {/* Moon disc */}
      <div className="moon-disc" />
      {/* Crescent shadow overlay */}
      <div className="moon-crescent" />
      {/* Glow halo */}
      <div className="moon-glow" />
      {/* Surface craters */}
      <div className="moon-crater moon-crater-1" />
      <div className="moon-crater moon-crater-2" />
      <div className="moon-crater moon-crater-3" />
    </div>
  );
}
