import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// ---------------------------------------------------------------------------
// RESUME DATA — Raw string exported for use and seeding into the vector store
// ---------------------------------------------------------------------------
export const RESUME_TEXT = `
# Md Yasin Alam — Software Engineering Student & AI Developer

## Identity
Name: Md Yasin Alam
Age: 19 years old
Role: High-output software engineering student
Specialization: Full-stack MERN development, Next.js, and scalable AI backends

## Education
- B.Tech in Computer Science and Engineering — Kalyani Government Engineering College (KGEC), 2025–2029
- Higher Secondary (Class 12) — Bholananda National Vidyalaya, 2024–2025 (Completed)
- Secondary (Class 10) — Bholananda National Vidyalaya, 2022–2023 (Completed)

## Projects

### TrustLens AI
Type: AI-Powered Cybersafety Platform
Description: A full-stack platform engineered to simulate and analyze social engineering attacks in real time. The system features an adaptive AI scammer whose manipulation behavior (urgency injection, authority spoofing, emotional triggers) evolves dynamically using an LLM backend. The platform logs all interactions and runs LLM-based analysis on tactics to identify manipulation patterns, providing users with actionable security literacy feedback.
Tech Stack: Next.js 14, Mistral AI (LLM backend), Prisma ORM, PostgreSQL, TypeScript, TailwindCSS
Key Features: Adaptive scammer logic, real-time LLM analysis, manipulation tactic classification, scalable stateless backend

### Heritage-Lens
Type: Cultural Heritage Explorer
Description: A digital platform for exploring and interacting with historical heritage data. Integrates the OpenRouter API to provide multi-model LLM interactions over structured cultural datasets. Features include dynamic querying of heritage entities, structured data models to classify artifacts, locations, and historical timelines, and an intuitive frontend for non-technical users.
Tech Stack: Next.js, OpenRouter API (multi-LLM gateway), React, TailwindCSS, structured JSON data models
Key Features: OpenRouter API integration, multi-LLM support, structured data querying, cultural data visualization

## Competitive Programming
- Codeforces: Rating 912, Handle: MD_YASIN
- CodeChef: Rating 1374
- LeetCode: 220+ problems solved, Handle: yasin_1
- Active on competitive platforms focusing on algorithms, data structures, and problem solving

## Technical Skills
Languages: JavaScript, TypeScript, Python
Frontend: React, Next.js, TailwindCSS, Framer Motion, Shadcn UI, HTML/CSS
Backend: Node.js, Express.js, REST APIs, GraphQL basics
Databases: MongoDB, PostgreSQL, Prisma ORM, Redis (basics)
AI/ML: LangChain.js, RAG pipelines, OpenRouter API, NVIDIA AI Endpoints, Mistral AI, LLM integration
DevOps: Docker, Docker Compose, Git, GitHub Actions (basics)
Tools: VS Code, Postman, ESLint, npm/pnpm

## Social & Contact
GitHub: github.com/1steve78
LinkedIn: linkedin.com/in/md-yasin-alam-895039267
LeetCode: leetcode.com/u/yasin_1/
Codeforces: codeforces.com/profile/MD_YASIN
`;

import { Embeddings } from "@langchain/core/embeddings";

// ---------------------------------------------------------------------------
// VECTOR STORE — Cached globally to prevent cold-start re-initialization
// ---------------------------------------------------------------------------
type GlobalVectorStoreCache = {
  vectorStorePromise_v2: Promise<MemoryVectorStore> | undefined;
};

const globalCache = globalThis as unknown as GlobalVectorStoreCache;

class NIMEmbeddings extends Embeddings {
  model = "nvidia/nv-embedqa-e5-v5";

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const res = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: texts,
        input_type: "passage",
        encoding_format: "float",
      }),
    });
    
    if (!res.ok) {
      const err = await res.text();
      console.error("[NIMEmbeddings] embedDocuments Error:", res.status, err);
      throw new Error(`NVIDIA API Error: ${err}`);
    }
    
    const data = await res.json();
    return data.data.map((d: any) => d.embedding);
  }

  async embedQuery(text: string): Promise<number[]> {
    const res = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: [text],
        input_type: "query",
        encoding_format: "float",
      }),
    });
    
    if (!res.ok) {
      const err = await res.text();
      console.error("[NIMEmbeddings] embedQuery Error:", res.status, err);
      throw new Error(`NVIDIA API Error: ${err}`);
    }
    
    const data = await res.json();
    return data.data[0].embedding;
  }
}

async function initVectorStore(): Promise<MemoryVectorStore> {
  console.log("[RAG] Building MemoryVectorStore from resume data...");

  // Split resume text into overlapping chunks for better retrieval precision
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 80,
    separators: ["\n\n", "\n", " "],
  });

  const docs = await splitter.createDocuments([RESUME_TEXT]);
  console.log(`[RAG] Created ${docs.length} document chunks.`);

  // Custom Embeddings class to handle NVIDIA's strict input_type requirement.
  const embeddings = new NIMEmbeddings({});

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  console.log("[RAG] MemoryVectorStore ready.");
  return store;
}

/**
 * Returns the cached MemoryVectorStore. On first call it initializes it.
 * Subsequent calls (including across HMR reloads) reuse the same instance
 * via Node's \`globalThis\`, preventing repeated cold-start embedding calls.
 */
export async function getResumeVectorStore(): Promise<MemoryVectorStore> {
  if (!globalCache.vectorStorePromise_v2) {
    globalCache.vectorStorePromise_v2 = initVectorStore();
  }
  return globalCache.vectorStorePromise_v2;
}
