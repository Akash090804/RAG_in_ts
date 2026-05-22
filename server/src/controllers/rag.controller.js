import { askQuestion } from "../services/rag.service.js";

export async function askQuestionController(req, res) {

  try {

    console.log("BODY:", req.body);

    const query =
      req.body.query ||
      req.body.question ||
      req.body.prompt;

    if (!query) {
      return res.status(400).json({
        error: "No query provided",
      });
    }

    const response = await askQuestion(query);

    res.json(response);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
}