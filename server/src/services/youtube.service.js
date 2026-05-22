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

  console.log(`Total chunks: ${chunks.length}`);

  const points = [];

  for (let i = 0; i < chunks.length; i++) {

    console.log(`Embedding chunk ${i + 1}`);

    const embedding = await generateEmbedding(
      chunks[i].pageContent
    );

    points.push({
      id: Date.now() + i,

      vector: embedding,

      payload: {
        text: chunks[i].pageContent,
        source: url,
      },
    });
  }

  console.log("Uploading to Qdrant...");

  await client.upsert(COLLECTION_NAME, {
    wait: true,
    points,
  });

  console.log("Video ingestion complete");
}


indexDocuments(chunks);


export async function searchYoutubeVideo(query) {

  // Generate query embedding
  const queryEmbedding =
    await generateEmbedding(query);




  // Vector Search
  const results = await client.search(
    COLLECTION_NAME,
    {
      vector: queryEmbedding,
      limit: 5,
    }
  );




  // Extract Context
  const context = results
    .map((r) => r.payload.text)
    .join("\n\n");




  // Prompt
  const prompt = `
You are a helpful AI assistant.

Answer ONLY from the provided YouTube transcript context.

If answer is not present in context,

say "I could not find that in the video. stay on topic and only answer from the video transcript. and be polite and concise
Rules:
- Answer only from the provided context.
- If answer is not in context, say "I could not find that in the video.
- Stay on topic and only answer from the video transcript.
- Be polite and concise.
-Stay away from answering questions that are not related to the video transcript. like political or general knowledge questions. if the question is not related to the video transcript, say "I am here to answer questions related to the video transcript. please ask a relevant question.



Context:
${context}



Question:
${query}
`;




  // LLM Call
  const response = await llm.invoke(prompt);




  return {
    answer: response.content,
    sources: results.map((r) => r.payload.source),
  };
}