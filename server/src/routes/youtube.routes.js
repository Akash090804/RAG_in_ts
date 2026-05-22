import express from "express";

import {
  ingestController,
  chatController,
} from "../controllers/youtube.controller.js";

const router = express.Router();



// Ingest YouTube Video
router.post(
  "/ingest",
  ingestController
);


// Chat with Video
router.post(
  "/chat",
  chatController
);

export default router;