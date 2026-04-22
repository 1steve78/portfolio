import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CursorFx from "@/components/CursorFx";
import AIChatbot from "@/components/AIChatbot";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Yasin | AI Systems & Agent Architect",
  description: "Digital Alter-Ego of Md Yasin. Building intelligent automation, RAG systems, and exploring embedded prototypes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased selection:bg-cyan-500/30 min-h-screen pt-16 transition-colors duration-300"
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="obsidian"
          themes={["obsidian", "chalk"]}
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/*
           * Pattachitra Heritage Pattern — persists across all routes at z-[-2]
           * Geometric motifs: lotus petals, peacock-eye diamonds, dotted mandalas,
           * and wave borders — modernized as pure SVG geometry.
           * Opacity 0.03 (3%) — purely textural, does NOT interfere with
           * glass-panel components (which set isolation: isolate).
           * Add mask-image to fade it out at the edges for a premium spotlight effect.
           */}
          <div
            aria-hidden="true"
            className="pattachitra-pattern fixed inset-0 z-[-2] pointer-events-none"
            style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)", maskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }}
          />

          {/* Ambient glow blobs — layered below glass panels */}
          <div aria-hidden="true" className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[var(--accent-glow)] blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[var(--accent-glow)] blur-[140px]" />
          </div>

          <CursorFx />
          <AIChatbot />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
