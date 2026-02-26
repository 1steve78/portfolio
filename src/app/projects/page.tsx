"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Database, FileText, Bot, Monitor } from "lucide-react";
import Link from "next/link";

const missions = [
    {
        title: "TrustLens AI",
        problem: "Users lack practical, safe environments to train against real-world social engineering and scam tactics.",
        solution: "Built an AI-driven scam simulation platform with adaptive attacker behavior. Analyzes manipulation tactics (urgency, authority) in real-time with a scalable Next.js and PostgreSQL backend.",
        techStack: ["Next.js", "Mistral AI", "Prisma", "PostgreSQL"],
        github: "#",
        live: "#",
        architecture: [
            { step: "User Response", icon: <Monitor className="w-5 h-5 text-zinc-400" /> },
            { step: "Next.js API", icon: <Bot className="w-5 h-5 text-emerald-400" /> },
            { step: "Prisma -> PG", icon: <Database className="w-5 h-5 text-cyan-400" /> },
            { step: "Mistral Eval", icon: <FileText className="w-5 h-5 text-purple-400" /> },
        ]
    },
    {
        title: "Heritage-Lens",
        problem: "Indian heritage preservation lacks engaging, AI-powered interactive storytelling for education.",
        solution: "Developed an AI-based digital cultural preservation platform integrating interactive storytelling via OpenRouter and structured data models.",
        techStack: ["React", "Next.js", "OpenRouter API", "Tailwind CSS"],
        github: "#",
        live: "#",
        architecture: [
            { step: "Discover", icon: <Monitor className="w-5 h-5 text-zinc-400" /> },
            { step: "Next.js Edge", icon: <Bot className="w-5 h-5 text-emerald-400" /> },
            { step: "Story Gen", icon: <FileText className="w-5 h-5 text-cyan-400" /> },
            { step: "UI Render", icon: <Database className="w-5 h-5 text-purple-400" /> },
        ]
    },
    {
        title: "Rozgaar.ai",
        problem: "Early-career talent struggles to find roles that fit their unique skills using generic job boards.",
        solution: "Built a skill-driven job discovery platform combining AI resume extraction, smart matching, and multi-source job ingestion using Supabase and Drizzle ORM.",
        techStack: ["Next.js", "Supabase", "Drizzle ORM", "Groq AI"],
        github: "#",
        live: "#",
        architecture: [
            { step: "Resume Parsing", icon: <FileText className="w-5 h-5 text-zinc-400" /> },
            { step: "Skill Extract", icon: <Bot className="w-5 h-5 text-emerald-400" /> },
            { step: "Job Matching", icon: <Database className="w-5 h-5 text-cyan-400" /> },
            { step: "RAG Guidance", icon: <Monitor className="w-5 h-5 text-purple-400" /> },
        ]
    },
    {
        title: "Spirit Gate",
        problem: "Traditional CAPTCHAs are boring and standard bot detection is easily bypassed by modern automation.",
        solution: "Built a fun, anime-themed puzzle CAPTCHA that protects applications using a multi-layer defense. Combines human cultural knowledge checks with real-time AI behavior analysis (mouse trajectory, timing).",
        techStack: ["React 19", "Framer Motion", "Vite", "AI Behavior Analysis"],
        github: "#",
        live: "#",
        architecture: [
            { step: "Knowledge Check", icon: <FileText className="w-5 h-5 text-zinc-400" /> },
            { step: "Behavior Tracking", icon: <Monitor className="w-5 h-5 text-emerald-400" /> },
            { step: "AI Analysis", icon: <Bot className="w-5 h-5 text-cyan-400" /> },
            { step: "Validation", icon: <Database className="w-5 h-5 text-purple-400" /> },
        ]
    },
    {
        title: "WanderLust",
        problem: "Users need a secure, scalable platform to discover, create, and manage full-stack travel property listings securely.",
        solution: "Engineered a robust Node/Express backend following the MVC pattern. Handled secure sessions mapping to Passport.js, integrated MongoDB/Mongoose models, and routed image assets to Cloudinary.",
        techStack: ["Node.js", "Express", "MongoDB", "Passport.js", "EJS"],
        github: "https://github.com/1steve78/wanderlust",
        live: "#",
        architecture: [
            { step: "EJS Render", icon: <Monitor className="w-5 h-5 text-zinc-400" /> },
            { step: "Express/Passport", icon: <Bot className="w-5 h-5 text-emerald-400" /> },
            { step: "MVC Controller", icon: <Database className="w-5 h-5 text-cyan-400" /> },
            { step: "MongoDB", icon: <FileText className="w-5 h-5 text-purple-400" /> },
        ]
    }
];

export default function Projects() {
    return (
        <main className="min-h-screen pt-32 pb-16 px-6 sm:px-12 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-zinc-100">
                        Classified Missions
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        A log of deployed systems, agentic architectures, and prototypes.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {missions.map((mission, idx) => (
                        <motion.div
                            key={mission.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.2, duration: 0.6 }}
                            className="group relative"
                        >
                            {/* Left alignment line for desktop */}
                            <div className="hidden sm:block absolute -left-8 top-0 bottom-0 w-px bg-zinc-800 group-hover:bg-cyan-500/50 transition-colors" />

                            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                                    <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                        {mission.title}
                                    </h2>
                                    <div className="flex gap-3">
                                        <Link href={mission.github} className="p-2 bg-black rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                                            <Github className="w-5 h-5" />
                                        </Link>
                                        <Link href={mission.live} className="p-2 bg-black rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-500 transition-all">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">The Problem</h3>
                                        <p className="text-zinc-300 text-sm leading-relaxed">{mission.problem}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">The Architecture</h3>
                                        <p className="text-zinc-300 text-sm leading-relaxed">{mission.solution}</p>
                                    </div>
                                </div>

                                {/* Architecture Flow Diagram */}
                                <div className="mb-8 p-4 bg-black/60 rounded-xl border border-zinc-800/50 overflow-x-auto">
                                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4 text-center">System Flow</h3>
                                    <div className="flex items-center justify-center min-w-[500px]">
                                        {mission.architecture.map((node, i) => (
                                            <div key={node.step} className="flex items-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg">
                                                        {node.icon}
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs font-mono text-zinc-400">{node.step}</span>
                                                </div>
                                                {i < mission.architecture.length - 1 && (
                                                    <div className="w-12 h-px bg-zinc-700 mx-2 relative">
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-zinc-500 rotate-45" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {mission.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs font-mono rounded-md border border-zinc-700/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
