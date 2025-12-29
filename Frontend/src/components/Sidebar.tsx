import logo from "../assets/riffinity_logo.svg";
import { SquarePen, MessageSquare, Trash, X, User, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
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
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useContext(MyContext);
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<{ id: string; title: string } | null>(null);

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

  const confirmDelete = (threadId: string, threadTitle: string) => {
    setThreadToDelete({ id: threadId, title: threadTitle });
    setDeleteConfirmOpen(true);
  };

  const deleteThread = async () => {
    if (!threadToDelete) return;
    
    try {
      const baseUrl = "https://riffinity.onrender.com";
      const response = await fetch(`${baseUrl}/api/thread/${threadToDelete.id}`, {
        method: "DELETE",
      });

      await response.json();

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadToDelete.id)
      );

      if (threadToDelete.id === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteConfirmOpen(false);
      setThreadToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setThreadToDelete(null);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:relative h-screen bg-black/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 z-50 ${
          sidebarCollapsed ? "md:w-16" : "w-[280px] sm:w-72 md:w-80"
        } ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center border-b border-white/10 px-3 sm:px-4 md:px-5 py-3 sm:py-3 ${
          sidebarCollapsed ? "md:justify-center md:px-3" : "justify-between"
        }`}>
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img className="h-5 sm:h-6 w-auto" src={logo} alt="Riffinity" />
            </div>
          )}
          
          {/* Collapse button for desktop */}
          <button
            className="hidden md:block p-2 rounded-lg hover:bg-white/5 transition-all text-slate-400 hover:text-[#fbfffd]"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
          
          {/* Close button for mobile */}
          <button
            className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-white/5 transition-all text-slate-400 hover:text-[#fbfffd]"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className={`px-3 sm:px-4 py-2.5 sm:py-3 ${sidebarCollapsed ? "md:px-2" : ""}`}>
          <button
            onClick={createNewChat}
            className={`group relative w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-slate-900/80 to-slate-800/80 text-slate-300 rounded-lg transition-all text-xs sm:text-sm font-medium overflow-hidden border border-white/10 hover:border-[#e3186c]/60 hover:text-[#fbfffd] ${
              sidebarCollapsed ? "md:justify-center md:px-2" : "justify-center"
            }`}
            aria-label="New chat"
            title={sidebarCollapsed ? "New Chat" : ""}
          >
            {/* Metallic shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
            <SquarePen size={14} className="relative z-10 sm:w-4 sm:h-4" />
            <span className={`relative z-10 transition-all duration-200 ${sidebarCollapsed ? "md:hidden" : ""}`}>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className={`flex-1 overflow-y-auto px-3 sm:px-4 pb-3 sm:pb-4 ${sidebarCollapsed ? "md:hidden" : ""}`}>
          <div className="mb-2 sm:mb-3 px-2 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Recent Chats
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {allThreads?.map((thread, idx) => (
              <div key={idx} className="group relative animate-slide-in">
                <button
                  onClick={() => changeThread(thread.threadId)}
                  className={`w-full flex items-start gap-2 sm:gap-3 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg transition-all text-xs sm:text-sm ${
                    thread.threadId === currThreadId
                      ? "bg-white/10 text-[#fbfffd] shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <MessageSquare size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                  <span className="truncate flex-1 text-left leading-relaxed">
                    {thread.title}
                  </span>
                  {thread.threadId === currThreadId && (
                    <ChevronRight size={14} className="sm:w-4 sm:h-4 flex-shrink-0 text-[#e3186c]" />
                  )}
                </button>
                <button
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all p-1 sm:p-1.5 hover:bg-red-500/20 rounded-md text-slate-500 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(thread.threadId, thread.title);
                  }}
                  aria-label="Delete thread"
                >
                  <Trash size={12} className="sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Section */}
        <ProfileSection collapsed={sidebarCollapsed} />
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && threadToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900/90 border border-white/10 rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10">
              <h3 className="text-base sm:text-lg font-semibold text-[#fbfffd] flex items-center gap-2">
                <Trash size={18} className="text-red-400" />
                Delete Chat Thread
              </h3>
            </div>
            
            {/* Content */}
            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-slate-300">
                Are you sure you want to delete this chat thread?
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Thread Title:</p>
                <p className="text-sm text-[#fbfffd] font-medium truncate">{threadToDelete.title}</p>
              </div>
              <p className="text-xs text-red-400">
                This action cannot be undone.
              </p>
            </div>
            
            {/* Actions */}
            <div className="px-5 py-4 border-t border-white/10 flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all text-slate-300 hover:text-[#fbfffd] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={deleteThread}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 rounded-lg transition-all text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProfileSection({ collapsed }: { collapsed: boolean }) {
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
    <div className="border-t border-white/10 p-2 sm:p-3">
      <div className="profileWrapper relative">
        <button
          className={`w-full flex items-center gap-2 sm:gap-2.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/5 transition-all ${
            collapsed ? "md:justify-center md:px-0" : ""
          }`}
          onClick={() => setExpanded((e) => !e)}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          title={collapsed ? "Silver User" : ""}
        >
          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 flex items-center justify-center shadow-md">
            <User size={14} className="sm:w-4 sm:h-4 text-[#e3186c]" />
          </div>
          <div className={`flex-1 text-left transition-all duration-200 ${collapsed ? "md:hidden" : ""}`}>
            <div className="text-[11px] sm:text-xs font-medium text-[#fbfffd]">Silver User</div>
            <div className="text-[9px] sm:text-[10px] text-slate-500">Pro Plan</div>
          </div>
        </button>

        {expanded && !collapsed && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-lg p-2.5 sm:p-3 shadow-2xl z-50 space-y-1.5 sm:space-y-2 animate-fade-in">
            <div className="text-[11px] sm:text-xs text-slate-400 break-all">user@example.com</div>
            <div className="px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-[#e3186c]/30 rounded-md text-center text-[#e3186c] font-medium">
              Silver Plan Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
