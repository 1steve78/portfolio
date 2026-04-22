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
        icon: <Cpu className="w-4 h-4 text-accent-pop" />,
    },
    {
        id: "compile_12",
        status: "[✓] BUILD_SUCCESS",
        title: "Class 12 (Higher Secondary)",
        entity: "Bholananda National Vidyalaya",
        date: "2024 - 2025",
        desc: "Completed Higher Secondary education. Built foundational knowledge in mathematics, physics, and core sciences.",
        icon: <Code2 className="w-4 h-4 text-accent-pop" />,
    },
    {
        id: "compile_10",
        status: "[✓] INITIALIZING",
        title: "Class 10 (Secondary)",
        entity: "Bholananda National Vidyalaya",
        date: "2022 - 2023",
        desc: "Completed Secondary education. Developed basic problem-solving skills and academic foundations.",
        icon: <Database className="w-4 h-4 text-accent-pop" />,
    },
];

export default function ExecutionTrace() {
    return (
        <div className="w-full relative py-8">
            {/* Header section with terminal aesthetic */}
            <div className="flex items-center gap-3 mb-10">
                <Terminal className="w-6 h-6 text-tx-muted" />
                <h2 className="text-2xl font-bold tracking-tighter text-tx-primary">Execution Trace</h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-border-token to-transparent ml-4" />
            </div>

            <div className="relative pl-4 sm:pl-8">
                {/* The main vertical track line */}
                <div className="absolute top-0 bottom-0 left-[15.5px] sm:left-[31.5px] w-[2px] bg-border-token" />

                <div className="flex flex-col gap-12">
                    {executionLogs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 80, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", mass: 2.5, damping: 20, stiffness: 100, delay: index * 0.15 }}
                            className="relative pl-8 sm:pl-12 group"
                        >
                            {/* Glowing Node Point */}
                            <div
                                className="absolute left-[-15px] sm:left-[-15px] top-1.5 w-[30px] h-[30px] rounded-full bg-surface border border-border-token flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-accent-pop"
                            >
                                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-accent-pop" />
                                {log.icon}
                            </div>

                            {/* Glowing Animated Data Packet moving down the line (only for first few to not clutter) */}
                            {index < executionLogs.length - 1 && (
                                <motion.div
                                    className={`absolute left-[-1.5px] sm:left-[-1.5px] top-[40px] w-[5px] h-[30px] rounded-full bg-gradient-to-b from-transparent via-accent-pop to-transparent z-0 blur-[1px]`}
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
                            <div className={`p-5 sm:p-6 rounded-2xl bg-surface border border-border-token group-hover:bg-raised transition-colors duration-300 group-hover:border-accent-pop/30`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-1">
                                    <span className={`font-mono text-xs sm:text-sm font-bold tracking-wider text-accent-pop`}>
                                        {log.status}
                                    </span>
                                    <span className="font-mono text-xs text-tx-muted mt-1 sm:mt-0">
                                        {log.date}
                                    </span>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-tx-primary tracking-tight mt-1 mb-1">
                                    {log.title}
                                </h3>
                                <h4 className="text-sm font-medium text-tx-muted mb-4">
                                    @ {log.entity}
                                </h4>

                                <p className="text-sm text-tx-muted leading-relaxed font-light">
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
