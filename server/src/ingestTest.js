import "dotenv/config";

import { ingestYoutubeVideo } from "./chains/ingest.js";

async function main() {

  await ingestYoutubeVideo(
    "https://www.youtube.com/watch?v=HXV3zeQKqGY"
  );

}

main();