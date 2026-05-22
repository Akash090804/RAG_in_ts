// controllers/rag.controller.js

import { askQuestion } from "../services/rag.service.js";

export async function askQuestionController(req, res) {

    try {

        const { query } = req.body;

        const response = await askQuestion(query);

        res.json(response);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
}