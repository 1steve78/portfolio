"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * ThemeToggle — switches between "obsidian" (dark) and "chalk" (light).
 *
 * Requires ThemeProvider in layout.tsx with:
 *   attribute="data-theme"
 *   defaultTheme="obsidian"
 *   themes={["obsidian", "chalk"]}
 *   enableSystem={false}
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  // Avoid SSR mismatch — only render after hydration
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const isObsidian = theme === "obsidian" || theme === "dark";

  const toggle = () => setTheme(isObsidian ? "chalk" : "obsidian");

  // Spring config — gentler when reduced motion requested
  const spring = prefersReduced
    ? { type: "tween" as const, duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 22 };

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${isObsidian ? "Chalk & Brass" : "Obsidian Ink"} theme`}
      title={isObsidian ? "Switch to Chalk & Brass (light)" : "Switch to Obsidian Ink (dark)"}
      whileHover={prefersReduced ? {} : { scale: 1.08 }}
      whileTap={prefersReduced ? {} : { scale: 0.94 }}
      transition={spring}
      className={`
        relative w-14 h-7 rounded-full p-0.5 cursor-pointer
        border transition-colors duration-300 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--accent-pop)] focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--background)]
        ${isObsidian
          ? "bg-[#1E1E26] border-white/10"
          : "bg-[#E8E6E1] border-[#1C1A16]/10"
        }
        ${className}
      `}
    >
      {/* Track fill */}
      <span className="sr-only">{isObsidian ? "Obsidian Ink (dark)" : "Chalk & Brass (light)"}</span>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={spring}
        className={`
          absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center
          shadow-md text-[13px] leading-none select-none
          ${isObsidian
            ? "left-0.5 bg-[#6366F1] shadow-[0_2px_8px_rgba(99,102,241,0.45)]"
            : "left-[calc(100%-1.625rem)] bg-[#B07D3A] shadow-[0_2px_8px_rgba(176,125,58,0.40)]"
          }
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isObsidian ? "moon" : "sun"}
            initial={prefersReduced ? {} : { opacity: 0, rotate: -30, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={prefersReduced ? {} : { opacity: 0, rotate: 30, scale: 0.6 }}
            transition={{ duration: prefersReduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {isObsidian ? "◐" : "☀"}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Theme label (optional, hidden by default, shown on wider navbars) */}
      <span
        className={`
          absolute inset-0 flex items-center pointer-events-none
          font-mono text-[9px] tracking-widest uppercase font-semibold
          ${isObsidian ? "pl-8 text-white/30" : "pr-8 justify-end text-[#1C1A16]/30"}
        `}
        aria-hidden
      >
        {isObsidian ? "ink" : "chalk"}
      </span>
    </motion.button>
  );
}
