import { NextResponse } from "next/server";

// ── LeetCode Live Stats API Route ────────────────────────────────────────────
// Fetches from alfa-leetcode-api with a fallback to hardcoded values.
// Cache for 6 hours to avoid rate limits.
export const revalidate = 21600; // 6 hours ISR cache

export async function GET() {
  try {
    const [solvedRes, contestRes] = await Promise.allSettled([
      fetch("https://alfa-leetcode-api.onrender.com/manikantbindass/solved", {
        next: { revalidate: 21600 },
        signal: AbortSignal.timeout(8000),
      }),
      fetch("https://alfa-leetcode-api.onrender.com/manikantbindass/contest", {
        next: { revalidate: 21600 },
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    let solved = { solvedProblem: 350, easySolved: 80, mediumSolved: 200, hardSolved: 70 };
    let rating = 1500;

    if (solvedRes.status === "fulfilled" && solvedRes.value.ok) {
      const data = await solvedRes.value.json();
      solved = {
        solvedProblem: data.solvedProblem ?? solved.solvedProblem,
        easySolved:    data.easySolved    ?? solved.easySolved,
        mediumSolved:  data.mediumSolved  ?? solved.mediumSolved,
        hardSolved:    data.hardSolved    ?? solved.hardSolved,
      };
    }

    if (contestRes.status === "fulfilled" && contestRes.value.ok) {
      const data = await contestRes.value.json();
      const lastContest = data.contestParticipation?.[0];
      if (lastContest?.rating) rating = Math.round(lastContest.rating);
    }

    return NextResponse.json(
      {
        total:   solved.solvedProblem,
        easy:    solved.easySolved,
        medium:  solved.mediumSolved,
        hard:    solved.hardSolved,
        rating,
        source:  "live",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    // Fallback values if API is down
    return NextResponse.json(
      {
        total:   350,
        easy:    80,
        medium:  200,
        hard:    70,
        rating:  1500,
        source:  "fallback",
      },
      { status: 200 }
    );
  }
}
