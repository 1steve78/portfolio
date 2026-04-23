"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Github,
  Brain,
  Database,
  Layers,
  Code2,
  ChevronRight,
  Zap,
  ExternalLink,
} from "lucide-react";

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: "shatranj",
    title: "Shatranj AI",
    subtitle: "Chess Analysis Engine",
    description:
      "Real-time chess analysis with Stockfish, CAPS-style accuracy scoring, WebSocket streaming, and an LLM coaching module for post-game insights.",
    tags: ["Next.js", "Python", "FastAPI", "WebSocket", "Redis", "PostgreSQL"],
    icon: Brain,
    variant: "blue",     // blue accent card
    github: "https://github.com",
    demo: "https://github.com",
    stat: { label: "Avg depth", value: "22 ply" },
    featured: true,
  },
  {
    id: "rag",
    title: "AI RAG Pipeline",
    subtitle: "Intelligent Document Search",
    description:
      "Retrieval-augmented generation system with vector embeddings, semantic search, and an LLM interface for enterprise knowledge bases.",
    tags: ["Python", "LangChain", "Pinecone", "OpenAI", "FastAPI"],
    icon: Database,
    variant: "lime",     // lime/D4FF00 accent
    github: "https://github.com",
    demo: "https://github.com",
    stat: { label: "Recall", value: "94.2%" },
    featured: false,
  },
  {
    id: "portfolio",
    title: "Portfolio OS",
    subtitle: "Interactive Developer Portfolio",
    description:
      "This very portfolio — a glassmorphic dark/light theme system with animated bento components and a premium editorial aesthetic.",
    tags: ["Next.js 16", "Framer Motion", "TypeScript"],
    icon: Layers,
    variant: "dark",     // slate-900 card
    github: "https://github.com",
    demo: "https://github.com",
    stat: { label: "Lighthouse", value: "98/100" },
    featured: false,
  },
];

// ─── Tilt card wrapper ────────────────────────────────────────────────────────
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 24 });
  const rotX = useTransform(springY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotY = useTransform(springX, [-0.5, 0.5], ["-4deg", "4deg"]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated visual (orbits) for featured card ───────────────────────────────
function FeaturedVisual() {
  const rings = [56, 80, 108];
  return (
    <div className="relative w-[220px] h-[220px] flex items-center justify-center mx-auto">
      {/* Center icon */}
      <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
        <Brain className="w-8 h-8 text-white" />
      </div>

      {/* Orbit rings */}
      {rings.map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-dashed border-slate-200 dark:border-slate-700"
          style={{ width: r * 2, height: r * 2 }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Orbiting dot 1 */}
      <motion.div
        className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full shadow-md shadow-blue-400/50"
        animate={{ x: [56, 0, -56, 0, 56], y: [0, -56, 0, 56, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Orbiting dot 2 – lime */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: "#D4FF00" }}
        animate={{ x: [-80, 0, 80, 0, -80], y: [0, -80, 0, 80, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      {/* Stat badge */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        ⚡ 22 ply avg depth
      </motion.div>
    </div>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────
function Tag({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide
        ${dark
          ? "bg-slate-800 text-slate-300"
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        }`}
    >
      {label}
    </span>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <TiltCard className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900/80 transition-all duration-500 cursor-default">

      {/* Visual zone – blue top */}
      <div className="relative bg-blue-500 flex items-center justify-center py-10 overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-400/40 rounded-full blur-3xl" />
        <FeaturedVisual />
      </div>

      {/* Content zone */}
      <div className="flex flex-col flex-1 p-7 gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
            {project.subtitle}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => <Tag key={t} label={t} />)}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Github size={13} /> Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-all"
          >
            Live demo <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

// ─── Lime card (RAG) ──────────────────────────────────────────────────────────
function LimeCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon;
  return (
    <TiltCard className="group flex flex-col bg-[#D4FF00] rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-yellow-200 dark:hover:shadow-yellow-900/30 transition-all duration-500 cursor-default">
      <div className="flex flex-col flex-1 p-7 gap-4">
        {/* Icon + stat row */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-[#D4FF00]" />
          </div>
          <span className="text-[10px] font-bold bg-slate-900 text-[#D4FF00] px-3 py-1.5 rounded-full">
            {project.stat.value}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-1.5">
            {project.subtitle}
          </p>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold bg-slate-900/10 text-slate-800 px-2.5 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-900/10">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 transition-colors">
            <Github size={13} /> Source
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-900 transition-colors group">
            View live <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

// ─── Dark card (Portfolio OS) ─────────────────────────────────────────────────
function DarkCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon;
  return (
    <TiltCard className="group flex flex-col bg-slate-900 dark:bg-slate-800 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 cursor-default">
      <div className="flex flex-col flex-1 p-7 gap-4">
        {/* Icon + stat row */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-bold bg-[#D4FF00] text-slate-900 px-3 py-1.5 rounded-full">
            {project.stat.value}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1.5">
            {project.subtitle}
          </p>
          <h3 className="text-xl font-bold text-white tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => <Tag key={t} label={t} dark />)}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <Github size={13} /> Source
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors group">
            View live <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

// ─── CTA card ─────────────────────────────────────────────────────────────────
function CtaCard() {
  return (
    <TiltCard className="group flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 gap-3 cursor-default hover:shadow-xl transition-all duration-500">
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-1">
        <Code2 className="w-6 h-6 text-slate-500 dark:text-slate-400" />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        More on the way
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[180px]">
        New projects ship regularly — watch this space.
      </p>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 mt-1 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-full hover:scale-105 transition-all"
      >
        <Github size={13} /> GitHub profile
      </a>
    </TiltCard>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured)!;
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="w-full bg-white dark:bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
              Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
            Things I&apos;ve{" "}
            <span className="inline-flex items-center gap-2 text-blue-500">
              <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <Zap size={16} className="text-blue-500" />
              </span>
              built
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            A curated selection of production-grade systems — from AI pipelines to full-stack platforms.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Featured — tall, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="md:row-span-2 lg:row-span-2"
          >
            <FeaturedCard project={featured} />
          </motion.div>

          {/* Lime card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <LimeCard project={secondary[0]} />
          </motion.div>

          {/* Dark card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <DarkCard project={secondary[1]} />
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 lg:col-span-1"
          >
            <CtaCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
