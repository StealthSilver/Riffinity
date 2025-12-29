import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, SendHorizontal, Share, Cpu, Menu } from "lucide-react";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    currentModel,
    setCurrentModel,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const modelRef = useRef<HTMLDivElement | null>(null);

  const models = [
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-4.1-mini",
    "gpt-4.1",
    "o3-mini",
    "gemini-1.5-flash",
  ];

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
        model: currentModel,
      }),
    };

    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/chat`, options);
      const res = await response.json();
      console.log(res);

      if (res.error) {
        setReply(`Error: ${res.error}`);
      } else {
        setReply(res.assistantReply);
      }
    } catch (err) {
      console.error("Error in getReply:", err);
      setReply("Failed to get response from server. Please try again.");
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

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
    }
    if (modelMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modelMenuOpen]);

  return (
    <div className="flex flex-col h-screen w-full bg-transparent relative">
      {/* navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10 glass-sm">
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/20 transition-smooth text-white"
          aria-label="Open menu"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          <Menu size={24} />
        </button>

        <div
          className="relative flex items-center gap-3 px-4 py-2 glass rounded-full cursor-pointer hover:bg-white/12 transition-smooth"
          onClick={() => setModelMenuOpen((o) => !o)}
          ref={modelRef}
        >
          <Cpu size={20} className="text-cyan-400" />
          <span className="hidden sm:inline text-sm font-semibold text-white">
            Model
          </span>
          <ChevronDown
            className={`transition-transform duration-300 text-white ${
              modelMenuOpen ? "rotate-180" : ""
            }`}
            size={18}
          />

          {modelMenuOpen && (
            <div className="absolute top-full left-0 mt-3 w-64 glass rounded-2xl p-3 shadow-2xl z-50">
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 opacity-80 border-b border-white/10 mb-3">
                Available Models
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {models.map((m) => (
                  <button
                    key={m}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      m === currentModel
                        ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white border border-cyan-400/50 shadow-lg"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentModel(m);
                      setModelMenuOpen(false);
                    }}
                  >
                    <Cpu
                      size={16}
                      className={m === currentModel ? "text-cyan-400" : ""}
                    />
                    <span>{m}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-center text-xs text-gray-400">
                More models coming soon...
              </div>
            </div>
          )}
        </div>

        <div className="flex-1"></div>

        <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full glass hover:bg-white/15 transition-smooth text-white font-medium">
          <Share size={18} />
          <span className="text-sm">Share</span>
        </button>
      </nav>

      {/* chat */}
      <Chat />

      {/* loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center gap-4">
            <PropagateLoader color="#00d4ff" loading={loading} size={14} />
            <p className="text-sm text-cyan-300 font-medium">Thinking...</p>
          </div>
        </div>
      )}

      {/* chatInput */}
      <div className="w-full flex flex-col justify-center items-center px-4 py-6 border-t border-white/10 glass-sm">
        <div className="w-full max-w-3xl flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                getReply();
              }
            }}
            className="flex-1 px-5 py-3 rounded-full glass text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/12 transition-all text-sm"
          />

          <button
            onClick={getReply}
            disabled={loading}
            className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl"
          >
            <SendHorizontal size={20} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Riffinity can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
