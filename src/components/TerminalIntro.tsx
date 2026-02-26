"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const lines = [
    "> Booting Md_Yasin.exe...",
    "> Identity: AI Systems Engineer in Progress | Full-Stack Developer",
    "> Status: Building Intelligent Systems & Agentic Workflows...",
    "> Loading modules: C++ | React/Next.js | Python/FastAPI",
    "> Ready. Type 'help' to see available commands."
];

export default function TerminalIntro() {
    const router = useRouter();
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [bootComplete, setBootComplete] = useState(false);

    // Interactive part
    const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    // Boot sequence effect
    useEffect(() => {
        if (bootComplete) return;

        if (currentLineIndex >= lines.length) {
            setBootComplete(true);
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    if (!newLines[currentLineIndex]) {
                        newLines[currentLineIndex] = "";
                    }
                    newLines[currentLineIndex] += currentLine[currentCharIndex];
                    return newLines;
                });
                setCurrentCharIndex((prev) => prev + 1);
            }, Math.random() * 20 + 10);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [currentCharIndex, currentLineIndex, bootComplete]);

    // Keep input focused
    useEffect(() => {
        if (bootComplete && inputRef.current) {
            inputRef.current.focus();
        }
    }, [bootComplete]);

    // Auto-scroll to bottom
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [history, displayedLines]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        let output: string | React.ReactNode = "";

        switch (cmd) {
            case "help":
                output = (
                    <div className="text-zinc-400 mt-1">
                        Available commands:<br />
                        <span className="text-cyan-400">projects</span>     - Access Classified Missions<br />
                        <span className="text-purple-400">capabilities</span> - View deployable skills & services<br />
                        <span className="text-emerald-400">contact</span>      - Initialize connection protocol<br />
                        <span className="text-zinc-500">clear</span>        - Clear terminal output<br />
                        <span className="text-orange-400">whoami</span>       - Identify current user<br />
                        <span className="text-yellow-400">ls</span>           - List directory contents<br />
                        <span className="text-blue-400">pwd</span>          - Print working directory
                    </div>
                );
                break;
            case "projects":
                output = <span className="text-cyan-400 mt-1">Initiating jump to Missions log...</span>;
                setTimeout(() => router.push("/projects"), 800);
                break;
            case "capabilities":
                output = <span className="text-purple-400 mt-1">Accessing engineering services...</span>;
                setTimeout(() => router.push("/capabilities"), 800);
                break;
            case "contact":
                output = <span className="text-emerald-400 mt-1">Opening encrypted channel to <a href="mailto:yasinsteve4@gmail.com" className="text-white hover:underline">yasinsteve4@gmail.com</a></span>;
                break;
            case "whoami":
                output = <span className="text-zinc-300 mt-1">guest_user_99 (Unverified connection)</span>;
                break;
            case "ls":
                output = (
                    <div className="text-zinc-300 mt-1 flex gap-4">
                        <span className="text-blue-400">projects/</span>
                        <span className="text-blue-400">capabilities/</span>
                        <span className="text-emerald-400">contact.sh</span>
                        <span className="text-zinc-400">README.md</span>
                        <span className="text-red-400 hidden group-hover:inline">classified_data.enc</span>
                    </div>
                );
                break;
            case "pwd":
                output = <span className="text-zinc-300 mt-1">/home/yasin-lab/portfolio_v2</span>;
                break;
            case "cat readme.md":
                output = <span className="text-zinc-300 mt-1">Md Yasin Alam. Building AI Systems. Welcome to my digital lab. Type 'help' to navigate.</span>;
                break;
            case "sudo":
                output = <span className="text-red-400 mt-1">Nice try. This incident will be reported.</span>;
                break;
            case "rm -rf /":
                output = <span className="text-red-500 mt-1 font-bold">SYSTEM ALERT: Unauthorized deletion attempt blocked by Spirit Gate AI.</span>;
                break;
            case "ping":
                output = <span className="text-zinc-300 mt-1">Pong! System latency: {Math.floor(Math.random() * 20) + 1}ms</span>;
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            default:
                if (cmd.startsWith("echo ")) {
                    output = <span className="text-zinc-300 mt-1">{input.substring(5)}</span>;
                } else {
                    output = <span className="text-red-400 mt-1">Command not found: {cmd}. Type 'help' for available commands.</span>;
                }
        }

        setHistory(prev => [...prev, { command: input, output }]);
        setInput("");
    };

    return (
        <div
            ref={scrollContainerRef}
            className="w-full max-w-3xl border border-zinc-700/50 bg-black/60 backdrop-blur-md rounded-xl p-6 font-mono text-sm sm:text-base text-zinc-300 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group cursor-text h-[350px] overflow-y-auto custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Window controls */}
            <div className="flex gap-2 mb-6 sticky top-0 bg-black/80 backdrop-blur pb-2 z-10 -mt-2 -mx-2 px-2 pt-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-auto text-xs text-zinc-600">terminal@yasin-lab ~</div>
            </div>

            <div className="flex flex-col space-y-2 relative z-0">
                {/* Boot Sequence */}
                {displayedLines.map((line, index) => (
                    <div key={`boot-${index}`} className="flex">
                        <span className={line.includes("Ready") ? "text-emerald-400" : "text-zinc-300"}>{line}</span>
                        {!bootComplete && index === currentLineIndex && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-5 bg-cyan-400 ml-1 inline-block align-middle"
                            />
                        )}
                    </div>
                ))}

                {/* History */}
                {bootComplete && history.map((item, i) => (
                    <div key={`hist-${i}`} className="flex flex-col space-y-1 mb-2">
                        <div className="flex">
                            <span className="text-cyan-400 mr-2">guest@yasin-lab:~$</span>
                            <span className="text-white">{item.command}</span>
                        </div>
                        {item.output}
                    </div>
                ))}

                {/* Active Input Line */}
                {bootComplete && (
                    <form onSubmit={handleCommand} className="flex mt-2 pb-4">
                        <span className="text-cyan-400 mr-2 shrink-0">guest@yasin-lab:~$</span>
                        <div className="relative flex-1 flex items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-transparent outline-none border-none text-white font-mono break-all"
                                autoComplete="off"
                                spellCheck="false"
                                autoFocus
                            />
                            {/* Fake cursor when input is focused empty (optional visual flair) */}
                            {!input && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="absolute left-0 top-0.5 w-2 h-5 bg-cyan-400 pointer-events-none"
                                />
                            )}
                        </div>
                    </form>
                )}

                <div ref={terminalEndRef} />
            </div>
        </div>
    );
}
