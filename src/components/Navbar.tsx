import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-black/40 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
                    MD_YASIN_
                </Link>
                <div className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
                    <div className="flex gap-4 sm:gap-8 text-zinc-600 dark:text-zinc-400">
                        <Link href="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                            [ Missions ]
                        </Link>
                        <Link href="/capabilities" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                            [ Capabilities ]
                        </Link>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
