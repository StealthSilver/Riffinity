import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, Send, Share2, Sparkles } from "lucide-react";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    console.log("message ", prompt, " threadId ", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.assistantReply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center text-center">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 cursor-pointer px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group">
          <Sparkles
            size={18}
            className="text-primary-400 group-hover:animate-sparkle-float"
          />
          <span className="text-base font-medium">GPT-4</span>
          <ChevronDown
            size={18}
            className="group-hover:translate-y-0.5 transition-transform duration-300"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300 group">
          <Share2
            size={18}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-base">Share</span>
        </button>
      </div>

      {/* Chat Area */}
      <Chat />

      {/* Loader */}
      {loading && (
        <div className="my-8">
          <PropagateLoader color="#7b2cbf" loading={loading} size={12} />
        </div>
      )}

      {/* Chat Input */}
      <div className="w-full flex flex-col justify-center items-center pb-6 px-4">
        <div className="w-full max-w-3xl relative flex justify-between items-center">
          <input
            type="text"
            placeholder="Message Riffinity..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prompt.trim()) getReply();
            }}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 pr-14 text-base placeholder:text-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          />
          <button
            onClick={getReply}
            disabled={!prompt.trim()}
            className={`absolute right-3 p-2.5 rounded-lg transition-all duration-300 ${
              prompt.trim()
                ? "bg-gradient-to-br from-primary-500 to-primary-400 hover:shadow-lg hover:shadow-primary-500/50 hover:scale-110 cursor-pointer"
                : "bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
          >
            <Send
              size={20}
              className={prompt.trim() ? "text-white" : "text-gray-400"}
            />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Riffinity can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
