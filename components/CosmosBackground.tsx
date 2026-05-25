"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number; alpha: number;
  twinkleSpeed: number; twinklePhase: number;
}
interface ShootingStar {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; active: boolean;
}

export default function CosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;

    // --- Stars ---
    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // --- Nebula blobs ---
    const blobs = [
      { x: 0.15, y: 0.2, r: 280, color: "rgba(108,99,255,0.07)" },
      { x: 0.8,  y: 0.7, r: 320, color: "rgba(56,178,172,0.06)" },
      { x: 0.5,  y: 0.1, r: 200, color: "rgba(167,139,250,0.05)" },
      { x: 0.9,  y: 0.3, r: 180, color: "rgba(34,211,238,0.04)" },
      { x: 0.1,  y: 0.8, r: 240, color: "rgba(236,72,153,0.04)" },
    ];

    // --- Shooting stars ---
    const shooters: ShootingStar[] = Array.from({ length: 4 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 60, active: false,
    }));

    function spawnShooter(s: ShootingStar) {
      s.x = Math.random() * w * 0.6;
      s.y = Math.random() * h * 0.4;
      const angle = (Math.random() * 30 + 30) * Math.PI / 180;
      const speed = Math.random() * 8 + 6;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.life = 0;
      s.maxLife = Math.random() * 40 + 35;
      s.active = true;
    }

    let shooterTimer = 0;
    let t = 0;

    function drawFrame() {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      // Nebula
      blobs.forEach(b => {
        const ox = Math.sin(t * 0.3 + b.x * 5) * 25;
        const oy = Math.cos(t * 0.2 + b.y * 5) * 20;
        const grd = ctx.createRadialGradient(b.x*w + ox, b.y*h + oy, 0, b.x*w + ox, b.y*h + oy, b.r);
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(b.x*w + ox, b.y*h + oy, b.r, 0, Math.PI*2);
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.twinklePhase += s.twinkleSpeed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinklePhase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(226,232,240,${a})`;
        ctx.fill();
      });

      // Shooting stars
      shooterTimer++;
      if (shooterTimer > 220) {
        const idle = shooters.find(s => !s.active);
        if (idle) spawnShooter(idle);
        shooterTimer = 0;
      }
      shooters.forEach(s => {
        if (!s.active) return;
        s.life++;
        if (s.life >= s.maxLife) { s.active = false; return; }
        const prog = s.life / s.maxLife;
        const alpha = Math.sin(prog * Math.PI);
        const tailLen = 80 * alpha;
        const grd = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * (tailLen/s.vx||1), s.y - s.vy * (tailLen/s.vy||1));
        grd.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        s.x += s.vx; s.y += s.vy;
      });

      animId = requestAnimationFrame(drawFrame);
    }

    animId = requestAnimationFrame(drawFrame);

    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
      stars.forEach(s => { s.x = Math.random()*w; s.y = Math.random()*h; });
    };
    window.addEventListener("resize", onResize);

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dark:block hidden"
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
