import logo from "../assets/riffinity_logo.svg";
import { Plus, User, Trash2, MessageSquare, Sparkles } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../context";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();

      const filteredData = res.map((thread: any) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);

      console.log("Fetched threads:", filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newthreadId: React.SetStateAction<string>) => {
    setCurrThreadId(newthreadId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newthreadId}`
      );

      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" }
      );

      await response.json();

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-screen w-80 flex flex-col bg-black/60 backdrop-blur-xl border-r border-white/10 shadow-2xl">
      {/* Top Section */}
      <div className="flex justify-between items-center p-5 mb-5 border-b border-white/10 animate-slide-down">
        <div className="flex items-center gap-2 relative">
          <img
            className="h-12 w-32 drop-shadow-[0_2px_12px_rgba(123,44,191,0.5)] hover:scale-105 transition-transform duration-300"
            src={logo}
            alt="logo"
          />
          <Sparkles
            className="text-accent-yellow animate-sparkle-float"
            size={18}
          />
        </div>
        <button
          onClick={createNewChat}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary-500 to-primary-400 rounded-xl font-semibold text-sm shadow-lg shadow-primary-500/40 hover:shadow-xl hover:shadow-primary-500/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></span>
          <Plus size={20} strokeWidth={2.5} className="relative z-10" />
          <span className="relative z-10">New Chat</span>
        </button>
      </div>

      {/* History List */}
      <ul className="flex-1 mx-3 overflow-y-auto animate-fade-in [animation-delay:200ms] [animation-fill-mode:both] space-y-2">
        <style>{`
          ul::-webkit-scrollbar {
            width: 6px;
          }
          ul::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          ul::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #7b2cbf, #9d4edd);
            border-radius: 10px;
          }
          ul::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #9d4edd, #c77dff);
          }
        `}</style>
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={`
              group flex justify-between items-center p-3.5 rounded-xl cursor-pointer 
              transition-all duration-300 ease-out border border-transparent
              bg-white/[0.03] hover:bg-primary-500/15 hover:border-primary-500/30 
              hover:translate-x-1 hover:shadow-lg hover:shadow-primary-500/20
              animate-slide-in-left [animation-fill-mode:both]
              ${
                thread.threadId === currThreadId
                  ? "bg-gradient-to-br from-primary-500/30 to-primary-400/20 border-primary-500/50 shadow-lg shadow-primary-500/30 relative before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-500 before:to-primary-400 before:rounded-r"
                  : ""
              }
            `}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
              <MessageSquare
                size={16}
                className="text-primary-400 flex-shrink-0"
              />
              <span className="text-gray-100 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {thread.title}
              </span>
            </div>
            <Trash2
              className="text-accent-orange opacity-0 group-hover:opacity-100 group-hover:animate-bounce-in p-1.5 rounded-md hover:bg-accent-orange/20 hover:scale-110 hover:rotate-[10deg] transition-all duration-300 flex-shrink-0 z-10"
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            />
          </li>
        ))}
      </ul>

      {/* User Section */}
      <div className="flex items-center gap-3.5 p-4 m-3 border-t border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-slide-up">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/40 group-hover:rotate-[360deg] transition-transform duration-300">
          <User size={20} />
        </div>
        <p className="font-semibold text-sm bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent m-0">
          Silver
        </p>
      </div>
    </section>
  );
}

export default Sidebar;
