import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Canonical fallback — always returned if any live fetch fails
// ---------------------------------------------------------------------------
const FALLBACK = {
  leetcode:   { solved: "220+", handle: "yasin_1",   live: false },
  codechef:   { rating: 1374,   handle: "yasin_alam", live: false },
  codeforces: { rating: 912,    handle: "MD_YASIN",   live: false },
};

// Tiny helper: resolve with a default after `ms` milliseconds
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  const timer = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timer]);
}

// ---------------------------------------------------------------------------
// 1. Codeforces
// ---------------------------------------------------------------------------
async function fetchCodeforces() {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.info?handles=MD_YASIN",
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (data.status === "OK" && data.result?.[0]?.rating) {
      return { rating: data.result[0].rating as number, handle: "MD_YASIN", live: true };
    }
  } catch (_) { /* swallow */ }
  return { ...FALLBACK.codeforces };
}

// ---------------------------------------------------------------------------
// 2. LeetCode (GraphQL)
// ---------------------------------------------------------------------------
async function fetchLeetCode() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum { difficulty count }
            }
          }
        }`,
        variables: { username: "yasin_1" },
      }),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const subs = data?.data?.matchedUser?.submitStats?.acSubmissionNum as
      { difficulty: string; count: number }[] | undefined;
    const all = subs?.find((s) => s.difficulty === "All");
    if (all?.count) {
      return { solved: all.count as number | string, handle: "yasin_1", live: true };
    }
  } catch (_) { /* swallow */ }
  return { ...FALLBACK.leetcode };
}

// ---------------------------------------------------------------------------
// 3. CodeChef  — unofficial profile scrape (best-effort)
// ---------------------------------------------------------------------------
async function fetchCodeChef() {
  try {
    const res = await fetch("https://www.codechef.com/users/yasin_alam", {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("non-200");
    const html = await res.text();

    // Rating appears as e.g. <div class="rating-number">1374</div>
    const match = html.match(/class="rating-number"[^>]*>(\d+)</);
    if (match?.[1]) {
      return { rating: parseInt(match[1], 10), handle: "yasin_alam", live: true };
    }
  } catch (_) { /* swallow */ }
  return { ...FALLBACK.codechef };
}

// ---------------------------------------------------------------------------
// GET /api/stats
// All three fetches run in parallel with a 4s timeout guard each
// ---------------------------------------------------------------------------
export async function GET() {
  const [codeforces, leetcode, codechef] = await Promise.all([
    withTimeout(fetchCodeforces(), 4000, FALLBACK.codeforces),
    withTimeout(fetchLeetCode(),   4000, FALLBACK.leetcode),
    withTimeout(fetchCodeChef(),   4000, FALLBACK.codechef),
  ]);

  return NextResponse.json(
    { leetcode, codechef, codeforces },
    {
      status: 200,
      headers: {
        // ISR-style: serve stale for up to 1h, then revalidate in background
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
