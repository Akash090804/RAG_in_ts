import "./src/config/env.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ragRoutes from "./src/routes/rag.routes.js";
import youtubeRoutes from "./src/routes/youtube.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());



// Routes
app.use(
  "/api/youtube",
  youtubeRoutes
);
app.use(
  "/api/rag",
  ragRoutes
);
app.use(
  "/api/chat",
  chatRoutes
);


app.get("/", (req, res) => {

  res.send("YouTube RAG Backend Running");

});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});