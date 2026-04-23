"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    category: "AI Engineering",
    title: "Building Production-Ready RAG Pipelines",
    desc: "A deep-dive into building retrieval-augmented generation systems that actually work in production — from chunking strategies to re-ranking.",
    date: "Apr 2025",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-blue-800 to-blue-950",
  },
  {
    category: "Full-Stack",
    title: "How I Structure Large Next.js Applications",
    desc: "My opinionated approach to organizing Next.js 16 apps — folder structure, data fetching patterns, and component architecture.",
    date: "Mar 2025",
    readTime: "6 min read",
    image: "bg-gradient-to-br from-slate-800 to-slate-950",
  },
  {
    category: "Chess & AI",
    title: "Machine Learning in Chess: Beyond Stockfish",
    desc: "Exploring how neural networks like AlphaZero changed everything we knew about chess engines and what it means for AI research.",
    date: "Feb 2025",
    readTime: "10 min read",
    image: "bg-gradient-to-br from-teal-800 to-teal-950",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="w-full bg-white dark:bg-slate-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
            Blog
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-16 leading-tight">
          Writing & Thoughts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-400 cursor-pointer"
            >
              {/* Image block */}
              <div className={`${post.image} h-48 flex items-end p-6`}>
                <span className="text-xs font-semibold text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {post.desc}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{post.date} · {post.readTime}</span>
                  <ArrowUpRight size={16} className="group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
