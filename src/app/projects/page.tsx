"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Database, FileText, Bot, Monitor } from "lucide-react";
import Link from "next/link";
import React from "react";

const missions = [
    {
        title: "TrustLens AI",
        problem: "Users lack practical, safe environments to train against real-world social engineering and scam tactics.",
        solution: "Built an AI-driven scam simulation platform with adaptive attacker behavior. Analyzes manipulation tactics (urgency, authority) in real-time with a scalable Next.js and PostgreSQL backend.",
        techStack: ["Next.js", "Mistral AI", "Prisma", "PostgreSQL"],
        github: "#",
        live: "#",
        architecture: [
            { step: "User Response", icon: <Monitor className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> },
            { step: "Next.js API", icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
            { step: "Prisma -> PG", icon: <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
            { step: "Mistral Eval", icon: <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
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
            { step: "Discover", icon: <Monitor className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> },
            { step: "Next.js Edge", icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
            { step: "Story Gen", icon: <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
            { step: "UI Render", icon: <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
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
            { step: "Resume Parsing", icon: <FileText className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> },
            { step: "Skill Extract", icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
            { step: "Job Matching", icon: <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
            { step: "RAG Guidance", icon: <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
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
            { step: "Knowledge Check", icon: <FileText className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> },
            { step: "Behavior Tracking", icon: <Monitor className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
            { step: "AI Analysis", icon: <Bot className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
            { step: "Validation", icon: <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
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
            { step: "EJS Render", icon: <Monitor className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> },
            { step: "Express/Passport", icon: <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
            { step: "MVC Controller", icon: <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
            { step: "MongoDB", icon: <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
        ]
    }
];

function MissionCard({ mission, idx }: { mission: any, idx: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="group relative h-full flex flex-col p-6 sm:p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl transition-all duration-300 overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] shadow-sm dark:shadow-none"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
                <div className="flex flex-col xl:flex-row justify-between items-start mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {mission.title}
                    </h2>
                    <div className="flex gap-2 shrink-0">
                        <Link href={mission.github} className="p-2 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-transparent transition-all">
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link href={mission.live} className="p-2 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-zinc-50 dark:hover:bg-transparent transition-all">
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-6 grow">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold mb-1">The Problem</h3>
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{mission.problem}</p>
                    </div>
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold mb-1">Architecture</h3>
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{mission.solution}</p>
                    </div>
                </div>

                {/* Architecture Flow Diagram */}
                <div className="mb-6 py-4 overflow-x-auto invisible-scrollbar">
                    <div className="flex items-center justify-start min-w-max">
                        {mission.architecture.map((node: any, i: number) => (
                            <div key={node.step} className="flex items-center">
                                <div className="flex flex-col items-center gap-2 group/node">
                                    <div className="p-2 sm:p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm dark:shadow-lg group-hover/node:border-cyan-500/50 group-hover/node:bg-cyan-500/5 transition-colors">
                                        {node.icon}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block max-w-[60px] text-center">{node.step}</span>
                                </div>
                                {i < mission.architecture.length - 1 && (
                                    <div className="w-6 sm:w-8 h-px bg-zinc-300 dark:bg-zinc-700 mx-1 sm:mx-2 relative overflow-hidden">
                                        <motion.div
                                            animate={{ x: [-20, 40] }}
                                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                                            className="absolute top-[-1px] left-0 w-3 h-[3px] bg-cyan-400 blur-[1px]"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                    {mission.techStack.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 text-[10px] sm:text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-700/50">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <main className="min-h-screen pt-32 pb-16 px-4 sm:px-12 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                >
                    <div>
                        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono rounded-full mb-4">
                            &gt; STATUS: DEPLOYED
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                            Classified Missions
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
                            A log of deployed systems, agentic architectures, and prototypes.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {missions.map((mission, idx) => (
                        <MissionCard key={mission.title} mission={mission} idx={idx} />
                    ))}
                </div>
            </div>
        </main>
    );
}
