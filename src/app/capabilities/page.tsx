"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Server, Cpu, Database, Network } from "lucide-react";
import React from "react";

const capabilities = [
    {
        title: "Gen AI & Agentic Systems",
        description: "Custom RAG pipelines, LangGraph-driven autonomous agents, and model integration (Mistral, Groq, OpenRouter).",
        icon: <Network className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
        stats: ["LangChain", "LLMs", "Generative AI"],
        hoverBorder: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
        gradientBg: "from-cyan-500/5"
    },
    {
        title: "Full-Stack engineering",
        description: "Production-ready web applications using Next.js, React, Tailwind CSS. Seamless UI/UX design.",
        icon: <Server className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />,
        stats: ["React Vite", "TypeScript", "Responsive"],
        hoverBorder: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
        gradientBg: "from-purple-500/5"
    },
    {
        title: "Backend & Databases",
        description: "Scalable API layers, ORMs, and structured databases. Node.js, Prisma, PostgreSQL, MongoDB, Supabase.",
        icon: <Database className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
        stats: ["PostgreSQL", "Prisma", "REST APIs"],
        hoverBorder: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
        gradientBg: "from-emerald-500/5"
    },
    {
        title: "Competitive Programming",
        description: "Deep algorithmic problem solving and optimization. 220+ LeetCode problems solved across complex sub-domains.",
        icon: <Cpu className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors" />,
        stats: ["C++", "Graphs/DP", "Logic Optimization"],
        hoverBorder: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]",
        gradientBg: "from-orange-500/5"
    },
];

function CapabilityCard({ cap, idx }: { cap: any, idx: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={`group relative flex flex-col p-6 sm:p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none min-h-[300px] ${cap.hoverBorder}`}
        >
            {/* Dynamic Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradientBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                <div className="mb-6 p-4 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl inline-flex shadow-sm dark:shadow-md group-hover:scale-110 transition-transform duration-300 w-fit">
                    {cap.icon}
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{cap.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                    {cap.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800/60 mt-auto">
                    {cap.stats.map((stat: string) => (
                        <span key={stat} className="text-[10px] sm:text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-950/80 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800">
                            /{stat}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Capabilities() {
    return (
        <main className="min-h-screen pt-32 pb-16 px-4 sm:px-12 relative overflow-hidden flex flex-col">
            {/* Background glowing effects */}
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-5xl mx-auto z-10 relative flex-grow w-full">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                >
                    <div>
                        <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono rounded-full mb-4">
                            &gt; PROTOCOL: ACTIVE
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                            Deployable Capabilities
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
                            From deep learning pipelines to highly concurrent backend services.
                            Systems engineered for scale, reliability, and intelligence.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 perspective-1000">
                    {capabilities.map((cap, idx) => (
                        <CapabilityCard key={cap.title} cap={cap} idx={idx} />
                    ))}
                </div>

                {/* Status terminal footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/60 rounded-xl max-w-2xl mx-auto text-center shadow-sm dark:shadow-none overflow-hidden relative group"
                >
                    {/* Subtle sweeping scanline background for footer purely aesthetic */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] h-[200%] w-full animate-scanline pointer-events-none -top-[100%]" />

                    <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse shrink-0" />
                        <span className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold">System Online</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-500 text-xs sm:text-sm font-mono relative z-10">
                        Ready to initialize new protocols. Open for collaboration.
                    </p>
                    <a href="mailto:yasinsteve4@gmail.com" className="inline-block relative z-10 mt-5 px-4 sm:px-6 py-2.5 max-w-full bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs sm:text-sm break-all sm:break-normal hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-cyan-500/50 transition-all rounded shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:-translate-y-0.5">
                        init_contact("yasinsteve4@gmail.com")
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
