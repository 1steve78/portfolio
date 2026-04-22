import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { getResumeVectorStore } from "@/data/resume";

// ---------------------------------------------------------------------------
// SYSTEM PROMPT — Defines the Yasin-AI persona strictly
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are Yasin-AI, a digital clone of Md Yasin Alam, a high-output software engineering student specializing in full-stack web development and scalable AI backends.

Your rules:
- Answer ONLY from the provided context. Do not hallucinate or infer facts not present.
- If the context does not contain an answer, say: "I don't have that information on myself yet."
- Speak in first person, confidently and concisely, as if you are Yasin himself.
- Keep answers focused and clear. No fluff.

Context from knowledge base:
{context}

User question: {question}

Answer:`;

const prompt = PromptTemplate.fromTemplate(SYSTEM_PROMPT);

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: { role: string; content: string }[] = body.messages ?? [];

    if (!messages.length) {
      return new Response("No messages provided.", { status: 400 });
    }

    // Use only the latest user message for retrieval
    const userQuestion = messages[messages.length - 1].content?.trim();
    if (!userQuestion) {
      return new Response("Empty message.", { status: 400 });
    }

    // Retrieve top-k relevant context chunks from the cached vector store
    const vectorStore = await getResumeVectorStore();
    const retriever = vectorStore.asRetriever({ k: 4 });
    const relevantDocs = await retriever.invoke(userQuestion);
    const context = relevantDocs.map((d) => d.pageContent).join("\n\n");

    // NVIDIA NIM via OpenAI-compatible endpoint
    // ChatNVIDIA is not an npm package — this is the official approach for NIM
    const llm = new ChatOpenAI({
      model: "meta/llama-3.1-8b-instruct",
      temperature: 0.3,
      maxTokens: 512,
      streaming: true,
      apiKey: process.env.NVIDIA_API_KEY ?? "no-key",
      configuration: {
        baseURL: "https://integrate.api.nvidia.com/v1",
      },
    });

    // LCEL chain: prompt → LLM → string output
    const chain = RunnableSequence.from([
      RunnablePassthrough.assign({ context: () => context, question: () => userQuestion }),
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    // Stream tokens as they arrive from NVIDIA NIM
    const langchainStream = await chain.stream({});

    // Encode the LangChain async-iterable stream into a Web ReadableStream
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of langchainStream) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Accel-Buffering": "no", // disables Nginx buffering for true streaming
      },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/chat] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
