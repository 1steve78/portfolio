import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Md Yasin | Full-Stack & AI Engineer",
  description: "Building intelligent systems with AI and strategy. Full-Stack Developer specializing in Next.js, Python, and LLM engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-white overflow-x-hidden w-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
