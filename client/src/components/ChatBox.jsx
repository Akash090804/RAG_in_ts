import { useEffect, useRef, useState } from "react";

import API from "../services/api";

export default function ChatBox() {

  const [query, setQuery] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  async function handleAsk() {

    if (!query.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: query,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      // Streaming API Call
      const response = await fetch(
        `${API.defaults.baseURL}/chat/stream`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
          }),
        }
      );

      const reader =
        response.body.getReader();

      const decoder = new TextDecoder();

      let aiText = "";

      // Empty AI placeholder
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "",
        },
      ]);

      while (true) {

        const { done, value } =
          await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value);

        aiText += chunk;

        setMessages((prev) => {

          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            text: aiText,
          };

          return updated;
        });
      }

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);

    } finally {

      setLoading(false);

      setQuery("");
    }
  }

  return (

    <div className="h-full flex flex-col">

      {/* Chat Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          rounded-3xl
          bg-[#232320]
          border border-[#34342f]
          p-6
          flex flex-col gap-5
          shadow-2xl
        "
      >

        {messages.length === 0 && (

          <div
            className="
              h-full
              flex
              items-center
              justify-center
              text-[#7d786d]
              text-lg
            "
          >
            Start asking questions about the video...
          </div>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`
              max-w-[80%]
              px-5
              py-4
              rounded-3xl
              leading-7
              text-[15px]
              whitespace-pre-wrap
              shadow-md
              ${
                msg.role === "user"
                  ? "self-end bg-[#7c6f4f] text-white"
                  : "self-start bg-[#2f2f2a] text-[#ece6d9]"
              }
            `}
          >
            {msg.text}
          </div>
        ))}

        {loading && (

          <div className="text-[#8b8578] text-sm animate-pulse">

            AI is thinking...

          </div>
        )}

        {/* Auto Scroll */}
        <div ref={chatEndRef} />

      </div>

      {/* Input */}
      <div className="mt-5 flex gap-4">

        <input
          type="text"
          placeholder="Ask something about the video..."
          value={query}

          onChange={(e) =>
            setQuery(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleAsk();
            }
          }}

          className="
            flex-1
            bg-[#2a2a26]
            border border-[#3c3c36]
            rounded-2xl
            px-5
            py-4
            outline-none
            text-[#f5f1e8]
            placeholder:text-[#7d786d]
            focus:border-[#8a7f5d]
            transition
          "
        />

        <button
          onClick={handleAsk}

          disabled={loading}

          className="
            px-8
            rounded-2xl
            bg-[#7c6f4f]
            hover:bg-[#9b8960]
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            font-medium
          "
        >
          {loading ? "..." : "Ask"}
        </button>

      </div>

    </div>
  );
}