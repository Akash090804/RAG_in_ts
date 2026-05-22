import { useState } from "react";
import API from "../services/api";
import ChatBox from "../components/ChatBox";

export default function Home() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleIngest() {

    try {

      setLoading(true);

      await API.post("/youtube/ingest", {
        url,
      });

      alert("Video ingested successfully");

    } catch (error) {

      console.log(error);

      alert("Error ingesting video");

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="min-h-screen bg-[#1c1c1a] text-[#f5f1e8] flex flex-col">

      {/* Header */}
      <div className="border-b border-[#34342f] px-10 py-6 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-semibold tracking-wide">
            YouTube RAG
          </h1>

          <p className="text-sm text-[#b7b1a1] mt-1">
            Ask questions directly from video transcripts
          </p>

        </div>

        <div className="text-sm text-[#8b8678]">
          AI Knowledge Workspace
        </div>

      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Left Panel */}
        <div className="lg:w-[32%] border-r border-[#34342f] p-8 flex flex-col gap-6 bg-[#20201d]">

          <div>

            <h2 className="text-xl mb-2 font-medium">
              Add YouTube Video
            </h2>

            <p className="text-sm text-[#9c9687]">
              Paste a video URL to build an AI-searchable knowledge base.
            </p>

          </div>

          <textarea
            rows={4}
            placeholder="https://youtube.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="
              w-full
              rounded-2xl
              bg-[#2a2a26]
              border border-[#3c3c36]
              p-4
              outline-none
              text-[#f5f1e8]
              placeholder:text-[#7e7869]
              resize-none
              focus:border-[#8a7f5d]
              transition
            "
          />

          <button
            onClick={handleIngest}
            disabled={loading}
            className="
              bg-[#7c6f4f]
              hover:bg-[#99855c]
              text-white
              py-4
              rounded-2xl
              transition
              font-medium
            "
          >
            {loading
              ? "Processing Video..."
              : "Ingest Video"}
          </button>

          <div className="mt-4 text-sm text-[#8d8778] leading-7">

            <div>• Vector Search with Qdrant</div>
            <div>• Hybrid BM25 Retrieval</div>
            <div>• Groq LLM Responses</div>
            <div>• Streaming AI Chat</div>

          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 overflow-hidden">

          <ChatBox />

        </div>

      </div>

    </div>
  );
}