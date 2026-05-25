"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      outer.current.x = lerp(outer.current.x, pos.current.x, 0.1);
      outer.current.y = lerp(outer.current.y, pos.current.y, 0.1);
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x}px, ${outer.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = t.closest("a,button,[data-magnetic]");
      if (isInteractive) {
        outerRef.current?.classList.add("cursor-expand");
        innerRef.current?.classList.add("cursor-dot-hidden");
      }
    };
    const onLeave = () => {
      outerRef.current?.classList.remove("cursor-expand");
      innerRef.current?.classList.remove("cursor-dot-hidden");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-10 h-10 rounded-full border border-[#6366F1]/60"
          style={{
            boxShadow: "0 0 16px rgba(99,102,241,0.4), inset 0 0 8px rgba(99,102,241,0.1)",
            background: "rgba(99,102,241,0.04)",
            transition: "width 0.25s ease, height 0.25s ease, box-shadow 0.25s ease",
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
          style={{ boxShadow: "0 0 6px #6366F1" }}
        />
      </div>

      <style>{`
        .cursor-expand > div {
          width: 3rem !important;
          height: 3rem !important;
          box-shadow: 0 0 28px rgba(99,102,241,0.65), inset 0 0 12px rgba(99,102,241,0.15) !important;
        }
        .cursor-dot-hidden { opacity: 0 !important; }
      `}</style>
    </>
  );
}
