import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { parseLeetCode } from "@/lib/leetcode";
import snapshot from "@/lib/stats-snapshot.json";
const getStats = unstable_cache(
  async () => {
    const res = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query:
          'query { matchedUser(username:"manikantbindass") { submitStatsGlobal { acSubmissionNum { difficulty count } } } userContestRanking(username:"manikantbindass") { rating attendedContestsCount } }',
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("LeetCode unavailable");
    const counts = parseLeetCode(await res.json());
    return {
      ...counts,
      source: "cached API response",
      provider: "LeetCode GraphQL",
      verifiedAt: new Date().toISOString(),
    };
  },
  ["leetcode-profile-v2"],
  { revalidate: 21600 },
);
export async function GET() {
  try {
    return NextResponse.json(await getStats());
  } catch {
    return NextResponse.json(snapshot.leetcode);
  }
}
