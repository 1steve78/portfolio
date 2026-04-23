"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
const messageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// ─── Single message bubble ────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5
        ${isUser
          ? "bg-slate-100 dark:bg-slate-800"
          : "bg-blue-100 dark:bg-blue-900/30"}`}
      >
        {isUser
          ? <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          : <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
        ${isUser
          ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tr-sm"
          : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-tl-sm"}`}
      >
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <p className="font-sans whitespace-pre-wrap">
            {msg.content}
            {msg.streaming && (
              <span className="inline-block w-[4px] h-[1em] bg-blue-500 ml-1 align-middle animate-pulse rounded-full" />
            )}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content: "Hi! I'm Yasin's AI assistant. Ask me anything about his projects, skills, or background.",
    },
  ]);
  const [loading, setLoading]   = useState(false);

  const scrollRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const abortRef   = useRef<AbortController | null>(null);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus input when window opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: uid(), role: "user", content: text };
    const assistantId = uid();
    const assistantMsg: Message = { id: assistantId, role: "assistant", content: "", streaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error(`API error ${res.status}`);

      // Stream the response chunk-by-chunk
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        );
      }

      // Mark stream complete
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m))
      );
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, I'm currently offline or undergoing maintenance. Please try again later.", streaming: false }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const contentVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.1, duration: 0.2, ease: "easeOut" } 
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="chat-window"
            layoutId="chatbot-modal"
            className="bg-slate-50 dark:bg-slate-950 rounded-3xl flex flex-col overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50
                       w-[min(400px,calc(100vw-3rem))] h-[550px] border border-slate-200 dark:border-slate-800"
            style={{ borderRadius: 24 }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
          >
            <motion.div 
               variants={contentVariants} 
               initial="initial" 
               animate="animate" 
               exit="exit"
               className="flex flex-col h-full w-full"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="relative flex-shrink-0 w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">AI Assistant</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Yasin-AI</p>
                </div>
                <button
                  onClick={() => { abortRef.current?.abort(); setOpen(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-5"
              >
                {messages.map((msg) => (
                  <motion.div layout="position" key={msg.id}>
                    <Bubble msg={msg} />
                  </motion.div>
                ))}

                {loading && messages.at(-1)?.role !== "assistant" && (
                  <motion.div layout="position" className="flex items-center gap-2 text-slate-400 ml-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-medium">Assistant is thinking...</span>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-5 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question..."
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shrink-0"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Floating Orb */
          <motion.button
            key="orb"
            layoutId="chatbot-modal"
            onClick={() => setOpen(true)}
            className="relative flex items-center justify-center bg-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow"
            style={{ width: 64, height: 64, borderRadius: 32 }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              variants={contentVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              className="absolute inset-0 flex items-center justify-center"
            >
              <MessageCircle className="w-7 h-7" />
              
              {/* Notification dot */}
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-slate-950" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
