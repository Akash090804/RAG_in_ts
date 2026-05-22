# 🎥 YouTube RAG AI

An end-to-end AI-powered Retrieval-Augmented Generation (RAG) system that allows users to ingest YouTube videos, generate semantic embeddings, store them in a vector database, and ask contextual questions directly from video transcripts using LLMs.

---

# 🚀 Live Demo

## Frontend
https://youtuberag-three.vercel.app/

## Backend API
https://backend-for-ragjs.onrender.com

---

# 📌 Features

- 🔍 Semantic Vector Search using Qdrant
- 🧠 Retrieval-Augmented Generation (RAG)
- 💬 Streaming AI Chat Responses
- 🧾 YouTube Transcript Ingestion
- ⚡ Groq LLM Integration
- 🗂️ Hybrid Retrieval (Vector + BM25)
- 🧠 Session-based Conversational Memory
- 🌐 Full Stack Deployment (Vercel + Render)
- 📦 Modular Backend Architecture
- 🎨 Modern Responsive UI

---

# 🏗️ System Architecture

```text
                ┌────────────────────┐
                │   YouTube Video    │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Transcript Loader  │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │  Text Chunking     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Embedding Model    │
                │ (SentenceTransformer)
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │  Qdrant Vector DB  │
                └─────────┬──────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
 ┌──────────────────┐          ┌──────────────────┐
 │ Vector Retrieval │          │ BM25 Retrieval   │
 └────────┬─────────┘          └────────┬─────────┘
          └──────────────┬──────────────┘
                         ▼
              ┌────────────────────┐
              │   Hybrid Context   │
              └─────────┬──────────┘
                        ▼
              ┌────────────────────┐
              │    Groq LLM        │
              └─────────┬──────────┘
                        ▼
              ┌────────────────────┐
              │ Streaming Response │
              └────────────────────┘
```

---

# 🧠 How It Works

## 1. Video Ingestion

The user submits a YouTube URL.

The backend:
- extracts the transcript
- splits transcript into chunks
- generates embeddings
- stores vectors inside Qdrant

---

## 2. Hybrid Retrieval

When the user asks a question:

- semantic vector search is performed
- BM25 keyword search is performed
- results are combined into contextual knowledge

---

## 3. AI Response Generation

The retrieved context is injected into a custom RAG prompt and sent to Groq LLM.

The response is:
- streamed token-by-token
- displayed in real time on frontend

---

# 🧱 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

---

## Backend

- Node.js
- Express.js

---

## AI / RAG Stack

- LangChain
- Groq LLM
- Sentence Transformers
- Qdrant Vector Database
- BM25 Search (wink-bm25)

---

## Deployment

### Frontend
- Vercel

### Backend
- Render

### Vector Database
- Qdrant Cloud

---

# 📂 Project Structure

```text
RAG_in_ts/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── loaders/
│   │   ├── prompts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── vectordb/
│   │
│   └── index.js
│
└── README.md
```

---

# ⚙️ Backend Architecture

The backend follows a modular scalable architecture.

## Layers

### Controllers
Handle incoming HTTP requests and responses.

### Services
Contain business logic like:
- ingestion
- retrieval
- hybrid search
- RAG pipeline

### Loaders
Responsible for loading external data sources like YouTube transcripts.

### Utils
Reusable utilities:
- embeddings
- chunking
- helper functions

### VectorDB
Handles Qdrant vector database operations.

### Prompts
Contains custom RAG prompt templates.

---

# 🔄 RAG Pipeline Flow

```text
User Query
    ↓
Generate Query Embedding
    ↓
Qdrant Vector Search
    ↓
BM25 Keyword Search
    ↓
Merge Retrieved Context
    ↓
Construct RAG Prompt
    ↓
Send to Groq LLM
    ↓
Stream AI Response
```

---

# 🧠 Memory System

The project supports session-based conversational memory.

Current implementation:
- in-memory session storage

Future roadmap:
- persistent chat memory
- Redis
- long-term memory retrieval

---

# 🔍 Hybrid Search

The system uses:

## Semantic Search
Vector similarity using embeddings.

## Keyword Search
BM25 lexical retrieval for exact keyword matching.

Combining both improves:
- retrieval accuracy
- contextual relevance
- factual grounding

---

# 🌐 API Endpoints

## Ingest YouTube Video

```http
POST /api/youtube/ingest
```

### Body

```json
{
  "url": "https://youtube.com/watch?v=..."
}
```

---

## Ask Questions

```http
POST /api/chat/stream
```

### Body

```json
{
  "query": "What is SQL?"
}
```

---

# 🛠️ Environment Variables

## Backend `.env`

```env
GROQ_API_KEY=your_groq_api_key

QDRANT_URL=your_qdrant_cloud_url

QDRANT_API_KEY=your_qdrant_api_key

PORT=8000
```

---

# 🧪 Running Locally

## Clone Repository

```bash
git clone https://github.com/Akash090804/RAG_in_ts.git
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 📸 Screenshots

## Home Interface

- YouTube video ingestion
- AI chat workspace
- streaming responses

## Features

- semantic retrieval
- hybrid search
- contextual answers

---

# 🚧 Known Limitations

- Some YouTube videos disable transcript access
- Render free tier cold starts
- Session memory currently non-persistent

---

# 🔮 Future Improvements

- Persistent Memory
- Redis Session Store
- Whisper-based Audio Transcription
- Multi-video Knowledge Base
- PDF / Document Uploads
- Source Citations
- Authentication
- User Workspaces
- Multi-modal RAG
- Agentic Retrieval Pipeline

---

# 📚 Learning Outcomes

This project demonstrates:

- Full-stack AI application development
- Production-grade RAG pipelines
- Vector databases
- Semantic search
- Hybrid retrieval
- Streaming LLM responses
- AI system architecture
- Cloud deployment workflows

---

# 👨‍💻 Author

## Akash Varshney

Built as an advanced AI Engineering / RAG Systems project.

---

# ⭐ If You Like This Project

Give it a star on GitHub ⭐
