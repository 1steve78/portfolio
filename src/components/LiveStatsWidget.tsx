"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Code2, Cpu, Wifi, WifiOff } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PlatformStat {
  rating?: number | string;
  solved?: number | string;
  handle: string;
  live: boolean;
}

interface StatsPayload {
  leetcode:   PlatformStat;
  codechef:   PlatformStat;
  codeforces: PlatformStat;
}

const FALLBACK: StatsPayload = {
  leetcode:   { solved: "220+", handle: "yasin_1",    live: false },
  codechef:   { rating: 1374,   handle: "yasin_alam",  live: false },
  codeforces: { rating: 912,    handle: "MD_YASIN",    live: false },
};

// ---------------------------------------------------------------------------
// Glow animation for live numbers
// ---------------------------------------------------------------------------
const glowVariants = {
  initial: { opacity: 0, y: 6, scale: 0.92 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const pulseBadge = {
  animate: {
    boxShadow: [
      "0 0 0px 0px rgba(34,197,94,0)",
      "0 0 8px 3px rgba(34,197,94,0.35)",
      "0 0 0px 0px rgba(34,197,94,0)",
    ],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

// ---------------------------------------------------------------------------
// Subcomponent: a single stat row
// ---------------------------------------------------------------------------
function StatRow({
  icon,
  label,
  value,
  suffix,
  handle,
  live,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix: string;
  handle: string;
  live: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`relative flex items-center justify-between px-4 py-3 rounded-2xl
        bg-surface border border-border-token
        hover:border-accent-pop hover:shadow-accent-glow transition-all duration-300 overflow-hidden group`}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-white/[0.03] to-transparent rounded-2xl" />

      {/* Left: icon + label */}
      <div className="flex items-center gap-3 z-10">
        <div className={`p-2 rounded-lg bg-raised border border-border-token group-hover:border-accent-pop/50 transition-colors`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-tx-muted tracking-widest uppercase">
            {label}
          </p>
          <p className="text-[10px] text-tx-muted font-mono">@{handle}</p>
        </div>
      </div>

      {/* Right: animated value */}
      <div className="flex flex-col items-end z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={String(value)}
            variants={glowVariants}
            initial="initial"
            animate="animate"
            className={`text-lg font-black font-mono tracking-tight text-tx-primary group-hover:text-accent-pop transition-colors`}
            style={live ? {
              textShadow: "0 0 12px currentColor",
            } : undefined}
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className="text-[10px] text-tx-muted font-mono uppercase tracking-widest">
          {suffix}
        </span>
      </div>

      {/* Live/offline dot */}
      <div className="absolute top-2 right-2">
        {live ? (
          <motion.span
            variants={pulseBadge}
            animate="animate"
            className="block w-1.5 h-1.5 rounded-full bg-accent-pop"
          />
        ) : (
          <span className="block w-1.5 h-1.5 rounded-full bg-tx-muted/50" />
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main widget
// ---------------------------------------------------------------------------
export default function LiveStatsWidget() {
  const [stats, setStats] = useState<StatsPayload>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("non-200");
        const data: StatsPayload = await res.json();
        if (!cancelled) {
          setStats(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
        // fallback already set as initial state — nothing to do
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const anyLive = stats.codeforces.live || stats.leetcode.live || stats.codechef.live;

  return (
    <div className="flex flex-col gap-2.5 mt-4 w-full">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-tx-muted">
          Competitive Metrics
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-tx-muted">
          {loading ? (
            <span className="animate-pulse">Syncing…</span>
          ) : error ? (
            <>
              <WifiOff className="w-3 h-3 text-tx-muted" />
              <span>Offline — showing cached</span>
            </>
          ) : (
            <>
              <Wifi className={`w-3 h-3 ${anyLive ? "text-accent-pop" : "text-tx-muted"}`} />
              <span>{anyLive ? "Live" : "Fallback"}</span>
            </>
          )}
        </div>
      </div>

      {/* ── Codeforces ── */}
      <StatRow
        icon={<TerminalSquare className="w-4 h-4 text-tx-primary group-hover:text-accent-pop transition-colors" />}
        label="Codeforces"
        value={loading ? "—" : stats.codeforces.rating!}
        suffix="rating"
        handle={stats.codeforces.handle}
        live={stats.codeforces.live}
      />

      {/* ── CodeChef ── */}
      <StatRow
        icon={<Cpu className="w-4 h-4 text-tx-primary group-hover:text-accent-pop transition-colors" />}
        label="CodeChef"
        value={loading ? "—" : stats.codechef.rating!}
        suffix="rating"
        handle={stats.codechef.handle}
        live={stats.codechef.live}
      />

      {/* ── LeetCode ── */}
      <StatRow
        icon={<Code2 className="w-4 h-4 text-tx-primary group-hover:text-accent-pop transition-colors" />}
        label="LeetCode"
        value={loading ? "—" : stats.leetcode.solved!}
        suffix="solved"
        handle={stats.leetcode.handle}
        live={stats.leetcode.live}
      />

      {/* ── Footer ping ── */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-end gap-2 mt-0.5"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-tx-muted">
            {anyLive ? "Live Sync Active" : "Cached Data"}
          </span>
          <span className="relative flex h-1.5 w-1.5">
            {anyLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-pop opacity-60" />
            )}
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${anyLive ? "bg-accent-pop" : "bg-tx-muted/50"}`} />
          </span>
        </motion.div>
      )}
    </div>
  );
}
