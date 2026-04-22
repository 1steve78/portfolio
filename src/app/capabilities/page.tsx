"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, Circle } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STACK = [
  {
    category: "AI & LLM Systems",
    prefix: "ai",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    items: [
      { name: "LangChain.js / LangGraph",  note: "RAG pipelines, agentic graphs" },
      { name: "OpenRouter API",             note: "Multi-LLM gateway" },
      { name: "NVIDIA NIM",                 note: "Inference microservices" },
      { name: "Mistral AI / Groq",          note: "Fast inference backends" },
      { name: "Vector stores (FAISS/Mem)",  note: "Semantic retrieval" },
    ],
  },
  {
    category: "Full-Stack Web",
    prefix: "web",
    color: "text-purple-400",
    borderColor: "border-purple-500/20",
    items: [
      { name: "Next.js 14–16",  note: "App Router, RSC, streaming" },
      { name: "React 19",       note: "Client components, hooks" },
      { name: "FastAPI",        note: "Python async REST backend" },
      { name: "Node.js / Express", note: "MVC, Passport.js auth" },
      { name: "TailwindCSS / Framer Motion", note: "UI systems & animation" },
    ],
  },
  {
    category: "Data & Infrastructure",
    prefix: "infra",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    items: [
      { name: "PostgreSQL / Prisma",  note: "Relational ORM layer" },
      { name: "MongoDB / Mongoose",   note: "Document modelling" },
      { name: "Supabase / Drizzle",   note: "Type-safe queries" },
      { name: "Docker / Compose",     note: "Container orchestration" },
      { name: "Kafka",                note: "Event streaming (learning)" },
      { name: "Kubernetes",           note: "K8s orchestration (learning)" },
    ],
  },
  {
    category: "Languages & Tooling",
    prefix: "lang",
    color: "text-amber-400",
    borderColor: "border-amber-500/20",
    items: [
      { name: "TypeScript",     note: "Primary — strict mode" },
      { name: "Python",         note: "AI/ML scripts, FastAPI" },
      { name: "C++ (DSA)",      note: "Competitive programming" },
      { name: "Git / GitHub",   note: "Version control, CI/CD basics" },
      { name: "Postman / curl", note: "API testing & debugging" },
    ],
  },
];

// Total items across all categories for boot-up sequence
const TOTAL_ITEMS = STACK.reduce((acc, s) => acc + s.items.length, 0);

// ─── Single skill line — boots into view with a staggered delay ───────────────
function SkillLine({
  name,
  note,
  color,
  delay,
  booting,
}: {
  name: string;
  note: string;
  color: string;
  delay: number;
  booting: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!booting) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [booting, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="flex items-start gap-2.5 py-1"
    >
      {visible ? (
        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`} />
      ) : (
        <Circle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-zinc-700" />
      )}
      <span className="font-mono text-sm text-zinc-200">{name}</span>
      <span className="font-mono text-xs text-zinc-600 hidden sm:inline">// {note}</span>
    </motion.div>
  );
}

// ─── One category block ───────────────────────────────────────────────────────
function CategoryBlock({
  section,
  globalOffset,
  booting,
}: {
  section: typeof STACK[0];
  globalOffset: number;
  booting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", mass: 1.8, damping: 20, stiffness: 100 }}
      className={`glass-panel rounded-2xl p-6 border ${section.borderColor}`}
    >
      {/* Category header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/6">
        <Terminal className={`w-4 h-4 ${section.color}`} />
        <span className={`font-mono text-xs font-bold tracking-widest uppercase ${section.color}`}>
          {section.prefix}::load_module
        </span>
        <span className="ml-auto font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
          {section.items.length} entries
        </span>
      </div>

      {/* Skill lines */}
      <div className="space-y-0.5">
        {section.items.map((item, i) => (
          <SkillLine
            key={item.name}
            name={item.name}
            note={item.note}
            color={section.color}
            delay={(globalOffset + i) * 120}   // stagger: 120ms per item globally
            booting={booting}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Boot sequence progress meter ────────────────────────────────────────────
function BootProgress({ loaded, total }: { loaded: number; total: number }) {
  const pct = Math.round((loaded / total) * 100);
  return (
    <div className="font-mono text-xs text-zinc-600 space-y-1">
      <div className="flex justify-between">
        <span>SYS::LOADING_MODULES</span>
        <span className={pct === 100 ? "text-emerald-400" : "text-cyan-400"}>{pct}%</span>
      </div>
      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Capabilities() {
  const [booting, setBooting] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Kick off boot sequence after page fade-in
  useEffect(() => {
    const t = setTimeout(() => setBooting(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Track how many items have appeared for the progress bar
  useEffect(() => {
    if (!booting) return;
    let count = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < TOTAL_ITEMS; i++) {
      timers.push(
        setTimeout(() => {
          count++;
          setLoadedCount(count);
        }, i * 120 + 50)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [booting]);

  // Build cumulative offsets for stagger continuity across categories
  const offsets: number[] = [];
  let running = 0;
  for (const s of STACK) {
    offsets.push(running);
    running += s.items.length;
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-10 lg:px-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.25em] text-purple-500/70 uppercase mb-3">
            &gt; /capabilities — system_manifest.sh
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-3">
            Deployable Stack
          </h1>
          <p className="text-zinc-400 text-base max-w-xl mb-6">
            Full tech manifest. Modules boot sequentially on page load.
          </p>
          {/* Progress bar */}
          <div className="max-w-sm">
            <BootProgress loaded={loadedCount} total={TOTAL_ITEMS} />
          </div>
        </motion.div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STACK.map((section, si) => (
            <CategoryBlock
              key={section.category}
              section={section}
              globalOffset={offsets[si]}
              booting={booting}
            />
          ))}
        </div>

        {/* Footer terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-14 glass-panel rounded-2xl p-5 border border-emerald-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              System Online — all modules loaded
            </span>
          </div>
          <p className="font-mono text-xs text-zinc-600 mb-3">
            Ready to initialize new protocols. Open for collaboration.
          </p>
          <a
            href="mailto:yasinsteve4@gmail.com"
            className="inline-block font-mono text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
          >
            init_contact(&quot;yasinsteve4@gmail.com&quot;)
          </a>
        </motion.div>

      </div>
    </main>
  );
}
