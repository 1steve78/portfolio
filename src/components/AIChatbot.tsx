"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, BrainCircuit } from "lucide-react";

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
const orbVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1,   opacity: 1 },
  exit:    { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

const windowVariants = {
  initial: { opacity: 0, scale: 0.92, y: 24, originX: 1, originY: 1 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: {
    opacity: 0, scale: 0.92, y: 16,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const messageVariants = {
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
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5
        ${isUser
          ? "bg-accent-pop/20 border border-accent-pop/30"
          : "bg-surface border border-border-token"}`}
      >
        {isUser
          ? <User    className="w-3.5 h-3.5 text-accent-pop" />
          : <Bot     className="w-3.5 h-3.5 text-tx-muted" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? "bg-accent-pop/10 border border-accent-pop/30 text-tx-primary rounded-tr-sm"
          : "bg-surface border border-border-token text-tx-primary rounded-tl-sm"}`}
      >
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <p className="font-mono text-[13px] text-tx-muted whitespace-pre-wrap">
            {msg.content}
            {msg.streaming && (
              <span className="inline-block w-[2px] h-[1em] bg-accent-pop ml-0.5 align-middle animate-pulse" />
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
      content: "> Yasin-AI online.\nAsk me anything about Yasin's projects, skills, or background.",
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

      // Stream the response chunk-by-chunk → typewriter effect
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
            ? { ...m, content: "[error] Failed to reach Yasin-AI. Check NVIDIA_API_KEY.", streaming: false }
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

  const contentVariants = {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.1 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence mode="wait">

        {/* ── STATE B: Chat window ─────────────────────────────────────────── */}
        {open ? (
          <motion.div
            key="chat-window"
            layoutId="chatbot-modal"
            className="bg-surface rounded-2xl flex flex-col overflow-hidden shadow-2xl
                       w-[min(380px,calc(100vw-3rem))] h-[520px] border border-border-token"
            style={{ borderRadius: 16 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
          >
            {/* Wrapper for internal content to dissolve in *after* morph */}
            <motion.div 
               variants={contentVariants} 
               initial="initial" 
               animate="animate" 
               exit="exit"
               className="flex flex-col h-full w-full"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border-token bg-raised/50">
                <div className="relative">
                  <BrainCircuit className="w-5 h-5 text-accent-pop" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent-pop ring-1 ring-canvas" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-tx-primary leading-none">Yasin-AI</p>
                  <p className="text-[10px] font-mono text-tx-muted mt-0.5">RAG · LLaMA-3.1 · NVIDIA NIM</p>
                </div>
                <button
                  onClick={() => { abortRef.current?.abort(); setOpen(false); }}
                  className="p-1.5 rounded-lg hover:bg-raised text-tx-muted hover:text-tx-primary transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
              >
                {messages.map((msg) => (
                  <motion.div layout="position" key={msg.id}>
                    <Bubble msg={msg} />
                  </motion.div>
                ))}

                {loading && messages.at(-1)?.role !== "assistant" && (
                  <motion.div layout="position" className="flex items-center gap-2 text-tx-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="text-xs font-mono">Thinking…</span>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-3 py-3 border-t border-border-token bg-raised/50">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border-token
                                focus-within:border-accent-pop/50 transition-colors">
                  <span className="font-mono text-accent-pop text-sm select-none">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Yasin…"
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-tx-primary placeholder:text-tx-muted
                               outline-none font-mono disabled:opacity-50"
                    aria-label="Chat input"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="p-1.5 rounded-lg text-tx-muted hover:text-accent-pop hover:bg-accent-pop/10
                               disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    {loading
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Send    className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[9px] font-mono text-tx-muted mt-1.5 text-center tracking-wider">
                  POWERED BY NVIDIA NIM · LANGCHAIN RAG
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── STATE A: Floating orb ─────────────────────────────────────────── */
          <motion.button
            key="orb"
            layoutId="chatbot-modal"
            onClick={() => setOpen(true)}
            aria-label="Open Yasin-AI chat"
            className="relative flex items-center justify-center
                       bg-surface
                       border border-border-token shadow-2xl cursor-pointer hover:border-accent-pop"
            style={{ width: 56, height: 56, borderRadius: 28 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <motion.div 
              variants={contentVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Continuous float animation */}
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center justify-center relative z-10"
              >
                <BrainCircuit className="w-6 h-6 text-accent-pop" />
              </motion.span>

              {/* Pulsing outer glow ring */}
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-accent-pop/30 pointer-events-none"
              />

              {/* Online indicator */}
              <span className="absolute top-[3px] right-[3px] w-2.5 h-2.5 rounded-full bg-accent-pop
                               ring-2 ring-canvas shadow z-20">
                <span className="animate-ping absolute inset-0 rounded-full bg-accent-pop opacity-75" />
              </span>
            </motion.div>
          </motion.button>
        )}

      </AnimatePresence>
    </div>
  );
}
