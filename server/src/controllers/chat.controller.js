import { streamAnswer } from "../services/chat.service.js";

export async function streamChatController(req, res) {

  try {

    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Query required",
      });
    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await streamAnswer(query, res);

    res.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
}