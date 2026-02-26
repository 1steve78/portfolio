import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-black/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-mono text-cyan-400 font-semibold tracking-wider hover:text-cyan-300 transition-colors">
                    MD_YASIN_
                </Link>
                <div className="flex gap-8 text-sm font-medium text-zinc-400">
                    <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                        [ Missions ]
                    </Link>
                    <Link href="/capabilities" className="hover:text-cyan-400 transition-colors">
                        [ Capabilities ]
                    </Link>
                </div>
            </div>
        </nav>
    );
}
