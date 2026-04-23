"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Shield, Cpu, Activity, LayoutGrid } from "lucide-react";

const projects = [
  {
    title: "TrustLens AI",
    desc: "Community-powered cybersafety and scam detection platform using ML.",
    icon: <Shield className="text-blue-400" />,
    tech: ["Next.js", "Python", "TensorFlow"],
    link: "#",
  },
  {
    title: "Code Execution Engine",
    desc: "Distributed judging system using Kafka, Redis, and isolated Docker containers.",
    icon: <Cpu className="text-purple-400" />,
    tech: ["Go", "Docker", "Kafka", "Redis"],
    link: "#",
  },
  {
    title: "Synapse",
    desc: "AI-powered habit tracker built with React Native and Expo.",
    icon: <Activity className="text-green-400" />,
    tech: ["React Native", "Firebase", "OpenAI"],
    link: "#",
  },
  {
    title: "Shatranj",
    desc: "Advanced chess analysis platform with real-time WebSocket streaming.",
    icon: <LayoutGrid className="text-orange-400" />,
    tech: ["Node.js", "WebSockets", "Stockfish Engine"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Featured Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all"
          >
            <div className="mb-4 p-3 bg-white/5 w-fit rounded-2xl">
              {project.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.link} className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors">
                <Github size={18} /> Code
              </a>
              <a href={project.link} className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors">
                <ExternalLink size={18} /> Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
