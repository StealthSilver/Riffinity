import Chat from "./Chat.jsx";
import { MyContext } from "../context.js";
import { useContext, useState, useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { ChevronDown, Send, Menu, Cpu, Check, Lock, Clock3 } from "lucide-react";
import { API_BASE_URL } from "../config";

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
  const [models, setModels] = useState<
    Array<{ id: string; name: string; description?: string; isFree?: boolean }>
  >([]);
  const [loadingModels, setLoadingModels] = useState(true);

  const getReply = async () => {
    if (!prompt.trim()) return;

    const selectedModel = models.find((m) => m.id === currentModel);
    if (selectedModel && selectedModel.isFree === false) {
      setReply("This is a paid model. Please choose a free model.");
      return;
    }

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
      const response = await fetch(`${API_BASE_URL}/api/chat`, options);
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

  // Fetch available models from OpenRouter
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/models`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setModels(data);
          const freeModels = data.filter((m: any) => m.isFree !== false);
          const currentModelExists = data.some((m: any) => m.id === currentModel);
          const currentModelIsFree = data.some(
            (m: any) => m.id === currentModel && m.isFree !== false
          );

          // Force-select a free model if current one is missing or paid.
          if (!currentModelExists || !currentModelIsFree) {
            if (freeModels.length > 0) {
              setCurrentModel(freeModels[0].id);
            } else if (data.length > 0) {
              setCurrentModel(data[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching models:", err);
        // Fallback to some default models if API fails
        setModels([
          {
            id: "google/gemini-2.0-flash-exp:free",
            name: "Gemini 2.0 Flash",
            description: "Google",
            isFree: true,
          },
          {
            id: "meta-llama/llama-3.1-8b-instruct:free",
            name: "Llama 3.1 8B Instruct",
            description: "Meta",
            isFree: true,
          },
          { id: "openai/gpt-4o-mini", name: "GPT-4o Mini", description: "OpenAI", isFree: false },
        ]);
        setCurrentModel("google/gemini-2.0-flash-exp:free");
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

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
    <div className="flex flex-col h-full w-full bg-black relative min-h-0">
      {/* Top Navigation Bar */}
      <nav className="w-full h-14 sm:h-[60px] flex-shrink-0 flex items-center justify-between px-3 sm:px-4 md:px-5 border-b border-white/10 bg-black/80 backdrop-blur-xl relative z-50">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-xl hover:bg-white/10 transition-all text-slate-400"
          aria-label="Open menu"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          <Menu size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Model Selector */}
        <div className="relative flex items-center gap-2 sm:gap-2.5" ref={modelRef}>
          <button
            onClick={() => setModelMenuOpen((o) => !o)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-xl transition-all shadow-sm"
          >
            <Cpu size={14} className="sm:w-4 sm:h-4 text-[#e3186c] flex-shrink-0" />
            <span className="text-[#fbfffd] text-xs sm:text-sm font-semibold truncate max-w-[120px] md:max-w-none">
              {models.find(m => m.id === currentModel)?.name || currentModel}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 text-slate-400 flex-shrink-0 ${
                modelMenuOpen ? "rotate-180" : ""
              }`}
              size={12}
            />
          </button>

          {modelMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-[290px] sm:w-80 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in">
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  AI Models
                </div>
                <div className="text-[10px] text-slate-500">Free first</div>
              </div>
              <div className="p-2 space-y-1 max-h-[60vh] sm:max-h-96 overflow-y-auto">
                {loadingModels ? (
                  <div className="flex items-center justify-center py-8">
                    <PropagateLoader color="#e3186c" size={6} />
                  </div>
                ) : models.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No models available
                  </div>
                ) : (
                  models.map((model) => (
                    <button
                      key={model.id}
                      className={`w-full flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm transition-all group ${
                        model.id === currentModel
                          ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-[#e3186c]/60"
                          : model.isFree === false
                            ? "opacity-50 cursor-not-allowed border border-transparent"
                            : "hover:bg-white/5 border border-transparent hover:border-white/10"
                      }`}
                      disabled={model.isFree === false}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (model.isFree === false) return;
                        setCurrentModel(model.id);
                        setModelMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className={`p-1 sm:p-1.5 rounded-md flex-shrink-0 ${
                          model.id === currentModel 
                            ? "bg-[#e3186c]/20" 
                            : "bg-white/5 group-hover:bg-white/10"
                        }`}>
                          <Cpu size={12} className={`sm:w-3.5 sm:h-3.5 ${
                            model.id === currentModel 
                              ? "text-[#e3186c]" 
                              : "text-slate-400 group-hover:text-slate-300"
                          }`} />
                        </div>
                        <div className="text-left min-w-0">
                          <div className={`font-medium truncate ${
                            model.id === currentModel 
                              ? "text-[#fbfffd]" 
                              : "text-slate-300 group-hover:text-[#fbfffd]"
                          }`}>
                            {model.name}
                          </div>
                          {model.description && (
                            <div className="text-[10px] sm:text-xs text-slate-500 truncate">
                              {model.description}
                            </div>
                          )}
                          <div className="text-[9px] sm:text-[10px] mt-0.5 flex items-center gap-1.5">
                            {model.isFree === false ? (
                              <>
                                <Lock size={10} className="text-amber-400" />
                                <span className="text-amber-400">Paid</span>
                              </>
                            ) : (
                              <>
                                <Check size={10} className="text-emerald-400" />
                                <span className="text-emerald-400">Free</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {model.id === currentModel && (
                        <Check size={14} className="sm:w-4 sm:h-4 text-[#e3186c] flex-shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1"></div>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-[11px] font-medium">
          <Clock3 size={12} className="text-[#e3186c]" />
          Fast replies
        </div>
      </nav>

      {/* Chat Area */}
      <Chat />

      {/* Input Area */}
      <div className="w-full flex-shrink-0 border-t border-white/10 bg-black/80 backdrop-blur-xl p-2.5 sm:p-3 md:p-4 relative z-[100]">
        <div className="w-full max-w-4xl mx-auto flex items-center gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Message Riffinity..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  getReply();
                }
              }}
              className="w-full px-4 py-2.5 sm:px-4.5 sm:py-3 bg-slate-900/55 border border-white/15 rounded-xl sm:rounded-2xl text-[#fbfffd] placeholder-slate-500 text-sm focus:outline-none focus:border-[#e3186c]/60 focus:ring-2 focus:ring-[#e3186c]/20 hover:bg-white/5 transition-all shadow-sm"
              disabled={loading}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-900/50 rounded-xl sm:rounded-2xl">
                <PropagateLoader color="#e3186c" loading={loading} size={6} />
              </div>
            )}
          </div>
          <button
            onClick={getReply}
            disabled={loading || !prompt.trim()}
            className="flex-shrink-0 h-[42px] sm:h-[46px] w-[42px] sm:w-[46px] flex items-center justify-center bg-gradient-to-br from-slate-900/85 to-slate-800/85 hover:from-slate-800 hover:to-slate-900 disabled:opacity-50 disabled:cursor-not-allowed border border-white/15 hover:border-[#e3186c]/60 rounded-xl sm:rounded-2xl transition-all text-slate-300 hover:text-[#fbfffd] shadow-sm"
            aria-label="Send message"
          >
            <Send size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
