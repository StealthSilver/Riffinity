import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../context";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Bot } from "lucide-react";

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
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-gray-700/5"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-pink-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-gray-600/8 via-gray-600/4 to-transparent rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-pink-400/6 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
      </div>

      {newChat ? (
        <div className="flex-1 flex items-center justify-center px-6 relative z-10">
          <div className="text-center max-w-3xl space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-gray-300 bg-clip-text text-transparent leading-tight tracking-tight">
              Welcome to Riffinity
            </h1>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl mx-auto">
              Start a conversation and unlock the power of AI. Ask questions, explore ideas, or just chat.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-4">
            {prevChats?.slice(0, -1).map((chat, idx) => (
              <div
                key={idx}
                className={`flex gap-3 animate-fade-in ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {chat.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-md">
                    <Bot size={14} className="text-pink-400" />
                  </div>
                )}
                <div
                  className={`max-w-3xl px-3.5 py-2.5 rounded-lg ${
                    chat.role === "user"
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-gray-200"
                      : "bg-[#1a1a1a] border border-white/10 text-gray-300"
                  }`}
                >
                  {chat.role === "user" ? (
                    <p className="text-sm leading-relaxed">
                      {chat.content.trim() === ""
                        ? "(empty message)"
                        : chat.content}
                    </p>
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {chat.role === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-300 font-medium text-xs shadow-md">
                    U
                  </div>
                )}
              </div>
            ))}

            {prevChats.length > 0 && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-md">
                  <Bot size={14} className="text-pink-400" />
                </div>
                <div className="max-w-3xl px-3.5 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300">
                  <div className="prose prose-sm prose-invert max-w-none">
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
  );
}

export default Chat;
