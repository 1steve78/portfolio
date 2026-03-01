"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const SUDO_CODE = ["s", "u", "d", "o"];

export default function GlobalEasterEggs() {
    const [konamiIndex, setKonamiIndex] = useState(0);
    const [sudoIndex, setSudoIndex] = useState(0);
    const [isHacked, setIsHacked] = useState(false);
    const [isSudoMode, setIsSudoMode] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check Konami
            if (e.key === KONAMI_CODE[konamiIndex]) {
                if (konamiIndex === KONAMI_CODE.length - 1) {
                    triggerHackedMode();
                    setKonamiIndex(0);
                } else {
                    setKonamiIndex(prev => prev + 1);
                }
            } else {
                setKonamiIndex(0);
            }

            // Check Sudo
            if (e.key.toLowerCase() === SUDO_CODE[sudoIndex]) {
                if (sudoIndex === SUDO_CODE.length - 1) {
                    triggerSudoMode();
                    setSudoIndex(0);
                } else {
                    setSudoIndex(prev => prev + 1);
                }
            } else {
                setSudoIndex(0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [konamiIndex, sudoIndex]);

    const triggerHackedMode = () => {
        setIsHacked(true);
        setTimeout(() => setIsHacked(false), 5000); // 5 seconds of madness
    };

    const triggerSudoMode = () => {
        setIsSudoMode(true);
        setTimeout(() => setIsSudoMode(false), 8000);
    };

    return (
        <>
            {/* Sudo Mode Overlay (Red Alert) */}
            <AnimatePresence>
                {isSudoMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] pointer-events-none mix-blend-color-burn"
                    >
                        <div className="absolute inset-0 bg-red-900/30 animate-pulse border-[10px] border-red-600/50" />
                        <div className="absolute top-10 w-full text-center">
                            <span className="inline-block px-4 py-2 bg-red-900/80 text-white font-mono font-bold tracking-widest uppercase border border-red-500 rounded">
                                WARNING: ROOT PRIVILEGES DETECTED
                            </span>
                        </div>
                        {/* Scanline overlay specific to sudo mode */}
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Konami Glitch Mode (Screen Shake & Cyberpunk colors inverted conceptually) */}
            <AnimatePresence>
                {isHacked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                            opacity: [0, 1, 0.8, 1, 0.6, 1],
                            x: [0, -10, 10, -10, 10, 0],
                            y: [0, 10, -10, 10, -10, 0],
                            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, repeat: 10 }} // Very chaotic shaking/glitching
                        className="fixed inset-0 z-[9998] pointer-events-none mix-blend-difference bg-white/10 backdrop-invert"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-8xl md:text-[15rem] font-black text-white/50 blur-[2px] font-mono mix-blend-overlay">
                                GHOST_IN_THE_SHELL
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
