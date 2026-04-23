"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navLinks = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
  ];
  const moreLinks = [
    ["Blog", "#blog"],
    ["Contact", "#contact"],
    ["GitHub", "https://github.com"],
    ["LinkedIn", "https://linkedin.com"],
  ];

  return (
    <footer id="contact" className="w-full bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-slate-900 text-sm font-bold">Y</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Yasin</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
              Easily adapt to changes and scale your operations with flexible, AI-powered development built for growth.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-white mb-3">Subscribe to my newsletter</div>
              {submitted ? (
                <p className="text-green-400 text-sm font-medium">Thanks! You're subscribed. 🎉</p>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-slate-900 border border-slate-800 text-white text-sm px-4 py-2.5 rounded-full focus:outline-none focus:border-slate-600 placeholder:text-slate-500"
                  />
                  <button
                    onClick={() => email && setSubmitted(true)}
                    className="flex items-center gap-1.5 bg-[#D4FF00] text-slate-900 font-bold text-xs px-4 py-2.5 rounded-full hover:bg-[#C5EF00] transition-all"
                  >
                    Submit
                    <ArrowUpRight size={12} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: <Github size={16} />, href: "https://github.com" },
                { icon: <Linkedin size={16} />, href: "https://linkedin.com" },
                { icon: <Twitter size={16} />, href: "https://twitter.com" },
                { icon: <Mail size={16} />, href: "mailto:hi@yasin.dev" },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav col 1 */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Navigation</div>
            <ul className="space-y-3">
              {navLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav col 2 */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">More</div>
            <ul className="space-y-3">
              {moreLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <span>© 2025 Yasin Inc. All rights reserved.</span>
          <span>Built with Next.js & Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
