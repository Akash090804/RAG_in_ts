import { QdrantClient } from "@qdrant/js-client-rest";

export const COLLECTION_NAME = "youtube_rag";

export const client = new QdrantClient({

  url: process.env.QDRANT_URL,

  apiKey: process.env.QDRANT_API_KEY,

  checkCompatibility: false,
});



export async function createCollection() {

  const collections =
    await client.getCollections();

  const exists =
    collections.collections.find(
      (c) => c.name === COLLECTION_NAME
    );

  if (exists) {

    console.log("Collection already exists");

    return;
  }

  await client.createCollection(
    COLLECTION_NAME,
    {
      vectors: {
        size: 384,
        distance: "Cosine",
      },
    }
  );
 
  console.log("Collection created");
}
 