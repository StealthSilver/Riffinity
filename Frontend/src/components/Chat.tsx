import { useContext, useState, useEffect } from "react";
import { MyContext } from "../context";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState<string | null>(null);

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

  return (
    <div className="w-full flex flex-col items-center flex-1 bg-transparent min-h-0">
      {newChat && (
        <div className="mt-32 text-center flex flex-col items-center w-full">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-lg tracking-tight">
            Welcome to Riffinity
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light mb-2">
            Start a conversation with your favorite AI model and explore endless
            possibilities.
          </p>
        </div>
      )}
      <div className="w-full flex-1 flex justify-center items-center min-h-0">
        <div className="w-full max-w-4xl h-full flex flex-col gap-8 px-2 sm:px-6 py-10 overflow-y-auto scroll-smooth rounded-3xl bg-black/30 shadow-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col gap-7">
            {prevChats?.slice(0, -1).map((chat, idx) => (
              <div
                key={idx}
                className={`flex animate-fadeIn ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-3xl max-w-3xl px-7 py-5 text-lg shadow-lg transition-all duration-200 ${
                    chat.role === "user"
                      ? "bg-gradient-to-r from-cyan-700/40 to-purple-700/40 border border-cyan-400/30 text-white rounded-br-xl"
                      : "glass rounded-bl-xl border border-white/10"
                  }`}
                >
                  {chat.role === "user" ? (
                    <p className="leading-relaxed font-medium tracking-wide">
                      {chat.content.trim() === ""
                        ? "(empty message)"
                        : chat.content}
                    </p>
                  ) : (
                    <div className="prose prose-invert max-w-none text-lg">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {prevChats.length > 0 && (
              <div className="flex justify-start animate-fadeIn">
                <div className="rounded-3xl max-w-3xl px-7 py-5 glass rounded-bl-xl border border-white/10 shadow-lg">
                  <div className="prose prose-invert max-w-none text-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
