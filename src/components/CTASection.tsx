"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden min-h-[380px] flex flex-col justify-between p-10 md:p-14"
          style={{
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          }}
        >
          {/* Scenic bottom image effect using CSS */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(ellipse at bottom right, rgba(100,200,150,0.3) 0%, transparent 70%), radial-gradient(ellipse at top left, rgba(50,100,200,0.2) 0%, transparent 60%)"
            }}
          />

          {/* Grass / scenic element */}
          <div className="absolute bottom-0 right-0 w-1/2 h-3/4 opacity-30 dark:opacity-20"
            style={{
              background: "radial-gradient(ellipse at bottom right, rgba(134, 239, 172, 0.5) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%)"
            }}
          />

          <div className="relative z-10">
            {/* Trusted by */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-2">
                {["bg-blue-400","bg-green-400","bg-purple-400"].map((color, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold`}>
                    {["A","B","C"][i]}
                  </div>
                ))}
              </div>
              <span className="text-white/70 text-sm font-medium">Trusted by 50+ clients & teams</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 max-w-xl">
              We combine human insight with artificial intelligence
            </h2>
            <p className="text-white/60 text-base max-w-md leading-relaxed mb-10">
              I bridge strategic thinking with cutting-edge AI to help teams ship faster, build smarter, and scale effortlessly.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#D4FF00] text-slate-900 font-bold text-sm px-6 py-3 rounded-full hover:bg-[#C5EF00] hover:scale-105 transition-all"
            >
              Get Started
              <span className="bg-slate-900 rounded-full p-1">
                <ArrowUpRight size={12} strokeWidth={3} className="text-[#D4FF00]" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
