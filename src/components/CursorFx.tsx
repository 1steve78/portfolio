"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorFx() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const springX = useSpring(-100, { stiffness: 500, damping: 28 });
    const springY = useSpring(-100, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX - 16);
            springY.set(e.clientY - 16);
        };

        // Only show on desktop devices
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [springX, springY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/50 pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ x: springX, y: springY }}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[100]"
                style={{ transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)` }}
            />
        </>
    );
}
