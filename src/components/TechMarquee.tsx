"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Server, TerminalSquare, Workflow, Code2, Layers, Cloud, BrainCircuit } from "lucide-react";

const techStack = [
    { name: "Next.js", icon: <Layers className="w-4 h-4" /> },
    { name: "React", icon: <Code2 className="w-4 h-4" /> },
    { name: "TypeScript", icon: <TerminalSquare className="w-4 h-4" /> },
    { name: "Node.js", icon: <Server className="w-4 h-4" /> },
    { name: "Python", icon: <TerminalSquare className="w-4 h-4" /> },
    { name: "FastAPI", icon: <Workflow className="w-4 h-4" /> },
    { name: "C++", icon: <Cpu className="w-4 h-4" /> },
    { name: "PyTorch", icon: <BrainCircuit className="w-4 h-4" /> },
    { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
    { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
    { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
    { name: "Docker", icon: <Server className="w-4 h-4" /> },
];

export default function TechMarquee() {
    // We duplicate the array multiple times to create a seamless infinite loop
    const duplicatedStack = [...techStack, ...techStack, ...techStack];

    return (
        <div className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-950/30 backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-2xl">
            {/* Edge Gradients for fading effect */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-zinc-50 dark:from-[#050505] to-transparent z-10 pointer-events-none sm:rounded-l-2xl" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-zinc-50 dark:from-[#050505] to-transparent z-10 pointer-events-none sm:rounded-r-2xl" />

            {/* Scrolling Track */}
            <motion.div
                className="flex gap-4 sm:gap-6 w-max"
                animate={{ x: ["0%", "-33.333333%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35, // Adjust speed: higher is slower
                }}
            >
                {duplicatedStack.map((tech, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-white/60 dark:bg-black/60 text-zinc-700 dark:text-zinc-400 text-sm sm:text-base whitespace-nowrap shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.01)] hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-default"
                    >
                        <span className="text-cyan-600 dark:text-cyan-500/70">{tech.icon}</span>
                        <span className="tracking-wide font-mono">{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
