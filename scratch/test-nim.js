require('dotenv').config({ path: '.env.local' });

async function testNIM() {
  console.log("Key length:", process.env.NVIDIA_API_KEY ? process.env.NVIDIA_API_KEY.length : 0);
  console.log("Testing embedQuery...");
  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "nvidia/nv-embedqa-e5-v5",
        input: ["Testing one two three"],
        input_type: "query",
        encoding_format: "float",
      }),
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data keys:", Object.keys(data));
    if (data.error) console.log("Error object:", data.error);
    else console.log("Got embedding length:", data.data[0].embedding.length);
  } catch (err) {
    console.error("Failed:", err);
  }
}

testNIM();
