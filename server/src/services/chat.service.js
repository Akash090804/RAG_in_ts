import { generateEmbedding } from "../utils/embeddings.js";

import {
  client,
  COLLECTION_NAME,
} from "../vectordb/qdrant.js";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function streamAnswer(query, res) {

  // Embedding
  const embedding = await generateEmbedding(query);

  // Vector Search
  const results = await client.search(
    COLLECTION_NAME,
    {
      vector: embedding,
      limit: 5,
    }
  );

  const context = results
    .map((r) => r.payload.text)
    .join("\n\n");

  const prompt = `
You are a helpful AI assistant.

Answer ONLY from provided context.

Context:
${context}

Question:
${query}
`;

  // Streaming Completion
  const stream =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      stream: true,
    });

  for await (const chunk of stream) {

    const token =
      chunk.choices?.[0]?.delta?.content || "";

    res.write(token);
  }
}