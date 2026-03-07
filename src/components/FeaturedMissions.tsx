"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredMission = {
    title: "TrustLens AI",
    role: "AI Powered Cybersafety Platform",
    desc: "Built an AI-driven scam simulation platform with adaptive attacker behavior. Analyzes manipulation tactics (urgency, authority) in real-time with a scalable Next.js and PostgreSQL backend.",
    stack: ["Next.js", "Mistral AI", "Prisma", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    link: "/projects",
    color: "cyan"
};

export default function FeaturedMissions() {
    return (
        <div className="w-full relative py-8">
            {/* Header section */}
            <div className="flex items-center gap-3 mb-8">
                <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                <h2 className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">Featured Mission</h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-4" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-950/50 backdrop-blur-xl shadow-2xl hover:border-cyan-500/30 transition-colors duration-500 block h-[400px] sm:h-[450px]"
            >
                {/* Abstract holographic glow behind the content */}
                <div className="absolute inset-x-0 -top-40 h-80 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

                {/* Simple subtle background gradient instead of image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 sm:p-10">
                    <div className="inline-block px-3 py-1 bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono rounded-full mb-4 w-fit">
                        &gt; STATUS: CLASSIFIED_SUCCESS
                    </div>

                    <h3 className="text-2xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                        {featuredMission.title}
                    </h3>
                    <h4 className="text-lg text-zinc-700 dark:text-zinc-300 font-medium mb-4">
                        {featuredMission.role}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-6">
                        {featuredMission.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {featuredMission.stack.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md text-xs text-zinc-700 dark:text-zinc-300 font-mono tracking-widest">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <Link href={featuredMission.link} className="flex items-center justify-center gap-2 w-full sm:w-fit px-4 sm:px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors duration-300 group/btn">
                        <span>Access Mission Report</span>
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
