"use client";

import { motion } from "framer-motion";
import { Terminal, Database, ShieldAlert, Cpu, Code2 } from "lucide-react";

// The timeline data. This captures the user's major milestones visually.
const executionLogs = [
    {
        id: "compile_btech",
        status: "[>] CURRENT_PROCESS",
        title: "B.Tech Undergrad",
        entity: "Kalyani Government Engineering College",
        date: "2025 - 2029",
        desc: "Pursuing Engineering degree. Core focus on computer science, algorithms, and practical development.",
        icon: <Cpu className="w-4 h-4 text-cyan-400" />,
        color: "text-cyan-400",
        border: "border-cyan-500/30",
    },
    {
        id: "compile_12",
        status: "[✓] BUILD_SUCCESS",
        title: "Class 12 (Higher Secondary)",
        entity: "Bholananda National Vidyalaya",
        date: "2024 - 2025",
        desc: "Completed Higher Secondary education. Built foundational knowledge in mathematics, physics, and core sciences.",
        icon: <Code2 className="w-4 h-4 text-yellow-400" />,
        color: "text-yellow-400",
        border: "border-yellow-500/30",
    },
    {
        id: "compile_10",
        status: "[✓] INITIALIZING",
        title: "Class 10 (Secondary)",
        entity: "Bholananda National Vidyalaya",
        date: "2022 - 2023",
        desc: "Completed Secondary education. Developed basic problem-solving skills and academic foundations.",
        icon: <Database className="w-4 h-4 text-purple-400" />,
        color: "text-purple-400",
        border: "border-purple-500/30",
    },
];

export default function ExecutionTrace() {
    return (
        <div className="w-full relative py-8">
            {/* Header section with terminal aesthetic */}
            <div className="flex items-center gap-3 mb-10">
                <Terminal className="w-6 h-6 text-zinc-400" />
                <h2 className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">Execution Trace</h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-4" />
            </div>

            <div className="relative pl-4 sm:pl-8">
                {/* The main vertical track line */}
                <div className="absolute top-0 bottom-0 left-[15.5px] sm:left-[31.5px] w-[2px] bg-zinc-200 dark:bg-white/5" />

                <div className="flex flex-col gap-12">
                    {executionLogs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative pl-8 sm:pl-12 group"
                        >
                            {/* Glowing Node Point */}
                            <div
                                className="absolute left-[-15px] sm:left-[-15px] top-1.5 w-[30px] h-[30px] rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                            >
                                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-current" style={{ color: log.color.replace('text-', '') }} />
                                {log.icon}
                            </div>

                            {/* Glowing Animated Data Packet moving down the line (only for first few to not clutter) */}
                            {index < executionLogs.length - 1 && (
                                <motion.div
                                    className={`absolute left-[-1.5px] sm:left-[-1.5px] top-[40px] w-[5px] h-[30px] rounded-full bg-gradient-to-b from-${log.color.split('-')[1]}-500/0 via-${log.color.split('-')[1]}-500/80 to-${log.color.split('-')[1]}-500/0 z-0 blur-[1px]`}
                                    animate={{ y: [0, 80], opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.5,
                                        ease: "linear",
                                    }}
                                />
                            )}

                            {/* System Log Entry Content */}
                            <div className={`p-5 sm:p-6 rounded-2xl bg-white/40 dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/5 backdrop-blur-sm group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/40 transition-colors duration-300 group-hover:border-${log.color.split('-')[1]}-500/30`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-1">
                                    <span className={`font-mono text-xs sm:text-sm font-bold tracking-wider ${log.color}`}>
                                        {log.status}
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500 mt-1 sm:mt-0">
                                        {log.date}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight mt-1 mb-1">
                                    {log.title}
                                </h3>
                                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                                    @ {log.entity}
                                </h4>

                                <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed font-light">
                                    {log.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
