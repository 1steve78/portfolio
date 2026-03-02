"use client";

import TechMarquee from "@/components/TechMarquee";
import LiveStatsWidget from "@/components/LiveStatsWidget";
import ExecutionTrace from "@/components/ExecutionTrace";
import FeaturedMissions from "@/components/FeaturedMissions";
import EncryptedContact from "@/components/EncryptedContact";
import GlobalEasterEggs from "@/components/GlobalEasterEggs";
import TerminalIntro from "@/components/TerminalIntro";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BrainCircuit, Cpu, Workflow, ArrowRight, Terminal, Github, Linkedin, Code2, TerminalSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const pillars = [
  {
    title: "AI Systems & Gen AI",
    description: "Architecting neural networks and custom LLM integrations for enterprise scale.",
    icon: <BrainCircuit className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
    color: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
  },
  {
    title: "Full-Stack",
    description: "High-performance React & Node.js systems. Scalable architectures from database to UI.",
    icon: <Workflow className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />,
    color: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
  },
  {
    title: "Competitive",
    description: "Algorithmic problem solving & logic. Live metrics synced directly from primary platforms.",
    icon: <Cpu className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />,
    color: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
  },
];

function BentoCard({ children, delay, className = "", hoverColorClass = "group-hover:border-zinc-500/50" }: { children: React.ReactNode; delay: number; className?: string; hoverColorClass?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`group relative p-5 sm:p-8 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl transition-all duration-300 overflow-hidden ${hoverColorClass} ${className}`}
    >
      <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>{children}</div>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden font-sans">
      <GlobalEasterEggs />

      {/* Background glowing/mesh effects */}
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="z-10 w-full max-w-7xl mx-auto h-full flex items-center justify-center pt-16 lg:pt-0">

        {/* Main Content Container */}
        <div className="flex flex-col gap-8 w-full">

          {/* 1. Hero Profile / Mission Block */}
          <BentoCard delay={0.2} className="w-full flex flex-col justify-center" hoverColorClass="group-hover:border-cyan-400/50 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.5 }}>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tighter mb-4 text-zinc-900 dark:text-white">
                Md Yasin Alam.
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  AI-Powered Web Architect.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                Engineering next-generation AI-integrated systems and high-performance web architectures with cyberpunk precision. This is my digital lab.
              </p>
            </motion.div>
          </BentoCard>

          {/* 2. Terminal Block (Wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative group rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-md overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-colors duration-500 flex h-[300px]"
          >
            {/* Neon top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <div className="w-full h-full relative z-10">
              <TerminalIntro />
            </div>
          </motion.div>

          {/* 2.5 Tech Stack Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <TechMarquee />
          </motion.div>

          {/* 3. Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {pillars.map((pillar, index) => (
              <BentoCard key={pillar.title} delay={0.4 + index * 0.15} className="w-full" hoverColorClass={pillar.color}>
                <div className="mb-auto">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-black/5 dark:bg-zinc-900/80 border border-black/10 dark:border-white/5 shadow-inner">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">{pillar.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4 flex-grow">
                  {pillar.description}
                </p>
                {pillar.title === "Competitive" && (
                  <div className="w-full mt-auto">
                    <LiveStatsWidget />
                  </div>
                )}
              </BentoCard>
            ))}
          </div>

          {/* 3.5 Experience Timeline */}
          <div className="w-full">
            <ExecutionTrace />
          </div>

          {/* 3.8 Featured Missions */}
          <div className="w-full">
            <FeaturedMissions />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            {/* 4. Call to Action: Access Missions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="w-full flex"
            >
              <Link
                href="/projects"
                className="group relative w-full flex items-center justify-between p-5 sm:p-8 bg-zinc-100 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 dark:from-zinc-200 to-zinc-300 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-zinc-900 text-xl sm:text-2xl font-bold tracking-tight">Access Missions</span>
                <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-200 dark:bg-black flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-zinc-900 dark:text-white" />
                </div>
              </Link>
            </motion.div>

            {/* 5. Call to Action: Terminal Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="w-full flex"
            >
              <Link
                href="/capabilities"
                className="group relative w-full flex items-center justify-between p-5 sm:p-8 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 dark:from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-zinc-700 dark:text-zinc-300 text-lg sm:text-xl font-medium tracking-wide flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  Open System Interface
                </span>
                <div className="relative z-10 text-cyan-600 dark:text-cyan-500 font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  {'// execute'}
                </div>
              </Link>
            </motion.div>
          </div>

          {/* 6. Social Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full mb-8">
            <Link href="https://github.com/1steve78" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl hover:border-zinc-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300">
              <Github className="w-8 h-8 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white mb-3 transition-colors duration-300" />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium tracking-wide text-sm sm:text-base">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/md-yasin-alam-895039267" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <Linkedin className="w-8 h-8 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 mb-3 transition-colors duration-300" />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium tracking-wide text-sm sm:text-base">LinkedIn</span>
            </Link>
            <Link href="https://leetcode.com/u/yasin_1/" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl hover:border-yellow-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]">
              <Code2 className="w-8 h-8 text-zinc-500 dark:text-zinc-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 mb-3 transition-colors duration-300" />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium tracking-wide text-sm sm:text-base">LeetCode</span>
            </Link>
            <Link href="https://codeforces.com/profile/MD_YASIN" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-2xl hover:border-red-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <TerminalSquare className="w-8 h-8 text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-red-400 mb-3 transition-colors duration-300" />
              <span className="text-zinc-700 dark:text-zinc-300 font-medium tracking-wide text-sm sm:text-base">Codeforces</span>
            </Link>
          </div>

          {/* 7. Encrypted Contact Section */}
          <div className="w-full">
            <EncryptedContact />
          </div>

        </div>
      </div>
    </main>
  );
}
