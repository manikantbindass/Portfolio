"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CURSOR STATE ENUM
───────────────────────────────────────────────────────────────────────────── */
type CursorState = "default" | "hover" | "text" | "hidden";
type CursorLabel = "" | "VIEW" | "OPEN" | "CLICK";

/* ─────────────────────────────────────────────────────────────────────────────
   TRAIL PARTICLE
───────────────────────────────────────────────────────────────────────────── */
const MAX_TRAIL = 10;

/* ─────────────────────────────────────────────────────────────────────────────
   LERP HELPER
───────────────────────────────────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function CustomCursor() {
  /* ── Refs ── */
  const outerRef   = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const trailsRef  = useRef<HTMLDivElement[]>([]);
  const glowRef    = useRef<HTMLDivElement>(null);

  /* Position trackers (refs for RAF performance) */
  const mouse   = useRef({ x: -200, y: -200 });
  const outer   = useRef({ x: -200, y: -200 });
  const trail   = useRef<{ x: number; y: number; alpha: number }[]>(
    Array.from({ length: MAX_TRAIL }, () => ({ x: -200, y: -200, alpha: 0 }))
  );
  const raf     = useRef<number>(0);

  /* ── State (React state only for things that need re-render) ── */
  const [state,   setState]   = useState<CursorState>("default");
  const [label,   setLabel]   = useState<CursorLabel>("");
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  /* ── Mutable state refs (avoid stale closures in RAF) ── */
  const stateRef    = useRef<CursorState>("default");
  const clickingRef = useRef(false);

  const updateState = useCallback((s: CursorState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  /* ─────────────────────────────────────────────────────────────
     MAIN EFFECT
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    /* ── Mouse move ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    /* ── Detect element type on hover ── */
    const getElementType = (el: HTMLElement): { state: CursorState; label: CursorLabel } => {
      if (el.closest("h1,h2,h3,h4,h5,h6,p,span[class*='text'],label"))
        return { state: "text", label: "" };
      if (el.closest("[data-cursor='view'], .project-card, [data-cursor-view]"))
        return { state: "hover", label: "VIEW" };
      if (el.closest("[data-cursor='open']"))
        return { state: "hover", label: "OPEN" };
      if (el.closest("button, [role='button'], [data-magnetic]"))
        return { state: "hover", label: "CLICK" };
      if (el.closest("a"))
        return { state: "hover", label: "OPEN" };
      if (el.closest("img, [data-cursor-img]"))
        return { state: "hover", label: "VIEW" };
      return { state: "default", label: "" };
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const { state: s, label: l } = getElementType(el);
      updateState(s);
      setLabel(l);
    };

    const onLeave = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to || to === document.documentElement) {
        updateState("default");
        setLabel("");
      }
    };

    /* ── Click pulse ── */
    const onDown = () => { clickingRef.current = true; setClicking(true); };
    const onUp   = () => { clickingRef.current = false; setClicking(false); };

    /* ── Leave window ── */
    const onExit  = () => updateState("hidden");
    const onEnterDoc = () => updateState("default");

    /* ─── RAF TICK ─── */
    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      /* Outer ring interpolation */
      const t = stateRef.current === "hover" ? 0.14 : 0.1;
      outer.current.x = lerp(outer.current.x, mx, t);
      outer.current.y = lerp(outer.current.y, my, t);

      /* Apply outer */
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outer.current.x}px, ${outer.current.y}px)`;
      }

      /* Inner dot — near-instant */
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${mx}px, ${my}px)`;
      }

      /* Label follows outer */
      if (labelRef.current) {
        labelRef.current.style.transform =
          `translate(${outer.current.x}px, ${outer.current.y}px)`;
      }

      /* Glow follows outer with extra lag */
      if (glowRef.current) {
        const gx = lerp(parseFloat(glowRef.current.dataset.x ?? "0"), mx, 0.06);
        const gy = lerp(parseFloat(glowRef.current.dataset.y ?? "0"), my, 0.06);
        glowRef.current.dataset.x = String(gx);
        glowRef.current.dataset.y = String(gy);
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px)`;
      }

      /* Trail particles */
      for (let i = MAX_TRAIL - 1; i > 0; i--) {
        trail.current[i].x     = lerp(trail.current[i].x,     trail.current[i - 1].x, 0.35);
        trail.current[i].y     = lerp(trail.current[i].y,     trail.current[i - 1].y, 0.35);
        trail.current[i].alpha = lerp(trail.current[i].alpha, trail.current[i - 1].alpha, 0.35);
      }
      trail.current[0].x     = lerp(trail.current[0].x, mx, 0.5);
      trail.current[0].y     = lerp(trail.current[0].y, my, 0.5);
      trail.current[0].alpha = 1;
      // Decay alpha along trail
      for (let i = 0; i < MAX_TRAIL; i++) {
        trail.current[i].alpha = Math.max(0, 1 - i / MAX_TRAIL);
      }
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const p = trail.current[i];
        el.style.transform = `translate(${p.x}px, ${p.y}px)`;
        el.style.opacity   = String(p.alpha * 0.55);
      });

      raf.current = requestAnimationFrame(tick);
    };

    /* ── Event listeners ── */
    window.addEventListener("mousemove",  onMove,     { passive: true });
    document.addEventListener("mouseover",  onEnter,  { passive: true });
    document.addEventListener("mouseout",   onLeave,  { passive: true });
    document.addEventListener("mousedown",  onDown,   { passive: true });
    document.addEventListener("mouseup",    onUp,     { passive: true });
    document.documentElement.addEventListener("mouseleave", onExit);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onExit);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
      cancelAnimationFrame(raf.current);
    };
  }, [updateState]);

  if (!visible) return null;

  /* ─────────────────────────────────────────────────────────────
     DERIVED VISUAL PROPERTIES
  ───────────────────────────────────────────────────────────── */
  const isHover   = state === "hover";
  const isText    = state === "text";
  const isHidden  = state === "hidden";
  const hasLabel  = isHover && label !== "";

  /* Outer ring size */
  const outerSize = clicking ? 52 : isHover ? 56 : isText ? 44 : 38;

  /* Outer ring border */
  const outerBorder = isText
    ? "2px solid rgba(255,255,255,0.7)"
    : "1.5px solid rgba(99,102,241,0.7)";

  /* Outer ring bg */
  const outerBg = isText
    ? "transparent"
    : isHover
    ? "rgba(99,102,241,0.08)"
    : "rgba(99,102,241,0.03)";

  /* Outer ring shadow */
  const outerShadow = clicking
    ? "0 0 40px rgba(99,102,241,1), 0 0 70px rgba(167,139,250,0.5), inset 0 0 16px rgba(99,102,241,0.3)"
    : isHover
    ? "0 0 28px rgba(99,102,241,0.75), 0 0 55px rgba(167,139,250,0.35), inset 0 0 12px rgba(99,102,241,0.12)"
    : "0 0 14px rgba(99,102,241,0.45), inset 0 0 6px rgba(99,102,241,0.08)";

  return (
    <>
      {/* ────────────────────────────────────────────────────
          AMBIENT GLOW (extra-lagging large soft blob)
      ──────────────────────────────────────────────────── */}
      <div
        ref={glowRef}
        data-x="-200"
        data-y="-200"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9990]"
        style={{
          willChange: "transform",
          transform: "translate(-200px,-200px)",
        }}
      >
        <div
          style={{
            width:  160,
            height: 160,
            marginLeft: -80,
            marginTop:  -80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(167,139,250,0.08) 50%, transparent 80%)",
            filter: "blur(20px)",
            opacity: isHidden ? 0 : isHover ? 1 : 0.6,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* ────────────────────────────────────────────────────
          TRAIL PARTICLES
      ──────────────────────────────────────────────────── */}
      {Array.from({ length: MAX_TRAIL }).map((_, i) => {
        const size = Math.max(2, 7 - i * 0.55);
        return (
          <div
            key={i}
            ref={el => { if (el) trailsRef.current[i] = el; }}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[9991] rounded-full"
            style={{
              willChange: "transform, opacity",
              width:  size,
              height: size,
              marginLeft: -size / 2,
              marginTop:  -size / 2,
              background:
                i < 3
                  ? "rgba(99,102,241,0.9)"
                  : i < 6
                  ? "rgba(167,139,250,0.65)"
                  : "rgba(45,212,191,0.45)",
              boxShadow:
                i < 4
                  ? `0 0 ${6 - i}px rgba(99,102,241,0.7)`
                  : "none",
              transform: "translate(-200px,-200px)",
              opacity: 0,
              transition: "opacity 0.1s ease",
              display: isHidden ? "none" : "block",
            }}
          />
        );
      })}

      {/* ────────────────────────────────────────────────────
          OUTER RING (slow lerp)
      ──────────────────────────────────────────────────── */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          willChange: "transform",
          transform: "translate(-200px,-200px)",
        }}
      >
        <div
          style={{
            width:  outerSize,
            height: outerSize,
            marginLeft: -outerSize / 2,
            marginTop:  -outerSize / 2,
            borderRadius: "50%",
            border:     outerBorder,
            background: outerBg,
            boxShadow:  outerShadow,
            opacity:    isHidden ? 0 : 1,
            transition: [
              "width 0.28s cubic-bezier(0.16,1,0.3,1)",
              "height 0.28s cubic-bezier(0.16,1,0.3,1)",
              "border 0.22s ease",
              "box-shadow 0.3s ease",
              "opacity 0.25s ease",
              "background 0.22s ease",
            ].join(", "),
            /* Gradient animated border via background-clip trick on hover */
            ...(isHover ? {
              background: "conic-gradient(rgba(99,102,241,0.15) 0deg, rgba(167,139,250,0.15) 120deg, rgba(45,212,191,0.15) 240deg, rgba(99,102,241,0.15) 360deg)",
              border: "none",
              padding: "1.5px",
            } : {}),
          }}
        >
          {/* Gradient border inner fill */}
          {isHover && (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "rgba(3,7,18,0.85)",
                backdropFilter: "blur(4px)",
              }}
            />
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          LABEL (VIEW / OPEN / CLICK)
      ──────────────────────────────────────────────────── */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          willChange: "transform",
          transform: "translate(-200px,-200px)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            marginLeft: -28,
            marginTop:  -28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hasLabel ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "8px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#fff",
              textTransform: "uppercase" as const,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textShadow: "0 0 8px rgba(99,102,241,0.8)",
              transform: hasLabel ? "scale(1)" : "scale(0.6)",
              transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
              display: "block",
            }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          INNER DOT (instant tracking)
      ──────────────────────────────────────────────────── */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          willChange: "transform",
          transform: "translate(-200px,-200px)",
        }}
      >
        <div
          style={{
            width:      isText ? 0 : isHover ? 4 : 5,
            height:     isText ? 0 : isHover ? 4 : 5,
            marginLeft: isText ? 0 : isHover ? -2 : -2.5,
            marginTop:  isText ? 0 : isHover ? -2 : -2.5,
            borderRadius: "50%",
            background:  clicking
              ? "rgba(255,255,255,1)"
              : isHover
              ? "rgba(167,139,250,1)"
              : "rgba(99,102,241,1)",
            boxShadow: clicking
              ? "0 0 12px #fff, 0 0 24px rgba(99,102,241,0.9)"
              : isHover
              ? "0 0 8px rgba(167,139,250,0.9)"
              : "0 0 6px rgba(99,102,241,0.9)",
            opacity: isHidden ? 0 : 1,
            transition: [
              "width 0.2s ease",
              "height 0.2s ease",
              "margin 0.2s ease",
              "background 0.2s ease",
              "box-shadow 0.3s ease",
              "opacity 0.25s ease",
            ].join(", "),
          }}
        />
      </div>

      {/* ────────────────────────────────────────────────────
          CLICK RIPPLE (rendered at current position via CSS)
      ──────────────────────────────────────────────────── */}
      {clicking && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[9996] cursor-ripple"
          style={{
            transform: `translate(${mouse.current.x}px, ${mouse.current.y}px)`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop:  -30,
              borderRadius: "50%",
              border: "1px solid rgba(99,102,241,0.7)",
              animation: "cursor-ripple-anim 0.5s cubic-bezier(0,0,0.2,1) forwards",
            }}
          />
        </div>
      )}

      {/* ────────────────────────────────────────────────────
          GLOBAL STYLES
      ──────────────────────────────────────────────────── */}
      <style>{`
        /* Hide native cursor everywhere */
        *, *::before, *::after { cursor: none !important; }
        @media (pointer: coarse) { *, *::before, *::after { cursor: auto !important; } }

        /* Click ripple */
        @keyframes cursor-ripple-anim {
          from { transform: scale(0.4); opacity: 1; }
          to   { transform: scale(2.2); opacity: 0; }
        }

        /* Rotating gradient ring on hover elements */
        @keyframes cursor-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Magnetic transition */
        [data-magnetic] {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
