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
    <>
      {newChat && (
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 via-primary-300 to-accent-yellow bg-clip-text text-transparent animate-fade-in">
          Start a New Chat!
        </h1>
      )}
      <div className="w-full max-w-4xl overflow-y-auto px-8 py-16 space-y-6 scroll-smooth">
        <style>{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #7b2cbf, #9d4edd);
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #9d4edd, #c77dff);
          }
        `}</style>
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={`animate-slide-up ${
              chat.role === "user" ? "flex justify-end" : "flex justify-start"
            }`}
            key={idx}
            style={{
              animationDelay: `${idx * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            {chat.role === "user" ? (
              <div className="bg-gradient-to-br from-primary-600/40 to-primary-500/30 backdrop-blur-sm border border-primary-500/30 px-6 py-3.5 rounded-2xl max-w-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <p className="text-gray-100 text-sm leading-relaxed">
                  {chat.content.trim() === ""
                    ? "(empty message)"
                    : chat.content}
                </p>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl max-w-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) => (
                        <code
                          className={`${className} ${
                            inline
                              ? "bg-primary-500/20 px-1.5 py-0.5 rounded text-primary-300"
                              : "block bg-black/50 p-4 rounded-lg overflow-x-auto"
                          }`}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      pre: ({ children }: any) => (
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {chat.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <div className="flex justify-start animate-slide-up">
            {latestReply === null ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl max-w-3xl shadow-lg">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) => (
                        <code
                          className={`${className} ${
                            inline
                              ? "bg-primary-500/20 px-1.5 py-0.5 rounded text-primary-300"
                              : "block bg-black/50 p-4 rounded-lg overflow-x-auto"
                          }`}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      pre: ({ children }: any) => (
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {prevChats[prevChats.length - 1].content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm border border-primary-500/20 px-6 py-4 rounded-2xl max-w-3xl shadow-lg shadow-primary-500/10 animate-pulse-glow">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) => (
                        <code
                          className={`${className} ${
                            inline
                              ? "bg-primary-500/20 px-1.5 py-0.5 rounded text-primary-300"
                              : "block bg-black/50 p-4 rounded-lg overflow-x-auto"
                          }`}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      pre: ({ children }: any) => (
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {latestReply}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
