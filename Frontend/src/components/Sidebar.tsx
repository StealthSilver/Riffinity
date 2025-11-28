import "../styles/Sidebar.css";
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
      <section
        className={"sidebar" + (mobileSidebarOpen ? " open" : " closed")}
        aria-hidden={!mobileSidebarOpen}
      >
        <div className="topDiv">
          <img className="logo" src={logo} alt="logo" />
          <button onClick={createNewChat}>
            <SquarePen size={20} />
          </button>
          <button
            className="closeMobile"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="history">
          {allThreads?.map((thread, idx) => (
            <li
              key={idx}
              onClick={() => changeThread(thread.threadId)}
              className={thread.threadId === currThreadId ? "highlighted" : " "}
            >
              {thread.title}
              <Trash
                className="trash"
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              />
            </li>
          ))}
        </ul>

        <ProfileSection />
      </section>
      {mobileSidebarOpen && (
        <div
          className="sidebarOverlay"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}

function ProfileSection() {
  const [expanded, setExpanded] = useState(false);
  // close on outside click
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
    <div className="sign">
      <div className="profileWrapper">
        <div
          className="profileCard"
          role="button"
          aria-haspopup="dialog"
          aria-expanded={expanded}
          tabIndex={0}
          onClick={() => setExpanded((e) => !e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded((v) => !v);
            }
          }}
        >
          <div className="avatar">
            <CircleUserRound size={30} />
          </div>
          <div className="profileName">Silver User</div>
        </div>
        {expanded && (
          <div className="profilePopover" role="dialog">
            <div className="profileEmail">user@example.com</div>
            <div className="planBadge">Silver Plan</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
