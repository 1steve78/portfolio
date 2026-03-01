"use client";

import { useEffect, useState } from "react";
import { TerminalSquare, Code2 } from "lucide-react";

export default function LiveStatsWidget({ fallbackLeetcode = 220, fallbackCodeforces = 912 }) {
    const [stats, setStats] = useState({
        codeforces: { rating: fallbackCodeforces, handle: "MD_YASIN" },
        leetcode: { solved: fallbackLeetcode, handle: "yasin_1" }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                if (data.codeforces && data.leetcode) {
                    setStats(data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col gap-3 mt-5 w-full">
            {/* Codeforces Stat */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-black/40 border border-zinc-200 dark:border-red-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(239,68,68,0.05)] hover:border-red-500/40 transition-colors duration-300">
                <div className="flex items-center gap-3">
                    <TerminalSquare className="w-5 h-5 text-red-600 dark:text-red-500/80" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-300">Codeforces</span>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-red-600 dark:text-red-400">
                        {loading ? "..." : stats.codeforces.rating} Rating
                    </div>
                    <div className="text-xs text-zinc-500 tracking-wider">@{stats.codeforces.handle}</div>
                </div>
            </div>

            {/* LeetCode Stat */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-black/40 border border-zinc-200 dark:border-yellow-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(234,179,8,0.05)] hover:border-yellow-500/40 transition-colors duration-300">
                <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-yellow-600 dark:text-yellow-500/80" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-300">LeetCode</span>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                        {loading ? "..." : stats.leetcode.solved}+ Solved
                    </div>
                    <div className="text-xs text-zinc-500 tracking-wider">@{stats.leetcode.handle}</div>
                </div>
            </div>

            <div className="text-[10px] text-zinc-500 mt-1 flex items-center justify-end gap-2 uppercase tracking-widest font-mono">
                {loading ? "Initializing link..." : "Live Sync Active"}
                <span className="relative flex h-2 w-2">
                    {!loading && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${loading ? 'bg-zinc-600' : 'bg-emerald-500'}`}></span>
                </span>
            </div>
        </div>
    );
}
