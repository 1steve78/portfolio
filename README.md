# Portfolio OS — Md Yasin Alam

> A high-fidelity developer portfolio built with Next.js 16, Framer Motion, and a custom dual-theme design system. Features a live AI chatbot powered by NVIDIA NIM (Llama 3.1), real-time competitive programming stats, and an animated bento-grid projects showcase.

## ✨ Features

- **Dual Theme System** — "Obsidian Ink" (dark) & "Chalk & Brass" (light) with semantic CSS tokens and instant switching
- **AI Chatbot (Yasin-AI)** — RAG pipeline using LangChain + NVIDIA NIM (Llama 3.1 8B), grounded on resume data via an in-memory vector store
- **Live Stats Widget** — Fetches real-time ratings from Codeforces, LeetCode (GraphQL), and CodeChef with ISR caching and graceful fallbacks
- **Bento Projects Grid** — Physics-based 3D tilt cards with Framer Motion, animated orbits, and a staggered reveal
- **Terminal Intro** — Typewriter-style terminal animation that plays on first load
- **Encrypted Contact** — Cipher-reveal contact form animation
- **Magnetic Cursor FX** — Custom cursor that reacts to interactive elements
- **Global Easter Eggs** — Hidden Konami-code and keyboard shortcuts
- **Docker Support** — Fully containerised with a multi-stage Dockerfile and `docker-compose.yml`

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom CSS tokens |
| Animations | Framer Motion 12 |
| AI / LLM | LangChain · NVIDIA NIM (Llama 3.1 8B) |
| UI Components | Radix UI · shadcn/ui · Lucide React |
| Containerisation | Docker · Docker Compose |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- An [NVIDIA NIM API key](https://build.nvidia.com/) for the AI chatbot

### Local Development

```bash
# Install dependencies
npm install

# Create your environment file
cp .env.local.example .env.local   # then fill in NVIDIA_API_KEY

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|---|---|
| `NVIDIA_API_KEY` | API key for NVIDIA NIM (Llama 3.1) — required for the AI chatbot |

## 🐳 Docker

Build and run with a single command:

```bash
docker compose up --build
```

Or manually:

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run --rm -p 3000:3000 --env-file .env.local portfolio
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts       # Streaming AI chatbot endpoint (RAG + NVIDIA NIM)
│   │   └── stats/route.ts      # Live CP stats (Codeforces, LeetCode, CodeChef)
│   ├── page.tsx                # Root page — composes all sections
│   └── template.tsx            # Page transition wrapper
├── components/
│   ├── AgencyHero.tsx          # Hero section with animated headline
│   ├── ProjectsSection.tsx     # Bento-grid projects showcase
│   ├── SkillsSection.tsx       # Skills & expertise grid
│   ├── LiveStatsWidget.tsx     # Real-time competitive programming stats
│   ├── AIChatbot.tsx           # Floating AI chat interface
│   ├── TerminalIntro.tsx       # Boot-sequence terminal animation
│   ├── EncryptedContact.tsx    # Cipher-reveal contact section
│   ├── ExecutionTrace.tsx      # Animated code/trace visual
│   ├── Navbar.tsx              # Top navigation with theme toggle
│   ├── ThemeToggle.tsx         # Light/dark theme switcher
│   ├── MagneticWrapper.tsx     # Magnetic cursor physics wrapper
│   ├── CursorFx.tsx            # Custom cursor component
│   └── GlobalEasterEggs.tsx    # Hidden keyboard shortcuts & Konami code
└── data/
    └── resume.ts               # Resume content + vector store for RAG
```

## 📦 Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

Deploy instantly on [Vercel](https://vercel.com) — just connect your repository and add the `NVIDIA_API_KEY` environment variable in the project settings.

---

Built by **Md Yasin Alam** — [GitHub](https://github.com/MD-YASIN) · [Codeforces](https://codeforces.com/profile/MD_YASIN) · [LeetCode](https://leetcode.com/yasin_1)
