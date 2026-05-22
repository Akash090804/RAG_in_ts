import {
  ingestYoutubeVideo,
  searchYoutubeVideo,
} from "../services/youtube.service.js";



export async function ingestController(req, res) {

  try {

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "Video URL required",
      });
    }

    await ingestYoutubeVideo(url);

    res.json({
      success: true,
      message: "Video ingested successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}



export async function chatController(req, res) {

  try {

    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Query required",
      });
    }

    const results = await searchYoutubeVideo(query);

    res.json(results);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}