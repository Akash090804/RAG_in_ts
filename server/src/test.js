import { loadYoutubeTranscript } from "./loaders/youtube.loader.js";
import { splitText } from "./utils/splitDocs.js";

async function main() {

  const text = await loadYoutubeTranscript(
    "https://youtu.be/lwus8DOkWO0?si=UKmxFmbBG8TLj3Zx"
  );

  const chunks = await splitText(text);

  console.log(chunks);

}

main();