"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const roles = ["Full-Stack Developer", "AI Engineer", "Systems Architect"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % roles.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 p-8 md:p-16 rounded-[2.5rem] max-w-4xl w-full text-center shadow-2xl"
      >
        <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-widest mb-4 uppercase">
          Available for new opportunities
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Building the future with <br />
          <span className="relative inline-block min-w-[300px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-blue-500"
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-10">
          Specializing in high-performance web systems and intelligent AI automation to solve complex business challenges.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            View Projects
          </button>
          <button className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-full font-semibold hover:bg-white/20 transition-all">
            Get in touch
          </button>
        </div>
      </motion.div>
    </section>
  );
}
