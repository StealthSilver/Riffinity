import logo from "../assets/riffinity_logo.svg";
import { SquarePen, MessageSquare, Trash, X, User, ChevronRight } from "lucide-react";
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
      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 md:w-80 h-screen bg-[#111111] border-r border-white/8 flex flex-col transition-transform duration-300 z-50 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <img className="h-8 w-auto" src={logo} alt="Riffinity" />
            <span className="text-lg font-semibold text-white tracking-tight">
              Riffinity
            </span>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-4 py-4">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl transition-all font-medium shadow-lg shadow-indigo-900/30"
            aria-label="New chat"
          >
            <SquarePen size={18} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="mb-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent Chats
          </div>
          <div className="space-y-1.5">
            {allThreads?.map((thread, idx) => (
              <div key={idx} className="group relative animate-slide-in">
                <button
                  onClick={() => changeThread(thread.threadId)}
                  className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all text-sm ${
                    thread.threadId === currThreadId
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <MessageSquare size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="truncate flex-1 text-left leading-relaxed">
                    {thread.title}
                  </span>
                  {thread.threadId === currThreadId && (
                    <ChevronRight size={16} className="flex-shrink-0 text-indigo-400" />
                  )}
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-red-500/20 rounded-md text-gray-500 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                  aria-label="Delete thread"
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <ProfileSection />
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
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
    <div className="border-t border-white/8 p-4">
      <div className="profileWrapper relative">
        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all"
          onClick={() => setExpanded((e) => !e)}
          aria-haspopup="dialog"
          aria-expanded={expanded}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <User size={18} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-white">Silver User</div>
            <div className="text-xs text-gray-500">Pro Plan</div>
          </div>
        </button>

        {expanded && (
          <div className="absolute bottom-full left-0 mb-3 w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl z-50 space-y-3 animate-fade-in">
            <div className="text-xs text-gray-400">user@example.com</div>
            <div className="px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg text-center text-indigo-300 font-medium">
              Silver Plan Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
