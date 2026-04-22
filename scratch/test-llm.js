const { ChatOpenAI } = require("@langchain/openai");
require("dotenv").config({ path: ".env.local" });

async function test() {
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

  console.log("Invoking LLM...");
  try {
    const stream = await llm.stream("Hello, speak briefly.");
    let count = 0;
    for await (const chunk of stream) {
      process.stdout.write(chunk.content);
      count++;
    }
    console.log("\nDone! Received", count, "chunks.");
  } catch (err) {
    console.error("LLM Error:", err);
  }
}

test();
