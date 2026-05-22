import { loadYoutubeTranscript } from "../loaders/youtube.loader.js";
import { splitText } from "../utils/splitDocs.js";
import { generateEmbedding } from "../utils/embeddings.js";

import {
  client,
  COLLECTION_NAME,
  createCollection,
} from "../vectordb/qdrant.js";

import { llm } from "../config/groq.js";

import { indexDocuments } from "./hybrid.service.js";

export async function ingestYoutubeVideo(url) {

  await createCollection();

  console.log("Loading transcript...");

  const text = await loadYoutubeTranscript(url);

  console.log("Splitting text...");

  const chunks = await splitText(text);

  const validChunks = chunks.filter(
    (chunk) =>
      chunk?.pageContent &&
      typeof chunk.pageContent === "string" &&
      chunk.pageContent.trim() !== ""
  );

  console.log(`Total valid chunks: ${validChunks.length}`);

  const points = [];

  for (let i = 0; i < validChunks.length; i++) {

    const content = validChunks[i].pageContent;

    console.log(`Embedding chunk ${i + 1}`);

    const embedding = await generateEmbedding(content);

    points.push({
      id: Date.now() + i,

      vector: embedding,

      payload: {
        text: content,
        source: url,
      },
    });
  }

  console.log("Uploading to Qdrant...");

  await client.upsert(COLLECTION_NAME, {
    wait: true,
    points,
  });

  // BM25 Hybrid Search Indexing
  indexDocuments(validChunks);

  console.log("Video ingestion complete");
}

export async function searchYoutubeVideo(query) {

  if (!query || typeof query !== "string") {
    throw new Error("Invalid query");
  }

  // Generate query embedding
  const queryEmbedding = await generateEmbedding(query);

  // Vector Search
  const results = await client.search(
    COLLECTION_NAME,
    {
      vector: queryEmbedding,
      limit: 5,
    }
  );

  const safeResults = Array.isArray(results)
    ? results
    : results?.points || [];

  // Extract Context
  const context = safeResults
    .map((r) => r?.payload?.text)
    .filter(Boolean)
    .join("\n\n");

  // Prompt
  const prompt = `
You are a helpful AI assistant.

Answer ONLY from the provided YouTube transcript context.

Rules:
- Answer only from the provided context.
- If answer is not in context, say:
  "I could not find that in the video."
- Stay on topic and only answer from the video transcript.
- Be polite and concise.
- If the question is unrelated to the transcript, say:
  "I am here to answer questions related to the video transcript. Please ask a relevant question."

Context:
${context}

Question:
${query}
`;

  // LLM Call
  const response = await llm.invoke(prompt);

  return {
    answer: response.content,
    sources: [
      ...new Set(
        safeResults
          .map((r) => r?.payload?.source)
          .filter(Boolean)
      ),
    ],
  };
}