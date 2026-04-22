"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useRef } from "react";
import { BrainCircuit, Cpu, Layers } from "lucide-react";

// ─── Pill badge ───────────────────────────────────────────────────────────────
function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider border border-white/10 bg-white/5 text-zinc-300">
      {icon}
      {label}
    </span>
  );
}

export default function HeroProfile() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw motion values — normalised [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Springs add inertia → magnetic feel
  const springX = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  // Portrait tilt (stronger)
  const portraitRotateX = useTransform(springY, [-0.5, 0.5], ["18deg", "-18deg"]);
  const portraitRotateY = useTransform(springX, [-0.5, 0.5], ["-18deg", "18deg"]);

  // Subtle card tilt (softer)
  const cardRotateX = useTransform(springY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], ["-4deg", "4deg"]);

  // Parallax shift for the glow blob
  const glowX = useTransform(springX, [-0.5, 0.5], ["-8px", "8px"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["-8px", "8px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    animate(rawX, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(rawY, 0, { type: "spring", stiffness: 200, damping: 20 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col sm:flex-row items-center gap-8 sm:gap-12 glass-panel p-7 sm:p-10 rounded-2xl cursor-default
                 hover:border-cyan-500/30 hover:shadow-[0_0_60px_rgba(6,182,212,0.08)] transition-[border-color,box-shadow] duration-500"
    >
      {/* ── 3D Portrait ─────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          rotateX: portraitRotateX,
          rotateY: portraitRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44"
      >
        {/* Portrait image — lifted towards viewer */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className="absolute inset-0 rounded-full overflow-hidden shadow-2xl
                     ring-1 ring-white/15"
        >
          <img
            src="/portrait.png"
            alt="Md Yasin Alam — portrait"
            className="w-32 h-32 rounded-full object-cover border-2 border-slate-700 shadow-lg"
            draggable={false}
          />
        </div>

        {/* Parallax glow behind the portrait */}
        <motion.div
          style={{ x: glowX, y: glowY, translateZ: "-20px" }}
          className="absolute inset-0 rounded-full bg-cyan-500/25 blur-2xl pointer-events-none"
        />

        {/* Outer dashed ring — depth layer */}
        <div
          style={{ transform: "translateZ(10px)" }}
          className="absolute -inset-2 rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
        />
      </motion.div>

      {/* ── Text Content ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-col text-center sm:text-left w-full"
      >
        {/* Status line */}
        <p className="font-mono text-[11px] tracking-[0.2em] text-cyan-500/80 uppercase mb-3">
          &gt; identity.load() — online
        </p>

        {/* Word-Split Headline Reveal */}
        <motion.h1 
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
          initial="initial"
          animate="animate"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-1 text-white flex flex-wrap gap-[0.2em] sm:justify-start justify-center"
        >
          {["Md", "Yasin", "Alam"].map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block pb-1">
              <motion.span 
                variants={{
                  initial: { y: "100%" },
                  animate: { y: "0%" }
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Dual-role gradient headline */}
        <p className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500">
            AI Systems
          </span>
          <span className="text-zinc-500 mx-2">&</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Full-Stack Architect
          </span>
        </p>

        <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-lg mb-5">
          Building scalable AI backends, RAG pipelines, and high-performance
          web systems. This portfolio is a live deployment of everything I know.
        </p>

        {/* Specialisation badges */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge icon={<BrainCircuit className="w-3 h-3 text-cyan-400" />}  label="AI / LLM Systems" />
          <Badge icon={<Layers       className="w-3 h-3 text-purple-400" />} label="Full-Stack MERN" />
          <Badge icon={<Cpu          className="w-3 h-3 text-emerald-400" />} label="Competitive DSA" />
        </div>
      </motion.div>
    </motion.div>
  );
}
