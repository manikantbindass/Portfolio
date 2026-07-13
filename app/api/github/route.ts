import { NextResponse } from "next/server";

// ── GitHub Live Stats API Route ───────────────────────────────────────────────
// Fetches public GitHub profile stats. No auth token needed for basic stats.
// Cache for 6 hours.
export const revalidate = 21600;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/manikantbindass", {
      headers: { "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error("GitHub API error");

    const data = await res.json();

    return NextResponse.json(
      {
        repos:     data.public_repos ?? 239,
        followers: data.followers    ?? 44,
        source:    "live",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json({ repos: 239, followers: 44, source: "fallback" }, { status: 200 });
  }
}
