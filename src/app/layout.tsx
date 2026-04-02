import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CursorFx from "@/components/CursorFx";
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
        className="antialiased bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30 min-h-screen pt-16 transition-colors duration-300"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <CursorFx />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
