"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 py-3
        ${scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-800/50"
          : "bg-white/20 dark:bg-slate-950/20 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center transition-all group-hover:scale-110">
            <span className="text-white dark:text-slate-900 text-sm font-bold">Y</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Yasin</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Theme + Contact */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-[#D4FF00] text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#C5EF00] transition-all"
          >
            Contact Me
          </a>
          <button
            className="md:hidden p-2 text-slate-700 dark:text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mx-4 mt-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="bg-[#D4FF00] text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-full text-center mt-2">
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
