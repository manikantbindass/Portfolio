"use client";
import { useSyncExternalStore } from "react";
import TopBar from "./TopBar";
const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};
export default function ThemeHeader() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );
  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }
  return <TopBar dark={dark} toggle={toggle} />;
}
