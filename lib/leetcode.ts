export interface SolvedCounts {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  rating: number | null;
}
/** Reject partial/error responses rather than mixing them with historical values. */
export function parseLeetCode(payload: unknown): SolvedCounts {
  const result = payload as {
    errors?: unknown;
    data?: {
      matchedUser?: {
        submitStatsGlobal?: {
          acSubmissionNum?: { difficulty: string; count: number }[];
        };
      };
      userContestRanking?: { rating?: number } | null;
    };
  };
  if (!result || result.errors) throw new Error("LeetCode GraphQL error");
  const rows = result.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!Array.isArray(rows)) throw new Error("LeetCode counts missing");
  const count = (name: string) => {
    const value = rows.find((row) => row.difficulty === name)?.count;
    if (!Number.isInteger(value) || value! < 0)
      throw new Error("Invalid LeetCode count");
    return value!;
  };
  const total = count("All"),
    easy = count("Easy"),
    medium = count("Medium"),
    hard = count("Hard");
  if (total !== easy + medium + hard)
    throw new Error("LeetCode totals do not reconcile");
  const rating = result.data?.userContestRanking?.rating;
  return {
    total,
    easy,
    medium,
    hard,
    rating:
      typeof rating === "number" && Number.isFinite(rating) && rating > 0
        ? rating
        : null,
  };
}
