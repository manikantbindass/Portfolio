"use client";
import { useDarkMode, useWarmPalette } from "@/lib/appearance";
import TopBar from "./TopBar";

export default function ThemeHeader() {
  const dark = useDarkMode();
  const warm = useWarmPalette();

  function toggleMode() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  function togglePalette() {
    const palette = warm ? "classic" : "warm";
    document.documentElement.dataset.palette = palette;
    try {
      localStorage.setItem("portfolio-palette", palette);
    } catch {}
  }

  return <TopBar dark={dark} warm={warm} toggleMode={toggleMode} togglePalette={togglePalette} />;
}
