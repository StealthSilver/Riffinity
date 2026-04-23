import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../context";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Bot, Sparkles, UserRound } from "lucide-react";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;
    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [prevChats, reply]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prevChats, latestReply]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-y-auto overscroll-contain">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary gradient orb - Pink */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] animate-ripple-slow">
          <div className="absolute inset-0 rounded-full bg-[#e3186c] opacity-20 blur-[150px]"></div>
        </div>
        
        {/* Secondary gradient orb - Cyan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-ripple-slow-delayed">
          <div className="absolute inset-0 rounded-full bg-[#38bdf8] opacity-20 blur-[140px]"></div>
        </div>
        
        {/* Tertiary gradient orb - Purple */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] animate-ripple-slower">
          <div className="absolute inset-0 rounded-full bg-[#c084fc] opacity-20 blur-[145px]"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col min-h-0">
      {newChat ? (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4">
          <div className="text-center max-w-3xl space-y-4 sm:space-y-5 animate-fade-in">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 flex items-center justify-center shadow-lg">
              <Sparkles size={22} className="text-[#e3186c]" />
            </div>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight px-2">
              <span className="relative inline-block text-[#fbfffd]">
                Start a new chat
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed font-normal max-w-2xl mx-auto px-2">
              Ask, build, research, and create in one place. Start with a prompt and let the assistant help you move faster.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 px-3 sm:px-4 md:px-6 py-4 sm:py-5 pb-2 sm:pb-3">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {prevChats?.slice(0, -1).map((chat, idx) => (
              <div
                key={idx}
                className={`flex gap-2 sm:gap-2.5 animate-fade-in ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {chat.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 flex items-center justify-center shadow-md mt-0.5">
                    <Bot size={14} className="sm:w-4 sm:h-4 text-[#e3186c]" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] md:max-w-3xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg ${
                    chat.role === "user"
                      ? "bg-gradient-to-br from-slate-900/85 to-slate-800/85 border border-white/15 text-[#fbfffd]"
                      : "bg-slate-900/55 border border-white/10 text-slate-300"
                  }`}
                >
                  {chat.role === "user" ? (
                    <p className="text-xs sm:text-sm leading-relaxed break-words tracking-[0.005em]">
                      {chat.content.trim() === ""
                        ? "(empty message)"
                        : chat.content}
                    </p>
                  ) : (
                    <div className="prose prose-xs sm:prose-sm prose-invert max-w-none">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {chat.role === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-[#fbfffd] font-medium text-[9px] sm:text-[10px] shadow-md mt-0.5">
                    <UserRound size={14} className="sm:w-4 sm:h-4 text-slate-100" />
                  </div>
                )}
              </div>
            ))}

            {prevChats.length > 0 && (
              <div className="flex gap-2 sm:gap-2.5 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 flex items-center justify-center shadow-md mt-0.5">
                  <Bot size={14} className="sm:w-4 sm:h-4 text-[#e3186c]" />
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] md:max-w-3xl px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-slate-900/55 border border-white/10 text-slate-300 shadow-lg">
                  <div className="prose prose-xs sm:prose-sm prose-invert max-w-none">
                    {latestReply === null ? (
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {prevChats[prevChats.length - 1].content}
                      </ReactMarkdown>
                    ) : (
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {latestReply}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Chat;
