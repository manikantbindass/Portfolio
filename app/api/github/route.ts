import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import snapshot from "@/lib/stats-snapshot.json";
const getStats = unstable_cache(
  async () => {
    const response = await fetch(
      "https://api.github.com/users/manikantbindass",
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    );
    if (!response.ok) throw new Error("GitHub unavailable");
    const data = await response.json();
    if (
      !Number.isInteger(data.public_repos) ||
      !Number.isInteger(data.followers)
    )
      throw new Error("Invalid profile");
    const languages: Record<string, number> = {};
    let languagesComplete = true;
    try {
      for (let page = 1; page <= Math.ceil(data.public_repos / 100); page++) {
        const r = await fetch(
          `https://api.github.com/users/manikantbindass/repos?per_page=100&page=${page}`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: AbortSignal.timeout(8000),
            cache: "no-store",
          },
        );
        if (!r.ok) throw new Error("Repositories unavailable");
        const repos = await r.json();
        if (!Array.isArray(repos)) throw new Error("Invalid repositories");
        for (const repo of repos)
          if (!repo.fork && repo.language)
            languages[repo.language] = (languages[repo.language] ?? 0) + 1;
      }
    } catch {
      languagesComplete = false;
    }
    return {
      repos: data.public_repos,
      followers: data.followers,
      source: "cached API response",
      provider: "GitHub REST API",
      verifiedAt: new Date().toISOString(),
      languages: languagesComplete
        ? Object.entries(languages)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)
        : [],
    };
  },
  ["github-profile-v2"],
  { revalidate: 21600 },
);
export async function GET() {
  try {
    return NextResponse.json(await getStats());
  } catch {
    return NextResponse.json(snapshot.github);
  }
}
