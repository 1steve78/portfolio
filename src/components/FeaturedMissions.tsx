"use client";

import { motion } from "framer-motion";
import { ExternalLink, Shield } from "lucide-react";
import Link from "next/link";

const featuredMissions = [
    {
        id: "trustlens",
        title: "TrustLens AI",
        role: "AI Powered Cybersafety Platform",
        desc: "Built an AI-driven scam simulation platform with adaptive AI scammer behavior. Analyzes manipulation tactics via LLM-based analysis in real-time.",
        stack: ["Next.js", "Mistral AI", "Prisma", "PostgreSQL"],
        link: "/projects",
    },
    {
        id: "heritagelens",
        title: "Heritage-Lens",
        role: "Cultural Heritage Explorer",
        desc: "A platform utilizing structured data models and OpenRouter API integration to explore and preserve historical heritage through dynamic AI interactions.",
        stack: ["Next.js", "OpenRouter API", "Tailwind CSS", "React"],
        link: "/projects",
    }
];

export default function FeaturedMissions() {
    return (
        <div className="w-full relative py-8">
            {/* Header section */}
            <div className="flex items-center gap-3 mb-8">
                <Shield className="w-6 h-6 text-tx-muted" />
                <h2 className="text-2xl font-bold tracking-tighter text-tx-primary">Featured Missions</h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-border-token to-transparent ml-4" />
            </div>

            <div className="flex flex-col gap-8">
                {featuredMissions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", mass: 2.5, damping: 20, stiffness: 100, delay: index * 0.2 }}
                        className={`relative group w-full rounded-3xl overflow-hidden bg-surface border border-border-token hover:border-accent-pop/50 transition-colors duration-500 block h-auto sm:h-[400px]`}
                    >
                        {/* Abstract holographic glow behind the content */}
                        <div className={`absolute inset-x-0 -top-40 h-80 bg-accent-pop/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50`} />

                        {/* Simple subtle background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-accent-pop/5 via-transparent to-transparent pointer-events-none`} />

                        {/* Content */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 sm:p-10">
                            <div className={`inline-block px-3 py-1 bg-accent-pop/10 border border-accent-pop/20 text-accent-pop text-xs font-mono rounded-full mb-4 w-fit`}>
                                &gt; STATUS: CLASSIFIED_SUCCESS
                            </div>

                            <h3 className={`text-2xl sm:text-5xl font-bold text-tx-primary mb-2 tracking-tight group-hover:text-accent-pop transition-colors duration-300`}>
                                {mission.title}
                            </h3>
                            <h4 className="text-lg text-tx-muted font-medium mb-4">
                                {mission.role}
                            </h4>

                            <p className="text-sm sm:text-base text-tx-muted max-w-2xl leading-relaxed mb-6">
                                {mission.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {mission.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-raised border border-border-token rounded-md text-xs text-tx-muted font-mono tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link href={mission.link} className={`flex items-center justify-center gap-2 w-full sm:w-fit px-4 sm:px-6 py-3 bg-raised border border-border-token text-tx-primary font-semibold rounded-xl hover:bg-accent-pop hover:border-accent-pop hover:text-canvas transition-colors duration-300 group/btn`}>
                                <span>Access Mission Report</span>
                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
