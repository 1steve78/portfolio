"use client";

import { motion } from "framer-motion";
import { Activity, Code2, Brain, Zap, Users, Globe } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-white dark:bg-slate-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
            About Me
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-4 leading-tight max-w-3xl mx-auto">
          A developer dedicated to building{" "}
          <span className="inline-flex items-center gap-1.5 text-blue-500">
            <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity size={16} className="text-blue-500" />
            </span>{" "}
            smarter
          </span>{" "}
          systems
          <br />
          <span className="text-slate-400">and</span>{" "}
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <span className="w-7 h-7 rounded-full bg-[#D4FF00] flex items-center justify-center">
              <Zap size={14} className="text-slate-800" />
            </span>{" "}
            more impactful
          </span>{" "}
          products
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">

          {/* Card 1 – Large blue stat card */}
          <div className="bg-blue-500 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden h-80 group">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/40 rounded-full blur-2xl" />
            <div>
              <Globe size={28} className="text-white/80 mb-4" />
              <p className="text-white/80 text-sm leading-relaxed">
                Building full-stack applications serving users across the globe.
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-5 border border-white/20">
              <div className="text-4xl font-bold text-white mb-1">10+</div>
              <div className="text-white/70 text-xs font-medium uppercase tracking-wider">Years of Coding Experience</div>
            </div>
          </div>

          {/* Card 2 – Testimonial */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-between h-80">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Client Satisfaction</div>
              <div className="text-5xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
            </div>
            <div className="mt-auto">
              <div className="flex -space-x-2 mb-4">
                {["bg-blue-400","bg-green-400","bg-purple-400","bg-orange-400"].map((color, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-slate-100 dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                "Yasin&apos;s work completely transformed our platform. Efficient, elegant, and production-ready."
              </p>
            </div>
          </div>

          {/* Card 3 – Split */}
          <div className="flex flex-col gap-5 h-80">
            <div className="bg-[#D4FF00] rounded-[2rem] p-8 flex-1 flex flex-col justify-between group">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-widest">AI Projects Shipped</div>
              <div>
                <div className="text-4xl font-bold text-slate-900">20+</div>
                <div className="text-sm text-slate-700 mt-1 font-medium">LLMs, RAG, agents & automation tools</div>
              </div>
            </div>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-6 text-white flex justify-between items-center flex-1">
              <span className="text-sm font-semibold text-slate-300">Tech Stacks</span>
              <div className="flex gap-2">
                <Code2 size={18} className="text-blue-400" />
                <Brain size={18} className="text-purple-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
