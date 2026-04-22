"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useScroll } from "framer-motion";
import { ArrowUpRight, Github, Database, FileText, Bot, Monitor, Shield, Globe, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const missions = [
  {
    id: "trustlens",
    title: "TrustLens AI",
    badge: "CLASSIFIED_SUCCESS",
    tagline: "AI-Powered Cybersafety Platform",
    problem: "Users lack practical, safe environments to train against real-world social engineering and scam tactics.",
    solution:
      "Built an AI-driven scam simulation platform featuring adaptive AI scammer behavior — the attacker dynamically evolves manipulation tactics (urgency injection, authority spoofing, emotional pressure) using an LLM backend. An LLM-based analysis engine classifies each tactic in real time, providing users actionable security literacy feedback. Backed by a stateless Next.js API and PostgreSQL via Prisma.",
    techStack: ["Next.js 14", "Mistral AI", "Prisma ORM", "PostgreSQL", "TypeScript"],
    github: "#",
    live: "#",
    accentColor: "cyan",
    architecture: [
      { step: "User Input",     icon: <Monitor    className="w-4 h-4 text-zinc-400" /> },
      { step: "Next.js API",    icon: <Bot        className="w-4 h-4 text-emerald-400" /> },
      { step: "Mistral LLM",    icon: <FileText   className="w-4 h-4 text-cyan-400" /> },
      { step: "Prisma → PG",    icon: <Database   className="w-4 h-4 text-purple-400" /> },
    ],
    highlights: ["Adaptive scammer logic", "Real-time LLM tactic analysis", "Manipulation classification"],
  },
  {
    id: "heritage-lens",
    title: "Heritage-Lens",
    badge: "DEPLOYED",
    tagline: "Cultural Heritage Explorer",
    problem: "Indian heritage preservation lacks engaging, AI-powered interactive storytelling for digital education.",
    solution:
      "A digital platform for exploring historical heritage powered by the OpenRouter API — a multi-LLM gateway enabling flexible model selection. Features structured data models that classify artifacts, timelines, and cultural entities, enabling dynamic querying and AI-generated narratives. Clean Next.js frontend with an intuitive UX for non-technical users.",
    techStack: ["Next.js", "OpenRouter API", "React", "TailwindCSS", "JSON-LD"],
    github: "#",
    live: "#",
    accentColor: "emerald",
    architecture: [
      { step: "Discovery",      icon: <Globe      className="w-4 h-4 text-zinc-400" /> },
      { step: "OpenRouter",     icon: <Zap        className="w-4 h-4 text-emerald-400" /> },
      { step: "Story Gen",      icon: <FileText   className="w-4 h-4 text-amber-400" /> },
      { step: "UI Render",      icon: <Monitor    className="w-4 h-4 text-purple-400" /> },
    ],
    highlights: ["OpenRouter multi-LLM gateway", "Structured data models", "Dynamic heritage querying"],
  },
  {
    id: "rozgaar",
    title: "Rozgaar.ai",
    badge: "OPERATIONAL",
    tagline: "Skill-Driven Job Discovery",
    problem: "Early-career talent struggles to find roles matching their unique skills using generic job boards.",
    solution:
      "Skill-driven job discovery combining AI resume extraction (Groq), smart vector matching, and multi-source job ingestion. Supabase backend with Drizzle ORM for type-safe queries.",
    techStack: ["Next.js", "Supabase", "Drizzle ORM", "Groq AI"],
    github: "#",
    live: "#",
    accentColor: "purple",
    architecture: [
      { step: "Resume Parse",   icon: <FileText   className="w-4 h-4 text-zinc-400" /> },
      { step: "Skill Extract",  icon: <Bot        className="w-4 h-4 text-purple-400" /> },
      { step: "Job Match",      icon: <Database   className="w-4 h-4 text-cyan-400" /> },
      { step: "RAG Guidance",   icon: <Monitor    className="w-4 h-4 text-emerald-400" /> },
    ],
    highlights: ["Vector skill matching", "AI resume extraction", "Multi-source job ingestion"],
  },
  {
    id: "spirit-gate",
    title: "Spirit Gate",
    badge: "PROTOTYPE",
    tagline: "Anime-Themed AI CAPTCHA",
    problem: "Traditional CAPTCHAs are boring and modern automation easily bypasses standard detection.",
    solution:
      "A fun, anime-themed puzzle CAPTCHA combining human cultural knowledge checks with real-time AI behaviour analysis — mouse trajectory, timing entropy, and interaction fingerprinting.",
    techStack: ["React 19", "Framer Motion", "Vite", "AI Behaviour Analysis"],
    github: "#",
    live: "#",
    accentColor: "amber",
    architecture: [
      { step: "Knowledge",      icon: <FileText   className="w-4 h-4 text-zinc-400" /> },
      { step: "Behaviour",      icon: <Monitor    className="w-4 h-4 text-amber-400" /> },
      { step: "AI Analysis",   icon: <Bot        className="w-4 h-4 text-cyan-400" /> },
      { step: "Validate",      icon: <Shield     className="w-4 h-4 text-emerald-400" /> },
    ],
    highlights: ["Mouse trajectory analysis", "Timing entropy", "Cultural knowledge gating"],
  },
  {
    id: "wanderlust",
    title: "WanderLust",
    badge: "LIVE",
    tagline: "Full-Stack Travel Listings Platform",
    problem: "Users need a secure, scalable platform to discover, create, and manage travel property listings.",
    solution:
      "Robust Node/Express MVC backend with Passport.js sessions, Mongoose models, Cloudinary asset routing, and server-side EJS rendering.",
    techStack: ["Node.js", "Express", "MongoDB", "Passport.js", "EJS"],
    github: "https://github.com/1steve78/wanderlust",
    live: "#",
    accentColor: "rose",
    architecture: [
      { step: "EJS Render",    icon: <Monitor    className="w-4 h-4 text-zinc-400" /> },
      { step: "Passport.js",  icon: <Shield     className="w-4 h-4 text-rose-400" /> },
      { step: "MVC Layer",    icon: <Cpu        className="w-4 h-4 text-cyan-400" /> },
      { step: "MongoDB",      icon: <Database   className="w-4 h-4 text-emerald-400" /> },
    ],
    highlights: ["Passport.js auth", "MVC architecture", "Cloudinary asset routing"],
  },
];

// Accent colour helpers
const ACCENT: Record<string, { text: string; border: string; badge: string; glow: string; flow: string }> = {
  cyan:    { text: "text-cyan-400",    border: "border-cyan-500/30",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]",    flow: "bg-cyan-400" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]", flow: "bg-emerald-400" },
  purple:  { text: "text-purple-400",  border: "border-purple-500/30",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",  glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]",  flow: "bg-purple-400" },
  amber:   { text: "text-amber-400",   border: "border-amber-500/30",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]",   flow: "bg-amber-400" },
  rose:    { text: "text-rose-400",    border: "border-rose-500/30",    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",    glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.12)]",    flow: "bg-rose-400" },
};

// ─── Project card ─────────────────────────────────────────────────────────────
function MissionCard({
  mission,
  idx,
  progress,
  total
}: {
  mission: typeof missions[0];
  idx: number;
  progress: any; // MotionValue<number>
  total: number;
}) {
  // Apple ease curves don't easily apply dynamically inside useTransform,
  // but we can shape the input ranges to snap sharply.
  const start = idx * (1 / total);
  const active = start + (0.5 / total);
  const end = start + (1 / total);

  // Parallax scrubbing
  const opacity = useTransform(progress, [start, active, end], [0, 1, 0]);
  const y = useTransform(progress, [start, active, end], [150, 0, -150]);
  const scale = useTransform(progress, [start, active, end], [0.85, 1, 0.85]);
  const filterBlur = useTransform(progress, [start, active, end], ["blur(12px)", "blur(0px)", "blur(12px)"]);

  // 3D mouse tilt (Interactive Magnetic Polish)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.8 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => {
    animate(rawX, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(rawY, 0, { type: "spring", stiffness: 200, damping: 20 });
  };

  const a = ACCENT[mission.accentColor];

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity,
        y,
        scale,
        filter: filterBlur,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        pointerEvents: useTransform(opacity, (val) => (val > 0.5 ? "auto" : "none")),
      }}
      className={`group w-full max-w-3xl h-fit flex flex-col glass-panel rounded-2xl overflow-hidden
                  transition-[border-color,box-shadow] duration-500
                  ${a.border} ${a.glow}`}
    >
      {/* Subtle gradient wash on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8" style={{ transform: "translateZ(20px)" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-5 gap-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest border ${a.badge} mb-2`}>
              &gt; {mission.badge}
            </span>
            <h2 className={`text-2xl font-black tracking-tight text-white group-hover:${a.text} transition-colors duration-300`}>
              {mission.title}
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{mission.tagline}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              href={mission.github}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href={mission.live}
              className={`p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:${a.text} hover:bg-white/10 transition-all`}
              aria-label="Live demo"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Problem + Solution */}
        <div className="space-y-4 mb-6 flex-1">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">The Problem</p>
            <p className="text-sm text-zinc-400 leading-relaxed">{mission.problem}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-1">Architecture</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{mission.solution}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {mission.highlights.map((h) => (
            <span key={h} className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${a.badge}`}>
              {h}
            </span>
          ))}
        </div>

        {/* Architecture flow diagram */}
        <div className="mb-5 py-3 px-3 rounded-xl bg-white/[0.03] border border-white/5 overflow-x-auto">
          <div className="flex items-center gap-0.5 min-w-max">
            {mission.architecture.map((node, i) => (
               <div key={node.step} className="flex items-center">
                 <div className="flex flex-col items-center gap-1.5">
                   <div className="p-2 rounded-lg bg-black/40 border border-white/8 group-hover:border-white/15 transition-colors">
                     {node.icon}
                   </div>
                   <span className="text-[9px] font-mono text-zinc-600 text-center max-w-[52px] leading-tight">
                     {node.step}
                   </span>
                 </div>
                 {i < mission.architecture.length - 1 && (
                   <div className="w-6 h-px bg-white/10 mx-1 relative overflow-hidden">
                     <motion.div
                       animate={{ x: [-12, 24] }}
                       transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.25, ease: "linear" }}
                       className={`absolute top-[-1px] left-0 w-3 h-[2px] ${a.flow} blur-[1px] opacity-80`}
                     />
                   </div>
                 )}
               </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {mission.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/8 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="min-h-[100vh] relative overflow-hidden bg-[#050505]">
      
      {/* 300vh ScrollDriver Container */}
      <div ref={containerRef} className="h-[300vh] relative w-full">
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-10 lg:px-16 pt-28">
          
          <div className="w-full max-w-6xl mx-auto flex flex-col h-full relative z-10">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 shrink-0 z-20 relative"
            >
              <p className="font-mono text-[11px] tracking-[0.25em] text-cyan-500/70 uppercase mb-3 drop-shadow-md">
                &gt; /projects — mission_log.json
              </p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-3 drop-shadow-lg">
                Classified Missions
              </h1>
              <p className="text-zinc-400 text-base max-w-xl">
                Deployed systems, agentic architectures, and active prototypes.
                Scroll slowly to scrub through the records.
              </p>
            </motion.div>

            {/* Cinematic Scrubber Stack */}
            <div className="flex-1 w-full relative perspective-[1000px] mt-4">
              {missions.map((mission, idx) => (
                <MissionCard 
                  key={mission.id} 
                  mission={mission} 
                  idx={idx} 
                  total={missions.length} 
                  progress={scrollYProgress} 
                />
              ))}
            </div>

            {/* Footer prompt */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono text-xs text-zinc-500 z-20"
            >
              <span className="animate-pulse">▍</span> end of mission log
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
