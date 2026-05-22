import express from "express";
import { streamChatController } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/stream", streamChatController);

export default router;