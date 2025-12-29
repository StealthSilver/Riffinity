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
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center">
            <img className="h-6 w-auto" src={logo} alt="Riffinity" />
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
        <div className="px-4 py-3">
          <button
            onClick={createNewChat}
            className="group relative w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 rounded-lg transition-all text-sm font-medium overflow-hidden border border-gray-700 hover:border-pink-400/60 hover:text-white"
            aria-label="New chat"
          >
            {/* Metallic shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
            <SquarePen size={16} className="relative z-10" />
            <span className="relative z-10">New Chat</span>
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
                    <ChevronRight size={16} className="flex-shrink-0 text-pink-400" />
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
    <div className="border-t border-white/8 p-3">
      <div className="profileWrapper relative">
        <button
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-all"
          onClick={() => setExpanded((e) => !e)}
          aria-haspopup="dialog"
          aria-expanded={expanded}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-md">
            <User size={16} className="text-pink-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-medium text-white">Silver User</div>
            <div className="text-[10px] text-gray-500">Pro Plan</div>
          </div>
        </button>

        {expanded && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-2xl z-50 space-y-2 animate-fade-in">
            <div className="text-xs text-gray-400">user@example.com</div>
            <div className="px-2.5 py-1 text-[10px] bg-gradient-to-br from-gray-800 to-gray-900 border border-pink-400/30 rounded-md text-center text-pink-300 font-medium">
              Silver Plan Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
