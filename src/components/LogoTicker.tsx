"use client";

import { Box, Target, Command, Cpu, Compass, Hexagon, Layers, Zap, Globe, Code2 } from "lucide-react";

const logos = [
  { icon: <Box size={18} />, name: "Logoipsum" },
  { icon: <Target size={18} />, name: "Logoipsum" },
  { icon: <Command size={18} />, name: "Logoipsum" },
  { icon: <Cpu size={18} />, name: "Logoipsum" },
  { icon: <Compass size={18} />, name: "Logoipsum" },
  { icon: <Hexagon size={18} />, name: "Logoipsum" },
  { icon: <Layers size={18} />, name: "Logoipsum" },
  { icon: <Zap size={18} />, name: "Logoipsum" },
  { icon: <Globe size={18} />, name: "Logoipsum" },
  { icon: <Code2 size={18} />, name: "Logoipsum" },
];

export default function LogoTicker() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 py-5 overflow-hidden">
      <div className="flex gap-12 animate-[marquee_20s_linear_infinite] w-max">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-slate-300 dark:text-slate-700 whitespace-nowrap select-none"
          >
            {logo.icon}
            <span className="font-semibold text-base tracking-tight">{logo.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
