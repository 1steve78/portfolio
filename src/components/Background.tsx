"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Light Mode Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src="/bg-sky.png"
          alt="Daytime Sky"
          fill
          priority
          className="object-cover opacity-100"
        />
      </div>

      {/* Dark Mode Background (using the same sky but inverted and darkened for effect, or a dark version) */}
      <div className={`absolute inset-0 bg-slate-950 transition-opacity duration-1000 ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src="/bg-sky.png"
          alt="Night Sky"
          fill
          priority
          className="object-cover opacity-60 invert hue-rotate-180 brightness-75"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none transition-colors duration-1000" />
    </div>
  );
}
