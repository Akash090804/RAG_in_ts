import { generateEmbedding } from "./utils/embeddings.js";

async function main() {

  const embedding = await generateEmbedding(
    "Neural networks are amazing"
  );

  console.log(embedding.length);

}

main();