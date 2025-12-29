import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, Send, Menu, Cpu, Check } from "lucide-react";

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
    { name: "gpt-4o-mini", provider: "OpenAI" },
    { name: "gpt-4o", provider: "OpenAI" },
    { name: "o3-mini", provider: "OpenAI" },
    { name: "gemini-1.5-flash", provider: "Google" },
  ];

  const getReply = async () => {
    if (!prompt.trim()) return;
    
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
    <div className="flex flex-col h-screen w-full bg-[#0a0a0a] relative">
      {/* Top Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#111111]">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all text-gray-400"
          aria-label="Open menu"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          <Menu size={20} />
        </button>

        {/* Model Selector */}
        <div className="relative" ref={modelRef}>
          <button
            onClick={() => setModelMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-lg transition-all"
          >
            <Cpu size={16} className="text-pink-400" />
            <span className="hidden sm:inline text-white text-sm font-medium">
              {currentModel}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 text-gray-400 ${
                modelMenuOpen ? "rotate-180" : ""
              }`}
              size={14}
            />
          </button>

          {modelMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-fade-in">
              <div className="px-4 py-3 bg-white/5 border-b border-white/8">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  AI Models
                </div>
              </div>
              <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                {models.map((model) => (
                  <button
                    key={model.name}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-sm transition-all group ${
                      model.name === currentModel
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-pink-400/60"
                        : "hover:bg-white/5 border border-transparent hover:border-gray-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentModel(model.name);
                      setModelMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${
                        model.name === currentModel 
                          ? "bg-pink-500/20" 
                          : "bg-white/5 group-hover:bg-white/10"
                      }`}>
                        <Cpu size={14} className={
                          model.name === currentModel 
                            ? "text-pink-400" 
                            : "text-gray-400 group-hover:text-gray-300"
                        } />
                      </div>
                      <div className="text-left">
                        <div className={`font-medium ${
                          model.name === currentModel 
                            ? "text-white" 
                            : "text-gray-300 group-hover:text-white"
                        }`}>
                          {model.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {model.provider}
                        </div>
                      </div>
                    </div>
                    {model.name === currentModel && (
                      <Check size={16} className="text-pink-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1"></div>

        {/* Placeholder for future features */}
        <div className="w-10"></div>
      </nav>

      {/* Chat Area */}
      <Chat />

      {/* Input Area */}
      <div className="w-full border-t border-white/8 bg-[#111111] p-4">
        <div className="w-full max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  getReply();
                }
              }}
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-400/50 hover:bg-white/5 transition-all"
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <PropagateLoader color="#ec4899" loading={loading} size={8} />
              </div>
            )}
          </div>
          <button
            onClick={getReply}
            disabled={loading || !prompt.trim()}
            className="flex-shrink-0 px-4 py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 hover:border-pink-400/60 rounded-xl transition-all text-gray-300 hover:text-white text-sm font-medium"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
