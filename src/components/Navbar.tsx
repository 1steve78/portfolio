import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border-token bg-canvas/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-mono text-tx-primary font-bold tracking-wider hover:text-accent-pop transition-colors text-sm sm:text-base">
                    MD_YASIN_
                </Link>
                <div className="flex items-center gap-3 sm:gap-8 text-xs sm:text-sm font-medium">
                    <div className="flex gap-3 sm:gap-8 text-tx-muted">
                        <Link href="/projects" className="hover:text-accent-pop transition-colors">
                            [ Missions ]
                        </Link>
                        <Link href="/capabilities" className="hover:text-accent-pop transition-colors">
                            [ Capabilities ]
                        </Link>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
