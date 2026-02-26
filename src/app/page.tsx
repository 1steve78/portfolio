"use client";

import TerminalIntro from "@/components/TerminalIntro";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BrainCircuit, Cpu, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const pillars = [
  {
    title: "AI Systems & Gen AI",
    description: "Architecting agentic workflows with LangChain, LangGraph, and integrating models via Groq/OpenRouter.",
    icon: <BrainCircuit className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Full-Stack Engineering",
    description: "Developing scalable, production-ready systems using Next.js, FastAPI, Prisma, and PostgreSQL.",
    icon: <Workflow className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: "Competitive Programming",
    description: "Solving complex algorithmic challenges. 220+ LeetCode problems, CodeChef 1*, Codeforces 912.",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
  },
];

function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      transition={{ delay, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
      }}
      className="group relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300 backdrop-blur-sm"
    >
      <div>{children}</div>
      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-zinc-600/50 transition-colors pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* Terminal Boot Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center mb-16"
        >
          <TerminalIntro />
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center max-w-2xl mb-24"
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Md Yasin Alam.<br />AI-Powered Web Architect.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            I don&apos;t just build websites. I engineer AI-integrated systems. From scalable backend infrastructures to robust Gen AI platforms. This is my digital lab.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-16">
          {pillars.map((pillar, index) => (
            <TiltCard key={pillar.title} delay={2.5 + index * 0.2}>
              <div className="mb-4 p-3 bg-black/50 rounded-lg inline-block border border-zinc-800/50">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-100">{pillar.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </TiltCard>
          ))}
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/projects"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-white transition-colors"
          >
            Access Missions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/capabilities"
            className="flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Terminal Interface
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
