"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

const TRAIL_LENGTH = 28;        // number of trail points
const ELASTIC = 0.13;           // how tightly cursor follows mouse (lower = more lag)
const POINT_LIFETIME = 1.0;     // seconds each point lives

export default function NeonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Hide the native cursor globally
    document.documentElement.style.cursor = "none";

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Mouse target
    const mouse = { x: width / 2, y: height / 2 };
    // Smooth follower (head of trail)
    const head = { x: width / 2, y: height / 2 };

    const trail: TrailPoint[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: head.x,
      y: head.y,
      age: 0,
    }));

    let animId: number;
    let lastTime = performance.now();

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    function draw(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds, capped
      lastTime = now;

      // Move head toward mouse with elastic easing
      head.x += (mouse.x - head.x) * ELASTIC * (dt / 0.016);
      head.y += (mouse.y - head.y) * ELASTIC * (dt / 0.016);

      // Shift trail: each point slowly follows the one ahead of it
      // Trail[0] = closest to cursor
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        const prev = trail[i - 1];
        trail[i].x += (prev.x - trail[i].x) * 0.35 * (dt / 0.016);
        trail[i].y += (prev.y - trail[i].y) * 0.35 * (dt / 0.016);
        trail[i].age = i / TRAIL_LENGTH;
      }
      trail[0].x = head.x;
      trail[0].y = head.y;
      trail[0].age = 0;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw glowing trail as connected segments with varying width
      if (trail.length > 1) {
        for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
          const t = i / (TRAIL_LENGTH - 1); // 0 = head, 1 = tail
          const alpha = Math.pow(1 - t, 1.6);
          const lineWidth = Math.max(0.5, (1 - t) * 9);

          // Color gradient: white-cyan at head → electric purple at tail
          const r = Math.round(160 + (1 - t) * 95);   // 255 → 160
          const g = Math.round(t * 20 + (1 - t) * 220); // 220 → 20
          const b = 255;

          // Glow pass (wider, more transparent)
          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.18})`;
          ctx.lineWidth = lineWidth * 3.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Core pass (sharp bright line)
          ctx.beginPath();
          ctx.moveTo(trail[i].x, trail[i].y);
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.92})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Extra bloom at the head
        const grd = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, 18
        );
        grd.addColorStop(0, "rgba(220,240,255,0.85)");
        grd.addColorStop(0.3, "rgba(100,180,255,0.35)");
        grd.addColorStop(1, "rgba(108,99,255,0)");
        ctx.beginPath();
        ctx.arc(head.x, head.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Bright dot at exact cursor position
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
