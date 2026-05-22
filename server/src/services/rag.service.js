import { searchYoutubeVideo } from "./youtube.service.js";

export async function askQuestion(query) {

  if (!query || typeof query !== "string") {
    throw new Error("Query is required");
  }

  const response = await searchYoutubeVideo(query);

  return response;
}