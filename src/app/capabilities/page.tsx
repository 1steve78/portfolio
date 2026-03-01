"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Database, Network } from "lucide-react";

const capabilities = [
    {
        title: "Gen AI & Agentic Systems",
        description: "Custom RAG pipelines, LangGraph-driven autonomous agents, and model integration (Mistral, Groq, OpenRouter).",
        icon: <Network className="w-8 h-8 text-cyan-400" />,
        stats: ["LangChain", "LLMs", "Generative AI"],
    },
    {
        title: "Full-Stack engineering",
        description: "Production-ready web applications using Next.js, React, Tailwind CSS. Seamless UI/UX design.",
        icon: <Server className="w-8 h-8 text-purple-400" />,
        stats: ["React Vite", "TypeScript", "Responsive"],
    },
    {
        title: "Backend & Databases",
        description: "Scalable API layers, ORMs, and structured databases. Node.js, Prisma, PostgreSQL, MongoDB, Supabase.",
        icon: <Database className="w-8 h-8 text-emerald-400" />,
        stats: ["PostgreSQL", "Prisma", "REST APIs"],
    },
    {
        title: "Competitive Programming",
        description: "Deep algorithmic problem solving and optimization. 220+ LeetCode problems solved across complex sub-domains.",
        icon: <Cpu className="w-8 h-8 text-orange-400" />,
        stats: ["C++", "Graphs/DP", "Logic Optimization"],
    },
];

export default function Capabilities() {
    return (
        <main className="min-h-screen pt-32 pb-16 px-6 sm:px-12 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-5xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        Deployable Capabilities
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        From deep learning pipelines to highly concurrent backend services.
                        Systems engineered for scale, reliability, and intelligence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={cap.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                            className="group relative p-8 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm dark:shadow-none"
                        >
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/50 dark:from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="mb-6 p-4 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl inline-block shadow-sm dark:shadow-lg">
                                    {cap.icon}
                                </div>

                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{cap.title}</h2>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                                    {cap.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800/60">
                                    {cap.stats.map(stat => (
                                        <span key={stat} className="text-xs font-mono text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-950 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
                                            /{stat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Status terminal footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/60 rounded-xl max-w-2xl mx-auto text-center shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">System Online</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-500 text-sm font-mono">
                        Ready to initialize new protocols. Open for collaboration.
                    </p>
                    <a href="mailto:yasinsteve4@gmail.com" className="inline-block mt-4 px-6 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-transparent transition-colors rounded">
                        init_contact("yasinsteve4@gmail.com")
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
