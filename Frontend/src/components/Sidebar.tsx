import logo from "../assets/riffinity_logo.svg";
import { SquarePen, CircleUserRound, Trash, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
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
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/thread`);
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
    setMobileSidebarOpen(false);
  };

  const changeThread = async (newthreadId: React.SetStateAction<string>) => {
    setCurrThreadId(newthreadId);

    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/thread/${newthreadId}`);

      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setMobileSidebarOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/thread/${threadId}`, {
        method: "DELETE",
      });

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
    <>
      <aside
        className={`fixed md:relative w-4/5 md:w-64 h-screen bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 z-40 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <img className="h-12 w-auto" src={logo} alt="Riffinity Logo" />
          <button
            onClick={createNewChat}
            className="p-2 rounded-lg hover:bg-white/10 transition-smooth text-gray-300 hover:text-white"
            aria-label="New chat"
          >
            <SquarePen size={20} />
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-smooth text-gray-400 hover:text-gray-300"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat History */}
        <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {allThreads?.map((thread, idx) => (
            <li key={idx} className="group">
              <button
                onClick={() => changeThread(thread.threadId)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-smooth flex items-center justify-between text-sm truncate ${
                  thread.threadId === currThreadId
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-gray-400 hover:bg-white/8 hover:text-gray-100"
                }`}
              >
                <span className="truncate">{thread.title}</span>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                  aria-label="Delete thread"
                >
                  <Trash size={14} />
                </button>
              </button>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <ProfileSection />
      </aside>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}

function ProfileSection() {
  const [expanded, setExpanded] = useState(false);

  React.useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".profileWrapper") && expanded) {
        setExpanded(false);
      }
    }
    if (expanded) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [expanded]);

  return (
    <div className="border-t border-white/10 p-4">
      <div className="profileWrapper relative">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-smooth"
          onClick={() => setExpanded((e) => !e)}
          aria-haspopup="dialog"
          aria-expanded={expanded}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center">
            <CircleUserRound size={20} className="text-gray-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-gray-100">
              Silver User
            </div>
            <div className="text-xs text-gray-400">Pro</div>
          </div>
        </button>

        {expanded && (
          <div className="absolute bottom-full left-0 mb-3 w-full bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl z-50 space-y-2">
            <div className="text-xs text-gray-400">user@example.com</div>
            <div className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded-md text-center text-gray-100 font-medium">
              Silver Plan
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
