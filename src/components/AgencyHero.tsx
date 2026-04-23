"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Brain, Code2, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AgencyHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgImage = mounted && theme === 'dark' ? "url('/dark-sky.png')" : "url('/bg-sky.png')";

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Overlay: subtle dark vignette at top + white fade at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 dark:from-slate-900/60 via-transparent to-white dark:to-slate-950 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full px-6 flex flex-col items-center text-center pt-28 pb-4">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20"
        >
          Full-Stack Developer & AI Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-white leading-[1.05] mb-6 drop-shadow-sm"
        >
          Building the future with<br />
          <span className="text-white">AI and strategy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-white/80 mb-10 max-w-xl leading-relaxed"
        >
          I craft high-performance web applications and AI-powered tools that deliver real-world impact at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-4 mb-20"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm text-white font-medium text-sm hover:bg-black/30 transition-all"
          >
            View Demo
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#D4FF00] text-slate-900 font-bold text-sm hover:bg-[#C5EF00] hover:scale-105 transition-all shadow-lg shadow-yellow-400/20"
          >
            Get Started
            <span className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
              <ArrowUpRight size={12} strokeWidth={3} className="text-[#D4FF00]" />
            </span>
          </a>
        </motion.div>

        {/* ── Floating cards row ── */}
        <div className="w-full flex flex-row justify-center items-end gap-3 md:gap-4 pb-12">

          {/* Card 1: Performance */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 1.1, delay: 0.4, type: "spring", damping: 16 }}
            className="bg-white/80 backdrop-blur-2xl border border-white/60 p-4 rounded-2xl shadow-2xl w-36 md:w-44 shrink-0 self-end translate-y-6"
          >
            <div className="flex justify-between items-center mb-2 text-[10px] font-semibold text-slate-600">
              Performance <Activity size={10} className="text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2.5">49% <span className="text-xs text-green-600 font-semibold">↑</span></div>
            <div className="h-8 w-full flex items-end gap-0.5">
              {[30,65,45,90,55,82].map((h,i)=>(
                <div key={i} style={{height:`${h}%`}} className={`flex-1 rounded-t-sm ${i===5?'bg-blue-500':i===3?'bg-green-400':'bg-slate-200'}`}/>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Projects */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1.1, delay: 0.5, type: "spring", damping: 16 }}
            className="bg-white shadow-2xl p-5 rounded-2xl w-40 md:w-48 shrink-0 self-end translate-y-2"
          >
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="text-[9px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Smarter</span>
              <span className="text-[9px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Grow Faster</span>
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Projects Built</div>
            <div className="text-3xl font-bold text-slate-900">20+</div>
          </motion.div>

          {/* Card 3: Center – AI (taller) */}
          <motion.div
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, type: "spring", damping: 14 }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 p-7 rounded-3xl shadow-2xl shadow-blue-500/40 w-44 md:w-52 shrink-0 text-center text-white border border-white/20 self-end"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Brain size={22} />
            </div>
            <div className="font-bold text-lg">AI Engineering</div>
            <div className="text-sm text-blue-100/80 mt-1">LLMs & RAG pipelines</div>
          </motion.div>

          {/* Card 4: Expertise black */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 1.1, delay: 0.7, type: "spring", damping: 16 }}
            className="bg-slate-900 p-5 rounded-2xl shadow-2xl w-40 md:w-48 shrink-0 text-white self-end translate-y-3"
          >
            <div className="text-sm font-medium leading-snug mb-3">
              Expertise <span className="inline-block w-3 h-3 bg-[#D4FF00] rounded-full align-middle mx-1" />
              in Full-Stack, AI & Cloud Systems
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={13} className="text-blue-400" />
              <Zap size={13} className="text-yellow-400" />
              <Brain size={13} className="text-purple-400" />
            </div>
          </motion.div>

          {/* Card 5: Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 7 }}
            transition={{ duration: 1.1, delay: 0.8, type: "spring", damping: 16 }}
            className="bg-white/80 backdrop-blur-2xl border border-white/60 p-4 rounded-2xl shadow-2xl w-32 md:w-38 shrink-0 self-end translate-y-6"
          >
            <div className="text-[10px] font-semibold text-slate-700 mb-3 leading-snug">Intelligence<br/>Every Build</div>
            <div className="flex items-end gap-0.5 h-12 w-full">
              {[40,55,35,90].map((h,i)=>(
                <div key={i} style={{height:`${h}%`}} className={`flex-1 rounded-t-sm ${i===3?'bg-blue-500':'bg-slate-200'}`}/>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-1.5 pb-6"
        >
          <div className="text-white/60 text-xs font-medium">Rated 4.9/5 by 900+ collaborators</div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i=>(
              <svg key={i} className="w-3.5 h-3.5 text-[#D4FF00]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
