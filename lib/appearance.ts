"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-palette"],
  });
  return () => observer.disconnect();
}

export function useDarkMode() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );
}

export function useWarmPalette() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.palette === "warm",
    () => true,
  );
}
