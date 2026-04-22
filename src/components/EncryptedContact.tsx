"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Lock, Unlock, Mail, ArrowRight } from "lucide-react";

export default function EncryptedContact() {
    const [isHovered, setIsHovered] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);

    const handleContact = () => {
        setIsInitializing(true);
        // Simulate connection delay for effect
        setTimeout(() => {
            window.location.href = "mailto:yasinsteve4@gmail.com";
            setIsInitializing(false);
        }, 1500);
    };

    return (
        <div className="w-full relative py-8 mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >
                <button
                    onClick={handleContact}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={isInitializing}
                    className="relative group w-full flex flex-col items-center justify-center p-6 sm:p-12 rounded-3xl overflow-hidden border border-border-token bg-surface hover:border-accent-pop/50 transition-all duration-500 hover:shadow-[0_0_40px_var(--accent-glow)] disabled:opacity-80 disabled:cursor-wait"
                >
                    {/* Animated Background Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-pop/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Scanline effect on hover */}
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }} />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        {/* Morphing Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-raised border border-border-token flex items-center justify-center group-hover:bg-accent-pop/10 group-hover:border-accent-pop/30 transition-all duration-500 mb-2 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!isHovered && !isInitializing && (
                                    <motion.div key="lock" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                        <Lock className="w-8 h-8 text-tx-muted" />
                                    </motion.div>
                                )}
                                {isHovered && !isInitializing && (
                                    <motion.div key="unlock" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                        <Unlock className="w-8 h-8 text-accent-pop" />
                                    </motion.div>
                                )}
                                {isInitializing && (
                                    <motion.div key="mail" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                        <Mail className="w-8 h-8 text-accent-pop animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <h2 className="text-xl sm:text-3xl font-bold text-tx-primary tracking-tight flex items-center gap-2 text-center">
                            {isInitializing ? (
                                <span className="text-accent-pop">Negotiating Handshake...</span>
                            ) : (
                                <>
                                    <Terminal className="w-5 h-5 text-accent-pop hidden sm:block shrink-0" />
                                    <span>Initialize Encrypted Channel</span>
                                </>
                            )}
                        </h2>

                        <p className="text-tx-muted font-mono text-sm sm:text-base max-w-md text-center">
                            {isInitializing
                                ? "> Establishing secure P2P connection to yasinsteve4@gmail.com..."
                                : "> Ready to deploy logic? Open a direct, secure comms link."}
                        </p>

                        {/* Simulated progress bar when clicked */}
                        <div className="h-1 w-full max-w-xs bg-raised rounded-full mt-4 overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 bottom-0 left-0 bg-accent-pop"
                                initial={{ width: "0%" }}
                                animate={{ width: isInitializing ? "100%" : isHovered ? "15%" : "0%" }}
                                transition={{ duration: isInitializing ? 1.5 : 0.3 }}
                            />
                        </div>

                    </div>
                </button>
            </motion.div>
        </div>
    );
}
