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
    <div className="w-full flex flex-col items-center flex-1 bg-transparent">
      {newChat && (
        <div className="mt-20 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Welcome to Riffinity
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start a conversation with your favorite AI model and explore endless
            possibilities
          </p>
        </div>
      )}
      <div className="w-full max-w-3xl flex-1 overflow-y-auto px-6 py-8 scroll-smooth">
        <div className="space-y-5">
          {prevChats?.slice(0, -1).map((chat, idx) => (
            <div
              key={idx}
              className={`flex animate-fadeIn ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl max-w-2xl px-6 py-4 ${
                  chat.role === "user"
                    ? "bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-400/30 text-white rounded-br-sm"
                    : "glass rounded-bl-sm"
                }`}
              >
                {chat.role === "user" ? (
                  <p className="text-base leading-relaxed font-medium">
                    {chat.content.trim() === ""
                      ? "(empty message)"
                      : chat.content}
                  </p>
                ) : (
                  <div className="prose prose-invert max-w-none text-base">
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
              <div className="rounded-2xl max-w-2xl px-6 py-4 glass rounded-bl-sm">
                <div className="prose prose-invert max-w-none text-base">
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
  );
}

export default Chat;
