"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Zap, Globe, Activity, Database, Terminal, Layers } from "lucide-react";

const skills = [
  {
    title: "Full-Stack Development",
    desc: "End-to-end web applications with Next.js, React, Node.js, and PostgreSQL — from pixel-perfect UIs to robust APIs.",
    icon: (
      <div className="relative w-full h-48 flex justify-center items-center">
        <motion.div whileHover={{ scale: 1.04, rotate: -1 }} className="absolute z-20 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl shadow-xl w-52 ml-4 mt-8">
          <div className="text-[10px] text-slate-400 mb-1">Monthly Builds</div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white mb-3">4,900 <span className="text-slate-400 text-sm">/ 5,000</span></div>
          <div className="space-y-2">
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full"><div className="h-full bg-blue-500 w-[80%] rounded-full"/></div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full"><div className="h-full bg-green-400 w-[55%] rounded-full"/></div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }} className="absolute z-10 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl w-32 -ml-32 -mt-8 rotate-[-4deg]">
          <Code2 size={20} className="mb-2 text-blue-400" />
          <div className="text-lg font-bold">50%</div>
          <div className="text-[10px] text-slate-400">faster delivery</div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "AI & Machine Learning",
    desc: "LLM integrations, RAG pipelines, vector search, and intelligent agents powered by OpenAI, Gemini & open-source models.",
    icon: (
      <div className="relative w-full h-48 flex justify-center items-center">
        <motion.div whileHover={{ scale: 1.04, rotate: -3 }} className="absolute z-10 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl w-44 -ml-20 -mt-8 rotate-[-3deg]">
          <div className="text-sm font-medium leading-snug">
            AI <span className="inline-block w-2.5 h-2.5 bg-[#D4FF00] rounded-full align-middle mx-1" /> Expertise in LLMs, RAG & Agents
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04, rotate: 3 }} className="absolute z-20 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl shadow-xl w-44 ml-16 mt-8 rotate-[3deg]">
          <div className="text-xs font-semibold text-slate-800 dark:text-white mb-3">Intelligence in<br/>Every Decision</div>
          <div className="flex items-end gap-1 h-14 w-full">
            {[30,50,40,80,60,100].map((h,i) => (
              <div key={i} style={{height:`${h}%`}} className={`flex-1 rounded-t-sm ${i===5?'bg-blue-500':i===3?'bg-blue-300':'bg-slate-200 dark:bg-slate-600'}`} />
            ))}
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Backend & Infrastructure",
    desc: "Scalable APIs, microservices, Docker, Redis, PostgreSQL — architected for performance and reliability.",
    icon: (
      <div className="relative w-full h-48 flex justify-center items-center">
        <motion.div whileHover={{ scale: 1.04 }} className="absolute z-20 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl shadow-xl w-52 mt-8">
          <div className="text-[10px] text-slate-400 mb-1 flex justify-between items-center">
            API Health <Activity size={10} />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-3">99.9% <span className="text-[10px] text-green-500 font-medium">uptime</span></div>
          <div className="flex flex-wrap gap-1.5">
            {["Node.js","Docker","Redis","PostgreSQL"].map(tag => (
              <span key={tag} className="text-[9px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.04 }} className="absolute z-10 bg-slate-900 text-white p-4 rounded-2xl shadow-xl w-36 ml-36 -mt-12 rotate-[5deg]">
          <Database size={16} className="text-blue-400 mb-1" />
          <div className="text-xs text-slate-400">Scalable</div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Developer Experience",
    desc: "Crafting tools, CLIs, and workflows that make engineering teams more productive and deployments seamless.",
    icon: (
      <div className="relative w-full h-48 flex justify-center items-center">
        <div className="bg-slate-950 rounded-2xl p-4 w-64 font-mono text-xs">
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"/>
          </div>
          <div className="text-green-400">$ npm run build</div>
          <div className="text-slate-400 mt-1">✓ Compiled successfully</div>
          <div className="text-slate-400">✓ Linting passed</div>
          <div className="text-blue-400 mt-1">→ Ready in 1.2s</div>
        </div>
      </div>
    ),
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full bg-white dark:bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
            Expertise
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-4 leading-tight">
          Where human insight meets<br />intelligent technology
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg mb-16">
          Building systems that don&apos;t just work — they think, scale, and evolve with your needs.
        </p>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-10 flex flex-col items-center min-h-[400px]"
            >
              {skill.icon}
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{skill.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
