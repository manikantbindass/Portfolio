"use client";
import { createContext, useContext, useEffect, useState } from "react";
import snapshot from "@/lib/stats-snapshot.json";
export type LCStats = Omit<typeof snapshot.leetcode, "rating"> & {
  rating: number | null;
};
export type GHStats = typeof snapshot.github & {
  languages?: { name: string; count: number }[];
};
const StatsContext = createContext<{ lc: LCStats; gh: GHStats }>({
  lc: snapshot.leetcode,
  gh: snapshot.github,
});
export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [lc, setLc] = useState<LCStats>(snapshot.leetcode);
  const [gh, setGh] = useState<GHStats>(snapshot.github);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const responses = await Promise.allSettled([
        fetch("/api/leetcode", { signal: controller.signal }),
        fetch("/api/github", { signal: controller.signal }),
      ]);
      for (let i = 0; i < responses.length; i++) {
        const r = responses[i];
        if (r.status === "fulfilled" && r.value.ok) {
          const d = await r.value.json();
          if (!controller.signal.aborted) {
            if (i === 0) setLc(d);
            else setGh(d);
          }
        }
      }
    }
    void load().catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <StatsContext.Provider value={{ lc, gh }}>{children}</StatsContext.Provider>
  );
}
export const usePortfolioStats = () => useContext(StatsContext);
