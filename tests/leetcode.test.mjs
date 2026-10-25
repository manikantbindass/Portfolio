import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLeetCode } from "../lib/leetcode.ts";
const payload = (counts = [526, 136, 280, 110], rating = 2579.723) => ({
  data: {
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: ["All", "Easy", "Medium", "Hard"].map(
          (difficulty, i) => ({ difficulty, count: counts[i] }),
        ),
      },
    },
    userContestRanking: rating === null ? null : { rating },
  },
});
test("accepts complete reconciled counts and current ranking", () =>
  assert.deepEqual(parseLeetCode(payload()), {
    total: 526,
    easy: 136,
    medium: 280,
    hard: 110,
    rating: 2579.723,
  }));
test("does not invent a missing contest rating", () =>
  assert.equal(parseLeetCode(payload(undefined, null)).rating, null));
test("accepts a real zero-solved profile", () =>
  assert.equal(parseLeetCode(payload([0, 0, 0, 0], null)).total, 0));
test("rejects GraphQL errors, missing and inconsistent data", () => {
  for (const p of [
    { errors: [{}] },
    {},
    payload([526, 136, 280, 109]),
    payload([526, 136, 280, -1]),
    payload([526, 136, 280, 110.5]),
    payload([526, 136, 280, undefined]),
  ])
    assert.throws(() => parseLeetCode(p));
});
test("rejects nonnumeric counts and non-finite rating", () => {
  assert.throws(() => parseLeetCode(payload([526, "136", 280, 110])));
  assert.equal(parseLeetCode(payload(undefined, Infinity)).rating, null);
});
