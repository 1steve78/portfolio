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
    icon: <BrainCircuit className="w-8 h-8 text-tx-primary group-hover:text-accent-pop group-hover:scale-110 transition-all duration-300" />,
    color: "group-hover:border-accent-pop group-hover:shadow-[0_0_24px_var(--accent-glow)]"
  },
  {
    title: "Full-Stack",
    description: "High-performance React & Node.js systems. Scalable architectures from database to UI.",
    icon: <Workflow className="w-8 h-8 text-tx-primary group-hover:text-accent-pop group-hover:scale-110 transition-all duration-300" />,
    color: "group-hover:border-accent-pop group-hover:shadow-[0_0_24px_var(--accent-glow)]"
  },
  {
    title: "Competitive",
    description: "Algorithmic problem solving & logic. Live metrics synced directly from primary platforms.",
    icon: <Cpu className="w-8 h-8 text-tx-primary group-hover:text-accent-pop group-hover:scale-110 transition-all duration-300" />,
    color: "group-hover:border-accent-pop group-hover:shadow-[0_0_24px_var(--accent-glow)]"
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
      className={`group relative p-5 sm:p-8 bg-surface border border-border-token rounded-2xl transition-all duration-300 overflow-hidden ${hoverColorClass} ${className}`}
    >
      <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>{children}</div>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-tx-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden font-sans">
      <GlobalEasterEggs />

      {/* Background noise effect with smooth fade-out at edges */}
      <div 
        className="fixed inset-0 bg-[url('/noise.svg')] opacity-15 pointer-events-none mix-blend-overlay" 
        style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)", maskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }}
      />

      <div className="z-10 w-full max-w-7xl mx-auto h-full flex items-center justify-center pt-16 lg:pt-0">

        {/* Main Content Container */}
        <div className="flex flex-col gap-8 w-full">

          {/* 1. Hero Profile / Mission Block */}
          <BentoCard delay={0.2} className="w-full flex flex-col justify-center" hoverColorClass="group-hover:border-cyan-400/50 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.5 }}>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tighter mb-4 text-tx-primary">
                Md Yasin Alam.
                <span className="block mt-2 text-accent-pop">
                  AI-Powered Web Architect.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-tx-muted leading-relaxed font-light">
                Engineering next-generation AI-integrated systems and high-performance web architectures with cyberpunk precision. This is my digital lab.
              </p>
            </motion.div>
          </BentoCard>

          {/* 2. Terminal Block (Wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative group rounded-2xl border border-border-token bg-raised overflow-hidden shadow-2xl hover:border-accent-pop/50 transition-colors duration-500 flex h-[300px]"
          >
            {/* Neon top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-pop to-transparent opacity-50" />
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
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-raised border border-border-token shadow-inner">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-tx-primary mb-2 tracking-tight">{pillar.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-tx-muted leading-relaxed mt-4 flex-grow">
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
                className="group relative w-full flex items-center justify-between p-5 sm:p-8 bg-surface border border-border-token rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-accent-pop transition-all duration-300"
              >
                <div className="absolute inset-0 bg-accent-pop/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-tx-primary text-xl sm:text-2xl font-bold tracking-tight">Access Missions</span>
                <div className="relative z-10 w-12 h-12 rounded-full bg-raised flex items-center justify-center group-hover:translate-x-2 group-hover:bg-accent-pop transition-all duration-300 text-tx-primary group-hover:text-canvas">
                  <ArrowRight className="w-6 h-6" />
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
                className="group relative w-full flex items-center justify-between p-5 sm:p-8 bg-surface border border-border-token rounded-2xl overflow-hidden hover:border-accent-pop hover:bg-raised transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-pop/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-tx-primary text-lg sm:text-xl font-medium tracking-wide flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-accent-pop" />
                  Open System Interface
                </span>
                <div className="relative z-10 text-accent-pop font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  {'// execute'}
                </div>
              </Link>
            </motion.div>
          </div>

          {/* 6. Social Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full mb-8">
            <Link href="https://github.com/1steve78" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-surface border border-border-token rounded-2xl hover:border-accent-pop hover:bg-raised transition-all duration-300 shadow-accent-glow">
              <Github className="w-8 h-8 text-tx-muted group-hover:text-accent-pop mb-3 transition-colors duration-300" />
              <span className="text-tx-primary font-medium tracking-wide text-sm sm:text-base">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/md-yasin-alam-895039267" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-surface border border-border-token rounded-2xl hover:border-accent-pop hover:bg-raised transition-all duration-300 hover:shadow-accent-glow">
              <Linkedin className="w-8 h-8 text-tx-muted group-hover:text-accent-pop mb-3 transition-colors duration-300" />
              <span className="text-tx-primary font-medium tracking-wide text-sm sm:text-base">LinkedIn</span>
            </Link>
            <Link href="https://leetcode.com/u/yasin_1/" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-surface border border-border-token rounded-2xl hover:border-accent-pop hover:bg-raised transition-all duration-300 hover:shadow-accent-glow">
              <Code2 className="w-8 h-8 text-tx-muted group-hover:text-accent-pop mb-3 transition-colors duration-300" />
              <span className="text-tx-primary font-medium tracking-wide text-sm sm:text-base">LeetCode</span>
            </Link>
            <Link href="https://codeforces.com/profile/MD_YASIN" target="_blank" className="group relative w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-surface border border-border-token rounded-2xl hover:border-accent-pop hover:bg-raised transition-all duration-300 hover:shadow-accent-glow">
              <TerminalSquare className="w-8 h-8 text-tx-muted group-hover:text-accent-pop mb-3 transition-colors duration-300" />
              <span className="text-tx-primary font-medium tracking-wide text-sm sm:text-base">Codeforces</span>
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
