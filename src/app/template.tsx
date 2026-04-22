"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * template.tsx is a special Next.js file that wraps every route segment.
 * Unlike layout.tsx, template bounds remount on navigation, which perfectly
 * triggers the Framer Motion initial -> animate lifecycle on every page load.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      // Fast, snappy Apple curve: [0.16, 1, 0.3, 1]
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 20,
        filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)" 
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)" 
      }}
      transition={{ 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="w-full flex flex-col items-center flex-1"
    >
      {children}
    </motion.div>
  );
}
