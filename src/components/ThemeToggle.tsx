"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9 border border-black/10 dark:border-white/10 rounded-lg flex items-center justify-center bg-transparent opacity-0 text-transparent" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 border border-zinc-200 dark:border-white/10 rounded-lg flex items-center justify-center bg-transparent group hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300"
            aria-label="Toggle Theme"
        >
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 scale-100 dark:scale-0 opacity-100 dark:opacity-0 rotate-0 dark:rotate-90">
                <Sun className="w-4 h-4 text-zinc-600 group-hover:text-black transition-colors" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 scale-0 dark:scale-100 opacity-0 dark:opacity-100 -rotate-90 dark:rotate-0">
                <Moon className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            </div>
        </button>
    );
}
