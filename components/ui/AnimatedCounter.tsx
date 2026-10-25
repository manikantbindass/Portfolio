"use client";
import { useEffect, useRef, useState } from "react";
interface CounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}
export default function AnimatedCounter({
  to,
  duration = 1.2,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  const [animated, setAnimated] = useState({ target: to, value: to });
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          setAnimated({
            target: to,
            value: Math.round((1 - Math.pow(1 - progress, 4)) * to),
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);
  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${to}${suffix}`}
    >
      <span aria-hidden>
        {prefix}
        {animated.target === to ? animated.value : to}
        {suffix}
      </span>
    </span>
  );
}
