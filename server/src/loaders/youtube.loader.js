import { YoutubeTranscript } from "youtube-transcript";

export async function loadYoutubeTranscript(url) {

  try {

    const transcriptItems =
      await YoutubeTranscript.fetchTranscript(url);

    const text = transcriptItems
      .map(item => item.text)
      .join(" ");

    return text;

  } catch (error) {

    console.log("Transcript Loading Error");

    console.log(error.message);

    throw error;

  }

}