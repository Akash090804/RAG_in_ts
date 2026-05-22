import "dotenv/config";

import { retrieveRelevantChunks } from "./chains/retrieve.js";

async function main() {

  const results = await retrieveRelevantChunks(
    "What is neural network?"
  );

  console.log(results);

}

main();