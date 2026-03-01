import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Fetch Codeforces Stats
        const cfResponse = await fetch('https://codeforces.com/api/user.info?handles=MD_YASIN', { next: { revalidate: 3600 } });
        const cfData = await cfResponse.json();
        let cfRating = 912; // fallback
        if (cfData.status === 'OK' && cfData.result && cfData.result.length > 0) {
            cfRating = cfData.result[0].rating || 912;
        }

        // 2. Fetch LeetCode Stats (GraphQL)
        let lcSolved = 220; // fallback
        try {
            const lcResponse = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com',
                },
                body: JSON.stringify({
                    query: `
            query userPublicProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `,
                    variables: { username: 'yasin_1' },
                }),
                next: { revalidate: 3600 }
            });
            const lcData = await lcResponse.json();
            const acSubmissions = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum;
            if (acSubmissions && Array.isArray(acSubmissions)) {
                const allCategory = acSubmissions.find((s: any) => s.difficulty === 'All');
                if (allCategory && allCategory.count) {
                    lcSolved = allCategory.count;
                }
            }
        } catch (e) {
            console.error("LeetCode fetch error", e);
        }

        return NextResponse.json({
            codeforces: {
                rating: cfRating,
                handle: 'MD_YASIN'
            },
            leetcode: {
                solved: lcSolved,
                handle: 'yasin_1'
            }
        });

    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return NextResponse.json({
            codeforces: { rating: 912, handle: 'MD_YASIN' },
            leetcode: { solved: 220, handle: 'yasin_1' }
        }, { status: 500 });
    }
}
